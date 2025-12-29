# hadocommun

HADOコミュニティ「ハドこみゅ」のオープンソースプロジェクト

このリポジトリは、Obsidianドキュメント（vault）とObsidianプラグインのモノレポです。

## 📁 プロジェクト構造

```
hadocommun/
├── README.md                    # このファイル（プロジェクト全体の説明）
├── .github/
│   └── copilot-instructions.md # GitHub Copilotの指示書
├── plugin/                      # プラグイン開発用ディレクトリ
│   ├── README.md               # プラグイン開発ガイド
│   ├── main.ts                 # プラグインソースコード
│   ├── manifest.json           # プラグインマニフェスト
│   ├── package.json            # 依存関係とビルドスクリプト
│   ├── tsconfig.json           # TypeScript設定
│   ├── esbuild.config.mjs      # ビルド設定
│   └── .gitignore              # ビルド成果物の除外
└── docs/                        # ドキュメント・Obsidian vault
    ├── README.md               # ドキュメント説明
    ├── Welcome.md              # ハドこみゅの紹介
    ├── Markdown_knowhow.md     # Markdownガイド
    └── .obsidian/              # Obsidian vault設定
        └── plugins/            # プラグインインストール先
```

## 🚀 クイックスタート

### ドキュメントを閲覧

1. Obsidianをインストール
2. `docs/` ディレクトリをvaultとして開く

### プラグイン開発

1. `plugin/` ディレクトリに移動
2. `npm install` で依存関係をインストール
3. `npm run dev` で開発モードを起動
4. `npm run build` でビルド

詳細は各ディレクトリの `README.md` を参照してください。

## 📝 エンコーディングについて

- すべてのファイルは **UTF-8（BOMなし）** で保存してください
- 特に日本語を含むファイルは文字化けに注意
- 詳細は `.github/copilot-instructions.md` を参照

## 🤝 コントリビューション

プルリクエストやIssueは大歓迎です！

## 📄 ライセンス

MIT
