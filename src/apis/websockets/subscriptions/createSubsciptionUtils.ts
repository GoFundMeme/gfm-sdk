import { FundingEvent, MarketcapUpdateEvent, NETWORK, PoolStateEvent, SwapEvent } from "../../../types";
import { webSocketService } from "../webSocketClientBase";

export const createSubscriptionUtils = () => {
    // ✅ Reusable function to create a listener
    const buildListener = <T>(basePath: string, param?: string | NETWORK) => {
        const path = param ? `${basePath}/${param}` : basePath; // Append param if exists
        return {
            subscription: webSocketService.listen<T>(path),
            disconnect: () => webSocketService.disconnect(path) // Wrapped in function to avoid immediate execution
        };
    };

    const { disconnect, disconnectAll } = webSocketService;

    return {
        poolState: {
            all: (network: NETWORK) => buildListener<PoolStateEvent>(`/pool/ws/state?network=${network}`),
            byMintAddress: (mintAddress: string) => buildListener<PoolStateEvent>(`/pool/ws/state`, mintAddress),
        },
        marketcap: {
            all: (network: NETWORK) => buildListener<MarketcapUpdateEvent>(`/pool/ws/marketcap?network=${network}`),
            byMintAddress: (mintAddress: string) => buildListener<MarketcapUpdateEvent>(`/pool/ws/marketcap`, mintAddress),
        },
        bondingCurve: {
            swaps: {
                all: (network: NETWORK) => buildListener<SwapEvent>(`/pool/bonding-curve/ws/swaps?network=${network}`),
                byMintAddress: (mintAddress: string) => buildListener<SwapEvent>(`/pool/bonding-curve/ws/swaps`, mintAddress),
            },
        },
        fairLaunch: {
            funding: {
                all: (network: NETWORK) => buildListener<FundingEvent>(`/pool/fair-launch/ws/funding?network=${network}`),
                byMintAddress: (mintAddress: string) => buildListener<FundingEvent>(`/pool/fair-launch/ws/funding`, mintAddress),
            },
        },
        pool: {
            newPools: (network: NETWORK) => buildListener<PoolStateEvent>(`/pool/ws/created?network=${network}`),
            migratedPools: (network: NETWORK) => buildListener<PoolStateEvent>(`/pool/ws/migrated?network=${network}`),
        },
        disconnect,
        disconnectAll,
    };
};