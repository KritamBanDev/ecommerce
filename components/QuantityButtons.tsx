import React from "react";
import { Button } from "./ui/button";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { toast } from "sonner";
import useCartStore from "../store";
import { Product } from "@/sanity.types";
import { twMerge } from "tailwind-merge";

interface Props {
  product: Product;
  className?: string;
  borderStyle?: string;
}

const QuantityButtons = ({ product, className, borderStyle }: Props) => {
  const { addItem, removeItem, getItemCount } = useCartStore();
  const itemCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock === 0;

  const handleRemoveProduct = () => {
    removeItem(product?._id);
    if (itemCount > 1) {
      toast(
        <div className="flex items-center gap-4">
          <span className="relative flex items-center justify-center w-8 h-8">
            <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-300 via-red-100 to-white animate-pulse opacity-80" style={{ filter: 'blur(6px)' }}></span>
            <span className="relative z-10 text-xl"><HiMinus className="text-red-500" /></span>
            <span className="absolute -bottom-1 -right-1 z-20 bg-white rounded-full border border-red-300 p-0.5 shadow">
              <svg className="w-3 h-3 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </span>
          </span>
          <div className="flex flex-col">
            <span className="font-bold text-red-700 text-base leading-tight">{product?.name?.substring(0, 32)}</span>
            <span className="text-xs text-red-600 font-medium mt-0.5">Quantity decreased</span>
          </div>
        </div>,
        {
          description: <span className="text-xs text-zinc-700">{itemCount - 1} left in cart</span>,
          duration: 2500,
          position: "top-right",
          className: "border border-red-200 bg-gradient-to-br from-red-50 via-white to-red-100 shadow-2xl rounded-2xl px-6 py-4 flex items-center animate-fade-in",
        }
      );
    } else {
      toast(
        <div className="flex items-center gap-4">
          <span className="relative flex items-center justify-center w-8 h-8">
            <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-400 via-red-200 to-white animate-pulse opacity-80" style={{ filter: 'blur(6px)' }}></span>
            <span className="relative z-10 text-xl"><HiMinus className="text-red-500" /></span>
            <span className="absolute -bottom-1 -right-1 z-20 bg-white rounded-full border border-red-300 p-0.5 shadow">
              <svg className="w-3 h-3 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </span>
          </span>
          <div className="flex flex-col">
            <span className="font-bold text-red-700 text-base leading-tight">{product?.name?.substring(0, 32)}</span>
            <span className="text-xs text-red-600 font-medium mt-0.5">Removed from cart</span>
          </div>
        </div>,
        {
          duration: 2500,
          position: "top-right",
          className: "border border-red-200 bg-gradient-to-br from-red-100 via-white to-red-200 shadow-2xl rounded-2xl px-6 py-4 flex items-center animate-fade-in",
        }
      );
    }
  };
  return (
    <div
      className={twMerge(
        "flex items-center gap-1 pb-1 text-base",
        borderStyle,
        className
      )}
    >
      <Button
        variant="outline"
        size="icon"
        className="w-6 h-6 cursor-pointer"
        onClick={handleRemoveProduct}
        disabled={itemCount === 0 || isOutOfStock}
      >
        <HiMinus />
      </Button>
      <span className="font-semibold w-8 text-center text-darkColor">
        {itemCount}
      </span>
      <Button
        variant="outline"
        size="icon"
        className="w-6 h-6 cursor-pointer"
        onClick={() => {
          addItem(product);
          toast(
            <div className="flex items-center gap-4">
              <span className="relative flex items-center justify-center w-8 h-8">
                <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-300 via-green-100 to-white animate-pulse opacity-80" style={{ filter: 'blur(6px)' }}></span>
                <span className="relative z-10 text-xl"><HiPlus className="text-green-500" /></span>
                <span className="absolute -bottom-1 -right-1 z-20 bg-white rounded-full border border-green-300 p-0.5 shadow">
                  <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </span>
              </span>
              <div className="flex flex-col">
                <span className="font-bold text-green-700 text-base leading-tight">{product?.name?.substring(0, 32)}</span>
                <span className="text-xs text-green-600 font-medium mt-0.5">Quantity increased</span>
              </div>
            </div>,
            {
              description: <span className="text-xs text-zinc-700">{itemCount + 1} in cart</span>,
              duration: 2500,
              position: "top-right",
              className: "border border-green-200 bg-gradient-to-br from-green-50 via-white to-green-100 shadow-2xl rounded-2xl px-6 py-4 flex items-center animate-fade-in",
            }
          );
        }}
        disabled={isOutOfStock}
      >
        <HiPlus />
      </Button>
    </div>
  );
};

export default QuantityButtons;