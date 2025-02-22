import { Program } from "@coral-xyz/anchor";
import {
  ComputeBudgetProgram,
  PublicKey,
  SystemProgram,
  SYSVAR_CLOCK_PUBKEY,
  Transaction,
} from "@solana/web3.js";
import { Gofundmeme } from "../../IDL/types/gofundmeme";
import { SOL_PUBLIC_KEY } from "../../constants";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  getPoolPDA,
  getPoolTreasuryPDA,
  getProgramStakingNetworkPDA,
  getProgramStakingNetworkTreasurySyncPDA,
  getUserAccountPDA,
  getUserPoolsLookupTableManagerPDA,
} from "../../utils/pdaUtils";

export const buildDefundPoolTransaction = async ({
  gfmProgram,
  funder,
  mintA = SOL_PUBLIC_KEY,
  mintB,
}: {
  gfmProgram: Program<Gofundmeme>;
  funder: PublicKey;
  mintA?: PublicKey;
  mintB: PublicKey;
}) => {
  const poolPDA = getPoolPDA(gfmProgram.programId, mintA, mintB);
  const poolData = await gfmProgram.account.pool.fetch(poolPDA);
  if (!poolData.poolStatus.raising) {
    throw new Error("Pool raise is completed.");
  }

  const poolTreasuryPDA = getPoolTreasuryPDA(gfmProgram.programId, poolPDA);

  const userPDA = getUserAccountPDA(gfmProgram.programId, poolPDA, funder);
  const userPoolsLookupManager = getUserPoolsLookupTableManagerPDA(
    gfmProgram.programId,
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

  const defundFromPoolUser1Ix = await gfmProgram.methods
    .defundAllFromPool()
    .accounts({
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      userWallet: funder,
      pool: poolPDA,
      treasury: poolTreasuryPDA,
      userAccount: userPDA,
      userPoolsLookupManager,
      clock: SYSVAR_CLOCK_PUBKEY,
      stakingNetwork,
      stakingNetworkSyncAccount,
    })
    .instruction();

  const defundTransaction = new Transaction();
  defundTransaction.add(defundFromPoolUser1Ix);
  defundTransaction.add(
    ComputeBudgetProgram.setComputeUnitLimit({
      units: 1_000_000,
    })
  );

  return defundTransaction;
};
