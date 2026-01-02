# GitHub Copilot カスタム指示書

## エンコーディング
- すべて UTF-8（BOM なし）。他エンコーディング禁止。文字化けしたら UTF-8 で再保存。

## Obsidian Vault管理
- このリポジトリはObsidian Vaultを管理しています。
- Obsidian設定は `.obsidian/` に格納。
- ドキュメントはMarkdown形式で作成。

## Copilot への指示
- エンコーディング遵守を明記する。
- ファイル操作関数を明示する: 取得 `get_file` / 作成 `create_file` / 編集 `edit_file` / 削除 `remove_file`。

## トラブル対処
- 文字化け: UTF-8（BOM なし）で再保存。

## プラグイン開発について
- NexusPMプラグインの開発は別リポジトリで管理: https://github.com/eieio81810/nexuspm
