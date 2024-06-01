import { atom } from 'jotai'
import { Invoice, InvoiceFilter } from './Type'

export const citiesAtom = atom<string[]>(['New York', 'Toronto', 'Detroit'])

export const isLoadingAtom = atom<boolean>(false)

// contains paged invoices data
export const invoiceArrAtom = atom<Invoice[]>([])

// filters for invoices data
export const initInvoiceFilter: InvoiceFilter = {
    paymentMethod: [],
    status: [],
    shipping: '',
    dateRange: [null, null],
    invoiceTotalRange: { min: 0, max: 0 },
    keyword: ''
}
export const invoiceFilterAtom = atom<InvoiceFilter>(initInvoiceFilter)