# 🚀 GoFundMeme SDK  

[![Website](https://img.shields.io/badge/Website-GoFundMeme.io-blue?style=for-the-badge)](https://www.gofundmeme.io)  
[![X (Twitter)](https://img.shields.io/badge/X-@GoFundMemes-black?style=for-the-badge)](https://x.com/GoFundMemes)  
[![Telegram](https://img.shields.io/badge/Telegram-Join%20Chat-blue?style=for-the-badge)](https://t.me/gofundmeme)  
[![NPM](https://img.shields.io/npm/v/@gofundmeme/sdk?color=red&label=NPM&style=for-the-badge)](https://www.npmjs.com/package/@gofundmeme/sdk)  

---

## 🌟 **Introduction**
The **GoFundMeme SDK** is the official **all-in-one developer toolkit** for interacting with the **GoFundMeme Protocol (GFM)**. It enables seamless integration with **Fair Launches, Bonding Curves, Staking, Harvesting, and Rewards**.

📚 **Full Documentation:** [docs.gofundmeme.io](https://docs.gofundmeme.io/developers/gfm-for-builders)  

---

## 🛠 **Installation**
This package is optimized for **backend development** and **includes full Harvesting capabilities**.

### **Using npm:**
```sh
npm install @gofundmeme/sdk @solana/web3.js moment decimal.js
```
Using yarn:

yarn add @gofundmeme/sdk @solana/web3.js moment decimal.js

🔥 Key Features

✔️ Fair Launch Pools – Decentralized, transparent fundraising for memecoins & beyond.
✔️ Bonding Curve Pools – Dynamic pricing and token issuance.
✔️ Swaps & Liquidity – Token trading and liquidity management.
✔️ Staking & Rewards – Earn a share of protocol fees through staking.
✔️ Harvesting – (Backend-only feature) Collect LP fees and distribute rewards.

🚀 Getting Started

Initialize the SDK

```ts
import { Connection } from "@solana/web3.js";
import { initGoFundMemeSDK } from "@gofundmeme/sdk";

// Replace with your RPC endpoint
const connection = new Connection("https://api.mainnet-beta.solana.com");

(async () => {
  const gfmSDK = await initGoFundMemeSDK({ connection });

  // Example: Fetch a Fair Launch Pool
  const pool = await gfmSDK.pools.fairLaunch.fetchFairLaunchPool({
    mintB: "MINT_ADDRESS_HERE"
  });

  console.log("Pool Data:", pool);
})();
```
🎨 Need a Lightweight Frontend SDK?

If you’re working on a frontend project, you may want to use @gofundmeme/sdk-frontend instead.

🚨 Why?
The full SDK includes external dependencies like Orca SDK, Raydium SDK, and Meteora SDK, which can cause compatibility issues in frontend applications.

✅ Use @gofundmeme/sdk-frontend if:
	•	You don’t need Harvesting features.
	•	You only need pool interactions, swaps, and claims.
	•	You want a lighter, more frontend-friendly package.

📚 Frontend SDK (@gofundmeme/sdk-frontend) Documentation:
See Here

📚 Frontend SDK (@gofundmeme/sdk-frontend) Documentation:
See Here

### 🏗️ Example Use Cases

1️⃣ Fetching a Fair Launch Pool

const pool = await gfmSDK.pools.fairLaunch.fetchFairLaunchPool({
  mintB: "MINT_ADDRESS_HERE"
});
console.log("Fair Launch Pool:", pool);

2️⃣ Creating a Fair Launch Pool
```ts
const { transaction, requestId } = await gfmSDK.api.fairLaunch.createPool.request({
  token: {
    base64: "IMAGE_BASE64_STRING",
    name: "My Token",
    symbol: "MTKN",
    description: "An example token",
    website: "https://example.com",
    twitter: "https://twitter.com/example",
    discord: "https://discord.gg/example",
    telegram: "https://t.me/example"
  },
  tokenomics: {
    supply: 1000000000,
     lpPercent: 40, // % for LP
      fundersPercent: 40, // % for funders
      allocations: [
          { name: "Marketing", percent: 10, destination: "3KgPZdBvh..." },
          { name: "Team", percent: 10, destination: "6KgQZzCvh..." }
      ]
  },
  campaignDurationHours: 6,
  targetRaise: 50,
  amountIn: 5,
  network: "mainnet",
  creatorWalletAddress: "WALLET_PUBLIC_KEY"
});

// Sign and confirm the transaction
const signedTx = transaction.sign(creatorKeypair);
const { mintAddress, txid } = await gfmSDK.api.fairLaunch.createPool.process({
  requestId,
  signedTransaction: signedTx
});

console.log(`🎉 Pool Created! Mint Address: ${mintAddress}, TXID: ${txid}`);
```

3️⃣ Fetching a Bonding Curve Pool
```ts
const bondingCurvePool = await gfmSDK.pools.bondingCurve.fetchBondingCurvePool({
  mintB: "MINT_ADDRESS_HERE"
});
console.log("Bonding Curve Pool Data:", bondingCurvePool);
```

4️⃣ Buying Tokens on the Bonding Curve
```ts
import { Keypair, sendAndConfirmTransaction } from "@solana/web3.js";
import Decimal from "decimal.js";

const payer = Keypair.generate(); // Replace with your actual signer

const { quote: buyQuote, transaction: buyTransaction } =
  await bondingCurvePool.actions.swap.buy({
    amountInUI: new Decimal(1.2), // Buy with 1.2 SOL
    funder: payer.publicKey,
    slippage: 1, // 1% slippage tolerance
  });

// Sign and send the transaction
const buyTxid = await sendAndConfirmTransaction(connection, buyTransaction, [payer]);

console.log(`🎉 Successfully bought tokens! TXID: ${buyTxid}`);
```

5️⃣ Harvesting LP Fees
```ts
const harvestTransaction = await bondingCurvePool.actions.harvestUtils.harvest({
  cranker: payer.publicKey,
});

const harvestTxid = await sendAndConfirmTransaction(
  connection,
  harvestTransaction,
  [payer]
);

console.log(`🌾 Successfully harvested LP fees! TXID: ${harvestTxid}`);
```
📖 Learn More

📚 Full Documentation: docs.gofundmeme.io
🎨 Frontend SDK (@gofundmeme/sdk-frontend): See Here
💻 Contribute to GFM: GitHub
🌍 Join the Community: Telegram | X (Twitter)
