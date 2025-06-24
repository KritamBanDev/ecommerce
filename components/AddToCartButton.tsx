"use client";
import { Product } from "@/sanity.types";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import PriceFormatter from "./PriceFormatter";
import { Button } from "./ui/button";
import useCartStore from "../store";
import QuantityButtons from "./QuantityButtons";
import { cn } from "@/lib/utils";

interface Props {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
  const { addItem, getItemCount } = useCartStore();
  const [isClient, setIsClient] = useState(false);

  const itemCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock === 0;

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }
  return (
    <div className="w-full h-16 flex items-center">
      {itemCount ? (
        <div className="w-full bg-gradient-to-br from-zinc-50 via-white to-zinc-100 rounded-xl p-3 shadow-inner border border-zinc-100 animate-fade-in flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-semibold tracking-wide uppercase">
              Quantity
            </span>
            <QuantityButtons product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-2 mt-1">
            <span className="text-xs font-bold text-zinc-700 tracking-wide">
              Subtotal
            </span>
            <PriceFormatter
              amount={product?.price ? product.price * itemCount : 0}
              className="text-lg font-extrabold text-primary drop-shadow-sm"
            />
          </div>
        </div>
      ) : (
        <Button
          onClick={() => {
            addItem(product);
            toast(
              <div className="flex items-center gap-4">
                <span className="relative flex items-center justify-center w-10 h-10">
                  <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-400 via-green-200 to-green-100 animate-pulse opacity-80" style={{ filter: 'blur(6px)' }}></span>
                  <span className="relative z-10 text-2xl">🛒</span>
                  <span className="absolute -bottom-1 -right-1 z-20 bg-white rounded-full border border-green-400 p-0.5 shadow">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </span>
                </span>
                <div className="flex flex-col">
                  <span className="font-bold text-green-800 text-base leading-tight">{product?.name?.substring(0, 32)}</span>
                  <span className="text-xs text-green-600 font-medium mt-0.5">Added to cart successfully</span>
                </div>
              </div>,
              {
                description: product?.price ? (
                  <span className="text-sm text-zinc-700">Price: <span className="font-semibold text-primary">${product.price}</span></span>
                ) : undefined,
                duration: 3000,
                position: "top-right",
                className: "border border-green-300 bg-gradient-to-br from-green-100 via-white to-green-200 shadow-2xl rounded-2xl px-6 py-5 flex items-center animate-fade-in",
              }
            );
          }}
          disabled={isOutOfStock}
          className={cn(
            "w-full bg-gradient-to-r from-primary via-darkColor to-primary text-white shadow-xl border-none font-bold tracking-wide rounded-xl py-3 transition-all duration-200 hover:from-darkColor hover:to-primary hover:scale-105 focus:ring-2 focus:ring-primary/40 focus:outline-none text-base flex items-center justify-center gap-2",
            isOutOfStock && "opacity-60 cursor-not-allowed",
            className
          )}
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 0 0 7.48 19h9.04a2 2 0 0 0 1.83-1.3L21 13M7 13V6h13"
            />
          </svg>
          {isOutOfStock ? "Out of Stock" : "Add to cart"}
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;