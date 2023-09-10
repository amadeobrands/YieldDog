'use client'

import { ConnectButton, useAccountModal, useConnectModal } from '@rainbow-me/rainbowkit'
import { Button } from '@components/ui/button'
import { ChevronDown } from 'lucide-react'

interface WalletConnectCustomProps {
  className?: string
  classNameConnect?: string
  classNameConnected?: string
  classNameWrongNetwork?: string
  labelConnect?: string
  labelWrongNetwork?: string
}

export const WalletConnect = ({
  className,
  classNameConnect = 'btn btn-primary w-full',
  classNameConnected = 'btn btn-primary w-full',
  classNameWrongNetwork = 'btn btn-red w-full',
  labelConnect = 'Connect Wallet',
  labelWrongNetwork = 'Wrong Network',
}: WalletConnectCustomProps) => {

  const { openAccountModal } = useAccountModal()

  return (
    <ConnectButton.Custom>
      {({account, chain, openChainModal, openConnectModal, authenticationStatus }) => {
        // console.log('Rainboaw Account data ->', account)
        // console.log('Rainbow Account chain info ->', chain)
        const connected = account && chain && (!authenticationStatus || authenticationStatus === 'authenticated')

        return (
          <div className={className}>
            {(() => {
              if (!connected) {
                return (
                  <Button 
                  className={classNameConnect} 
                  onClick={openConnectModal} 
                  variant='outline'
                  type="button">
                    <span className="text-xs font-bold leading-none p-2 inline-block">
                      {labelConnect}
                    </span>
                  </Button>
                )
              }

              if (chain.id !== 1) {
                return (
                  <Button className={classNameWrongNetwork} onClick={openChainModal} type="button">
                    <span className="text-xs font-bold leading-none p-2 inline-block">
                      {labelWrongNetwork}
                    </span>
                  </Button>
                )
              }

              return (
                <div className='flex items-center gap-4'>
                  <Button 
                    className={`${classNameConnected} flex-1 items-center`} 
                    variant='outline'
                    onClick={openChainModal} 
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}>
                        {chain.iconUrl && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img alt={chain.name ?? 'Chain icon'} src={chain.iconUrl} style={{ width: 18, height: 18 }} />
                        )}
                      </div>
                    )}
                    {/* <span className="hidden md:uppercase md:whitespace-nowrap md:text-xs md:font-bold tracking-wider leading-none md:p-2 md:block">{chain.name}</span> */}
                    <ChevronDown />
                  </Button>
                  <Button 
                    onClick={openAccountModal}  
                    variant='outline'
                    className={`${classNameConnected} shrink`} 
                    type="button">
                    <span className="text-xs font-bold leading-none p-2 inline-block">
                      {account.displayName}
                    </span>
                  </Button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default WalletConnect

