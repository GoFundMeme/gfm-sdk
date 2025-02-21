import { AnchorProvider } from "@coral-xyz/anchor";
import {
  buildWhirlpoolClient,
  ORCA_WHIRLPOOL_PROGRAM_ID,
  PDAUtil,
  WhirlpoolClient,
  WhirlpoolContext,
} from "@orca-so/whirlpools-sdk";
import { PublicKey } from "@solana/web3.js";

export type OrcaContext = {
  ctx: WhirlpoolContext;
  client: WhirlpoolClient;
};
export const getWhirlpoolClient = (provider: AnchorProvider): OrcaContext => {
  const ctx = WhirlpoolContext.withProvider(
    provider,
    ORCA_WHIRLPOOL_PROGRAM_ID
  );

  const client = buildWhirlpoolClient(ctx);
  return {
    ctx,
    client,
  };
};

export const getLpPosition = async (
  client: WhirlpoolClient,
  programId: PublicKey,
  lpTokenAddress: PublicKey
) => {
  const { publicKey: positionPDA } = PDAUtil.getPosition(
    programId,
    lpTokenAddress
  );
  console.log(positionPDA);
  
  return await client.getPosition(positionPDA);
};
