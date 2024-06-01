import { Button, Tooltip } from '@mantine/core'
import React from 'react'
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from 'react-icons/ri'

type PaginationProps = {
  // pagination states
  totalCount: number,
  itemsPerPage: number,
  currPage: number,
  // pagination buttons function
  nextPage: () => void,
  prevPage: () => void,
}

const Pagination: React.FC<PaginationProps> = (props: PaginationProps) => {
  return (
    <div className='flex mt-3'>
      <div className='content-center'>
        <h2 className='ml-6'>Items Per Page: {props.totalCount}</h2>
      </div>
      <div className='m-auto flex gap-3'>
        <Tooltip label='First Page'>
          <Button color='indigo'><RiArrowLeftDoubleLine /></Button>
        </Tooltip>
        <Button color='indigo'>Prev Page</Button>
        <Button color='indigo'>Next Page</Button>
        <Tooltip label='Last Page'>
          <Button color='indigo'><RiArrowRightDoubleLine /></Button>
        </Tooltip>
      </div>
      <div className='content-center'>
        <h2 className='mr-6'>Total Items: {props.totalCount}</h2>
      </div>
    </div>
  )
}

export default Pagination
