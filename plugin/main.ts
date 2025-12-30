/// <reference path="./node_modules/obsidian/obsidian.d.ts" />
import { App, Plugin, PluginSettingTab, Setting, Notice, TFile } from 'obsidian';
import { GraphLabelManager } from './src/graphLabelManager';

interface HadocommunPluginSettings {
	greeting: string;
	useH1ForGraphNodes: boolean;
}

const DEFAULT_SETTINGS: HadocommunPluginSettings = {
	greeting: 'ハドこみゅへようこそ！ 🌈',
	useH1ForGraphNodes: false
}

export default class HadocommunPlugin extends Plugin {
	settings: HadocommunPluginSettings;
	private currentRenderer: any | null = null;
	private labelInterval: number | null = null;
	private originalLabels: Map<string, string> = new Map();
	public overlayLabels: Map<string, any> = new Map();
	private labelManager: GraphLabelManager;

	async onload() {
		await this.loadSettings();

		(window as any).hadocommunPlugin = this;

		// GraphLabelManager を初期化
		this.labelManager = new GraphLabelManager(this.app.metadataCache, this.app.vault);

		const ribbonIconEl = this.addRibbonIcon('dice', 'Hadocommun Plugin', (evt: MouseEvent) => {
			new Notice(this.settings.greeting);
		});
		ribbonIconEl.addClass('hadocommun-plugin-ribbon-class');

		this.addCommand({
			id: 'open-hadocommun-greeting',
			name: 'Show greeting message',
			callback: () => {
				new Notice(this.settings.greeting);
			}
		});

		this.addSettingTab(new HadocommunSettingTab(this.app, this));

		this.app.workspace.onLayoutReady(() => {
			if (this.settings.useH1ForGraphNodes) {
				this.handleLayoutChange();
				this.startLabelLoop();
			}
		});

		this.registerEvent(
			this.app.workspace.on('layout-change', () => {
				if (this.settings.useH1ForGraphNodes) {
					this.handleLayoutChange();
					this.startLabelLoop();
				}
			})
		);

		// ファイル変更時にキャッシュを無効化
		this.registerEvent(
			this.app.vault.on('modify', (file) => {
				if (file instanceof TFile && file.extension === 'md') {
					this.labelManager.invalidateFileCache(file.path);
				}
			})
		);

		// ファイルリネーム時にキャッシュを無効化
		this.registerEvent(
			this.app.vault.on('rename', (file, oldPath) => {
				if (file instanceof TFile && file.extension === 'md') {
					this.labelManager.invalidateFileCache(oldPath);
					this.labelManager.invalidateFileCache(file.path);
				}
			})
		);

		console.log('Hadocommun Plugin loaded');
	}

	onunload() {
		this.stopLabelLoop();
		this.resetGraphLabels();
		console.log('Hadocommun Plugin unloaded');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async handleLayoutChange() {
		this.currentRenderer = null;
		await this.ensureRenderer();
	}

	stopLabelLoop() {
		if (this.labelInterval !== null) {
			window.clearInterval(this.labelInterval);
			this.labelInterval = null;
		}
	}

	private async ensureRenderer(): Promise<any | null> {
		if (this.currentRenderer && this.isRenderer(this.currentRenderer)) {
			return this.currentRenderer;
		}
		const renderer = this.findRenderer();
		if (renderer) {
			this.currentRenderer = renderer;
			return renderer;
		}
		return null;
	}

	private findRenderer(): any | null {
		const leaves = [
			...this.app.workspace.getLeavesOfType('graph'),
			...this.app.workspace.getLeavesOfType('localgraph')
		];
		for (const leaf of leaves) {
			const renderer = (leaf as any).view?.renderer;
			if (this.isRenderer(renderer)) {
				return renderer;
			}
		}
		return null;
	}

	private isRenderer(renderer: any): boolean {
		return !!(renderer && renderer.px && renderer.px.stage && Array.isArray(renderer.nodes));
	}

	private getRenderableNodes(renderer: any): Array<{ id: string; textNode: any; rawNode: any }> {
		const result: Array<{ id: string; textNode: any; rawNode: any }> = [];
		if (renderer?.nodeLookup && typeof renderer.nodeLookup === 'object') {
			for (const [key, value] of Object.entries(renderer.nodeLookup)) {
				const node: any = value;
				const id = key || node?.path || node?.id;
				const textNode = node?.text;
				if (id && textNode) {
					result.push({ id, textNode, rawNode: node });
				}
			}
		}
		if (result.length === 0 && Array.isArray(renderer?.nodes)) {
			for (const node of renderer.nodes as any[]) {
				const id = (node as any)?.id ?? (node as any)?.path ?? (node as any)?.file?.path;
				const textNode = (node as any)?.text;
				if (id && textNode) {
					result.push({ id, textNode, rawNode: node });
				}
			}
		}
		return result;
	}

	private async getH1ForNode(nodeId: string): Promise<string | null> {
		return await this.labelManager.getH1ForNode(nodeId, (id) => this.resolveFileFromId(id));
	}

	private resolveFileFromId(nodeId: string): TFile | null {
		const exact = this.app.vault.getAbstractFileByPath(nodeId);
		if (exact instanceof TFile) return exact;
		const withMd = this.app.vault.getAbstractFileByPath(nodeId.endsWith('.md') ? nodeId : `${nodeId}.md`);
		if (withMd instanceof TFile) return withMd;
		const linkDest = this.app.metadataCache.getFirstLinkpathDest(nodeId.replace(/\.md$/i, ''), '');
		if (linkDest instanceof TFile) return linkDest;
		const byBase = this.app.vault.getMarkdownFiles().find(f => f.basename === nodeId || f.path === nodeId || f.path.endsWith(`/${nodeId}`));
		return byBase ?? null;
	}

	// グラフビューのラベルを更新
	async updateGraphLabels() {
		if (!this.settings.useH1ForGraphNodes) return;
		const renderer = await this.ensureRenderer();
		if (!renderer) return;

		const nodes = this.getRenderableNodes(renderer);
		if (nodes.length === 0) return;

		for (const { id, textNode, rawNode } of nodes) {
			if (!id || !textNode) continue;

			// 元のラベルを保存（初回のみ）
			if (!this.originalLabels.has(id) && typeof (textNode as any).text === 'string') {
				this.originalLabels.set(id, (textNode as any).text as string);
			}

			const h1 = await this.getH1ForNode(id);
			if (h1 && (textNode as any).text !== h1) {
				// 既存のテキストノードを直接書き換え
				(textNode as any).text = h1;
				// PIXI Text の更新を促す
				if (typeof (textNode as any).updateText === 'function') {
					try { (textNode as any).updateText(true); } catch (_) {}
				}
				(textNode as any).dirty = true;
				(rawNode as any).fontDirty = true;
			}
		}
	}

	// グラフビューのラベルを元に戻す
	resetGraphLabels() {
		const renderer = this.currentRenderer;
		const nodes = renderer ? this.getRenderableNodes(renderer) : [];
		for (const { id, textNode } of nodes) {
			const originalName = id ? this.originalLabels.get(id) : undefined;
			if (originalName && textNode && (textNode as any).text !== originalName) {
				(textNode as any).text = originalName;
				if (typeof (textNode as any).updateText === 'function') {
					try { (textNode as any).updateText(true); } catch (_) {}
				}
				(textNode as any).dirty = true;
			}
		}
		this.originalLabels.clear();
		this.labelManager.clearCache();
	}

	private positionOverlay(renderer: any, rawNode: any, overlay: any) {
		const x = rawNode?.x ?? 0;
		const y = rawNode?.y ?? 0;
		overlay.x = x * renderer.scale + renderer.panX;
		overlay.y = y * renderer.scale + renderer.panY;
		if (renderer.nodeScale) {
			overlay.scale?.set?.(1 / (3 * renderer.nodeScale));
		}
		const baseAlpha = Math.max((rawNode as any)?.text?.alpha ?? 0, 0.9);
		overlay.alpha = baseAlpha;
	}

	startLabelLoop() {
		if (this.labelInterval !== null) return;
		const run = async () => {
			await this.updateGraphLabels();
		};
		run();
		this.labelInterval = window.setInterval(run, 500);
		this.registerInterval(this.labelInterval);
	}
}

class HadocommunSettingTab extends PluginSettingTab {
	plugin: HadocommunPlugin;

	constructor(app: App, plugin: HadocommunPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Hadocommun Plugin Settings'});

		new Setting(containerEl)
			.setName('Greeting message')
			.setDesc('メッセージ通知に表示される挨拶文')
			.addText(text => text
				.setPlaceholder('Enter your greeting')
				.setValue(this.plugin.settings.greeting)
				.onChange(async (value) => {
					this.plugin.settings.greeting = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('グラフビューでH1見出しを使用')
			.setDesc('グラフビューのノードラベルをファイル名ではなく、ファイルの最初のH1見出しで表示します')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.useH1ForGraphNodes)
				.onChange(async (value) => {
					this.plugin.settings.useH1ForGraphNodes = value;
					await this.plugin.saveSettings();
					if (value) {
						await this.plugin.handleLayoutChange();
						this.plugin.startLabelLoop();
						// 即座にラベルを更新
						await this.plugin.updateGraphLabels();
					} else {
						this.plugin.stopLabelLoop();
						this.plugin.resetGraphLabels();
					}
				}));
	}
}
