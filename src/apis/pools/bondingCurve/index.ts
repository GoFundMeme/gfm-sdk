import { PublicKey, Keypair } from "@solana/web3.js";
import { CreateBondingCurvePayload, CreateBondingCurveProcessPayload, PoolsUtils } from "../../../types";
import { createBondingCurveProcess, createBondingCurveRequest } from "./createBondingCurvePool";
import { Program } from "@coral-xyz/anchor";
import { Gofundmeme } from "../../../IDL";

export const buildBondingCurveApiUtils = async (poolUtils: PoolsUtils, gfmProgram: Program<Gofundmeme>) => {
    const processCreatePool = async (payload: CreateBondingCurveProcessPayload) => {
        const { mintAddress, txid } = await createBondingCurveProcess(payload)
        await gfmProgram.provider.connection.confirmTransaction(txid, "finalized")
        return {
            mintAddress,
            txid,
            pool: await poolUtils.bondingCurve.fetchBondingCurvePool({
                mintB: new PublicKey(mintAddress)
            })
        }
    }

    const requestCreatePool = async (payload: CreateBondingCurvePayload) => {
        const resp = await createBondingCurveRequest(payload)
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