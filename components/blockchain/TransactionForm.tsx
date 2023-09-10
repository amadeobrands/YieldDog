'use client'
import { useState } from 'react'

const TransactionForm = () => {

  const [ transferState, setTransferState ] = useState<string>('deposit')

  return (
    <form
      className='border-2 border-border m-3 p-4 mx-auto md:w-full lg:w-1/2'
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <h1>Deposit/Withdraw</h1>
    </form>
  )
}

export default TransactionForm
