import { PublicKey, Transaction } from "@solana/web3.js"
import { NETWORK } from "./general"

export type CreateVBCBondingCurvePayload = {
    token: {
        base64: string
        name: string
        symbol: string
        description: string
        website?: string
        twitter?: string
        discord?: string
        telegram?: string
    }
    amountIn: number
    network: NETWORK,
    walletAddress: string,
}

export type CreateVBCBondingCurveProcessPayload = {
    requestId: string;
    signedTransaction: Transaction;
}

export type CreateVBCBondingCurveRequestSuccessResponse = {
    success: boolean,
    data: {
        mintAddress: string;
        requestId: string;
        rawTransaction: Buffer<ArrayBufferLike>;
    }
    error: any
}
export type CreateVBCBondingCurveProcessSuccessResponse = {
    success: boolean,
    data: {
        mintAddress: string;
        txid: string;
    }
    error: any
}
