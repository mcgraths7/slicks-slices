export default {
  name: 'storeSettings',
  title: 'settings',
  type: 'document',
  icon: () => '🏬',
  fields: [
    {
      name: 'name',
      title: 'Store Name',
      type: 'string',
    },
    {
      name: 'slicemaster',
      title: 'Slicemasters Currently Slicing',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
    },
    {
      name: 'hotSlices',
      title: 'Hot Slices Available in the Case Today',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'pizza' }] }],
    },
  ],
};
