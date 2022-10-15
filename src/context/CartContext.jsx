import React from "react";
import { PizzaContext } from "../context/PizzaContext";

export const CartContext = React.createContext({});

const CartProvider = (props) => {
    const [cart, setCart] = React.useState([]);
    const { pizzas } = React.useContext(PizzaContext); 
    const addPizza = (id) => {
        console.log('hola') 
    }
    return (
        <CartProvider.Context value={{cart, setCart, addPizza}}>
            {props.children}
        </CartProvider.Context>
    )
}
export default CartProvider;
