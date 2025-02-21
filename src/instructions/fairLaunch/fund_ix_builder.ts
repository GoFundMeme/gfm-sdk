import { BN, Program } from "@coral-xyz/anchor";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  SYSVAR_CLOCK_PUBKEY,
  Transaction,
} from "@solana/web3.js";
import { Gofundmeme } from "../../IDL/types/gofundmeme";
import { SOL_PUBLIC_KEY } from "../../constants";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  getPoolPDA,
  getPoolTreasuryPDA,
  getProgramStakingNetworkPDA,
  getProgramStakingNetworkTreasurySyncPDA,
  getUserAccountLookupTableManagerPDA,
  getUserAccountLookupTablePDA,
  getUserAccountPDA,
  getUserPoolsLookupTableManagerPDA,
  getUserPoolsLookupTablePDA,
} from "../../utils/pdaUtils";
import { findGatewayTokens } from "@identity.com/solana-gateway-ts";
import moment from "moment";

export const buildFundPoolTransaction = async ({
  gfmProgram,
  solAmount,
  funder,
  mintA = SOL_PUBLIC_KEY,
  mintB,
}: {
  gfmProgram: Program<Gofundmeme>;
  solAmount: number;
  funder: PublicKey;
  mintA?: PublicKey;
  mintB: PublicKey;
}) => {
  const poolPDA = getPoolPDA(gfmProgram.programId, mintA, mintB);
  const poolData = await gfmProgram.account.pool.fetch(poolPDA);
  if (!poolData.poolStatus.raising) {
    throw new Error("Pool raise is completed.");
  }
  if (
    moment(poolData.expirationTimestamp.mul(new BN(1000)).toNumber()).isBefore(
      moment()
    )
  ) {
    throw new Error("Campaign deadline has been reached. You can defund your funds if you have a position.");
  }

  const poolTreasuryPDA = getPoolTreasuryPDA(gfmProgram.programId, poolPDA);

  const userPDA = getUserAccountPDA(gfmProgram.programId, poolPDA, funder);

  const lookupManager = getUserAccountLookupTableManagerPDA(
    gfmProgram.programId,
    poolPDA
  );

  const lookupManagerData = false
    ? { currentTableCount: 1 }
    : await gfmProgram.account.userAccountLookupTableManager.fetch(
        lookupManager
      );

  const currentIndex =
    lookupManagerData.currentTableCount < 0
      ? 1
      : lookupManagerData.currentTableCount;

  const currentLookupTable = getUserAccountLookupTablePDA(
    gfmProgram.programId,
    poolPDA,
    currentIndex
  );
  const fallbackLookupTable = getUserAccountLookupTablePDA(
    gfmProgram.programId,
    poolPDA,
    currentIndex + 1
  );

  const userPoolsLookupManager = getUserPoolsLookupTableManagerPDA(
    gfmProgram.programId,
    funder
  );

  let poolsCurrentIndex = 1;
  try {
    const poolsTableManager =
      await gfmProgram.account.userPoolsTableManager.fetch(
        userPoolsLookupManager
      );
    console.log(poolsTableManager);

    poolsCurrentIndex = poolsTableManager.currentTableCount;
  } catch {}

  const currentPoolsLookupTable = getUserPoolsLookupTablePDA(
    gfmProgram.programId,
    funder,
    poolsCurrentIndex
  );
  console.log(currentPoolsLookupTable.toString());

  const fallbackPoolsLookupTable = getUserPoolsLookupTablePDA(
    gfmProgram.programId,
    funder,
    poolsCurrentIndex + 1
  );

  const stakingNetwork = getProgramStakingNetworkPDA(gfmProgram.programId);
  const { gfmMintAddress } = await gfmProgram.account.gfmStakingNetwork.fetch(
    stakingNetwork
  );
  const stakingNetworkSyncAccount = getProgramStakingNetworkTreasurySyncPDA(
    gfmProgram.programId,
    gfmMintAddress
  );
  const getValidGatewayToken = async () => {
    if (poolData.kycNetworkKey.equals(PublicKey.default)) {
      return PublicKey.default;
    }

    try {
      const gatewayTokens = await findGatewayTokens(
        gfmProgram.provider.connection,
        funder,
        poolData.kycNetworkKey
      );
      const validGatewayToken = gatewayTokens.find((g) => g.isValid());
      if (validGatewayToken) {
        return validGatewayToken.publicKey;
      }
      throw new Error("Failed to KYC your wallet");
    } catch (error) {
      throw new Error("Failed to KYC your wallet");
    }
  };

  const rest = poolData?.targetRaise?.sub(poolData?.totalRaised);
  const fundedLamports = new BN(+(solAmount * LAMPORTS_PER_SOL).toFixed(0));

  const amountToFund = rest.lt(fundedLamports) ? rest : fundedLamports;
  if (amountToFund.eq(new BN(0))) {
    throw new Error("Pool is not in raising state");
  }
  const gatewayToken = await getValidGatewayToken();

  const remainingAccounts: any[] = [];

  remainingAccounts.push({
    pubkey: currentPoolsLookupTable,
    isWritable: true,
    isSigner: false,
  });
  remainingAccounts.push({
    pubkey: fallbackPoolsLookupTable,
    isWritable: true,
    isSigner: false,
  });

  remainingAccounts.push({
    pubkey: gatewayToken,
    isWritable: false,
    isSigner: false,
  });

  const investInPoolUser1Ix = await gfmProgram.methods
      .investInPool(new BN(amountToFund), new BN(0))
      .accounts({
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        clock: SYSVAR_CLOCK_PUBKEY,
        userWallet: funder,
        pool: poolPDA,
        treasury: poolTreasuryPDA,
        userAccount: userPDA,
        lookupManager,
        currentLookupTable,
        fallbackLookupTable,
        userPoolsLookupManager,
        stakingNetwork,
        stakingNetworkSyncAccount,
      })
      .remainingAccounts(remainingAccounts)
      .instruction();

    const fundTransaction = new Transaction();
    fundTransaction.add(investInPoolUser1Ix);

    return fundTransaction;
};
