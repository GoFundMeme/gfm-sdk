import { BN, Program } from "@coral-xyz/anchor";
import {
  PublicKey,
  SystemProgram,
  SYSVAR_CLOCK_PUBKEY,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

import {
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";
import { Gofundmeme } from "../../IDL/types/gofundmeme";
import {
  getProgramStakingNetworkPDA,
  getProgramStakingNetworkUserAccountManager,
  getProgramStakingNetworkUserAccount,
  getProgramStakingNetworkTreasuryPDA,
} from "../../utils";
import { GFM_MINT_ADDRESS, SGFM_MINT_ADDRESS } from "../../constants";

export const buildStakingNetworkUnstakeTransaction = async ({
  gfmProgram,
  staker,
  record,
}: {
  gfmProgram: Program<Gofundmeme>;
  staker: PublicKey;
  record: number;
}) => {
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

  const stakerTokenAccount = getAssociatedTokenAddressSync(
    GFM_MINT_ADDRESS,
    staker
  );

  const receiverAccount = await gfmProgram.provider.connection.getAccountInfo(
    stakerTokenAccount
  );
  let instructions: TransactionInstruction[] = [];
  if (!receiverAccount) {
    instructions.push(
      createAssociatedTokenAccountInstruction(
        staker,
        stakerTokenAccount,
        staker,
        new PublicKey(GFM_MINT_ADDRESS),
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      )
    );
  }

  const stakerSgfmTokenAccount = getAssociatedTokenAddressSync(
    SGFM_MINT_ADDRESS,
    staker
  );

  const stakingNetworkTokenAccount = getAssociatedTokenAddressSync(
    GFM_MINT_ADDRESS,
    stakerAccount,
    true
  );
  const networkSgfmTokenAccount = getAssociatedTokenAddressSync(
    SGFM_MINT_ADDRESS,
    stakingNetwork,
    true
  );

  const stakerAccountManager = getProgramStakingNetworkUserAccountManager(
    gfmProgram.programId,
    GFM_MINT_ADDRESS,
    staker
  );

  instructions.push(
    await gfmProgram.methods
      .unstake()
      .accounts({
        staker,
        stakingNetwork,
        stakerAccount,
        stakerAccountManager,
        stakingTreasuryAccount,

        stakerSgfmTokenAccount,
        networkSgfmTokenAccount,

        stakerTokenAccount,
        stakingNetworkTokenAccount,

        mint: GFM_MINT_ADDRESS,
        sgfmMint: SGFM_MINT_ADDRESS,

        tokenProgram: TOKEN_PROGRAM_ID,
        clock: SYSVAR_CLOCK_PUBKEY,
      })
      .instruction()
  );

  const unstakeTransaction = new Transaction();
  unstakeTransaction.add(...instructions);
  return unstakeTransaction;
};
