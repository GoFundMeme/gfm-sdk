import { BN, Program } from "@coral-xyz/anchor";
import {
  ComputeBudgetProgram,
  PublicKey,
  SystemProgram,
  SYSVAR_CLOCK_PUBKEY,
} from "@solana/web3.js";

import {
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { Gofundmeme } from "../../IDL/types/gofundmeme";
import {
  getProgramStakingNetworkPDA,
  getProgramStakingNetworkUserAccountManager,
  getProgramStakingNetworkUserAccount,
} from "../../utils";

export const buildStakingNetworkStakeTransaction = async ({
  gfmProgram,
  staker,
  amountUI,
}: {
  gfmProgram: Program<Gofundmeme>;
  staker: PublicKey;
  amountUI: number;
}) => {
  const stakingNetwork = getProgramStakingNetworkPDA(gfmProgram.programId);

  const { sgfmMintAddress, gfmMintAddress } =
    await gfmProgram.account.gfmStakingNetwork.fetch(stakingNetwork);
  const stakerAccountManager = getProgramStakingNetworkUserAccountManager(
    gfmProgram.programId,
    gfmMintAddress,
    staker
  );

  const { currentRecord } =
    await gfmProgram.account.gfmStakerAccountManager.fetch(
      stakerAccountManager
    );

  const stakerAccount = getProgramStakingNetworkUserAccount(
    gfmProgram.programId,
    gfmMintAddress,
    staker,
    currentRecord
  );

  const stakerTokenAccount = getAssociatedTokenAddressSync(
    gfmMintAddress,
    staker
  );
  const stakerSgfmTokenAccount = getAssociatedTokenAddressSync(
    sgfmMintAddress,
    staker
  );

  const stakingNetworkTokenAccount = getAssociatedTokenAddressSync(
    gfmMintAddress,
    stakerAccount,
    true
  );
  const networkSgfmTokenAccount = getAssociatedTokenAddressSync(
    sgfmMintAddress,
    stakingNetwork,
    true
  );

  const transaction = await gfmProgram.methods
    .stake(new BN(amountUI * 10 ** 6))
    .accounts({
      staker,
      stakingNetwork,

      stakerAccountManager,
      stakerAccount,
      stakerTokenAccount,
      stakingNetworkTokenAccount,
      mint: gfmMintAddress,

      sgfmMint: sgfmMintAddress,
      stakerSgfmTokenAccount,
      networkSgfmTokenAccount,

      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      clock: SYSVAR_CLOCK_PUBKEY,
    })
    .transaction();
  transaction.add(
    ComputeBudgetProgram.setComputeUnitLimit({
      units: 1_000_000,
    })
  );
  return transaction;
};
