import React, { useEffect, useState } from 'react'
import { Container, Carousel } from 'react-bootstrap'
import {toast} from "react-toastify"
import axios from 'axios'
import {Link} from 'react-router-dom'
const Banners = () => {
    const [banner, setBanner] = useState([])
    useEffect(()=>{
        async function allBanner() {
            try {
                const { data } = await axios.get('/api/banner')
                if (data.success) {
                    setBanner(data.banners)
                }
            } catch (error) {
                console.log(error)
                toast.error('Somthing went wrong in getting product')
            }
        }
        allBanner()
    },[])
    console.log(banner.image)
  return (
    <Container>
    <Carousel>
        {
            banner.map(item => (
                <Carousel.Item interval={3000} key={item._id}>
                    <div className="bann-slider" style={{ background: `url(${item.image}) no-repeat center / cover ` }}>
                        <div className="banner-wrapper">
                        <h6>{item.name}</h6>
                        <h1><span>Smart blood</span> Pressure monitor </h1>
                        <h4>{item.subtitle}</h4>
                        <h2>${(item.price).toFixed(2)}</h2>
                        <Link>{item.button}</Link>
                        </div>
                    </div>
                </Carousel.Item>
            ))
        }
    </Carousel>
</Container>
  )
}

export default Banners
