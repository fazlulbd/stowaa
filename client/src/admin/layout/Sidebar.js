import React, { useContext } from 'react'
import { Nav } from 'react-bootstrap'
import {BsCart3, BsGrid1X2Fill,  BsFillGrid3X3GapFill, BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill} from 'react-icons/bs'
import {TbLogout} from "react-icons/tb"
import { Link, useNavigate } from 'react-router-dom'
import { Store } from '../../Store'
const Sidebar = () => {
  const navigate = useNavigate()
  const {dispatch,} = useContext(Store)
  const handleLogout = ()=>{
    dispatch({type: 'USER_LOGOUT'})
    localStorage.removeItem('userInfo')
    navigate('/')
  }
  return (
    <div className='sidebar'>
      <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsCart3  className='icon_header'/> SHOP
            </div>
        </div>
      <Nav defaultActiveKey="/" className="flex-column sidebar-list">
        <Nav.Link className='sidebar-list-item' to="/dashboard" as={Link}><BsGrid1X2Fill className='icon'/> Dashboard</Nav.Link>
        <Nav.Link className='sidebar-list-item' to="/dashboard/addProduct" as={Link}> <BsCart3  className='icon'/>Add Products</Nav.Link>
        <Nav.Link className='sidebar-list-item' to="/dashboard/productList" as={Link}> <BsCart3  className='icon'/> Product List</Nav.Link>
        <Nav.Link className='sidebar-list-item' to="/dashboard/categories" as={Link}> <BsFillGrid3X3GapFill className='icon'/> Categories</Nav.Link>
        <Nav.Link className='sidebar-list-item' eventKey="link-2"> <BsPeopleFill className='icon'/> Customers</Nav.Link>
        <Nav.Link className='sidebar-list-item' eventKey="link-2"> <BsListCheck className='icon'/> Inventory</Nav.Link>
        <Nav.Link className='sidebar-list-item' eventKey="link-2"> <BsMenuButtonWideFill className='icon'/> Reports</Nav.Link>
        <Nav.Link className='sidebar-list-item' eventKey="link-2">  <BsFillGearFill className='icon'/> Setting</Nav.Link>
        <Nav.Link className='sidebar-list-item' onClick={handleLogout} > <TbLogout className='icon'/> Logout</Nav.Link>

        
      </Nav>
    </div>
  )
}

export default Sidebar
