import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
const NavbarComponent = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>GPS Distance Calculator</Navbar.Brand>
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