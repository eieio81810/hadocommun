# Obsidian コミュニティプラグイン リリースガイド 🚀

ハドこみゅプラグインをObsidianコミュニティプラグインとして公開するための準備手順です。

---

## 📋 公開前チェックリスト

### 必須ファイル

- [x] `manifest.json` - プラグインメタデータ
- [x] `main.js` - ビルド済みプラグイン本体
- [ ] `styles.css` - スタイルシート（オプション）
- [ ] `README.md` - 英語版ドキュメント
- [ ] `LICENSE` - ライセンスファイル
- [x] `NOTICES.md` - サードパーティライセンス情報

### ドキュメント

- [ ] 英語版 README を作成
- [ ] 機能説明とスクリーンショット
- [ ] インストール手順
- [ ] 使い方の説明

### コード品質

- [x] すべてのテストが通る（`npm test`）
- [x] TypeScript 型チェック通過（`npm run typecheck`）
- [x] UTF-8（BOMなし）エンコーディング
- [ ] console.log のデバッグコードを削除

---

## 1. リリース用ファイルの準備

### manifest.json の確認

プラグイン情報が正しく設定されているか確認：

```json
{
  "id": "hadocommun-plugin",
  "name": "Hadocommun Plugin",
  "version": "1.0.0",
  "minAppVersion": "0.15.0",
  "description": "Display H1 headings as graph node labels",
  "author": "Hadocommun",
  "authorUrl": "https://github.com/eieio81810/hadocommun",
  "isDesktopOnly": false
}
```

### NOTICES.md の生成

依存パッケージのライセンス情報を自動抽出して `NOTICES.md` を生成：

```bash
cd plugin
npm run generate-notices
```

このコマンドは `package-lock.json` から以下の情報を抽出します：
- 使用している全パッケージとそのライセンス
- BSD-3-Clause, MIT, Apache-2.0 などの主要ライセンス
- 各ライセンスの全文

**実行タイミング:**
- 初回リリース前（必須）
- 依存パッケージを更新した後（`npm install` / `npm update` 後）
- リリースビルドの前

生成された `plugin/NOTICES.md` を確認し、必要に応じて追加情報を記載してください。

### 英語版 README の作成

`plugin/README_EN.md` として作成し、以下を含める：

- プラグインの概要
- 主な機能
- インストール方法
- 使い方（スクリーンショット付き）
- トラブルシューティング

### LICENSE ファイルの追加

MIT License をルートディレクトリに配置：

```
hadocommun/
├── LICENSE          # ← 追加
├── plugin/
│   └── NOTICES.md   # ← 生成したファイル
└── docs/
```

---

## 2. リリースビルド

### 最終ビルド

```bash
cd plugin
npm run build
```

### ファイルサイズの確認

`main.js` が肥大化していないか確認（目安: 500KB以下）。

### 動作確認

1. `docs/.obsidian/plugins/hadocommun-plugin/` にコピー
2. Obsidian で動作テスト
3. すべての機能が正常に動作することを確認

---

## 3. GitHub リリースの作成

### リリースノートの準備

`plugin/CHANGELOG.md` を作成：

```markdown
# Changelog

## [1.0.0] - 2025-01-XX

### Added
- Display H1 headings as graph node labels
- Toggle setting to enable/disable H1 display
- Metadata cache optimization for performance

### Features
- Works with both global and local graph views
- Automatically updates on file changes
- Preserves original labels when disabled
```

### Git タグの作成

```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

### GitHub Release の作成

1. GitHub リポジトリページを開く
2. 「Releases」→「Create a new release」
3. タグを選択：`v1.0.0`
4. リリースタイトル：`Version 1.0.0`
5. リリースノートを記入
6. 以下のファイルを添付：
   - `main.js`
   - `manifest.json`
   - `styles.css`（あれば）

---

## 4. コミュニティプラグイン申請

### obsidian-releases リポジトリへの PR

1. [obsidian-releases](https://github.com/obsidianmd/obsidian-releases) をフォーク

2. `community-plugins.json` に追加：

```json
{
  "id": "hadocommun-plugin",
  "name": "Hadocommun Plugin",
  "author": "Hadocommun",
  "description": "Display H1 headings as graph node labels",
  "repo": "eieio81810/hadocommun"
}
```

3. プラグイン情報を `community-plugin-stats.json` に追加（自動生成される場合もあり）

4. Pull Request を作成：
   - タイトル：`Add Hadocommun Plugin`
   - 説明：プラグインの概要と主な機能を記載

### PR テンプレートの記入

- [ ] プラグイン名とIDが一致
- [ ] 最新バージョンが正しく設定
- [ ] リリースにファイルが添付されている
- [ ] README が英語で書かれている
- [ ] ライセンスが明記されている
- [ ] NOTICES.md にサードパーティライセンスを記載

---

## 5. レビュー＆承認待ち

### レビュープロセス

- Obsidian チームがプラグインをレビュー
- セキュリティ、パフォーマンス、ガイドライン遵守をチェック
- フィードバックがあれば対応

### 承認後

- プラグインがコミュニティプラグインリストに追加
- Obsidian アプリ内の「コミュニティプラグイン」からインストール可能に

---

## 6. 公開後のメンテナンス

### バージョン管理

新バージョンをリリースする際：

1. `manifest.json` の `version` を更新
2. **依存パッケージを更新した場合は `npm run generate-notices` を実行**
3. `npm run build`
4. Git タグを作成（`v1.1.0` など）
5. GitHub Release を作成
6. ファイルを添付

### フィードバック対応

- GitHub Issues で報告されたバグを修正
- ユーザーからの機能要望を検討
- 定期的にテストを追加・更新

---

## 📚 参考リンク

- [Obsidian プラグイン開発ガイド](https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin)
- [obsidian-releases リポジトリ](https://github.com/obsidianmd/obsidian-releases)
- [プラグイン提出ガイドライン](https://docs.obsidian.md/Plugins/Releasing/Submit+your+plugin)

---

## ✅ 完了したら

- [ ] NOTICES.md 生成完了（`npm run generate-notices`）
- [ ] GitHub Release 作成完了
- [ ] obsidian-releases に PR 送信完了
- [ ] レビュー対応完了
- [ ] プラグイン公開完了 🎉

公開後は Discord で報告し、コミュニティに共有しましょう！

---

[[Plugin_Development_Guide|開発ガイドに戻る]]
