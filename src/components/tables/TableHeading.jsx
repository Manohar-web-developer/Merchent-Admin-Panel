import React from 'react'
import { Link } from 'react-router-dom'

function TableHeading({title, link}) {
  return (
    <>
        <div className='w-full flex items-center justify-between'>
            <h1 className='font-semibold'>{title}</h1>
            <Link to={link} className='text-sm text-[#4b34b3] font-bold'>View All</Link>
        </div>
    </>
  )
}

export default TableHeading