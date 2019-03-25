// navBar.jsx
import React from 'react'
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NavBar = () => (
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <LinkContainer to="/">
          <Navbar.Brand href="#home">My Application</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/events">
              <Nav.Link>Events</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Rekeningen" id="basic-nav-dropdown">
              <LinkContainer to="/rekeningen">
                <NavDropdown.Item>Rekeningen</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/bunq">
                <NavDropdown.Item>Bunq</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/bunq/oauth">
                <NavDropdown.Item>Bunq OAuth</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <NavDropdown title="Meterstanden" id="basic-nav-dropdown">
              <LinkContainer to="/meterstanden_warmte">
                <NavDropdown.Item>Warmte</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/meterstanden">
                <NavDropdown.Item>Elektra</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://ericjansen.dynu.net/api/enelogic/oauth/formaturl">Enelogic OAuth</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
)

export default NavBar
