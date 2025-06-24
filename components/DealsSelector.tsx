"use client";
import { PRODUCTS_QUERYResult } from "@/sanity.types";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { client } from "@/sanity/lib/client";
import ProductCard from "@/components/ProductCard";
import Container from "@/components/Container";
import Loading from "@/components/Loading";

const DealsSection = () => {
  const [products, setProducts] = useState<PRODUCTS_QUERYResult>([]);
  const [loading, setLoading] = useState(false);

  const query = `*[_type == "product"] | order(name asc)`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await client.fetch(query);
        setProducts(response);
      } catch (error) {
        console.log("Product fetching Error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Container className="py-10">
      <div className="text-center mb-8 animate-fade-in">
        <h2 className="font-bold text-2xl md:text-3xl text-primary mb-2">
          Get your best shopping deals with us
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Explore our exclusive deals and discounts. Limited time offers on top
          products—grab yours now!
        </p>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-fade-in">
          <AnimatePresence>
            {products?.map((product) => (
              <motion.div
                key={product?._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, type: "spring" }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
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
    </Container>
  );
};

export default DealsSection;