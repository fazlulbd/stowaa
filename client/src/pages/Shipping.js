import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../Store'
import { useNavigate } from 'react-router-dom'
import { Alert, Button, Card, Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap"
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios'
import { toast } from 'react-toastify';
const Shipping = () => {
    const navigate = useNavigate()
    
    const {state, cartstate, cartdispatch } = useContext(Store)
    const {userInfo} = state
    const { cart } = cartstate

    const [clientToken, setClinetToken] = useState('')
    const [instance, setInstance] = useState('')
    const [loading, setLoading] = useState(false)
    let [total, setTotal] = useState('')
    let [shipping, setShipping] = useState('')

    let handleRemoveCart = (item) => {
        cartdispatch({ type: 'CART_REMOVE_PRODUCT', payload: item })
    }

    useEffect(() => {
        let price = 0
        // eslint-disable-next-line
        cart.cartItems.map(item => {
            
            price += item.price * item.quantity
        })
        setTotal(price)
        if (price < 600) {
            setShipping(40)
        } else if (price > 600) {
            setShipping(30)
        } else {
            setShipping(0)
        }

    }, [cart.cartItems])


    useEffect(()=>{
        if(!userInfo){
            navigate('/login?redirect=/shipping')           
        }
         // eslint-disable-next-line
    },[])


    const getToken = async () => {
        try {
          const { data } = await axios.get("/api/braintree/token", {headers:{"Authorization": userInfo?.token}})
          setClinetToken(data?.clientToken)
          console.log(data)
        } catch (error) {
          console.log(error)
        }
      }
      useEffect(() => {
        getToken()
        // eslint-disable-next-line
    }, [])
    let handlePayment = async () => {
        try{
          setLoading(true)
          const {nonce} = await instance.requestPaymentMethod()
          const {data} = await axios.post("/api/braintree/payment", { nonce, cart }, {headers:{"Authorization": userInfo?.token}})
          console.log(data)
          setLoading(false)
          localStorage.removeItem('cart')
          cartdispatch([])
          navigate('/order')
          toast.success('Payment Completed sucessfully')
        }catch(error){
          console.log(error)
          setLoading(false)
        }
        
      }
    

  return (
    <>
    {
        cart.cartItems.length > 0 ?
            <Container>
                <Row className='mt-5'>
                    <Col lg={8}>
                        <Card>
                            <Card.Header as="h5">Featured</Card.Header>
                            <Card.Body>
                                {
                                    cart.cartItems.map(item => (
                                        <Row key={item._id}>
                                            <Col lg={3}>
                                                <Card.Img variant="top" src={item.image} className='w-100' />
                                            </Col>
                                            <Col lg={6}>
                                                <Card.Title>{item.name}</Card.Title>
                                                <p>Color: White</p>
                                                <p>Size: M </p>
                                                <p>Price: ${(item.price)?.toFixed(2)} </p>
                                                <Button className='px-4 py-1' variant="danger" type='remove' onClick={() => handleRemoveCart(item)}>Remove</Button>
                                            </Col>
                                            <hr className="my-4" />
                                        </Row>
                                    ))
                                }


                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card>
                            <Card.Header as="h5">Summary</Card.Header>
                            <Card.Body>
                                <ListGroup flush>
                                    <ListGroupItem
                                        className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                        Products
                                        <span>${total}</span>
                                    </ListGroupItem>
                                    <ListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                        Shipping
                                        <span>${(shipping)}</span>
                                    </ListGroupItem>
                                    <hr className="my-4" />
                                    <ListGroupItem
                                        className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                        <div>
                                            <strong>Total amount</strong>
                                            <strong>
                                                <p className="mb-0">(including VAT)</p>
                                            </strong>
                                        </div>
                                        <span>
                                            <strong>${(total + shipping)}</strong>
                                        </span>
                                    </ListGroupItem>
                                </ListGroup>
                                <Button className='w-100' variant="dark" type='submit' block size="lg"> Place order </Button>
                            </Card.Body>
                            {
                                userInfo.user?.name ? 
                                <div className="text-center">
                                    <h6>{userInfo.user.name}</h6>
                                    <Button className='w-100 rounded-0' variant="dark" onClick={() => navigate('/account')}>Update Address</Button>
                                </div>
                                : 
                                <>
                                  {
                                    userInfo.token ?
                                      <Button className='w-100 rounded-0' variant="dark" onClick={() => navigate('/account')}>Uptate Address</Button>
                                      :
                                      <Button onClick={() => navigate('/login', { state: "/cart" })}>Plase Login to checkout</Button>
                                  }
                                </>
                            }
                            
                        </Card>
                        <div className=" mt-5">
                                {
                                  !clientToken || !cart.cartItems?.length ? ""
                                  :
                                <>
                                <DropIn
                                options={{ 
                                    authorization: clientToken ,
                                    paypal:{
                                    flow: 'vault'
                                    }
                                }}
                                onInstance={(instance) => setInstance(instance)}
                                />
                                <Button className='w-100' onClick={handlePayment}>{loading ? "processing...." : "Make Payment"}</Button>
                                </>                            
                                }
                                
                            </div>
                    </Col>
                </Row>
            </Container>
            : 
            <Alert  variant="info" className='py-4 text-center'>
            <h3>Cart is Empty</h3>
            </Alert>
    }
</>
  )
}

export default Shipping
