import { Program } from "@coral-xyz/anchor";
import {
  ComputeBudgetProgram,
  PublicKey,
  SystemProgram,
} from "@solana/web3.js";
import { Gofundmeme } from "../../IDL";
import {
  getProgramStakingNetworkPDA,
  getProgramStakingNetworkUserAccountManager,
  getProgramStakingNetworkUserRecord,
} from "../../utils";
import {
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
export const buildCreateStakerAccountTransaction = async ({
  gfmProgram,
  staker,
}: {
  gfmProgram: Program<Gofundmeme>;
  staker: PublicKey;
}) => {
  const stakingNetwork = getProgramStakingNetworkPDA(gfmProgram.programId);
  const { gfmMintAddress } = await gfmProgram.account.gfmStakingNetwork.fetch(
    stakingNetwork
  );

  const stakerAccountManager = getProgramStakingNetworkUserAccountManager(
    gfmProgram.programId,
    gfmMintAddress,
    staker
  );

  try {
    await gfmProgram.account.gfmStakerAccountManager.fetch(
      stakerAccountManager
    );
    throw new Error(
      `Staker account has already been created for wallet: ${staker.toString()}`
    );
  } catch {}
  const { sgfmMintAddress, stakersCount } =
    await gfmProgram.account.gfmStakingNetwork.fetch(stakingNetwork);

  const stakerSgfmTokenAccount = getAssociatedTokenAddressSync(
    sgfmMintAddress,
    staker
  );
  const stakerRecord = getProgramStakingNetworkUserRecord(
    gfmProgram.programId,
    gfmMintAddress,
    stakingNetwork,
    stakersCount.toNumber()
  );

  const transaction = await gfmProgram.methods
    .createStakerAccount()
    .accounts({
      staker,
      stakingNetwork,

      stakerAccountManager,
      sgfmMint: sgfmMintAddress,
      stakerSgfmTokenAccount,
      stakerRecord,

      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .transaction();

  transaction.add(
    ComputeBudgetProgram.setComputeUnitLimit({
      units: 1_000_000,
    })
  );
  return transaction;
};
