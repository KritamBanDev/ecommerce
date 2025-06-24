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
