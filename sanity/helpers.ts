import { client } from "@/sanity/lib/client";

export async function getProductBySlug(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    price,
    discount,
    description,
    stock,
    images,
    // Add more fields as needed
  }`;
  return await client.fetch(query, { slug });
}

// Helper to get all product slugs for static params
export async function getProductSlugs() {
  const query = `*[_type == "product"]{ "slug": slug.current }`;
  const products = await client.fetch(query);
  return products.map((p: { slug: string }) => p.slug);
}
