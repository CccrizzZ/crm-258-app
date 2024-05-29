import { atom } from 'jotai'
import { Invoice } from './Type'
import { getRandomInvoiceArr } from './mockData'

export const citiesAtom = atom<string[]>(['New York', 'Toronto', 'Detroit'])

export const isLoadingAtom = atom<boolean>(false)
// contains paged invoices data
export const invoiceArr = atom<Invoice[]>(getRandomInvoiceArr(100))