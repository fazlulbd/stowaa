import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import JoditEditor from 'jodit-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Store } from '../../Store';
const AddProduct = () => {
  const {state} = useContext(Store)
    const {userInfo} = state
  const editor = useRef(null);
  const [content, setContent] = useState('');
  let [color, setColor] = useState([])

  let [productname, setProductname] = useState('')
  let [productbrand, setProductbrand] = useState('')
  let [productcategory, setProductcategory] = useState('')
  let [productcatprice, setProductcatprice] = useState('')
  let [productimg, setProductimg] = useState('')
  let [instock, setInstock] = useState('')
  let [rating, setRating] = useState('')

  let [productnameError, setProductnameError] = useState('')
  let [productbrandError, setProductbrandError] = useState('')
  let [productcategoryError, setProductcategoryError] = useState('')
  let [productcatpriceError, setProductcatpriceError] = useState('')
  let [categorys, setCategorys] = useState([])

  
  
  let handleProductname = (e)=>{
      setProductname(e.target.value)
      setProductnameError('')
  }
  let handleProductbrand = (e)=>{
      setProductbrand(e.target.value)
      setProductbrandError('')
  }
  let handleProductcategory = (e)=>{
      setProductcategory(e.target.value)
      setProductcategoryError('')
  }
  let handleProductprice = (e)=>{
      setProductcatprice(e.target.value)
      setProductcatpriceError('')
  }



  let handleColor = (e)=>{
    let value = e.target.value
    if(value.split('').indexOf('#') !== -1){
      console.log('#  not allow')
    }else{
      setColor(value.split(','))
    }
  }

  const sizeArr = []
  console.log(sizeArr)
  let handleSizesmall = (e)=>{
      if(sizeArr.indexOf('S') !== -1){
        sizeArr.splice(sizeArr.indexOf('S'), 1)
      }else{
        sizeArr.push('S')
      }
  }
  let handleSizemedium = (e)=>{
    if(sizeArr.indexOf('M') !== -1){
      sizeArr.splice(sizeArr.indexOf('M'), 1)
    }else{
      sizeArr.push('M')
    }
  }
  let handleSizelarge = (e)=>{
    if(sizeArr.indexOf('L') !== -1){
      sizeArr.splice(sizeArr.indexOf('L'), 1)
    }else{
      sizeArr.push('L')
    }
  }
  let handleSizeextralarge = (e)=>{
    if(sizeArr.indexOf('Xl') !== -1){
      sizeArr.splice(sizeArr.indexOf('Xl'), 1)
    }else{
      sizeArr.push('Xl')
    }
  }

  const getAllCategory = async () => {
    try {
        const { data } = await axios.get('/api/category')
        if (data.success) {
          setCategorys(data.category)
        }
    } catch (error) {
        console.log(error)
        toast.success('Somthing went wrong in getting category')
    }
  }
  useEffect(() => {
      getAllCategory()
  }, [])

  let handleProductSubmit = async (e)=>{
    e.preventDefault()
    console.log(sizeArr)
    if(productname === ''){
      setProductnameError("! enter your product name")
    }
    if(productbrand === ''){
      setProductbrandError('! enter your brand name')
    }
    if(productcategory === ''){
      setProductcategoryError("! enter your category")
    }
    if(productcatprice === ''){
      setProductcatpriceError('! enter your product price')
    }
    try{
      
      const {data} = await axios.post('/api/add-product', 
      {
        name: productname,
        category: productcategory,
        brand: productbrand,
        price: productcatprice,
        color: color,
        size: sizeArr,
        description: content,
        image: productimg,
        instock,
        rating
      },
      {headers:{"Authorization": userInfo?.token}}
      )
      if(data.success){
        toast.success('product created successfully')
      }else{
        toast.error(data.message)
      }
    }catch (error) {
        console.log(error)
        toast.error('Somthing went wrong in  addProduct')
    }

  }
  return (
    <div className='w-100 addproduct'>
      <div className="my-4 ps-5">
        <h2>Add Product</h2>
        <h5 dangerouslySetInnerHTML={{__html: content}}></h5>
      </div>
      <Form className='px-4 addproduct-wrapper'>
        <Form.Group className="mb-4" controlId="validationCustom01">
          <Form.Control type="text" onChange={handleProductname}  placeholder='Enter product name'/>
          {
            productnameError ?
              <Form.Text className="text-muted">{productnameError}</Form.Text>
              : ""
          }
        </Form.Group>

        <Form.Group className="mb-4" controlId="validationCustom02">
          <Form.Control type="text" onChange={handleProductbrand} placeholder='Enter brand name'/>
          {
            productbrandError ?
              <Form.Text className="text-muted">{productbrandError}</Form.Text>
              : ""
          }
        </Form.Group>
        <Form.Group className="mb-4" controlId="validationCustom03">
          {/* <Form.Control type="text" onChange={handleProductcategory}/> */}
          <Form.Select aria-label="Default select example" onChange={handleProductcategory}>
          <option>-----------select a category-------------</option>
            {
              categorys.map(item=>(
                <option key={item._id} value={item._id}>{item.name}</option>
              ))
            }
          </Form.Select>
          {
            productcategoryError ?
              <Form.Text className="text-muted">{productcategoryError}</Form.Text>
              : ''
          }
        </Form.Group>

        <Form.Group className="mb-4" controlId="validationCustom04">
          <Form.Control type="text" onChange={handleProductprice} placeholder='Enter Product price'/>
          {
            productcatpriceError ?
              <Form.Text className="text-muted">{productcatpriceError}</Form.Text>
              : ''
          }
        </Form.Group>
        <Form.Group className="mb-4" controlId="validationCustom05">
          <Form.Control type="text" onChange={(e)=>setInstock(e.target.value)} placeholder='Enter quantity'/>
        </Form.Group>
        <Form.Group className="mb-4" controlId="validationCustom06">
          <Form.Control type="text" onChange={(e)=>setRating(e.target.value)} placeholder='Enter rating'/>
        </Form.Group>
        {/* ===================================================== */}
        <Form.Group className="mb-4 addproduct-text" controlId="validationCustom07">
          {/* <Form.Label>Product Description</Form.Label> */}
          <JoditEditor
            ref={editor}
            value={content}
            // config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {}}
	        />
        </Form.Group>
        {/* ==================================================== */}
        <Form.Group className="mb-4" controlId="validationCustom08">
          <Form.Control type="text" onChange={handleColor} placeholder='Enter color code' />
          {
            color.length > 0 &&
            color.map((item, index) => (
              <span key={index} style={{ width: '15px', height: '15px', borderRadius: '50%', background: `#${item}`, display: "inline-block", margin: '10px 3px' }}></span>
            ))

          }
        </Form.Group>

        <Form.Group className="mb-4" controlId="validationCustom09">
          <Form.Label>Product Size</Form.Label>
          <div className="d-flex addproduct-checkbox">
            <Form.Check type="checkbox" label="SM" onChange={handleSizesmall} />
            <Form.Check type="checkbox" label="MD" onChange={handleSizemedium} />
            <Form.Check type="checkbox" label="LG" onChange={handleSizelarge} />
            <Form.Check type="checkbox" label="XL" onChange={handleSizeextralarge} />
          </div>
        </Form.Group>
        <Form.Group className="mb-4" controlId="validationCustom10">
          <Form.Label>Image</Form.Label>
          <Form.Control type="text" onChange={(e) => setProductimg(e.target.value)} />
          {
            productcatpriceError ?
            <Form.Text className="text-muted">{productcatpriceError}</Form.Text>
            : ''
          }
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleProductSubmit} >Submit</Button>
      </Form>
    </div>
  )
}

export default AddProduct
