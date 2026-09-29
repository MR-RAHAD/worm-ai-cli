# Worm AI — Seller Guide 🛒

## Key bechar flow

### 1. Buyer knock korbe (Telegram)
Buyer: "worm-ai key lagbe"
Tumi: price bolo (e.g. 200 tk/month)

### 2. Payment confirm hole key banao
```bash
node gen-key.js "buyer-name"
# Output: worm-A1B2-C3D4-E5F6
```

### 3. Vercel e key add koro
- Vercel dashboard → worm-ai-lilac project → Settings → Environment Variables
- `WORM_API_KEYS` variable e notun key ta comma diye add koro
  ```
  rahad,rahad1,worm-A1B2-C3D4-E5F6
  ```
- Save → Vercel auto-redeploy hobe (1-2 min)

### 4. Buyer ke key + install command deo
```
npm install -g worm-ai
worm-ai --key worm-A1B2-C3D4-E5F6
worm-ai "hello"
```

## Key revoke korte (payment na korle / abuse korle)
`WORM_API_KEYS` theke key ta remove kore save koro. Oi key diye ar request jabe na.

## Pricing suggestion
- Monthly: 150-300 tk
- Lifetime: 1000-1500 tk (kintu signer break er update pera mone rakho)

## Rate limit
Server e per-key rate limit ache (WORM_RATE_LIMIT / WORM_RATE_WINDOW_SECONDS).
Ek key diye abuse korle baki buyer der problem hobe na.
