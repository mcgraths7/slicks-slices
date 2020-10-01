const CENTS_PER_DOLLAR = 100;

export default function formatMoney(priceInCents) {
  const formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(priceInCents / CENTS_PER_DOLLAR);
}
