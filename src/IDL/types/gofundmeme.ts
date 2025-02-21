export type Gofundmeme = {
  "version": "0.1.0",
  "name": "gofundmeme",
  "instructions": [
    {
      "name": "initPool",
      "accounts": [
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenAMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenBMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lookupManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lookupTable",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolsLookupManager",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "token",
          "type": {
            "defined": "TokenData"
          }
        }
      ]
    },
    {
      "name": "setTokenomicAndCreateOrcaPool",
      "accounts": [
        {
          "name": "creator",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpoolsConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeTier",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMintA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMintB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tokenomics",
          "type": {
            "defined": "Tokenomics"
          }
        }
      ]
    },
    {
      "name": "initBondingCurvePool",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenAMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenBMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasuryTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingNetworkSyncAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "token",
          "type": {
            "defined": "TokenData"
          }
        },
        {
          "name": "tokenomics",
          "type": {
            "defined": "BondingCurveTokenomics"
          }
        },
        {
          "name": "amountIn",
          "type": "u64"
        }
      ]
    },
    {
      "name": "swap",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasuryTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingNetworkSyncAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gatewayToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPoolsLookupManager",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "swapParams",
          "type": {
            "defined": "SwapParams"
          }
        }
      ]
    },
    {
      "name": "endPool",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initProgramTables",
      "accounts": [
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "superAdmin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "poolsLookupManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolsLookupTable",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "launchedPoolsLookupManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "launchedPoolsLookupTable",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updatePoolAdmin",
      "accounts": [
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "superAdmin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "newAdmin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setupVesting",
      "accounts": [
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "launchedPoolsLookupManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolVestingTable",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "treasuryTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "harvest",
      "accounts": [
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "crankerTokenAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "crankerTokenAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingNetworkWsolAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network's WSOL account."
          ]
        },
        {
          "name": "poolStakingNetwork",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "investInPool",
      "accounts": [
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userWallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lookupManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPoolsLookupManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "currentLookupTable",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fallbackLookupTable",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingNetworkSyncAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "hours",
          "type": "u64"
        }
      ]
    },
    {
      "name": "defundFromPool",
      "accounts": [
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userWallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPoolsLookupManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingNetworkSyncAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "hours",
          "type": "u64"
        }
      ]
    },
    {
      "name": "defundAllFromPool",
      "accounts": [
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userWallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPoolsLookupManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingNetworkSyncAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "multiClaim",
      "accounts": [
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token program used for transferring tokens."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program for basic Solana operations."
          ]
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer initiating the transaction."
          ]
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The pool from which the rewards are claimed.",
            "This pool is identified by a unique set of seeds derived from its token mints."
          ]
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The user account for whom the claim is made.",
            "This account is associated with the pool and holds information about the user's investments."
          ]
        },
        {
          "name": "poolTokenAccountA",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The pool's token accounts from which rewards will be distributed."
          ]
        },
        {
          "name": "poolTokenAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccountMintA",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The user's token accounts where the rewards will be deposited."
          ]
        },
        {
          "name": "userTokenAccountMintB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authorityTokenAccountA",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "Optional: Authority token accounts for royalties",
            "If royalties are requested, these accounts will receive the royalty portion."
          ]
        },
        {
          "name": "authorityTokenAccountB",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        }
      ],
      "args": [
        {
          "name": "requestRoyalty",
          "type": "bool"
        }
      ]
    },
    {
      "name": "vestingClaim",
      "accounts": [
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token program used for transferring tokens."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program for basic Solana operations."
          ]
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer initiating the transaction."
          ]
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The pool from which the rewards are claimed.",
            "This pool is identified by a unique set of seeds derived from its token mints."
          ]
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The user account for whom the claim is made.",
            "This account is associated with the pool and holds information about the user's investments.",
            "Optional: If not provided, vesting checks will be skipped."
          ]
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The pool's token accounts from which rewards will be distributed."
          ]
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The user's token accounts where the rewards will be deposited.",
            "CHECK"
          ]
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "poolVestingTable",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updateUserAccount",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The owner who has control over the user account."
          ]
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The user account that will be updated."
          ]
        },
        {
          "name": "lookupManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lookupTable",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "hasRoyalty",
          "type": "bool"
        },
        {
          "name": "royaltyPercent",
          "type": "u8"
        }
      ]
    },
    {
      "name": "initTicksAndCreatePosition",
      "accounts": [
        {
          "name": "funder",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "positionTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "poolPositionTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMetadataAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "metadataUpdateAuth",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "solAddress",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "OpenPositionWithMetadataBumps"
          }
        }
      ]
    },
    {
      "name": "refundFromPool",
      "accounts": [
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userWallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPoolsLookupManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initStakingNetwork",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The owner who has control over the user account."
          ]
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network account, derived using seeds."
          ]
        },
        {
          "name": "stakingNetworkTreasuryAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "stakingNetworkWsolAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network's WSOL account."
          ]
        },
        {
          "name": "stakingNetworkSyncAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "solAddress",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "gfmMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The mint account for the GFM token.",
            "CHECK"
          ]
        },
        {
          "name": "gfmMetadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "gfmTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "sgfmMint",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The mint account for the SGFM token."
          ]
        },
        {
          "name": "sgfmMetadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "sgfmTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The associated token program account."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token program account."
          ]
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "syncStakingNetwork",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The owner who has control over the user account."
          ]
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network account, derived using seeds."
          ]
        },
        {
          "name": "stakingTreasuryAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "stakingNetworkWsolAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network's WSOL account."
          ]
        },
        {
          "name": "stakingNetworkSyncAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solAddress",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "gfmFoundationAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The mint account for the GFM token."
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The associated token program account."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token program account."
          ]
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createStakerAccount",
      "accounts": [
        {
          "name": "staker",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The owner who will control the staker account."
          ]
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network account, derived using seeds."
          ]
        },
        {
          "name": "stakerAccountManager",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staker account to be initialized."
          ]
        },
        {
          "name": "sgfmMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The mint account for the SGFM token."
          ]
        },
        {
          "name": "stakerSgfmTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staker's SGFM token account."
          ]
        },
        {
          "name": "stakerRecord",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network account, derived using seeds."
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The associated token program account."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token program account."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program."
          ]
        }
      ],
      "args": []
    },
    {
      "name": "stake",
      "accounts": [
        {
          "name": "staker",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The owner who has control over the user account."
          ]
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network account, derived using seeds."
          ]
        },
        {
          "name": "stakerAccountManager",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staker account to be initialized."
          ]
        },
        {
          "name": "stakerAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network account, derived using seeds."
          ]
        },
        {
          "name": "stakerTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The token account of the staker where rewards are collected."
          ]
        },
        {
          "name": "stakingNetworkTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The mint account for the GFM token."
          ]
        },
        {
          "name": "sgfmMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The mint account for the SGFM token."
          ]
        },
        {
          "name": "stakerSgfmTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staker's SGFM token account."
          ]
        },
        {
          "name": "networkSgfmTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network's SGFM token account."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token program account."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program account."
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The associated token program account."
          ]
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tokenAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "unstake",
      "accounts": [
        {
          "name": "staker",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The owner who has control over the user account."
          ]
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network account, derived using seeds."
          ]
        },
        {
          "name": "stakingTreasuryAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "stakerAccountManager",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staker account to be validated and updated."
          ]
        },
        {
          "name": "stakerAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staker account to be validated and updated."
          ]
        },
        {
          "name": "stakerSgfmTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staker's SGFM token account."
          ]
        },
        {
          "name": "networkSgfmTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network's SGFM token account."
          ]
        },
        {
          "name": "stakerTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The token account of the staker where rewards and unstaked tokens are collected."
          ]
        },
        {
          "name": "stakingNetworkTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network's token account for this staker, owned by the staker account."
          ]
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The mint account for the GFM token."
          ]
        },
        {
          "name": "sgfmMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The mint account for the SGFM token."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token program account."
          ]
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "stakerClaim",
      "accounts": [
        {
          "name": "staker",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The owner who has control over the user account."
          ]
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network account, derived using seeds."
          ]
        },
        {
          "name": "stakingTreasuryAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "stakerAccountManager",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staker account to be validated and updated."
          ]
        },
        {
          "name": "stakerAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staker account to be validated and updated."
          ]
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "orcaSwap",
      "accounts": [
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgramA",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tokenProgramB",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "memoProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMintA",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tokenMintB",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray0",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tickArray1",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tickArray2",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "oracle",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "while not mut in main impl, marked mut here to avoid a breaking change upon upgrade"
          ]
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingNetworkWsolAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network's WSOL account."
          ]
        },
        {
          "name": "stakingNetworkSyncAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "OrcaSwapParams"
          }
        }
      ]
    },
    {
      "name": "initTicks",
      "accounts": [
        {
          "name": "funder",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "positionTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "poolPositionTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMetadataAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "metadataUpdateAuth",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "solAddress",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "OpenPositionWithMetadataBumps"
          }
        }
      ]
    },
    {
      "name": "createPosition",
      "accounts": [
        {
          "name": "funder",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "positionTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "poolPositionTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMetadataAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "metadataUpdateAuth",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "solAddress",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "OpenPositionWithMetadataBumps"
          }
        }
      ]
    },
    {
      "name": "allocationClaim",
      "accounts": [
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token program used for transferring tokens."
          ]
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer (authority) receiving the allocation."
          ]
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The pool from which the allocation is claimed.",
            "This pool is identified by a unique set of seeds derived from its token mints."
          ]
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The pool's token account holding the tokens to be distributed."
          ]
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The authority's token account where the allocation will be deposited.",
            "If not initialized, it will be created via Associated Token Program."
          ]
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The mint of the token being allocated."
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The Associated Token Program to create a token account if the user doesn't already have one."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program for basic Solana operations."
          ]
        }
      ],
      "args": []
    },
    {
      "name": "bondingCurveFundsTransfer",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "creator",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wrappedSolAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solAddress",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "token0Mint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Token_0 mint, the key must smaller then token_1 mint."
          ]
        },
        {
          "name": "token1Mint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Token_1 mint, the key must grater then token_0 mint."
          ]
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network account, derived using seeds."
          ]
        },
        {
          "name": "stakingNetworkSyncAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Program to create mint account and mint tokens"
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Program to create an ATA for receiving position NFT"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "bondingCurveCreateMarket",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wrappedSolAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solAddress",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "cpSwapProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammConfig",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Which config the pool belongs to."
          ]
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "token0Mint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Token_0 mint, the key must smaller then token_1 mint."
          ]
        },
        {
          "name": "token1Mint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Token_1 mint, the key must grater then token_0 mint."
          ]
        },
        {
          "name": "lpMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creatorToken0",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "creatorToken1",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "creator token1 account"
          ]
        },
        {
          "name": "treasuryToken1",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "creator token1 account"
          ]
        },
        {
          "name": "creatorLpToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "token0Vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "token1Vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "createPoolFee",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "create pool fee account"
          ]
        },
        {
          "name": "observationState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Program to create mint account and mint tokens"
          ]
        },
        {
          "name": "poolPositionTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Program to create an ATA for receiving position NFT"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "bondingCurveLockLp",
      "accounts": [
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creatorToken0",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "solAddress",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "treasuryTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "cpSwapProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "token0Mint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Token_0 mint, the key must smaller then token_1 mint.",
            "CHECK"
          ]
        },
        {
          "name": "token1Mint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Token_1 mint, the key must grater then token_0 mint.",
            "CHECK"
          ]
        },
        {
          "name": "ammConfig",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Which config the pool belongs to."
          ]
        },
        {
          "name": "poolState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lockLpProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lockLpProgramAuth",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lockPda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userLpVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lockLpVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "lpMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolLpToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "token0Vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "token1Vault",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "bondingCurveHarvest",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lockLpProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "feeNftAccount",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Fee token account"
          ]
        },
        {
          "name": "lockedLiquidity",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Store the locked the information of liquidity",
            "CHECK"
          ]
        },
        {
          "name": "cpmmProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "cpAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lpMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "lp mint",
            "address = pool_state.lp_mint"
          ]
        },
        {
          "name": "recipientToken0Account",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The token account for receive token_0"
          ]
        },
        {
          "name": "recipientToken1Account",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The token account for receive token_1"
          ]
        },
        {
          "name": "token0Vault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The address that holds pool tokens for token_0",
            "address = pool_state.token_0_vault"
          ]
        },
        {
          "name": "token1Vault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The address that holds pool tokens for token_1",
            "address = pool_state.token_1_vault"
          ]
        },
        {
          "name": "vault0Mint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The mint of token_0 vault"
          ]
        },
        {
          "name": "vault1Mint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The mint of token_1 vault"
          ]
        },
        {
          "name": "lockedLpVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "locked lp token account"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "token Program"
          ]
        },
        {
          "name": "tokenProgram2022",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Token program 2022"
          ]
        },
        {
          "name": "memoProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "memo program"
          ]
        },
        {
          "name": "crankerTokenAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "crankerTokenAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingNetworkWsolAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network's WSOL account."
          ]
        }
      ],
      "args": [
        {
          "name": "feeLpAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initBcPoolStakingNetwork",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The owner who has control over the user account."
          ]
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolStakingNetwork",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network account, derived using seeds."
          ]
        },
        {
          "name": "stakingNetworkTokenAccountA",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The pool's token accounts from which rewards will be distributed.",
            "The staking network's WSOL (Token A) account.",
            "CHECK"
          ]
        },
        {
          "name": "stakingNetworkTokenAccountB",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network's Token B account.",
            "CHECK"
          ]
        },
        {
          "name": "mintA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintB",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The mint account for the GFM token.",
            "CHECK"
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The associated token program account."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token program account."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initPoolStakingNetwork",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The owner who has control over the user account."
          ]
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolStakingNetwork",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network account, derived using seeds."
          ]
        },
        {
          "name": "stakingNetworkTokenAccountA",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The pool's token accounts from which rewards will be distributed.",
            "The staking network's WSOL (Token A) account.",
            "CHECK"
          ]
        },
        {
          "name": "stakingNetworkTokenAccountB",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network's Token B account.",
            "CHECK"
          ]
        },
        {
          "name": "mintA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintB",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The mint account for the GFM token.",
            "CHECK"
          ]
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "stakingMetadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The associated token program account."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token program account."
          ]
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "poolStake",
      "accounts": [
        {
          "name": "staker",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The owner who has control over the user account."
          ]
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolStakingNetwork",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network account, derived using seeds."
          ]
        },
        {
          "name": "networkTokenAccountA",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The pool's token accounts from which rewards will be distributed."
          ]
        },
        {
          "name": "networkTokenAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakerAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network account, derived using seeds."
          ]
        },
        {
          "name": "stakerTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The token account of the staker where rewards are collected.",
            "CHECK"
          ]
        },
        {
          "name": "stakerAccountEscrowB",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staker’s WSOL (Token A) account."
          ]
        },
        {
          "name": "mintA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintB",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The mint account for the GFM token."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token program account."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program account."
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The associated token program account."
          ]
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tokenAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "poolStakerClaim",
      "accounts": [
        {
          "name": "staker",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The staker who is claiming rewards."
          ]
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "poolStakingNetwork",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The global staking network account."
          ]
        },
        {
          "name": "stakingNetworkTokenAccountA",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network's WSOL (Token A) account."
          ]
        },
        {
          "name": "stakingNetworkTokenAccountB",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network's Token B account."
          ]
        },
        {
          "name": "stakerAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staker’s individual staking account."
          ]
        },
        {
          "name": "mintA",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The mint account for the GFM token."
          ]
        },
        {
          "name": "mintB",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The mint account for the GFM token."
          ]
        },
        {
          "name": "stakerTokenAccountA",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staker’s WSOL (Token A) account."
          ]
        },
        {
          "name": "stakerTokenAccountB",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staker’s WSOL (Token A) account."
          ]
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program account."
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The associated token program account."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token program."
          ]
        }
      ],
      "args": []
    },
    {
      "name": "poolUnstake",
      "accounts": [
        {
          "name": "staker",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The staker who owns the staking account."
          ]
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolStakingNetwork",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network account, derived using seeds."
          ]
        },
        {
          "name": "stakerAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staker's staking account (will be closed upon unstaking)."
          ]
        },
        {
          "name": "stakerAccountEscrowB",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staker’s WSOL (Token A) account."
          ]
        },
        {
          "name": "stakerTokenAccountB",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staker’s Token B account."
          ]
        },
        {
          "name": "mintA",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The mint account for WSOL (Token A)."
          ]
        },
        {
          "name": "mintB",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The mint account for Token B."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token program."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program."
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The associated token program."
          ]
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tokenUnstakeAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "syncOrcaPoolStakingNetwork",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The owner who has control over the user account."
          ]
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolStakingNetwork",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network account, derived using seeds."
          ]
        },
        {
          "name": "networkTokenAccountA",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The pool's token accounts from which rewards will be distributed.",
            "CHECK"
          ]
        },
        {
          "name": "networkTokenAccountB",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "mintA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintB",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The mint account for the GFM token."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token program account."
          ]
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "crankerTokenAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "crankerTokenAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingNetworkWsolAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network's WSOL account."
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The associated token program account."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "syncRaydiumPoolStakingNetwork",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The owner who has control over the user account."
          ]
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolStakingNetwork",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network account, derived using seeds."
          ]
        },
        {
          "name": "networkTokenAccountA",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The pool's token accounts from which rewards will be distributed.",
            "CHECK"
          ]
        },
        {
          "name": "networkTokenAccountB",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "mintA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintB",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The mint account for the GFM token."
          ]
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lockLpProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "feeNftAccount",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Fee token account",
            "CHECK"
          ]
        },
        {
          "name": "lockedLiquidity",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Store the locked the information of liquidity",
            "CHECK"
          ]
        },
        {
          "name": "cpmmProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "cpAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lpMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "lp mint",
            "address = pool_state.lp_mint",
            "CHECK"
          ]
        },
        {
          "name": "token0Vault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The address that holds pool tokens for token_0",
            "address = pool_state.token_0_vault",
            "CHECK"
          ]
        },
        {
          "name": "token1Vault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The address that holds pool tokens for token_1",
            "address = pool_state.token_1_vault",
            "CHECK"
          ]
        },
        {
          "name": "lockedLpVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "locked lp token account",
            "CHECK"
          ]
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingNetworkWsolAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network's WSOL account.",
            "CHECK"
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The associated token program account."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram2022",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Token program 2022"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token program account."
          ]
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "memoProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "memo program"
          ]
        }
      ],
      "args": [
        {
          "name": "feeLpAmount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "pool",
      "docs": [
        "PDA [\"pool_\", token_a_mint, token_b_mint]"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "crankRewardBps",
            "type": "u16"
          },
          {
            "name": "defundFee",
            "type": "u16"
          },
          {
            "name": "totalRaised",
            "type": "u64"
          },
          {
            "name": "targetRaise",
            "type": "u64"
          },
          {
            "name": "totalSupply",
            "type": "u64"
          },
          {
            "name": "claimableAmountMintA",
            "type": "u64"
          },
          {
            "name": "claimableAmountMintB",
            "type": "u64"
          },
          {
            "name": "claimedAmountMintA",
            "type": "u64"
          },
          {
            "name": "claimedAmountMintB",
            "type": "u64"
          },
          {
            "name": "tokenAMint",
            "type": "publicKey"
          },
          {
            "name": "tokenBMint",
            "type": "publicKey"
          },
          {
            "name": "currentRecordNumber",
            "type": "u64"
          },
          {
            "name": "whirlpool",
            "type": "publicKey"
          },
          {
            "name": "position",
            "type": "publicKey"
          },
          {
            "name": "kycNetworkKey",
            "type": "publicKey"
          },
          {
            "name": "poolType",
            "type": {
              "defined": "PoolType"
            }
          },
          {
            "name": "raiseType",
            "type": {
              "defined": "RaiseType"
            }
          },
          {
            "name": "poolStatus",
            "type": {
              "defined": "PoolStatus"
            }
          },
          {
            "name": "multiplier",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "hours",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "raised",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "allocationLpPercent",
            "type": "u16"
          },
          {
            "name": "allocationFundersPercent",
            "type": "u16"
          },
          {
            "name": "allocationTreasuryPercent",
            "type": "u16"
          },
          {
            "name": "allocationPercent",
            "type": {
              "vec": "u16"
            }
          },
          {
            "name": "allocationName",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "allocationWallet",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "allocationClaimed",
            "type": {
              "vec": "bool"
            }
          },
          {
            "name": "canDefund",
            "type": "bool"
          },
          {
            "name": "hasExpirationDate",
            "type": "bool"
          },
          {
            "name": "expirationTimestamp",
            "type": "u64"
          },
          {
            "name": "currentSol",
            "type": "u64"
          },
          {
            "name": "curveConstant",
            "type": "f64"
          },
          {
            "name": "tokenBalance",
            "type": "u64"
          },
          {
            "name": "initialTokens",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "bondingCurvePool",
      "docs": [
        "PDA [\"pool_\", token_a_mint, token_b_mint]"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "crankRewardBps",
            "type": "u16"
          },
          {
            "name": "defundFee",
            "type": "u16"
          },
          {
            "name": "totalRaised",
            "type": "u64"
          },
          {
            "name": "targetRaise",
            "type": "u64"
          },
          {
            "name": "totalSupply",
            "type": "u64"
          },
          {
            "name": "claimableAmountMintA",
            "type": "u64"
          },
          {
            "name": "claimableAmountMintB",
            "type": "u64"
          },
          {
            "name": "claimedAmountMintA",
            "type": "u64"
          },
          {
            "name": "claimedAmountMintB",
            "type": "u64"
          },
          {
            "name": "tokenAMint",
            "type": "publicKey"
          },
          {
            "name": "tokenBMint",
            "type": "publicKey"
          },
          {
            "name": "currentRecordNumber",
            "type": "u64"
          },
          {
            "name": "whirlpool",
            "type": "publicKey"
          },
          {
            "name": "position",
            "type": "publicKey"
          },
          {
            "name": "kycNetworkKey",
            "type": "publicKey"
          },
          {
            "name": "poolType",
            "type": {
              "defined": "PoolType"
            }
          },
          {
            "name": "raiseType",
            "type": {
              "defined": "RaiseType"
            }
          },
          {
            "name": "poolStatus",
            "type": {
              "defined": "PoolStatus"
            }
          },
          {
            "name": "multiplier",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "hours",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "raised",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "allocationLpPercent",
            "type": "u16"
          },
          {
            "name": "allocationFundersPercent",
            "type": "u16"
          },
          {
            "name": "allocationTreasuryPercent",
            "type": "u16"
          },
          {
            "name": "allocationPercent",
            "type": {
              "vec": "u16"
            }
          },
          {
            "name": "allocationName",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "allocationWallet",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "allocationClaimed",
            "type": {
              "vec": "bool"
            }
          },
          {
            "name": "canDefund",
            "type": "bool"
          },
          {
            "name": "hasExpirationDate",
            "type": "bool"
          },
          {
            "name": "currentSol",
            "type": "u64"
          },
          {
            "name": "curveExponent",
            "type": "f64"
          },
          {
            "name": "curveConstant",
            "type": "f64"
          },
          {
            "name": "tokenBalance",
            "type": "u64"
          },
          {
            "name": "initialTokens",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "userAccount",
      "docs": [
        "PDA [\"user_\", pool pubkey, wallet pubkey]"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "pool",
            "type": "publicKey"
          },
          {
            "name": "claimedAmountMintA",
            "type": "u64"
          },
          {
            "name": "claimedAmountMintB",
            "type": "u64"
          },
          {
            "name": "investedAmount",
            "type": "u64"
          },
          {
            "name": "lastRecordClaimed",
            "type": "u64"
          },
          {
            "name": "inProcess",
            "type": "bool"
          },
          {
            "name": "hasRoyalty",
            "type": "bool"
          },
          {
            "name": "royaltyPercent",
            "type": "u8"
          },
          {
            "name": "lookupTablePda",
            "type": "publicKey"
          },
          {
            "name": "hours",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "invested",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "claimed",
            "type": {
              "vec": "bool"
            }
          }
        ]
      }
    },
    {
      "name": "userAccountLookupTable",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "pool",
            "type": "publicKey"
          },
          {
            "name": "tableId",
            "type": "u32"
          },
          {
            "name": "userAccounts",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "hasRoyalty",
            "type": {
              "vec": "bool"
            }
          },
          {
            "name": "royaltyPercent",
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "userAccountLookupTableManager",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "pool",
            "type": "publicKey"
          },
          {
            "name": "currentTableCount",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "poolsTable",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "tableId",
            "type": "u32"
          },
          {
            "name": "pools",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "tokens",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "poolsTableManager",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "currentTableCount",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "launchedPoolsTable",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "tableId",
            "type": "u32"
          },
          {
            "name": "pools",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "tokens",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "launchedPoolsTableManager",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "currentTableCount",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "userPoolsTable",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "tableId",
            "type": "u32"
          },
          {
            "name": "pools",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "tokens",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "userPoolsTableManager",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "volume",
            "type": "u64"
          },
          {
            "name": "defund",
            "type": "u64"
          },
          {
            "name": "totalPools",
            "type": "u64"
          },
          {
            "name": "currentTableCount",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "poolVestingTable",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "pool",
            "type": "publicKey"
          },
          {
            "name": "claimedAmountMint",
            "type": "u64"
          },
          {
            "name": "hours",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "unlockTimestamp",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "claimableAmountMint",
            "type": {
              "vec": "u64"
            }
          }
        ]
      }
    },
    {
      "name": "gfmStakingNetwork",
      "docs": [
        "* STAKING"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "totalStakedTokens",
            "type": "u64"
          },
          {
            "name": "cumulativeRewardsPerToken",
            "type": "u64"
          },
          {
            "name": "rewardPool",
            "type": "u64"
          },
          {
            "name": "wsolAccount",
            "type": "publicKey"
          },
          {
            "name": "lastNetworkSyncTimestamp",
            "type": "u64"
          },
          {
            "name": "stakersCount",
            "type": "u64"
          },
          {
            "name": "totalRewards",
            "type": "u64"
          },
          {
            "name": "claimedRewards",
            "type": "u64"
          },
          {
            "name": "gfmMintAddress",
            "type": "publicKey"
          },
          {
            "name": "sgfmMintAddress",
            "type": "publicKey"
          },
          {
            "name": "sgfmTokenAccount",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "gfmStakerRecord",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "staker",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "gfmStakerAccountManager",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "claimedRewards",
            "type": "u64"
          },
          {
            "name": "currentRecord",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "gfmStakerAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "staker",
            "type": "publicKey"
          },
          {
            "name": "record",
            "type": "u32"
          },
          {
            "name": "userStakedTokens",
            "type": "u64"
          },
          {
            "name": "claimedRewards",
            "type": "u64"
          },
          {
            "name": "userCumulativeRewardsPerToken",
            "type": "u64"
          },
          {
            "name": "userAccumulatedRewards",
            "type": "u64"
          },
          {
            "name": "stakingTimestamp",
            "type": "u64"
          },
          {
            "name": "lastClaimedTimestamp",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "gfmPoolStakingNetwork",
      "docs": [
        "* Pool STAKING"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "totalStakedTokens",
            "type": "u64"
          },
          {
            "name": "cumulativeRewardsPerTokenA",
            "type": "u128"
          },
          {
            "name": "cumulativeRewardsPerTokenB",
            "type": "u128"
          },
          {
            "name": "rewardPoolA",
            "type": "u128"
          },
          {
            "name": "rewardPoolB",
            "type": "u128"
          },
          {
            "name": "mintAAccount",
            "type": "publicKey"
          },
          {
            "name": "mintBAccount",
            "type": "publicKey"
          },
          {
            "name": "lastNetworkSyncTimestamp",
            "type": "u64"
          },
          {
            "name": "stakersCount",
            "type": "u64"
          },
          {
            "name": "totalRewardsA",
            "type": "u128"
          },
          {
            "name": "totalRewardsB",
            "type": "u128"
          },
          {
            "name": "claimedRewardsA",
            "type": "u128"
          },
          {
            "name": "claimedRewardsB",
            "type": "u128"
          },
          {
            "name": "mintAAddress",
            "type": "publicKey"
          },
          {
            "name": "mintBAddress",
            "type": "publicKey"
          },
          {
            "name": "unstakingCooldownHours",
            "type": "u16"
          },
          {
            "name": "unstakeWindowHours",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "gfmPoolStakerAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "staker",
            "type": "publicKey"
          },
          {
            "name": "userStakedTokens",
            "type": "u64"
          },
          {
            "name": "claimedRewardsA",
            "type": "u128"
          },
          {
            "name": "claimedRewardsB",
            "type": "u128"
          },
          {
            "name": "userCumulativeRewardsPerTokenA",
            "type": "u128"
          },
          {
            "name": "userCumulativeRewardsPerTokenB",
            "type": "u128"
          },
          {
            "name": "userAccumulatedRewardsA",
            "type": "u128"
          },
          {
            "name": "userAccumulatedRewardsB",
            "type": "u128"
          },
          {
            "name": "stakingTimestamp",
            "type": "u64"
          },
          {
            "name": "lastClaimedTimestamp",
            "type": "u64"
          },
          {
            "name": "hasRoyalty",
            "type": "bool"
          },
          {
            "name": "royaltyPercent",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "BondingCurveTokenomics",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "crankRewardBps",
            "type": "u16"
          },
          {
            "name": "targetRaise",
            "type": "u64"
          },
          {
            "name": "curveExponent",
            "type": "f64"
          },
          {
            "name": "curveConstant",
            "type": "f64"
          },
          {
            "name": "allocationTreasuryPercent",
            "type": "u16"
          },
          {
            "name": "allocationPercent",
            "type": {
              "vec": "u16"
            }
          },
          {
            "name": "allocationName",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "allocationWallet",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "kycNetworkKey",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "OpenPositionWithMetadataBumps",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "positionBump",
            "type": "u8"
          },
          {
            "name": "metadataBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "RemainingAccountsSlice",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "accountsType",
            "type": {
              "defined": "AccountsType"
            }
          },
          {
            "name": "length",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "RemainingAccountsInfoInternal",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "slices",
            "type": {
              "vec": {
                "defined": "RemainingAccountsSlice"
              }
            }
          }
        ]
      }
    },
    {
      "name": "OrcaSwapParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "otherAmountThreshold",
            "type": "u64"
          },
          {
            "name": "sqrtPriceLimit",
            "type": "u128"
          },
          {
            "name": "amountSpecifiedIsInput",
            "type": "bool"
          },
          {
            "name": "aToB",
            "type": "bool"
          },
          {
            "name": "remainingAccountsInfo",
            "type": {
              "option": {
                "defined": "RemainingAccountsInfoInternal"
              }
            }
          }
        ]
      }
    },
    {
      "name": "Tokenomics",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "allocationLpPercent",
            "type": "u16"
          },
          {
            "name": "allocationFundersPercent",
            "type": "u16"
          },
          {
            "name": "allocationTreasuryPercent",
            "type": "u16"
          },
          {
            "name": "allocationPercent",
            "type": {
              "vec": "u16"
            }
          },
          {
            "name": "allocationName",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "allocationWallet",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "kycNetworkKey",
            "type": "publicKey"
          },
          {
            "name": "crankRewardBps",
            "type": "u16"
          },
          {
            "name": "defundFee",
            "type": "u16"
          },
          {
            "name": "targetRaise",
            "type": "u64"
          },
          {
            "name": "multiplier",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "hours",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "canDefund",
            "type": "bool"
          },
          {
            "name": "hasExpirationDate",
            "type": "bool"
          },
          {
            "name": "hourDuration",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "SwapParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amountIn",
            "docs": [
              "exact input amount:",
              "- If Buy  => lamports the user is spending",
              "- If Sell => tokens the user is selling (in its smallest decimal units)"
            ],
            "type": "u64"
          },
          {
            "name": "amountOut",
            "docs": [
              "The user's expected output for slippage-check",
              "- If Buy  => tokens (in smallest decimal units)",
              "- If Sell => lamports"
            ],
            "type": "u64"
          },
          {
            "name": "slippage",
            "docs": [
              "Slippage in bps, e.g. 100 => 1%"
            ],
            "type": "u16"
          },
          {
            "name": "direction",
            "docs": [
              "Buy or Sell"
            ],
            "type": {
              "defined": "SwapDirection"
            }
          }
        ]
      }
    },
    {
      "name": "TokenData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "decimals",
            "type": "u8"
          },
          {
            "name": "supply",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "MyError",
      "docs": [
        "A small enum to store either a BondingCurvePool or a Pool."
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "InsufficientFunds"
          },
          {
            "name": "LamportTransferFailed"
          }
        ]
      }
    },
    {
      "name": "MyError",
      "docs": [
        "A small enum to store either a BondingCurvePool or a Pool."
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "InsufficientFunds"
          },
          {
            "name": "LamportTransferFailed"
          }
        ]
      }
    },
    {
      "name": "AccountsType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "TransferHookA"
          },
          {
            "name": "TransferHookB"
          },
          {
            "name": "TransferHookReward"
          },
          {
            "name": "TransferHookInput"
          },
          {
            "name": "TransferHookIntermediate"
          },
          {
            "name": "TransferHookOutput"
          },
          {
            "name": "SupplementalTickArrays"
          },
          {
            "name": "SupplementalTickArraysOne"
          },
          {
            "name": "SupplementalTickArraysTwo"
          }
        ]
      }
    },
    {
      "name": "SwapDirection",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Buy"
          },
          {
            "name": "Sell"
          }
        ]
      }
    },
    {
      "name": "PoolStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Created"
          },
          {
            "name": "Raising"
          },
          {
            "name": "Failed"
          },
          {
            "name": "FundsTransfered"
          },
          {
            "name": "PositionOpen"
          },
          {
            "name": "Completed"
          }
        ]
      }
    },
    {
      "name": "PoolType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Orca"
          },
          {
            "name": "Raydium"
          }
        ]
      }
    },
    {
      "name": "RaiseType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "FairLaunch"
          },
          {
            "name": "BondingCurve"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NotSuperAdmin",
      "msg": "Only super admin can do this action"
    },
    {
      "code": 6001,
      "name": "NotAdmin",
      "msg": "Only admin can do this action"
    },
    {
      "code": 6002,
      "name": "InvalidTokenMint",
      "msg": "Invalid token mint"
    },
    {
      "code": 6003,
      "name": "PoolAlreadyTransferred",
      "msg": "Pool already transferred token mint"
    },
    {
      "code": 6004,
      "name": "InvalidPositionMint",
      "msg": "Invalid position mint"
    },
    {
      "code": 6005,
      "name": "PoolMismatch",
      "msg": "Pool mismatch"
    },
    {
      "code": 6006,
      "name": "PositionMismatch",
      "msg": "Position mismatch"
    },
    {
      "code": 6007,
      "name": "InvalidTokenAccount",
      "msg": "Invalid token account"
    },
    {
      "code": 6008,
      "name": "NoRewardToClaim",
      "msg": "No reward to claim"
    },
    {
      "code": 6009,
      "name": "CrankRewardBpsTooHigh",
      "msg": "Crank BPS too high"
    },
    {
      "code": 6010,
      "name": "Unauthorized",
      "msg": "Unauthorized"
    },
    {
      "code": 6011,
      "name": "PoolClosed",
      "msg": "Pool closed"
    },
    {
      "code": 6012,
      "name": "RaiseCompleted",
      "msg": "Raise completed"
    },
    {
      "code": 6013,
      "name": "ZeroAmount",
      "msg": "Amount can't be zero"
    },
    {
      "code": 6014,
      "name": "InvalidBump",
      "msg": "Invalid bump"
    },
    {
      "code": 6015,
      "name": "SameAdminKey",
      "msg": "Same admin key"
    },
    {
      "code": 6016,
      "name": "InvalidTreasury",
      "msg": "Invalid treasury"
    },
    {
      "code": 6017,
      "name": "AlreadyClaimedRecordNumber",
      "msg": "Already claimed for that record number"
    },
    {
      "code": 6018,
      "name": "InvalidRecordNumber",
      "msg": "Invalid record number"
    },
    {
      "code": 6019,
      "name": "InvalidCranker",
      "msg": "Invalid cranker"
    },
    {
      "code": 6020,
      "name": "MissingMemberAccounts",
      "msg": "Missing member account"
    },
    {
      "code": 6021,
      "name": "InvalidNumberOfRemainingAccounts",
      "msg": "Missing some remaining accounts"
    },
    {
      "code": 6022,
      "name": "InvalidRewardVault",
      "msg": "Invalid reward vault"
    },
    {
      "code": 6023,
      "name": "ClaimInProcess",
      "msg": "Claim in process"
    },
    {
      "code": 6024,
      "name": "AccountNotFound",
      "msg": "Account was not found"
    },
    {
      "code": 6025,
      "name": "InvalidUserAccount",
      "msg": "Invalid user account"
    },
    {
      "code": 6026,
      "name": "DefaultUserAccountCannotClaim",
      "msg": "Default user account cannot claim, only harvest"
    },
    {
      "code": 6027,
      "name": "HarvestUnavailableWithStakingNetwork",
      "msg": "Harvest Unavailable With Staking Network Enabled"
    },
    {
      "code": 6028,
      "name": "InvalidPoolForUserAccount",
      "msg": "Invalid pool for user account"
    },
    {
      "code": 6029,
      "name": "InvalidTokenAccountOwner",
      "msg": "Invalid royalty token account"
    },
    {
      "code": 6030,
      "name": "NoRoyaltiesEnabled",
      "msg": "Royalties are not enabled for this user"
    },
    {
      "code": 6031,
      "name": "RoyaltyPercentageZero",
      "msg": "Royalty percentage is set to zero"
    },
    {
      "code": 6032,
      "name": "CannotClaimOwnRoyalty",
      "msg": "Cannot claim own royalty"
    },
    {
      "code": 6033,
      "name": "MissingRoyaltyTokenAccounts",
      "msg": "Missing royalty token accounts"
    },
    {
      "code": 6034,
      "name": "InvalidRoyaltyPercent",
      "msg": "Invalid royalty percent; must be between 0 and 100"
    },
    {
      "code": 6035,
      "name": "UserAlreadyInLookupTable",
      "msg": "User account already exists in the lookup table."
    },
    {
      "code": 6036,
      "name": "UserNotFoundInLookupTable",
      "msg": "User account not found in the lookup table."
    },
    {
      "code": 6037,
      "name": "InvalidFallbackLookupTable",
      "msg": "Invalid fallback lookup table."
    },
    {
      "code": 6038,
      "name": "InvalidCurrentLookupTable",
      "msg": "Invalid current lookup table."
    },
    {
      "code": 6039,
      "name": "InvalidLookupTable",
      "msg": "Invalid user account lookup table."
    },
    {
      "code": 6040,
      "name": "InvalidLookupTableManager",
      "msg": "Invalid user account lookup table manager."
    },
    {
      "code": 6041,
      "name": "InvalidPoolClaimableLookupTable",
      "msg": "Invalid pool claimable lookup table."
    },
    {
      "code": 6042,
      "name": "InvalidPoolVestingTable",
      "msg": "Invalid pool vesting table."
    },
    {
      "code": 6043,
      "name": "InvalidPoolClaimableLookupTableManager",
      "msg": "Invalid pool claimable lookup table manager."
    },
    {
      "code": 6044,
      "name": "IncorrectOwner",
      "msg": "The program is not the owner of the PDA account."
    },
    {
      "code": 6045,
      "name": "AccountDataBorrowFailed",
      "msg": "Failed to borrow account data."
    },
    {
      "code": 6046,
      "name": "MissingDefaultUserAccount",
      "msg": "Missing default user account"
    },
    {
      "code": 6047,
      "name": "Overflow",
      "msg": "You have invested too much sir."
    },
    {
      "code": 6048,
      "name": "InvalidHours",
      "msg": "You have selected a vestion option that does not exist"
    },
    {
      "code": 6049,
      "name": "TargetRaiseReached",
      "msg": "The target raise was reached, you cannot defund now."
    },
    {
      "code": 6050,
      "name": "InsufficientFunds",
      "msg": "Your balance is insufficient for this defund."
    },
    {
      "code": 6051,
      "name": "CannotDefund",
      "msg": "Your cannot defund at this time."
    },
    {
      "code": 6052,
      "name": "InvalidTotalPercent",
      "msg": "The total allocation percentages must equal 100."
    },
    {
      "code": 6053,
      "name": "InvalidPoolTokenAccountOwner",
      "msg": "Invalid pool token account"
    },
    {
      "code": 6054,
      "name": "CannotUpdateTokenomics",
      "msg": "Cannot update tokenomics."
    },
    {
      "code": 6055,
      "name": "MismatchedAllocationLength",
      "msg": "Allocation percent, name, and wallet vectors must have the same length."
    },
    {
      "code": 6056,
      "name": "ExceededMaxAllocations",
      "msg": "The number of allocations exceeds the maximum allowed."
    },
    {
      "code": 6057,
      "name": "LowLpPercent",
      "msg": "The LP allocation percentage must be greater than 5%."
    },
    {
      "code": 6058,
      "name": "LowFundersPercent",
      "msg": "The funders allocation percentage must be greater than 5%."
    },
    {
      "code": 6059,
      "name": "DuplicateWalletFound",
      "msg": "Duplicate allocation wallets are not allowed"
    },
    {
      "code": 6060,
      "name": "HoursEmpty",
      "msg": "Hours vector is empty."
    },
    {
      "code": 6061,
      "name": "MultiplierEmpty",
      "msg": "Multiplier vector is empty."
    },
    {
      "code": 6062,
      "name": "HoursExceedMaxVestingOptions",
      "msg": "Hours vector exceeds the maximum allowed vesting options."
    },
    {
      "code": 6063,
      "name": "MultiplierExceedMaxVestingOptions",
      "msg": "Multiplier vector exceeds the maximum allowed vesting options."
    },
    {
      "code": 6064,
      "name": "HoursMultiplierLengthMismatch",
      "msg": "Hours and multiplier vectors must have the same length."
    },
    {
      "code": 6065,
      "name": "FirstMultiplierNotOne",
      "msg": "The first multiplier must be equal to 1.00."
    },
    {
      "code": 6066,
      "name": "HoursNotAscendingOrder",
      "msg": "Hours are not in ascending order."
    },
    {
      "code": 6067,
      "name": "MultiplierNotAscendingOrder",
      "msg": "Multiplier is not in ascending order."
    },
    {
      "code": 6068,
      "name": "CanDefundMustBeTrueIfNoExpiration",
      "msg": "If there is no expiration date, can_defund must be true."
    },
    {
      "code": 6069,
      "name": "HourDurationMustBeZeroIfNoExpiration",
      "msg": "If there is no expiration date, hour_duration must be 0."
    },
    {
      "code": 6070,
      "name": "HourDurationMustBeGreaterThanOneIfHasExpiration",
      "msg": "If there is an expiration date, hour_duration must be greater than 1."
    },
    {
      "code": 6071,
      "name": "NoExpirationDate",
      "msg": "Pool does not have an expiration date set."
    },
    {
      "code": 6072,
      "name": "TargetRaiseMet",
      "msg": "The total raised amount is greater than or equal to the target raise."
    },
    {
      "code": 6073,
      "name": "PoolNotRaising",
      "msg": "The pool is not in the Raising status."
    },
    {
      "code": 6074,
      "name": "PoolNotExpired",
      "msg": "The pool has not yet reached its expiration timestamp."
    },
    {
      "code": 6075,
      "name": "InvalidInitialVl",
      "msg": "The initial virtual liquidity must be greater than 0"
    },
    {
      "code": 6076,
      "name": "InvalidCurveConstant",
      "msg": "The curve constant must be greater than 0"
    },
    {
      "code": 6077,
      "name": "CurveConstantTooHigh",
      "msg": "The curve constant is too high"
    },
    {
      "code": 6078,
      "name": "CalculationOverflow",
      "msg": "Calculation overflow occurred during processing"
    },
    {
      "code": 6079,
      "name": "ExceededMaxPrice",
      "msg": "The price exceeds the maximum allowed limit for this transaction"
    },
    {
      "code": 6080,
      "name": "SlippageExceeded",
      "msg": "The provided slippage tolerance was exceeded"
    },
    {
      "code": 6081,
      "name": "InvalidStakingNetworkPDA",
      "msg": "Invalid Staking Network PDA"
    },
    {
      "code": 6082,
      "name": "UnstakeNotAllowed",
      "msg": "Your staking cycle is still active, wait for your 7 day unstaking window to begin."
    },
    {
      "code": 6083,
      "name": "InsufficientStakedTokens",
      "msg": "You are trying to unstake tokens you don't have."
    },
    {
      "code": 6084,
      "name": "ClaimCooldown",
      "msg": "Claim not allowed yet. Please wait for the cooldown period."
    },
    {
      "code": 6085,
      "name": "NetworkSyncCooldown",
      "msg": "Network syncing not allowed yet. Please wait for the cooldown period."
    },
    {
      "code": 6086,
      "name": "InsufficientDisposableSol",
      "msg": "Insufficient SOL to syncing the network. Min 1 SOL to pending to sync is required."
    },
    {
      "code": 6087,
      "name": "InvalidStakerAccountManager",
      "msg": "Invalid Staker Account Manager"
    },
    {
      "code": 6088,
      "name": "InvalidStakerAccountPDA",
      "msg": "Invalid Staker Account PDA"
    },
    {
      "code": 6089,
      "name": "InvalidStakerTokenAccountMint",
      "msg": "Invalid Staker Token Account Mint"
    },
    {
      "code": 6090,
      "name": "InvalidStakerTokenAccountOwner",
      "msg": "Invalid Staker Token Account Owner"
    },
    {
      "code": 6091,
      "name": "InvalidStakingNetworkTokenAccount",
      "msg": "Invalid Staking Network Token Account"
    },
    {
      "code": 6092,
      "name": "InvalidStakingNetworkTokenAccountMint",
      "msg": "Invalid Staking Network Token Account Mint"
    },
    {
      "code": 6093,
      "name": "InvalidStakingNetworkTokenAccountOwner",
      "msg": "Invalid Staking Network Token Account Owner"
    },
    {
      "code": 6094,
      "name": "InvalidStakerStakingTokenAccountMint",
      "msg": "Invalid Staker Staking Token Account Mint"
    },
    {
      "code": 6095,
      "name": "InvalidNetworkStakingTokenAccountOwner",
      "msg": "Invalid Network Staking Token Account Owner"
    },
    {
      "code": 6096,
      "name": "InvalidNetworkStakingTokenAccountMint",
      "msg": "Invalid Network Staking Token Account Mint"
    },
    {
      "code": 6097,
      "name": "InvalidStakerStakingTokenAccountOwner",
      "msg": "Invalid Staker Staking Token Account Owner"
    },
    {
      "code": 6098,
      "name": "NoTokensStaked",
      "msg": "Cannot sync with 0 tokens staked"
    },
    {
      "code": 6099,
      "name": "AdminNotCreator",
      "msg": "Admin and creator must be the same."
    },
    {
      "code": 6100,
      "name": "InvalidPoolsLookupManagerOwner",
      "msg": "Pools Lookup Manager account is not owned by the program."
    },
    {
      "code": 6101,
      "name": "InvalidLookupTableOwner",
      "msg": "Lookup Table account is not owned by the program."
    },
    {
      "code": 6102,
      "name": "AuthorityNotCreator",
      "msg": "Authority and creator must be the same."
    },
    {
      "code": 6103,
      "name": "InvalidPoolOwner",
      "msg": "Pool must be owned by the program."
    },
    {
      "code": 6104,
      "name": "InvalidTokenAMint",
      "msg": "Invalid Token A Mint."
    },
    {
      "code": 6105,
      "name": "InvalidTokenBMint",
      "msg": "Invalid Token B Mint."
    },
    {
      "code": 6106,
      "name": "InvalidTreasuryOwner",
      "msg": "The Treasury account must be owned by the program."
    },
    {
      "code": 6107,
      "name": "InvalidURI",
      "msg": "Invalid URI: URI must be a non-empty valid URL starting with http."
    },
    {
      "code": 6108,
      "name": "InvalidName",
      "msg": "Invalid name: Name must be non-empty and no more than 50 characters."
    },
    {
      "code": 6109,
      "name": "InvalidSymbol",
      "msg": "Invalid symbol: Symbol must be non-empty and no more than 5 characters."
    },
    {
      "code": 6110,
      "name": "InvalidDecimals",
      "msg": "Invalid decimals: Decimals must be between 0 and 9."
    },
    {
      "code": 6111,
      "name": "InvalidSupply",
      "msg": "Invalid supply: Supply must be between 100,000 and 100,000,000,000."
    },
    {
      "code": 6112,
      "name": "InvalidUserAccountOwner",
      "msg": "User account must be owned by the program."
    },
    {
      "code": 6113,
      "name": "InvalidUserPoolsLookupManagerOwner",
      "msg": "User pools lookup manager must be owned by the program."
    },
    {
      "code": 6114,
      "name": "InvalidLookupManagerOwner",
      "msg": "Lookup manager must be owned by the program."
    },
    {
      "code": 6115,
      "name": "InvalidCurrentLookupTableOwner",
      "msg": "Current lookup table must be owned by the program."
    },
    {
      "code": 6116,
      "name": "InvalidStakingNetworkOwner",
      "msg": "Staking network must be owned by the program."
    },
    {
      "code": 6117,
      "name": "InvalidStakingNetworkSyncAccountOwner",
      "msg": "Staking network sync account must be owned by the program."
    },
    {
      "code": 6118,
      "name": "KYCVerifictionFailed",
      "msg": "KYC verifiction failed."
    },
    {
      "code": 6119,
      "name": "DeserializationFailed",
      "msg": "Failed deserialization of the pool"
    },
    {
      "code": 6120,
      "name": "InvalidPoolType",
      "msg": "Invalid pool type"
    },
    {
      "code": 6121,
      "name": "InvalidTickArrayWhirlpool",
      "msg": "Invalid TickArray Whirlpool."
    }
  ]
};

export const IDL: Gofundmeme = {
  "version": "0.1.0",
  "name": "gofundmeme",
  "instructions": [
    {
      "name": "initPool",
      "accounts": [
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenAMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenBMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lookupManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lookupTable",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolsLookupManager",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "token",
          "type": {
            "defined": "TokenData"
          }
        }
      ]
    },
    {
      "name": "setTokenomicAndCreateOrcaPool",
      "accounts": [
        {
          "name": "creator",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpoolsConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeTier",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMintA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMintB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tokenomics",
          "type": {
            "defined": "Tokenomics"
          }
        }
      ]
    },
    {
      "name": "initBondingCurvePool",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenAMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenBMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasuryTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingNetworkSyncAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "token",
          "type": {
            "defined": "TokenData"
          }
        },
        {
          "name": "tokenomics",
          "type": {
            "defined": "BondingCurveTokenomics"
          }
        },
        {
          "name": "amountIn",
          "type": "u64"
        }
      ]
    },
    {
      "name": "swap",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasuryTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingNetworkSyncAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gatewayToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPoolsLookupManager",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "swapParams",
          "type": {
            "defined": "SwapParams"
          }
        }
      ]
    },
    {
      "name": "endPool",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initProgramTables",
      "accounts": [
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "superAdmin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "poolsLookupManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolsLookupTable",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "launchedPoolsLookupManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "launchedPoolsLookupTable",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updatePoolAdmin",
      "accounts": [
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "superAdmin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "newAdmin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setupVesting",
      "accounts": [
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "launchedPoolsLookupManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolVestingTable",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "treasuryTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "harvest",
      "accounts": [
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "crankerTokenAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "crankerTokenAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingNetworkWsolAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network's WSOL account."
          ]
        },
        {
          "name": "poolStakingNetwork",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "investInPool",
      "accounts": [
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userWallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lookupManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPoolsLookupManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "currentLookupTable",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fallbackLookupTable",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingNetworkSyncAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "hours",
          "type": "u64"
        }
      ]
    },
    {
      "name": "defundFromPool",
      "accounts": [
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userWallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPoolsLookupManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingNetworkSyncAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "hours",
          "type": "u64"
        }
      ]
    },
    {
      "name": "defundAllFromPool",
      "accounts": [
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userWallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPoolsLookupManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingNetworkSyncAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "multiClaim",
      "accounts": [
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token program used for transferring tokens."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program for basic Solana operations."
          ]
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer initiating the transaction."
          ]
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The pool from which the rewards are claimed.",
            "This pool is identified by a unique set of seeds derived from its token mints."
          ]
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The user account for whom the claim is made.",
            "This account is associated with the pool and holds information about the user's investments."
          ]
        },
        {
          "name": "poolTokenAccountA",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The pool's token accounts from which rewards will be distributed."
          ]
        },
        {
          "name": "poolTokenAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccountMintA",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The user's token accounts where the rewards will be deposited."
          ]
        },
        {
          "name": "userTokenAccountMintB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authorityTokenAccountA",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "Optional: Authority token accounts for royalties",
            "If royalties are requested, these accounts will receive the royalty portion."
          ]
        },
        {
          "name": "authorityTokenAccountB",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        }
      ],
      "args": [
        {
          "name": "requestRoyalty",
          "type": "bool"
        }
      ]
    },
    {
      "name": "vestingClaim",
      "accounts": [
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token program used for transferring tokens."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program for basic Solana operations."
          ]
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer initiating the transaction."
          ]
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The pool from which the rewards are claimed.",
            "This pool is identified by a unique set of seeds derived from its token mints."
          ]
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "The user account for whom the claim is made.",
            "This account is associated with the pool and holds information about the user's investments.",
            "Optional: If not provided, vesting checks will be skipped."
          ]
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The pool's token accounts from which rewards will be distributed."
          ]
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The user's token accounts where the rewards will be deposited.",
            "CHECK"
          ]
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "poolVestingTable",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updateUserAccount",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The owner who has control over the user account."
          ]
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The user account that will be updated."
          ]
        },
        {
          "name": "lookupManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lookupTable",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "hasRoyalty",
          "type": "bool"
        },
        {
          "name": "royaltyPercent",
          "type": "u8"
        }
      ]
    },
    {
      "name": "initTicksAndCreatePosition",
      "accounts": [
        {
          "name": "funder",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "positionTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "poolPositionTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMetadataAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "metadataUpdateAuth",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "solAddress",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "OpenPositionWithMetadataBumps"
          }
        }
      ]
    },
    {
      "name": "refundFromPool",
      "accounts": [
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userWallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPoolsLookupManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initStakingNetwork",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The owner who has control over the user account."
          ]
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network account, derived using seeds."
          ]
        },
        {
          "name": "stakingNetworkTreasuryAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "stakingNetworkWsolAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network's WSOL account."
          ]
        },
        {
          "name": "stakingNetworkSyncAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "solAddress",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "gfmMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The mint account for the GFM token.",
            "CHECK"
          ]
        },
        {
          "name": "gfmMetadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "gfmTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "sgfmMint",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The mint account for the SGFM token."
          ]
        },
        {
          "name": "sgfmMetadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "sgfmTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The associated token program account."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token program account."
          ]
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "syncStakingNetwork",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The owner who has control over the user account."
          ]
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network account, derived using seeds."
          ]
        },
        {
          "name": "stakingTreasuryAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "stakingNetworkWsolAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network's WSOL account."
          ]
        },
        {
          "name": "stakingNetworkSyncAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solAddress",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "gfmFoundationAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The mint account for the GFM token."
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The associated token program account."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token program account."
          ]
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createStakerAccount",
      "accounts": [
        {
          "name": "staker",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The owner who will control the staker account."
          ]
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network account, derived using seeds."
          ]
        },
        {
          "name": "stakerAccountManager",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staker account to be initialized."
          ]
        },
        {
          "name": "sgfmMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The mint account for the SGFM token."
          ]
        },
        {
          "name": "stakerSgfmTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staker's SGFM token account."
          ]
        },
        {
          "name": "stakerRecord",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network account, derived using seeds."
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The associated token program account."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token program account."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program."
          ]
        }
      ],
      "args": []
    },
    {
      "name": "stake",
      "accounts": [
        {
          "name": "staker",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The owner who has control over the user account."
          ]
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network account, derived using seeds."
          ]
        },
        {
          "name": "stakerAccountManager",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staker account to be initialized."
          ]
        },
        {
          "name": "stakerAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network account, derived using seeds."
          ]
        },
        {
          "name": "stakerTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The token account of the staker where rewards are collected."
          ]
        },
        {
          "name": "stakingNetworkTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The mint account for the GFM token."
          ]
        },
        {
          "name": "sgfmMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The mint account for the SGFM token."
          ]
        },
        {
          "name": "stakerSgfmTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staker's SGFM token account."
          ]
        },
        {
          "name": "networkSgfmTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network's SGFM token account."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token program account."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program account."
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The associated token program account."
          ]
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tokenAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "unstake",
      "accounts": [
        {
          "name": "staker",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The owner who has control over the user account."
          ]
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network account, derived using seeds."
          ]
        },
        {
          "name": "stakingTreasuryAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "stakerAccountManager",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staker account to be validated and updated."
          ]
        },
        {
          "name": "stakerAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staker account to be validated and updated."
          ]
        },
        {
          "name": "stakerSgfmTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staker's SGFM token account."
          ]
        },
        {
          "name": "networkSgfmTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network's SGFM token account."
          ]
        },
        {
          "name": "stakerTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The token account of the staker where rewards and unstaked tokens are collected."
          ]
        },
        {
          "name": "stakingNetworkTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network's token account for this staker, owned by the staker account."
          ]
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The mint account for the GFM token."
          ]
        },
        {
          "name": "sgfmMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The mint account for the SGFM token."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token program account."
          ]
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "stakerClaim",
      "accounts": [
        {
          "name": "staker",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The owner who has control over the user account."
          ]
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network account, derived using seeds."
          ]
        },
        {
          "name": "stakingTreasuryAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "stakerAccountManager",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staker account to be validated and updated."
          ]
        },
        {
          "name": "stakerAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staker account to be validated and updated."
          ]
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "orcaSwap",
      "accounts": [
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgramA",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tokenProgramB",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "memoProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMintA",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tokenMintB",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray0",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tickArray1",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tickArray2",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "oracle",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "while not mut in main impl, marked mut here to avoid a breaking change upon upgrade"
          ]
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingNetworkWsolAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network's WSOL account."
          ]
        },
        {
          "name": "stakingNetworkSyncAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "OrcaSwapParams"
          }
        }
      ]
    },
    {
      "name": "initTicks",
      "accounts": [
        {
          "name": "funder",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "positionTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "poolPositionTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMetadataAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "metadataUpdateAuth",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "solAddress",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "OpenPositionWithMetadataBumps"
          }
        }
      ]
    },
    {
      "name": "createPosition",
      "accounts": [
        {
          "name": "funder",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "positionTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "poolPositionTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMetadataAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "metadataUpdateAuth",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "solAddress",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "OpenPositionWithMetadataBumps"
          }
        }
      ]
    },
    {
      "name": "allocationClaim",
      "accounts": [
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token program used for transferring tokens."
          ]
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The signer (authority) receiving the allocation."
          ]
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The pool from which the allocation is claimed.",
            "This pool is identified by a unique set of seeds derived from its token mints."
          ]
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The pool's token account holding the tokens to be distributed."
          ]
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The authority's token account where the allocation will be deposited.",
            "If not initialized, it will be created via Associated Token Program."
          ]
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The mint of the token being allocated."
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The Associated Token Program to create a token account if the user doesn't already have one."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program for basic Solana operations."
          ]
        }
      ],
      "args": []
    },
    {
      "name": "bondingCurveFundsTransfer",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "creator",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wrappedSolAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solAddress",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "token0Mint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Token_0 mint, the key must smaller then token_1 mint."
          ]
        },
        {
          "name": "token1Mint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Token_1 mint, the key must grater then token_0 mint."
          ]
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network account, derived using seeds."
          ]
        },
        {
          "name": "stakingNetworkSyncAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Program to create mint account and mint tokens"
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Program to create an ATA for receiving position NFT"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "bondingCurveCreateMarket",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "wrappedSolAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solAddress",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "cpSwapProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammConfig",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Which config the pool belongs to."
          ]
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "token0Mint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Token_0 mint, the key must smaller then token_1 mint."
          ]
        },
        {
          "name": "token1Mint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Token_1 mint, the key must grater then token_0 mint."
          ]
        },
        {
          "name": "lpMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creatorToken0",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "creatorToken1",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "creator token1 account"
          ]
        },
        {
          "name": "treasuryToken1",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "creator token1 account"
          ]
        },
        {
          "name": "creatorLpToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "token0Vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "token1Vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "createPoolFee",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "create pool fee account"
          ]
        },
        {
          "name": "observationState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Program to create mint account and mint tokens"
          ]
        },
        {
          "name": "poolPositionTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Program to create an ATA for receiving position NFT"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "bondingCurveLockLp",
      "accounts": [
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creatorToken0",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "solAddress",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "treasuryTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "cpSwapProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "token0Mint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Token_0 mint, the key must smaller then token_1 mint.",
            "CHECK"
          ]
        },
        {
          "name": "token1Mint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Token_1 mint, the key must grater then token_0 mint.",
            "CHECK"
          ]
        },
        {
          "name": "ammConfig",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Which config the pool belongs to."
          ]
        },
        {
          "name": "poolState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lockLpProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lockLpProgramAuth",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lockPda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userLpVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lockLpVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "lpMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolLpToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "token0Vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "token1Vault",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "bondingCurveHarvest",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lockLpProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "feeNftAccount",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Fee token account"
          ]
        },
        {
          "name": "lockedLiquidity",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Store the locked the information of liquidity",
            "CHECK"
          ]
        },
        {
          "name": "cpmmProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "cpAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lpMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "lp mint",
            "address = pool_state.lp_mint"
          ]
        },
        {
          "name": "recipientToken0Account",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The token account for receive token_0"
          ]
        },
        {
          "name": "recipientToken1Account",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The token account for receive token_1"
          ]
        },
        {
          "name": "token0Vault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The address that holds pool tokens for token_0",
            "address = pool_state.token_0_vault"
          ]
        },
        {
          "name": "token1Vault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The address that holds pool tokens for token_1",
            "address = pool_state.token_1_vault"
          ]
        },
        {
          "name": "vault0Mint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The mint of token_0 vault"
          ]
        },
        {
          "name": "vault1Mint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The mint of token_1 vault"
          ]
        },
        {
          "name": "lockedLpVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "locked lp token account"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "token Program"
          ]
        },
        {
          "name": "tokenProgram2022",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Token program 2022"
          ]
        },
        {
          "name": "memoProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "memo program"
          ]
        },
        {
          "name": "crankerTokenAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "crankerTokenAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingNetworkWsolAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network's WSOL account."
          ]
        }
      ],
      "args": [
        {
          "name": "feeLpAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initBcPoolStakingNetwork",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The owner who has control over the user account."
          ]
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolStakingNetwork",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network account, derived using seeds."
          ]
        },
        {
          "name": "stakingNetworkTokenAccountA",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The pool's token accounts from which rewards will be distributed.",
            "The staking network's WSOL (Token A) account.",
            "CHECK"
          ]
        },
        {
          "name": "stakingNetworkTokenAccountB",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network's Token B account.",
            "CHECK"
          ]
        },
        {
          "name": "mintA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintB",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The mint account for the GFM token.",
            "CHECK"
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The associated token program account."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token program account."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initPoolStakingNetwork",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The owner who has control over the user account."
          ]
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolStakingNetwork",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network account, derived using seeds."
          ]
        },
        {
          "name": "stakingNetworkTokenAccountA",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The pool's token accounts from which rewards will be distributed.",
            "The staking network's WSOL (Token A) account.",
            "CHECK"
          ]
        },
        {
          "name": "stakingNetworkTokenAccountB",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network's Token B account.",
            "CHECK"
          ]
        },
        {
          "name": "mintA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintB",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The mint account for the GFM token.",
            "CHECK"
          ]
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "stakingMetadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The associated token program account."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token program account."
          ]
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "poolStake",
      "accounts": [
        {
          "name": "staker",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The owner who has control over the user account."
          ]
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolStakingNetwork",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network account, derived using seeds."
          ]
        },
        {
          "name": "networkTokenAccountA",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The pool's token accounts from which rewards will be distributed."
          ]
        },
        {
          "name": "networkTokenAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakerAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network account, derived using seeds."
          ]
        },
        {
          "name": "stakerTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The token account of the staker where rewards are collected.",
            "CHECK"
          ]
        },
        {
          "name": "stakerAccountEscrowB",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staker’s WSOL (Token A) account."
          ]
        },
        {
          "name": "mintA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintB",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The mint account for the GFM token."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token program account."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program account."
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The associated token program account."
          ]
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tokenAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "poolStakerClaim",
      "accounts": [
        {
          "name": "staker",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The staker who is claiming rewards."
          ]
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "poolStakingNetwork",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The global staking network account."
          ]
        },
        {
          "name": "stakingNetworkTokenAccountA",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network's WSOL (Token A) account."
          ]
        },
        {
          "name": "stakingNetworkTokenAccountB",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network's Token B account."
          ]
        },
        {
          "name": "stakerAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staker’s individual staking account."
          ]
        },
        {
          "name": "mintA",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The mint account for the GFM token."
          ]
        },
        {
          "name": "mintB",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The mint account for the GFM token."
          ]
        },
        {
          "name": "stakerTokenAccountA",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staker’s WSOL (Token A) account."
          ]
        },
        {
          "name": "stakerTokenAccountB",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staker’s WSOL (Token A) account."
          ]
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program account."
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The associated token program account."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token program."
          ]
        }
      ],
      "args": []
    },
    {
      "name": "poolUnstake",
      "accounts": [
        {
          "name": "staker",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The staker who owns the staking account."
          ]
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolStakingNetwork",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network account, derived using seeds."
          ]
        },
        {
          "name": "stakerAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staker's staking account (will be closed upon unstaking)."
          ]
        },
        {
          "name": "stakerAccountEscrowB",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staker’s WSOL (Token A) account."
          ]
        },
        {
          "name": "stakerTokenAccountB",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staker’s Token B account."
          ]
        },
        {
          "name": "mintA",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The mint account for WSOL (Token A)."
          ]
        },
        {
          "name": "mintB",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The mint account for Token B."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token program."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The system program."
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The associated token program."
          ]
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tokenUnstakeAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "syncOrcaPoolStakingNetwork",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The owner who has control over the user account."
          ]
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolStakingNetwork",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network account, derived using seeds."
          ]
        },
        {
          "name": "networkTokenAccountA",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The pool's token accounts from which rewards will be distributed.",
            "CHECK"
          ]
        },
        {
          "name": "networkTokenAccountB",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "mintA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintB",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The mint account for the GFM token."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token program account."
          ]
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "crankerTokenAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "crankerTokenAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingNetworkWsolAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network's WSOL account."
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The associated token program account."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "syncRaydiumPoolStakingNetwork",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The owner who has control over the user account."
          ]
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolStakingNetwork",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network account, derived using seeds."
          ]
        },
        {
          "name": "networkTokenAccountA",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The pool's token accounts from which rewards will be distributed.",
            "CHECK"
          ]
        },
        {
          "name": "networkTokenAccountB",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "mintA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintB",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The mint account for the GFM token."
          ]
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lockLpProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "feeNftAccount",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Fee token account",
            "CHECK"
          ]
        },
        {
          "name": "lockedLiquidity",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Store the locked the information of liquidity",
            "CHECK"
          ]
        },
        {
          "name": "cpmmProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "cpAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lpMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "lp mint",
            "address = pool_state.lp_mint",
            "CHECK"
          ]
        },
        {
          "name": "token0Vault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The address that holds pool tokens for token_0",
            "address = pool_state.token_0_vault",
            "CHECK"
          ]
        },
        {
          "name": "token1Vault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The address that holds pool tokens for token_1",
            "address = pool_state.token_1_vault",
            "CHECK"
          ]
        },
        {
          "name": "lockedLpVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "locked lp token account",
            "CHECK"
          ]
        },
        {
          "name": "stakingNetwork",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingNetworkWsolAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The staking network's WSOL account.",
            "CHECK"
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The associated token program account."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram2022",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Token program 2022"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token program account."
          ]
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "memoProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "memo program"
          ]
        }
      ],
      "args": [
        {
          "name": "feeLpAmount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "pool",
      "docs": [
        "PDA [\"pool_\", token_a_mint, token_b_mint]"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "crankRewardBps",
            "type": "u16"
          },
          {
            "name": "defundFee",
            "type": "u16"
          },
          {
            "name": "totalRaised",
            "type": "u64"
          },
          {
            "name": "targetRaise",
            "type": "u64"
          },
          {
            "name": "totalSupply",
            "type": "u64"
          },
          {
            "name": "claimableAmountMintA",
            "type": "u64"
          },
          {
            "name": "claimableAmountMintB",
            "type": "u64"
          },
          {
            "name": "claimedAmountMintA",
            "type": "u64"
          },
          {
            "name": "claimedAmountMintB",
            "type": "u64"
          },
          {
            "name": "tokenAMint",
            "type": "publicKey"
          },
          {
            "name": "tokenBMint",
            "type": "publicKey"
          },
          {
            "name": "currentRecordNumber",
            "type": "u64"
          },
          {
            "name": "whirlpool",
            "type": "publicKey"
          },
          {
            "name": "position",
            "type": "publicKey"
          },
          {
            "name": "kycNetworkKey",
            "type": "publicKey"
          },
          {
            "name": "poolType",
            "type": {
              "defined": "PoolType"
            }
          },
          {
            "name": "raiseType",
            "type": {
              "defined": "RaiseType"
            }
          },
          {
            "name": "poolStatus",
            "type": {
              "defined": "PoolStatus"
            }
          },
          {
            "name": "multiplier",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "hours",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "raised",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "allocationLpPercent",
            "type": "u16"
          },
          {
            "name": "allocationFundersPercent",
            "type": "u16"
          },
          {
            "name": "allocationTreasuryPercent",
            "type": "u16"
          },
          {
            "name": "allocationPercent",
            "type": {
              "vec": "u16"
            }
          },
          {
            "name": "allocationName",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "allocationWallet",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "allocationClaimed",
            "type": {
              "vec": "bool"
            }
          },
          {
            "name": "canDefund",
            "type": "bool"
          },
          {
            "name": "hasExpirationDate",
            "type": "bool"
          },
          {
            "name": "expirationTimestamp",
            "type": "u64"
          },
          {
            "name": "currentSol",
            "type": "u64"
          },
          {
            "name": "curveConstant",
            "type": "f64"
          },
          {
            "name": "tokenBalance",
            "type": "u64"
          },
          {
            "name": "initialTokens",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "bondingCurvePool",
      "docs": [
        "PDA [\"pool_\", token_a_mint, token_b_mint]"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "crankRewardBps",
            "type": "u16"
          },
          {
            "name": "defundFee",
            "type": "u16"
          },
          {
            "name": "totalRaised",
            "type": "u64"
          },
          {
            "name": "targetRaise",
            "type": "u64"
          },
          {
            "name": "totalSupply",
            "type": "u64"
          },
          {
            "name": "claimableAmountMintA",
            "type": "u64"
          },
          {
            "name": "claimableAmountMintB",
            "type": "u64"
          },
          {
            "name": "claimedAmountMintA",
            "type": "u64"
          },
          {
            "name": "claimedAmountMintB",
            "type": "u64"
          },
          {
            "name": "tokenAMint",
            "type": "publicKey"
          },
          {
            "name": "tokenBMint",
            "type": "publicKey"
          },
          {
            "name": "currentRecordNumber",
            "type": "u64"
          },
          {
            "name": "whirlpool",
            "type": "publicKey"
          },
          {
            "name": "position",
            "type": "publicKey"
          },
          {
            "name": "kycNetworkKey",
            "type": "publicKey"
          },
          {
            "name": "poolType",
            "type": {
              "defined": "PoolType"
            }
          },
          {
            "name": "raiseType",
            "type": {
              "defined": "RaiseType"
            }
          },
          {
            "name": "poolStatus",
            "type": {
              "defined": "PoolStatus"
            }
          },
          {
            "name": "multiplier",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "hours",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "raised",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "allocationLpPercent",
            "type": "u16"
          },
          {
            "name": "allocationFundersPercent",
            "type": "u16"
          },
          {
            "name": "allocationTreasuryPercent",
            "type": "u16"
          },
          {
            "name": "allocationPercent",
            "type": {
              "vec": "u16"
            }
          },
          {
            "name": "allocationName",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "allocationWallet",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "allocationClaimed",
            "type": {
              "vec": "bool"
            }
          },
          {
            "name": "canDefund",
            "type": "bool"
          },
          {
            "name": "hasExpirationDate",
            "type": "bool"
          },
          {
            "name": "currentSol",
            "type": "u64"
          },
          {
            "name": "curveExponent",
            "type": "f64"
          },
          {
            "name": "curveConstant",
            "type": "f64"
          },
          {
            "name": "tokenBalance",
            "type": "u64"
          },
          {
            "name": "initialTokens",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "userAccount",
      "docs": [
        "PDA [\"user_\", pool pubkey, wallet pubkey]"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "pool",
            "type": "publicKey"
          },
          {
            "name": "claimedAmountMintA",
            "type": "u64"
          },
          {
            "name": "claimedAmountMintB",
            "type": "u64"
          },
          {
            "name": "investedAmount",
            "type": "u64"
          },
          {
            "name": "lastRecordClaimed",
            "type": "u64"
          },
          {
            "name": "inProcess",
            "type": "bool"
          },
          {
            "name": "hasRoyalty",
            "type": "bool"
          },
          {
            "name": "royaltyPercent",
            "type": "u8"
          },
          {
            "name": "lookupTablePda",
            "type": "publicKey"
          },
          {
            "name": "hours",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "invested",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "claimed",
            "type": {
              "vec": "bool"
            }
          }
        ]
      }
    },
    {
      "name": "userAccountLookupTable",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "pool",
            "type": "publicKey"
          },
          {
            "name": "tableId",
            "type": "u32"
          },
          {
            "name": "userAccounts",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "hasRoyalty",
            "type": {
              "vec": "bool"
            }
          },
          {
            "name": "royaltyPercent",
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "userAccountLookupTableManager",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "pool",
            "type": "publicKey"
          },
          {
            "name": "currentTableCount",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "poolsTable",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "tableId",
            "type": "u32"
          },
          {
            "name": "pools",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "tokens",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "poolsTableManager",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "currentTableCount",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "launchedPoolsTable",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "tableId",
            "type": "u32"
          },
          {
            "name": "pools",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "tokens",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "launchedPoolsTableManager",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "currentTableCount",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "userPoolsTable",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "tableId",
            "type": "u32"
          },
          {
            "name": "pools",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "tokens",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "userPoolsTableManager",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "volume",
            "type": "u64"
          },
          {
            "name": "defund",
            "type": "u64"
          },
          {
            "name": "totalPools",
            "type": "u64"
          },
          {
            "name": "currentTableCount",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "poolVestingTable",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "pool",
            "type": "publicKey"
          },
          {
            "name": "claimedAmountMint",
            "type": "u64"
          },
          {
            "name": "hours",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "unlockTimestamp",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "claimableAmountMint",
            "type": {
              "vec": "u64"
            }
          }
        ]
      }
    },
    {
      "name": "gfmStakingNetwork",
      "docs": [
        "* STAKING"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "totalStakedTokens",
            "type": "u64"
          },
          {
            "name": "cumulativeRewardsPerToken",
            "type": "u64"
          },
          {
            "name": "rewardPool",
            "type": "u64"
          },
          {
            "name": "wsolAccount",
            "type": "publicKey"
          },
          {
            "name": "lastNetworkSyncTimestamp",
            "type": "u64"
          },
          {
            "name": "stakersCount",
            "type": "u64"
          },
          {
            "name": "totalRewards",
            "type": "u64"
          },
          {
            "name": "claimedRewards",
            "type": "u64"
          },
          {
            "name": "gfmMintAddress",
            "type": "publicKey"
          },
          {
            "name": "sgfmMintAddress",
            "type": "publicKey"
          },
          {
            "name": "sgfmTokenAccount",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "gfmStakerRecord",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "staker",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "gfmStakerAccountManager",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "claimedRewards",
            "type": "u64"
          },
          {
            "name": "currentRecord",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "gfmStakerAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "staker",
            "type": "publicKey"
          },
          {
            "name": "record",
            "type": "u32"
          },
          {
            "name": "userStakedTokens",
            "type": "u64"
          },
          {
            "name": "claimedRewards",
            "type": "u64"
          },
          {
            "name": "userCumulativeRewardsPerToken",
            "type": "u64"
          },
          {
            "name": "userAccumulatedRewards",
            "type": "u64"
          },
          {
            "name": "stakingTimestamp",
            "type": "u64"
          },
          {
            "name": "lastClaimedTimestamp",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "gfmPoolStakingNetwork",
      "docs": [
        "* Pool STAKING"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "totalStakedTokens",
            "type": "u64"
          },
          {
            "name": "cumulativeRewardsPerTokenA",
            "type": "u128"
          },
          {
            "name": "cumulativeRewardsPerTokenB",
            "type": "u128"
          },
          {
            "name": "rewardPoolA",
            "type": "u128"
          },
          {
            "name": "rewardPoolB",
            "type": "u128"
          },
          {
            "name": "mintAAccount",
            "type": "publicKey"
          },
          {
            "name": "mintBAccount",
            "type": "publicKey"
          },
          {
            "name": "lastNetworkSyncTimestamp",
            "type": "u64"
          },
          {
            "name": "stakersCount",
            "type": "u64"
          },
          {
            "name": "totalRewardsA",
            "type": "u128"
          },
          {
            "name": "totalRewardsB",
            "type": "u128"
          },
          {
            "name": "claimedRewardsA",
            "type": "u128"
          },
          {
            "name": "claimedRewardsB",
            "type": "u128"
          },
          {
            "name": "mintAAddress",
            "type": "publicKey"
          },
          {
            "name": "mintBAddress",
            "type": "publicKey"
          },
          {
            "name": "unstakingCooldownHours",
            "type": "u16"
          },
          {
            "name": "unstakeWindowHours",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "gfmPoolStakerAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "staker",
            "type": "publicKey"
          },
          {
            "name": "userStakedTokens",
            "type": "u64"
          },
          {
            "name": "claimedRewardsA",
            "type": "u128"
          },
          {
            "name": "claimedRewardsB",
            "type": "u128"
          },
          {
            "name": "userCumulativeRewardsPerTokenA",
            "type": "u128"
          },
          {
            "name": "userCumulativeRewardsPerTokenB",
            "type": "u128"
          },
          {
            "name": "userAccumulatedRewardsA",
            "type": "u128"
          },
          {
            "name": "userAccumulatedRewardsB",
            "type": "u128"
          },
          {
            "name": "stakingTimestamp",
            "type": "u64"
          },
          {
            "name": "lastClaimedTimestamp",
            "type": "u64"
          },
          {
            "name": "hasRoyalty",
            "type": "bool"
          },
          {
            "name": "royaltyPercent",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "BondingCurveTokenomics",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "crankRewardBps",
            "type": "u16"
          },
          {
            "name": "targetRaise",
            "type": "u64"
          },
          {
            "name": "curveExponent",
            "type": "f64"
          },
          {
            "name": "curveConstant",
            "type": "f64"
          },
          {
            "name": "allocationTreasuryPercent",
            "type": "u16"
          },
          {
            "name": "allocationPercent",
            "type": {
              "vec": "u16"
            }
          },
          {
            "name": "allocationName",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "allocationWallet",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "kycNetworkKey",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "OpenPositionWithMetadataBumps",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "positionBump",
            "type": "u8"
          },
          {
            "name": "metadataBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "RemainingAccountsSlice",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "accountsType",
            "type": {
              "defined": "AccountsType"
            }
          },
          {
            "name": "length",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "RemainingAccountsInfoInternal",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "slices",
            "type": {
              "vec": {
                "defined": "RemainingAccountsSlice"
              }
            }
          }
        ]
      }
    },
    {
      "name": "OrcaSwapParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "otherAmountThreshold",
            "type": "u64"
          },
          {
            "name": "sqrtPriceLimit",
            "type": "u128"
          },
          {
            "name": "amountSpecifiedIsInput",
            "type": "bool"
          },
          {
            "name": "aToB",
            "type": "bool"
          },
          {
            "name": "remainingAccountsInfo",
            "type": {
              "option": {
                "defined": "RemainingAccountsInfoInternal"
              }
            }
          }
        ]
      }
    },
    {
      "name": "Tokenomics",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "allocationLpPercent",
            "type": "u16"
          },
          {
            "name": "allocationFundersPercent",
            "type": "u16"
          },
          {
            "name": "allocationTreasuryPercent",
            "type": "u16"
          },
          {
            "name": "allocationPercent",
            "type": {
              "vec": "u16"
            }
          },
          {
            "name": "allocationName",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "allocationWallet",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "kycNetworkKey",
            "type": "publicKey"
          },
          {
            "name": "crankRewardBps",
            "type": "u16"
          },
          {
            "name": "defundFee",
            "type": "u16"
          },
          {
            "name": "targetRaise",
            "type": "u64"
          },
          {
            "name": "multiplier",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "hours",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "canDefund",
            "type": "bool"
          },
          {
            "name": "hasExpirationDate",
            "type": "bool"
          },
          {
            "name": "hourDuration",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "SwapParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amountIn",
            "docs": [
              "exact input amount:",
              "- If Buy  => lamports the user is spending",
              "- If Sell => tokens the user is selling (in its smallest decimal units)"
            ],
            "type": "u64"
          },
          {
            "name": "amountOut",
            "docs": [
              "The user's expected output for slippage-check",
              "- If Buy  => tokens (in smallest decimal units)",
              "- If Sell => lamports"
            ],
            "type": "u64"
          },
          {
            "name": "slippage",
            "docs": [
              "Slippage in bps, e.g. 100 => 1%"
            ],
            "type": "u16"
          },
          {
            "name": "direction",
            "docs": [
              "Buy or Sell"
            ],
            "type": {
              "defined": "SwapDirection"
            }
          }
        ]
      }
    },
    {
      "name": "TokenData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "decimals",
            "type": "u8"
          },
          {
            "name": "supply",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "MyError",
      "docs": [
        "A small enum to store either a BondingCurvePool or a Pool."
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "InsufficientFunds"
          },
          {
            "name": "LamportTransferFailed"
          }
        ]
      }
    },
    {
      "name": "MyError",
      "docs": [
        "A small enum to store either a BondingCurvePool or a Pool."
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "InsufficientFunds"
          },
          {
            "name": "LamportTransferFailed"
          }
        ]
      }
    },
    {
      "name": "AccountsType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "TransferHookA"
          },
          {
            "name": "TransferHookB"
          },
          {
            "name": "TransferHookReward"
          },
          {
            "name": "TransferHookInput"
          },
          {
            "name": "TransferHookIntermediate"
          },
          {
            "name": "TransferHookOutput"
          },
          {
            "name": "SupplementalTickArrays"
          },
          {
            "name": "SupplementalTickArraysOne"
          },
          {
            "name": "SupplementalTickArraysTwo"
          }
        ]
      }
    },
    {
      "name": "SwapDirection",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Buy"
          },
          {
            "name": "Sell"
          }
        ]
      }
    },
    {
      "name": "PoolStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Created"
          },
          {
            "name": "Raising"
          },
          {
            "name": "Failed"
          },
          {
            "name": "FundsTransfered"
          },
          {
            "name": "PositionOpen"
          },
          {
            "name": "Completed"
          }
        ]
      }
    },
    {
      "name": "PoolType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Orca"
          },
          {
            "name": "Raydium"
          }
        ]
      }
    },
    {
      "name": "RaiseType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "FairLaunch"
          },
          {
            "name": "BondingCurve"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NotSuperAdmin",
      "msg": "Only super admin can do this action"
    },
    {
      "code": 6001,
      "name": "NotAdmin",
      "msg": "Only admin can do this action"
    },
    {
      "code": 6002,
      "name": "InvalidTokenMint",
      "msg": "Invalid token mint"
    },
    {
      "code": 6003,
      "name": "PoolAlreadyTransferred",
      "msg": "Pool already transferred token mint"
    },
    {
      "code": 6004,
      "name": "InvalidPositionMint",
      "msg": "Invalid position mint"
    },
    {
      "code": 6005,
      "name": "PoolMismatch",
      "msg": "Pool mismatch"
    },
    {
      "code": 6006,
      "name": "PositionMismatch",
      "msg": "Position mismatch"
    },
    {
      "code": 6007,
      "name": "InvalidTokenAccount",
      "msg": "Invalid token account"
    },
    {
      "code": 6008,
      "name": "NoRewardToClaim",
      "msg": "No reward to claim"
    },
    {
      "code": 6009,
      "name": "CrankRewardBpsTooHigh",
      "msg": "Crank BPS too high"
    },
    {
      "code": 6010,
      "name": "Unauthorized",
      "msg": "Unauthorized"
    },
    {
      "code": 6011,
      "name": "PoolClosed",
      "msg": "Pool closed"
    },
    {
      "code": 6012,
      "name": "RaiseCompleted",
      "msg": "Raise completed"
    },
    {
      "code": 6013,
      "name": "ZeroAmount",
      "msg": "Amount can't be zero"
    },
    {
      "code": 6014,
      "name": "InvalidBump",
      "msg": "Invalid bump"
    },
    {
      "code": 6015,
      "name": "SameAdminKey",
      "msg": "Same admin key"
    },
    {
      "code": 6016,
      "name": "InvalidTreasury",
      "msg": "Invalid treasury"
    },
    {
      "code": 6017,
      "name": "AlreadyClaimedRecordNumber",
      "msg": "Already claimed for that record number"
    },
    {
      "code": 6018,
      "name": "InvalidRecordNumber",
      "msg": "Invalid record number"
    },
    {
      "code": 6019,
      "name": "InvalidCranker",
      "msg": "Invalid cranker"
    },
    {
      "code": 6020,
      "name": "MissingMemberAccounts",
      "msg": "Missing member account"
    },
    {
      "code": 6021,
      "name": "InvalidNumberOfRemainingAccounts",
      "msg": "Missing some remaining accounts"
    },
    {
      "code": 6022,
      "name": "InvalidRewardVault",
      "msg": "Invalid reward vault"
    },
    {
      "code": 6023,
      "name": "ClaimInProcess",
      "msg": "Claim in process"
    },
    {
      "code": 6024,
      "name": "AccountNotFound",
      "msg": "Account was not found"
    },
    {
      "code": 6025,
      "name": "InvalidUserAccount",
      "msg": "Invalid user account"
    },
    {
      "code": 6026,
      "name": "DefaultUserAccountCannotClaim",
      "msg": "Default user account cannot claim, only harvest"
    },
    {
      "code": 6027,
      "name": "HarvestUnavailableWithStakingNetwork",
      "msg": "Harvest Unavailable With Staking Network Enabled"
    },
    {
      "code": 6028,
      "name": "InvalidPoolForUserAccount",
      "msg": "Invalid pool for user account"
    },
    {
      "code": 6029,
      "name": "InvalidTokenAccountOwner",
      "msg": "Invalid royalty token account"
    },
    {
      "code": 6030,
      "name": "NoRoyaltiesEnabled",
      "msg": "Royalties are not enabled for this user"
    },
    {
      "code": 6031,
      "name": "RoyaltyPercentageZero",
      "msg": "Royalty percentage is set to zero"
    },
    {
      "code": 6032,
      "name": "CannotClaimOwnRoyalty",
      "msg": "Cannot claim own royalty"
    },
    {
      "code": 6033,
      "name": "MissingRoyaltyTokenAccounts",
      "msg": "Missing royalty token accounts"
    },
    {
      "code": 6034,
      "name": "InvalidRoyaltyPercent",
      "msg": "Invalid royalty percent; must be between 0 and 100"
    },
    {
      "code": 6035,
      "name": "UserAlreadyInLookupTable",
      "msg": "User account already exists in the lookup table."
    },
    {
      "code": 6036,
      "name": "UserNotFoundInLookupTable",
      "msg": "User account not found in the lookup table."
    },
    {
      "code": 6037,
      "name": "InvalidFallbackLookupTable",
      "msg": "Invalid fallback lookup table."
    },
    {
      "code": 6038,
      "name": "InvalidCurrentLookupTable",
      "msg": "Invalid current lookup table."
    },
    {
      "code": 6039,
      "name": "InvalidLookupTable",
      "msg": "Invalid user account lookup table."
    },
    {
      "code": 6040,
      "name": "InvalidLookupTableManager",
      "msg": "Invalid user account lookup table manager."
    },
    {
      "code": 6041,
      "name": "InvalidPoolClaimableLookupTable",
      "msg": "Invalid pool claimable lookup table."
    },
    {
      "code": 6042,
      "name": "InvalidPoolVestingTable",
      "msg": "Invalid pool vesting table."
    },
    {
      "code": 6043,
      "name": "InvalidPoolClaimableLookupTableManager",
      "msg": "Invalid pool claimable lookup table manager."
    },
    {
      "code": 6044,
      "name": "IncorrectOwner",
      "msg": "The program is not the owner of the PDA account."
    },
    {
      "code": 6045,
      "name": "AccountDataBorrowFailed",
      "msg": "Failed to borrow account data."
    },
    {
      "code": 6046,
      "name": "MissingDefaultUserAccount",
      "msg": "Missing default user account"
    },
    {
      "code": 6047,
      "name": "Overflow",
      "msg": "You have invested too much sir."
    },
    {
      "code": 6048,
      "name": "InvalidHours",
      "msg": "You have selected a vestion option that does not exist"
    },
    {
      "code": 6049,
      "name": "TargetRaiseReached",
      "msg": "The target raise was reached, you cannot defund now."
    },
    {
      "code": 6050,
      "name": "InsufficientFunds",
      "msg": "Your balance is insufficient for this defund."
    },
    {
      "code": 6051,
      "name": "CannotDefund",
      "msg": "Your cannot defund at this time."
    },
    {
      "code": 6052,
      "name": "InvalidTotalPercent",
      "msg": "The total allocation percentages must equal 100."
    },
    {
      "code": 6053,
      "name": "InvalidPoolTokenAccountOwner",
      "msg": "Invalid pool token account"
    },
    {
      "code": 6054,
      "name": "CannotUpdateTokenomics",
      "msg": "Cannot update tokenomics."
    },
    {
      "code": 6055,
      "name": "MismatchedAllocationLength",
      "msg": "Allocation percent, name, and wallet vectors must have the same length."
    },
    {
      "code": 6056,
      "name": "ExceededMaxAllocations",
      "msg": "The number of allocations exceeds the maximum allowed."
    },
    {
      "code": 6057,
      "name": "LowLpPercent",
      "msg": "The LP allocation percentage must be greater than 5%."
    },
    {
      "code": 6058,
      "name": "LowFundersPercent",
      "msg": "The funders allocation percentage must be greater than 5%."
    },
    {
      "code": 6059,
      "name": "DuplicateWalletFound",
      "msg": "Duplicate allocation wallets are not allowed"
    },
    {
      "code": 6060,
      "name": "HoursEmpty",
      "msg": "Hours vector is empty."
    },
    {
      "code": 6061,
      "name": "MultiplierEmpty",
      "msg": "Multiplier vector is empty."
    },
    {
      "code": 6062,
      "name": "HoursExceedMaxVestingOptions",
      "msg": "Hours vector exceeds the maximum allowed vesting options."
    },
    {
      "code": 6063,
      "name": "MultiplierExceedMaxVestingOptions",
      "msg": "Multiplier vector exceeds the maximum allowed vesting options."
    },
    {
      "code": 6064,
      "name": "HoursMultiplierLengthMismatch",
      "msg": "Hours and multiplier vectors must have the same length."
    },
    {
      "code": 6065,
      "name": "FirstMultiplierNotOne",
      "msg": "The first multiplier must be equal to 1.00."
    },
    {
      "code": 6066,
      "name": "HoursNotAscendingOrder",
      "msg": "Hours are not in ascending order."
    },
    {
      "code": 6067,
      "name": "MultiplierNotAscendingOrder",
      "msg": "Multiplier is not in ascending order."
    },
    {
      "code": 6068,
      "name": "CanDefundMustBeTrueIfNoExpiration",
      "msg": "If there is no expiration date, can_defund must be true."
    },
    {
      "code": 6069,
      "name": "HourDurationMustBeZeroIfNoExpiration",
      "msg": "If there is no expiration date, hour_duration must be 0."
    },
    {
      "code": 6070,
      "name": "HourDurationMustBeGreaterThanOneIfHasExpiration",
      "msg": "If there is an expiration date, hour_duration must be greater than 1."
    },
    {
      "code": 6071,
      "name": "NoExpirationDate",
      "msg": "Pool does not have an expiration date set."
    },
    {
      "code": 6072,
      "name": "TargetRaiseMet",
      "msg": "The total raised amount is greater than or equal to the target raise."
    },
    {
      "code": 6073,
      "name": "PoolNotRaising",
      "msg": "The pool is not in the Raising status."
    },
    {
      "code": 6074,
      "name": "PoolNotExpired",
      "msg": "The pool has not yet reached its expiration timestamp."
    },
    {
      "code": 6075,
      "name": "InvalidInitialVl",
      "msg": "The initial virtual liquidity must be greater than 0"
    },
    {
      "code": 6076,
      "name": "InvalidCurveConstant",
      "msg": "The curve constant must be greater than 0"
    },
    {
      "code": 6077,
      "name": "CurveConstantTooHigh",
      "msg": "The curve constant is too high"
    },
    {
      "code": 6078,
      "name": "CalculationOverflow",
      "msg": "Calculation overflow occurred during processing"
    },
    {
      "code": 6079,
      "name": "ExceededMaxPrice",
      "msg": "The price exceeds the maximum allowed limit for this transaction"
    },
    {
      "code": 6080,
      "name": "SlippageExceeded",
      "msg": "The provided slippage tolerance was exceeded"
    },
    {
      "code": 6081,
      "name": "InvalidStakingNetworkPDA",
      "msg": "Invalid Staking Network PDA"
    },
    {
      "code": 6082,
      "name": "UnstakeNotAllowed",
      "msg": "Your staking cycle is still active, wait for your 7 day unstaking window to begin."
    },
    {
      "code": 6083,
      "name": "InsufficientStakedTokens",
      "msg": "You are trying to unstake tokens you don't have."
    },
    {
      "code": 6084,
      "name": "ClaimCooldown",
      "msg": "Claim not allowed yet. Please wait for the cooldown period."
    },
    {
      "code": 6085,
      "name": "NetworkSyncCooldown",
      "msg": "Network syncing not allowed yet. Please wait for the cooldown period."
    },
    {
      "code": 6086,
      "name": "InsufficientDisposableSol",
      "msg": "Insufficient SOL to syncing the network. Min 1 SOL to pending to sync is required."
    },
    {
      "code": 6087,
      "name": "InvalidStakerAccountManager",
      "msg": "Invalid Staker Account Manager"
    },
    {
      "code": 6088,
      "name": "InvalidStakerAccountPDA",
      "msg": "Invalid Staker Account PDA"
    },
    {
      "code": 6089,
      "name": "InvalidStakerTokenAccountMint",
      "msg": "Invalid Staker Token Account Mint"
    },
    {
      "code": 6090,
      "name": "InvalidStakerTokenAccountOwner",
      "msg": "Invalid Staker Token Account Owner"
    },
    {
      "code": 6091,
      "name": "InvalidStakingNetworkTokenAccount",
      "msg": "Invalid Staking Network Token Account"
    },
    {
      "code": 6092,
      "name": "InvalidStakingNetworkTokenAccountMint",
      "msg": "Invalid Staking Network Token Account Mint"
    },
    {
      "code": 6093,
      "name": "InvalidStakingNetworkTokenAccountOwner",
      "msg": "Invalid Staking Network Token Account Owner"
    },
    {
      "code": 6094,
      "name": "InvalidStakerStakingTokenAccountMint",
      "msg": "Invalid Staker Staking Token Account Mint"
    },
    {
      "code": 6095,
      "name": "InvalidNetworkStakingTokenAccountOwner",
      "msg": "Invalid Network Staking Token Account Owner"
    },
    {
      "code": 6096,
      "name": "InvalidNetworkStakingTokenAccountMint",
      "msg": "Invalid Network Staking Token Account Mint"
    },
    {
      "code": 6097,
      "name": "InvalidStakerStakingTokenAccountOwner",
      "msg": "Invalid Staker Staking Token Account Owner"
    },
    {
      "code": 6098,
      "name": "NoTokensStaked",
      "msg": "Cannot sync with 0 tokens staked"
    },
    {
      "code": 6099,
      "name": "AdminNotCreator",
      "msg": "Admin and creator must be the same."
    },
    {
      "code": 6100,
      "name": "InvalidPoolsLookupManagerOwner",
      "msg": "Pools Lookup Manager account is not owned by the program."
    },
    {
      "code": 6101,
      "name": "InvalidLookupTableOwner",
      "msg": "Lookup Table account is not owned by the program."
    },
    {
      "code": 6102,
      "name": "AuthorityNotCreator",
      "msg": "Authority and creator must be the same."
    },
    {
      "code": 6103,
      "name": "InvalidPoolOwner",
      "msg": "Pool must be owned by the program."
    },
    {
      "code": 6104,
      "name": "InvalidTokenAMint",
      "msg": "Invalid Token A Mint."
    },
    {
      "code": 6105,
      "name": "InvalidTokenBMint",
      "msg": "Invalid Token B Mint."
    },
    {
      "code": 6106,
      "name": "InvalidTreasuryOwner",
      "msg": "The Treasury account must be owned by the program."
    },
    {
      "code": 6107,
      "name": "InvalidURI",
      "msg": "Invalid URI: URI must be a non-empty valid URL starting with http."
    },
    {
      "code": 6108,
      "name": "InvalidName",
      "msg": "Invalid name: Name must be non-empty and no more than 50 characters."
    },
    {
      "code": 6109,
      "name": "InvalidSymbol",
      "msg": "Invalid symbol: Symbol must be non-empty and no more than 5 characters."
    },
    {
      "code": 6110,
      "name": "InvalidDecimals",
      "msg": "Invalid decimals: Decimals must be between 0 and 9."
    },
    {
      "code": 6111,
      "name": "InvalidSupply",
      "msg": "Invalid supply: Supply must be between 100,000 and 100,000,000,000."
    },
    {
      "code": 6112,
      "name": "InvalidUserAccountOwner",
      "msg": "User account must be owned by the program."
    },
    {
      "code": 6113,
      "name": "InvalidUserPoolsLookupManagerOwner",
      "msg": "User pools lookup manager must be owned by the program."
    },
    {
      "code": 6114,
      "name": "InvalidLookupManagerOwner",
      "msg": "Lookup manager must be owned by the program."
    },
    {
      "code": 6115,
      "name": "InvalidCurrentLookupTableOwner",
      "msg": "Current lookup table must be owned by the program."
    },
    {
      "code": 6116,
      "name": "InvalidStakingNetworkOwner",
      "msg": "Staking network must be owned by the program."
    },
    {
      "code": 6117,
      "name": "InvalidStakingNetworkSyncAccountOwner",
      "msg": "Staking network sync account must be owned by the program."
    },
    {
      "code": 6118,
      "name": "KYCVerifictionFailed",
      "msg": "KYC verifiction failed."
    },
    {
      "code": 6119,
      "name": "DeserializationFailed",
      "msg": "Failed deserialization of the pool"
    },
    {
      "code": 6120,
      "name": "InvalidPoolType",
      "msg": "Invalid pool type"
    },
    {
      "code": 6121,
      "name": "InvalidTickArrayWhirlpool",
      "msg": "Invalid TickArray Whirlpool."
    }
  ]
};
