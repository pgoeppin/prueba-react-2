import React from "react";
import { useParams, Link } from "react-router-dom";
import { PizzaContext } from "../context/PizzaContext";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export default function PizzaDetails() {
  const { pizzaId } = useParams();
  const { pizzas, buyPizza, addPizza, removePizza } = React.useContext(PizzaContext);
  const pizzaDetail = pizzas.filter((pizza) => pizza.id === pizzaId);

  return (
    <Container className="pt-5">
      {pizzaDetail.map((pizza) => (
        <div key={pizza.id} className="card mb-3">
          <div className="row g-0">
            <div
              className="col-4"
              style={{ backgroundImage: `url(${pizza.img})` }}
            ></div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">
                  {pizza.name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                    letter.toUpperCase()
                  )}
                </h5>
                <hr />
                <p className="card-text">{pizza.desc}</p>
                <Container>
                  <h5>Ingredientes: </h5>
                  <ul>
                    {pizza.ingredients
                      ? pizza.ingredients.map((ingredient, i) => (
                          <li className="ingredientes" key={i}>
                            🍕{" "}
                            {ingredient.replace(
                              /(^\w{1})|(\s+\w{1})/g,
                              (letter) => letter.toUpperCase()
                            )}
                          </li>
                        ))
                      : undefined}
                  </ul>
                </Container>
                {pizza.isBuyed ? (
              <Container className="d-flex gap-2 justify-content-end m-2">
                <Button variant="danger"
                className="px-3"
                  onClick={() => {
                    removePizza(pizza.id);
                  }}
                >
                  -
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
                <div className="d-flex justify-content-between">
                  <p className="fs-2">
                    Precio: ${" "}
                    {pizza.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  </p>
                  <div>
                    <Link to="/">
                      <Button className="mx-2 text-white" variant="info">
                        {" "}
                        Volver{" "}
                      </Button>
                    </Link>
                    <Button onClick={()=> {buyPizza(pizza.id)}} variant="danger">Añadir 🛒</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Container>
  );
}
