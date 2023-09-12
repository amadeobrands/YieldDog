# YieldDog
Fetch the highest LSD yield

## Technical high level concept

We want to hold multiple LSD tokens.

Naive way to do that would be using a multi asset vault (ERC4626). Issues with vault are many, lots of on-chain complexity (many smart contracts) and attacks vectors. Namely when swapping between LSD assets (MEV sandwhich attacks, oracles price feed...).

Using a Pool instead of a vault removes to need for oracle and external asset swapping. Also remove smart contract complexity as both pricing and asset allocation is decided by the AMM formula. The more complex arbitrage calculation is pushed off-chain.

Currently there exist 2 pools of LSDs on ETH mainnet (one on [Curve](https://curve.fi/#/ethereum/pools/factory-tricrypto-14/deposit) and one on [Balancer](https://app.balancer.fi/#/ethereum/pool/0x42ed016f826165c2e5976fe5bc3df540c5ad0af700000000000000000000058b)). We will build a "Master Pool" that will hold those LSD pool tokens, a pool of pools.

## Smart contract: MasterPool

The [MasterPool](https://github.com/amadeobrands/YieldDog/blob/main/src/MasterPool.sol) is a smart contract that functions as a liquidity pool. Here's a detailed breakdown:

AddLiquidity(): Enables users to add assets to the liquidity pool, which can then be used for trading or earning rewards. This process usually involves depositing a pair of tokens to maintain the balance in the pool.

RemoveLiquidity(): Lets users remove their assets from the liquidity pool, often in the form of tokens and their respective trading pairs. This action might be subject to fees or penalties, depending on the pool's design.

Swap: Allows users to trade tokens by leveraging the liquidity provided in the pool. For instance, a user can swap Token A for Token B, subject to available liquidity and potential price slippage.

Foundry test files [here](https://github.com/amadeobrands/YieldDog/blob/main/src/MasterPool.t.sol)

## Smart contract: Gateway

The [Gateway](https://github.com/amadeobrands/YieldDog/blob/main/src/Gateway.sol)  is a smart contract that offers a suite of financial functionalities to users. Here's a breakdown:

Deposit(): Enables users to deposit ETH into the contract in return for the master pool LP tokens

Redeem(): Allows users to withdraw their ETH from the contract.

TotalAssets(): Provides the total assets under management (AUM) of the contract, denominated in Wrapped Ether (weth).

sharesToAssets(): Computes the value of a user's assets within the contract, priced in Wrapped Ether (weth).

sharesToUnderlyingAssets(): Gives the value of a user's assets but priced in various Ethereum-based assets such as wsteth, reth, and sfrxeth. This function helps users understand their holdings' composition and value in different underlying assets.

Foundry test files [here](https://github.com/amadeobrands/YieldDog/blob/main/src/Gateway.t.sol)

# Deployments

## ETH Sepolia LSD

[Deployer Account](https://sepolia.etherscan.io/address/0x792bb625685c772928ad57bdd304ab2124ee013a)

[MasterPool Contract](https://sepolia.etherscan.io/address/0xb8f65b0f4290a452527ccfc95b8cb8c53fbc3f0a#code)

[Gateway Contract](https://sepolia.etherscan.io/address/0xfb5e3a3b77324d75ac223d0d1acd14957abe369e#code)

## ETH Sepolia USD stables

Similar concept, pool of pools on top of [sDAI](https://app.sparkprotocol.io/sdai/) (yield bearing usd stable token) and curve [3pool](https://curve.fi/#/ethereum/pools/3pool/deposit)

[Deployer Account](https://sepolia.etherscan.io/address/0x792bb625685c772928ad57bdd304ab2124ee013a)

[Gateway contract](https://sepolia.etherscan.io/address/0x338E8c220EF8146920b0066285311F72203169A2#code)

[MasterPool contract](https://sepolia.etherscan.io/address/0x2dd6f9265f6f3c72008c8d5ebbe754cf80f3129a#code)

## Taiko Alpha

[Deployer Account](https://explorer.test.taiko.xyz/address/0x792bb625685c772928Ad57bDD304AB2124EE013A)

[MasterPool contract (code Verified)](https://explorer.test.taiko.xyz/address/0x9bC34fb3F29FbeeeCD7D78B807A659b374Ed7fB7/contracts#address-tabs)

[Gateway contract](https://explorer.test.taiko.xyz/tx/0x447a88ba18a2859888f77e30cae0aeb706a588a71b2653c1cb29d3d5c7c43d87)

## Mantle testnet

[Deployer Contract](https://explorer.testnet.mantle.xyz/address/0x792bb625685c772928Ad57bDD304AB2124EE013A)

[MasterPool contract](https://explorer.testnet.mantle.xyz/tx/0x01880ebe823e068b6d74b7f741466638e3eeb55eba3077859e9afa55a6b41540)

[Gateway contract](https://explorer.testnet.mantle.xyz/tx/0x16a46197218072116351f2d015e8c21fbb8897fb155ff2f62c98f519ff48f6c5)

# Technical documentation

## Getting Started

### Local ETH node

Copy .env.example to .env and modify to set value

```bash
cp .env.example .env
```

install forge dependencies

```bash
forge install
```

Run a local node on a forked eth mainnet state

```bash
pnpm run anvil-mainnet
```

In another terminal, run the deploy script

```bash
pnpm run deploy:local
```

The addresses for the masterpool and gateway contracts will be displayed

### Front end development server:

install node dependencies

```bash
pnpm install
```

Run dev server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Smart Contract walkthrough

