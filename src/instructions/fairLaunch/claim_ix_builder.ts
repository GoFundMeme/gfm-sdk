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
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  getPoolPDA,
  getPoolVestingTablePDA,
  getUserAccountPDA,
} from "../../utils/pdaUtils";

export const buildClaimPresaleTransaction = async ({
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

  let userAccountPda = getUserAccountPDA(gfmProgram.programId, poolPDA, funder);
  let userAccount;
  try {
    await gfmProgram.account.userAccount.fetch(userAccountPda);
    userAccount = getUserAccountPDA(gfmProgram.programId, poolPDA, funder);
  } catch {
    throw new Error(`Funder account was not found: ${userAccountPda}`);
  }

  const poolVestingTable = getPoolVestingTablePDA(
    gfmProgram.programId,
    poolPDA
  );

  const poolTokenAccount = getAssociatedTokenAddressSync(mintB, poolPDA, true);
  const userTokenAccount = getAssociatedTokenAddressSync(mintB, funder, true);
  const claimIx = await gfmProgram.methods
    .vestingClaim()
    .accounts({
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      clock: SYSVAR_CLOCK_PUBKEY,

      authority: funder,
      pool: poolPDA,

      ...(userAccount && { userAccount }),
      poolTokenAccount,
      userTokenAccount,
      tokenMint: mintB,

      poolVestingTable,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
    })
    .instruction();

  const claimTransaction = new Transaction();
  claimTransaction.add(claimIx);
  claimTransaction.add(
    ComputeBudgetProgram.setComputeUnitLimit({
      units: 1_000_000,
    })
  );
  return claimTransaction;
};
