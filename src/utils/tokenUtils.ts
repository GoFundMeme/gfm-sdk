import { BN } from "@coral-xyz/anchor";
import { DecimalUtil } from "@orca-so/common-sdk";
import { Connection, PublicKey } from "@solana/web3.js";
import Decimal from "decimal.js";
import { getMint } from "@solana/spl-token";
import { SOL_PUBLIC_KEY } from "../constants";

export const adjustDecimals = (
  amount: number | BN | Decimal,
  decimals: number = 9
) => {
  return DecimalUtil.adjustDecimals(
    new Decimal(amount.toString()),
    decimals
  ).toNumber();
};

export const getDecimals = async ({
  connection,
  mint,
}: {
  connection: Connection;
  mint: PublicKey;
}) => {
  if (mint.equals(SOL_PUBLIC_KEY)) return 9;
  return (await getMint(connection, mint)).decimals;
};
