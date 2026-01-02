# Obsidian プラグイン コードレビュー対応ガイド

Obsidian の自動コードレビューで指摘される一般的な問題と対処法をまとめたガイドです。

---

## 📋 必須修正 (Required)

### 1. Triple Slash Reference の使用禁止

**エラー:**
```
Do not use a triple slash reference for ./node_modules/obsidian/obsidian.d.ts, use import style instead.
```

**修正前:**
```typescript
/// <reference path="./node_modules/obsidian/obsidian.d.ts" />
import { App, Plugin } from 'obsidian';
```

**修正後:**
```typescript
import { App, Plugin } from 'obsidian';
```

**理由:** Triple slash reference は不要。import で十分。

---

### 2. `any` 型の使用禁止

**エラー:**
```
Unexpected any. Specify a different type.
'any' overrides all other types in this union type.
```

**修正前:**
```typescript
private currentRenderer: any | null = null;
private overlayLabels: Map<string, any> = new Map();
```

**修正後:**
```typescript
interface GraphRenderer {
	px?: { stage?: unknown };
	nodes?: unknown[];
	nodeLookup?: Record<string, unknown>;
}

private currentRenderer: GraphRenderer | null = null;
private overlayLabels: Map<string, unknown> = new Map();
```

**理由:** 型安全性のため、適切な型定義またはtyである `unknown` を使用する。

---

### 3. Command ID にプラグイン ID を含めない

**エラー:**
```
The command ID should not include the plugin ID. Obsidian will make sure that there are no conflicts with other plugins.
```

**修正前:**
```typescript
this.addCommand({
	id: 'open-hadocommun-greeting',
	name: 'Show greeting message',
	// ...
});
```

**修正後:**
```typescript
this.addCommand({
	id: 'show-greeting',
	name: 'Show greeting message',
	// ...
});
```

**理由:** Obsidian が自動的に名前空間を管理するため、プラグイン ID は不要。

---

### 4. Promise の適切な処理

**エラー:**
```
Promises must be awaited, end with a call to .catch, end with a call to .then with a rejection handler or be explicitly marked as ignored with the void operator.
```

**修正前:**
```typescript
this.app.workspace.onLayoutReady(() => {
	if (this.settings.useH1ForGraphNodes) {
		this.handleLayoutChange(); // ❌ Promiseを無視
		this.startLabelLoop();
	}
});
```

**修正後:**
```typescript
this.app.workspace.onLayoutReady(() => {
	if (this.settings.useH1ForGraphNodes) {
		void this.handleLayoutChange(); // ✅ 明示的に無視
		this.startLabelLoop();
	}
});
```

**理由:** Promise を意図的に無視する場合は `void` オペレーターを使用する。

---

### 5. console.log の使用禁止

**エラー:**
```
Unexpected console statement. Only these console methods are allowed: warn, error, debug.
```

**修正前:**
```typescript
console.log('Hadocommun loaded');
console.error('Error reading file:', error);
```

**修正後:**
```typescript
// 削除するか、必要ならdebugを使用
// console.debug('Hadocommun loaded');

// エラーハンドリングは静かに処理
try {
	// ...
} catch (error) {
	// Silently handle expected errors
}
```

**理由:** デバッグ用のログはリリース版では不要。エラーも過度に出力しない。

---

### 6. 不要な型アサーションの削除

**エラー:**
```
This assertion is unnecessary since it does not change the type of the expression.
```

**修正前:**
```typescript
(textNode as any).text = h1;
if (typeof (textNode as any).updateText === 'function') {
	(textNode as any).updateText(true);
}
```

**修正後:**
```typescript
interface GraphNode {
	text?: {
		text?: string;
		updateText?: (force: boolean) => void;
	};
}

textNode.text = h1;
if (typeof textNode.updateText === 'function') {
	textNode.updateText(true);
}
```

**理由:** 適切な型定義を行えば型アサーションは不要。

---

### 7. 空の catch ブロックの処理

**エラー:**
```
Empty block statement.
```

**修正前:**
```typescript
try {
	textNode.updateText(true);
} catch (_) {}
```

**修正後:**
```typescript
try {
	textNode.updateText(true);
} catch (error) {
	// Silently ignore PIXI update errors
}
```

**理由:** 空のブロックは意図が不明瞭。コメントで理由を明記する。

---

### 8. UI テキストは Sentence Case を使用

**エラー:**
```
Use sentence case for UI text.
```

**修正前:**
```typescript
.setName('Greeting Message')
.setName('グラフビューでH1見出しを使用')
```

**修正後:**
```typescript
.setName('Greeting message')
.setName('Use H1 for graph node labels')
```

**理由:** Obsidian の UI 統一のため、英語は Sentence case を使用する。

---

### 9. 見出しには Setting API を使用

**エラー:**
```
For a consistent UI use new Setting(containerEl).setName(...).setHeading() instead of creating HTML heading elements directly.
```

**修正前:**
```typescript
containerEl.createEl('h2', {text: 'Hadocommun Settings'});
```

**修正後:**
```typescript
new Setting(containerEl)
	.setName('Hadocommun settings')
	.setHeading();
```

**理由:** Obsidian の標準 UI との一貫性を保つため。

---

### 10. async メソッドには await を含める

**エラー:**
```
Async method 'handleLayoutChange' has no 'await' expression.
```

**修正前:**
```typescript
async handleLayoutChange() {
	this.currentRenderer = null;
	this.currentRenderer = this.findRenderer(); // awaitがない
}
```

**修正後:**
```typescript
handleLayoutChange() {
	this.currentRenderer = null;
	this.currentRenderer = this.findRenderer(); // 同期処理にする
}
```

**理由:** `await` を使わない場合は `async` を削除する。

---

### 11. TFile の型チェックでエラー型を回避

**エラー:**
```
'TFile' is an 'error' type that acts as 'any' and overrides all other types in this union type.
```

**修正前:**
```typescript
const linkDest = this.app.metadataCache.getFirstLinkpathDest(nodeId, '');
if (linkDest instanceof TFile) return linkDest;
```

**修正後:**
```typescript
const linkDest = this.app.metadataCache.getFirstLinkpathDest(nodeId, '');
if (linkDest) return linkDest; // TFileチェックを削除
```

**理由:** `getFirstLinkpathDest` の戻り値は `TFile | null` なので、`instanceof` チェックは不要。

---

### 12. 設定見出しにプラグイン名や "settings" を含めない

**エラー:**
```
Avoid using "settings" in settings headings.
Avoid including the plugin name in settings headings.
Avoid using a "General" heading in settings.
```

**修正前:**
```typescript
new Setting(containerEl)
	.setName('Hadocommun settings')
	.setHeading();

// または
new Setting(containerEl)
	.setName('General')
	.setHeading();
```

**修正後:**
```typescript
new Setting(containerEl)
	.setName('Appearance')
	.setHeading();

// または機能に応じた具体的な名前
new Setting(containerEl)
	.setName('Graph view')
	.setHeading();
```

**理由:** 設定画面は既にプラグイン名で識別されているため、見出しには機能別の具体的なカテゴリ名を使用する。"General" も避け、より具体的な見出しを使用すること。

---

## 📝 オプション修正 (Optional)

### 未使用変数の削除

**エラー:**
```
'_' is defined but never used.
```

**修正前:**
```typescript
} catch (_) {}
```

**修正後:**
```typescript
} catch (error) {
	// Silently ignore PIXI update errors
}
```

**理由:** 可読性とコードの意図を明確にするため。

---

## 🛠️ ローカルでのチェック方法

### Obsidian公式ESLintプラグインを使用（推奨）

Obsidianの自動コードレビューと同じルールをローカルで実行できます。

#### 1. 依存関係のインストール

```bash
cd plugin
npm install --save-dev eslint eslint-plugin-obsidianmd @typescript-eslint/parser @typescript-eslint/utils cross-env
```

#### 2. ESLint設定ファイルの作成

`plugin/eslint.config.mjs`:

```javascript
// eslint.config.mjs
import tsparser from "@typescript-eslint/parser";
import obsidianmd from "eslint-plugin-obsidianmd";

export default [
	{
		files: ["**/*.ts"],
		plugins: {
			obsidianmd,
		},
		languageOptions: {
			parser: tsparser,
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: "module",
			},
		},
		rules: {
			// Obsidian plugin rules
			"obsidianmd/commands/no-plugin-id-in-command-id": "error",
			"obsidianmd/settings-tab/no-manual-html-headings": "error",
			"obsidianmd/settings-tab/no-problematic-settings-headings": "error",
			"obsidianmd/ui/sentence-case": [
				"warn",
				{
					allowAutoFix: true,
					enforceCamelCaseLower: false,
				},
			],
			"obsidianmd/no-sample-code": "warn",
		},
	},
	{
		ignores: [
			"main.js",
			"*.d.ts",
			"node_modules/**",
			"tests/**",
		],
	},
];
```

#### 3. package.jsonにスクリプトを追加

```json
{
  "scripts": {
    "lint": "cross-env ESLINT_USE_FLAT_CONFIG=true eslint .",
    "lint:fix": "cross-env ESLINT_USE_FLAT_CONFIG=true eslint . --fix"
  }
}
```

#### 4. ESLintの実行

```bash
# 問題をチェック
npm run lint

# 自動修正可能な問題を修正
npm run lint:fix
```

### TypeScript型チェックでのエラーについて

TypeScript 5.2以上を使用している場合、型情報を必要とする一部のルール（`prefer-file-manager-trash-file`, `no-tfile-tfolder-cast` など）でエラーが発生する可能性があります。これらのルールは、Obsidianの自動レビューで検証されるため、ローカルでは基本的なルールのみをチェックすることをお勧めします。

---

## ✅ チェックリスト

リリース前に以下を確認:

- [ ] Triple slash reference を削除
- [ ] `any` 型を適切な型または `unknown` に置き換え
- [ ] Command ID からプラグイン ID を削除
- [ ] Promise に `void` または `await` を追加
- [ ] `console.log` を削除
- [ ] 不要な型アサーションを削除
- [ ] 空の catch ブロックにコメントを追加
- [ ] UI テキストを Sentence case に統一
- [ ] 見出しに Setting API を使用
- [ ] 不要な `async` を削除
- [ ] 未使用変数を削除または使用
- [ ] TFile の不要な `instanceof` チェックを削除
- [ ] 設定見出しにプラグイン名や "settings" を含めない

---

## 📚 参考リンク

- [Obsidian ESLint Plugin](https://github.com/obsidianmd/eslint-plugin)
- [Plugin Guidelines](https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

---

[[Plugin_Release_Guide|リリースガイドに戻る]]
