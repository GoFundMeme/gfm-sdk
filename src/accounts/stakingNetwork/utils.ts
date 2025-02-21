import { Program } from "@coral-xyz/anchor";
import {
  getAccount,
  getAssociatedTokenAddressSync,
  getMint,
} from "@solana/spl-token";
import BN from "bn.js";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { GFM_MINT_ADDRESS, SOL_PUBLIC_KEY } from "../../constants";
import {
  adjustDecimals,
  getProgramStakingNetworkPDA,
  getProgramStakingNetworkTreasuryPDA,
  getProgramStakingNetworkTreasurySyncPDA,
  getProgramStakingNetworkUserAccount,
  getProgramStakingNetworkUserAccountManager,
} from "../../utils";
import { Gofundmeme } from "../../IDL";
import { StakingNetworkState } from "../../types";

export const getStakingNetworkState = async ({
  gfmProgram,
}: {
  gfmProgram: Program<Gofundmeme>;
}) => {
  const stakingNetwork = getProgramStakingNetworkPDA(gfmProgram.programId);
  const stakingNetworkData = await gfmProgram.account.gfmStakingNetwork.fetch(
    stakingNetwork
  );
  const stakingNetworkTreasuryAccount = getProgramStakingNetworkTreasuryPDA(
    gfmProgram.programId,
    stakingNetworkData.gfmMintAddress
  );
  const stakingNetworkSyncAccount = getProgramStakingNetworkTreasurySyncPDA(
    gfmProgram.programId,
    stakingNetworkData.gfmMintAddress
  );
  const gfmMint = await getMint(
    gfmProgram.provider.connection,
    stakingNetworkData.gfmMintAddress
  );
  const balance = await getStakingNetworkRewardBalances({
    gfmProgram,
    stakingNetwork,
    stakingNetworkTreasuryAccount,
    stakingNetworkSyncAccount,
  });

  return {
    totalStakedTokens: adjustDecimals(
      stakingNetworkData.totalStakedTokens,
      gfmMint.decimals
    ),
    sgfmMintAddress: stakingNetworkData.sgfmMintAddress,
    gfmToken: {
      supply: adjustDecimals(
        new BN(gfmMint.supply.toString()),
        gfmMint.decimals
      ),
      decimals: gfmMint.decimals,
      address: gfmMint.address,
    },
    claimedRewards: adjustDecimals(stakingNetworkData.claimedRewards, 9),
    totalRewards: adjustDecimals(stakingNetworkData.totalRewards, 9),
    stakersCount: stakingNetworkData.stakersCount.toNumber(),
    stakingNetwork,
    stakingNetworkTreasuryAccount,
    stakingNetworkSyncAccount,
    lastNetworkSync: new Date(
      new Date(stakingNetworkData?.lastNetworkSyncTimestamp.toNumber() * 1000)
    ),
    cumulativeRewardsPerToken:
      stakingNetworkData.cumulativeRewardsPerToken.toNumber(),
    balance,
  };
};

export const getStakingNetworkRewardBalances = async ({
  gfmProgram,
  stakingNetwork,
  stakingNetworkTreasuryAccount,
  stakingNetworkSyncAccount,
}: {
  gfmProgram: Program<Gofundmeme>;
  stakingNetwork: PublicKey;
  stakingNetworkTreasuryAccount: PublicKey;
  stakingNetworkSyncAccount: PublicKey;
}) => {
  const connection = gfmProgram.provider.connection;
  // Currently in network
  const currentSOLRewards =
    (await connection.getBalance(stakingNetworkTreasuryAccount)) /
    LAMPORTS_PER_SOL;

  // Pending sync
  const pendingSyncSolRewards =
    (await connection.getBalance(stakingNetworkSyncAccount)) / LAMPORTS_PER_SOL;
  const pendingSyncWSolRewards = await getAccountBalance({
    gfmProgram,
    mintAddress: SOL_PUBLIC_KEY,
    staker: stakingNetwork,
  });

  return {
    availableRewards: currentSOLRewards,
    pendingRewards: pendingSyncSolRewards + pendingSyncWSolRewards,
  };
};

export const getAccountBalance = async ({
  gfmProgram,
  mintAddress,
  staker,
}: {
  gfmProgram: Program<Gofundmeme>;
  mintAddress: PublicKey;
  staker: PublicKey;
}) => {
  const connection = gfmProgram.provider.connection;

  const mint = await getMint(connection, mintAddress);
  const ata = getAssociatedTokenAddressSync(mintAddress, staker, true);
  const t = await getAccount(connection, ata);
  return adjustDecimals(new BN(t.amount.toString()), mint.decimals);
};

export const hasStakingAccount = async ({
  gfmProgram,
  gfmMintAddress,
  staker,
}: {
  gfmProgram: Program<Gofundmeme>;
  gfmMintAddress: PublicKey;
  staker: PublicKey;
}) => {
  try {
    const stakerAccountManager = getProgramStakingNetworkUserAccountManager(
      gfmProgram.programId,
      gfmMintAddress,
      staker
    );
    await gfmProgram.account.gfmStakerAccountManager.fetch(
      stakerAccountManager
    );
    return true;
  } catch {
    /* empty */
  }
  return false;
};

export const getStakerStakeRecords = async ({
  gfmProgram,
  stakingNetworkState,
  staker,
  decimals = 6,
}: {
  gfmProgram: Program<Gofundmeme>;
  stakingNetworkState: StakingNetworkState;
  staker: PublicKey;
  decimals?: number;
}) => {
  const stakerAccountManager = getProgramStakingNetworkUserAccountManager(
    gfmProgram.programId,
    GFM_MINT_ADDRESS,
    staker
  );

  try {
    const { currentRecord, claimedRewards } =
      await gfmProgram.account.gfmStakerAccountManager.fetch(
        stakerAccountManager
      );

    const userStakeAccounts: PublicKey[] = [];
    for (let index = 0; index < currentRecord; index++) {
      userStakeAccounts.push(
        getProgramStakingNetworkUserAccount(
          gfmProgram.programId,
          GFM_MINT_ADDRESS,
          staker,
          index
        )
      );
    }

    const resp = await gfmProgram.account.gfmStakerAccount.fetchMultiple(
      userStakeAccounts
    );

    const records: {
      record: number;
      claimedRewards: number;
      stakingTimestamp: Date;
      lastClaimedTimestamp: Date;
      userStakedTokens: number;
      userCumulativeRewardsPerToken: number;
      userAccumulatedRewards: number;
      availableToClaim: number;
    }[] = [];
    resp?.forEach((item) => {
      if (!item) {
        return;
      }

      const {
        record,
        claimedRewards,
        stakingTimestamp,
        lastClaimedTimestamp,
        userStakedTokens,
        userCumulativeRewardsPerToken,
        userAccumulatedRewards,
      } = item!;

      const scalingFactor = 1_000_000_000;
      records.push({
        record,
        claimedRewards: adjustDecimals(
          claimedRewards.div(new BN(1000)),
          decimals
        ),
        stakingTimestamp: new Date(stakingTimestamp.toNumber() * 1000),
        lastClaimedTimestamp: new Date(lastClaimedTimestamp.toNumber() * 1000),
        userStakedTokens: adjustDecimals(
          new BN(userStakedTokens.toString()),
          decimals
        ),
        userCumulativeRewardsPerToken: userCumulativeRewardsPerToken.toNumber(),
        userAccumulatedRewards: userAccumulatedRewards.toNumber(),
        availableToClaim:
          (adjustDecimals(new BN(userStakedTokens.toString()), decimals) *
            (stakingNetworkState?.cumulativeRewardsPerToken -
              userCumulativeRewardsPerToken.toNumber())) /
          scalingFactor,
      });
    });

    return {
      claimedRewards: adjustDecimals(claimedRewards, decimals) / 1000,
      records,
    };
  } catch (error) {
    console.error(error);
    throw new Error(
      `Failed to fetch staker account for wallet: ${staker.toString()}, perhaps you should create one.`
    );
  }
};
