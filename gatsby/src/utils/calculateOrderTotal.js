import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotal(order, pizzas) {
  return order.reduce((total, currentOrderItem) => {
    const pizza = pizzas.find((p) => p.id === currentOrderItem.id);
    const pizzaPrice = calculatePizzaPrice(pizza.price, currentOrderItem.size);
    return total + pizzaPrice;
  }, 0);
}
