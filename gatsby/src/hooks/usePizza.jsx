import { useContext, useState } from 'react';

import OrderContext from '../components/OrderContext';
import attachNamesAndPricesToOrder from '../utils/attachNamesAndPricesToOrder';
import calculateOrderTotal from '../utils/calculateOrderTotal';
import formatMoney from '../utils/formatMoney';

export default function usePizza({ pizzas, values }) {
  // const [order, setOrder] = useState([]);
  // Replacing useState with useContext
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [message, setMessage] = useState('');

  function addToOrder(pizza) {
    setOrder([...order, pizza]);
  }

  function removeFromOrder(pizzaIndex) {
    setOrder([...order.slice(0, pizzaIndex), ...order.slice(pizzaIndex + 1)]);
  }

  // 4. send data to serverless function
  // run when form is submit
  async function submitOrder(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    const body = {
      name: values.name,
      email: values.email,
      order: attachNamesAndPricesToOrder(order, pizzas),
      orderTotal: formatMoney(calculateOrderTotal(order, pizzas)),
      mapleSyrup: values.mapleSyrup,
    };
    const response = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    const t = await response.text();
    const text = JSON.parse(t);

    // 1 check if everything worked
    // 2 if response.status >= 400 && response.status <= 600 BAD
    if (response.status >= 400 && response.status <= 600) {
      setLoading(false);
      setError(text.error);
    } else {
      setLoading(false);
      setMessage(text.message);
    }
  }
  // TODO:

  return {
    order,
    addToOrder,
    removeFromOrder,
    submitOrder,
    error,
    loading,
    message,
  };
}
