'use client'
import { useState } from 'react'

// UI Components
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


// icons
import { ArrowDown, Settings, Loader2, Info } from 'lucide-react'
const TransactionForm = () => {

  const [ transferState, setTransferState ] = useState<string>('deposit')
  const [amount, setAmount] = useState<string>('')


  const handleTabChange: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    console.log('transferState ->', transferState)
    setTransferState(event.currentTarget.dataset.value as any)
  }

  const onApproveSpending = () => {
    if (transferState === 'deposit') {
      console.log('Approved')
      // writeApproveETH?.()
    }
  }


  return (
    <form
      className='border-2 border-border rounded-xl m-3 p-4 mx-auto md:w-full'
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <div className='pb-3'>
        <Tabs defaultValue='deposit' className='w-full lg:w-4/5 my-3 mx-auto'>
          <TabsList className='w-full'>
            <TabsTrigger className='w-full' onClick={handleTabChange} value="deposit" data-value="deposit">Deposit</TabsTrigger>
            <TabsTrigger className='w-full' onClick={handleTabChange}  value="withdraw" data-value="withdraw">Withdraw</TabsTrigger>
            <TabsTrigger className='w-full' onClick={handleTabChange}  value="swap" data-value="swap">Swap</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className=''>
      <div className='flex flex-col justify-between items-center mt-3 p-3 bg-card rounded-lg border border-primary'>
        <div className='flex justify-between items-center w-full'>
          <Input 
            aria-label="Amount ETH" 
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.05"
            className='md:placeholder:text-xl text-xl bg-card'
            value={amount} 
          />
          <div className='flex items-center gap-1 border border-primary/70 rounded-xl p-2 shrink-0'>
            {/* <Image alt='icon' src={props.tokens[0].icon} className='inline-block align-middle mr-1' height={20} width={20} /> */}
            <label className='px-1' htmlFor="amount">ETH</label>
          </div>

          </div>
          <div className='flex justify-between items-center w-full mt-2'>
            <p>23.23432</p>
            {/* <p className='text-sm'>{!ethBalance.data?.value ? 
              '--'
              : 
              formatToNormalizedAmount(ethBalance.data?.value)}
            </p> */}
            {/* <p onClick={() => maxAmount(0)} className='underline underline-offset-2 text-primary/70 hover:cursor-pointer ml-3'>Max</p> */}
          </div>
        </div>
        <div className='flex justify-center my-4'>
          <ArrowDown  />
        </div>
        <div className='flex flex-col justify-between items-center mt-3 p-3 bg-card rounded-lg border border-primary'>
          <div className='flex justify-between items-center w-full'>
            <Input 
              aria-label="Amount MaxETH" 
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.05"
              className='md:placeholder:text-xl text-xl bg-card'
              value={amount} 
            />
            <div className='flex items-center gap-1 border border-primary/70 rounded-xl p-2 shrink-0'>
              {/* <Image alt='icon' src={props.tokens[0].icon} className='inline-block align-middle mr-1' height={20} width={20} /> */}
              <label className='px-1' htmlFor="amount">MaxETH</label>
            </div>
          </div>
          <div className='flex justify-between items-center w-full mt-2'>
            <p>0</p>
            {/* <p className='text-sm'>{!ethBalance.data?.value ? 
              '--'
              : 
              formatToNormalizedAmount(ethBalance.data?.value)}
            </p> */}
            {/* <p onClick={() => maxAmount(0)} className='underline underline-offset-2 text-primary/70 hover:cursor-pointer ml-3'>Max</p> */}
          </div>
        </div>
        <div className='flex justify-between items-center my-3 text-sm'>
          <div className='flex'>
            <p>Transaction fees</p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger><Info className='h-4 w-4 ml-2' /></TooltipTrigger>
                <TooltipContent>
                  <div className='mb-2'>
                    <h6 className='text-primary'>Gas Fee</h6>
                    <p className='ml-2 text-sm text-muted'>0.0000123</p>
                  </div>
                  <div className='mb-2'>
                    <h6 className='text-primary'>Base Fee</h6>
                    <p className='ml-2 text-sm text-muted'>0.0000123</p>
                  </div>
                  <div className='mb-2'>
                    <h6 className='text-primary'>Slippage</h6>
                    <p className='ml-2 text-sm text-muted'>0.0000123</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <p>0.0000123</p>
          {/* <p>{gasFeeData.data?.gasPrice ? formatEther(gasFeeData.data?.gasPrice) : '0'}</p> */}
        </div>
        <div className='flex justify-between items-center my-3 text-sm'>
          <p>Fee settings</p>
          <Settings />
          {/* <p>{gasFeeData.data?.gasPrice ? formatEther(gasFeeData.data?.gasPrice) : '0'}</p> */}
        </div>
      </div>
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
          onClick={() => onApproveSpending()}
          >
            Deposit
          {/* {isLoading ? <Loader2 className="h-4 w-4 animate-spin" />  : 'Approve'} */}
        </Button>
      </div>
    </form>
  )
}

export default TransactionForm
