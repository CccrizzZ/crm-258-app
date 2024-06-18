import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { selectedEditInvoice } from '../utils/atoms'
import {
  Button,
  Grid,
  Modal,
  Timeline,
  Text
} from '@mantine/core'
import {
  Ri4kFill,
  RiAuctionFill
} from 'react-icons/ri'

type TimeLineItem = {
  title: string,
  date: string,
  bullet: React.ReactNode,
}

type EditInvoiceModalProps = {
  open: boolean,
  close: () => void
}

const EditInvoiceModal: React.FC<EditInvoiceModalProps> = (props: EditInvoiceModalProps) => {
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
      <Timeline.Item bullet={<Ri4kFill size={12} />} title="Commits">
        <Text c="dimmed" size="sm">

        </Text>
        <Text size="xs" mt={4}>
          05/20/2024
        </Text>
      </Timeline.Item>
      <Timeline.Item title="Pull request" bullet={<Ri4kFill size={12} />} lineVariant="dashed">
        <Text c="dimmed" size="sm">

        </Text>
      </Timeline.Item>
      <Timeline.Item title="Code review" bullet={<Ri4kFill size={12} />}>
        <Text c="dimmed" size="sm">

        </Text>
      </Timeline.Item>
    </Timeline>
  )

  return (
    <Modal
      opened={props.open}
      onClose={props.close}
      size="xl"
      title={`Edit Invoice ${invoice.invoiceNumber}`}
      closeOnClickOutside={false}
      centered
    >
      <Grid>
        <Grid.Col span={6}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut reprehenderit doloremque sunt numquam quia cum mollitia nobis totam eos minus. Commodi voluptate doloremque sequi repellat necessitatibus, sunt blanditiis rerum dicta?
        </Grid.Col>
        <Grid.Col span={6}>
          {renderTimeLine()}
        </Grid.Col>
      </Grid>
      <div className='flex justify-between w-full p-3 mt-3'>
        <Button color='gray' onClick={props.close}>Close</Button>
        <Button color="teal">Confirm Changes</Button>
      </div>
    </Modal>
  )
}

export default EditInvoiceModal