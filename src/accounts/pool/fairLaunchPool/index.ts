export * from "./utils";
import { Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { Gofundmeme } from "../../../IDL/types/gofundmeme";
import { getPoolPDA } from "../../../utils/pdaUtils";
import { SOL_PUBLIC_KEY } from "../../../constants";
import { FairLaunchPool } from "../../../types";
import { buildFundPoolTransaction } from "../../../instructions/fairLaunch/fund_ix_builder";
import { buildDefundPoolTransaction } from "../../../instructions/fairLaunch/defund_ix_builder";
import { buildClaimPresaleTransaction } from "../../../instructions/fairLaunch/claim_ix_builder";
import { buildClaimPreallocationTransaction } from "../../../instructions/fairLaunch/claim_preallocation_ix_builder";
import { createHolderUtils, getMintInfo, OrcaContext } from "../../../utils";
import { buildHarvestOrcaPresaleTransaction } from "../../../instructions/fairLaunch/harvest_orca_ix_builder";
import { getUserTokenRewards } from "../../funderAccount";
import { getOrcaLpStateSummary } from "./utils";
import { buildClaimRewardsTransaction } from "../../../instructions/fairLaunch/claim_rewards_ix_builder";
import { getRaydiumLpStateSummary } from "../bondingCurvePool/utils";
import { Mint } from "@solana/spl-token";
import { meteoraDAMMFHarvestMothods } from "../../../instructions/hervest_meteora_damm/harvest";

export const buildFairLaunchPoolUtils = ({
  gfmProgram,
  orcaContext,
}: {
  gfmProgram: Program<Gofundmeme>;
  orcaContext: OrcaContext;
}) => {
  const fetchFairLaunchPool = async ({
    mintA = SOL_PUBLIC_KEY,
    mintB,
  }: {
    mintA?: PublicKey;
    mintB: PublicKey;
  }) => {
    const poolPDA = getPoolPDA(gfmProgram.programId, mintA, mintB);
    try {
      const pool: FairLaunchPool = await gfmProgram.account.pool.fetch(poolPDA);
      return await buildFairLaunchPoolActions({
        gfmProgram,
        orcaContext,
        pool,
      });
    } catch {
      throw new Error("No fair launch pool found with this key");
    }
  };

  return { fetchFairLaunchPool };
};

export const buildFairLaunchPoolActions = async ({
  gfmProgram,
  orcaContext,
  pool,
}: {
  gfmProgram: Program<Gofundmeme>;
  orcaContext: OrcaContext;
  pool: FairLaunchPool;
}) => {
  const poolPDA = getPoolPDA(
    gfmProgram.programId,
    pool.tokenAMint,
    pool.tokenBMint
  );

  const mintA: Mint = await getMintInfo({
    connection: gfmProgram.provider.connection,
    mintAddress: pool.tokenAMint,
  });
  const mintB: Mint = await getMintInfo({
    connection: gfmProgram.provider.connection,
    mintAddress: pool.tokenBMint,
  });
  const refreshPoolData = async () => {
    pool = await gfmProgram.account.pool.fetch(poolPDA);
  };
  const createFundTransaction = async (payload: {
    solAmount: number;
    funder: PublicKey;
  }) => {
    await refreshPoolData();
    return await buildFundPoolTransaction({
      gfmProgram,
      mintA: pool.tokenAMint,
      mintB: pool.tokenBMint,
      ...payload,
    });
  };
  const createDefundTransaction = async (payload: { funder: PublicKey }) => {
    await refreshPoolData();
    return await buildDefundPoolTransaction({
      gfmProgram,
      mintA: pool.tokenAMint,
      mintB: pool.tokenBMint,
      ...payload,
    });
  };
  const createlaimPresaleTransaction = function (payload: {
    funder: PublicKey;
  }) {
    return buildClaimPresaleTransaction({
      gfmProgram,
      mintA: pool.tokenAMint,
      mintB: pool.tokenBMint,
      ...payload,
    });
  };
  const createClaimPreallocationTransaction = function (payload: {
    funder: PublicKey;
  }) {
    return buildClaimPreallocationTransaction({
      gfmProgram,
      mintA: pool.tokenAMint,
      mintB: pool.tokenBMint,
      ...payload,
    });
  };
  const createClaimRewardsTransaction = function (payload: {
    funder: PublicKey;
  }) {
    return buildClaimRewardsTransaction({
      gfmProgram,
      mintA: pool.tokenAMint,
      mintB: pool.tokenBMint,
      ...payload,
    });
  };
  const createHarvestPoolTransaction = function () {
    return (payload: { cranker: PublicKey }) => {
      if (pool.poolType.orca) {
        return buildHarvestOrcaPresaleTransaction({
          gfmProgram,
          pool,
          orcaContext,
          ...payload,
        });
      } else if (pool.poolType.meteoraDAMM) {
        return meteoraDAMMFHarvestMothods.createMeteoraDAMMHarvestPoolStakingNetwork({
          gfmProgram,
          cranker: payload.cranker,
          pool,
          mint: mintB
        })
      }
      return buildHarvestOrcaPresaleTransaction({
        gfmProgram,
        pool,
        orcaContext,
        ...payload,
      });
    };
  };

  const fetchFunderRewardsSummary = function (payload: { funder: PublicKey }) {
    return getUserTokenRewards({
      gfmProgram,
      pool,
      ...payload,
    });
  };
  const fetchLpStateSummary = function () {
    return () => {
      if (pool.poolType.orca) {
        return getOrcaLpStateSummary({
          orcaContext,
          gfmProgram,
          pool,
        });
      } else if (pool.poolType.raydium) {
        return getRaydiumLpStateSummary({
          gfmProgram,
          pool,
        });
      } else if (pool.poolType.meteoraDAMM) {
        return meteoraDAMMFHarvestMothods.getMeteoraDAMMHarvestState({
          gfmProgram,
          pool,
          mint: mintB
        });
      }
      return getRaydiumLpStateSummary({
        gfmProgram,
        pool,
      });
    };
  };
  const { fetchBalanceA, fetchBalanceB } = await createHolderUtils({
    mintA,
    mintB,
    gfmProgram,
  });


  return {
    mintA,
    mintB,
    poolData: pool,
    refreshPoolData,
    utils: {
      balanceUtils: {
        fetchBalanceA,
        fetchBalanceB,
      },
    },
    actions: {
      fund: createFundTransaction,
      defund: createDefundTransaction,
      claimPresale: createlaimPresaleTransaction,
      claimPreallocation: createClaimPreallocationTransaction,
      harvestUtils: {
        harvest: createHarvestPoolTransaction(),
        getLpStateSummary: fetchLpStateSummary(),
      },
      funderRewardsUtils: {
        fetchFunderRewardsSummary,
        claimRewards: createClaimRewardsTransaction,
      },
    },
  };
};