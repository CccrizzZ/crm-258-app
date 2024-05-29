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
    time: string,
    items: InvoiceItem[],
}

export enum InvoiceStatus {
    Issued,
    Paid,
    Pickedup,
    Expired,
}

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

export type PaymentMethod = 'card' | 'cash' | 'etransfer'

export type Buyer = {
    name: string,
    email?: string,
    phone?: string,
    address?: string

}