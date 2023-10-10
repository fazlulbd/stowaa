import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import ReactStars from "react-rating-stars-component";

const ProductDetails = () => {
    const params = useParams()
    let [produc, setProduct] = useState({})

    useEffect(() => {
        async function singleProduct() {
            try {
                const { data } = await axios.get(`/api/product/${params?.pid}`)
                setProduct(data?.product)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        singleProduct()
    }, [params?.pid])
    // console.log(produc.rating)
  return (
    <Container>
    <Row>
        <Col lg={5}>
            <Image variant="top" src={produc?.image} className='w-100' />
        </Col>
        <Col lg={5} className='d-flex align-items-center'>
            <div className="">
                <h5>Name: {produc?.name}</h5>
                <p>
                    {
                        produc?.rating &&
                        <ReactStars
                            count={5}
                            value={produc?.rating}
                            size={24}
                            activeColor="#ffd700"
                            edit={false}
                            isHalf={true}
                        />
                    }
                </p>
                <p>Category: {produc?.category?.name}</p>
                <p>Description: {produc?.description}</p>
                <p>Price: <strong>${(produc.price)?.toFixed(2)}</strong></p>

                <Button variant="warning" className='px-5'>Add to Cart</Button>
            </div>
        </Col>
    </Row>
</Container>
  )
}

export default ProductDetails
