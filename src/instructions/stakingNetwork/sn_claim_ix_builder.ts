import { Program } from "@coral-xyz/anchor";
import { PublicKey, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";

import { Gofundmeme } from "../../IDL/types/gofundmeme";
import {
  getProgramStakingNetworkPDA,
  getProgramStakingNetworkUserAccountManager,
  getProgramStakingNetworkUserAccount,
  getProgramStakingNetworkTreasuryPDA,
} from "../../utils";
import { GFM_MINT_ADDRESS } from "../../constants";

export const buildStakingNetworkClaimTransaction = async ({
  gfmProgram,
  staker,
  record,
}: {
  gfmProgram: Program<Gofundmeme>;
  staker: PublicKey;
  record: number;
}) => {
  const stakeAccount = await gfmProgram.account.gfmStakerAccount.fetch(
    getProgramStakingNetworkUserAccount(
      gfmProgram.programId,
      GFM_MINT_ADDRESS,
      staker,
      record
    )
  );

  if (stakeAccount.userStakedTokens.toNumber() === 0) {
    throw new Error("No tokens staked in this account.");
  }
  const stakingNetwork = getProgramStakingNetworkPDA(gfmProgram.programId);
  const stakingTreasuryAccount = getProgramStakingNetworkTreasuryPDA(
    gfmProgram.programId,
    GFM_MINT_ADDRESS
  );

  const stakerAccount = getProgramStakingNetworkUserAccount(
    gfmProgram.programId,
    GFM_MINT_ADDRESS,
    staker,
    record
  );

  const stakerAccountManager = getProgramStakingNetworkUserAccountManager(
    gfmProgram.programId,
    GFM_MINT_ADDRESS,
    staker
  );

  return await gfmProgram.methods
    .stakerClaim()
    .accounts({
      staker,
      stakingNetwork,
      stakerAccount,
      stakerAccountManager,
      stakingTreasuryAccount,
      clock: SYSVAR_CLOCK_PUBKEY,
    })
    .transaction();
};
