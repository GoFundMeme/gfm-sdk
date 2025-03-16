
import { AnchorProvider, Wallet as AnchorWallet, Program } from '@coral-xyz/anchor'
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { ASSOCIATED_TOKEN_PROGRAM_ID, Mint } from "@solana/spl-token";
import {
  CLOCK_PROGRAM_ID,
  SYSTEM_PROGRAM_ID,
} from "@raydium-io/raydium-sdk-v2";
import { getAssociatedTokenAddressSync, getMint } from "@solana/spl-token";
import Decimal from "decimal.js";
import { AmmImpl, PROGRAM_ID } from "@meteora-ag/dynamic-amm-sdk";
import {
  createProgram,
  deriveCustomizablePermissionlessConstantProductPoolAddress,
  deriveLockEscrowPda,
  derivePoolAddressWithConfig,
} from "@meteora-ag/dynamic-amm-sdk/dist/cjs/src/amm/utils";
import { Gofundmeme } from '../../IDL';
import { BondingCurvePool, FairLaunchPool, PoolStakingNetworkNetwork } from '../../types';
import { getPoolPDA, getPoolStakingNetwork, getProgramStakingNetworkPDA } from '../../utils';
import { SOL_PUBLIC_KEY } from '../../constants';

export const getMeteoraDAMMHarvestState = async ({ gfmProgram, pool, mint }:
  {
    gfmProgram: Program<Gofundmeme>;
    pool: BondingCurvePool | FairLaunchPool;
    mint: Mint
  }
): Promise<{
  totalHarvested: {
    tokenA: number;
    tokenB: number;
  };
  availableForHarvest: {
    tokenA: number;
    tokenB: number;
  };
  harveterRewards: {
    tokenA: number;
    tokenB: number;
  };
}> => {
  const connection = gfmProgram.provider.connection

  const poolPubkey = pool.whirlpool
  const poolPublicKey = poolPubkey
  const dammPool = await AmmImpl.create(connection, poolPublicKey);
  // const { tokenAMint, tokenBMint } = dammPool.poolState;
  const poolPDA = getPoolPDA(gfmProgram.programId, SOL_PUBLIC_KEY, mint.address);
  const decimals = mint.decimals

  let poolStakingNetwork: PoolStakingNetworkNetwork | null = null
  const fetchCollected = async () => {
    let collectedA = new Decimal(0);
    let collectedB = new Decimal(0);
    if (pool.raiseType.fairLaunch) {
      collectedA = new Decimal(pool.claimableAmountMintA.toString());
      collectedB = new Decimal(pool.claimableAmountMintB.toString());
    } else if (pool.raiseType.bondingCurve) {
      const poolStakingNetworkPda = getPoolStakingNetwork(
        gfmProgram.programId,
        poolPDA
      );
      poolStakingNetwork =
        await gfmProgram.account.gfmPoolStakingNetwork.fetch(poolStakingNetworkPda);
      collectedA = new Decimal(
        poolStakingNetwork?.totalRewardsA?.toString()
      );
      collectedB = new Decimal(
        poolStakingNetwork?.totalRewardsB?.toString()
      );
    } else if (pool.raiseType.alphaVault) {
      collectedA = new Decimal(pool.claimableAmountMintA.toString());
      collectedB = new Decimal(pool.claimableAmountMintB.toString());
    }

    return { collectedA, collectedB }
  }

  const { collectedA, collectedB } = await fetchCollected()

  let result = await dammPool.getUserLockEscrow(poolPDA);
  if (!result || !result.fee.unClaimed.lp) {
    throw new Error("No LP Found");
  }

  let extra: any = {};
  if (poolStakingNetwork) {
    const { totalStakedTokens } = poolStakingNetwork;
    extra = {
      totalStaked: (totalStakedTokens as any).toNumber()
    }
  }

  let availableForHarvest = {
    tokenA: new Decimal(result.fee.unClaimed.tokenA.toString())
      .div(new Decimal(10).pow(9))
      .toNumber(),
    tokenB: new Decimal(result.fee.unClaimed.tokenB.toString())
      .div(new Decimal(10).pow(decimals))
      .toNumber(),
  }
  if (pool.raiseType.alphaVault) {
    availableForHarvest = {
      tokenA: new Decimal(result.fee.unClaimed.tokenB.toString())
        .div(new Decimal(10).pow(9))
        .toNumber(),
      tokenB: new Decimal(result.fee.unClaimed.tokenA.toString())
        .div(new Decimal(10).pow(decimals))
        .toNumber(),
    }
  }

  return {
    totalHarvested: {
      tokenA: collectedA.div(new Decimal(10).pow(9)).toNumber(),
      tokenB: collectedB.div(new Decimal(10).pow(decimals)).toNumber(),
    },
    availableForHarvest,
    harveterRewards: {
      tokenA: new Decimal(availableForHarvest.tokenA).mul(0.01).toNumber(),
      tokenB: new Decimal(availableForHarvest.tokenB).mul(0.01).toNumber(),
    },
    ...extra
  };
};

export const createMeteoraDAMMHarvest = async (
  {
    gfmProgram, pool, mint, cranker
  }:
    {
      gfmProgram: Program<Gofundmeme>;
      pool: BondingCurvePool | FairLaunchPool;
      mint: Mint,
      cranker: PublicKey
    }
) => {
  const userPublicKey: PublicKey = cranker

  const poolPublicKey = pool.whirlpool
  const connection = gfmProgram.provider.connection

  const { vaultProgram, ammProgram } = createProgram(connection);

  const dammPool = await AmmImpl.create(connection, poolPublicKey);
  const { tokenAMint, tokenBMint } = dammPool.poolState;

  console.log("virtualPrice", dammPool.poolInfo.virtualPrice);


  const poolPda = getPoolPDA(gfmProgram.programId, tokenAMint, tokenBMint);


  const stakingNetwork = getProgramStakingNetworkPDA(gfmProgram.programId);

  const poolStakingNetwork = getPoolStakingNetwork(gfmProgram.programId, poolPda);

  const stakingNetworkWsolAccount = getAssociatedTokenAddressSync(
    SOL_PUBLIC_KEY,
    stakingNetwork,
    true
  );

  const networkTokenAccountA = getAssociatedTokenAddressSync(
    tokenAMint,
    poolPda,
    true
  );
  const networkTokenAccountB = getAssociatedTokenAddressSync(
    tokenBMint,
    poolPda,
    true
  );

  const crankerTokenAccountA = getAssociatedTokenAddressSync(
    tokenAMint,
    userPublicKey,
    true
  );
  const crankerTokenAccountB = getAssociatedTokenAddressSync(
    tokenBMint,
    userPublicKey,
    true
  );

  const [lockEscrowPK] = deriveLockEscrowPda(
    poolPublicKey,
    poolPda,
    ammProgram.programId
  );

  const userAta = getAssociatedTokenAddressSync(
    dammPool.poolState.lpMint,
    poolPda,
    true
  );
  const escrowAta = getAssociatedTokenAddressSync(
    dammPool.poolState.lpMint,
    lockEscrowPK,
    true
  );
  const tokenAAta = getAssociatedTokenAddressSync(
    dammPool.poolState.tokenAMint,
    poolPda,
    true
  );
  const tokenBAta = getAssociatedTokenAddressSync(
    dammPool.poolState.tokenBMint,
    poolPda,
    true
  );

  let result = await dammPool.getUserLockEscrow(poolPda);
  if (!result || !result.fee.unClaimed.lp) {
    throw new Error("No LP Found");
  }

  let remainingAccounts = [
    { pubkey: crankerTokenAccountA, isWritable: true, isSigner: false },
    { pubkey: crankerTokenAccountB, isWritable: true, isSigner: false },
  ];

  const harvestTransaction = await gfmProgram.methods
    .meteoraDammHarvest(result.fee.unClaimed.lp)
    .accounts({
      creator: userPublicKey,
      fairLaunchPool: poolPda,
      poolStakingNetwork,
      networkTokenAccountA,
      networkTokenAccountB,
      mintA: tokenAMint,
      mintB: tokenBMint,
      stakingNetwork,
      stakingNetworkWsolAccount,
      clock: CLOCK_PROGRAM_ID,
      dammProgram: ammProgram.programId,
      pool: poolPublicKey,
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
    .transaction();
  const blockhash = await connection.getLatestBlockhash()
  harvestTransaction.feePayer = userPublicKey;
  harvestTransaction.recentBlockhash = blockhash.blockhash
  harvestTransaction.lastValidBlockHeight = blockhash.lastValidBlockHeight
  return harvestTransaction.serialize({ 'requireAllSignatures': false, "verifySignatures": false });
};

export const createMeteoraDAMMHarvestPoolStakingNetwork = async (
  {
    gfmProgram, pool, mint, cranker
  }:
    {
      gfmProgram: Program<Gofundmeme>;
      pool: BondingCurvePool | FairLaunchPool;
      mint: Mint,
      cranker: PublicKey
    }
) => {
  const userPublicKey: PublicKey = cranker

  const poolPublicKey = pool.whirlpool
  const connection = gfmProgram.provider.connection
  const { vaultProgram, ammProgram } = createProgram(connection);

  const dammPool = await AmmImpl.create(connection, poolPublicKey);
  const { tokenAMint, tokenBMint } = dammPool.poolState;

  const poolPda = getPoolPDA(gfmProgram.programId, tokenAMint, tokenBMint);

  const stakingNetwork = getProgramStakingNetworkPDA(gfmProgram.programId);

  const poolStakingNetwork = getPoolStakingNetwork(gfmProgram.programId, poolPda);

  const stakingNetworkWsolAccount = getAssociatedTokenAddressSync(
    SOL_PUBLIC_KEY,
    stakingNetwork,
    true
  );

  const networkTokenAccountA = getAssociatedTokenAddressSync(
    tokenAMint,
    poolPda,
    true
  );
  const networkTokenAccountB = getAssociatedTokenAddressSync(
    tokenBMint,
    poolPda,
    true
  );
  const crankerTokenAccountA = getAssociatedTokenAddressSync(
    tokenAMint,
    userPublicKey,
    true
  );
  const crankerTokenAccountB = getAssociatedTokenAddressSync(
    tokenBMint,
    userPublicKey,
    true
  );

  const [lockEscrowPK] = deriveLockEscrowPda(
    poolPublicKey,
    poolPda,
    ammProgram.programId
  );

  const userAta = getAssociatedTokenAddressSync(
    dammPool.poolState.lpMint,
    poolPda,
    true
  );
  const escrowAta = getAssociatedTokenAddressSync(
    dammPool.poolState.lpMint,
    lockEscrowPK,
    true
  );
  const tokenAAta = getAssociatedTokenAddressSync(
    dammPool.poolState.tokenAMint,
    poolPda,
    true
  );
  const tokenBAta = getAssociatedTokenAddressSync(
    dammPool.poolState.tokenBMint,
    poolPda,
    true
  );

  let result = await dammPool.getUserLockEscrow(poolPda);
  if (!result || !result.fee.unClaimed.lp) {
    throw new Error("No LP found");
  }

  let remainingAccounts: any = [
    { pubkey: crankerTokenAccountA, isWritable: true, isSigner: false },
    { pubkey: crankerTokenAccountB, isWritable: true, isSigner: false },
  ];

  const syncPoolStackingNetwork = await gfmProgram.methods
    .syncMeteoraDammPoolStakingNetwork(result.fee.unClaimed.lp)
    .accounts({
      creator: userPublicKey,
      bondingCurvePool: poolPda,
      poolStakingNetwork,
      networkTokenAccountA,
      networkTokenAccountB,
      mintA: tokenAMint,
      mintB: tokenBMint,
      stakingNetwork,
      stakingNetworkWsolAccount,
      clock: CLOCK_PROGRAM_ID,
      dammProgram: ammProgram.programId,
      pool: poolPublicKey,
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
    .transaction();

  const blockhash = await connection.getLatestBlockhash()
  syncPoolStackingNetwork.feePayer = userPublicKey;
  syncPoolStackingNetwork.recentBlockhash = blockhash.blockhash
  syncPoolStackingNetwork.lastValidBlockHeight = blockhash.lastValidBlockHeight
  return syncPoolStackingNetwork.serialize({ 'requireAllSignatures': false, "verifySignatures": false });;
};



export const meteoraDAMMFHarvestMothods = {
  getMeteoraDAMMHarvestState,
  createMeteoraDAMMHarvest,
  createMeteoraDAMMHarvestPoolStakingNetwork,
}

