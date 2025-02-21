import { Program } from "@coral-xyz/anchor";
import { Gofundmeme } from "../IDL/types/gofundmeme";

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

let program: Program<Gofundmeme>;

export type FairLaunchPool = UnwrapPromise<ReturnType<typeof program.account.pool.fetch>>;
export type BondingCurvePool = UnwrapPromise<ReturnType<typeof program.account.bondingCurvePool.fetch>>;
