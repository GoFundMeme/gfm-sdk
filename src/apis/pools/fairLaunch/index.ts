import { PublicKey, Keypair } from "@solana/web3.js";
import { CreateFairLaunchPayload, CreateFairLaunchProcessPayload, PoolsUtils } from "../../../types";
import { createFairLaunchProcess, createFairLaunchRequest } from "./createFairLaunchPool";
import { Gofundmeme } from "../../../IDL";
import { Program } from "@coral-xyz/anchor";

export const buildFailLaunchApiUtils = async (poolUtils: PoolsUtils, gfmProgram: Program<Gofundmeme>) => {
    const processCreatePool = async (payload: CreateFairLaunchProcessPayload) => {
        const { mintAddress, txid } = await createFairLaunchProcess(payload)
        await gfmProgram.provider.connection.confirmTransaction(txid, "finalized")
        return {
            mintAddress,
            txid,
            pool: await poolUtils.fairLaunch.fetchFairLaunchPool({
                mintB: new PublicKey(mintAddress)
            })
        }
    }

    const requestCreatePool = async (payload: CreateFairLaunchPayload) => {
        const resp = await createFairLaunchRequest(payload, gfmProgram)
        const { transaction, requestId } = resp

        return {
            ...resp,
            signAndConfirm: async ({ creator }: { creator: Keypair }) => {
                if (creator.publicKey.toString() !== payload.creatorWalletAddress.toString()) {
                    throw new Error(`Incorrect signer (${creator.publicKey.toString()}). Should be ${payload.creatorWalletAddress.toString()} `);
                }
                transaction.partialSign(creator)
                return await processCreatePool({
                    requestId,
                    signedTransaction: transaction
                })
            }
        }
    }


    return {
        createPool: {
            request: requestCreatePool,
            process: processCreatePool
        }
    }
}