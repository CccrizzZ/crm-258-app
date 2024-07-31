import { RiBankCardFill, RiCashFill, RiMailLockFill, RiCoinsFill } from "react-icons/ri";

// server addy from .env
export const server = import.meta.env.VITE_APP_SERVER
// check if two object have identical keys and values
export const isObjectsEqual = (a: Object, b: Object) => JSON.stringify(a) === JSON.stringify(b)
// for all number input
export const stringToNumber = (input: string) => isNaN(Number(input)) ? 0 : Number(input)
// sleep function
export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));




export const getPaymentIcon = (method: string) => {
  if (method === 'card') {
    return (
      <div className='flex gap-2 leading-none'>
        <RiBankCardFill color='#3b82f6' />
        Card
      </div>
    )
  } else if (method === 'cash') {
    return (
      <div className='flex gap-2 leading-none'>
        <RiCashFill color='mediumseagreen' />
        Cash
      </div>
    )
  } else if (method === 'etransfer') {
    return (
      <div className='flex gap-2 leading-none'>
        <RiMailLockFill color='indianred' />
        E-Transfer
      </div>
    )
  } else if (method === 'storeCredit') {
    return (
      <div className='flex gap-2 leading-none'>
        <RiCoinsFill color='burlywood' />
        Store Credit
      </div>
    )
  }
}

export const getStatusColor = (stat: string): string => {
  if (stat === 'unpaid') {
    return 'orange'
  } else if (stat === 'paid') {
    return 'blue'
  } else if (stat === 'pickedup') {
    return 'green'
  } else if (stat === 'expired') {
    return 'red'
  } else if (stat === 'shipped') {
    return 'lime'
  } else if (stat === 'returned') {
    return 'red'
  }
  return 'blue'
}
