import { useEffect } from 'react'
// UI components
import { Button } from '@/components/ui/button'

// Web3 Hooks
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useContractRead } from 'wagmi'

import { Loader2 } from 'lucide-react'

// Abi's
import gatewayAbi from '../../abi/Gateway.json'
import masterPoolAbi from '../../abi/masterPool.json'

interface DepositProps {
  amountToTransfer: string | number | bigint | undefined;  // or the appropriate type
  account: string | undefined;           // assuming accountAddress is a string
}

export const Deposit = ({ amountToTransfer, account }: DepositProps) => {

  const gatewayContract = {
    address: '0xde79380FBd39e08150adAA5C6c9dE3146f53029e',
    abi: gatewayAbi.abi as any
  } as const

  const masterPoolContract = {
    address: '0x04f1A5b9BD82a5020C49975ceAd160E98d8B77Af',
    abi: masterPoolAbi.abi as any
  } as const

  // Gateway pool read
  const { data: gatewaycrvLSD } = useContractRead({
    address: gatewayContract.address,
    abi: gatewayContract.abi,
    functionName: 'ydLSD',
  })

  // Masterpool read balance
  const { data: masterPoolBalance, error: masterPoolError } = useContractRead({
    address: masterPoolContract.address,
    abi: masterPoolContract.abi,
    functionName: 'balanceOf',
    args: [account ? account : '']
  })

  const { config: configDeposit, error: errorDeposit } = usePrepareContractWrite({
    address: gatewayContract.address,
    abi: gatewayContract.abi,
    functionName: 'deposit',
    value: amountToTransfer ? BigInt(amountToTransfer/6) : undefined,
  })
  const { data: dataDeposit, write: writeDeposit } = useContractWrite(configDeposit)

  const { data: waitForTransactionData, isLoading } = useWaitForTransaction({
    hash: dataDeposit?.hash,
  })

  const onDeposit = () => {
      // console.log('amountToTransfer ->', BigInt(amountToTransfer))
      writeDeposit?.()
  }

  useEffect(() => {
    // console.log('data ->', dataDeposit)
    console.log('accountAddress ->', account)
    console.log('errorDeposit ->', errorDeposit)
    console.log('dataDeposit ->', dataDeposit)
    console.log('dataDeposit ->', waitForTransactionData)
    console.log('masterPoolBalance ->', masterPoolBalance)
    console.log('masterPoolError ->', masterPoolError)
  },[errorDeposit, account, dataDeposit, masterPoolBalance, waitForTransactionData, masterPoolError])

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <Button 
        className='my-2 text-xl font-bold w-full' 
        disabled={!writeDeposit || !amountToTransfer}
        onClick={() => onDeposit()}
        >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" />  : 'Deposit'}
      </Button>
    </div>
  )
}

