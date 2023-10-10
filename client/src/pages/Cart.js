import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Container, Form, ListGroup, ListGroupItem, Row } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import { Store } from '../Store'
const Cart = () => {
    const navigate = useNavigate()
    const { cartstate, cartdispatch } = useContext(Store)
    const { cart } = cartstate
    let [total, setTotal] = useState('')
    let [shipping, setShipping] = useState('')

    let handleQuantity = (item, quantity) => {
        cartdispatch({ type: 'CART_ADD_PRODUCT', payload: { ...item, quantity } })
    }
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

    const handleCheckOut = () => {
        navigate('/login?redirect=/shipping')
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
                                                    <Col lg={3}>
                                                        <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
                                                            <Button variant="outline-secondary" className="px-3 me-2" onClick={() => handleQuantity(item, item.quantity + 1)}> + </Button>
                                                            <Form.Control id="form1" min="0" name="quantity" value={item.quantity} type="number" className="form-control" onChange={() => null} />
                                                            <Button variant="outline-secondary" className="px-3 ms-2" onClick={() => handleQuantity(item, item.quantity > 1 ? item.quantity - 1 : item.quantity)}> - </Button>
                                                        </div>
                                                        <p className="text-start text-md-center">$<strong>{(item.price * item.quantity)}</strong> </p>
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
                                        <Button className='w-100' variant="dark" type='submit' block size="lg" onClick={handleCheckOut} > Go to checkout </Button>
                                    </Card.Body>
                                </Card>
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

export default Cart
