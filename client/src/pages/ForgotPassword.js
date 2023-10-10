import React, { useState } from 'react'
import axios from 'axios'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import {toast } from 'react-toastify';
const ForgotPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [errorEmail, setErrorEmail]=useState("")
    const [errorPassword, setErrorPassword]=useState("")
    const [showpassword, setShowpassword] = useState(false)

    const handleEmail = (e)=>{
        setEmail(e.target.value)
        setErrorEmail('') 
    }
    const handlePassword = (e)=>{
        setPassword(e.target.value)
        setErrorPassword('')
    }
    const handelshowpassword = ()=>{
        setShowpassword(!showpassword)
    }

    let handleSubmit = async (e)=>{
        e.preventDefault()     
        if(email === ""){
        setErrorEmail('! Enter your email')
        }
        else if(password === ""){
        setErrorPassword('! Enter a password')
        }
        if(email && password){
            try {
                const {data} = await axios.post("/api/user/forgot-password", { email,  newPassword:password })
                if (data && data.success) {
                  toast.success(data.message)
                  navigate('/login')
          
                } else {
                  toast.error(data.message)
                }
            } catch (error) {
                console.log(error)
                toast.error('Somthing went wrong')
            }
        }
        navigate('/login')
    }
  return (
    <Container>
    <Row className='d-flex justify-content-center mt-5'>
        <Col lg={4}>
            <div className="shadow-lg bg-body rounded p-4 ">
                <h3 className='text-center'>Forgot Password</h3>
                <div className="register-wrapper">
                    <Form onSubmit>
                        <Form.Group className="mb-4" controlId="formBasicEmail">
                            <Form.Control onChange={handleEmail} type="email" placeholder="Enter email" /> 
                            {
                                errorEmail ?
                                <Form.Text className="text-muted register-text">
                                    {errorEmail}
                                </Form.Text>
                                : ""
                            }                                 
                        </Form.Group>
                        <Form.Group className="mb-4 register-icom" controlId="formBasicPassword">
                            <Form.Control type={showpassword? "text" : 'password'} onChange={handlePassword} placeholder="Password" />
                            {
                                showpassword?
                                <h5 onClick={handelshowpassword}> <AiOutlineEye/></h5>
                                :
                                <h5 onClick={handelshowpassword}> <AiOutlineEyeInvisible/></h5>
                            }
                            {
                                errorPassword ?
                                <Form.Text className="text-muted register-text">
                                {errorPassword}
                                </Form.Text>
                                : ""
                            }
                        </Form.Group>
                       
                        <Button className='w-100' onClick={handleSubmit} variant="string" type="submit">Submit</Button>
                    </Form>
                </div>
            </div>
        </Col>
    </Row>
</Container>
  )
}

export default ForgotPassword
