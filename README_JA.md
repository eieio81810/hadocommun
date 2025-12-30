# hadocommun

HADOコミュニティ「ハドこみゅ」のオープンソースプロジェクト

このリポジトリは、Obsidianドキュメント（vault）とObsidianプラグインのモノレポです。

---

## 🌐 English

For English documentation, see [README.md](README.md).

---

## 📁 プロジェクト構造

```
hadocommun/
├── README.md                    # English version (plugin documentation)
├── README_JA.md                 # このファイル（プロジェクト全体の説明）
├── README_EN.md                 # English project overview
├── LICENSE                      # MITライセンス
├── .github/
│   └── copilot-instructions.md # GitHub Copilotの指示書
├── plugin/                      # プラグイン開発用ディレクトリ
│   ├── README.md               # プラグイン開発ガイド
│   ├── src/                    # ビジネスロジック（テスト可能）
│   ├── tests/                  # Jestテスト
│   ├── main.ts                 # プラグインエントリーポイント
│   ├── manifest.json           # プラグインマニフェスト
│   ├── package.json            # 依存関係とビルドスクリプト
│   ├── jest.config.js          # Jestテスト設定
│   ├── tsconfig.json           # TypeScript設定
│   ├── esbuild.config.mjs      # ビルド設定
│   └── .gitignore              # ビルド成果物の除外
└── docs/                        # ドキュメント・Obsidian vault
    ├── Welcome.md              # ハドこみゅの紹介
    ├── Contributing.md         # 寄稿ガイド
    ├── Plugin_Development_Guide.md  # プラグイン開発ガイド
    ├── Plugin_Release_Guide.md      # プラグインリリースガイド
    ├── Markdown_knowhow.md     # Markdownガイド
    └── .obsidian/              # Obsidian vault設定
        └── plugins/            # プラグインインストール先
```

## 🚀 クイックスタート

### ドキュメントを閲覧

1. [Obsidian](https://obsidian.md/) をインストール
2. `docs/` ディレクトリをvaultとして開く

### プラグイン開発

```bash
cd plugin
npm install        # 依存関係をインストール
npm run dev        # 開発モード（自動リビルド）
npm test           # テスト実行
npm run build      # 本番ビルド
```

詳細は以下を参照：
- [plugin/README.md](plugin/README.md) - プラグイン開発手順
- [docs/Plugin_Development_Guide.md](docs/Plugin_Development_Guide.md) - 開発ガイド
- [docs/Plugin_Release_Guide.md](docs/Plugin_Release_Guide.md) - リリース手順

## 📝 エンコーディングについて

- すべてのファイルは **UTF-8（BOMなし）** で保存してください
- 特に日本語を含むファイルは文字化けに注意
- 詳細は [.github/copilot-instructions.md](.github/copilot-instructions.md) を参照

## 🧪 テスト駆動開発（TDD）

このプラグインはテスト駆動開発を採用しています。

**Red → Green → Refactor** サイクル：
1. **Red**: 失敗するテストを書く
2. **Green**: 最小限の実装でテストを通す
3. **Refactor**: テストを保ちながらコードを改善

詳細は [docs/Plugin_Development_Guide.md](docs/Plugin_Development_Guide.md) を参照。

## 🤝 コントリビューション

プルリクエストやIssueは大歓迎です！

### ドキュメント寄稿

HADOの技術・戦術などのノートを追加・編集します。  
→ [docs/Contributing.md](docs/Contributing.md)

### プラグイン開発

Obsidianプラグインの機能追加・改善を行います。  
→ [docs/Plugin_Development_Guide.md](docs/Plugin_Development_Guide.md)

## 📄 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) を参照
