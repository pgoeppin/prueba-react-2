import React from "react";
import axios from "axios";

export const PizzaContext = React.createContext({});

const PizzaProvider = (props) => {
  const [pizzas, setPizzas] = React.useState([]);
  const [cart, setCart] = React.useState([]);
  React.useEffect(() => {
    const getPizzas = async () => {
      try {
        const endpoint = "./pizzas.json";
        const r = await axios.get(endpoint);
        setPizzas(r.data);
      } catch (error) {
        alert(error);
      }
    };
    getPizzas();
  }, []);
  const buyPizza = (id) => {
    const pizzaCart = pizzas.map((pizza) => {
      if (pizza.id === id) {
        if (!pizza.isBuyed) {
          return { ...pizza, isBuyed: true, count: 1 };
        } else if (pizza.isBuyed) {
          return { ...pizza, count: pizza.count + 1 };
        }
      }
      return pizza;
    });
    setPizzas(pizzaCart);
    setCart(
      pizzaCart.filter((pizza) => {
        return Boolean(pizza.isBuyed)
      })
    );
  };
  const addPizza = (id) => {
    const addingPizza = pizzas.map((pizza) => {
      if (pizza.id === id && pizza.isBuyed) {
        return { ...pizza, count: pizza.count + 1 };
      }
      return pizza;
    });
    setPizzas(addingPizza);
    setCart(
      addingPizza.filter((pizza) => {
        return Boolean(pizza.isBuyed)
      })
    );
  };
  const removePizza = (id) => {
    const removingPizza = pizzas.map((pizza) => {
        if (pizza.id === id && pizza.count > 0 && pizza.isBuyed === true) {
            if (pizza.count === 1) {
                return { ...pizza, count: undefined, isBuyed: !pizza.isBuyed}
            } else {
                return { ...pizza, count: pizza.count -1 };
            } 
        } else if (pizza.id === id && pizza.count === 0 && pizza.isBuyed ) {
            return { ...pizza, count: undefined, isBuyed: undefined };
        }
        return pizza;
    });
    setPizzas(removingPizza)
    setCart(
        removingPizza.filter((pizza) => {
            return Boolean(pizza.isBuyed)
        })
    )
  };
  const sumCart = cart.reduce((a,b) => a + b.price * b.count, 0)
  return (
    <PizzaContext.Provider
      value={{ pizzas, buyPizza, addPizza, removePizza, cart, sumCart }}
    >
      {props.children}
    </PizzaContext.Provider>
  );
};
export default PizzaProvider;
