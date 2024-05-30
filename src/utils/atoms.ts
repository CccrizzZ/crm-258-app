import { atom } from 'jotai'
import { Invoice, InvoiceFilter } from './Type'
import { getRandomInvoiceArr } from './mockData'

export const citiesAtom = atom<string[]>(['New York', 'Toronto', 'Detroit'])

export const isLoadingAtom = atom<boolean>(false)

// contains paged invoices data
export const invoiceArrAtom = atom<Invoice[]>(getRandomInvoiceArr(100))

// filters for invoices data
export const initInvoiceFilter = {
    paymentMethod: [],
    status: []
}
export const invoiceFilterAtom = atom<InvoiceFilter>(initInvoiceFilter)