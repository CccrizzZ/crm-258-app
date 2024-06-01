export type Invoice = {
    invoiceNumber: number,
    buyerName: string,
    buyerEmail: string,
    paymentMethod: PaymentMethod,
    auctionLot: number,
    invoiceTotal: number,
    buyersPremium: number,
    totalHandlingFee: number,
    status: InvoiceStatus,
    isShipping: boolean,
    isRedflag: boolean,
    timeCreated: string,
    timePickedup: string,
    items: InvoiceItem[],
}

export type InvoiceStatus = 'issued' | 'paid' | 'pickedup' | 'shipped' | 'expired' | 'returned'
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
    paymentMethod: string[],
    status: string[],
    shipping: string,
    dateRange: [Date | null, Date | null],
    invoiceTotalRange: { min: number, max: number }
    keyword: string,
}