import { BN, Program } from "@coral-xyz/anchor";
import { ComputeBudgetProgram, PublicKey } from "@solana/web3.js";

import {
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import {
  CLOCK_PROGRAM_ID,
  CREATE_CPMM_POOL_PROGRAM,
  DEV_CREATE_CPMM_POOL_PROGRAM,
  DEV_LOCK_CPMM_AUTH,
  DEV_LOCK_CPMM_PROGRAM,
  getATAAddress,
  getCpLockPda,
  getCpmmPdaAmmConfigId,
  getCreatePoolKeys,
  LOCK_CPMM_AUTH,
  LOCK_CPMM_PROGRAM,
  MEMO_PROGRAM_ID,
  Raydium,
  RENT_PROGRAM_ID,
  SYSTEM_PROGRAM_ID,
} from "@raydium-io/raydium-sdk-v2";
import axios from "axios";
import { BondingCurvePool, FairLaunchPool } from "../../types";
import { Gofundmeme } from "../../IDL/types/gofundmeme";
import {
  getPoolPDA,
  getProgramStakingNetworkPDA,
  getPoolStakingNetwork,
} from "../../utils";
import { SOL_PUBLIC_KEY } from "../../constants";

export const syncRaydiumBondingCurvePoolStakingNetwork = async ({
  gfmProgram,
  raydium,
  cranker,
  pool,
  network = "mainnet",
}: {
  gfmProgram: Program<Gofundmeme>;
  raydium: Raydium;
  cranker: PublicKey;
  pool: BondingCurvePool | FairLaunchPool;
  network?: string;
}) => {
  const { tokenAMint, tokenBMint } = pool;
  const poolPDA = getPoolPDA(gfmProgram.programId, tokenAMint, tokenBMint);

  const stakingNetwork = getProgramStakingNetworkPDA(gfmProgram.programId);

  const poolStakingNetwork = getPoolStakingNetwork(
    gfmProgram.programId,
    poolPDA
  );

  const stakingNetworkWsolAccount = getAssociatedTokenAddressSync(
    SOL_PUBLIC_KEY,
    stakingNetwork,
    true
  );

  const networkTokenAccountA = getAssociatedTokenAddressSync(
    tokenAMint,
    poolPDA,
    true
  );
  const networkTokenAccountB = getAssociatedTokenAddressSync(
    tokenBMint,
    poolPDA,
    true
  );

  const crankerTokenAccountA = getAssociatedTokenAddressSync(
    tokenAMint,
    cranker,
    true
  );
  const crankerTokenAccountB = getAssociatedTokenAddressSync(
    tokenBMint,
    cranker,
    true
  );

  const nftPosition = pool.position;

  const feeNftAccount = getAssociatedTokenAddressSync(
    nftPosition,
    poolPDA,
    true
  );
  const { publicKey: lockPda } = getCpLockPda(
    network === "mainnet" ? LOCK_CPMM_PROGRAM : DEV_LOCK_CPMM_PROGRAM,
    nftPosition
  );

  // const feeConfigs = await raydium.api.getCpmmConfigs();

  // if (network !== "mainnet") {
  //   feeConfigs.forEach((config) => {
  //     config.id = getCpmmPdaAmmConfigId(
  //       DEV_CREATE_CPMM_POOL_PROGRAM,
  //       config.index
  //     ).publicKey.toBase58();
  //   });
  // }

  const { config } = await raydium.cpmm.getCpmmPoolKeys(
    pool.whirlpool.toString()
  );

  const poolKeys = getCreatePoolKeys({
    programId:
      network === "mainnet"
        ? CREATE_CPMM_POOL_PROGRAM
        : DEV_CREATE_CPMM_POOL_PROGRAM, // devnet: DEVNET_PROGRAM_ID.CREATE_CPMM_POOL_PROGRAM,
    configId: new PublicKey(config.id),
    mintA: tokenAMint,
    mintB: tokenBMint,
  });

  const { publicKey: lockedLpVault } = getATAAddress(
    network === "mainnet" ? LOCK_CPMM_AUTH : DEV_LOCK_CPMM_AUTH,
    poolKeys.lpMint,
    TOKEN_PROGRAM_ID
  );

  let amount = new BN(0);
  try {
    const res = await axios.get(
      `https://dynamic-ipfs.raydium.io/lock/cpmm/position?id=${lockPda.toString()}`
    );
    const {
      positionInfo: { unclaimedFee },
    } = res.data;
    amount = new BN(`${unclaimedFee.lp}`.replace(".", ""));
  } catch (error) {
    console.log(error);
  }

  let remainingAccounts: any = [
    { pubkey: crankerTokenAccountA, isWritable: true, isSigner: false },
    { pubkey: crankerTokenAccountB, isWritable: true, isSigner: false },
  ];
  console.log("amount", amount.toString());

  const transaction = await gfmProgram.methods
    .syncRaydiumPoolStakingNetwork(amount)
    .accounts({
      creator: cranker,
      authority: network === "mainnet" ? LOCK_CPMM_AUTH : DEV_LOCK_CPMM_AUTH,
      pool: poolPDA,
      poolStakingNetwork,
      networkTokenAccountA,
      networkTokenAccountB,
      mintA: tokenAMint,
      mintB: tokenBMint,
      lockLpProgram:
        network === "mainnet" ? LOCK_CPMM_PROGRAM : DEV_LOCK_CPMM_PROGRAM,
      feeNftAccount,
      lockedLiquidity: lockPda,
      cpmmProgram:
        network === "mainnet"
          ? CREATE_CPMM_POOL_PROGRAM
          : DEV_CREATE_CPMM_POOL_PROGRAM, // devnet: DEVNET_PROGRAM_ID.CREATE_CPMM_POOL_PROGRAM,
      cpAuthority: poolKeys.authority,
      poolState: poolKeys.poolId,
      lpMint: poolKeys.lpMint,
      token0Vault: poolKeys.vaultA,
      token1Vault: poolKeys.vaultB,
      lockedLpVault,
      stakingNetwork,
      stakingNetworkWsolAccount,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram: SYSTEM_PROGRAM_ID,
      rent: RENT_PROGRAM_ID,
      tokenProgram2022: TOKEN_2022_PROGRAM_ID,
      tokenProgram: TOKEN_PROGRAM_ID,
      clock: CLOCK_PROGRAM_ID,
      memoProgram: MEMO_PROGRAM_ID,
    })
    .remainingAccounts(remainingAccounts)
    .transaction();
  transaction.add(
    ComputeBudgetProgram.setComputeUnitLimit({
      units: 1_000_000,
    })
  );
  return transaction;
};
