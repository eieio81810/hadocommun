import { App, Plugin, PluginSettingTab, Setting, Notice, TFile } from 'obsidian';

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
	private graphObserver: MutationObserver | null = null;

	async onload() {
		await this.loadSettings();

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

		// グラフビューの監視を開始
		this.app.workspace.onLayoutReady(() => {
			if (this.settings.useH1ForGraphNodes) {
				this.initGraphObserver();
			}
		});

		console.log('Hadocommun Plugin loaded');
	}

	onunload() {
		this.cleanupGraphObserver();
		console.log('Hadocommun Plugin unloaded');
	}

	// ファイルからH1見出しを取得
	async getFirstH1(file: TFile): Promise<string | null> {
		try {
			const content = await this.app.vault.read(file);
			const lines = content.split('\n');
			
			for (const line of lines) {
				const trimmed = line.trim();
				// H1見出し（# で始まり、## ではない）を探す
				if (trimmed.startsWith('# ') && !trimmed.startsWith('## ')) {
					return trimmed.substring(2).trim();
				}
			}
		} catch (error) {
			console.error('Error reading file:', error);
		}
		return null;
	}

	// グラフビューのラベルを更新
	async updateGraphLabels() {
		// グラフビューのノードを探して更新
		const graphElements = document.querySelectorAll('.graph-view .graph-node text');
		
		for (const element of Array.from(graphElements)) {
			const textElement = element as SVGTextElement;
			const fileName = textElement.textContent;
			
			if (fileName) {
				// ファイル名からファイルを取得
				const file = this.app.vault.getMarkdownFiles().find(f => 
					f.basename === fileName || f.name === fileName
				);
				
				if (file) {
					const h1 = await this.getFirstH1(file);
					if (h1) {
						textElement.textContent = h1;
						textElement.setAttribute('data-original-name', fileName);
					}
				}
			}
		}
	}

	// グラフビューのラベルを元に戻す
	resetGraphLabels() {
		const graphElements = document.querySelectorAll('.graph-view .graph-node text');
		
		for (const element of Array.from(graphElements)) {
			const textElement = element as SVGTextElement;
			const originalName = textElement.getAttribute('data-original-name');
			
			if (originalName) {
				textElement.textContent = originalName;
				textElement.removeAttribute('data-original-name');
			}
		}
	}

	// グラフビューの監視を初期化
	initGraphObserver() {
		this.cleanupGraphObserver();

		// MutationObserverでグラフビューの変更を監視
		this.graphObserver = new MutationObserver(() => {
			if (this.settings.useH1ForGraphNodes) {
				this.updateGraphLabels();
			}
		});

		// グラフビューコンテナを監視
		const observeGraphView = () => {
			const graphView = document.querySelector('.graph-view');
			if (graphView) {
				this.graphObserver?.observe(graphView, {
					childList: true,
					subtree: true
				});
				this.updateGraphLabels();
			}
		};

		// 初回実行
		observeGraphView();

		// レイアウト変更を監視して、グラフビューが開かれたら監視を再開
		this.registerEvent(
			this.app.workspace.on('layout-change', () => {
				observeGraphView();
			})
		);
	}

	// グラフビューの監視をクリーンアップ
	cleanupGraphObserver() {
		if (this.graphObserver) {
			this.graphObserver.disconnect();
			this.graphObserver = null;
		}
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
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
						this.plugin.updateGraphLabels();
					} else {
						this.plugin.resetGraphLabels();
					}
				}));
	}
}
