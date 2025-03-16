import { Keypair, PublicKey } from "@solana/web3.js";
import { CreateBondingCurvePayload, CreateBondingCurveProcessPayload, PoolsUtils } from "../types";
import { buildBondingCurveApiUtils } from "./pools/bondingCurve";
import { buildFailLaunchApiUtils } from "./pools/fairLaunch";
import { createSubscriptionUtils } from "./websockets/subscriptions/createSubsciptionUtils";

export const BASE_API_URL = "http://build.gofundmeme.io/api/v1"
export const BASE_WS_URL = "build.gofundmeme.io/api/v1"

export const buildApiUtils = async (poolUtils: PoolsUtils) => {
    const bondingCurveApiUtils = await buildBondingCurveApiUtils(poolUtils)
    const fairLaunchApiUtilse = await buildFailLaunchApiUtils(poolUtils)
    const subscription = createSubscriptionUtils()
    return {
        bondingCurve: bondingCurveApiUtils,
        fairLaunch: fairLaunchApiUtilse,
        subscription
    }
}