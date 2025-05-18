export * from "./utils";
import { Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { Gofundmeme } from "../../../IDL/types/gofundmeme";
import { getPoolPDA } from "../../../utils/pdaUtils";
import { SOL_PUBLIC_KEY } from "../../../constants";
import { VBCBondingCurvePool } from "../../../types";
import {
  getDecimals,
  getMintInfo,
} from "../../../utils";
import { Mint } from "@solana/spl-token";
export const buildVBCBondingCurvePoolUtils = ({
  gfmProgram,
}: {
  gfmProgram: Program<Gofundmeme>;
}) => {
  const fetchBondingCurvePool = async ({
    mintA = SOL_PUBLIC_KEY,
    mintB,
  }: {
    mintA?: PublicKey;
    mintB: PublicKey;
  }) => {
    const poolPDA = getPoolPDA(gfmProgram.programId, mintA, mintB);
    try {
      const pool: VBCBondingCurvePool =
        await gfmProgram.account.vbcPool.fetch(poolPDA);
      return await buildVBCBondingCurvePoolActions({
        gfmProgram,
        pool,
      });
    } catch {
      throw new Error("No bonding curve pool found with this key");
    }
  };
  return { fetchBondingCurvePool };
};

export const buildVBCBondingCurvePoolActions = async ({
  gfmProgram,
  pool,
}: {
  gfmProgram: Program<Gofundmeme>;
  pool: VBCBondingCurvePool;
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
    pool = await gfmProgram.account.vbcPool.fetch(poolPDA);
  };

  // const decinalA = await getDecimals({
  //   connection: gfmProgram.provider.connection,
  //   mint: pool.tokenAMint,
  // });
  // const decinalB = await getDecimals({
  //   connection: gfmProgram.provider.connection,
  //   mint: pool.tokenBMint,
  // });

  return {
    mintA,
    mintB,
    poolData: pool,
    refreshPoolData,
  };
};