import { Program } from "@coral-xyz/anchor";
import {
  PublicKey,
  SystemProgram,
  SYSVAR_CLOCK_PUBKEY,
  Transaction,
} from "@solana/web3.js";
import { Gofundmeme } from "../../IDL/types/gofundmeme";
import { SOL_PUBLIC_KEY } from "../../constants";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  getPoolPDA,
} from "../../utils/pdaUtils";

export const buildClaimPreallocationTransaction = async ({
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
  if (!poolData.poolStatus.completed) {
    throw new Error("Pool isn't migrated yet.");
  }
 
  const poolTokenAccount = getAssociatedTokenAddressSync(mintB, poolPDA, true);
  const userTokenAccount = getAssociatedTokenAddressSync(mintB, funder, true);

  const claimPreallocationIx = await gfmProgram.methods
    .allocationClaim()
    .accounts({
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      clock: SYSVAR_CLOCK_PUBKEY,
      authority: funder,
      pool: poolPDA,
      poolTokenAccount,
      userTokenAccount,
      tokenMint: mintB,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
    })
    .instruction();

  const claimPreallocationTransaction = new Transaction();
  claimPreallocationTransaction.add(claimPreallocationIx);
  return claimPreallocationTransaction;
};
