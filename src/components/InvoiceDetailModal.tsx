import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { selectedEditInvoice } from '../utils/atoms'
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
  Ri4kFill,
  RiAddFill,
  RiAuctionFill,
  RiFilePdf2Fill
} from 'react-icons/ri'
import { Invoice } from '../utils/Type'

type InvoiceDetailModalProps = {
  open: boolean,
  close: () => void
}

const InvoiceDetailModal: React.FC<InvoiceDetailModalProps> = (props: InvoiceDetailModalProps) => {
  const [invoice] = useAtom(selectedEditInvoice)
  const [newInvoice, setNewInvoice] = useState<Invoice>(invoice)

  // time line should render each invoice document event array
  const renderTimeLine = () => (
    <Timeline
      active={1}
      bulletSize={24}
      lineWidth={2}
      color='teal'
    >
      <Timeline.Item
        bullet={<RiAuctionFill size={12} />}
        title="Bid Completed"
      >
        <Text c="dimmed" size="sm">
          Customer Have Won the Bid
        </Text>
        <Text size="xs" mt={4}>
          05/20/2024
        </Text>
      </Timeline.Item>
      <Timeline.Item
        bullet={<Ri4kFill size={12} />}
        title="Invoice Paid"
      >
        <Text c="dimmed" size="sm">

        </Text>
        <Text size="xs" mt={4}>
          05/20/2024
        </Text>
      </Timeline.Item>
      <Timeline.Item
        title="Pickedup / Shipped"
        bullet={<Ri4kFill size={12} />}
        lineVariant="dotted"
      >
        <Text c="dimmed" size="sm">

        </Text>
      </Timeline.Item>
      <Timeline.Item
        title="Completed"
        bullet={<Ri4kFill size={12} />}
      >
        <Text c="dimmed" size="sm">

        </Text>
      </Timeline.Item>
    </Timeline>
  )

  const renderInvoiceDetail = () => (
    <div>
      <Fieldset legend="Customer information">
        <TextInput label="Name" value={newInvoice.buyerName} />
        <TextInput label="Email" value={newInvoice.buyerEmail} />
        <Textarea
          label="Address"
          value={newInvoice.buyerAddress}
        />
      </Fieldset>

      <Fieldset legend="Invoice Status">
        <TextInput label="Email" value={newInvoice.auctionLot} />
        {/* <TextInput label="Shipping" value={newInvoice.isShipping} /> */}
        <Select
          label="Shipping"
          placeholder="Shipping"
          data={['Shipping', 'Pickup']}
          value={newInvoice.isShipping ? 'Shipping' : 'Pickup'}
          onChange={(val: string | null) => {
            val === 'Shipping' ? setNewInvoice({ ...newInvoice, isShipping: true }) : setNewInvoice({ ...newInvoice, isShipping: false })
          }}
        />
      </Fieldset>
    </div>
  )

  return (
    <Modal
      opened={props.open}
      onClose={props.close}
      size="xl"
      title={
        <div className='flex justify-between w-full'>
          <h1>Edit Invoice {invoice.invoiceNumber}</h1>
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
        <Button color='teal'>Update</Button>
      </div>
    </Modal>
  )
}

export default InvoiceDetailModal