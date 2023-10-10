import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Store } from '../../Store'

const ProductList = () => {
    const {state} = useContext(Store)
    const {userInfo} = state

    let [product, setProduct] = useState([])
    let allProduct = async () => {
        try {
            const { data } = await axios.get('/api/products')
            if (data.success) {
                setProduct(data.products)
            }
        } catch (error) {
            console.log(error)
            toast.error('Somthing went wrong in getting product')
        }
    }
    useEffect(() => {
        allProduct()
    }, [])

    let handleDelete = async (pid)=>{
        try{
            const {data} = await axios.delete(`/api/delete-product/${pid}`, {headers:{"Authorization": userInfo?.token}})
            if(data.success){
                toast.success(data.message)  
                allProduct() 
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error("Something went wrong")
        }
    }
  return (
    <div className='mt-5 w-100'>
       <div className="">
                <h4>Product List</h4>

            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th className='text-end pe-5'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td> <img src={item.image} alt="" style={{ width: "100px", height:"50px"}} /> </td>
                                <td>{item.name}</td>
                                <td>{item.category.name}</td>
                                <td className='text-end pe-4'>
                                    <Button className='px-4 py-1 mx-3' variant="dark"><Link to={`/dashboard/product/${item._id}`}> Edit</Link> </Button>{" "}
                                    <Button className='px-4 py-1' variant="danger" onClick={()=>handleDelete(item._id)} >Delete</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
    </div>
  )
}

export default ProductList
