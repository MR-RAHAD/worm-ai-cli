#!/usr/bin/env node
/**
 * worm-ai CLI - Thin client for Worm AI (Grok) API
 * All AI logic runs server-side. This CLI just sends your prompt + API key.
 * Get your API key by contacting: https://t.me/rabbyhosainRahad
 */

const https = require("https");
const http = require("http");
const fs = require("fs");
const os = require("os");
const path = require("path");
const readline = require("readline");

const API_BASE_URL =
  process.env.WORM_AI_API_URL || "https://worm-ai-lilac.vercel.app/api/worm-ai";
const CONFIG_DIR = path.join(os.homedir(), ".worm-ai");
const CONFIG_FILE = path.join(CONFIG_DIR, "config.json");

// ---------- config ----------
function loadConfig() {
  try {
    return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));
  } catch {
    return {};
  }
}

function saveConfig(cfg) {
  fs.mkdirSync(CONFIG_DIR, { recursive: true });
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(cfg, null, 2), "utf8");
}

function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(question, (ans) => {
      rl.close();
      resolve(ans.trim());
    })
  );
}

async function getApiKey() {
  // 1. env var wins
  if (process.env.WORM_AI_API_KEY) return process.env.WORM_AI_API_KEY;
  // 2. saved config
  const cfg = loadConfig();
  if (cfg.apiKey) return cfg.apiKey;
  // 3. ask once, then save
  console.log("Worm AI API key lagbe.");
  console.log("Key kinte contact koro: https://t.me/rabbyhosainRahad\n");
  const key = await ask("Tomar API key deo: ");
  if (!key) {
    console.error("API key chara cholbe na.");
    process.exit(1);
  }
  saveConfig({ ...cfg, apiKey: key });
  console.log("Key save hoise (~/.worm-ai/config.json)\n");
  return key;
}

// ---------- http ----------
function apiGet(params) {
  return new Promise((resolve, reject) => {
    const url = new URL(API_BASE_URL);
    for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
    const lib = url.protocol === "https:" ? https : http;
    const req = lib.get(
      url,
      { headers: { "User-Agent": "worm-ai-cli/1.0.0" } },
      (res) => {
        let body = "";
        res.on("data", (c) => (body += c));
        res.on("end", () => resolve({ status: res.statusCode, body }));
      }
    );
    req.on("error", reject);
    req.setTimeout(60000, () => {
      req.destroy();
      reject(new Error("Request timeout (60s)"));
    });
  });
}

// ---------- main ----------
async function main() {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    console.log(`worm-ai - Grok AI CLI client

Usage:
  worm-ai "tomar prosno"          Chat with AI
  worm-ai --key <KEY>             API key save koro
  worm-ai --logout                Saved key delete koro
  echo "hi" | worm-ai             Pipe input

Env:
  WORM_AI_API_KEY                 API key (config file er bodle)

Key kinte: https://t.me/rabbyhosainRahad`);
    return;
  }

  if (args[0] === "--logout") {
    const cfg = loadConfig();
    delete cfg.apiKey;
    saveConfig(cfg);
    console.log("Logged out. Key delete hoise.");
    return;
  }

  if (args[0] === "--key" && args[1]) {
    const cfg = loadConfig();
    cfg.apiKey = args[1];
    saveConfig(cfg);
    console.log("API key save hoise.");
    return;
  }

  // prompt: args or piped stdin
  let prompt = args.filter((a) => !a.startsWith("-")).join(" ");
  if (!prompt && !process.stdin.isTTY) {
    prompt = await new Promise((resolve) => {
      let data = "";
      process.stdin.on("data", (c) => (data += c));
      process.stdin.on("end", () => resolve(data.trim()));
    });
  }
  if (!prompt) {
    console.error('Usage: worm-ai "tomar prosno"');
    process.exit(1);
  }

  const apiKey = await getApiKey();

  try {
    const { status, body } = await apiGet({ q: prompt, api_key: apiKey });

    if (status === 401 || status === 403) {
      console.error(
        "API key invalid ba expired. Notun key diye `worm-ai --logout` kore abar try koro."
      );
      process.exit(1);
    }
    if (status === 429) {
      console.error("Rate limit! Ektu pore abar try koro.");
      process.exit(1);
    }
    if (status < 200 || status >= 300) {
      console.error(`Server error (HTTP ${status}): ${body.slice(0, 300)}`);
      process.exit(1);
    }

    let data;
    try {
      data = JSON.parse(body);
    } catch {
      console.log(body);
      return;
    }
    // common response shapes
    const text =
      data.reply || data.response || data.text || data.message || data.answer;
    if (typeof text === "string") console.log(text);
    else console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

main();
