import { PublicKey, Transaction } from "@solana/web3.js"
import { NETWORK } from "./general"

export type CreateBondingCurvePayload = {
    token: {
        base64: string
        name: string
        symbol: string
        description: string
        website: string
        twitter: string
        discord: string
        telegram: string
    }
    amountIn: number
    network: NETWORK,
    creatorWalletAddress: string,
    supply: number
}

export type CreateBondingCurveProcessPayload = {
    requestId: string;
    signedTransaction: Transaction;
}

export type CreateBondingCurveRequestSuccessResponse = {
    success: boolean,
    data: {
        mintAddress: string;
        requestId: string;
        rawTransaction: Buffer<ArrayBufferLike>;
    }
    error: any
}
export type CreateBondingCurveProcessSuccessResponse = {
    success: boolean,
    data: {
        mintAddress: string;
        txid: string;
    }
    error: any
}
