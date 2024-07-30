import { useAtom } from 'jotai'
import React from 'react'
import { selectedEditInvoice } from '../utils/atoms'
import {
  Button,
  Grid,
  Modal,
  Timeline,
  Text,
  Fieldset,
  TextInput
} from '@mantine/core'
import {
  Ri4kFill,
  RiAuctionFill,
  RiFilePdf2Fill
} from 'react-icons/ri'

// type TimeLineItem = {
//   title: string,
//   date: string,
//   bullet: React.ReactNode,
// }

type InvoiceDetailModalProps = {
  open: boolean,
  close: () => void
}

const InvoiceDetailModal: React.FC<InvoiceDetailModalProps> = (props: InvoiceDetailModalProps) => {
  const [invoice] = useAtom(selectedEditInvoice)

  const renderTimeLine = () => (
    <Timeline
      active={1}
      bulletSize={24}
      lineWidth={2}
      color='teal'
    >
      <Timeline.Item bullet={<RiAuctionFill size={12} />} title="Bid Completed">
        <Text c="dimmed" size="sm">
          Customer Have Won the Bid
        </Text>
        <Text size="xs" mt={4}>
          05/20/2024
        </Text>
      </Timeline.Item>
      <Timeline.Item bullet={<Ri4kFill size={12} />} title="Invoice Paid">
        <Text c="dimmed" size="sm">

        </Text>
        <Text size="xs" mt={4}>
          05/20/2024
        </Text>
      </Timeline.Item>
      <Timeline.Item title="Pickedup / Shipped" bullet={<Ri4kFill size={12} />} lineVariant="dashed">
        <Text c="dimmed" size="sm">

        </Text>
      </Timeline.Item>
      <Timeline.Item title="Completed" bullet={<Ri4kFill size={12} />}>
        <Text c="dimmed" size="sm">

        </Text>
      </Timeline.Item>
    </Timeline>
  )

  const renderInvoiceDetail = () => (
    <div>
      <Fieldset legend="Customer information">
        <TextInput label="Name" value={invoice.buyerName} />
        <TextInput label="Email" value={invoice.buyerEmail} />
        <TextInput label="Address" value={invoice.buyerAddress} />
      </Fieldset>
    </div>
  )

  return (
    <Modal
      opened={props.open}
      onClose={props.close}
      size="xl"
      title={<h2>Edit Invoice {invoice.invoiceNumber}</h2>}
      closeOnClickOutside={false}
      centered
    >
      <Grid>
        <Grid.Col span={6}>
          {renderInvoiceDetail()}
        </Grid.Col>
        <Grid.Col span={6}>
          {renderTimeLine()}
        </Grid.Col>
      </Grid>
      <div className='flex justify-between w-full p-3 mt-3'>
        <Button color='gray' onClick={props.close}>Close</Button>
        <Button color='red'><RiFilePdf2Fill /> Download PDF</Button>
        <Button color='teal'>Confirm Changes</Button>
      </div>
    </Modal>
  )
}

export default InvoiceDetailModal