import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../Store'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import axios from 'axios'
import { toast } from 'react-toastify'

const Account = () => {
  const { state} = useContext(Store)
  const { userInfo } = state

  let [name, setName] = useState('')
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')

  useEffect(() => {
    const { email, name } = userInfo?.user
    setName(name)
    setEmail(email)
  }, [userInfo?.user])

  let handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.put("/api/user/profile", { name, email, password}, {headers:{"Authorization": userInfo?.token}})
      if (data.error) {
        toast.error(data.error)
      }else {
        toast.success("Profile Updated Successfully")
      }
    } catch (error) {
      console.log(error)
      toast.error('Somthing went wrong')
    }

  }

  return (
    <Container>
      <Row className='d-flex justify-content-center'>
        <Col lg={4}>
          <div className="login mt-5">
            <h2>Manage Account</h2>
            <Form className='p-4'>
              <Form.Group className="mb-4" controlId="validationCustomUsername">
                <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter your name" />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" disabled placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="dark" type="submit" onClick={handleSubmit}> Submit </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Account
