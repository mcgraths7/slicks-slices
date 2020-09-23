export default {
  name: 'topping',
  title: 'toppings',
  type: 'document',
  icon: () => '🌶',
  fields: [
    {
      name: 'name',
      title: 'Topping Name',
      type: 'string',
      description: 'Name of the topping',
    },
    {
      name: 'vegetarian',
      title: 'Vegetarian?',
      type: 'boolean',
      options: { layout: 'checkbox' },
    },
  ],
  initialValue: {
    vegetarian: false,
  },
  preview: {
    select: {
      name: 'name',
      vegetarian: 'vegetarian',
    },
    prepare: ({ name, vegetarian }) => ({
      title: `${name} ${vegetarian ? '🌱' : ''}`,
    }),
  },
};
