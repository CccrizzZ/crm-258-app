import { Button, Select, Tooltip } from '@mantine/core'
import React from 'react'
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from 'react-icons/ri'

type PaginationProps = {
  // pagination states
  totalCount: number,
  itemsPerPage: string | null,
  setItemsPerPage: (val: string | null) => void,
  isBottom: boolean,
  currPage: number,
  // pagination buttons function
  nextPage: () => void,
  prevPage: () => void,
  lastPage: () => void,
  firstPage: () => void,
  getTotalPage: () => number
}

const Pagination: React.FC<PaginationProps> = (props: PaginationProps) => {
  return (
    <div className='flex mt-3'>
      {
        props.isBottom ? <></> :
          <div className='content-center w-36 ml-6'>
            <Select
              label="Items Per Page"
              defaultValue='20'
              data={['20', '50', '100']}
              value={props.itemsPerPage}
              onChange={props.setItemsPerPage}
            />
          </div>
      }
      <div className='grid gap-2 m-auto'>
        <div className='grid'>
          <p className='m-auto'>Page {props.currPage + 1} of {props.getTotalPage() ?? 0}</p>
        </div>
        <div className='m-auto flex gap-3'>
          <Tooltip label='First Page'>
            <Button color='indigo' onClick={props.firstPage}><RiArrowLeftDoubleLine /></Button>
          </Tooltip>
          <Button color='indigo' onClick={props.prevPage}>Prev Page</Button>
          <Button color='indigo' onClick={props.nextPage}>Next Page</Button>
          <Tooltip label='Last Page'>
            <Button color='indigo' onClick={props.lastPage}><RiArrowRightDoubleLine /></Button>
          </Tooltip>
        </div>
      </div>
      <div className='content-center'>
        {
          props.isBottom ? <></> :
            <h2 className='mr-6'>Total Items: {props.totalCount}</h2>
        }
      </div>
    </div>
  )
}

export default Pagination
