"use client";
import { CATEGORIES_QUERYResult, Product } from "@/sanity.types";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { motion, AnimatePresence } from "motion/react";
import { Loader2 } from "lucide-react";
import ProductCard from "../ProductCard";
import NoProductAvailable from "../new/NoProductsAvailable";
import { useCategoryStore } from "@/store/categoryStore";

interface Props {
  categories: CATEGORIES_QUERYResult;
  slug: string;
}

const CategoryProducts = ({ categories, slug }: Props) => {
  const [currentSlug, setCurrentSlug] = useState(slug);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setCategory = useCategoryStore((state) => state.setCategory);

  const fetchProducts = async (categorySlug: string) => {
    try {
      setLoading(true);
      setError(null);
      const query = `
        *[_type == 'product' && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc)
      `;
      const data = await client.fetch(query, { categorySlug });
      setProducts(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Unknown error');
      }
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentSlug);
  }, [currentSlug]);

  useEffect(() => {
    setCategory(currentSlug);
  }, [currentSlug, setCategory]);

  useEffect(() => {
    setCurrentSlug(slug);
    setCategory(slug);
  }, [slug, setCategory]);

  return (
    <div className="py-8 flex flex-col md:flex-row items-start gap-10">
      <aside className="flex flex-col md:min-w-56 bg-gradient-to-br from-white via-blue-50 to-fuchsia-100 rounded-2xl shadow-lg border border-zinc-100 overflow-hidden mr-8 p-2">
        {categories?.map((item) => (
          <Button
            key={item?._id}
            onClick={() => {
              setCurrentSlug(item?.slug?.current as string);
              setCategory(item?.slug?.current as string);
            }}
            className={`border-0 rounded-xl my-1 shadow-none font-medium transition-all duration-200 border-l-4 border-l-transparent px-6 py-3 text-base tracking-wide text-left flex items-center gap-2 group hover:bg-fuchsia-100 hover:text-fuchsia-700 ${item?.slug?.current === currentSlug ? "border-l-fuchsia-500 bg-white font-bold" : ""} ${item?.slug?.current !== currentSlug ? "opacity-90 text-zinc-700 bg-white/80" : ""}`}
            style={{ borderBottom: 'none' }}
            disabled={item?.slug?.current === currentSlug}
          >
            <span className={item?.slug?.current === currentSlug ? "bg-gradient-to-r from-fuchsia-500 via-blue-500 to-fuchsia-400 bg-clip-text text-transparent" : ""}>
              {item?.title}
            </span>
          </Button>
        ))}
      </aside>
      <div className="w-full">
        {error && (
          <div className="text-red-600 text-center py-4">Error: {error}</div>
        )}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full">
            <motion.div className="flex items-center space-x-2 text-blue-600">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Product is loading...</span>
            </motion.div>
          </div>
        ) : products?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2 justify-items-center">
            <>
              {products?.map((product: Product) => (
                <AnimatePresence key={product?._id}>
                  <motion.div
                    layout
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white rounded-2xl shadow-md h-full flex flex-col"
                  >
                    <ProductCard key={product._id} product={product} />
                  </motion.div>
                </AnimatePresence>
              ))}
            </>
          </div>
        ) : (
          <NoProductAvailable
            selectedTab={currentSlug}
            className="mt-0 w-full"
          />
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
