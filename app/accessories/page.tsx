import Container from "@/components/Container";
import CategoryProducts from "@/components/new/CategoryProducts";
import Title from "@/components/Title";
import { getAllCategories } from "@/sanity/helpers/index";
import Image from "next/image";
import React from "react";
import { Category } from "@/sanity.types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AccessoriesPage = async () => {
  const categories = await getAllCategories();
  const category = categories.find(
    (cat: Category) => cat.slug?.current?.toLowerCase() === "accessories"
  );

  return (
    <>
      <Header />
      <div>
        {/* Category Hero Section */}
        {category && (
          <section className="relative flex flex-col md:flex-row items-center gap-8 mb-12 p-8 rounded-3xl bg-gradient-to-br from-fuchsia-100 via-blue-50 to-white shadow-2xl border border-fuchsia-100/40 animate-fade-in overflow-hidden">
            {/* Decorative blurred background */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-fuchsia-200/30 to-blue-200/10 rounded-full blur-3xl pointer-events-none z-0 animate-float" />
            <Image
              src={category.image?.asset?.url || "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80"}
              alt={category.title || "Category image"}
              width={224}
              height={224}
              className="w-36 h-36 md:w-56 md:h-56 object-cover rounded-2xl shadow-xl border-2 border-fuchsia-200 bg-white z-10 transition-transform duration-300 hover:scale-105"
            />
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left z-10">
              <Title className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-700 via-fuchsia-600 to-pink-500 bg-clip-text text-transparent drop-shadow-lg mb-3 tracking-tight">
                {category.title}
              </Title>
              {category.description && (
                <p className="text-gray-700 text-lg md:text-2xl max-w-2xl mb-2 animate-fade-in font-medium">
                  {category.description}
                </p>
              )}
              <span className="inline-block mt-2 px-4 py-1 rounded-full bg-fuchsia-100 text-fuchsia-700 text-xs font-bold uppercase tracking-widest shadow-sm border border-fuchsia-200">
                {category.title}
              </span>
            </div>
          </section>
        )}
        <Container className="py-6">
          <Title className="text-2xl md:text-3xl mb-6 font-bold flex items-center gap-2">
            <span className="inline-block w-2 h-8 bg-gradient-to-b from-fuchsia-400 to-blue-400 rounded-full mr-2" />
            Products by Category:{" "}
            <span className="font-extrabold text-green-600 capitalize tracking-wide">
              {category?.title || "Accessories"}
            </span>
          </Title>
          <CategoryProducts categories={categories} slug="accessories" />
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default AccessoriesPage;
