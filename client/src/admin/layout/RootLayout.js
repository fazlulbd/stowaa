import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { ToastContainer } from 'react-toastify';

const RootLayout = () => {
  return (
    <div className='root-wrapper'>
      <div className="root-sidebar">
        <Sidebar/>
      </div>
      <Outlet/>
      <ToastContainer />
    </div>
  )
}

export default RootLayout
