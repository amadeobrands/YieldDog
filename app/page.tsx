'use client'
import Link from 'next/link'

import TransactionForm from '@/components/blockchain/TransactionForm'
import PoolDetails from '@/components/blockchain/PoolDetails'

import { ExternalLink, ArrowRight } from 'lucide-react'

export default function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center my-16">
      <section className=''>
        <h1 className='text-7xl font-bold text-primary text-center my-6'>MaxETH</h1>
        {/* Vault overview details */}
          <div className='w-full grid grid-cols-2 gap-3 text-lg mt-3'>
            <div className='flex flex-col justify-center items-center'>
              <h3 className='text-secondary lg:text-xl'>AUM</h3>
              <h2 className='font-bold text-2xl lg:text-3xl'>1024.42 ETH</h2>
              <h2 className='text-primary font-bold text-xl lg:text-xl'>$1,671,853.44</h2>
            </div>
            <div className='flex justify-center items-center gap-3'>
              <div className='flex flex-col justify-center items-center h-full'>
                <h3 className='text-secondary lg:text-xl'>APY</h3>
                <h2 className='font-bold text-2xl lg:text-3xl'>9.3%</h2>
              </div>
              <div>
                <ArrowRight />
              </div>
              {/* -------------------- APY BREAKDOWN -------------------- */}
              <div className='flex flex-col border-2 border-border/30 rounded-lg p-2'>
                <div>
                  <h6 className='text-secondary'>Base APY</h6> 
                  <span className='ml-2 text-sm font-bold'>4.11%</span>
                  <p className='ml-1 text-sm inline-block'>Swap Fees APY</p>
                </div>
                <div>
                  <h6 className='text-secondary'>LSD APY</h6> 
                  <div>
                    <span className='ml-2 text-sm font-bold'>4.11%</span>
                    <p className='ml-1 text-sm inline-block'>wstETH APY</p>
                  </div>
                  <div>
                    <span className='ml-2 text-sm font-bold'>3.89%</span>
                    <p className='ml-1 text-sm inline-block'>rETH APY</p>
                  </div>
                  <div>
                    <span className='ml-2 text-sm font-bold'>4.56%</span>
                    <p className='ml-1 text-sm inline-block'>sfrxETH APY</p>
                  </div>
                </div>
                <div>
                  <h6 className='text-secondary'>Rewards APY</h6> 
                  <div>
                    <span className='ml-2 text-sm font-bold'>2.1%</span>
                    <p className='ml-1 text-sm inline-block'>crv boost APY</p>
                  </div>
                  <div>
                    <span className='ml-2 text-sm font-bold'>2.6%</span>
                    <p className='ml-1 text-sm inline-block'>BAL boost APY</p>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        <div className='flex flex-col items-center justify-center m-4 text-secondary/70'>
          <div className='flex flex-col items-center justify-center mx-auto mb-6'>
            <h5 className='text-xxs md:text-xs lg:text-sm'>Contract</h5>
            <Link href='https://etherscan.io/address/0xB8f65B0f4290A452527ccfc95b8Cb8c53fbc3f0a' rel="noopener noreferrer" target="_blank">
              <p className='text-xxs md:text-xs lg:text-sm inline-block mr-1 text-muted-foreground'>0xB8f65B0f4290A452527ccfc95b8Cb8c53fbc3f0a</p>
              <ExternalLink  className='h-4 md:h-5 inline-block' />
            </Link>
          </div>
        </div>
      </section>
      <section className='flex w-full lg:w-5/6'>
        <TransactionForm />
        <PoolDetails />
      </section>
    </main>
  )
}
