#!/usr/bin/env node
/**
 * Worm AI - API Key Generator (seller er jonno)
 * Usage: node gen-key.js [customer-name]
 * Output: worm-XXXX-XXXX-XXXX format key
 */
const crypto = require("crypto");

const name = process.argv[2] || "customer";
const rand = () =>
  crypto.randomBytes(3).toString("hex").toUpperCase();

const key = `worm-${rand()}-${rand()}-${rand()}`;

console.log(`Customer: ${name}`);
console.log(`API Key : ${key}`);
console.log(``);
console.log(`Vercel env (WORM_API_KEYS) te ei key ta add koro, comma diye:`);
console.log(`  purano_keys,${key}`);
