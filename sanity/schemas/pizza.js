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
      topping0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
      topping3: 'toppings.3.name',
    },
    prepare: ({ title, media, ...toppings }) => {
      // Filter undefined toppings out
      // return preview object
      // const filteredToppings = Object.values(toppings).filter(
      //   (topping) => topping !== undefined
      // );
      const filteredTops = Object.values(toppings).filter(Boolean);
      return {
        title,
        media,
        subtitle: filteredTops.join(', '),
      };
    },
  },
};
