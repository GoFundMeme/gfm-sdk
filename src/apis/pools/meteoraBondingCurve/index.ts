import { PublicKey, Keypair } from "@solana/web3.js";
import { CreateVBCBondingCurvePayload, CreateVBCBondingCurveProcessPayload, PoolsUtils } from "../../../types";
import { createVBCBondingCurveProcess, createVBCBondingCurveRequest } from "./createMeteoraBondingCurvePool";
import { Program } from "@coral-xyz/anchor";
import { Gofundmeme } from "../../../IDL";

export const buildVBCBondingCurveApiUtils = async (poolUtils: PoolsUtils, gfmProgram: Program<Gofundmeme>) => {
    const processCreatePool = async (payload: CreateVBCBondingCurveProcessPayload) => {
        const { mintAddress, txid } = await createVBCBondingCurveProcess(payload)
        await gfmProgram.provider.connection.confirmTransaction(txid, "finalized")
        return {
            mintAddress,
            txid,
            pool: await poolUtils.meteoraBondingCurve.fetchBondingCurvePool({
                mintB: new PublicKey(mintAddress)
            })
        }
    }

    const requestCreatePool = async (payload: CreateVBCBondingCurvePayload) => {
        const resp = await createVBCBondingCurveRequest(payload)
        const { transaction, requestId } = resp

        return {
            ...resp,
            signAndConfirm: async ({ creator }: { creator: Keypair }) => {
                if (creator.publicKey.toString() !== payload.walletAddress.toString()) {
                    throw new Error(`Incorrect signer (${creator.publicKey.toString()}). Should be ${payload.walletAddress.toString()} `);
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