import React from 'react'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from "react-router-dom";
import Layout from './components/layouts/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Cart from './pages/Cart';
import Registration from './pages/Registration';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Shipping from './pages/Shipping';
import Account from './pages/Account';
import ProductDetails from './pages/ProductDetails';
import RootLayout from './admin/layout/RootLayout';
import Dashboard from './admin/components/Dashboard';
import AddProduct from './admin/components/AddProduct';
import Categorys from './admin/components/Categorys';
import ProductList from './admin/components/ProductList';
import UpdateProduct from './admin/components/UpdateProduct';
import Order from './pages/Order';


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/about' element={<About/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/product/:pid' element={<ProductDetails/>} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path='/account' element={<Account />} />
          <Route path='/shipping' element={<Shipping/>} />
          <Route path='/order' element={<Order/>} />
        </Route>
        <Route path="/dashboard" element={<RootLayout />}>
          <Route index element={<Dashboard/>} />
          <Route path='addProduct' element={<AddProduct/>} />
          <Route path='productList' element={<ProductList/>} />
          <Route path='product/:_id' element={<UpdateProduct/>} />
          <Route path='categories' element={<Categorys/>} />
        </Route>
      </Route>
    )
  )
  return ( <RouterProvider router={router}/> );
}

export default App;
