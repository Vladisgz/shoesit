export default {
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name of product',
    },
    {
      name: 'images',
      type: 'array',
      title: 'Product Images',
      of: [{type: 'image'}],
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description of product',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Product Slug',
      options: {
        source: 'name',
      },
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price',
    },
    {
      name: 'price_id',
      title: 'Stripe Price Id',
      type: 'string',
    },
    {
      name: 'sale',
      title: 'Sale',
      type: 'string',
    },
    {
      name: 'percent',
      title: 'Percent number',
      type: 'number',
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
    },
    {
      name: 'reviews',
      title: 'Reviews',
      type: 'number',
    },

    {
      name: 'category',
      title: 'Product Category',
      type: 'reference',
      to: [{type: 'category'}],
    },
  ],
}
