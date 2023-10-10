import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {toast } from 'react-toastify';
import { Store } from '../Store';
const Login = () => {
    const navigate = useNavigate()
    let {search} =useLocation()
    let redirectUrl = new URLSearchParams(search).get('redirect')
    let redirect = redirectUrl ? redirectUrl : "/"
    const {state, dispatch} = useContext(Store)
    const {userInfo} = state
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
        try{
            const {data} = await axios.post("/api/user/login", { email, password})
            if(data && data.success){
                toast.success(data.message)
                dispatch({type:'USER_LOGIN', payload: data})
                localStorage.setItem('userInfo', JSON.stringify(data))
                navigate(redirect ||'/')
            }else{
                toast.error(data.message)
            }
        }catch(error){
            console.log(error)
            toast.error('Somthing went wrong')
        }
    }
    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
        // eslint-disable-next-line
    },[])
  return (
    <Container>
            <Row className='d-flex justify-content-center mt-5'>
                <Col lg={4}>
                    <div className="shadow-lg bg-body rounded p-4 ">
                        <h3 className='text-center'>Login</h3>
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
                                <div className="mt-3">
                                   <Form.Text className="text-muted" style={{cursor:"pointer"}}>
                                        <h6> Don't have an Account? <Link to='/registration'>Sign up</Link></h6>                
                                    </Form.Text>
                                    <Form.Text className="text-muted pt-5" style={{cursor:"pointer"}}>
                                        <h6 onClick={()=>{navigate("/forgotPassword")}}>Forgot your password ?</h6>                                       
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

export default Login
