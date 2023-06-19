import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {FaCar} from 'react-icons/fa'
const NavbarComponent = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Trip <FaCar/></Navbar.Brand>
        </LinkContainer>

        <Nav className="ms-auto">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/live">
            <Nav.Link>Live</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/historic">
            <Nav.Link>Historical</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/status">
            <Nav.Link>Status</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/trips">
            <Nav.Link>Trips</Nav.Link>
          </LinkContainer>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent