import axios from "axios";
import { CreateBondingCurvePayload, CreateBondingCurveProcessPayload, CreateBondingCurveProcessSuccessResponse, CreateBondingCurveRequestSuccessResponse } from "../../../types";
import { PublicKey, Transaction } from "@solana/web3.js";
import { BASE_API_URL } from "../..";

export const createBondingCurveRequest = async (payload: CreateBondingCurvePayload) => {
    validateCreatePayload(payload)
    const { data } = await axios.post<CreateBondingCurveRequestSuccessResponse>(`${BASE_API_URL}/pool/bonding-curve/create/request`, payload)
    if (data.success === false) {
        throw new Error(data.error);
    }
    const { rawTransaction, mintAddress, requestId } = data.data
    return {
        transaction: Transaction.from(rawTransaction),
        mintAddress: new PublicKey(mintAddress),
        requestId
    }
}

export const createBondingCurveProcess = async (payload: CreateBondingCurveProcessPayload) => {
    const { data } = await axios.post<CreateBondingCurveProcessSuccessResponse>(`${BASE_API_URL}/pool/bonding-curve/create/process`, {
        requestId: payload.requestId,
        rawTransaction: Array.from(payload.signedTransaction.serialize({ requireAllSignatures: true, verifySignatures: true }))
    })
    if (data.success === false) {
        throw new Error(data.error);
    }
    return data.data
}

const validateCreatePayload = ({ token, amountIn, supply }: CreateBondingCurvePayload) => {
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
        if (website.length > 100) throw new Error(`Website extention too long (Up to 100 characters)`)
    }

    if (twitter) {
        if (typeof twitter !== 'string') throw new Error(`twitter extention must be a string`)
        if (twitter.length > 100) throw new Error(`twitter extention too long (Up to 100 characters)`)
    }

    if (discord) {
        if (typeof discord !== 'string') throw new Error(`discord extention must be a string`)
        if (discord.length > 100) throw new Error(`discord extention too long (Up to 100 characters)`)
    }

    if (telegram) {
        if (typeof telegram !== 'string') throw new Error(`telegram extention must be a string`)
        if (telegram.length > 100) throw new Error(`telegram extention too long (Up to 100 characters)`)
    }

    if (!description || typeof description !== 'string') {
        description = ''
    }
    if (description.length > 500) {
        throw new Error(`Token description too long (Up to 500 characters)`)
    }

    if (supply < 10_000_000 && 10_000_000_000 < supply)
        throw new Error(`Supply must be between 1,000,000 && 1,000,000,000,000,0000`)

    if (amountIn === undefined || typeof amountIn !== 'number') {
        throw new Error(`Missing amount in`)
    }
    if (amountIn < 0 && amountIn < 70) throw new Error(`Amount in must be between 0 SOL - 70 SOL`)



}