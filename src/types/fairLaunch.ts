import { Transaction } from "@solana/web3.js"
import { NETWORK } from "./general"


export type ATokenomicsAllocation = {
    name: string
    percent: number
    destination: string
}

export type CreateFairLaunchPayload = {
    token: {
        base64: string
        name: string
        symbol: string
        description: string
        website: string
        twitter: string
        discord: string
        telegram: string
    },
    tokenomics: {
        supply: number
        lpPercent: number
        fundersPercent: number
        allocations?: ATokenomicsAllocation[]
    }
    campaignDurationHours: number
    targetRaise: number,
    amountIn: number,
    network: NETWORK,
    creatorWalletAddress: string,
}

export type CreateFairLaunchProcessPayload = {
    requestId: string;
    signedTransaction: Transaction;
}

export type CreateFairLaunchRequestSuccessResponse = {
    success: boolean,
    data: {
        mintAddress: string;
        requestId: string;
        rawTransaction: Buffer<ArrayBufferLike>;
    }
    error: any
}
export type CreateFairLaunchProcessSuccessResponse = {
    success: boolean,
    data: {
        mintAddress: string;
        txid: string
    }
    error: any
}
