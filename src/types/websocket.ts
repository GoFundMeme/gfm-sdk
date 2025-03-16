import { NETWORK } from "./general";

export enum DexType {
    ORCA = 'orca',
    RAYDIUM = 'raydium',
    METEORA_DAMM = 'meteoraDAMM',
}

export enum RaiseType {
    FAIR_LAUNCH = 'fair-launch',
    BONDING_CURVE = 'bonding-curve',
}

export enum PoolStatus {
    DRAFT = 'draft',
    RAISING = 'raising',
    VAULT_DEPOSIT = 'vault-deposit',
    LAUNCHING = 'launching',
    LAUNCHED = 'launched',
    FAILED = 'failed',
}

export type TokenInfo = {
    image: string;
    name: string;
    symbol: string;
    mintAddress: string;
    uri: string;
    decimals: number;
}

export type PoolInfo = {
    retryDate: Date
    harvestPercent: number
    tickSpacing: number
    poolAddress: string
    gfmPoolAddress: string
    poolCreationTxid: string
    fundingTxid?: string
    lpTokenAddress?: string
    lpTokenBurnTxid?: string
    transferPositionTxid?: string
    launched: boolean
  }
export type PoolStateEvent = {
    status: PoolStatus;
    totalRaised: number;
    raisePercent: number;
    token: TokenInfo;
    pool: PoolInfo;
    raiseType: RaiseType;
    dexType: DexType;
    network: NETWORK;
}

export type MarketcapUpdateEvent = {
    network: NETWORK,
    mintAddress: string,
    mcSOL: number,
}

export type SwapEvent = {
    direction: 'buy' | 'sell';  // Ensures only 'buy' or 'sell' values are allowed
    solAmountChange: number;  // Represents SOL balance change (negative for spending)
    tokenAmountChange: number;  // Represents token balance change
    price: number;  // Price of the token in SOL
    pooledSOL: number;  // Total SOL currently in the pool
    targetSOL: number;  // Target SOL for the pool
    poolAddress: string;  // Public key of the pool
    funderAddress: string;  // Public key of the funder
    mintAddress: string;  // Public key of the token mint
    txid: string;  // Transaction ID
  };

  export type FundingEvent = {
    direction: 'fund' | 'defund';  // Specifies transaction type
    solAmountChange: number;  // Change in SOL balance
    pooledSOL: number;  // Total SOL in the pool
    targetSOL: number;  // Target SOL amount for the pool
    poolAddress: string;  // Public key of the pool
    funderAddress: string;  // Public key of the funder
    mintAddress: string;  // Public key of the token mint
    txid: string;  // Transaction ID
  };