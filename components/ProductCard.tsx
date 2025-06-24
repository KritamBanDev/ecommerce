"use client";

import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";
import PriceView from "./PriceView";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import Title from "./Title";

const ProductCard = ({ product }: { product: Product }) => {
  const isOutOfStock = product?.stock === 0;
  const isNew = product?.status === "new";
  const isSale = product?.discount && product.discount > 0;

  return (
    <div className="relative w-full max-w-xs h-[480px] rounded-3xl overflow-hidden group text-sm shadow-2xl bg-gradient-to-br from-white/90 via-zinc-100/90 to-fuchsia-50/80 transition-transform duration-300 hover:-translate-y-2 hover:shadow-fuchsia-200/60 hover:scale-[1.025] border border-zinc-200 flex flex-col animate-fade-in">
      {/* Animated blurred background shape */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-60 h-60 bg-gradient-to-br from-fuchsia-300/20 to-blue-300/10 rounded-full blur-3xl pointer-events-none z-0 animate-float" />
      <div
        className="overflow-hidden relative flex-shrink-0 z-10"
        style={{ height: "290px" }}
      >
        {product?.images && (
          <Link href={`/product/${product?.slug?.current}`} className="block">
            <Image
              src={urlFor(product.images[0]).url()}
              alt={product?.name || "productImage"}
              width={320}
              height={290}
              priority
              className={`w-full h-full object-contain transition-transform duration-500 ${
                !isOutOfStock ? "group-hover:scale-110" : "opacity-60 grayscale"
              }`}
            />
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            {/* Badges */}
            {isOutOfStock && (
              <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg z-10 animate-pulse">
                Out of Stock
              </span>
            )}
            {isNew && !isOutOfStock && (
              <span className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-fuchsia-400 text-white text-xs px-3 py-1 rounded-full font-extrabold shadow-lg z-10 animate-bounce border border-white/70">
                New
              </span>
            )}
            {isSale && !isOutOfStock && (
              <span className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-pink-400 text-black text-xs px-3 py-1 rounded-full font-extrabold shadow-lg z-10 animate-pulse border border-white/70">
                -{product.discount}%
              </span>
            )}
            {/* Quick Add to Cart overlay */}
            {!isOutOfStock && (
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <AddToCartButton
                  product={product}
                  className="!px-5 !py-2 !text-xs !rounded-full !bg-gradient-to-r !from-blue-600 !to-fuchsia-500 !text-white !font-bold !shadow-xl hover:!bg-black/90 hover:!scale-105 transition-all duration-200 border-2 border-white/30"
                />
              </div>
            )}
          </Link>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between py-6 px-5 gap-3 bg-white/80 border-t border-zinc-100 rounded-b-3xl backdrop-blur-md z-10">
        <div>
          <Title className="text-lg font-extrabold line-clamp-1 text-darkColor group-hover:text-fuchsia-700 transition-colors duration-200 tracking-tight">
            {product?.name}
          </Title>
          <p className="text-xs text-zinc-500 line-clamp-2 min-h-[2.5em] font-medium">
            {product?.intro}
          </p>
        </div>
        <div>
          <PriceView
            price={product?.price}
            discount={product?.discount}
            className="text-xl font-black text-fuchsia-700"
          />
          {/* Show AddToCartButton below for mobile or fallback */}
          <div className="block md:hidden mt-3">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-16px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
      `}</style>
    </div>
  );
};

export default ProductCard;