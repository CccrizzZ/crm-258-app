import React, { useEffect, useState } from 'react'
import {
  Button,
  Grid,
  Modal,
  Timeline,
  Text,
  Fieldset,
  TextInput,
  Textarea,
  Select
} from '@mantine/core'
import {
  RiAddFill,
  RiFilePdf2Fill,
  RiFileTextLine
} from 'react-icons/ri'
import { Invoice } from '../utils/Type'
import { isObjectsEqual, stringToNumber } from '../utils/utils'

type InvoiceDetailModalProps = {
  selected: Invoice,
  open: boolean,
  close: () => void,
}

const InvoiceDetailModal: React.FC<InvoiceDetailModalProps> = (props: InvoiceDetailModalProps) => {
  const [newInvoice, setNewInvoice] = useState<Invoice>({} as Invoice)

  useEffect(() => {
    if (props.open) {
      setNewInvoice(props.selected)
    }
  }, [props.open])

  // will render according to 
  const renderTimeLine = () => (
    <Timeline
      active={1}
      bulletSize={24}
      lineWidth={2}
      color='teal'
    >
      {newInvoice.invoiceEvent !== undefined ? newInvoice.invoiceEvent.map((val, index) => (
        <Timeline.Item
          key={index + val.time}
          bullet={<RiFileTextLine />}
          title={val.title}
        >
          <Text c="dimmed" size="sm">
            {val.desc}
          </Text>
          <Text size="xs" mt={4}>
            {val.time}
          </Text>
        </Timeline.Item>
      )) : <></>}
    </Timeline>
  )

  const renderInvoiceDetail = () => (
    <div className='gap-6 grid'>
      <Fieldset legend="🧍‍♂️ Customer information" className='gap-3 grid'>
        <TextInput
          label="Name"
          value={newInvoice.buyerName}
          onChange={(e) => {
            setNewInvoice({ ...newInvoice, buyerName: e.target.value })
          }}
        />
        <TextInput
          label="Email"
          value={newInvoice.buyerEmail}
          onChange={(e) => {
            setNewInvoice({ ...newInvoice, buyerEmail: e.target.value })
          }}
        />
        <Textarea
          label="Address"
          value={newInvoice.buyerAddress}
          onChange={(e) => {
            setNewInvoice({ ...newInvoice, buyerAddress: e.target.value })
          }}
        />
      </Fieldset>
      <Fieldset legend="📜 Invoice Status" className='gap-3 grid'>
        <TextInput
          type='number'
          label="Auction Lot"
          value={newInvoice.auctionLot}
          onChange={(e) => {
            setNewInvoice({ ...newInvoice, auctionLot: stringToNumber(e.target.value) })
          }}
        />
        <Select
          label="Is Shipping"
          data={['Shipping', 'Pickup']}
          value={newInvoice.isShipping ? 'Shipping' : 'Pickup'}
          onChange={(val: string | null) => {
            val === 'Shipping' ? setNewInvoice({ ...newInvoice, isShipping: true }) : val === 'Pickup' ? setNewInvoice({ ...newInvoice, isShipping: false }) : <></>
          }}
        />
        <Select
          label="Payment Method"
          data={['Card', 'Cash', 'Etransfer', 'Store Credit', '']}
          value={newInvoice.paymentMethod}
          onChange={(val: string | null) => {
            switch (val) {
              case 'card':
                return 'Card'
              case 'cash':
                return 'Cash'
              case 'etransfer':
                return "Etransfer"
              case 'storeCredit':
                return "Store Credit"
              default:
                return
            }
          }}
        />
      </Fieldset>
    </div>
  )

  const renderItemTable = () => {

  }

  return (
    <Modal
      opened={props.open}
      onClose={props.close}
      size="xl"
      title={
        <div className='flex justify-between w-full'>
          <h1>Edit Invoice {newInvoice.invoiceNumber}</h1>
        </div>
      }
      closeOnClickOutside={false}
      centered
    >
      <div className='flex justify-between w-full p-3 mt-3'>
        <Button color='red'><RiFilePdf2Fill />View PDF</Button>
        <Button color='teal'><RiAddFill />Add Event</Button>
      </div>
      <Grid>
        <Grid.Col span={6}>
          {renderInvoiceDetail()}
        </Grid.Col>
        <Grid.Col span={6} className='p-6'>
          {renderTimeLine()}
        </Grid.Col>
      </Grid>
      <div className='flex justify-between w-full p-3 mt-3'>
        <Button color='gray' onClick={props.close}>Close</Button>
        <Button color={isObjectsEqual(props.selected, newInvoice) ? 'teal' : "orange"}>Update</Button>
      </div>
    </Modal>
  )
}

export default InvoiceDetailModal