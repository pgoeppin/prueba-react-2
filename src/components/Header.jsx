import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import { PizzaContext } from "../context/PizzaContext";
import React from "react";

function Header() {
    const setActiveClass = ({ isActive }) => (isActive ? "active" : "unactive");
    const { sumCart } = React.useContext(PizzaContext)
    

  return (
    <Navbar bg="info" variant="dark">
      <Container>
        <Nav className="me-auto">
          <NavLink className={setActiveClass} to="/" end>
            <Navbar.Brand>🍕 Pizzería Mamma Mia!</Navbar.Brand>
          </NavLink>
        </Nav>
      </Container>
      <Container className="d-flex justify-content-end px-5">
        <NavLink className={setActiveClass} to="/cart" end>
        <span className="fs-5">🛒 $ {sumCart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
        </NavLink>
      </Container>
    </Navbar>
  );
}

export default Header;