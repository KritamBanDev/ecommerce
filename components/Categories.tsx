import { Category } from "@/sanity.types";
import React from "react";
import CategorySelector from "./ui/category-selector";

interface Props {
  categories: Category[];
}

const Categories = ({ categories }: Props) => {
  return (
    <section className="py-8 px-2 md:px-0 bg-gradient-to-r from-primary/5 to-white rounded-xl shadow-sm mb-8 animate-fade-in">
      <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 text-center tracking-tight">
        Shop by Category
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-6 max-w-2xl mx-auto">
        Discover products by browsing our curated categories. Find what you love
        quickly and easily!
      </p>
      <div className="flex justify-center">
        <CategorySelector categories={categories} />
      </div>
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.7s ease-in;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Categories;