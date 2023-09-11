
// UI components
import { Button } from '@/components/ui/button'

// Web3 Hooks
import { usePrepareContractWrite, useContractWrite} from 'wagmi'

export const Withdraw = () => {

// Approve function for ETH
// const { config: approveETH, error: approveError } = usePrepareContractWrite({
//   address: WSTETH_ADDRESS,
//   abi: wstEthAbi,
//   functionName: 'approve',
//   args: [POOL_ADDRESS, amount],
//   chainId: 1,
// })
// const { write: writeApproveWSTETH, isLoading: loadingWstETH } = useContractWrite(approveWstETH)


  const onApproveSpending = () => {
      console.log('Approved')
  }


  return (
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
          // disabled={loadingETH  || !amount.some(value => Number(value) > 0) || true}
          // onClick={() => onApproveSpending()}
          >
            Withdraw
          {/* {isLoading ? <Loader2 className="h-4 w-4 animate-spin" />  : 'Approve'} */}
        </Button>
      </div>
  )
}
