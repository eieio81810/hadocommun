# プラグインインストール先

このディレクトリには、`plugin/` ディレクトリでビルドしたプラグインファイルをコピーします。

## インストール方法

プラグインディレクトリ（`plugin/`）でビルド後：

```bash
cd plugin
npm run build
cp main.js manifest.json ../docs/.obsidian/plugins/hadocommun-plugin/
```

## 必要なファイル

- `main.js` - ビルドされたプラグインコード
- `manifest.json` - プラグインマニフェスト

これらのファイルはビルド成果物なのでgitには含まれません。
