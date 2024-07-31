import { atom } from 'jotai'
import { Invoice, InvoiceFilter, InvoiceStatus, PaymentMethod } from './Type'

export const citiesAtom = atom<string[]>(['New York', 'Toronto', 'Detroit'])

export const isLoadingAtom = atom<boolean>(false)

// contains paged invoices data
export const invoiceArrAtom = atom<Invoice[]>([])

// filters for invoices data
export const initInvoiceFilter: InvoiceFilter = {
    invoiceNumber: 0,
    paymentMethod: [],
    status: [],
    shipping: '',
    // dateRange: [null, null],
    fromDate: null,
    toDate: null,
    invoiceTotalRange: { min: 0, max: 999999 },
    keyword: ''
}
export const invoiceFilterAtom = atom<InvoiceFilter>(initInvoiceFilter)

export const initInvoice = {
    invoiceNumber: 0,
    buyerName: '',
    buyerEmail: '',
    buyerAddress: '',
    paymentMethod: '' as PaymentMethod,
    auctionLot: 0,
    invoiceTotal: 0,
    buyersPremium: 0,
    totalHandlingFee: 0,
    status: '' as InvoiceStatus,
    isShipping: false,
    isRedflag: false,
    time: '',
    timePickedup: '',
    items: [],
}
export const selectedEditInvoice = atom<Invoice>(initInvoice)