# Hadocommun

HADOコミュニティ「ハドこみゅ」のObsidianプラグイン

このプラグインは、グラフビューでの情報をより読みやすくするために、ファイル名の代わりにH1見出しをノードラベルとして表示します。

---

## 🌐 English

For English documentation, see [README_EN.md](README_EN.md).

---

## 🌟 機能

- **H1をグラフラベルに**: 各ノートの最初のH1見出しを自動的にグラフビューのラベルとして表示
- **リアルタイム更新**: ファイルが変更されるとラベルが自動的に更新
- **パフォーマンス最適化**: Obsidianのメタデータキャッシュを使用して迅速に取得（ファイルコンテンツへのフォールバック付き）
- **簡単トグル**: シンプルな設定で機能の有効/無効を切り替え
- **UTF-8対応**: 日本語、中国語、韓国語などの言語でシームレスに動作

## 📸 スクリーンショット

### 変更前（ファイル名）

![before.png](https://github.com/eieio81810/hadocommun/blob/main/before.png)


### 変更後（H1見出し）

![after.png](https://github.com/eieio81810/hadocommun/blob/main/after.png)

> **注:** これらのプレースホルダーは、プラグインの実際の動作画面のスクリーンショットに差し替えてください。

## 🚀 インストール

### Obsidianコミュニティプラグインからのインストール（推奨）

1. Obsidianの設定を開く
2. **コミュニティプラグイン** に移動
3. **ブラウズ** をクリックし、「Hadocommun」を検索
4. **インストール** をクリック
5. プラグインを有効にする

### 手動インストール

1. [最新リリース](https://github.com/eieio81810/hadocommun/releases/latest) から `main.js` と `manifest.json` をダウンロード
2. ボールトの `.obsidian/plugins/` ディレクトリに `hadocommun` というフォルダを作成
3. ダウンロードしたファイルを `hadocommun` フォルダに配置
4. Obsidianをリロード
5. 設定 → コミュニティプラグイン でプラグインを有効にする

## 📖 使い方

1. Obsidianの設定を開く
2. **Hadocommun** セクションに移動
3. **「グラフノードのラベルにH1を使用」** を有効にする
4. グラフビューを開く（Ctrl/Cmd + G）
5. ノードラベルがファイル名の代わりにH1見出しを表示するようになります

### 動作原理

- プラグインは各ノートの最初のH1見出し（`# 見出し`）を抽出します
- ノートにH1見出しがある場合、グラフビューでのラベルとして使用されます
- H1見出しが見つからない場合は、元のファイル名が表示されます
- ファイルを編集するとラベルが自動的に更新されます

### ヒント

- より良いグラフの読みやすさのために、説明的なH1見出しを使用してください
- 設定はObsidianを再起動せずにオン/オフを切り替え可能です
- グローバルおよびローカルのグラフビューの両方で動作します

## 🛠️ 開発

このプラグインはテスト駆動開発（TDD）方式で開発されています。

### セットアップ

```bash
git clone https://github.com/eieio81810/hadocommun.git
cd hadocommun/plugin
npm install
```

### ビルド

```bash
npm run dev    # 自動リビルド付き開発モード
npm run build  # 本番ビルド
```

### テスト

```bash
npm test              # すべてのテストを実行
npm run test:watch    # ウォッチモード
npm run test:coverage # カバレッジレポート
```

詳細については、[plugin/README.md](plugin/README.md) および [docs/Plugin_Development_Guide.md](docs/Plugin_Development_Guide.md) を参照してください。

## 🤝 コントリビューション

コントリビューション大歓迎です！プルリクエストをお気軽にご提出ください。

1. リポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/awesome-feature`)
3. まずテストを書く（TDDアプローチ）
4. 機能を実装
5. 変更をコミット (`git commit -m 'Add awesome feature'`)
6. ブランチにプッシュ (`git push origin feature/awesome-feature`)
7. プルリクエストを作成

コントリビューションガイドラインについては、[docs/Contributing.md](docs/Contributing.md) を参照してください。

## 📄 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) を参照

## 🙏 感謝

- グラフビューのカスタマイズ技術に関して [Graph-Link-Types](https://github.com/natefrisch01/Graph-Link-Types) プラグインにインスパイアを受けました
- [Obsidian API](https://github.com/obsidianmd/obsidian-api) を使用して構築
- フィードバックとサポートをいただいたObsidianコミュニティに感謝

## 📞 サポート

- **Issues**: [GitHub Issues](https://github.com/eieio81810/hadocommun/issues)
- **Discussions**: [GitHub Discussions](https://github.com/eieio81810/hadocommun/discussions)
- **Discord**: [Hadocommun Discord](https://discord.gg/GDBTSf7bhZ)

## 🔗 リンク

- [GitHubリポジトリ](https://github.com/eieio81810/hadocommun)
- [リリースノート](https://github.com/eieio81810/hadocommun/releases)
- [プラグインガイドライン](https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines)

---

❤️で作成された [Hadocommun](https://github.com/eieio81810) コミュニティ
