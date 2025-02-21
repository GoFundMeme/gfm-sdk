export * from "./utils";
import { Program } from "@coral-xyz/anchor";
import { Gofundmeme } from "../../IDL/types/gofundmeme";
import { StakingNetworkState } from "../../types";
import { getStakerStakeRecords, getStakingNetworkState } from "./utils";
import { PublicKey } from "@solana/web3.js";
import {
  buildCreateStakerAccountTransaction,
  buildStakingNetworkClaimTransaction,
  buildStakingNetworkStakeTransaction,
  buildStakingNetworkSyncNetworkTransaction,
  buildStakingNetworkUnstakeTransaction,
} from "../../instructions";

export const buildStakingNetworkActions = async ({
  gfmProgram,
}: {
  gfmProgram: Program<Gofundmeme>;
}) => {
  let stakingNetworkState: StakingNetworkState = await getStakingNetworkState({
    gfmProgram,
  });
  const refreshStakingNetwork = async () => {
    stakingNetworkState = await getStakingNetworkState({
      gfmProgram,
    });
  };
  const fetchStakerStakeRecords = async (payload: { staker: PublicKey }) => {
    return getStakerStakeRecords({
      stakingNetworkState,
      gfmProgram,
      ...payload,
    });
  };

  const createSyncNetworkTransaction = function (payload: {
    cranker: PublicKey;
  }) {
    return buildStakingNetworkSyncNetworkTransaction({
      gfmProgram,
      ...payload,
    });
  };
  const createStakerAccountTransaction = function (payload: {
    staker: PublicKey;
  }) {
    return buildCreateStakerAccountTransaction({
      gfmProgram,
      ...payload,
    });
  };
  const createStakeTransaction = function (payload: {
    staker: PublicKey;
    amountUI: number;
  }) {
    return buildStakingNetworkStakeTransaction({
      gfmProgram,
      ...payload,
    });
  };
  const createUnstakeTransaction = function (payload: {
    staker: PublicKey;
    record: number;
  }) {
    return buildStakingNetworkUnstakeTransaction({
      gfmProgram,
      ...payload,
    });
  };
  const createClaimTransaction = function (payload: {
    staker: PublicKey;
    record: number;
  }) {
    return buildStakingNetworkClaimTransaction({
      gfmProgram,
      ...payload,
    });
  };
  return {
    stakingNetworkState,
    refreshStakingNetwork,
    stakerUtils: {
      fetchStakerRecords: fetchStakerStakeRecords,
    },
    actions: {
      syncNetwork: createSyncNetworkTransaction,
      createStakerAccount: createStakerAccountTransaction,
      stake: createStakeTransaction,
      unstake: createUnstakeTransaction,
      claim: createClaimTransaction,
    },
  };
};
