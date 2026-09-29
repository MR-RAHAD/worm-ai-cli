# worm-ai 🤖

Chat with Grok AI right from your terminal. Thin CLI client — all AI processing happens server-side.

## Install

```bash
npm install -g worm-ai
```

## Usage

```bash
# First run asks for your API key (saved for next time)
worm-ai "Bangladesh er capital kothay?"

# Save key directly
worm-ai --key YOUR_API_KEY

# Pipe input
echo "2+2 koto?" | worm-ai

# Logout (delete saved key)
worm-ai --logout
```

You can also set the key via env var instead of the config file:

```bash
export WORM_AI_API_KEY="your-key-here"
```

## Get an API Key

📩 Telegram: https://t.me/rabbyhosainRahad

## How it works

This package is a thin client. Your prompt + API key goes to the Worm AI server, which talks to Grok and returns the reply. No API logic lives in this package, so it stays working even when the upstream changes.

## License

MIT
