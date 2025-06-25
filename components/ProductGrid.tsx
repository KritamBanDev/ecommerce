"use client";
import { PRODUCTS_QUERYResult } from "@/sanity.types";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { motion, AnimatePresence } from "motion/react";
import { client } from "@/sanity/lib/client";
import { productType } from "@/constants";
import { Loader2 } from "lucide-react";
import HomeTabbar from "./new/HomeTabbar";
import NoProductAvailable from "./new/NoProductsAvailable";

interface ProductGridProps {
  categorySlug?: string;
}

const ProductGrid = ({ categorySlug }: ProductGridProps) => {
  const [products, setProducts] = useState<PRODUCTS_QUERYResult>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || "");
  const [error, setError] = useState<string | null>(null);
  const [timeoutReached, setTimeoutReached] = useState(false);

  useEffect(() => {
    setError(null);
    setTimeoutReached(false);
    const timer = setTimeout(() => setTimeoutReached(true), 8000); // 8s timeout
    let query = `*[_type == \"product\"] | order(name asc)`;
    let params: Record<string, unknown> = {};
    if (categorySlug) {
      query = `*[_type == 'product' && references(*[_type == \"category\" && slug.current == $categorySlug]._id)] | order(name asc)`;
      params = { categorySlug };
    } else {
      const selectedType = productType.find((type) => type.title === selectedTab);
      if (selectedType) {
        query = `*[_type == \"product\" && variant == $variant] | order(name asc)`;
        params = { variant: selectedType.value };
      }
    }
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await client.fetch(query, params);
        setProducts(response);
        if (!response || response.length === 0) {
          setError('No products found for this category.');
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Failed to fetch products.');
        }
      } finally {
        setLoading(false);
        clearTimeout(timer);
      }
    };
    fetchData();
    return () => clearTimeout(timer);
  }, [selectedTab, categorySlug]);

  return (
    <div className="mt-10 flex flex-col items-center">
      {!categorySlug && (
        <HomeTabbar selectedTab={selectedTab} onTabSelect={setSelectedTab} />
      )}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10">
          <motion.div className="flex items-center space-x-2 text-blue-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Product is loading...</span>
          </motion.div>
          {timeoutReached && (
            <div className="text-red-500 mt-4">Loading is taking too long. Please check your network or Sanity configuration.</div>
          )}
        </div>
      ) : error ? (
        <div className="text-red-500 py-10">{error}</div>
      ) : products?.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-10">
          <>
            {products?.map((product) => (
              <AnimatePresence key={product?._id}>
                <motion.div
                  layout
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ProductCard key={product?._id} product={product} />
                </motion.div>
              </AnimatePresence>
            ))}
          </>
        </div>
      ) : (
        <NoProductAvailable selectedTab={selectedTab} />
      )}
    </div>
  );
};

export default ProductGrid;