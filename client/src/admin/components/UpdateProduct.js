import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Button, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const UpdateProduct = () => {
    const params = useParams()
    let [name, setName] = useState('')
    let [description, setDescription] = useState('')
    let [price, setPrice] = useState('')
    let [categorys, setCategorys] = useState([])
    let [category, setCategory] = useState('')
    let [photo, setPhoto] = useState('')
    let [quantity, setQuantity] = useState('') 
    let [id,  setId] = useState('')


    let handleSubmit = async (e)=>{
        e.preventDefault()
    }
  return (
    <div className='w-100'>
      <div className="my-4 ps-5">
      <h2>Update Product</h2>
      </div>
      <Form className='px-4'>
      <Form.Group className="mb-4" controlId="validationCustom01">
      <Form.Label>Product Name</Form.Label>
        <Form.Control value={name} type="text" onChange={(e)=>setName(e.target.value)} placeholder="Product Name" /> 
      </Form.Group>
      <Form.Group className="mb-4" controlId="validationCustom02">
      <Form.Label>Price</Form.Label>
        <Form.Control value={price} type="number" onChange={(e)=>setPrice(e.target.value)} placeholder="price" /> 
      </Form.Group>
      <Form.Group className="mb-4" controlId="validationCustom03">
      <Form.Label>Quantity</Form.Label>
        <Form.Control value={quantity} type="number" onChange={(e)=>setQuantity(e.target.value)} placeholder="price" /> 
      </Form.Group>
      
      <Form.Group className="mb-4" controlId="validationCustom04">
      <Form.Label>Category</Form.Label>
      <Form.Select className="mb-4" value={category} onChange={(e)=>setCategory(e.target.value)} aria-label="Default select example">
        <option>{category.name} </option>
        {
          categorys.map(item=>(
            <option key={item._id} value={item._id} >{item.name}</option>
          ))
        }
        
      </Form.Select>
      </Form.Group>

      <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control value={description} onChange={(e)=>setDescription(e.target.value)} as="textarea" rows={6} />
      </Form.Group>
      <Form.Group className="mb-4" controlId="validationCustom05">
       <Form.Label>{photo ? photo.name : "upload Image"}</Form.Label>      
        <Form.Control type="file" name = "photo" accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])}/> 
      </Form.Group>
      <div className="w-25">
        {
          photo ? (
            <div className="">
               <img src={URL.createObjectURL(photo)} alt="product_photo" className='w-50'/>
            </div>
          )
          :
          <div className="">
            <img src={`/api/product-photo/${id}`} alt="product_photo" className='w-50'/>
          </div>
        }
      </div>
      
      <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
    </Form>
    </div>
  )
}

export default UpdateProduct
