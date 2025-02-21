import { getMint } from "@solana/spl-token";
import { Program } from "@coral-xyz/anchor";
import {
  PDAUtil,
  TickArrayUtil,
  TokenExtensionUtil,
  collectFeesQuote,
} from "@orca-so/whirlpools-sdk";
import Decimal from "decimal.js";
import { Gofundmeme } from "../../../IDL/types/gofundmeme";
import { BondingCurvePool, FairLaunchPool } from "../../../types";
import { OrcaContext } from "../../../utils";

export const getOrcaLpStateSummary = async ({
  orcaContext,
  gfmProgram,
  pool,
}: {
  orcaContext: OrcaContext;
  pool: FairLaunchPool | BondingCurvePool;
  gfmProgram: Program<Gofundmeme>;
}) => {
  const { ctx, client } = orcaContext;
  const { tokenBMint } = pool;
  try {
    const position = await client.getPosition(pool.position);
    const whirlpool_pubkey = position.getData().whirlpool;
    const whirlpool = await client.getPool(whirlpool_pubkey);
    const decimals = (await getMint(gfmProgram.provider.connection, tokenBMint))
      ?.decimals;

    const collectedA = new Decimal(pool.claimableAmountMintA.toString());
    const collectedB = new Decimal(pool.claimableAmountMintB.toString());

    // Get TickArray and Tick
    const tick_spacing = whirlpool.getData().tickSpacing;
    const tick_array_lower_pubkey = PDAUtil.getTickArrayFromTickIndex(
      position.getData().tickLowerIndex,
      tick_spacing,
      whirlpool_pubkey,
      ctx.program.programId
    ).publicKey;
    const tick_array_upper_pubkey = PDAUtil.getTickArrayFromTickIndex(
      position.getData().tickUpperIndex,
      tick_spacing,
      whirlpool_pubkey,
      ctx.program.programId
    ).publicKey;
    const tick_array_lower = await ctx.fetcher.getTickArray(
      tick_array_lower_pubkey
    );
    const tick_array_upper = await ctx.fetcher.getTickArray(
      tick_array_upper_pubkey
    );
    const tick_lower = TickArrayUtil.getTickFromArray(
      tick_array_lower!,
      position.getData().tickLowerIndex,
      tick_spacing
    );
    const tick_upper = TickArrayUtil.getTickFromArray(
      tick_array_upper!,
      position.getData().tickUpperIndex,
      tick_spacing
    );

    // Get token info for TokenExtensions
    const tokenExtensionCtx =
      await TokenExtensionUtil.buildTokenExtensionContext(
        ctx.fetcher,
        whirlpool.getData()
      );

    const quote_fee = collectFeesQuote({
      whirlpool: whirlpool.getData(),
      position: position.getData(),
      tickLower: tick_lower,
      tickUpper: tick_upper,
      tokenExtensionCtx,
    });

    // Adjust decimals safely
    return {
      totalHarvested: {
        tokenA: collectedA.div(new Decimal(10).pow(9)).toNumber(),
        tokenB: collectedB.div(new Decimal(10).pow(decimals)).toNumber(),
      },
      availableForHarvest: {
        tokenA: new Decimal(quote_fee.feeOwedA.toString())
          .div(new Decimal(10).pow(9))
          .toNumber(),
        tokenB: new Decimal(quote_fee.feeOwedB.toString())
          .div(new Decimal(10).pow(decimals))
          .toNumber(),
      },
      harveterRewards: {
        tokenA: new Decimal(quote_fee.feeOwedA.toString())
          .div(new Decimal(10).pow(9))
          .mul(0.01)
          .toNumber(),
        tokenB: new Decimal(quote_fee.feeOwedB.toString())
          .div(new Decimal(10).pow(decimals))
          .mul(0.01)
          .toNumber(),
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
