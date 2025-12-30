# Hadocommun

Open-source project for the HADO community "Hadocommun"

This is a monorepo containing an Obsidian vault (documentation) and an Obsidian plugin.

---

## 🌐 日本語

日本語版のドキュメントは [README.md](README.md) をご覧ください。

---

## 📁 Project Structure

```
hadocommun/
├── README.md                    # Japanese version
├── README_EN.md                 # This file (English)
├── LICENSE                      # MIT License
├── .github/
│   └── copilot-instructions.md # GitHub Copilot instructions
├── plugin/                      # Plugin development directory
│   ├── README.md               # Plugin development guide
│   ├── src/                    # Business logic (testable)
│   ├── tests/                  # Jest tests
│   ├── main.ts                 # Plugin entry point
│   ├── manifest.json           # Plugin manifest
│   ├── package.json            # Dependencies and build scripts
│   ├── jest.config.js          # Jest test configuration
│   ├── tsconfig.json           # TypeScript configuration
│   ├── esbuild.config.mjs      # Build configuration
│   └── .gitignore              # Build artifacts exclusion
└── docs/                        # Documentation & Obsidian vault
    ├── Welcome.md              # Introduction to Hadocommun
    ├── Contributing.md         # Contribution guide
    ├── Plugin_Development_Guide.md  # Plugin development guide
    ├── Plugin_Release_Guide.md      # Plugin release guide
    ├── Markdown_knowhow.md     # Markdown guide
    └── .obsidian/              # Obsidian vault settings
        └── plugins/            # Plugin installation directory
```

## 🚀 Quick Start

### View Documentation

1. Install [Obsidian](https://obsidian.md/)
2. Open the `docs/` directory as a vault

### Plugin Development

```bash
cd plugin
npm install        # Install dependencies
npm run dev        # Development mode (auto-rebuild)
npm test           # Run tests
npm run build      # Production build
```

For details, see:
- [plugin/README.md](plugin/README.md) - Plugin development instructions
- [docs/Plugin_Development_Guide.md](docs/Plugin_Development_Guide.md) - Development guide
- [docs/Plugin_Release_Guide.md](docs/Plugin_Release_Guide.md) - Release instructions

## 📝 Encoding

- All files must be saved as **UTF-8 (without BOM)**
- Pay special attention to files containing Japanese characters
- See [.github/copilot-instructions.md](.github/copilot-instructions.md) for details

## 🧪 Test-Driven Development (TDD)

This plugin adopts Test-Driven Development.

**Red → Green → Refactor** cycle:
1. **Red**: Write a failing test
2. **Green**: Implement minimal code to pass the test
3. **Refactor**: Improve code while keeping tests green

For details, see [docs/Plugin_Development_Guide.md](docs/Plugin_Development_Guide.md).

## 🤝 Contributing

Pull requests and issues are welcome!

### Document Contributions

Add or edit notes about HADO techniques, tactics, etc.  
→ [docs/Contributing.md](docs/Contributing.md)

### Plugin Development

Add features or improve the Obsidian plugin.  
→ [docs/Plugin_Development_Guide.md](docs/Plugin_Development_Guide.md)

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

## 🔗 Links

- [GitHub Repository](https://github.com/eieio81810/hadocommun)
- [Hadocommun Discord](https://discord.gg/GDBTSf7bhZ)

## About Hadocommun

**Hadocommun** is a community for the AR sport HADO, organizing events, workshops, and tournaments primarily in Tokyo, Japan.

We use Obsidian to manage our knowledge base collaboratively, treating information as a neural network of interconnected notes.
