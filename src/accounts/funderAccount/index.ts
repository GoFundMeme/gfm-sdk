import { Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { Gofundmeme } from "../../IDL/types/gofundmeme";
import { FairLaunchPool } from "../../types";
import { adjustDecimals, getPoolPDA, getUserAccountPDA } from "../../utils";
import { getMint } from "@solana/spl-token";

export const getUserTokenRewards = async ({
  funder,
  gfmProgram,
  pool,
}: {
  funder: PublicKey;
  pool: FairLaunchPool;
  gfmProgram: Program<Gofundmeme>;
}) => {
  try {
    const poolPDA = getPoolPDA(
      gfmProgram.programId,
      pool.tokenAMint,
      pool.tokenBMint
    );
    const decimals = (
      await getMint(gfmProgram.provider.connection, pool.tokenBMint)
    )?.decimals;

    // Fetch user data
    const fetchedUserAccount = await gfmProgram.account.userAccount.fetch(
      getUserAccountPDA(gfmProgram.programId, poolPDA, funder)
    );

    if (fetchedUserAccount.investedAmount.isZero()) {
      return {
        funded: 0,
        claimed: {
          tokenA: 0,
          tokenB: 0,
        },
        available: {
          tokenA: 0,
          tokenB: 0,
        },
      };
    }

    // Fetch pool data
    const poolData = await gfmProgram.account.pool.fetch(poolPDA);

    const userClaimedA = fetchedUserAccount.claimedAmountMintA;
    const userClaimedB = fetchedUserAccount.claimedAmountMintB;

    const userClaimableA = poolData.claimableAmountMintA
      ?.mul(fetchedUserAccount.investedAmount)
      .div(poolData.totalRaised)
      .sub(fetchedUserAccount.claimedAmountMintA);

    const userClaimableB = poolData.claimableAmountMintB
      ?.mul(fetchedUserAccount.investedAmount)
      .div(poolData.totalRaised)
      .sub(fetchedUserAccount.claimedAmountMintB);

    return {
      funded: adjustDecimals(fetchedUserAccount.investedAmount),
      claimed: {
        tokenA: adjustDecimals(userClaimedA),
        tokenB: adjustDecimals(userClaimedB, decimals),
      },
      available: {
        tokenA: adjustDecimals(userClaimableA),
        tokenB: adjustDecimals(userClaimableB, decimals),
      },
    };
  } catch (error) {
    console.error(error);
    throw new Error("Could not find funder account for this wallet");
  }
};
