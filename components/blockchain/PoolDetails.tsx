import Image from 'next/image'
import Link from 'next/link'
import MaxEthChart from "../graphs/MaxEthChart"

import { shortenAddress } from '@/lib/utils/shortenAddress'

// logos
import balancer from '@/public/logos/balancer-logo.png'
import curve from '@/public/logos/crv-logo.png'

const PoolDetails = () => {

  const maxEthData = [
    { name: 'TryLSD', value: 400 },
    { name: 'Balancer', value: 400 },
  ]

  const curvePoolData = [
    { name: 'wstETH', value: 33.17 },
    { name: 'rETH', value: 33.45 },
    { name: 'sfrxETH', value: 33.38 },
  ]
  const balancerPoolData = [
    { name: 'wstETH', value: 23.03 },
    { name: 'rETH', value: 13.07 },
    { name: 'sfrxETH', value: 63.89 },
  ]

  return (
    <div className='flex flex-col border-2 border-border rounded-xl m-3 p-4 md:w-full lg:full'>
      <h2 className='text-secondary text-xl'>MaxETH Details</h2>
      <div className='flex gap-3 items-center my-3'>
        <div className='shrink-0'>
          <MaxEthChart data={maxEthData} />
        </div>
        {/* ************ MaxETH pool details ***********/}
        <div className='w-full'>
          <div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <Image alt='balancer' src={balancer} className='inline-block align-middle mr-1' height={20} width={20} />
                <p>Balancer</p>
              </div>
              <p>512.21 ETH <span className='text-red'>(50%)</span></p>
            </div>
            <Link href='https://curve.fi/#/ethereum/pools/factory-tricrypto-14/deposit' rel="noopener noreferrer" target="_blank" className='px-2 text-muted'>
              {shortenAddress('0x2570f1bd5d2735314fc102eb12fc1afe9e6e7193')}
            </Link>
          </div>
          <div className='mt-3'>
            <div className='flex gap-2 items-center justify-between'>
              <div className='flex items-center'>
                <Image alt='balancer' src={curve} className='inline-block align-middle mr-1' height={20} width={20} />
                <p>TryLSD</p>
              </div>
              <p>512.21 ETH <span className='text-red'>(50%)</span></p>
            </div>
            <Link href='https://curve.fi/#/ethereum/pools/factory-tricrypto-14/deposit' rel="noopener noreferrer" target="_blank" className='px-2 text-muted'>
              {shortenAddress('0x2570f1bd5d2735314fc102eb12fc1afe9e6e7193')}
            </Link>
          </div>
        </div>
      </div>
      {/* ----------------------- MaxETH pool composition----------------------- */}
      <div>
        <h2 className='text-secondary text-xl'>MaxETH Composition</h2>
        <div className='flex justify-around'>
          <div className='shrink-0'>
            <MaxEthChart data={curvePoolData} />
          </div>
          <div className='shrink-0'>
            <MaxEthChart data={balancerPoolData} />
          </div>
        </div>
      </div>
      {/* ----------------------- MaxETH pool Description----------------------- */}
      <div className='flex flex-col gap-1 mt-2'>
        <h2 className='text-secondary text-xl'>MaxETH Composition</h2>
        <p>This is a pool of pools to get extra yield on staked ETH to maximize yield on ETH</p>
      </div>
      {/* ----------------------- MaxETH pool fees----------------------- */}
      <div className='flex flex-col gap-1 mt-2'>
        <h2 className='text-secondary text-xl'>Fees</h2>
        <div className='flex gap-3 items-center'>
          <div>
            <h3>Base Fee</h3>
            <p>0.2%</p>
          </div>
          <div>
            <h3>Protocol Fee</h3>
            <p>5%</p>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default PoolDetails
