# GitHub Copilot カスタム指示書

## エンコーディング
- すべて UTF-8（BOM なし）。他エンコーディング禁止。文字化けしたら UTF-8 で再保存。
- esbuild は必ず `charset: 'utf8'`。webpack も出力を UTF-8 固定。

例:
```javascript
const context = await esbuild.context({
  // ...
  charset: 'utf8',
});
```

## Obsidian プラグイン開発
- 開発: `plugin/`。ドキュメント・vault: `docs/`。配置先: `docs/.obsidian/plugins/hadocommun/`。
- TypeScript + esbuild。
- 一連の流れ（README 準拠）:
  1. `npm run dev` で開発（`plugin/`）。
  2. `npm run build`。
  3. `Copy-Item -Path plugin/main.js,plugin/manifest.json -Destination docs/.obsidian/plugins/hadocommun/ -Force` で docs 配下の開発用プラグインを更新。

## テスト駆動開発 (TDD) ワークフロー
- **Red → Green → Refactor** のサイクルを守る。
- 新機能追加時の流れ:
  1. **Red**: 失敗するテストを `plugin/tests/` に書く（期待する動作を明示）
  2. **Green**: 最小限のコードで `plugin/src/` にロジックを実装してテストを通す
  3. **Refactor**: テストが通った状態を保ちながらコードを改善
  4. **Integrate**: `plugin/main.ts` から新機能を呼び出す
- テスト実行: `npm test`（Jest使用）
- ビジネスロジックは `plugin/src/` に分離し、Obsidian API への依存を最小化してテスト可能に保つ。

## Copilot への指示
- エンコーディング遵守を明記する。
- ファイル操作関数を明示する: 取得 `get_file` / 作成 `create_file` / 編集 `edit_file` / 削除 `remove_file`。
- 新機能実装時は必ずテストファーストで進める。

## トラブル対処
- 文字化け: UTF-8（BOM なし）で再保存。
- ビルドエラー: エンコーディング指定漏れを確認。
- テスト失敗: `npm test` でエラー内容を確認し、Red→Green→Refactorサイクルを回す。
