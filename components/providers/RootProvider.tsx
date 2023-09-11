'use client'
import {ReactNode} from 'react'
import { SWRConfig } from 'swr'

import { RainbowKit } from '@/components/providers/RainbowKit'
import { useIsMounted } from '@/lib/hooks/useIsMounted'
import fetchJson from '@/lib/utils/fetchJson'

const RootProvider = ({ children }: {children: ReactNode }) => {
  const isMounted = useIsMounted()

  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err)
        },
      }}
    >
      {isMounted &&
        <RainbowKit>
          <div className='flex flex-col min-h-screen'>
            {children}
          </div>
        </RainbowKit>
      }
    </SWRConfig>
  )
}
export default RootProvider
