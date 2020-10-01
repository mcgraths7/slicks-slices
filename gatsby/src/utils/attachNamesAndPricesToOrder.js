import formatMoney from './formatMoney';
import calculatePizzaPrice from './calculatePizzaPrice';

export default function attachNamesAndPricesToOrder(order, pizzas) {
  return order.map((orderItem) => {
    const pizza = pizzas.find((p) => p.id === orderItem.id);
    return {
      ...orderItem,
      name: pizza.name,
      thumbnail: pizza.image.asset.fluid.src,
      price: formatMoney(calculatePizzaPrice(pizza.price, orderItem.size)),
    };
  });
}
