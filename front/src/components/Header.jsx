import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Header.css';

function Header() {
  return (
    <Navbar expand="lg" bg="brown" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Café Gourmet
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Início
            </Nav.Link>
            <Nav.Link as={Link} to="/cardapio">
              Cardápio
            </Nav.Link>
            <Nav.Link as={Link} to="/pedidos">
              Fazer Pedido
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/login">
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
