# Hadocommun Plugin

Obsidian用のハドこみゅプラグインです。

## 開発のセットアップ

### 0. エンコーディング設定（重要！）

日本語を含むファイルを正しく扱うために、Visual Studio Codeで以下を確認してください：

1. ファイルを開いた状態で、右下のエンコーディング表示を確認
2. 「UTF-8」と表示されていない場合は、クリックして「UTF-8で保存」を選択
3. `main.ts` など日本語を含むファイルは必ずUTF-8（BOMなし）で保存

### 1. 依存関係のインストール

```bash
cd plugin
npm install
```

### 2. 開発モードで実行

```bash
npm run dev
```

これでファイルの変更を検知し、自動でビルドします。

### 3. ビルド（本番用）

```bash
npm run build
```

### 4. Obsidianでの使用

ビルド後、プラグインファイルをObsidianのプラグインディレクトリにコピー：

```bash
# プラグインディレクトリにコピー
cp main.js manifest.json ../docs/.obsidian/plugins/hadocommun-plugin/
```

## 機能

- **挨拶メッセージ表示**: リボンアイコンまたはコマンドパレットから挨拶メッセージを表示
- **設定画面**: 挨拶メッセージをカスタマイズ可能
- **グラフビューカスタマイズ**: H1見出しをグラフノード名として使用可能

## 開発のヒント

- `main.ts` がプラグインのエントリーポイントです
- 設定は `HadocommunPluginSettings` インターフェースで定義されています
- コマンドやリボンアイコンは `onload()` メソッド内で追加できます
- Obsidian APIのドキュメント: https://github.com/obsidianmd/obsidian-api

## プラグインの有効化

1. Obsidianの設定を開く
2. 「コミュニティプラグイン」に移動
3. 「制限モードをオフ」にする（初回のみ）
4. 「Hadocommun Plugin」を有効化

## ライセンス

MIT
