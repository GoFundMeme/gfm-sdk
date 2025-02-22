import { Program } from "@coral-xyz/anchor";
import {
  ComputeBudgetProgram,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { Gofundmeme } from "../../IDL/types/gofundmeme";
import { SOL_PUBLIC_KEY } from "../../constants";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  createCloseAccountInstruction,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { getPoolPDA, getUserAccountPDA } from "../../utils/pdaUtils";

export const buildClaimRewardsTransaction = async ({
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

  const instructions: TransactionInstruction[] = [
    ComputeBudgetProgram.setComputeUnitLimit({
      units: 1_000_000,
    })
  ];

  const addTokenAccountInstruction = async (
    mintKey: PublicKey,
    publicKey: PublicKey
  ) => {
    const associatedToken = getAssociatedTokenAddressSync(
      mintKey,
      publicKey,
      mintKey.equals(SOL_PUBLIC_KEY)
    );
    const associatedTokenAccount =
      await gfmProgram.provider.connection.getAccountInfo(associatedToken);
    if (!associatedTokenAccount) {
      instructions.push(
        createAssociatedTokenAccountInstruction(
          funder,
          associatedToken,
          publicKey,
          mintKey,
          TOKEN_PROGRAM_ID,
          ASSOCIATED_TOKEN_PROGRAM_ID
        )
      );
    }
  };

  await Promise.all(
    [mintB, mintA].flatMap((mintKey) =>
      [funder].map((publicKey) =>
        addTokenAccountInstruction(mintKey, publicKey)
      )
    )
  );

  const multiClaimIx = await gfmProgram.methods
    .multiClaim(false)
    .accounts({
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      authority: funder,
      pool: poolPDA,
      userAccount: getUserAccountPDA(gfmProgram.programId, poolPDA, funder),
      poolTokenAccountA: getAssociatedTokenAddressSync(mintA, poolPDA, true),
      poolTokenAccountB: getAssociatedTokenAddressSync(mintB, poolPDA, true),
      userTokenAccountMintA: getAssociatedTokenAddressSync(
        mintA,
        funder,
        true,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      ),
      userTokenAccountMintB: getAssociatedTokenAddressSync(
        mintB,
        funder,
        true,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      ),
      authorityTokenAccountA: getAssociatedTokenAddressSync(
        mintA,
        poolPDA,
        true
      ),
      authorityTokenAccountB: getAssociatedTokenAddressSync(
        mintB,
        poolPDA,
        true
      ),
    })
    .instruction();

  instructions.push(multiClaimIx);

  const unwrapSolIx = createCloseAccountInstruction(
    getAssociatedTokenAddressSync(
      mintA,
      funder,
      true,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    ),
    funder,
    funder
  );
  instructions.push(unwrapSolIx);
  const claimRewardsTransaction = new Transaction();
  claimRewardsTransaction.add(...instructions);
  return claimRewardsTransaction;
};
