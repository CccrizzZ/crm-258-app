import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Checkbox,
  FileInput,
  Grid,
  Menu,
  MultiSelect,
  NumberInput,
  Select,
  Table,
  Textarea,
  Title
} from '@mantine/core'
import {
  initInvoice,
  initInvoiceFilter,
  invoiceArrAtom,
  invoiceFilterAtom,
  isLoadingAtom,
  selectedEditInvoice
} from '../utils/atoms'
import { useAtom } from 'jotai'
import {
  RiArrowDownFill,
  RiArrowUpFill,
  RiCalendar2Fill,
  RiCalendar2Line,
  RiCloudFill,
  RiDeleteBin2Fill,
  RiMailFill,
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
import { Invoice, InvoiceFilter } from '../utils/Type.ts'
import { format } from 'date-fns'
import InvoiceDetailModal from '../components/InvoiceDetailModal.tsx'

const data = [
  { month: 'January', Cash: 1200, Card: 900, "E-transfer": 200 },
  { month: 'February', Cash: 1900, Card: 1200, "E-transfer": 400 },
  { month: 'March', Cash: 400, Card: 1000, "E-transfer": 200 },
  { month: 'April', Cash: 1000, Card: 200, "E-transfer": 800 },
  { month: 'May', Cash: 800, Card: 1400, "E-transfer": 1200 },
  { month: 'June', Cash: 750, Card: 600, "E-transfer": 1000 },
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
  const [itemsPerPage, setItemsPerPage] = useState<string | null>('20')
  const [totalCount, setTotalCount] = useState<number>(0)

  // sorting
  const [timeOrder, setTimeOrder] = useState<number>(-1)

  // invoice actions
  const [showInvoiceDetailModal, setShowInvoiceDetailModal] = useState<boolean>(false)
  const [__, setSelectedInvoice] = useAtom(selectedEditInvoice)

  // pdf
  const [selectedPDF, setSelectedPDF] = useState<File | null>(null)
  const [uploadPDF, setUploadPDF] = useState<boolean>(false)

  useEffect(() => {
    getInvoiceByPage(true)
  }, [])

  const getInvoiceByPage = async (
    isInit: boolean,
    newPage?: number,
    filter?: InvoiceFilter,
    order?: number,
    newItemsPerPage?: string | null
  ) => {
    setIsLoading(true)
    await axios({
      method: 'post',
      url: `${server}/getInvoicesByPage`,
      data: {
        currPage: isInit ? 0 : newPage ?? currPage,
        itemsPerPage: newItemsPerPage ? Number(newItemsPerPage) : Number(itemsPerPage),
        filter: filter ?? invoiceFilter,
        timeOrder: order ?? timeOrder
      }
    }).then((res: AxiosResponse) => {
      if (res.status === 200) {
        setInvoices(res.data['itemsArr'])
        setTotalCount(res.data['totalItems'])
      }
    }).catch((err: AxiosError) => {
      alert(err.message)
      setIsLoading(false)
    })
    setIsLoading(false)
  }

  const flipTimeSort = () => {
    setTimeOrder(-timeOrder)
    getInvoiceByPage(true, undefined, undefined, -timeOrder)
  }

  const showEditPopup = (val: Invoice) => {
    setSelectedInvoice(val)
    setShowInvoiceDetailModal(true)
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
          <Table.Th className='flex justify-center'>
            Time Created
            <div onClick={flipTimeSort}>
              {timeOrder === 1 ? <RiArrowUpFill className='mx-2' /> : <RiArrowDownFill className='mx-2' />}
            </div>
          </Table.Th>
          <Table.Th>Action</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {invoices ? invoices.map((val, index) => (
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
            <Table.Td className='flex justify-center'>{format(new Date(val.time), "P h:mm")}</Table.Td>
            <Table.Td>
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <ActionIcon color='rgba(77, 77, 77, 1)'>
                    <RiMenuFill />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Action</Menu.Label>
                  <Menu.Item leftSection={<RiPenNibFill />} onClick={() => showEditPopup(val)}>
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
        )) : <></>}
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
    <div>
      {/* <DatePickerInput
        leftSection={<RiCalendar2Fill />}
        clearable
        type="range"
        label="Pick dates range"
        placeholder="Pick dates range"
        value={invoiceFilter.dateRange}
        onChange={(value) => setInvoiceFilter({ ...invoiceFilter, dateRange: value })}
      /> */}
      <DatePickerInput
        leftSection={<RiCalendar2Fill />}
        clearable
        label="From Date / Single Day"
        value={invoiceFilter.fromDate}
        onChange={(value) => setInvoiceFilter({
          ...invoiceFilter,
          fromDate: value
        })}
      />
      <DatePickerInput
        leftSection={<RiCalendar2Line />}
        clearable
        label="End Date"
        value={invoiceFilter.toDate}
        onChange={(value) => setInvoiceFilter({
          ...invoiceFilter,
          toDate: value
        })}
      />
    </div>
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

  const addInvoiceFromPDF = async () => {
    // null check on select
    if (!selectedPDF) return

    // create form data
    const formData = new FormData()
    formData.append('file', selectedPDF)
    formData.append('uploadPDF', String(uploadPDF))

    setIsLoading(true)
    await axios({
      method: 'post',
      headers: { 'Content-Type': 'multipart/form-data' },
      url: `${server}/createInvoiceFromPdf`,
      data: formData,
    }).then((res: AxiosResponse) => {
      if (res.status === 200) {
        alert(res.data['size'])
        console.log(res.data['data'])
      }
    }).catch((err: AxiosError) => {
      alert(err.response?.data)
      setIsLoading(false)
    })
    setIsLoading(false)
  }

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
            onClick={() => {
              setInvoiceFilter(initInvoiceFilter)
              getInvoiceByPage(true, 0, initInvoiceFilter)
            }}
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
        <Card className="mt-3 bg-[#222] gap-3">
          <FileInput
            value={selectedPDF}
            onChange={setSelectedPDF}
            placeholder="Add Invoice From PDF"
            clearable
          />
          <div className='flex gap-3 justify-between'>
            <Button color='gray'>
              Add Invoice Manually
            </Button>
            <Button color='teal' onClick={addInvoiceFromPDF}>
              Add Invoice From PDF
            </Button>
          </div>
          <div className='flex justify-between'>
            <span className='flex'><RiCloudFill className='m-0 mx-2 p-0 h-full' />Upload PDF File to Cloud</span>
            <Checkbox value={Number(uploadPDF)} onChange={(val) => setUploadPDF(val.currentTarget.checked)} />
          </div>
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

  // pagination methods
  const getTotalPage = () => Math.ceil(totalCount / Number(itemsPerPage)) === 0 ? 1 : Math.ceil(totalCount / Number(itemsPerPage))
  const nextPage = () => {
    if ((currPage + 1) >= getTotalPage()) return
    setCurrPage(val => val + 1)
    getInvoiceByPage(false, currPage + 1)
  }
  const prevPage = () => {
    if (currPage < 1) return
    setCurrPage(val => val - 1)
    getInvoiceByPage(false, currPage - 1)
  }
  const lastPage = () => {
    if (currPage + 1 >= getTotalPage()) return
    setCurrPage(getTotalPage() - 1)
    getInvoiceByPage(false, getTotalPage() - 1)
  }
  const firstPage = () => {
    if (currPage - 1 < 0) return
    setCurrPage(0)
    getInvoiceByPage(true)
  }


  const renderCharts = () => (
    <Grid className='m-6 gap-2'>
      <Grid.Col span={6}>
        <Card className='p-8'>
          <Title order={2}>Monthly Total</Title>
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
              { name: 'E-transfer', color: 'violet.6' },
            ]}
          />
        </Card>
      </Grid.Col>
      <Grid.Col span={6}>
        <Card className='p-8'>
          <Title order={2}>Revenue VS Returns</Title>
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
  )

  const onItemsPerPageChange = (newPage: string | null) => {
    setItemsPerPage(newPage)
    setCurrPage(0)
    getInvoiceByPage(true)
    getInvoiceByPage(true, undefined, undefined, undefined, newPage)
  }

  return (
    <div>
      <InvoiceDetailModal
        open={showInvoiceDetailModal}
        close={() => setShowInvoiceDetailModal(false)}
      />
      {/* charts */}
      {renderCharts()}
      {/* table */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        {renderFilterSection()}
        <Pagination
          totalCount={totalCount}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={onItemsPerPageChange}
          isBottom={false}
          currPage={currPage}
          nextPage={nextPage}
          prevPage={prevPage}
          lastPage={lastPage}
          firstPage={firstPage}
          getTotalPage={getTotalPage}
        />
        <hr className='border-[#555] mt-6' />
        {renderInvoicesTable()}
        {
          invoices && invoices.length < 1 ?
            <div className='flex w-full content-center min-w-full p-24'>
              <h2 className='m-auto'>No Invoices</h2>
            </div>
            : <></>
        }
        <hr className='border-[#555] mt-6' />
        <Pagination
          totalCount={totalCount}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={onItemsPerPageChange}
          isBottom={true}
          currPage={currPage}
          nextPage={nextPage}
          prevPage={prevPage}
          lastPage={lastPage}
          firstPage={firstPage}
          getTotalPage={getTotalPage}
        />
      </Card>
    </div>
  )
}

export default Invoices