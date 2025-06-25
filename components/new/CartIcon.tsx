"use client";
import useCartStore from "@/store";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

const CartIcon = () => {
  const { items } = useCartStore();
  const prevCount = useRef(items?.length || 0);
  const iconRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (items?.length > prevCount.current && iconRef.current) {
      iconRef.current.classList.add("animate-bounce");
      setTimeout(() => {
        iconRef.current?.classList.remove("animate-bounce");
      }, 500);
    }
    prevCount.current = items?.length || 0;
  }, [items]);

  return (
    <Link
      href={"/cart"}
      className="group relative flex items-center justify-center w-10 h-10 p-1 rounded-full bg-white shadow hover:shadow-fuchsia-200/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-200"
      aria-label="View cart"
      title="View cart"
    >
      <span ref={iconRef} className="inline-flex items-center justify-center align-middle">
        <ShoppingBag className="w-6 h-6 group-hover:text-fuchsia-600 hoverEffect transition-colors duration-200 align-middle" style={{ verticalAlign: 'middle' }} />
      </span>
      {items?.length > 0 && (
        <span className="absolute -top-1 -right-2 bg-fuchsia-600 text-white h-4 w-4 rounded-full text-xs font-bold flex items-center justify-center shadow border-2 border-white animate-in fade-in">
          {items.length}
        </span>
      )}
      <span className="sr-only">Cart ({items?.length || 0} items)</span>
    </Link>
  );
};

export default CartIcon;