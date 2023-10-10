import React from 'react'
import Header from './Header'
import {Outlet} from 'react-router-dom'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  return (
    <>
      <Header/>
      <main style={{minHeight:"85vh"}}>
        <Outlet/>
      </main>
      <Footer/>
      <ToastContainer />
    </>
  )
}

export default Layout
