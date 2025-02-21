import { Program, BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { Gofundmeme } from "../../IDL/types/gofundmeme";
import { BondingCurvePool, FairLaunchPool } from "../../types";
import {
  getPoolPDA,
  getPoolStakerAccount,
  getPoolStakingNetwork,
  adjustDecimals,
} from "../../utils";
import { getMint } from "@solana/spl-token";

export const getPoolStakerAccountInfo = async ({
  staker,
  pool,
  gfmProgram,
}: {
  staker: PublicKey;
  pool: FairLaunchPool | BondingCurvePool;
  gfmProgram: Program<Gofundmeme>;
}) => {
  try {
    const { tokenAMint, tokenBMint } = pool;
    const decimals = (await getMint(gfmProgram.provider.connection, tokenBMint))
      ?.decimals;
    const poolPDA = getPoolPDA(gfmProgram.programId, tokenAMint, tokenBMint);
    const stakerAccountPDA = getPoolStakerAccount(
      gfmProgram.programId,
      tokenBMint,
      staker
    );
    const stakerAccount = await gfmProgram.account.gfmPoolStakerAccount.fetch(
      stakerAccountPDA
    );

    const poolStakingNetworkPDA = getPoolStakingNetwork(
      gfmProgram.programId,
      poolPDA
    );
    const poolStakingNetwork =
      await gfmProgram.account.gfmPoolStakingNetwork.fetch(
        poolStakingNetworkPDA
      );

    const precisionSol = new BN("10000000000000");
    const pumpFactor = Math.pow(10, 9 - decimals);

    // Calculate newly accrued rewards for Token A
    const newPendingA = stakerAccount.userStakedTokens
      .mul(new BN(pumpFactor))
      .mul(
        poolStakingNetwork.cumulativeRewardsPerTokenA.sub(
          stakerAccount.userCumulativeRewardsPerTokenA
        )
      )
      .div(precisionSol);

    const precision = new BN("1000000000");
    // Calculate newly accrued rewards for Token B
    const newPendingB = stakerAccount.userStakedTokens
      .mul(
        poolStakingNetwork.cumulativeRewardsPerTokenB.sub(
          stakerAccount.userCumulativeRewardsPerTokenB
        )
      )
      .div(precision);

    // Total outstanding rewards (including previously accumulated)
    const outstandingRewardsA =
      stakerAccount.userAccumulatedRewardsA.add(newPendingA);
    const outstandingRewardsB =
      stakerAccount.userAccumulatedRewardsB.add(newPendingB);

    return {
      staked: adjustDecimals(stakerAccount?.userStakedTokens, decimals),
      stakingTimestamp: new Date(
        stakerAccount?.stakingTimestamp.toNumber() * 1000
      ),
      claimed: {
        tokenA: adjustDecimals(stakerAccount?.claimedRewardsA, 9),
        tokenB: adjustDecimals(stakerAccount?.claimedRewardsB, decimals),
      },
      available: {
        tokenA: adjustDecimals(outstandingRewardsA, 9),
        tokenB: adjustDecimals(outstandingRewardsB, decimals),
      },
    };
  } catch (error) {
    console.error(error);
    throw new Error("Could not find staker account for this wallet");
  }
};
