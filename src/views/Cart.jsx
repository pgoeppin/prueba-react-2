import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { PizzaContext } from "../context/PizzaContext";

export default function Cart() {
  const { cart, addPizza, removePizza, sumCart } =
    React.useContext(PizzaContext);
  return (
    <Container className="mt-5 p-5 cart">
      <h4 className="p-2 m-0">Detalles del pedido: </h4>
      <Container className="p-2 products">
        {cart.map((pizza) => (
          <div key={pizza.id} className="product-line px-3 pt-3">
            <Row>
              <Col className="d-flex align-items-center">
                <div className="img-holder">
                  <img
                    src={pizza.img}
                    className="img-fluid"
                    alt="Imagen de pizza"
                  />
                </div>
                <p className="px-2 m-0 fs-5">
                  {pizza.name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                    letter.toUpperCase()
                  )}
                </p>
              </Col>
              <Col className="d-flex justify-content-end">
                <p className="text-success fs-5 fw-semibold m-0 p-0">
                  $ {pizza.price * pizza.count}
                </p>
                {pizza.isBuyed ? (
                  <div className="gap-2">
                    <Button
                      variant="danger"
                      className="px-3 mx-2"
                      onClick={() => {
                        removePizza(pizza.id);
                      }}
                    >
                      <span className="fs-5">-</span>
                    </Button>
                    <span className="fs-5">
                      {pizza.count ? pizza.count : undefined}
                    </span>
                    <Button
                      variant="success"
                      className="px-3 mx-2"
                      onClick={() => {
                        addPizza(pizza.id);
                      }}
                    >
                      <span className="fs-5">+</span>
                    </Button>
                  </div>
                ) : undefined}
              </Col>
            </Row>
            <hr />
          </div>
        ))}
        <Container>
          <h1>Total: ${sumCart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h1>
          <Container className="d-flex gap-2 justify-content-start">
            <Button variant="success">Ir a Pagar</Button>
            <Link to="/">
            <Button>Volver a Inicio</Button>
            </Link>
          </Container>  
        </Container>
      </Container>
    </Container>
  );
}
