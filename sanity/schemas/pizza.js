import PriceInput from '../components/PriceInput';

const formatMoney = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format;

export default {
  name: 'pizza',
  title: 'pizzas',
  type: 'document',
  icon: () => '🍕',
  fields: [
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
      description: 'Name of the pizza',
    },
    {
      name: 'price',
      title: 'Pizza Price',
      type: 'number',
      inputComponent: PriceInput,
      description: 'How much does it cost in cents?',
      validation: (Rule) => Rule.min(1000).max(50000),
      // TODO: Add custom input component
    },
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topping' }] }],
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      price: 'price',
      toppingName0: 'toppings.0.name',
      toppingName1: 'toppings.1.name',
      toppingName2: 'toppings.2.name',
      toppingName3: 'toppings.3.name',
      toppingVeg0: 'toppings.0.vegetarian',
      toppingVeg1: 'toppings.1.vegetarian',
      toppingVeg2: 'toppings.2.vegetarian',
      toppingVeg3: 'toppings.3.vegetarian',
    },
    prepare: ({ title, media, price, ...toppings }) => {
      const filteredTopNames = Object.values(toppings)
        .slice(0, 3)
        .filter(Boolean);
      const filteredVeg = Object.values(toppings)
        .slice(4, 7)
        .filter((v) => v !== undefined);
      const isVeg = filteredVeg.every((v) => v === true);
      const modifiedTitle = isVeg ? `🌱 ${title}` : title;
      const formattedPrice = price ? formatMoney(price / 100) : '$0.00';

      return {
        title: `${modifiedTitle} - ${formattedPrice}`,
        media,
        subtitle: filteredTopNames.join(', '),
      };
    },
  },
};
