import { useState } from 'react';

export default function usePizza({ pizzas, inputs }) {
  const [order, setOrder] = useState([]);

  function addToOrder(pizza) {
    setOrder([...order, pizza]);
  }

  function removeFromOrder(pizzaIndex) {
    setOrder([...order.slice(0, pizzaIndex), ...order.slice(pizzaIndex + 1)]);
  }
  // TODO:
  /*
    1. Create some state to hold our order
    2. make a function to add things to cart
    3. make a function to remove things from cart
    4. send data to serverless function
  */
  return { order, addToOrder, removeFromOrder };
}
