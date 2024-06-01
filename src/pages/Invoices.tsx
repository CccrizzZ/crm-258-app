import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Grid,
  Menu,
  MultiSelect,
  NumberInput,
  Select,
  Table,
  Textarea
} from '@mantine/core'
import { initInvoiceFilter, invoiceArrAtom, invoiceFilterAtom, isLoadingAtom } from '../utils/atoms'
import { useAtom } from 'jotai'
import {
  RiBankCardFill,
  RiCashFill,
  RiCoinsFill,
  RiDeleteBin2Fill,
  RiMailFill,
  RiMailLockFill,
  RiMailSendLine,
  RiMenuFill,
  RiPenNibFill,
  RiUserFill
} from 'react-icons/ri'
import { AreaChart, BarChart } from '@mantine/charts'
import { DatePickerInput } from '@mantine/dates';
import { useEffect, useState } from 'react'
import Pagination from '../components/Pagination.tsx'
import { getPaymentIcon, getStatusColor, server } from '../utils/utils.tsx'
import axios, { AxiosError, AxiosResponse } from 'axios'

const data = [
  { month: 'January', Cash: 1200, Card: 900, Etransfer: 200 },
  { month: 'February', Cash: 1900, Card: 1200, Etransfer: 400 },
  { month: 'March', Cash: 400, Card: 1000, Etransfer: 200 },
  { month: 'April', Cash: 1000, Card: 200, Etransfer: 800 },
  { month: 'May', Cash: 800, Card: 1400, Etransfer: 1200 },
  { month: 'June', Cash: 750, Card: 600, Etransfer: 1000 },
]

export const data2 = [
  {
    date: 'Mar 22',
    Revenue: 2890,
    Returns: 26,
  },
  {
    date: 'Mar 23',
    Revenue: 2756,
    Returns: 45,
  },
  {
    date: 'Mar 24',
    Revenue: 3322,
    Returns: 146,
  },
  {
    date: 'Mar 25',
    Revenue: 3470,
    Returns: 34,
  },
  {
    date: 'Mar 26',
    Revenue: 3129,
    Returns: 57,
  },
]

const Invoices = () => {
  const [_, setIsLoading] = useAtom(isLoadingAtom)
  const [invoices, setInvoices] = useAtom(invoiceArrAtom)
  const [invoiceFilter, setInvoiceFilter] = useAtom(invoiceFilterAtom)

  // pagination
  const [currPage, setCurrPage] = useState<number>(0)
  const [itemsPerPage, setItemsPerPage] = useState<number>(20)
  const [totalCount, setTotalCount] = useState<number>(0)

  useEffect(() => {

  }, [])

  const getInvoiceByPage = async (isInit: boolean) => {
    await axios({
      method: 'post',
      url: `${server}/getInvoicesByPage`,
      data: {
        currPage: isInit ? 0 : currPage,
        itemsPerPage: itemsPerPage,
        filter: invoiceFilter,
      }
    }).then((res: AxiosResponse) => {
      if (res.status === 200) {
        console.log(res.data)
      }
    }).catch((err: AxiosError) => {
      alert(err.message)
    })
  }

  const renderInvoicesTable = () => (
    <Table className='mt-8' verticalSpacing="md">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>#</Table.Th>
          <Table.Th>Buyer Name</Table.Th>
          <Table.Th>Buyer Email</Table.Th>
          <Table.Th>Payment Method</Table.Th>
          <Table.Th>Invoice Total</Table.Th>
          <Table.Th>Shipping</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Time Created</Table.Th>
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
                <Badge color={getStatusColor(val.status)}>
                  {(val.status)}
                </Badge>
              }
            </Table.Td>
            <Table.Td>{val.timeCreated}</Table.Td>
            <Table.Td>
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <ActionIcon color='rgba(77, 77, 77, 1)'>
                    <RiMenuFill />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Action</Menu.Label>
                  <Menu.Item leftSection={<RiPenNibFill />}>
                    Edit
                  </Menu.Item>
                  <Menu.Item leftSection={<RiMailFill />}>
                    Details
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Label>Danger zone</Menu.Label>
                  <Menu.Item color="red" leftSection={<RiDeleteBin2Fill />}>
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
      className='mb-3 h-24'
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
      className='mb-3 h-24'
      height={64}
      label="Invoice Status"
      checkIconPosition="right"
      placeholder="Pick Invoice Status"
      data={[
        { value: 'issued', label: 'Issued' },
        { value: 'paid', label: 'Paid' },
        { value: 'pickedup', label: 'Pickedup' },
        { value: 'shipped', label: 'Shipped' },
        { value: 'expired', label: 'Expired' },
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
        { value: '', label: 'All' },
        { value: 'pickup', label: 'Show Only Pickup' },
        { value: 'shipping', label: 'Show Only Shipping' }
      ]}
      value={invoiceFilter.shipping}
      onChange={(value: string | null) => setInvoiceFilter({ ...invoiceFilter, shipping: value ?? '' })}
    />
  )

  const renderDateSelect = () => (
    <DatePickerInput
      clearable
      type="range"
      label="Pick dates range"
      placeholder="Pick dates range"
      value={invoiceFilter.dateRange}
      onChange={(value) => setInvoiceFilter({ ...invoiceFilter, dateRange: value })}
    />
  )

  const renderPriceRangeSelect = () => (
    <Card className='mt-3 bg-[#222]'>
      <h2>Invoice Total</h2>
      <div className='mt-3 flex gap-3'>
        <NumberInput
          label="Min"
          placeholder="Dollars"
          prefix="$"
          defaultValue={0}
          min={0}
          value={invoiceFilter.invoiceTotalRange.min}
          onChange={
            (value) => setInvoiceFilter({
              ...invoiceFilter,
              invoiceTotalRange: { ...invoiceFilter.invoiceTotalRange, min: Number(value) ?? 0 }
            })
          }
        />
        <NumberInput
          label="Max"
          placeholder="Dollars"
          prefix="$"
          defaultValue={99999}
          min={1}
          value={invoiceFilter.invoiceTotalRange.max}
          onChange={
            (value) => setInvoiceFilter({
              ...invoiceFilter,
              invoiceTotalRange: { ...invoiceFilter.invoiceTotalRange, max: Number(value) ?? 0 }
            })
          }
        />
      </div>
    </Card>
  )

  const renderFilterSection = () => (
    <Grid className='m-6'>
      <Grid.Col span={4}>
        <Card className='bg-[#222]'>
          <Textarea
            value={invoiceFilter.keyword}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setInvoiceFilter({ ...invoiceFilter, keyword: event.target.value })}
            label="Search Invoice"
            description="Input invoice number or keywords"
            placeholder="Search Keywords"
          />
        </Card>
        <Card className='mt-3 bg-[#222] gap-3'>
          <Button
            variant="gradient"
            gradient={{ from: 'purple', to: 'cyan', deg: 0 }}
            onClick={() => setInvoiceFilter(initInvoiceFilter)}
          >
            Reset Filter
          </Button>
          <Button
            onClick={() => getInvoiceByPage(false)}
            variant="gradient"
            gradient={{ from: 'cyan', to: 'teal', deg: 0 }}
          >
            Refresh
          </Button>
        </Card>
      </Grid.Col>
      <Grid.Col span={4}>
        <Card className='bg-[#222]'>
          {renderDateSelect()}
        </Card>
        {renderPriceRangeSelect()}
      </Grid.Col>
      <Grid.Col span={4}>
        <Card className='bg-[#222]'>
          {renderPaymentMethodSelect()}
          {renderStatusSelect()}
          {renderShippingSelect()}
        </Card>
      </Grid.Col>
    </Grid>
  )

  const nextPage = () => {

  }

  const prevPage = () => {

  }

  return (
    <div>
      <h1>Invoices Manager</h1>
      <Grid className='m-6 gap-2'>
        <Grid.Col span={6}>
          <Card>
            <BarChart
              h={300}
              data={data}
              type="stacked"
              dataKey="month"
              strokeDasharray="15 15"
              tooltipAnimationDuration={200}
              withLegend
              series={[
                { name: 'Cash', color: 'teal.6' },
                { name: 'Card', color: 'blue.6' },
                { name: 'Etransfer', color: 'violet.6' },
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
              tooltipAnimationDuration={200}
              withLegend
              series={[
                { name: 'Returns', color: 'red.6' },
                { name: 'Revenue', color: 'teal.6' },
              ]}
            />
          </Card>
        </Grid.Col>
      </Grid>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        {renderFilterSection()}
        <Pagination
          totalCount={totalCount}
          itemsPerPage={itemsPerPage}
          currPage={currPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
        <hr className='border-[#555] mt-6' />
        {renderInvoicesTable()}
        {
          invoices.length < 1 ?
            <div className='flex w-full content-center min-w-full p-24'>
              <h2 className='m-auto'>No Invoices</h2>
            </div>
            : <></>
        }
        <hr className='border-[#555] mt-6' />
        <Pagination
          totalCount={totalCount}
          itemsPerPage={itemsPerPage}
          currPage={currPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </Card>
    </div>
  )
}

export default Invoices