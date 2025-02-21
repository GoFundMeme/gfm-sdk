## 🚀 GoFundMeme SDK  

[![Website](https://img.shields.io/badge/Website-GoFundMeme.io-blue?style=for-the-badge)](https://www.gofundmeme.io)  
[![X (Twitter)](https://img.shields.io/badge/X-@GoFundMemes-black?style=for-the-badge)](https://x.com/GoFundMemes)  
[![Telegram](https://img.shields.io/badge/Telegram-Join%20Chat-blue?style=for-the-badge)](https://t.me/gofundmeme)  
[![NPM](https://img.shields.io/npm/v/@gofundmeme/sdk?color=red&label=NPM&style=for-the-badge)](https://www.npmjs.com/package/@gofundmeme/sdk)  



## 🎉 Welcome to the Official **GoFundMeme SDK**  

The **GoFundMeme SDK** is an all-in-one toolkit designed to simplify and streamline development within the **GFM Protocol**. Whether you're integrating **fair launches**, **bonding curves**, or **staking pools**, this SDK provides a seamless way to interact with the **GFM Program IDL**.  

### ✨ Key Features  

✔️ **Fair Launch** – Decentralized, transparent fundraising for memecoins & beyond.  
✔️ **Bonding Curve** – Dynamic price discovery & token issuance.  
✔️ **Harvesting** – Efficient LP fee collection & reward distribution.  
✔️ **Claiming Rewards** – Automated & flexible reward claims.  
✔️ **Pool Staking** – Permissionless liquidity staking & incentives.  
✔️ **GFM Staking Network** – Earn a share of protocol fees through staking.  

### 🔥 Why Use the GFM SDK?  

🔹 **Developer-Friendly** – Intuitive API with clear documentation.  
🔹 **Optimized for Performance** – Built for speed and efficiency.  
🔹 **Evolving & Expanding** – Continuous updates with new features & improvements.  



## 📢 Stay Updated  

🚀 **This SDK is in active development!** We're continuously enhancing its capabilities and introducing new features. Stay in the loop by joining our **Telegram community** and following us on **X (Twitter)** for real-time updates:  

📢 [Join the Telegram Chat](https://t.me/gofundmeme)  
📢 [Follow us on X](https://x.com/GoFundMemes)  




Here’s the **Installation & Initialization** section for your **README.md** with proper formatting, enhanced clarity, and styling. Let me know if you’d like any modifications! 🚀  

---

## ⚡ Installation  

To get started, install the **GoFundMeme SDK** along with **Solana’s Web3.js** dependency:  

### Using `npm`  
```sh
npm install @gofundmeme/sdk
npm install @solana/web3.js
npm install moment
npm install decimal.js
```

### Using `yarn`  
```sh
yarn add @gofundmeme/sdk
yarn add @solana/web3.js
yarn add moment
yarn add decimal.js
```

---

## 🔧 Initialization  

Setting up the SDK is **effortless**. Simply create a **Solana RPC connection** and pass it into the **SDK initializer**:  

```ts
import { Connection } from "@solana/web3.js";
import { initGoFundMemeSDK } from "@gofundmeme/sdk";

// Replace with your preferred RPC endpoint
const connection = new Connection("https://api.mainnet-beta.solana.com");

(async () => {
  // This is all you need to start interacting with the GFM protocol
  const gfmSDK = await initGoFundMemeSDK({ connection });
})();
```

### ✅ What’s Next?  
Now that your SDK is initialized, you’re ready to interact with the **GoFundMeme Protocol**! Check out the next sections for detailed guides on **Fair Launch**, **Bonding Curves**, **Staking**, and more. 🚀  




---




Here's the **Fair Launch Raises** section for your **README.md**, with well-structured explanations, response examples, and clear documentation.

---

# 🚀 Fair Launch Raises  

The **Fair Launch** mechanism in the **GoFundMeme Protocol** enables decentralized, transparent, and community-driven token launches. This system ensures equitable access to presale allocations while dynamically adjusting fundraising based on demand.  

With the **GoFundMeme SDK**, you can seamlessly:  
✅ Fetch Fair Launch pool details  
✅ Fund or defund a pool  
✅ Claim presale allocations  
✅ Claim preallocations (marketing, team, etc.)  
✅ Harvest LP fees and rewards  

## 🛠️ Fetching a Fair Launch Pool  

To interact with a **Fair Launch pool**, you must first fetch its data using the **mint address** of the token being launched.  

```ts
import { Connection, PublicKey } from "@solana/web3.js";
import { initGoFundMemeSDK } from "@gofundmeme/sdk";

const connection = new Connection("https://api.mainnet-beta.solana.com");

(async () => {
  const gfmSDK = await initGoFundMemeSDK({ connection });

  // Replace with your token mint address
  const mintAddress = new PublicKey("THE TOKEN MINT ADDRESS");

  // Fetch the Fair Launch Pool
  const pool = await gfmSDK.pools.fairLaunch.fetchFairLaunchPool({
    mintB: mintAddress,
  });

  console.log("Fair Launch Pool Data:", pool);
})();
```

---

## 📊 Checking Pool Status  

Once you've fetched the **Fair Launch pool**, you can check its **status, expiration, and funding progress**.  

```ts
import moment from "moment";

const { poolStatus, expirationTimestamp, targetRaise, totalRaised } =
  pool.poolData;

if (poolStatus.raising) {
  console.log("✅ The pool is still in the raising phase.");
}

if (moment(expirationTimestamp.toNumber() * 1000).isAfter(moment())) {
  console.log("⏳ The pool has not expired yet!");
}

if (targetRaise.toNumber() > totalRaised.toNumber()) {
  const remainingSolToRaise =
    (targetRaise.toNumber() - totalRaised.toNumber()) / LAMPORTS_PER_SOL;
  console.log("⚠️ Pool is NOT fully funded yet!", { remainingSolToRaise });
}
```

---

## 💰 Funding the Pool  

Participants can contribute **SOL** to the **Fair Launch pool** before it reaches its target.  

```ts
import { Keypair, sendAndConfirmTransaction } from "@solana/web3.js";

const payer = Keypair.generate(); // Replace with your actual signer

// Create a funding transaction (1 SOL in this example)
const fundTransaction = await pool.actions.fund({
  solAmount: 1,
  funder: payer.publicKey,
});

// Sign and send the transaction
const fundTxid = await sendAndConfirmTransaction(connection, fundTransaction, [
  payer,
]);

console.log(`🎉 Successfully funded the pool! TXID: ${fundTxid}`);
```

---

## 💸 Defunding (Withdrawing Contributions)  

If the pool is **still in the raising phase**, participants can withdraw their contributions.  

```ts
const defundTransaction = await pool.actions.defund({
  funder: payer.publicKey,
});

const defundTxid = await sendAndConfirmTransaction(
  connection,
  defundTransaction,
  [payer]
);

console.log(`💸 Successfully defunded the pool! TXID: ${defundTxid}`);
```

---

## 🎟️ Claiming Presale Allocations  

After the **Fair Launch concludes**, contributors can claim their **presale tokens**.  

```ts
const claimPresaleTransaction = await pool.actions.claimPresale({
  funder: payer.publicKey,
});

const claimPresaleTxid = await sendAndConfirmTransaction(
  connection,
  claimPresaleTransaction,
  [payer]
);

console.log(`🎟️ Presale tokens claimed! TXID: ${claimPresaleTxid}`);
```

---

## 🎯 Claiming Preallocation (Marketing, Team, etc.)  

Some tokens are reserved for marketing, partnerships, or team allocations. These can be claimed separately.  

```ts
const claimPreallocationTransaction = await pool.actions.claimPreallocation({
  funder: payer.publicKey,
});

const claimPreallocationTxid = await sendAndConfirmTransaction(
  connection,
  claimPreallocationTransaction,
  [payer]
);

console.log(`🚀 Preallocation tokens claimed! TXID: ${claimPreallocationTxid}`);
```

---

## 🏦 Fetching LP Fees & Harvester Rewards  

Once the **Fair Launch concludes**, LP fees and harvester rewards can be tracked.  

```ts
const summary = await pool.actions.harvestUtils.getLpStateSummary();
console.log("📊 LP Fee Summary:", summary);
```

### 📌 Example Response:  

```json
{
  "totalHarvested": {
    "tokenA": 33.013248883,
    "tokenB": 56016886.86489466
  },
  "availableForHarvest": {
    "tokenA": 0,
    "tokenB": 885.540800497
  },
  "harvesterRewards": {
    "tokenA": 0,
    "tokenB": 8.85540800497
  }
}
```

---

## 🌾 Harvesting LP Fees  

LP fees collected in the pool can be **harvested** by authorized crankers.  

```ts
const harvestTransaction = await pool.actions.harvestUtils.harvest({
  cranker: payer.publicKey,
});

const harvestTxid = await sendAndConfirmTransaction(
  connection,
  harvestTransaction,
  [payer]
);

console.log(`🌾 LP fees successfully harvested! TXID: ${harvestTxid}`);
```

---

## 🎁 Fetching Presaler Rewards Summary  

Presale contributors can **check their unclaimed LP rewards** before claiming.  

```ts
const presalerRewardsSummary =
  await pool.actions.funderRewardsUtils.fetchFunderRewardsSummary({
    funder: payer.publicKey,
  });

console.log("🎁 Presaler Rewards Summary:", presalerRewardsSummary);
```

### 📌 Example Response:  

```json
{
  "funded": 2.9,
  "claimed": {
    "tokenA": 6.090397809,
    "tokenB": 3987429.885834387
  },
  "available": {
    "tokenA": 0.503932604,
    "tokenB": 618413.982264954
  }
}
```

---

## 💎 Claiming Presaler LP Rewards  

Once rewards are available, contributors can claim them.  

```ts
const claimPresalerRewardsTransaction =
  await pool.actions.funderRewardsUtils.claimRewards({
    funder: payer.publicKey,
  });

const claimPresalerRewardsTxid = await sendAndConfirmTransaction(
  connection,
  claimPresalerRewardsTransaction,
  [payer]
);

console.log(
  `💎 Successfully claimed LP rewards! TXID: ${claimPresalerRewardsTxid}`
);
```

---

## 🔥 Summary  

The **GoFundMeme Fair Launch** system ensures **equitable, community-driven token raises** with easy participation, transparent funding, and automated reward distribution.  

| Action | Description |
|--------|-------------|
| **Fetch Fair Launch Pool** | Retrieve pool details using the token mint address. |
| **Check Pool Status** | Monitor funding progress, expiration, and participation status. |
| **Fund a Pool** | Contribute SOL to an active Fair Launch. |
| **Defund a Pool** | Withdraw funds if the Fair Launch is still raising. |
| **Claim Presale Allocation** | Claim your allocated tokens after the raise ends. |
| **Claim Preallocation** | Collect team/marketing allocations. |
| **Fetch LP Fees & Rewards** | View harvested LP fees and available rewards. |
| **Harvest LP Fees** | Collect LP fees for the protocol or as a cranker. |
| **Fetch Presaler Rewards** | View your unclaimed LP reward balance. |
| **Claim LP Rewards** | Withdraw earned LP rewards. |

🚀 **With the GoFundMeme SDK, Fair Launches are seamless, transparent, and efficient!**  

---

# 💎 Bonding Curve Pools  

The **Bonding Curve Pool** is a dynamic pricing mechanism used in the **GoFundMeme Protocol** to enable seamless token swaps. Instead of relying on traditional order books, **bonding curves** establish an automated market maker (AMM)-style system where price adjusts based on supply and demand.  

With the **GoFundMeme SDK**, you can:  
✅ Fetch **Bonding Curve pool** details  
✅ Buy tokens from the bonding curve  
✅ Sell tokens back for SOL  
✅ Harvest LP fees and staking rewards  
✅ Stake, unstake, and claim rewards  

---

## 🛠️ Fetching a Bonding Curve Pool  

To interact with a **Bonding Curve Pool**, fetch its data using the **mint address** of the token launched in a Fair Launch.  

```ts
import { Connection, PublicKey } from "@solana/web3.js";
import { initGoFundMemeSDK } from "@gofundmeme/sdk";

const connection = new Connection("https://api.mainnet-beta.solana.com");

(async () => {
  const gfmSDK = await initGoFundMemeSDK({ connection });

  // Replace with the token mint address
  const mintAddress = new PublicKey("THE TOKEN MINT ADDRESS");

  // Fetch the Bonding Curve Pool
  const bondingCurvePool = await gfmSDK.pools.bondingCurve.fetchBondingCurvePool(
    { mintB: mintAddress }
  );

  console.log("Bonding Curve Pool Data:", bondingCurvePool);
})();
```

---

## 📊 Checking Pool Status  

Once you've fetched the **Bonding Curve Pool**, you can check its **status, target raise, and funding progress**.  

```ts
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const { poolStatus, targetRaise, totalRaised } = bondingCurvePool.poolData;

if (poolStatus.raising) {
  console.log("✅ The pool is still in the raising phase.");
}

if (targetRaise.toNumber() > totalRaised.toNumber()) {
  const remainingSolToRaise =
    (targetRaise.toNumber() - totalRaised.toNumber()) / LAMPORTS_PER_SOL;
  console.log("⚠️ Pool is NOT fully funded yet!", { remainingSolToRaise });
}
```

---

## 🛒 Buying Tokens on the Bonding Curve  

Purchasing tokens from the **Bonding Curve Pool** is simple. Specify the **amount of SOL** you wish to spend and set a **slippage tolerance**.  

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

// View the purchase quote details
console.log("Buy Quote:", buyQuote);

// Sign and send the transaction
const buyTxid = await sendAndConfirmTransaction(connection, buyTransaction, [
  payer,
]);

console.log(
  `🎉 Successfully bought tokens from the bonding curve! TXID: ${buyTxid}`
);
```

---

## 💰 Selling Tokens Back for SOL  

If you want to **sell** tokens back to the **Bonding Curve Pool**, specify the **amount of tokens** to sell and set your **slippage tolerance**.  

```ts
const { quote: sellQuote, transaction: sellTransaction } =
  await bondingCurvePool.actions.swap.sell({
    amountInUI: new Decimal(10_000_000.1153), // Selling 10,000,000.1153 tokens
    funder: payer.publicKey,
    slippage: 2.5, // 2.5% slippage tolerance
  });

// View the sell quote details
console.log("Sell Quote:", sellQuote);

// Sign and send the transaction
const sellTxid = await sendAndConfirmTransaction(connection, sellTransaction, [
  payer,
]);

console.log(
  `💰 Successfully sold tokens on the bonding curve for SOL! TXID: ${sellTxid}`
);
```

---

## 🏦 Fetching LP Fees & Harvester Rewards  

Once the **Bonding Curve Pool** has completed its lifecycle, **LP fees and harvester rewards** can be retrieved.  

```ts
const summary = await bondingCurvePool.actions.harvestUtils.getLpStateSummary();
console.log("📊 LP Fee Summary:", summary);
```

### 📌 Example Response:  

```json
{
  "totalHarvested": {
    "tokenA": 33.013248883,
    "tokenB": 56016886.86489466
  },
  "availableForHarvest": {
    "tokenA": 0,
    "tokenB": 885.540800497
  },
  "harvesterRewards": {
    "tokenA": 0,
    "tokenB": 8.85540800497
  }
}
```

---

## 🌾 Harvesting LP Fees  

LP fees generated from trades can be **harvested** by crankers.  

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

---

## 🔥 Staking in the Bonding Curve Pool  

For **graduated Bonding Curve Pools**, LP fees are distributed through the pool’s **staking network**.  

### 🎯 Fetching Staker Profile  

Check your **staking balance**, claimed rewards, and available rewards.  

```ts
const stakerAccountData =
  await bondingCurvePool.actions.staking.fetchStakerAccount({
    staker: payer.publicKey,
  });

console.log("Staker Account Data:", JSON.stringify(stakerAccountData));
```

### 📌 Example Response:  

```json
{
  "staked": 95108188.8443,
  "stakingTimestamp": "2025-02-21T09:46:03.000Z",
  "claimed": {
    "tokenA": 0.153621963,
    "tokenB": 8530868.3904
  },
  "available": {
    "tokenA": 0.004289379,
    "tokenB": 154977.2035
  }
}
```

---

## ⛓️ Staking Tokens  

Stake tokens into the **Bonding Curve Pool’s Staking Network** to earn rewards.  

```ts
const stakeTokensTransaction = await bondingCurvePool.actions.staking.stake({
  staker: payer.publicKey,
  amountUI: 112325.1425, // Staking 112,325.1425 tokens
});

const stakeTokensTxid = await sendAndConfirmTransaction(
  connection,
  stakeTokensTransaction,
  [payer]
);

console.log(
  `⛓️ Successfully staked tokens in the pool's Staking Network! TXID: ${stakeTokensTxid}`
);
```

---

## 🔓 Unstaking Tokens  

Unstake your **Bonding Curve Pool** tokens partially or fully.  

```ts
const unstakeTokensTransaction =
  await bondingCurvePool.actions.staking.unstake({
    staker: payer.publicKey,
    amountUI: 112325.1425 / 2, // Unstaking 50% of staked tokens
  });

const unstakeTokensTxid = await sendAndConfirmTransaction(
  connection,
  unstakeTokensTransaction,
  [payer]
);

console.log(
  `🔓 Successfully unstaked tokens from the pool's Staking Network! TXID: ${unstakeTokensTxid}`
);
```

---

## 🎁 Claiming Staking Rewards  

Claim your **LP rewards** from the **staking network**.  

```ts
const claimRewardsTransaction =
  await bondingCurvePool.actions.staking.claimRewards({
    staker: payer.publicKey,
  });

const claimRewardsTxid = await sendAndConfirmTransaction(
  connection,
  claimRewardsTransaction,
  [payer]
);

console.log(
  `🎁 Successfully claimed staking rewards! TXID: ${claimRewardsTxid}`
);
```

---
