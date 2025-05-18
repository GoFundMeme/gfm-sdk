import { Program } from "@coral-xyz/anchor";
import { Gofundmeme } from "../../IDL/types/gofundmeme";
import { PublicKey } from "@solana/web3.js";
import { getPoolPDA } from "../../utils/pdaUtils";
import { SOL_PUBLIC_KEY } from "../../constants";
import {
  buildBondingCurvePoolActions,
  buildBondingCurvePoolUtils,
} from "./bondingCurvePool";
import {
  buildFairLaunchPoolActions,
  buildFairLaunchPoolUtils,
} from "./fairLaunchPool";
import { Raydium } from "@raydium-io/raydium-sdk-v2";
import { OrcaContext } from "../../utils";
import { buildVBCBondingCurvePoolActions, buildVBCBondingCurvePoolUtils } from "./meteoraBondingCurvePool";

export enum PoolLaunchType {
  FAIR_LAUNCH = "fairLaunch",
  BONDING_CURVE = "bondingCurve",
  METEORA_BONDING_CURVE = "meteoraBondingCurve",
}

export const buildGenericPoolUtils = ({
  gfmProgram,
  orcaContext,
  raydium,
}: {
  gfmProgram: Program<Gofundmeme>;
  raydium: Raydium;
  orcaContext: OrcaContext;
}) => {
  return async ({
    mintA = SOL_PUBLIC_KEY,
    mintB,
  }: {
    mintA?: PublicKey;
    mintB: PublicKey;
  }) => {
    const poolPDA = getPoolPDA(gfmProgram.programId, mintA, mintB);
    try {
      const pool = await gfmProgram.account.pool.fetch(poolPDA);
      return {
        poolType: PoolLaunchType.FAIR_LAUNCH,
        response: await buildFairLaunchPoolActions({
          gfmProgram,
          orcaContext,
          pool,
        }),
      };
    } catch { }
    try {
      const pool = await gfmProgram.account.bondingCurvePool.fetch(poolPDA);
      return {
        poolType: PoolLaunchType.BONDING_CURVE,
        response: await buildBondingCurvePoolActions({
          gfmProgram,
          pool,
          orcaContext,
          raydium
        }),
      };
    } catch {
      try {
        const pool = await gfmProgram.account.vbcPool.fetch(poolPDA);
        return {
          poolType: PoolLaunchType.METEORA_BONDING_CURVE,
          response: await buildVBCBondingCurvePoolActions({
            gfmProgram,
            pool,
          }),
        };
      } catch {
        throw new Error("No pool found");
      };
    };
  }
}

export const builtPoolUtils = ({
  gfmProgram,
  raydium,
  orcaContext,
}: {
  gfmProgram: Program<Gofundmeme>;
  raydium: Raydium;
  orcaContext: OrcaContext;
}) => {
  return {
    fetchGenericPool: buildGenericPoolUtils({
      gfmProgram,
      orcaContext,
      raydium,
    }),
    fairLaunch: buildFairLaunchPoolUtils({ gfmProgram, orcaContext }),
    bondingCurve: buildBondingCurvePoolUtils({
      gfmProgram,
      raydium: raydium,
      orcaContext,
    }),
    meteoraBondingCurve: buildVBCBondingCurvePoolUtils({ gfmProgram })
  };
};
