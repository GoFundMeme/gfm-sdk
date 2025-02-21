import { PublicKey } from "@solana/web3.js";

export function getPoolPDA(
  programId: PublicKey,
  mintA: PublicKey,
  mintB: PublicKey
) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("pool_"), mintA.toBuffer(), mintB.toBuffer()],
    programId
  )[0];
}

export function getPoolTreasuryPDA(programId: PublicKey, pool: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("treasury"), // This string must match the Rust SEEDS
      pool.toBuffer(),
    ],
    programId
  )[0];
}

export function getWSOLTreasuryPDA(programId: PublicKey, pool: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("wrapped_sol"), // This string must match the Rust SEEDS
      pool.toBuffer(),
    ],
    programId
  )[0];
}

export function getPoolSignerPDA(
  programId: PublicKey,
  admin: PublicKey,
  mintA: PublicKey,
  mintB: PublicKey
) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("pool_"),
      admin.toBuffer(),
      mintA.toBuffer(),
      mintB.toBuffer(),
    ],
    programId
  )[0];
}

export function getPoolClaimablePDA(
  programId: PublicKey,
  pool: PublicKey,
  recordNumber: number
) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("pool_claimable_"),
      pool.toBuffer(),
      Buffer.from(recordNumber.toString()),
    ],
    programId
  )[0];
}

export function getUserAccountPDA(
  programId: PublicKey,
  pool: PublicKey,
  wallet: PublicKey
) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("user_account_"), pool.toBuffer(), wallet.toBuffer()],
    programId
  )[0];
}

export function getUserAccountLookupTablePDA(
  programId: PublicKey,
  pool: PublicKey,
  index: number
) {
  const indexBuffer = Buffer.alloc(4);
  indexBuffer.writeUInt32BE(index, 0);
  const finalSeedMakeup = [
    Buffer.from("user_acct_lk_tbl_"),
    pool.toBuffer(),
    indexBuffer,
  ];
  const [pda] = PublicKey.findProgramAddressSync(finalSeedMakeup, programId);
  return pda;
}

export function getUserAccountLookupTableManagerPDA(
  programId: PublicKey,
  pool: PublicKey
) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("user_acct_lk_mgr_"), // This string must match the Rust SEEDS
      pool.toBuffer(),
    ],
    programId
  )[0];
}

// User pools
export function getUserPoolsLookupTablePDA(
  programId: PublicKey,
  user: PublicKey,
  index: number
) {
  const indexBuffer = Buffer.alloc(4);
  indexBuffer.writeUInt32BE(index, 0);
  const finalSeedMakeup = [
    Buffer.from("u_pools_tbl_"),
    user.toBuffer(),
    indexBuffer,
  ];
  const [pda] = PublicKey.findProgramAddressSync(finalSeedMakeup, programId);
  return pda;
}

export function getUserPoolsLookupTableManagerPDA(
  programId: PublicKey,
  user: PublicKey
) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("u_pools_tbl_mgr_"), // This string must match the Rust SEEDS
      user.toBuffer(),
    ],
    programId
  )[0];
}

export function getPoolClaimableLookupTablePDA(
  programId: PublicKey,
  pool: PublicKey,
  index: number
) {
  const indexBuffer = Buffer.alloc(4);
  indexBuffer.writeUInt32BE(index, 0);
  const finalSeedMakeup = [
    Buffer.from("pool_clm_lk_tbl_"),
    pool.toBuffer(),
    indexBuffer,
  ];
  const [pda] = PublicKey.findProgramAddressSync(finalSeedMakeup, programId);
  return pda;
}

export function getPoolClaimableLookupTableManagerPDA(
  programId: PublicKey,
  pool: PublicKey
) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("pool_clm_lk_mgr_"), // Matches SEEDS in Rust
      pool.toBuffer(),
    ],
    programId
  )[0];
}

export function getPoolVestingTablePDA(programId: PublicKey, pool: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("pool_vst_tbl_"), // Matches SEEDS in Rust
      pool.toBuffer(),
    ],
    programId
  )[0];
}

export function getProgramPoolsTableManagerPDA(programId: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("pools_tbl_mgr_"), // Matches SEEDS in Rust
    ],
    programId
  )[0];
}
export function getProgramPoolsTablePDA(programId: PublicKey, index: number) {
  const indexBuffer = Buffer.alloc(4);
  indexBuffer.writeUInt32BE(index, 0);
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("pools_tbl_"), // Matches SEEDS in Rust
      indexBuffer,
    ],
    programId
  )[0];
}

export function getProgramLaunchedPoolsTableManagerPDA(programId: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("l_pools_tbl_mgr_"), // Matches SEEDS in Rust
    ],
    programId
  )[0];
}
export function getProgramLaunchedPoolsTablePDA(
  programId: PublicKey,
  index: number
) {
  const indexBuffer = Buffer.alloc(4);
  indexBuffer.writeUInt32BE(index, 0);
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("l_pools_tbl_"), // Matches SEEDS in Rust
      indexBuffer,
    ],
    programId
  )[0];
}
// STAKING
export function getProgramStakingNetworkPDA(programId: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("g_network_sts"), // Matches SEEDS in Rust
    ],
    programId
  )[0];
}

export function getProgramStakingNetworkTreasuryPDA(
  programId: PublicKey,
  gfmMint: PublicKey
) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("sn_treasury"), // Matches SEEDS in Rust
      gfmMint.toBuffer(),
    ],
    programId
  )[0];
}

export function getProgramStakingNetworkTreasurySyncPDA(
  programId: PublicKey,
  gfmMint: PublicKey
) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("sn_treasury_sync"), // Matches SEEDS in Rust
      gfmMint.toBuffer(),
    ],
    programId
  )[0];
}

export function getProgramStakingNetworkUserRecord(
  programId: PublicKey,
  gfmMint: PublicKey,
  stakingNetwork: PublicKey,
  index: number
) {
  const indexBuffer = Buffer.alloc(4);
  indexBuffer.writeUInt32BE(index, 0);
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("u_sn_tbl_"), // Matches SEEDS in Rust
      gfmMint.toBuffer(),
      stakingNetwork.toBuffer(),
      indexBuffer,
    ],
    programId
  )[0];
}

export function getProgramStakingNetworkUserAccountManager(
  programId: PublicKey,
  gfmMint: PublicKey,
  staker: PublicKey
) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("a_sn_a_mgr_"), // Matches SEEDS in Rust
      gfmMint.toBuffer(),
      staker.toBuffer(),
    ],
    programId
  )[0];
}

export function getProgramStakingNetworkUserAccount(
  programId: PublicKey,
  gfmMint: PublicKey,
  staker: PublicKey,
  index: number
) {
  const indexBuffer = Buffer.alloc(4);
  indexBuffer.writeUInt32BE(index, 0);
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("a_sn_a_"), // Matches SEEDS in Rust
      gfmMint.toBuffer(),
      staker.toBuffer(),
      indexBuffer,
    ],
    programId
  )[0];
}

export function getPoolStakingNetwork(programId: PublicKey, pool: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("p_network_sts"), // Matches SEEDS in Rust
      pool.toBuffer(),
    ],
    programId
  )[0];
}

export function getPoolStakerAccount(
  programId: PublicKey,
  mintB: PublicKey,
  staker: PublicKey
) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("p_sn_a_"), // Matches SEEDS in Rust
      mintB.toBuffer(),
      staker.toBuffer(),
    ],
    programId
  )[0];
}
