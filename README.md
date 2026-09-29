<p align="center">
  <img src="https://img.shields.io/badge/worm--ai-Grok%20CLI%20Client-00d4ff?style=for-the-badge&logo=terminal&logoColor=white" alt="worm-ai">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/worm-ai"><img src="https://img.shields.io/npm/v/worm-ai?style=flat-square&logo=npm" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/worm-ai"><img src="https://img.shields.io/npm/dm/worm-ai?style=flat-square" alt="npm downloads"></a>
  <img src="https://img.shields.io/badge/node-%3E%3D14-green?style=flat-square&logo=node.js" alt="Node">
  <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License">
</p>

<h3 align="center">🤖 worm-ai — Chat with Grok from Your Terminal</h3>

<p align="center">
  A lightweight CLI client for the Worm AI API.<br>
  No Python, no setup headaches — just install and chat.<br>
  All AI processing happens server-side, so the client never breaks.
</p>

---

## ✨ Features

- 💬 **Chat with Grok** right from the terminal
- 🔑 **API key auth** — saved once, reused forever
- 📥 **Pipe support** — works with stdin for scripting
- 🪶 **Zero dependencies** — pure Node.js, installs in seconds
- 🔄 **Always working** — server-side logic means no client updates needed

---

## 📦 Installation

```bash
npm install -g worm-ai
```

Requires Node.js **14+**.

---

## 🚀 Usage

### First run

```bash
worm-ai "Explain quantum computing simply"
```

On first run, you'll be asked for your API key. It's saved to `~/.worm-ai/config.json` so you only enter it once.

### Commands

| Command | Description |
|---|---|
| `worm-ai "your question"` | Ask Grok anything |
| `worm-ai --key <KEY>` | Save your API key directly |
| `worm-ai --logout` | Delete the saved API key |
| `worm-ai --help` | Show help |
| `echo "hi" \| worm-ai` | Pipe input from stdin |

### Examples

```bash
# Basic chat
worm-ai "Write a haiku about the ocean"

# Multi-word prompts work naturally
worm-ai What is the capital of France?

# Use in scripts
echo "Summarize: artificial intelligence" | worm-ai

# Save key without interactive prompt
worm-ai --key worm-A1B2-C3D4-E5F6
```

---

## 🔑 API Key

### Option 1 — Config file (recommended)

The key is saved automatically on first run, or set it directly:

```bash
worm-ai --key YOUR_API_KEY
```

Stored at `~/.worm-ai/config.json`.

### Option 2 — Environment variable

```bash
export WORM_AI_API_KEY="YOUR_API_KEY"
worm-ai "Hello"
```

The environment variable takes priority over the saved config.

### Get a key

📩 Telegram: [t.me/rabbyhosainRahad](https://t.me/rabbyhosainRahad)

---

## ⚙️ Advanced

### Custom API endpoint

Point the CLI at a different server:

```bash
export WORM_AI_API_URL="https://your-server.com/api/worm-ai"
```

### Exit codes

| Code | Meaning |
|---|---|
| `0` | Success |
| `1` | Error — invalid key, rate limit, network issue, or missing prompt |

---

## 🛠️ How It Works

```
┌──────────┐   prompt + api_key   ┌──────────────┐   Grok API   ┌──────┐
│ worm-ai  │ ───────────────────▶ │  Worm AI     │ ───────────▶ │ Grok │
│   CLI    │ ◀─────────────────── │  Server      │ ◀─────────── │      │
└──────────┘       AI reply       └──────────────┘              └──────┘
```

This package is a **thin client** — it only sends your prompt and API key to the server. All Grok communication logic lives server-side ([MR-RAHAD/worm-ai](https://github.com/MR-RAHAD/worm-ai)), so the CLI keeps working even when the upstream API changes.

---

## ❓ Troubleshooting

**"API key invalid or expired"**
→ Your key is wrong or was revoked. Run `worm-ai --logout`, then set a valid key.

**"Rate limit! Try again later."**
→ You've hit the per-key request limit. Wait a moment and retry.

**"Request timeout"**
→ The server is slow or unreachable. Check your connection and try again.

---

## 📄 License

MIT — see [LICENSE](LICENSE) for details.

---

<p align="center">
  <sub>Built with ❤️ by <a href="https://github.com/MR-RAHAD">Mohammad Rahad</a></sub>
</p>
