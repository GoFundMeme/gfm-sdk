import { Connection, Keypair } from "@solana/web3.js";
import { AnchorProvider, Wallet as AnchorWallet } from "@coral-xyz/anchor";
import { getGFMProgram } from "../IDL/getGFMProgram";
import { getWhirlpoolClient, initRaydiumSdk, OrcaContext } from "../utils";
import { builtPoolUtils } from "../accounts/pool";
import { Raydium } from "@raydium-io/raydium-sdk-v2";
import { buildStakingNetworkActions } from "../accounts";

export const initGoFundMemeSDK = async ({
  connection,
}: {
  connection: Connection;
}) => {
  const keypair = Keypair.generate();
  const provider = new AnchorProvider(connection, new AnchorWallet(keypair), {
    commitment: "confirmed",
  });
  const gfmProgram = getGFMProgram(provider);

  const orcaContext: OrcaContext = getWhirlpoolClient(provider);
  const raydium: Raydium = await initRaydiumSdk({
    loadToken: true,
    connection,
    owner: keypair,
  });

  const getStakingNetwork = async () => {
    return await buildStakingNetworkActions({
      gfmProgram,
    });
  };

  return {
    gfmProgram,
    pools: builtPoolUtils({ gfmProgram, raydium, orcaContext }),
    getStakingNetwork: getStakingNetwork,
  };
};
