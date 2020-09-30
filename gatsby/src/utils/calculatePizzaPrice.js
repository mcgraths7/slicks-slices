import formatMoney from './formatMoney';

const CENTS_PER_DOLLAR = 100;

const sizes = {
  S: 0.75,
  M: 1,
  L: 1.25,
};

export default function calculatePizzaPrice(price, size) {
  return formatMoney((price / CENTS_PER_DOLLAR) * sizes[size]);
}
