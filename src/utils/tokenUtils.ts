import { BN, Program } from "@coral-xyz/anchor";
import { DecimalUtil } from "@orca-so/common-sdk";
import { Connection, PublicKey } from "@solana/web3.js";
import Decimal from "decimal.js";
import { SOL_PUBLIC_KEY } from "../constants";
import {
  getAccount,
  getAssociatedTokenAddressSync,
  getMint,
  Mint,
} from "@solana/spl-token";
import { Gofundmeme } from "../IDL";

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

export const getHolderTokenBalance = async ({
  connection,
  walletAddress,
  mint,
}: {
  connection: Connection;
  walletAddress: PublicKey;
  mint: Mint;
}) => {
  const ata = getAssociatedTokenAddressSync(mint.address, walletAddress);
  const account = await getAccount(connection, ata);
  const balance = account.amount;

  const balanceUI = new Decimal(balance.toString()).div(
    new Decimal(10).pow(new Decimal(mint.decimals))
  );

  return {
    balance: +balance.toString(),
    balanceUI: balanceUI.toNumber(),
  };
};

export const getMintInfo = async ({
  connection,
  mintAddress,
}: {
  connection: Connection;
  mintAddress: PublicKey;
}) => {
  const mint = await getMint(connection, mintAddress);
  return mint;
};

export const createHolderUtils = ({
  mintA,
  mintB,
  gfmProgram,
}: {
  mintA: Mint;
  mintB: Mint;
  gfmProgram: Program<Gofundmeme>;
}) => {
  const fetchBalanceA = async ({
    walletAddress,
  }: {
    walletAddress: string;
  }) => {
    if (mintA.address.toString() === SOL_PUBLIC_KEY.toString()) {
      const balance = await gfmProgram.provider.connection.getBalance(
        new PublicKey(walletAddress)
      );
      const balanceUI = new Decimal(balance.toString()).div(
        new Decimal(10).pow(new Decimal(9))
      );

      return {
        balance: +balance.toString(),
        balanceUI: balanceUI.toNumber(),
      };
    } else {
      return getHolderTokenBalance({
        connection: gfmProgram.provider.connection,
        mint: mintA,
        walletAddress: new PublicKey(walletAddress),
      });
    }
  };
  const fetchBalanceB = async ({
    walletAddress,
  }: {
    walletAddress: string;
  }) => {
    return getHolderTokenBalance({
      connection: gfmProgram.provider.connection,
      mint: mintB,
      walletAddress: new PublicKey(walletAddress),
    });
  };

  return {
    fetchBalanceA,
    fetchBalanceB,
  };
};