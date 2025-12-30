import { GraphLabelManager } from '../src/graphLabelManager';
import { TFile, MetadataCache, Vault } from 'obsidian';

// Obsidian API のモック
const mockMetadataCache = {
	getFileCache: jest.fn(),
} as unknown as MetadataCache;

const mockVault = {
	read: jest.fn(),
} as unknown as Vault;

describe('GraphLabelManager', () => {
	let manager: GraphLabelManager;

	beforeEach(() => {
		manager = new GraphLabelManager(mockMetadataCache, mockVault);
		jest.clearAllMocks();
	});

	describe('getFirstH1', () => {
		it('should return H1 from metadata cache', async () => {
			const mockFile = { path: 'test.md' } as TFile;
			(mockMetadataCache.getFileCache as jest.Mock).mockReturnValue({
				headings: [{ level: 1, heading: 'Test Title' }],
			});

			const result = await manager.getFirstH1(mockFile);
			expect(result).toBe('Test Title');
			expect(mockVault.read).not.toHaveBeenCalled();
		});

		it('should parse H1 from file content when not in cache', async () => {
			const mockFile = { path: 'test.md' } as TFile;
			(mockMetadataCache.getFileCache as jest.Mock).mockReturnValue(null);
			(mockVault.read as jest.Mock).mockResolvedValue('# File Title\n\nContent here');

			const result = await manager.getFirstH1(mockFile);
			expect(result).toBe('File Title');
		});

		it('should return null when no H1 exists', async () => {
			const mockFile = { path: 'test.md' } as TFile;
			(mockMetadataCache.getFileCache as jest.Mock).mockReturnValue(null);
			(mockVault.read as jest.Mock).mockResolvedValue('## H2 Only\n\nContent');

			const result = await manager.getFirstH1(mockFile);
			expect(result).toBeNull();
		});

		it('should handle file read errors gracefully', async () => {
			const mockFile = { path: 'test.md' } as TFile;
			(mockMetadataCache.getFileCache as jest.Mock).mockReturnValue(null);
			(mockVault.read as jest.Mock).mockRejectedValue(new Error('File not found'));

			const result = await manager.getFirstH1(mockFile);
			expect(result).toBeNull();
		});
	});

	describe('getH1ForNode', () => {
		it('should return cached H1 if available', async () => {
			const mockResolveFile = jest.fn();
			const nodeId = 'test.md';

			// 初回呼び出しでキャッシュに保存
			const mockFile = { path: 'test.md' } as TFile;
			mockResolveFile.mockReturnValue(mockFile);
			(mockMetadataCache.getFileCache as jest.Mock).mockReturnValue({
				headings: [{ level: 1, heading: 'Cached Title' }],
			});

			const firstResult = await manager.getH1ForNode(nodeId, mockResolveFile);
			expect(firstResult).toBe('Cached Title');

			// 2回目はキャッシュから取得
			const secondResult = await manager.getH1ForNode(nodeId, mockResolveFile);
			expect(secondResult).toBe('Cached Title');
			expect(mockResolveFile).toHaveBeenCalledTimes(1); // 1回しか呼ばれない
		});

		it('should return null when file cannot be resolved', async () => {
			const mockResolveFile = jest.fn().mockReturnValue(null);
			const nodeId = 'nonexistent.md';

			const result = await manager.getH1ForNode(nodeId, mockResolveFile);
			expect(result).toBeNull();
		});
	});

	describe('clearCache', () => {
		it('should clear all cached H1 values', async () => {
			const mockFile = { path: 'test.md' } as TFile;
			const mockResolveFile = jest.fn().mockReturnValue(mockFile);
			(mockMetadataCache.getFileCache as jest.Mock).mockReturnValue({
				headings: [{ level: 1, heading: 'Title' }],
			});

			await manager.getH1ForNode('test.md', mockResolveFile);
			manager.clearCache();

			// キャッシュクリア後、再度ファイル解決が必要
			await manager.getH1ForNode('test.md', mockResolveFile);
			expect(mockResolveFile).toHaveBeenCalledTimes(2);
		});
	});
});
