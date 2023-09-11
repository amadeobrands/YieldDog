'use client'
import { useState, useEffect, useMemo } from 'react'

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

// Web3 hooks + utils
import { useAccount, useBalance, useFeeData } from 'wagmi'
import { Deposit } from '@/components/blockchain/Deposit'
import { Withdraw } from '@/components/blockchain/Withdraw'
import { useDebounce } from 'use-debounce'
import { parseEther } from 'viem'


// Helper functions
import { formatBigNumber } from '@lib/utils/format.bigNumber'


const TransactionForm = () => {

  const [ transferState, setTransferState ] = useState<string>('deposit')
  const [ amount, setAmount ] = useState<string>('')
  const [ debouncedAmount ] = useDebounce(amount, 500)
  const [ sendAmountBigNum ,setSendAmountBigNum ] = useState<(string | number | bigint | undefined)>()
  const [ baseFee, setBaseFee ] = useState<string>('')
  const [ transactionFees, setTransactionFees ] = useState('')


  const handleTabChange: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    console.log('transferState ->', transferState)
    setTransferState(event.currentTarget.dataset.value as any)
  }


  // ! ---------------Web3 user wallet hooks---------------
  // Account state - fetches users wallet address
  const { address: accountAddress } = useAccount()

  // User token balances
  const {data: balanceInfo } = useBalance({
    address: accountAddress,
  })

  // Fetches Gas fee data
  const { data: dataGasFee, isError: isErrorGasFee, isLoading: isLoadingGasFee } = useFeeData({
    watch: true,
  })


  // Check input values are valid and parse to Ether
  useMemo(() => {
    const isValid = /^[0-9.]+$/.test(debouncedAmount)
      if (!isValid) {
        return 0
      } else {
        setSendAmountBigNum(Number(parseEther(debouncedAmount))) 
      }
  }, [debouncedAmount])

  useMemo(() => {
    if (sendAmountBigNum) {
      const baseFeeCalc = Number(sendAmountBigNum) * 0.002
      const formattedFee = formatBigNumber(BigInt(baseFeeCalc))
      setBaseFee(formattedFee)
    }
  }, [sendAmountBigNum])

  useMemo(() => {
    if (baseFee && dataGasFee?.gasPrice) {
      const calc = dataGasFee.gasPrice
      const formatedAmount = formatBigNumber(calc)
      console.log('TotalFee,', formatBigNumber(calc))
      console.log('TotalFee,', calc)
      setTransactionFees(formatedAmount)
    }
  },[baseFee, dataGasFee])


  useEffect(() => {
    console.log('sendAmountBigNum ->', typeof sendAmountBigNum)
    // if (dataGasFee) console.log('Gas fee ->', formatBigNumber(dataGasFee?.gasPrice))

    if (sendAmountBigNum) console.log('base fee ->',  baseFee)

  }, [baseFee])

  const handleMaxAmount = () => {
    if (balanceInfo?.value) {
      setAmount(formatBigNumber(balanceInfo?.value))
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
            <p className='text-sm'>{!balanceInfo || balanceInfo.value === undefined ? 
              '--'
              : 
              formatBigNumber(balanceInfo?.value)}
            </p>
            <p onClick={handleMaxAmount} className='underline underline-offset-2 text-primary/70 hover:cursor-pointer ml-3'>Max</p>
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
                    {isLoadingGasFee ? 
                    <Loader2 className="h-4 w-4 animate-spin" />  
                    : 
                    (dataGasFee && dataGasFee.gasPrice !== null && dataGasFee.gasPrice !== undefined) 
                      ? formatBigNumber(dataGasFee.gasPrice) 
                      : '--'
                    }
                  </div>
                  <div className='mb-2'>
                    <h6 className='text-primary'>Base Fee</h6>
                    <p className='ml-2 text-sm text-muted'>{baseFee? baseFee : '--'}</p>
                  </div>
                  <div className='mb-2'>
                    <h6 className='text-primary'>Slippage</h6>
                    <p className='ml-2 text-sm text-muted'>0.0000123</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p>{transactionFees ? transactionFees : '--'}</p>
        </div>
        <div className='flex justify-between items-center my-3 text-sm'>
          <p>Fee settings</p>
          <Settings />
          {/* <p>{gasFeeData.data?.gasPrice ? formatEther(gasFeeData.data?.gasPrice) : '0'}</p> */}
        </div>
      </div>
      {transferState === 'deposit' ?
        <Deposit amountToTransfer={sendAmountBigNum} />
        :
        <Withdraw />
    }
      
    </form>
  )
}

export default TransactionForm
