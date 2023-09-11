# YieldDog
Fetch the highest LSD yield

## Introduction

[TODO]

# Technical documentation

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Smart Contract walkthrough

## MasterPool

The "MasterPool" is a smart contract that functions as a liquidity pool. Here's a detailed breakdown:

AddLiquidity(): Enables users to add assets to the liquidity pool, which can then be used for trading or earning rewards. This process usually involves depositing a pair of tokens to maintain the balance in the pool.

RemoveLiquidity(): Lets users remove their assets from the liquidity pool, often in the form of tokens and their respective trading pairs. This action might be subject to fees or penalties, depending on the pool's design.

Swap: Allows users to trade tokens by leveraging the liquidity provided in the pool. For instance, a user can swap Token A for Token B, subject to available liquidity and potential price slippage.

## Gateway

The "Gateway" is a smart contract that offers a suite of financial functionalities to users. Here's a breakdown:

Deposit(): Enables users to deposit ETH into the contract in return for the master pool LP tokens

Redeem(): Allows users to withdraw their ETH from the contract.

TotalAssets(): Provides the total assets under management (AUM) of the contract, denominated in Wrapped Ether (weth).

sharesToAssets(): Computes the value of a user's assets within the contract, priced in Wrapped Ether (weth).

sharesToUnderlyingAssets(): Gives the value of a user's assets but priced in various Ethereum-based assets such as wsteth, reth, and sfrxeth. This function helps users understand their holdings' composition and value in different underlying assets.
