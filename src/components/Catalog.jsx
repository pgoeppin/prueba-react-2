import React from "react";
import { PizzaContext } from "../context/PizzaContext";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

export default function Catalog() {
  const { pizzas, buyPizza, addPizza, removePizza } =
    React.useContext(PizzaContext);
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-wrap gap-3 justify-content-center pt-5 container">
      {pizzas.map((pizza) => (
        <Card key={pizza.id} style={{ width: "18rem" }}>
          <Card.Img variant="top" src={pizza.img} />
          <Card.Body>
            <Card.Title>
              {pizza.name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                letter.toUpperCase()
              )}
            </Card.Title>
            <hr />
            <Container>
              <ul>
                {pizza.ingredients
                  ? pizza.ingredients.map((ingredient, i) => (
                      <li className="ingredientes" key={i}>
                        🍕{" "}
                        {ingredient.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                          letter.toUpperCase()
                        )}
                      </li>
                    ))
                  : undefined}
              </ul>
            </Container>
            <hr />
            <Card.Subtitle className="text-center mb-3 fs-3">
              $ {pizza.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </Card.Subtitle>
            {pizza.isBuyed ? (
              <Container className="d-flex gap-2 justify-content-center m-2">
                <Button variant="danger"
                className="px-3"
                  onClick={() => {
                    removePizza(pizza.id);
                  }}
                >
                  <span className="fs-5">-</span>
                </Button>
                <span className="fs-5">{pizza.count ? pizza.count : undefined}</span>
                <Button variant="success"
                className="px-3"
                  onClick={() => {
                    addPizza(pizza.id);
                  }}
                >
                 +
                </Button>
              </Container>
            ) : undefined}
            <Container className="d-flex gap-2 justify-content-around">
              <Button
                onClick={() => {
                  navigate(`/pizza/${pizza.id}`);
                }}
                variant="info"
                className="text-white"
              >
                Ver más 👀
              </Button>
              <Button
                onClick={() => {
                  buyPizza(pizza.id);
                }}
                variant="danger"
              >
                Añadir 🛒
              </Button>
            </Container>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
