"use client";
import Link from "next/link";
import { ListOrdered } from "lucide-react";
import React, { useRef, useEffect } from "react";

interface OrdersIconProps {
  orderCount: number;
}

const OrdersIcon: React.FC<OrdersIconProps> = ({ orderCount }) => {
  const iconRef = useRef<HTMLSpanElement>(null);
  const prevCount = useRef(orderCount);

  useEffect(() => {
    if (orderCount > prevCount.current && iconRef.current) {
      iconRef.current.classList.add("animate-bounce");
      setTimeout(() => {
        iconRef.current?.classList.remove("animate-bounce");
      }, 500);
    }
    prevCount.current = orderCount;
  }, [orderCount]);

  return (
    <Link
      href={"/orders"}
      className="group relative flex items-center justify-center w-10 h-10 p-1 rounded-full bg-white shadow hover:shadow-fuchsia-200/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-200"
      aria-label="View your orders"
      title="View your orders"
    >
      <span ref={iconRef} className="inline-flex items-center justify-center align-middle">
        <ListOrdered className="w-6 h-6 group-hover:text-fuchsia-600 hoverEffect transition-colors duration-200 align-middle" style={{ verticalAlign: 'middle' }} />
      </span>
      {orderCount > 0 && (
        <span className="absolute -top-1 -right-2 bg-fuchsia-600 text-white h-4 w-4 rounded-full text-xs font-bold flex items-center justify-center shadow border-2 border-white animate-in fade-in">
          {orderCount}
        </span>
      )}
      <span className="sr-only">Orders ({orderCount})</span>
    </Link>
  );
};

export default OrdersIcon;
