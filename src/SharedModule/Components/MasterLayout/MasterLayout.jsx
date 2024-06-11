import React from 'react'
import { Outlet } from 'react-router-dom'

export default function MasterLayout() {
  return (
    <div className='vh-100 w-100'>
        <Outlet/>
    </div>
  )
}
