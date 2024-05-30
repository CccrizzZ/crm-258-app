import { ActionIcon, Badge, Card, Grid, Menu, MultiSelect, Select, Switch, Table } from '@mantine/core'
import { invoiceArrAtom, invoiceFilterAtom, isLoadingAtom } from '../utils/atoms'
import { useAtom } from 'jotai'
import { InvoiceStatus } from '../utils/Type.ts'
import {
  RiBankCardFill,
  RiCashFill,
  RiCoinsFill,
  RiMailLockFill,
  RiMailSendLine,
  RiMenuFill,
  RiUserFill
} from 'react-icons/ri'
import { AreaChart, BarChart } from '@mantine/charts'
import { DateInput } from '@mantine/dates';

const data = [
  { month: 'January', Smartphones: 1200, Laptops: 900, Tablets: 200 },
  { month: 'February', Smartphones: 1900, Laptops: 1200, Tablets: 400 },
  { month: 'March', Smartphones: 400, Laptops: 1000, Tablets: 200 },
  { month: 'April', Smartphones: 1000, Laptops: 200, Tablets: 800 },
  { month: 'May', Smartphones: 800, Laptops: 1400, Tablets: 1200 },
  { month: 'June', Smartphones: 750, Laptops: 600, Tablets: 1000 },
]

export const data2 = [
  {
    date: 'Mar 22',
    Apples: 2890,
    Oranges: 2338,
    Tomatoes: 2452,
  },
  {
    date: 'Mar 23',
    Apples: 2756,
    Oranges: 2103,
    Tomatoes: 2402,
  },
  {
    date: 'Mar 24',
    Apples: 3322,
    Oranges: 986,
    Tomatoes: 1821,
  },
  {
    date: 'Mar 25',
    Apples: 3470,
    Oranges: 2108,
    Tomatoes: 2809,
  },
  {
    date: 'Mar 26',
    Apples: 3129,
    Oranges: 1726,
    Tomatoes: 2290,
  },
]

const Invoices = () => {
  const [_, setIsLoading] = useAtom(isLoadingAtom)
  const [invoices, setInvoices] = useAtom(invoiceArrAtom)
  const [invoiceFilter, setInvoiceFilter] = useAtom(invoiceFilterAtom)

  const getPaymentIcon = (method: string) => {
    if (method === 'card') {
      return (
        <div className='flex gap-2 leading-none'>
          <RiBankCardFill color='#3b82f6' />
          Card
        </div>
      )
    } else if (method === 'cash') {
      return (
        <div className='flex gap-2 leading-none'>
          <RiCashFill color='mediumseagreen' />
          Cash
        </div>
      )
    } else if (method === 'etransfer') {
      return (
        <div className='flex gap-2 leading-none'>
          <RiMailLockFill color='indianred' />
          E-Transfer
        </div>
      )
    } else if (method === 'storeCredit') {
      return (
        <div className='flex gap-2 leading-none'>
          <RiCoinsFill color='burlywood' />
          Store Credit
        </div>
      )
    } else {
      return
    }
  }

  const getStatusColor = (stat: string): string => {
    if (stat === 'Issued') {
      return 'orange'
    } else if (stat === 'Paid') {
      return 'blue'
    } else if (stat === 'Pickedup') {
      return 'green'
    } else if (stat === 'Expired') {
      return 'red'
    }
    return 'blue'
  }

  const renderInvoicesTable = () => (
    <Table className='mt-12' verticalSpacing="md">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>#</Table.Th>
          <Table.Th>Buyer Name</Table.Th>
          <Table.Th>Buyer Email</Table.Th>
          <Table.Th>Payment Method</Table.Th>
          <Table.Th>Invoice Total</Table.Th>
          <Table.Th>Shipping</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Time</Table.Th>
          <Table.Th>Action</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {invoices.map((val, index) => (
          <Table.Tr key={index}>
            <Table.Td>{val.invoiceNumber}</Table.Td>
            <Table.Td>
              <div className='flex gap-2 leading-none'>
                <RiUserFill />
                {val.buyerName}
              </div>
            </Table.Td>
            <Table.Td>{val.buyerEmail}</Table.Td>
            <Table.Td>{getPaymentIcon(val.paymentMethod)}</Table.Td>
            <Table.Td>${val.invoiceTotal.toFixed(2)}</Table.Td>
            <Table.Td>
              {
                val.isShipping ?
                  <div className='flex gap-2 leading-none'>
                    <RiMailSendLine color='orange' />
                    Shipping
                  </div> : <></>
              }
            </Table.Td>
            <Table.Td>
              {
                <Badge color={getStatusColor(InvoiceStatus[(val.status)])}>
                  {InvoiceStatus[(val.status)]}
                </Badge>
              }
            </Table.Td>
            <Table.Td>{val.time}</Table.Td>
            <Table.Td>
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <ActionIcon color='rgba(77, 77, 77, 1)'>
                    <RiMenuFill />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Application</Menu.Label>
                  <Menu.Item leftSection={<RiCashFill />}>
                    Settings
                  </Menu.Item>
                  <Menu.Item leftSection={<RiCashFill />}>
                    Messages
                  </Menu.Item>
                  <Menu.Item leftSection={<RiCashFill />}>
                    Gallery
                  </Menu.Item>
                  <Menu.Item leftSection={<RiCashFill />}>
                    Search
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Label>Danger zone</Menu.Label>
                  <Menu.Item leftSection={<RiCashFill />}>
                    Transfer my data
                  </Menu.Item>
                  <Menu.Item color="red" leftSection={<RiCashFill />}>
                    Delete this invoice
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>

            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )

  const renderPaymentMethodSelect = () => (
    <MultiSelect
      className='mb-3'
      label="Payment Method"
      checkIconPosition="right"
      placeholder="Pick Payment Method"
      data={[
        { value: 'card', label: 'Card' },
        { value: 'cash', label: 'Cash' },
        { value: 'etransfer', label: 'E-transfer' },
        { value: 'storeCredit', label: 'Store Credit' },
      ]}
      value={invoiceFilter.paymentMethod}
      onChange={(value: string[]) => setInvoiceFilter({ ...invoiceFilter, paymentMethod: value })}
    />
  )

  const renderStatusSelect = () => (
    <MultiSelect
      className='mb-3'
      label="Invoice Status"
      checkIconPosition="right"
      placeholder="Pick Payment Method"
      data={[
        { value: '0', label: 'Issued' },
        { value: '1', label: 'Paid' },
        { value: '2', label: 'Pickedup' },
        { value: '3', label: 'Expired' },
      ]}
      value={invoiceFilter.status}
      onChange={(value: string[]) => setInvoiceFilter({ ...invoiceFilter, status: value })}
    />
  )

  const renderShippingSelect = () => (
    <Select
      className='mb-3'
      label="Shipping / Pickup"
      checkIconPosition="right"
      defaultValue='all'
      data={[
        { value: 'all', label: 'All' },
        { value: 'pickup', label: 'Show Only Pickup' },
        { value: 'shipping', label: 'Show Only Shipping' }
      ]}
      value={invoiceFilter.shipping}
      onChange={(value: string | null) => setInvoiceFilter({ ...invoiceFilter, shipping: value })}
    />
  )

  const renderDateSelect = () => {
    <DateInput
      value={invoiceFilter.startTime}
      onChange={(val) => setInvoiceFilter({ ...invoiceFilter, startTime: val })}
      label="Date input"
      placeholder="Date input"
    />
  }

  const renderFilterSection = () => (
    <Grid className='m-6'>
      <Grid.Col span={4}>
        <Card className='bg-[#222]'>
          {renderPaymentMethodSelect()}
          {renderStatusSelect()}
          {renderShippingSelect()}
        </Card>
      </Grid.Col>
      <Grid.Col span={4}>
        <Card className='bg-[#222]'>
        </Card>
      </Grid.Col>
      <Grid.Col span={4}>
        <Card className='bg-[#222]'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. A suscipit beatae asperiores, molestias minima ducimus tenetur incidunt voluptatum quae voluptas odio cupiditate illo. Nulla nihil officiis libero laudantium a? Aliquam?
        </Card>
      </Grid.Col>
    </Grid>
  )

  return (
    <div>
      <h1>Invoices View</h1>
      <Grid className='m-6 gap-2'>
        <Grid.Col span={6}>
          <Card>
            <BarChart
              h={300}
              data={data}
              dataKey="month"
              withLegend
              series={[
                { name: 'Smartphones', color: 'violet.6' },
                { name: 'Laptops', color: 'blue.6' },
                { name: 'Tablets', color: 'teal.6' },
              ]}
            />
          </Card>
        </Grid.Col>
        <Grid.Col span={6}>
          <Card>
            <AreaChart
              h={300}
              data={data2}
              dataKey="date"
              type="stacked"
              withLegend
              series={[
                { name: 'Apples', color: 'indigo.6' },
                { name: 'Oranges', color: 'blue.6' },
                { name: 'Tomatoes', color: 'teal.6' },
              ]}
            />
          </Card>
        </Grid.Col>
      </Grid>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        {renderFilterSection()}
        {renderInvoicesTable()}
      </Card>
    </div>
  )
}

export default Invoices