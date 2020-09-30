export default function formatMoney(priceInCents) {
  const formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(priceInCents);
}
