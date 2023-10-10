import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { Button, Modal, Table } from 'react-bootstrap';
import AddCategory from './AddCategory';
import { Store } from '../../Store';
const Categorys = () => {
    const {state} = useContext(Store)
    const {userInfo} = state
    const [category, setCategory] = useState([])
    const [name, setName] = useState('')
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    let [selected, setSelected] = useState(null)
    let [updatedName, setUpdatedName] = useState('')


    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('/api/category')
            if (data.success) {
                setCategory(data.category)
            }
        } catch (error) {
            console.log(error)
            toast.success('Somthing went wrong in getting category')
        }
    }
    useEffect(() => {
        getAllCategory()
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/add-category', { name },{headers:{"Authorization": userInfo?.token}})

            if (data?.success) {
                toast.success(data.message)
                getAllCategory()
            } else {
                toast.error(data.message)
            }
            console.log(data)
        } catch (error) {
            console.log(error)
            toast.error('Somthing went wrong in input category')
        }
    }

    let handleUpdate = async (e)=>{
        e.preventDefault()
        try{
            const {data} = await axios.put(`/api/update-category/${selected._id}`,{name: updatedName}, {headers:{"Authorization": userInfo?.token}})
            if(data.success){
                toast.success(data.message)
                setSelected(null)
                setUpdatedName("")
                getAllCategory()
               
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error("Something went wrong")
        }
    }


    let handleDelete = async (pid)=>{
        try{
            const {data} = await axios.delete(`/api/delete-category/${pid}`,{headers:{"Authorization": userInfo?.token}})
            if(data.success){
                toast.success(data.message)
                getAllCategory()
               
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error("Something went wrong")
        }
    }

    return (
        <>
            <div className="w-75 pt-5">
                <div className="px-5 py-4 shadow-lg bg-body rounded">
                    <h3 className='text-black mb-3'>Add Category</h3>
                  <AddCategory
                    handleSubmit={handleSubmit}
                    value={name}
                    setAddcategory={setName}
                  />
                </div>
                <Table striped bordered hover className='mt-5'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Category name</th>
                            <th className='text-end  px-5'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            category.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{(index + 1)}</td>
                                    <td>{item.name}</td>
                                    <td className='text-end'>
                                        <Button className='px-4 py-1 mx-3' variant="dark" onClick={() => {setShow(true); setUpdatedName(item.name); setSelected(item)}}>Eidt</Button>{' '}
                                        <Button className='px-4 py-1' variant="danger" onClick={()=>handleDelete(item._id)} >Delete</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <Modal show={show} onHide={handleClose}  size="lg">
					<Modal.Header closeButton>
					<Modal.Title>Category Update</Modal.Title>
					</Modal.Header>
					<div className="p-4"> 
					<AddCategory
						value = {updatedName}
						setAddcategory = {setUpdatedName}
						handleSubmit={handleUpdate}
					/>
					</div>
				</Modal>
            </div>
        </>
    )
}

export default Categorys
