import { TFile, MetadataCache, Vault } from 'obsidian';

export class GraphLabelManager {
	private h1Cache = new Map<string, string | null>();

	constructor(
		private metadataCache: MetadataCache,
		private vault: Vault
	) {}

	async getFirstH1(file: TFile): Promise<string | null> {
		const cache = this.metadataCache.getFileCache(file);
		const cachedHeading = cache?.headings?.find(h => h.level === 1)?.heading;
		if (cachedHeading) return cachedHeading.trim();

		try {
			const content = await this.vault.read(file);
			const lines = content.split('\n');
			for (const line of lines) {
				const trimmed = line.trim();
				if (trimmed.startsWith('# ') && !trimmed.startsWith('## ')) {
					return trimmed.substring(2).trim();
				}
			}
		} catch (error) {
			// File read errors are expected for some scenarios, silently continue
		}
		return null;
	}

	async getH1ForNode(nodeId: string, resolveFile: (id: string) => TFile | null): Promise<string | null> {
		if (this.h1Cache.has(nodeId)) {
			return this.h1Cache.get(nodeId) ?? null;
		}
		const file = resolveFile(nodeId);
		if (!file) return null;
		const h1 = await this.getFirstH1(file);
		if (h1) this.h1Cache.set(nodeId, h1);
		return h1;
	}

	clearCache() {
		this.h1Cache.clear();
	}

	invalidateFileCache(nodeId: string) {
		this.h1Cache.delete(nodeId);
	}
}
