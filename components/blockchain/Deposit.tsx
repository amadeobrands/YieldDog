
import Link from 'next/link'
import { useEffect, useState, useMemo } from 'react'
// UI components
import { Button } from '@/components/ui/button'

// Web3 Hooks
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useContractRead } from 'wagmi'

import { Loader2 } from 'lucide-react'

// Abi's
import gatewayAbi from '../../abi/Gateway.json'
import masterPoolAbi from '../../abi/masterPool.json'

type EthereumAddress = `0x${string}`

interface DepositProps {
  amountToTransfer: string | number | bigint | undefined;  // or the appropriate type
  account: string | undefined;           // assuming accountAddress is a string
}

export const Deposit = ({ amountToTransfer, account }: DepositProps) => {

  const [ transferAmount, setTransferAmount ] = useState<bigint | undefined>()
  const [ message, setMessage ] = useState<string>('')

  const gatewayContract = {
    address: process.env.NEXT_PUBLIC_GATEWAY_ADDRESS as EthereumAddress,
    abi: gatewayAbi.abi as any
  } as const

  const masterPoolContract = {
    address: process.env.NEXT_PUBLIC_MASTERPOOL_ADDRESS as EthereumAddress,
    abi: masterPoolAbi.abi as any
  } as const

  // Masterpool read balance
  const { data: masterPoolBalance, error: masterPoolError } = useContractRead({
    address: masterPoolContract.address,
    abi: masterPoolContract.abi,
    functionName: 'balanceOf',
    args: [account ? account : '']
  })

  const { config: configDeposit, error: errorDeposit } = usePrepareContractWrite({
    address: gatewayContract.address as EthereumAddress,
    abi: gatewayContract.abi,
    functionName: 'deposit',
    value: transferAmount,
    enabled: false,
  })
  const { data: dataDeposit, write: writeDeposit } = useContractWrite(configDeposit)

  const { data: waitForTransactionData, isLoading } = useWaitForTransaction({
    hash: dataDeposit?.hash,
  })

  const onDeposit = () => {
      writeDeposit?.()
  }

  useEffect(() => {
    if (typeof amountToTransfer === 'number') {
      setTransferAmount(BigInt(amountToTransfer / 6))
  } else if (typeof amountToTransfer === 'bigint') {
      setTransferAmount(amountToTransfer / BigInt(6) as bigint)
  }
  },[amountToTransfer])

  useMemo(() => {
    if (waitForTransactionData?.transactionHash) {
      setMessage(waitForTransactionData?.transactionHash)
    }
  },[waitForTransactionData])

  // useEffect(() => {
  //   // console.log('data ->', dataDeposit)
  //   console.log('accountAddress ->', account)
  //   console.log('errorDeposit ->', errorDeposit)
  //   // console.log('dataDeposit ->', dataDeposit)
  //   console.log('dataDeposit ->', waitForTransactionData?.transactionHash)
  //   console.log('masterPoolBalance ->', masterPoolBalance)
  //   console.log('masterPoolError ->', masterPoolError)
  // },[errorDeposit, account, dataDeposit, masterPoolBalance, waitForTransactionData, masterPoolError])

  return (
    <>
      <div className='flex flex-col items-center justify-center w-full'>
        <Button 
          className='my-2 text-xl font-bold w-full' 
          disabled={!writeDeposit || !amountToTransfer}
          onClick={() => onDeposit()}
          >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" />  : 'Deposit'}
        </Button>
      </div>
      {message && 
      <div>
        <p>Success! Your deposit has been sent. View on 
          <Link className='text-secondary' rel="noopener noreferrer" target="_blank" href={`https://etherscan.io/tx/${message}`}> etherscan.io</Link>
        </p>
      </div>
      }
    </>
  )
}

