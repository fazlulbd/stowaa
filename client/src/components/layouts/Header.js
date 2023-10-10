import React, { useContext } from 'react'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Store } from '../../Store';
const Header = () => {
  const { state, dispatch, cartstate} = useContext(Store)
  const {cart} = cartstate
  const handleLogout = ()=>{
    dispatch({type: 'USER_LOGOUT'})
    localStorage.removeItem('userInfo')
  }
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link to='/' as={Link}>Home</Nav.Link>
            <Nav.Link to='/about' as={Link}>About</Nav.Link>
            <Nav.Link to='/cart' as={Link}>Cart
            {cart.cartItems.length > 0 ?
            <span>{cart.cartItems.length }</span>
            :
            ""
            }
            </Nav.Link>
          </Nav>
          <Nav>
            {
              state.userInfo ?
              <NavDropdown title={state.userInfo.user.name} id="basic-nav-dropdown">
                <NavDropdown.Item to='/account' as={Link}>Manage Account</NavDropdown.Item>
                <NavDropdown.Item > My order </NavDropdown.Item>
                {
                  state.userInfo.user.isAdmin === true ?
                    <NavDropdown.Item to='/dashboard' as={Link}> admin dashboard </NavDropdown.Item>
                  : ""
                }
                
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}> Log out </NavDropdown.Item>
              </NavDropdown>
              :
              <Nav.Link to='/login' as={Link}>Login</Nav.Link>
            }
         
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}

export default Header
