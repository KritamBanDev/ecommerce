import React from "react";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import ProductCard from "@/components/ProductCard";
import NoProductAvailable from "@/components/new/NoProductsAvailable";
import Container from "@/components/Container";
import { Product } from "@/sanity.types";

export default async function CategoryPage({ slug }: { slug: string }) {
  // Fetch products for this category
  const products = await client.fetch(
    `*[_type == 'product' && references(*[_type == "category" && slug.current == $slug]._id)] | order(name asc)`,
    { slug }
  );

  // Fetch category info (optional, for title)
  const category = await client.fetch(
    `*[_type == 'category' && slug.current == $slug][0]`,
    { slug }
  );

  if (!category) return notFound();

  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">{category.title}</h1>
      {products?.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-10">
          {products.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <NoProductAvailable selectedTab={category.title || slug} />
      )}
    </Container>
  );
}

export async function generateStaticParams() {
  const categories = await client.fetch(`*[_type == "category"]{ "slug": slug.current }`);
  return categories.map((cat: { slug: string }) => ({ slug: cat.slug }));
}
