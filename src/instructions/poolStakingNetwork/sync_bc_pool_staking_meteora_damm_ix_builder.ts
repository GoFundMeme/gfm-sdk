import { AnchorProvider, Wallet as AnchorWallet, Program } from '@coral-xyz/anchor'
import { BN } from '@coral-xyz/anchor'
import {
  // AddressLookupTableProgram,
  Cluster,
  ComputeBudgetProgram,
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js'
import {
  createProgram,
  createTransactions,
  deriveLockEscrowPda,
  derivePoolAddressWithConfig,
  getOrCreateATAInstruction,
} from '@meteora-ag/dynamic-amm-sdk/dist/cjs/src/amm/utils'
import { TOKEN_PROGRAM_ID } from '@coral-xyz/anchor/dist/cjs/utils/token'
import { ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync } from '@solana/spl-token'
import { CLOCK_PROGRAM_ID, SYSTEM_PROGRAM_ID } from '@raydium-io/raydium-sdk-v2'
import AmmImpl from '@meteora-ag/dynamic-amm-sdk'
import { Gofundmeme } from '../../IDL'
import { BondingCurvePool } from '../../types'
import { getPoolPDA, getPoolStakingNetwork, getProgramStakingNetworkPDA } from '../../utils'
import { SOL_PUBLIC_KEY } from '../../constants'
export const syncMeteoraDAMMBondingCurvePoolStakingNetwork = async (
  {
    gfmProgram,
    cranker,
    pool,
  }: {
    gfmProgram: Program<Gofundmeme>;
    cranker: PublicKey;
    pool: BondingCurvePool;
  }
) => {
  const poolPDA = getPoolPDA(
    gfmProgram.programId,
    pool.tokenAMint,
    pool.tokenBMint
  );
  const connection = gfmProgram.provider.connection;
  const { tokenAMint, tokenBMint } = pool

  const stakingNetwork = getProgramStakingNetworkPDA(gfmProgram.programId)

  const poolStakingNetwork = getPoolStakingNetwork(gfmProgram.programId, poolPDA)

  const stakingNetworkWsolAccount = getAssociatedTokenAddressSync(SOL_PUBLIC_KEY, stakingNetwork, true)

  const networkTokenAccountA = getAssociatedTokenAddressSync(tokenAMint, poolPDA, true)
  const networkTokenAccountB = getAssociatedTokenAddressSync(tokenBMint, poolPDA, true)



  const crankerTokenAccountA = getAssociatedTokenAddressSync(tokenAMint, poolPDA, true)
  const crankerTokenAccountB = getAssociatedTokenAddressSync(tokenBMint, poolPDA, true)

  const { vaultProgram, ammProgram } = createProgram(connection)
  const poolPubkey = pool.whirlpool;

  const dammPool = await AmmImpl.create(connection, poolPubkey);
  const [lockEscrowPK] = deriveLockEscrowPda(poolPubkey, poolPDA, ammProgram.programId);
  const preInstructions: TransactionInstruction[] = [];
  const [
    [userAta, createUserAtaIx],
    [escrowAta, createEscrowAtaIx],
    [tokenAAta, createTokenAAtaIx],
    [tokenBAta, createTokenBAtaIx],
  ] = await Promise.all([
    getOrCreateATAInstruction(dammPool.poolState.lpMint, poolPDA, connection),
    getOrCreateATAInstruction(dammPool.poolState.lpMint, lockEscrowPK, connection),
    getOrCreateATAInstruction(dammPool.poolState.tokenAMint, poolPDA, connection),
    getOrCreateATAInstruction(dammPool.poolState.tokenBMint, poolPDA, connection),
  ]);
  createUserAtaIx && preInstructions.push(createUserAtaIx);
  createEscrowAtaIx && preInstructions.push(createEscrowAtaIx);
  createTokenAAtaIx && preInstructions.push(createTokenAAtaIx);
  createTokenBAtaIx && preInstructions.push(createTokenBAtaIx);
  let result = await dammPool.getUserLockEscrow(poolPDA);
  if (!result || !result.fee.unClaimed.lp) {
    throw new Error("No LP");
  }


  let remainingAccounts: any = [
    { pubkey: crankerTokenAccountA, isWritable: true, isSigner: false },
    { pubkey: crankerTokenAccountB, isWritable: true, isSigner: false },
  ]

  console.log("Unclaimed", result.fee.unClaimed.lp.toString());

  const createPermissionlessPoolTx = await gfmProgram.methods.syncMeteoraDammPoolStakingNetwork(result.fee.unClaimed.lp).accounts({
    creator: cranker,
    bondingCurvePool: poolPDA,
    poolStakingNetwork,
    networkTokenAccountA,
    networkTokenAccountB,
    mintA: tokenAMint,
    mintB: tokenBMint,
    stakingNetwork,
    stakingNetworkWsolAccount,
    clock: CLOCK_PROGRAM_ID,
    dammProgram: ammProgram.programId,
    pool: poolPubkey,
    lpMint: dammPool.poolState.lpMint,
    lockEscrow: lockEscrowPK,
    sourceTokens: userAta,
    escrowVault: escrowAta,
    aTokenVault: dammPool.vaultA.vaultState.tokenVault,
    bTokenVault: dammPool.vaultB.vaultState.tokenVault,
    aVault: dammPool.poolState.aVault,
    bVault: dammPool.poolState.bVault,
    aVaultLp: dammPool.poolState.aVaultLp,
    bVaultLp: dammPool.poolState.bVaultLp,
    aVaultLpMint: dammPool.vaultA.vaultState.lpMint,
    bVaultLpMint: dammPool.vaultB.vaultState.lpMint,
    userAToken: tokenAAta,
    userBToken: tokenBAta,
    vaultProgram: vaultProgram.programId,
    tokenProgram: TOKEN_PROGRAM_ID,
    associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
    systemProgram: SYSTEM_PROGRAM_ID,
  })
    .remainingAccounts(remainingAccounts)
    .transaction()

  const ixs: Array<Transaction | TransactionInstruction | (Transaction | TransactionInstruction)[]> = []

  if (preInstructions.length) {
    // Create 2 dynamic vault consume around 190k CU. Each create ATA + Wrap SOL around 23k
    const setComputeUnitLimitIx = ComputeBudgetProgram.setComputeUnitLimit({
      units: 300_000,
    })
    ixs.push([setComputeUnitLimitIx, ...preInstructions])
  }

  // Create dynamic pool consume around 287k, create lock escrow + lock liquidity around 84k
  const setComputeUnitLimitIx = ComputeBudgetProgram.setComputeUnitLimit({
    units: 450_000,
  })

  ixs.push([setComputeUnitLimitIx, createPermissionlessPoolTx])

  const resultTx: Transaction[] = await createTransactions(connection, ixs, cranker)
  return resultTx
}
