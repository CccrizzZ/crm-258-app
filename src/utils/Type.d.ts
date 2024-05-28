type Invoice = {
    invoiceNumber: number,
    time: string,
    buyerName: string,
    buyerEmail: string,
    auctionLot: number,
    invoiceTotal: number,
    buyersPremium: number,
    totalHandlingFee: number,
    items: InvoiceItem[],
}

type InvoiceItem = {
    msrp: number,
    shelfLocation: string,
    sku: string
    itemLot: number,
    desc: string,
    unit: number,
    unitPrice: number,
    extendedPrice: number, // unit * unitPrice
    handlingFee: number,
}