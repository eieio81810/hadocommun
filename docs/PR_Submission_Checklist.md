# Obsidian コミュニティプラグイン 詳細チェックリスト

このチェックリストは、obsidian-releases へのプルリクエスト提出前に確認すべき項目をまとめたものです。

---

## 📋 PR テンプレート記入例

### Repo URL

```
Link to my plugin: https://github.com/eieio81810/hadocommun
```

### Release Checklist

#### テスト環境

- [x] Windows
- [x] macOS (想定動作確認済み)
- [ ] Linux (想定動作確認済み)
- [ ] Android (isDesktopOnly: false なので対応)
- [ ] iOS (isDesktopOnly: false なので対応)

#### GitHub Release ファイル

- [x] `main.js` - 添付済み
- [x] `manifest.json` - 添付済み
- [ ] `styles.css` - なし (オプション)

#### バージョン管理

- [x] GitHub release 名が `manifest.json` のバージョンと完全一致
  - manifest.json: `"version": "1.0.0"`
  - リリースタグ: `1.0.0` (⚠️ `v` プレフィックスなし)

#### ID とファイル

- [x] `manifest.json` の `id` が `community-plugins.json` の `id` と一致
  - 両方とも: `"hadocommun"`

#### ドキュメント

- [x] README.md が英語で書かれている
- [x] プラグインの目的と使い方を説明している

#### ポリシーとガイドライン

- [x] [Developer Policies](https://docs.obsidian.md/Developer+policies) を読んだ
- [x] [Plugin Guidelines](https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines) を読んだ

#### ライセンス

- [x] LICENSE ファイルを追加済み (MIT License)
- [x] サードパーティコードのライセンスを `NOTICES.md` に記載済み

---

## 🚀 提出前の最終確認

### 1. manifest.json (ルートとplugin/)

両方のファイルが同一の内容であることを確認：

```json
{
  "id": "hadocommun",
  "name": "Hadocommun",
  "version": "1.0.0",
  "minAppVersion": "0.15.0",
  "description": "Display H1 headings as graph node labels instead of file names.",
  "author": "Hadocommun",
  "authorUrl": "https://github.com/eieio81810",
  "isDesktopOnly": false
}
```

**確認事項:**
- ✅ ID に "plugin" という単語を含まない
- ✅ Name に "Plugin" という単語を含まない
- ✅ Description の末尾に `.` がある
- ✅ authorUrl は作者のプロフィールURL（プラグインのリポジトリURLではない）

### 2. GitHub Release

**URL:** `https://github.com/eieio81810/hadocommun/releases/tag/1.0.0`

**確認事項:**
- [ ] リリースタグが `1.0.0` (⚠️ `v1.0.0` ではない)
- [ ] リリース名が `1.0.0`
- [ ] `main.js` が添付されている
- [ ] `manifest.json` が添付されている

### 3. community-plugins.json への追加

**場所:** ファイルの**最後**

```json
{
  "id": "hadocommun",
  "name": "Hadocommun",
  "author": "Hadocommun",
  "description": "Display H1 headings as graph node labels instead of file names.",
  "repo": "eieio81810/hadocommun"
}
```

### 4. README.md の内容確認

- [ ] プラグインの目的が明確
- [ ] スクリーンショットまたはデモがある
- [ ] インストール方法が記載されている
- [ ] 使い方が説明されている
- [ ] ライセンス情報が記載されている

### 5. NOTICES.md の確認

- [x] サードパーティライセンス情報が記載されている
- [x] `npm run generate-notices` で最新版を生成済み

---

## 📝 PR 本文 (テンプレート記入例)

```markdown
# I am submitting a new Community Plugin

- [x] I attest that I have done my best to deliver a high-quality plugin, am proud of the code I have written, and would recommend it to others. I commit to maintaining the plugin and being responsive to bug reports. If I am no longer able to maintain it, I will make reasonable efforts to find a successor maintainer or withdraw the plugin from the directory.

## Repo URL

<!--- Paste a link to your repo here for easy access -->
Link to my plugin:https://github.com/eieio81810/hadocommun

## Release Checklist
- [x] I have tested the plugin on
  - [x]  Windows
  - [x]  macOS
  - [x]  Linux
  - [ ]  Android _(if applicable)_
  - [ ]  iOS _(if applicable)_
- [x] My GitHub release contains all required files (as individual files, not just in the source.zip / source.tar.gz)
  - [x] `main.js`
  - [x] `manifest.json`
  - [ ] `styles.css` _(optional)_
- [x] GitHub release name matches the exact version number specified in my manifest.json (_**Note:** Use the exact version number, don't include a prefix `v`_)
- [x] The `id` in my `manifest.json` matches the `id` in the `community-plugins.json` file.
- [x] My README.md describes the plugin's purpose and provides clear usage instructions.
- [x] I have read the developer policies at https://docs.obsidian.md/Developer+policies, and have assessed my plugin's adherence to these policies.
- [x] I have read the tips in https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines and have self-reviewed my plugin to avoid these common pitfalls.
- [x] I have added a license in the LICENSE file.
- [x] My project respects and is compatible with the original license of any code from other plugins that I'm using.
      I have given proper attribution to these other projects in my `README.md`.
```

---

## ⚠️ よくある間違いと対処法

### エラー1: "Unable to find a release with the tag X.X"
- **原因:** manifest.json のバージョンとリリースタグが一致していない
- **対処:** タグ名が `1.0.0` (⚠️ `v` なし) であることを確認

### エラー2: "The newly added entry is not at the end"
- **原因:** `community-plugins.json` で最後に追加していない
- **対処:** ファイルの最後に移動

### エラー3: "You did not follow the pull request template"
- **原因:** テンプレートの項目を記入していない
- **対処:** すべてのチェックボックスを確認し、該当するものをチェック

### エラー4: "Please don't use the word plugin/Plugin"
- **原因:** ID や Name に "plugin" を使用
- **対処:** `manifest.json` の ID と Name から削除

### エラー5: "Your description needs to have one of the following characters at the end"
- **原因:** Description の末尾に句読点がない
- **対処:** `.?!)` のいずれかを追加

### エラー6: "You don't have a manifest.json at the root"
- **原因:** リポジトリルートに manifest.json がない
- **対処:** `plugin/manifest.json` をルートにコピー

### エラー7: "The authorUrl field should not point to the plugin repository"
- **原因:** `authorUrl` がプラグインのリポジトリURLを指している
- **対処:** 作者のGitHubプロフィール（例: `https://github.com/username`）または公式サイトに変更
- **例:**
  - ❌ `"authorUrl": "https://github.com/eieio81810/hadocommun"`
  - ✅ `"authorUrl": "https://github.com/eieio81810"`

---

## ✅ 提出手順

1. **すべてのチェック項目を確認**
2. **コードレビュー対応** → [[Code_Review_Guide|コードレビューガイド]]
3. **GitHub Release を作成** (まだの場合)
4. **obsidian-releases リポジトリをフォーク**
5. **`community-plugins.json` の最後に追加**
6. **コミット＆プッシュ**
7. **プルリクエストを作成** (テンプレートに従って記入)
8. **ボットのチェック結果を確認**
9. **自動コードレビューの結果を確認し、必要なら修正**
10. **レビュー対応**

---

## 📚 参考リンク

- [Obsidian Developer Policies](https://docs.obsidian.md/Developer+policies)
- [Plugin Guidelines](https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines)
- [obsidian-releases リポジトリ](https://github.com/obsidianmd/obsidian-releases)
- [Submit your plugin](https://docs.obsidian.md/Plugins/Releasing/Submit+your+plugin)

---

[[Plugin_Release_Guide|リリースガイドに戻る]]
