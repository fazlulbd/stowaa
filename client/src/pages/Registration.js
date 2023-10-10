import React, { useState } from 'react'
import axios from 'axios'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import {toast } from 'react-toastify';
const Registration = () => {
    const [name, setName]= useState('')
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [cfpassword, setCfpassword]= useState('')

    const [errorName, setErrorName]=useState("")
    const [errorEmail, setErrorEmail]=useState("")
    const [errorPassword, setErrorPassword]=useState("")
    const [errorCfpassword, setErrorCfpassword]=useState("")
    const [matchPassword, setMatchPassword]=useState("")
    const [showpassword, setShowpassword] = useState(false)
    //eslint-disable-next-line
    let emailValidation = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
   
    const handleName = (e)=>{
        setName(e.target.value)
        setErrorName("")
    }
    const handleEmail = (e)=>{
        setEmail(e.target.value)
        setErrorEmail('') 
    }
    const handlePassword = (e)=>{
        setPassword(e.target.value)
        setErrorPassword('')
    }
    const handleConfirmPassword = (e)=>{
        setCfpassword(e.target.value)
        setErrorCfpassword('')
        setMatchPassword('')
    }
    const handelshowpassword = ()=>{
        setShowpassword(!showpassword)
    }
    let handleSubmit = async (e)=>{
        e.preventDefault()
        if(name === ""){
            setErrorName('! Enter your names')
        }
        
        else if(password === ""){
        setErrorPassword('! Enter a password')
        }
        else if(cfpassword === ""){
        setErrorCfpassword('! confirm your password')
        }
        else if(password !== cfpassword){
        setMatchPassword('! Those passwords didn’t match. Try again.')
        }
        else if(email === ""){
            setErrorEmail('! Enter your email')
        }else{
            
            if(!emailValidation){               
            setErrorEmail("! Enter your valide email")
            }
        }
        if(name && email && password && emailValidation){
            try{
                const {data} = await axios.post("/api/user/register", {name, email, password})
                if(data && data.success){
                    toast.success(data.message)
                }else{
                    toast.error(data.message)
                }
            }catch(error){
                console.log(error)
                toast.error('Somthing went wrong')
            }
        }
    }
    return (
        <Container>
            <Row className='d-flex justify-content-center mt-5'>
                <Col lg={4}>
                    <div className="shadow-lg bg-body rounded p-4 ">
                        <h3 className='text-center'>Registration</h3>
                        <div className="register-wrapper">
                            <Form onSubmit>
                                <Form.Group className="mb-4" controlId="validationCustomUsername">
                                    <Form.Control onChange={handleName} type="text" placeholder="Enter your Full Name" /> 
                                    {
                                        errorName ?
                                        <Form.Text className="text-muted register-text">
                                            {errorName}
                                        </Form.Text>
                                        : ""
                                    }                                 
                                </Form.Group>
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
                                <Form.Group className="mb-4 register-icom" controlId="validationCustom01">
                                    <Form.Control onChange={handleConfirmPassword} type={showpassword? "text" : 'password'} placeholder="Confirm Password" />
                                    {
                                        showpassword?
                                        <h5 onClick={handelshowpassword}> <AiOutlineEye/></h5>
                                        :
                                        <h5 onClick={handelshowpassword}> <AiOutlineEyeInvisible/></h5>
                                    }
                                    {
                                        errorCfpassword ?
                                        <Form.Text className="text-muted register-text">
                                            {errorCfpassword}
                                        </Form.Text>
                                        : ""
                                    }
                                    {
                                        matchPassword ?
                                        <Form.Text className="text-muted register-text">
                                            {matchPassword}
                                        </Form.Text>
                                        : ""
                                    }
                                </Form.Group>

                                <Button className='w-100' onClick={handleSubmit} variant="string" type="submit">Submit</Button>
                                <div className=" mt-3">
                                <Form.Text className="text-muted">
                                  <h6> Already have an account? <Link to='/login'>Sign in</Link></h6>
                                </Form.Text>
                                </div>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Registration
