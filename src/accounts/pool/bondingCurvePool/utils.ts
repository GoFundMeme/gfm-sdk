import { Program } from "@coral-xyz/anchor";
import {
  getCpLockPda,
  LOCK_CPMM_PROGRAM,
  DEV_LOCK_CPMM_PROGRAM,
} from "@raydium-io/raydium-sdk-v2";
import axios from "axios";
import Decimal from "decimal.js";
import { Gofundmeme } from "../../../IDL/types/gofundmeme";
import { BondingCurvePool, FairLaunchPool } from "../../../types";
import { getPoolPDA, getPoolStakingNetwork } from "../../../utils";
import { getMint } from "@solana/spl-token";

export const getRaydiumLpStateSummary = async ({
  gfmProgram,
  pool,
}: {
  pool: BondingCurvePool | FairLaunchPool;
  gfmProgram: Program<Gofundmeme>;
}): Promise<{
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
  const decimals = (
    await getMint(gfmProgram.provider.connection, pool.tokenBMint)
  )?.decimals;
  const isMainnet = true;

  try {
    const poolPDA = getPoolPDA(
      gfmProgram.programId,
      pool.tokenAMint,
      pool.tokenBMint
    );
    const poolStakingNetwork = getPoolStakingNetwork(
      gfmProgram.programId,
      poolPDA
    );
    const poolStakingNetworkData =
      await gfmProgram.account.gfmPoolStakingNetwork.fetch(poolStakingNetwork);

    const collectedA = new Decimal(
      poolStakingNetworkData?.totalRewardsA?.toString()
    );
    const collectedB = new Decimal(
      poolStakingNetworkData?.totalRewardsB?.toString()
    );

    const nftPosition = pool.position;

    const { publicKey: lockPda } = getCpLockPda(
      isMainnet ? LOCK_CPMM_PROGRAM : DEV_LOCK_CPMM_PROGRAM,
      nftPosition
    );

    const res = await axios.get(
      `https://dynamic-ipfs.raydium.io/lock/cpmm/position?id=${lockPda.toString()}`
    );
    const {
      positionInfo: { unclaimedFee },
    } = res.data;

    return {
      totalHarvested: {
        tokenA: collectedA.div(new Decimal(10).pow(9)).toNumber(),
        tokenB: collectedB.div(new Decimal(10).pow(decimals)).toNumber(),
      },
      availableForHarvest: {
        tokenA: unclaimedFee?.amountA,
        tokenB: unclaimedFee?.amountB,
      },
      harveterRewards: {
        tokenA: new Decimal(unclaimedFee?.amountA).mul(0.01).toNumber(),
        tokenB: new Decimal(unclaimedFee?.amountB).mul(0.01).toNumber(),
      },
    };
  } catch (error) {
    console.error("Error fetching fee reward quote:", error);
    if (error instanceof Error) {
      throw new Error(`Error fetching fee reward quote. ${error.message}`);
    } else {
      throw new Error("Error fetching fee reward quote");
    }
  }
};
