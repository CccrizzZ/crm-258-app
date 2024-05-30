import { Faker, faker } from '@faker-js/faker'
import { Invoice, InvoiceItem, PaymentMethod } from './Type'

const payments = ['card', 'cash', 'etransfer', 'storeCredit']

export const generateInvoice = (): Invoice => ({
  invoiceNumber: faker.number.int({ min: 10000, max: 99999 }),
  time: faker.date.anytime().toLocaleString("en-US"),
  buyerName: faker.person.fullName(),
  buyerEmail: faker.internet.email(),
  auctionLot: faker.number.int({ min: 100, max: 1000 }),
  invoiceTotal: faker.number.float({ min: 6, max: 600 }),
  buyersPremium: faker.number.int({ min: 1, max: 30 }),
  totalHandlingFee: faker.number.int({ min: 1, max: 30 }),
  status: faker.number.int({ min: 0, max: 3 }),
  paymentMethod: payments[Math.floor(Math.random() * payments.length)] as PaymentMethod,
  isShipping: faker.datatype.boolean(),
  isRedflag: false,
  items: generateInvoiceItem()
})

export const generateInvoiceItem = (): InvoiceItem[] => {
  const items: InvoiceItem[] = []
  for (let i = 0; i < 10; i++) {
    items.push({
      msrp: faker.number.float({ min: 5, max: 800 }),
      shelfLocation: faker.string.alphanumeric({ length: 3 }),
      sku: faker.number.int({ min: 10000, max: 50000 }),
      itemLot: faker.number.int({ min: 100, max: 2000 }),
      desc: faker.lorem.paragraph(),
      unit: faker.number.int({ min: 1, max: 4 }),
      unitPrice: faker.number.float({ min: 5, max: 800 }),
      extendedPrice: faker.number.float({ min: 20, max: 2000 }),
      handlingFee: 1
    })
  }
  return items
}

// generate an invoice array with x amount of items on each invoice
export const getRandomInvoiceArr = (amt: number): Invoice[] => {
  const invoiceArr: Invoice[] = []
  for (let i = 0; i < amt; i++) {
    invoiceArr.push(generateInvoice())
  }
  return invoiceArr
}