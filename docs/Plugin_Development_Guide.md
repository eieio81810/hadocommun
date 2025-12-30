# ハドこみゅプラグイン開発ガイド 🛠️

Obsidianプラグインの開発手順とベストプラクティスをまとめたガイドです。

---

## 📚 関連ドキュメント

- [[Welcome|トップページ]] - ハドこみゅ知識ベースのホーム
- [[Contributing|寄稿ガイド]] - ドキュメント追加・編集方法
- [[Markdown_knowhow|マークダウン書き方]] - 記法の基本

---

## 🏗️ プロジェクト構成

```
hadocommun/
├── plugin/              # プラグイン本体
│   ├── src/            # ビジネスロジック（テスト可能）
│   ├── tests/          # Jestテスト
│   ├── main.ts         # プラグインエントリーポイント
│   └── manifest.json   # プラグインメタデータ
├── docs/               # Obsidian Vault（ドキュメント）
│   └── .obsidian/plugins/hadocommun-plugin/  # 開発用プラグイン配置先
└── .github/
    └── copilot-instructions.md  # Copilot開発ルール
```

---

## 🚀 セットアップ

### 1. 依存関係のインストール

```bash
cd plugin
npm install
```

### 2. 開発モードで起動

```bash
npm run dev
```

ファイル変更を検知して自動でリビルドされます。

### 3. Obsidianでプラグインを有効化

1. Obsidian で `docs/` フォルダを Vault として開く
2. 設定 → コミュニティプラグイン → 制限モードをオフ
3. 「Hadocommun Plugin」を有効化

---

## 🧪 テスト駆動開発（TDD）

### Red → Green → Refactor サイクル

#### 1. **Red（失敗するテストを書く）**

`plugin/tests/` に新しいテストファイルを作成：

```typescript
// tests/myFeature.test.ts
import { MyFeature } from '../src/myFeature';

describe('MyFeature', () => {
  it('should do something', () => {
    const feature = new MyFeature();
    expect(feature.doSomething()).toBe('expected result');
  });
});
```

テスト実行（失敗することを確認）：

```bash
npm test
```

#### 2. **Green（最小限の実装でテストを通す）**

`plugin/src/` に実装：

```typescript
// src/myFeature.ts
export class MyFeature {
  doSomething(): string {
    return 'expected result';
  }
}
```

テストが通ることを確認：

```bash
npm test
```

#### 3. **Refactor（コードを改善）**

テストが通った状態を保ちながらリファクタリング。

#### 4. **Integrate（プラグインに統合）**

`main.ts` から新機能を呼び出す：

```typescript
import { MyFeature } from './src/myFeature';

export default class HadocommunPlugin extends Plugin {
  async onload() {
    const feature = new MyFeature();
    feature.doSomething();
  }
}
```

---

## 📦 ビルド＆デプロイ

### 本番用ビルド

```bash
npm run build
```

### 開発用プラグインを更新

```powershell
Copy-Item -Path plugin/main.js,plugin/manifest.json -Destination docs/.obsidian/plugins/hadocommun-plugin/ -Force
```

### Obsidianでプラグインをリロード

- Obsidian を再起動、または
- プラグインを無効化 → 有効化

---

## 🎯 現在の機能

### グラフビューH1見出し表示

グラフビューのノードラベルを、ファイル名ではなく**ファイル内の最初のH1見出し**で表示します。

**使い方:**
1. 設定 → Hadocommun Plugin → 「グラフビューでH1見出しを使用」をON
2. グラフビューを開くと、ノード名がH1見出しに置き換わります

**仕組み:**
- `GraphLabelManager` がメタデータキャッシュ優先でH1を取得
- レンダラーのノードラベルを直接書き換え
- 設定OFF時に元のファイル名に復元

---

## 🔧 トラブルシューティング

### 文字化けが発生する

- すべてのファイルを **UTF-8（BOMなし）** で保存
- VS Code 右下のエンコーディング表示を確認

### テストが失敗する

```bash
npm test -- --verbose
```

詳細なエラーログを確認し、Red→Green→Refactorサイクルを回す。

### プラグインが動作しない

1. Obsidian 開発者コンソールを開く（Ctrl+Shift+I / Cmd+Opt+I）
2. エラーメッセージを確認
3. `main.js` が最新版かチェック
4. プラグインを無効化 → 有効化で再読み込み

---

## 📖 学んだこと

### グラフビューのカスタマイズ

- Obsidian のグラフレンダラーは `leaf.view.renderer` からアクセス可能
- ノード情報は `renderer.nodeLookup` または `renderer.nodes` に格納
- ラベルは PIXI.js の `Text` オブジェクト（`node.text.text` で直接書き換え可能）

### Obsidian API との付き合い方

- 公開APIは限定的なため、非公式プロパティを `(obj as any)` で扱う場面が多い
- ビジネスロジックは `src/` に分離し、API依存を最小化してテスタビリティを確保

### 参考になったリポジトリ

- [Graph-Link-Types](https://github.com/natefrisch01/Graph-Link-Types) - グラフビューのカスタマイズ手法

---

## 🤝 コントリビューション

このプラグインへの貢献は大歓迎です！

1. [[Contributing|寄稿ガイド]] を参照
2. 新機能はテストファーストで開発
3. コミット前に `npm test` でテスト通過を確認
4. Pull Request を送信

---

## 📄 ライセンス

MIT License

---

[[Welcome|トップページに戻る]]
