import { Program } from "@coral-xyz/anchor";
import {
  ComputeBudgetProgram,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";
import { Gofundmeme } from "../../IDL/types/gofundmeme";
import { BondingCurvePool } from "../../types";
import {
  getPoolPDA,
  getPoolTreasuryPDA,
  getUserAccountPDA,
  getUserPoolsLookupTableManagerPDA,
  getProgramStakingNetworkPDA,
  getProgramStakingNetworkTreasurySyncPDA,
} from "../../utils";
import { InternalSwapQuote } from "../../utils/priceUtils";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { STAKING_NETWORK_SOL_SYNC_ACCOUNT } from "../../constants";

export const buildSwapV2Transaction = async ({
  gfmProgram,
  funder,
  pool,
  quote,
}: {
  gfmProgram: Program<Gofundmeme>;
  funder: PublicKey;
  pool: BondingCurvePool;
  quote: InternalSwapQuote;
}) => {
  const poolPDA = getPoolPDA(
    gfmProgram.programId,
    pool.tokenAMint,
    pool.tokenBMint
  );
  const poolTreasuryPDA = getPoolTreasuryPDA(gfmProgram.programId, poolPDA);

  const treasuryTokenVault = getAssociatedTokenAddressSync(
    pool.tokenBMint,
    poolTreasuryPDA,
    true
  );
  const userTokenAccount = getAssociatedTokenAddressSync(
    pool.tokenBMint,
    funder
  );

  const transaction = await gfmProgram.methods
    .swapV2({
      direction: quote.direction === "buy" ? { buy: {} } : { sell: {} },
      amountIn: quote.amountIn,
      amountOut: quote.amountOut,
      slippage: quote.slippage,
    })
    .accounts({
      user: funder,
      tokenMint: pool.tokenBMint,
      pool: poolPDA,
      userTokenAccount,
      treasuryTokenVault,
      treasury: poolTreasuryPDA,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      stakingNetworkSyncAccount: STAKING_NETWORK_SOL_SYNC_ACCOUNT,
    })
    .transaction();
  transaction.add(
    ComputeBudgetProgram.setComputeUnitLimit({
      units: 1_000_000,
    })
  );
  return transaction;
};
