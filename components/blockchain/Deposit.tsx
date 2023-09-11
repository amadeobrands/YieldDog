
// UI components
import { Button } from '@components/ui/button'

// Web3 Hooks
import { usePrepareContractWrite, useContractWrite} from 'wagmi'

export const Deposit = (amountToTransfer: any) => {

  // const swapContract = {
  //   address: 
  //   abi:
  // }

  const onDeposit = () => {
      console.log('Approved')
      console.log('amountToTransfer ->', amountToTransfer)
  }


  return (
    <div className='flex flex-col items-center justify-center w-full'>
        <Button 
          className='my-2 text-xl font-bold w-full' 
          // disabled={loadingETH  || !amount.some(value => Number(value) > 0) || true}
          onClick={() => onDeposit()}
          >
            Deposit
          {/* {isLoading ? <Loader2 className="h-4 w-4 animate-spin" />  : 'Approve'} */}
        </Button>
      </div>
  )
}

