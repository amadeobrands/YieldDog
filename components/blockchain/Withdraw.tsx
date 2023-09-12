import Link from 'next/link'
import { useEffect, useState, useMemo } from 'react'

// UI components
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

// Web3 Hooks
import { usePrepareContractWrite, useContractWrite, useContractRead, useWaitForTransaction} from 'wagmi'

// Abi's
import gatewayAbi from '../../abi/Gateway.json'
import masterPoolAbi from '../../abi/masterPool.json'

interface DepositProps {
  amountToTransfer: string | number | bigint | undefined;
  account: string | undefined;           
}
type EthereumAddress = `0x${string}`

export const Withdraw = ({ amountToTransfer, account }: DepositProps) => {

  const [ message, setMessage ] = useState<string>('')

  const gatewayContract = {
    address: process.env.NEXT_PUBLIC_GATEWAY_ADDRESS as EthereumAddress,
    abi: gatewayAbi.abi as any
  } as const

  const masterPoolContract = {
    address: process.env.NEXT_PUBLIC_MASTERPOOL_ADDRESS as EthereumAddress,
    abi: masterPoolAbi.abi as any
  } as const

  console.log('MASTERPOOL_ADDRESS', process.env.NEXT_PUBLIC_MASTERPOOL_ADDRESS)

// Approve function for ETH
const { config: approveSpend, error: approveSpendError } = usePrepareContractWrite({
  address: masterPoolContract.address,
  abi: masterPoolContract.abi,
  functionName: 'approve',
  args: [gatewayContract.address, amountToTransfer ? amountToTransfer : ''],
  chainId: 1,
})
const { data: approveSpendData, write: writeApproveSpend, isLoading: loadingSpend } = useContractWrite(approveSpend)

// Allowance
const { data: masterPoolAllowance, error: masterPoolAllowanceError } = useContractRead({
  address: masterPoolContract.address,
  abi: masterPoolContract.abi,
  functionName: 'allowance',
  args: [account, gatewayContract.address]
})

const { config: configWithdraw, error: errorWithdraw } = usePrepareContractWrite({
  address: gatewayContract.address,
  abi: gatewayContract.abi,
  functionName: 'redeem',
  args: [amountToTransfer],
  enabled: false,
})
const { data: dataWithdraw, write: writeWithdraw, isLoading } = useContractWrite(configWithdraw)

const { data: waitForTransactionData } = useWaitForTransaction({
  hash: dataWithdraw?.hash,
})

useMemo(() => {
  if (waitForTransactionData?.transactionHash) {
    setMessage(waitForTransactionData?.transactionHash)
  }
},[waitForTransactionData])

  const onApproveSpending = () => {
      console.log('Approved')
      writeApproveSpend?.()
  }

  const onWithdraw = () => {
    console.log('Withdraw')
    writeWithdraw?.()
  }

  useEffect(() => {
    console.log('amountToTransfer', amountToTransfer)
    console.log('errorWithdraw', errorWithdraw)
    console.log('dataWithdraw', dataWithdraw)
    console.log('masterPoolAllowance', masterPoolAllowance)
    console.log('masterPoolAllowanceError', masterPoolAllowanceError)
  }, [amountToTransfer, errorWithdraw, dataWithdraw, masterPoolAllowance, masterPoolAllowanceError])

  return (
    <>
      <div className='flex flex-col items-center justify-center w-full'>
      <Button 
        className='my-2 text-xl font-bold w-full' 
        // disabled={loadingETH  || !amount.some(value => Number(value) > 0) || true}
        onClick={() => onApproveSpending()}
        >
          Approve
        {/* {isLoading ? <Loader2 className="h-4 w-4 animate-spin" />  : 'Approve'} */}
      </Button>
      <Button 
        className='my-2 text-xl font-bold w-full' 
        disabled={!masterPoolAllowance}
        onClick={() => onWithdraw()}
        >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" />  : 'Withdraw'}
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
