export type Invoice = {
    invoiceNumber: number,
    buyerName: string,
    buyerEmail: string,
    buyerAddress: string,
    paymentMethod: PaymentMethod,
    auctionLot: number,
    invoiceTotal: number,
    buyersPremium: number,
    totalHandlingFee: number,
    status: InvoiceStatus,
    isShipping: boolean,
    isRedflag: boolean,
    time: string,
    timePickedup: string,
    items: InvoiceItem[],
}

export type InvoiceStatus = 'unpaid' | 'paid' | 'pickedup' | 'shipped' | 'expired' | 'returned' | ''
export type PaymentMethod = 'card' | 'cash' | 'etransfer' | 'storeCredit' | ''

export type InvoiceItem = {
    msrp: number,
    shelfLocation: string,
    sku: number
    itemLot: number,
    desc: string,
    unit: number,
    unitPrice: number,
    extendedPrice: number, // unit * unitPrice
    handlingFee: number,
}

export type Buyer = {
    name: string,
    email?: string,
    phone?: string,
    address?: string,
}

export type InvoiceFilter = {
    invoiceNumber: number,
    paymentMethod: string[],
    status: string[],
    shipping: string,
    // dateRange: [Date | null, Date | null],
    fromDate: Date | null,
    toDate: Date | null,
    invoiceTotalRange: { min: number, max: number }
    keyword: string,
}

export type InvoiceEvent = {
    title: string,
    desc: string,
    time: string,
    type: 'communication' | 'pickup' | 'expire'
}