import { Program } from "@coral-xyz/anchor";
import {
  AccountMeta,
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
import { FairLaunchPool } from "../../types";
import {
  OrcaContext,
  getPoolPDA,
  getPoolStakingNetwork,
  getProgramStakingNetworkPDA,
} from "../../utils";
import { ORCA_WHIRLPOOL_PROGRAM_ID, PDAUtil } from "@orca-so/whirlpools-sdk";

export const buildHarvestOrcaPresaleTransaction = async ({
  gfmProgram,
  cranker,
  orcaContext,
  pool,
}: {
  gfmProgram: Program<Gofundmeme>;
  cranker: PublicKey;
  pool: FairLaunchPool;
  orcaContext: OrcaContext;
}) => {
  const mintPublicKey = pool.tokenBMint;
  const poolPDA = getPoolPDA(
    gfmProgram.programId,
    pool.tokenAMint,
    pool.tokenBMint
  );
  const poolData = await gfmProgram.account.pool.fetch(poolPDA);
  if (!poolData.poolStatus.completed) {
    throw new Error("Pool isn't migrated yet.");
  }

  const positionMint = pool.position;
  const whirlpoolPublicKey = pool.whirlpool;
  // ORCA
  const { client: whirlpoolClient, ctx: whirlpoolCtx } = orcaContext;
  const fetcher = whirlpoolCtx.fetcher;

  const tokenWhirlpool = await whirlpoolClient.getPool(whirlpoolPublicKey);
  const tokenWhirlpoolData = tokenWhirlpool.getData();
  const tickSpacing = tokenWhirlpoolData.tickSpacing;

  const positionPda = PDAUtil.getPosition(
    ORCA_WHIRLPOOL_PROGRAM_ID,
    positionMint
  );

  // Refresh position data & pool data
  const positionData = await fetcher.getPosition(positionPda.publicKey);
  if (!positionData) throw new Error("Failed to get position data");

  const instructions: TransactionInstruction[] = [
    ComputeBudgetProgram.setComputeUnitLimit({
      units: 1_000_000,
    }),
  ];

  for (const mintKey of [mintPublicKey, SOL_PUBLIC_KEY]) {
    for (const publick of [cranker, poolPDA]) {
      const associatedToken = getAssociatedTokenAddressSync(
        mintKey,
        publick,
        true,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );

      const associatedTokenAccount =
        await gfmProgram.provider.connection.getAccountInfo(associatedToken);

      if (!associatedTokenAccount) {
        instructions.push(
          createAssociatedTokenAccountInstruction(
            cranker,
            associatedToken,
            publick,
            mintKey
          )
        );
      }
    }
  }

  const remainingAccounts: AccountMeta[] = [];

  const stakingNetwork = getProgramStakingNetworkPDA(gfmProgram.programId);
  const stakingNetworkWsolAccount = getAssociatedTokenAddressSync(
    SOL_PUBLIC_KEY,
    stakingNetwork,
    true
  );

  const harvestOrcaPoolIx = await gfmProgram.methods
    .harvest()
    .accounts({
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      authority: cranker,
      pool: poolPDA,
      whirlpoolProgram: ORCA_WHIRLPOOL_PROGRAM_ID,
      whirlpool: whirlpoolPublicKey,
      position: positionPda.publicKey,
      tickArrayLower: PDAUtil.getTickArrayFromTickIndex(
        positionData.tickLowerIndex,
        tickSpacing,
        whirlpoolPublicKey,
        ORCA_WHIRLPOOL_PROGRAM_ID
      ).publicKey,
      tickArrayUpper: PDAUtil.getTickArrayFromTickIndex(
        positionData.tickUpperIndex,
        tickSpacing,
        whirlpoolPublicKey,
        ORCA_WHIRLPOOL_PROGRAM_ID
      ).publicKey,
      positionTokenAccount: getAssociatedTokenAddressSync(
        positionData.positionMint,
        poolPDA,
        true
      ),
      tokenOwnerAccountA: getAssociatedTokenAddressSync(
        SOL_PUBLIC_KEY,
        poolPDA,
        true
      ),
      tokenVaultA: tokenWhirlpoolData.tokenVaultA,
      tokenOwnerAccountB: getAssociatedTokenAddressSync(
        mintPublicKey,
        poolPDA,
        true
      ),
      tokenVaultB: tokenWhirlpoolData.tokenVaultB,
      crankerTokenAccountA: getAssociatedTokenAddressSync(
        SOL_PUBLIC_KEY,
        cranker,
        true
      ),
      crankerTokenAccountB: getAssociatedTokenAddressSync(
        mintPublicKey,
        cranker,
        true
      ),
      stakingNetwork,
      stakingNetworkWsolAccount,
      // poolStakingNetwork: getPoolStakingNetwork(gfmProgram.programId, poolPDA),
    })
    .remainingAccounts(remainingAccounts)
    .instruction();
  instructions.push(harvestOrcaPoolIx);

  const unwrapSolIx = createCloseAccountInstruction(
    getAssociatedTokenAddressSync(
      SOL_PUBLIC_KEY,
      cranker,
      true,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    ),
    cranker,
    cranker
  );
  instructions.push(unwrapSolIx);

  const harvestOrcaPoolTransaction = new Transaction();
  harvestOrcaPoolTransaction.add(...instructions);

  return harvestOrcaPoolTransaction;
};
