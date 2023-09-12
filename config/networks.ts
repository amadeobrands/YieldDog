// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Networks
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
import { mantle, linea, arbitrum, taikoTestnetSepolia, arbitrumGoerli, baseGoerli, goerli, hardhat, mainnet, sepolia } from '@wagmi/core/chains'
import { configureChains } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

// @ts-ignore
goerli.iconUrl = '/icons/NetworkEthereumTest.svg'
// @ts-ignore
sepolia.iconUrl = '/icons/NetworkEthereumTest.svg'
// @ts-ignore
arbitrumGoerli.iconUrl = '/icons/NetworkArbitrumTest.svg'
// @ts-ignore
baseGoerli.iconUrl = '/icons/NetworkBaseTest.svg'

// const localNetwork ={
//   id: 1,
//   network: "homestead",
//   name: "LOCAL DEV",
//   nativeCurrency: {
//       name: "Ether",
//       symbol: "ETH",
//       decimals: 18,
//   },
//   rpcUrls: {
//       public: {
//           http: ["http://localhost:8545"],
//           webSocket:  ["http://localhost:8545"],
//       },
//   },
//   blockExplorers: {
//       etherscan: {
//           name: "Etherscan",
//           url: "https://etherscan.io",
//       },
//       default: {
//           name: "Etherscan",
//           url: "https://etherscan.io",
//       },
//   },
//   contracts: {
//       ensRegistry: {
//           address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
//       },
//       ensUniversalResolver: {
//           address: "0xc0497E381f536Be9ce14B0dD3817cBcAe57d2F62",
//           blockCreated: 16966585,
//       },
//       multicall3: {
//           address: "0xca11bde05977b3631167028862be2a173976ca11",
//           blockCreated: 14353601,
//       },
//   },
// }

const CHAINS_SUPPORTED_BY_ALCHEMY = [ mainnet, goerli, sepolia] // TODO add other chains supported by Alchemy
const CHAINS_SUPPORTED_BY_INFURA = [mainnet, goerli, sepolia] // TODO add other chains supported by Infura
const CHAINS_SUPPORTED_BY_PUBLIC_PROVIDER = [arbitrum, linea, mantle, taikoTestnetSepolia, goerli, mainnet, sepolia]
const CHAINS_SUPPORTED_BY_HARDHAT = [hardhat]

const PROVIDERS = []
const CHAINS = []

if (process.env.NEXT_PUBLIC_ALCHEMY_API_KEY) {
  CHAINS.push(...CHAINS_SUPPORTED_BY_ALCHEMY)
  PROVIDERS.push(
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
    })
  )
}

if (process.env.NEXT_PUBLIC_INFURA_API_KEY) {
  CHAINS.push(...CHAINS_SUPPORTED_BY_INFURA)
  PROVIDERS.push(
    infuraProvider({
      apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY as string,
    })
  )
}

if (process.env.NEXT_PUBLIC_USE_HARDHAT_PROVIDER) {
  CHAINS.push(...CHAINS_SUPPORTED_BY_HARDHAT)
  PROVIDERS.push(publicProvider())
}

// Include public provider if no other providers are available.
if (process.env.NEXT_PUBLIC_USE_PUBLIC_PROVIDER || PROVIDERS.length === 0) {
  CHAINS.push(...CHAINS_SUPPORTED_BY_PUBLIC_PROVIDER)
  PROVIDERS.push(publicProvider())
}

// deduplicate chains
const uniqueChainsMap = CHAINS.reduce((accumulator, chain) => {
  return accumulator.set(chain.id, chain)
}, new Map())

const UNIQUE_CHAINS = Array.from(uniqueChainsMap.values())


// @ts-ignore
// TODO: The sepolia chain is throwing type errors for some reason.
export const { chains, publicClient } = configureChains(UNIQUE_CHAINS, [...PROVIDERS])
