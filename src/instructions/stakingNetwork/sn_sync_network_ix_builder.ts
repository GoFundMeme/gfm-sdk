import { Program } from "@coral-xyz/anchor";
import {
  PublicKey,
  SystemProgram,
  SYSVAR_CLOCK_PUBKEY,
  SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";

import {
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { Gofundmeme } from "../../IDL/types/gofundmeme";
import {
  getProgramStakingNetworkPDA,
  getProgramStakingNetworkTreasuryPDA,
  getProgramStakingNetworkTreasurySyncPDA,
} from "../../utils";
import { GFM_MINT_ADDRESS, SOL_PUBLIC_KEY } from "../../constants";

export const buildStakingNetworkSyncNetworkTransaction = async ({
  gfmProgram,
  cranker,
}: {
  gfmProgram: Program<Gofundmeme>;
  cranker: PublicKey;
}) => {
  const stakingNetwork = getProgramStakingNetworkPDA(gfmProgram.programId);
  const stakingNetworkSyncAccount = getProgramStakingNetworkTreasurySyncPDA(
    gfmProgram.programId,
    GFM_MINT_ADDRESS
  );

  const stakingNetworkWsolAccount = getAssociatedTokenAddressSync(
    SOL_PUBLIC_KEY,
    stakingNetwork,
    true
  );
  const stakingTreasuryAccount = getProgramStakingNetworkTreasuryPDA(
    gfmProgram.programId,
    GFM_MINT_ADDRESS
  );

  return await gfmProgram.methods
    .syncStakingNetwork()
    .accounts({
      creator: cranker,
      stakingNetwork,
      stakingTreasuryAccount,
      stakingNetworkWsolAccount,
      stakingNetworkSyncAccount,
      solAddress: SOL_PUBLIC_KEY,
      gfmFoundationAccount: new PublicKey(
        "CNJRjP4dwLwAGUgZ9CoGUDiA82jU1rWK9zGvse2T2saL"
      ),
      mint: GFM_MINT_ADDRESS,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      tokenProgram: TOKEN_PROGRAM_ID,
      clock: SYSVAR_CLOCK_PUBKEY,
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT_PUBKEY,
    })
    .transaction();
};
