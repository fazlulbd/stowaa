import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import ReactStars from "react-rating-stars-component";
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { Store } from '../Store';

const Product = () => { 
    const {cartstate, cartdispatch} = useContext(Store)
    const {cart} = cartstate
    let [product, setProduct] = useState([])
    useEffect(() => {
        async function allProduct() {
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
        allProduct()
    }, [])

    let handleCartProductAdd = (product)=>{
        const existingItem = cart.cartItems.find((item)=>item._id === product._id)
        const quantity = existingItem ? existingItem.quantity +1 : 1        
        cartdispatch({type:'CART_ADD_PRODUCT', payload: {...product, quantity}})
    }
    return (
        <Container className='mt-5'>
            <Row>
                {
                    product.map(item => (
                        <Col lg={3} key={item._id} className='mt-4'>
                            <Card>
                                <Link to={`/product/${item._id}`}><Card.Img variant="top" src={item?.image} className='w-100' /></Link>
                                <Card.Body style={{ minHeight: "140px" }}>
                                     <Card.Title>{item.name.substring(0, 30)}</Card.Title>
                                    <Card.Text>{item.description.substring(0, 70)}</Card.Text>
                                    <div className="d-flex">
                                    <Card.Text><del>$ {((item.price+((item.price*20 )/100))).toFixed(2)}</del></Card.Text>
                                    <Card.Title className='ms-4'>$ {(item.price).toFixed(2)}</Card.Title>
                                    </div>
                                    <p>
                                        <ReactStars
                                            count={5}
                                            value={item?.rating}
                                            size={24}
                                            activeColor="#ffd700"
                                            edit={false}
                                            isHalf={true}
                                        />
                                    </p>
                                </Card.Body>
                                <Card.Footer className='p-0'>
                                    <Button variant="warning" className='w-100' style={{ borderRadius: 0 }} onClick={()=>handleCartProductAdd(item)}>Add To Cart</Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    )
}

export default Product
