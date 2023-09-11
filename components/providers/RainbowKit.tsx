'use client'
import '@rainbow-me/rainbowkit/styles.css'
import { ReactNode } from 'react'

import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { connectorsForWallets, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { ledgerWallet } from '@rainbow-me/rainbowkit/wallets'
import { WagmiConfig, createConfig } from 'wagmi'

import { chains, publicClient } from '@/config/networks'

interface Props {
  children: ReactNode
  autoConnect?: boolean
}

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) {
  throw new Error("PROJECT_ID is not defined in environment variables.");
}

const { wallets } = getDefaultWallets({
  appName: 'Yield Dog',
  projectId,
  chains,
})

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      ledgerWallet({ projectId, chains }),
    ],
  },
])

const wagmiClient = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

export function RainbowKit(props: Props) {
  return (
    <WagmiConfig config={wagmiClient}>
      <RainbowKitProvider modalSize="compact" chains={chains}>
        {props.children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
