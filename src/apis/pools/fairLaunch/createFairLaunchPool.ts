import axios from "axios";
import { CreateFairLaunchPayload, CreateFairLaunchProcessPayload, CreateFairLaunchProcessSuccessResponse, CreateFairLaunchRequestSuccessResponse } from "../../../types";
import { PublicKey, Transaction } from "@solana/web3.js";
import { BASE_API_URL } from "../..";
import { Program } from "@coral-xyz/anchor";
import { Gofundmeme } from "../../../IDL";

export const createFairLaunchRequest = async (payload: CreateFairLaunchPayload, gfmProgram: Program<Gofundmeme>) => {
    validateCreatePayload(payload)
    const { data } = await axios.post<CreateFairLaunchRequestSuccessResponse>(`${BASE_API_URL}/pool/fair-launch/create/request`, payload)
    if (data.success === false) {
        throw new Error(data.error);
    }
    const { rawTransaction, mintAddress, requestId } = data.data
    return {
        transaction: Transaction.from(new Uint8Array((rawTransaction as any).data)),
        mintAddress: new PublicKey(mintAddress),
        requestId
    }
}

export const createFairLaunchProcess = async (payload: CreateFairLaunchProcessPayload) => {
    const { data } = await axios.post<CreateFairLaunchProcessSuccessResponse>(`${BASE_API_URL}/pool/fair-launch/create/process`, {
        requestId: payload.requestId,
        rawTransaction: Array.from(payload.signedTransaction.serialize({ requireAllSignatures: true, verifySignatures: true }))
    })
    if (data.success === false) {
        throw new Error(data.error);
    }
    return data.data
}

const validateCreatePayload = ({ token, amountIn, targetRaise, campaignDurationHours, tokenomics }: CreateFairLaunchPayload) => {
    if (!token) throw new Error('Token details are missing')
    let { base64, name, symbol, description, website, twitter, discord, telegram } = token

    if (!base64 || typeof base64 !== 'string') {
        throw new Error(`Image is required`)
    }

    if (name.length > 30) {
        throw new Error(`Token name too long (Up to 30 characters)`)
    }

    if (!symbol || typeof symbol !== 'string') {
        throw new Error(`Missing token symbol`)
    }
    if (symbol.length > 8) {
        throw new Error(`Token symbol too long (Up to 8 characters)`)
    }

    if (website) {
        if (typeof website !== 'string') throw new Error(`Website extention must be a string`)
        if (website.length > 300) throw new Error(`Website extention too long (Up to 300 characters)`)
    }

    if (twitter) {
        if (typeof twitter !== 'string') throw new Error(`twitter extention must be a string`)
        if (twitter.length > 300) throw new Error(`twitter extention too long (Up to 300 characters)`)
    }

    if (discord) {
        if (typeof discord !== 'string') throw new Error(`discord extention must be a string`)
        if (discord.length > 300) throw new Error(`discord extention too long (Up to 300 characters)`)
    }

    if (telegram) {
        if (typeof telegram !== 'string') throw new Error(`telegram extention must be a string`)
        if (telegram.length > 300) throw new Error(`telegram extention too long (Up to 300 characters)`)
    }

    if (!description || typeof description !== 'string') {
        description = ''
    }
    if (description.length > 500) {
        throw new Error(`Token description too long (Up to 500 characters)`)
    }


    // Token Distribution
    let { supply, lpPercent, fundersPercent, allocations } = tokenomics

    if (supply < 10_000_000 && 10_000_000_000 < supply)
        throw new Error(`Supply must be between 1,000,000 && 1,000,000,000,000,0000`)

    if (supply % 1 !== 0)
        throw new Error(`Supply doesn't support denimals. It must be a round integer`)

    if (lpPercent === undefined || typeof lpPercent !== 'number') {
        throw new Error(`Missing token LP allocation percent `)
    }
    if (lpPercent <= 0.4 && 100 < lpPercent) throw new Error(`LP allocation percent must be between 0.4% - 100%`)

    if (lpPercent * 10 % 1 !== 0)
        throw new Error(`Invalid lpPercent: ${lpPercent}. It must have at most one decimal place (0.1). 0.01 is not allowed`);

    if (fundersPercent === undefined || typeof fundersPercent !== 'number') {
        throw new Error(`Missing token funders allocation percent `)
    }
    if (fundersPercent < 0 && 99.6 <= fundersPercent) throw new Error(`Funders percent must be between 0% - 99.6%`)
    if (fundersPercent * 10 % 1 !== 0)
        throw new Error(`Invalid fundersPercent: ${lpPercent}. It must have at most one decimal place (0.1). 0.01 is not allowed`);

    let totalPercent = lpPercent + fundersPercent

    if (allocations) {
        allocations = allocations.map(({ destination, percent, name }) => {
            if (!destination) throw new Error(`Allocation wallet destination was not provided`)
            try {
                new PublicKey(destination)
            } catch (error) {
                throw new Error(`Wallet Address (${destination}) is invalid`)
            }
            if (percent < 1 && 100 < percent) throw new Error(`Allocation percent must be between 1% - 100%`)
            if (percent * 10 % 1 !== 0)
                throw new Error(`Invalid preallocation "${name}" percent: ${percent}. It must have at most one decimal place (0.1). 0.01 is not allowed`);

            totalPercent += percent
            if (typeof name !== 'string') throw new Error(`Allocation name must be a string`)
            if (name.length > 45) throw new Error(`Allocation name too long (Up to 45 characters)`)
            return { destination, percent, name }
        })
    }

    if (totalPercent !== 100) {
        throw new Error(`Total token allocation percent must equal 100% (currently ${totalPercent.toFixed(2)}%)`)
    }

    if (amountIn === undefined || typeof amountIn !== 'number') {
        throw new Error(`Missing amount in`)
    }
    if (amountIn && amountIn < 0 && targetRaise < amountIn) throw new Error(`Amount in must be between 0 - targetRaise`)


    //   Raise details
    if (targetRaise === undefined || typeof targetRaise !== 'number') {
        throw new Error(`Target raise amount (SOL) missing`)
    }
    if (targetRaise < 6 && 1_000 < targetRaise) throw new Error(`Target raise amount must be between 6 SOL - 1,000 SOL`)

    //   durationHours
    if (campaignDurationHours === undefined || typeof campaignDurationHours !== 'number') {
        throw new Error(`Duration hours missing`)
    }
    if (campaignDurationHours % 1 !== 0)
        throw new Error(`Campaign duration doesn't support denimals. It must be a round integer`)
    if (campaignDurationHours < 3 && 24 < campaignDurationHours) throw new Error(`Campaign duration must be between 3 - 24 hours`)


}