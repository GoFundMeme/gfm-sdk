import { BN } from "@coral-xyz/anchor";
import { DecimalUtil } from "@orca-so/common-sdk";
import Decimal from "decimal.js";

export const adjustDecimals = (
    amount: number | BN | Decimal,
    decimals: number = 9
  ) => {
    return DecimalUtil.adjustDecimals(
      new Decimal(amount.toString()),
      decimals
    ).toNumber();
  };