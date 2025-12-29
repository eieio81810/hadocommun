# GitHub Copilot カスタム指示書

本プロジェクトで Copilot がコード生成・編集する際の必須ルールです。

## 文字エンコーディング

- すべてのソース／Markdown／設定ファイルは **UTF-8（BOM なし）** で保存すること。
- Shift JIS など他エンコーディングへの自動変換を禁止。Visual Studio で保存する場合も UTF-8（BOM なし）を選択する。
- 既存ファイルを開いて文字化けした場合は、UTF-8 で再保存してから編集する。

### ビルドツールでのエンコーディング指定

- esbuild: `charset: 'utf8'` を必ず指定する。
- webpack を利用する場合も、ローダー／出力のエンコーディングを UTF-8 に固定する。

例（esbuild）:
```javascript
const context = await esbuild.context({
  // ...other options
  charset: 'utf8',  // UTF-8で保存
  // ...
});
```

## Obsidian プラグイン開発

### 環境構築

- Obsidian のプラグインフォルダ `obsidian_hadocommun/.obsidian/plugins/hadocommun-plugin/` を作成すること
- TypeScript での開発
- esbuild を利用したビルド

### プラグイン開発の手順

1. `main.ts` を作成
2. `npm run dev` でプレビュー
3. `npm run build` でビルド

### エンコーディングルール

- ソースコードは必ず UTF-8（BOM なし）で保存
- 特に日本語などマルチバイト文字を扱う場合、文字化けに注意

## GitHub Copilot に対する指示

### 基本ルール

- エンコーディングに関する指示は明確に
- ファイル操作に関する関数は必ず明示すること

### よく使うファイル操作

- **取得**: `get_file`
- **作成**: `create_file`
- **編集**: `edit_file`
- **削除**: `remove_file`

## よくあるトラブルと解決策

### 文字化け

原因: ファイルの文字エンコーディングが UTF-8 でない
対処法: Visual Studio やエディタで UTF-8（BOM なし）で再保存

### ビルドエラー

原因: エンコーディング指定忘れ
対処法: esbuild または webpack の設定を見直し、UTF-8 を指定

## 参考リンク

- [Obsidian API リファレンス](https://github.com/obsidianmd/obsidian-api)
- [esbuild ドキュメント](https://esbuild.github.io/)
