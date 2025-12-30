# Obsidian コミュニティプラグイン リリースガイド 🚀

ハドこみゅプラグインをObsidianコミュニティプラグインとして公開するための準備手順です。

---

## 📋 公開前チェックリスト

### 必須ファイル

- [x] `manifest.json` - プラグインメタデータ（**ルートディレクトリとplugin/の両方に配置**）
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

### 命名規則

- [ ] プラグインID に "plugin" という単語を含めない（例: `hadocommun-plugin` ❌ → `hadocommun` ✅）
- [ ] プラグイン名に "Plugin" という単語を含めない（例: `Hadocommun Plugin` ❌ → `Hadocommun` ✅）
- [ ] 説明文の末尾に `.?!)` のいずれかを付ける

---

## 1. リリース用ファイルの準備

### manifest.json の確認

プラグイン情報が正しく設定されているか確認：

⚠️ **重要な命名規則:**
- **ID**: "plugin" という単語を含めない（短く簡潔に）
- **Name**: "Plugin" という単語を含めない（冗長なため）
- **Description**: 末尾に `.?!)` のいずれかを付ける

```json
{
  "id": "hadocommun",
  "name": "Hadocommun",
  "version": "1.0.0",
  "minAppVersion": "0.15.0",
  "description": "Display H1 headings as graph node labels instead of file names.",
  "author": "Hadocommun",
  "authorUrl": "https://github.com/eieio81810/hadocommun",
  "isDesktopOnly": false
}
```

❌ **よくある間違い:**
```json
{
  "id": "hadocommun-plugin",        // ❌ "plugin" を含めない
  "name": "Hadocommun Plugin",      // ❌ "Plugin" を含めない
  "description": "Display H1 headings"  // ❌ 末尾に句読点がない
}
```

### manifest.json をルートディレクトリにも配置

Obsidian の検証ボットはリポジトリルートの `manifest.json` を確認します。

```bash
# plugin/manifest.json をルートにコピー
cp plugin/manifest.json manifest.json
```

**ディレクトリ構造:**
```
hadocommun/
├── manifest.json        # ← 必須（ルート）
├── plugin/
│   ├── manifest.json    # ← 開発用
│   ├── main.js
│   └── ...
└── docs/
```

⚠️ **注意:** 両方のファイルを同期させること！バージョン更新時は両方を更新。

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

### ⚠️ 重要: PR送信前にリリースを作成

**obsidian-releases に PR を送る前に、必ず GitHub Release を作成してください。**
Obsidian チームのボットは、manifest.json のバージョンと一致する GitHub Release タグの存在を確認します。

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

**manifest.json のバージョンと完全に一致させること:**

```bash
# manifest.json の version が "1.0.0" の場合
git tag -a 1.0.0 -m "Release version 1.0.0"
git push origin 1.0.0
```

❌ **よくある間違い:**
- タグ名に `v` を付ける（例: `v1.0.0`） → `1.0.0` にする
- manifest.json と異なるバージョン（例: manifest が `1.0.0` なのに PR で `1.2` を指定）

### GitHub Release の作成

1. GitHub リポジトリページを開く
2. 「Releases」→「Create a new release」
3. **タグを選択：`1.0.0`** (manifest.json と完全一致)
4. リリースタイトル：`1.0.0`
5. リリースノートを記入
6. 以下のファイルを添付：
   - `plugin/main.js`
   - `plugin/manifest.json`
   - `styles.css`（あれば）

7. **「Publish release」をクリック**

### リリース確認

以下のURLでリリースが作成されたことを確認:
```
https://github.com/eieio81810/hadocommun/releases/tag/1.0.0
```

---

## 4. コミュニティプラグイン申請

### ⚠️ 事前確認

- [x] GitHub Release が作成済み
- [x] manifest.json のバージョンとリリースタグが一致
- [x] main.js と manifest.json がリリースに添付済み
- [x] 英語版 README が存在
- [x] LICENSE ファイルが存在

### obsidian-releases リポジトリへの PR

1. [obsidian-releases](https://github.com/obsidianmd/obsidian-releases) をフォーク

2. **`community-plugins.json` の最後に追加：**

   ⚠️ **重要:** 必ずファイルの**最後**に追加してください。既存のプラグインの間に挿入してはいけません。

```json
{
  "id": "hadocommun",
  "name": "Hadocommun",
  "author": "Hadocommun",
  "description": "Display H1 headings as graph node labels instead of file names.",
  "repo": "eieio81810/hadocommun"
}
```

   **命名規則チェック:**
   - ✅ ID に "plugin" という単語を含まない
   - ✅ Name に "Plugin" という単語を含まない
   - ✅ Description の末尾に句読点（`.`）がある

3. コミットメッセージ:
```
Add Hadocommun Plugin
```

4. **Pull Request を作成 (テンプレートに従う):**

   PRテンプレートが表示されるので、すべての項目を埋めてください。

   **PRタイトル:** `Add Hadocommun Plugin`

   **PR本文 (テンプレート例):**
   ```markdown
   ## Plugin Information
   
   - **Plugin Name:** Hadocommun
   - **Plugin ID:** hadocommun
   - **Repository:** https://github.com/eieio81810/hadocommun
   - **Initial Version:** 1.0.0
   - **Minimum Obsidian Version:** 0.15.0
   
   ## Description
   
   This plugin displays H1 headings as graph node labels instead of file names, making graph view more readable and informative.
   
   ### Key Features
   - Automatic H1 heading extraction and display
   - Toggle setting to enable/disable
   - Works with both global and local graph views
   - UTF-8 support for multiple languages
   
   ## Checklist
   
   - [x] I have read the plugin guidelines
   - [x] My plugin follows the Obsidian API best practices
   - [x] I have created a GitHub release with the required files
   - [x] The version in manifest.json matches the GitHub release tag
   - [x] My README is in English
   - [x] I have included a LICENSE file
   - [x] I have added my plugin at the end of community-plugins.json
   - [x] Plugin ID does not contain the word "plugin"
   - [x] Plugin name does not contain the word "Plugin"
   - [x] Description ends with proper punctuation (.?!)
   - [x] manifest.json exists at the root of the repository
   ```

### ❌ よくあるエラーと対処法

#### エラー1: "Unable to find a release with the tag X.X"
**原因:** manifest.json のバージョンと GitHub Release のタグが一致していない

**対処法:**
1. `plugin/manifest.json` を開いてバージョンを確認
2. GitHub Releases でタグが存在するか確認
3. タグ名が完全一致しているか確認（`v1.0.0` ではなく `1.0.0`）

#### エラー2: "The newly added entry is not at the end"
**原因:** `community-plugins.json` で既存プラグインの間に挿入した

**対処法:**
1. ファイルの**最後**に移動
2. カンマの位置に注意（最後のプラグインの後にカンマを追加）

#### エラー3: "You did not follow the pull request template"
**原因:** PR作成時にテンプレートを削除したか、必要な情報を記載していない

**対処法:**
1. PRの説明を編集
2. テンプレートのすべての項目を埋める
3. チェックリストをすべて確認

#### エラー4: "Please don't use the word plugin/Plugin in the ID/name"
**原因:** プラグインIDやNameに "plugin" または "Plugin" という単語を使用した

**対処法:**
1. `manifest.json` を開く
2. `"id": "your-name-plugin"` → `"id": "your-name"` に変更
3. `"name": "Your Plugin"` → `"name": "Your Name"` に変更
4. ルートの `manifest.json` も同じように変更

#### エラー5: "Your description needs to have one of the following characters at the end"
**原因:** 説明文の末尾に句読点がない

**対処法:**
1. `manifest.json` の `description` を確認
2. 末尾に `.?!)` のいずれかを追加
3. 例: `"description": "Display H1 headings as labels"` → `"description": "Display H1 headings as labels."`

#### エラー6: "You don't have a manifest.json at the root of your repo"
**原因:** リポジトリのルートディレクトリに `manifest.json` が存在しない

**対処法:**
1. `plugin/manifest.json` をルートディレクトリにコピー
2. 両方のファイルが同一の内容であることを確認
3. Git にコミットしてプッシュ

### PR テンプレートの記入

- [ ] プラグイン名とIDが一致
- [ ] 最新バージョンが正しく設定
- [ ] **GitHub Release が作成済み**
- [ ] **manifest.json のバージョンとリリースタグが一致**
- [ ] リリースにファイルが添付されている
- [ ] README が英語で書かれている
- [ ] ライセンスが明記されている
- [ ] NOTICES.md にサードパーティライセンスを記載
- [ ] **community-plugins.json の最後に追加**
- [ ] **プラグインID に "plugin" という単語を含まない**
- [ ] **プラグイン名に "Plugin" という単語を含まない**
- [ ] **説明文の末尾に句読点 (.?!) がある**
- [ ] **manifest.json がリポジトリルートに存在**

## ✅ 完了したら

- [ ] NOTICES.md 生成完了（`npm run generate-notices`）
- [ ] manifest.json をルートディレクトリに配置
- [ ] プラグイン ID と Name が命名規則に準拠
- [ ] README.md が英語で書かれている
- [ ] GitHub Release 作成完了
- [ ] obsidian-releases に PR 送信完了
- [ ] **PR テンプレートをすべて記入** → [[PR_Submission_Checklist|提出チェックリスト]]
- [ ] レビュー対応完了
- [ ] プラグイン公開完了 🎉

公開後は Discord で報告し、コミュニティに共有しましょう！

詳細な提出チェックリストは [[PR_Submission_Checklist|こちら]] を参照してください。

---

[[Plugin_Development_Guide|開発ガイドに戻る]]
