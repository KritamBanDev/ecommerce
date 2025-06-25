// Usage: node seed-products.js
require('dotenv').config();
const sanityClient = require('@sanity/client');

const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const products = [
  {
    _type: 'product',
    name: 'Classic White T-Shirt',
    slug: { _type: 'slug', current: 'classic-white-tshirt' },
    price: 29.99,
    stock: 50,
    description: 'A timeless white t-shirt for everyday wear.',
    variant: 'tshirt',
    status: 'new',
  },
  {
    _type: 'product',
    name: 'Blue Denim Jacket',
    slug: { _type: 'slug', current: 'blue-denim-jacket' },
    price: 59.99,
    stock: 20,
    description: 'Stylish blue denim jacket for all seasons.',
    variant: 'jacket',
    status: 'hot',
  },
  {
    _type: 'product',
    name: 'Comfy Black Hoodie',
    slug: { _type: 'slug', current: 'comfy-black-hoodie' },
    price: 39.99,
    stock: 35,
    description: 'A soft, warm hoodie for chilly days.',
    variant: 'hoodie',
    status: 'sale',
    discount: 10,
  },
];

async function seed() {
  for (const product of products) {
    try {
      const res = await client.create(product);
      console.log('Created:', res.name);
    } catch (err) {
      console.error('Error creating product:', product.name, err.message);
    }
  }
  console.log('Seeding complete!');
}

seed();
