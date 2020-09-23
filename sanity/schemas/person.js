export default {
  name: 'person',
  title: 'slicemasters',
  type: 'document',
  icon: () => '👨🏼‍🍳',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name of the slicer',
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'text',
      description: 'Tell me a little bit about them',
    },
    {
      name: 'slicing',
      title: 'Currently slicing?',
      type: 'boolean',
      options: {
        layout: 'checkbox',
      },
    },
    {
      name: 'image',
      title: 'Photo',
      type: 'image',
      description: "Show me what they've got",
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
  initialValue: {
    slicing: false,
  },
};
