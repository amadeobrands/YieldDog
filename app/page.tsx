import Link from 'next/link'

import TransactionForm from '@/components/blockchain/TransactionForm'
import PoolDetails from '@/components/blockchain/PoolDetails'

import { ExternalLink } from 'lucide-react'

export default function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center mt-24">
      <section className='mb-6'>
        <h1 className='text-7xl font-bold text-primary text-center my-6'>MaxETH</h1>
        {/* Vault overview details */}
          <div className='w-full grid grid-cols-2 gap-3 text-lg mt-3 lg:flex lg:justify-between lg:w-1/3 lg:gap-8'>
            <div className='flex flex-col justify-center items-center'>
              <h3 className='text-secondary lg:text-xl'>AUM</h3>
              <h2 className='font-bold text-2xl lg:text-3xl'>1024.42 ETH</h2>
              <h2 className='text-primary font-bold text-xl lg:text-xl'>$1,671,853.44</h2>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <h3 className='text-secondary lg:text-xl'>APY</h3>
              <h2 className='font-bold text-2xl lg:text-3xl'>9.3%</h2>
            </div>
          </div>
        <div className='flex flex-col items-center justify-center m-4 text-secondary/70'>
          <div className='flex flex-col items-center justify-center mx-auto mb-6'>
            <h5 className='text-xxs md:text-xs lg:text-sm'>Contract</h5>
            <Link href='https://etherscan.io/address/0x2889302a794da87fbf1d6db415c1492194663d13' rel="noopener noreferrer" target="_blank">
              <p className='text-xxs md:text-xs lg:text-sm inline-block mr-1 text-muted-foreground'>0x2889302a794da87fbf1d6db415c1492194663d13</p>
              <ExternalLink  className='h-4 md:h-5 inline-block' />
            </Link>
          </div>
        </div>
      </section>
      <section className='flex'>
        <TransactionForm />
        <PoolDetails />
      </section>
    </main>
  )
}
