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

export const buildSwapTransaction = async ({
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

  const userPDA = getUserAccountPDA(gfmProgram.programId, poolPDA, funder);

  const userPoolsLookupManager = getUserPoolsLookupTableManagerPDA(
    gfmProgram.programId,
    funder
  );

  const treasuryTokenVault = getAssociatedTokenAddressSync(
    pool.tokenBMint,
    poolTreasuryPDA,
    true
  );
  const userTokenAccount = getAssociatedTokenAddressSync(
    pool.tokenBMint,
    funder
  );

  const stakingNetwork = getProgramStakingNetworkPDA(gfmProgram.programId);

  const { gfmMintAddress } = await gfmProgram.account.gfmStakingNetwork.fetch(
    stakingNetwork
  );

  const stakingNetworkSyncAccount = getProgramStakingNetworkTreasurySyncPDA(
    gfmProgram.programId,
    gfmMintAddress
  );
  const transaction = await gfmProgram.methods
    .swap({
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
      rent: SYSVAR_RENT_PUBKEY,
      stakingNetwork,
      stakingNetworkSyncAccount,
      gatewayToken: PublicKey.default,
      userAccount: userPDA,
      userPoolsLookupManager,
    })
    .transaction();
  transaction.add(
    ComputeBudgetProgram.setComputeUnitLimit({
      units: 1_000_000,
    })
  );
  return transaction;
};
