import { Connection, PublicKey } from "@solana/web3.js";
import { initGoFundMemeSDK } from "./gfmSdk";

(async () => {
  const connection = new Connection("https://api.mainnet-beta.solana.com");
  const gfmSDK = await initGoFundMemeSDK({ connection });
})();
