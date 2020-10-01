const sizes = {
  S: 0.75,
  M: 1,
  L: 1.25,
};

export default function calculatePizzaPrice(price, size) {
  console.log(price, size);
  return Math.round(price * sizes[size]);
}
