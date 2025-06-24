"use client";

import { ShoppingCart, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import emptyCart from "@/images/emptyCart.png";

const tips = [
  "Tip: Add your favorites to the cart for quick checkout!",
  "Did you know? We offer free shipping on select items!",
  "Pro tip: Sign in to save your cart across devices!",
  "Fun fact: Shopping is more fun with friends!",
];

export default function EmptyCart() {
  const [tipIndex, setTipIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    setDisplayed("");
    setTyping(true);
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(tips[tipIndex].slice(0, i + 1));
      i++;
      if (i === tips[tipIndex].length) {
        clearInterval(interval);
        setTyping(false);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [tipIndex]);

  useEffect(() => {
    if (!typing) {
      const timeout = setTimeout(() => {
        setTipIndex((prev) => (prev + 1) % tips.length);
      }, 2500);
      return () => clearTimeout(timeout);
    }
  }, [typing]);

  return (
    <div className="py-10 md:py-20 bg-gradient-to-b from-blue-50 via-white to-blue-100 flex items-center justify-center p-4 animate-bg-move relative overflow-hidden">
      {/* Animated floating shapes */}
      <motion.div
        className="absolute left-10 top-10 w-32 h-32 bg-blue-200 rounded-full opacity-30 blur-2xl z-0"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-10 bottom-10 w-24 h-24 bg-blue-300 rounded-full opacity-20 blur-2xl z-0"
        animate={{ y: [0, -20, 0], x: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />
      {/* Confetti animation */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `hsl(${Math.random() * 360}, 80%, 70%)`,
              opacity: 0.7,
            }}
            animate={{
              y: [0, 40 + Math.random() * 40, 0],
              opacity: [0.7, 0.2, 0.7],
            }}
            transition={{
              repeat: Infinity,
              duration: 6 + Math.random() * 2,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/70 rounded-3xl shadow-2xl p-8 max-w-md w-full space-y-8 relative z-20 backdrop-blur-2xl border border-blue-100"
        style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)" }}
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
          }}
          className="relative w-48 h-48 mx-auto"
        >
          <Image
            src={emptyCart}
            alt="Empty shopping cart"
            layout="fill"
            objectFit="contain"
            className="drop-shadow-lg"
          />
          <motion.div
            animate={{
              x: [0, -10, 10, 0],
              y: [0, -5, 5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "linear",
            }}
            className="absolute -top-4 -right-4 bg-blue-500 rounded-full p-2 shadow-lg"
          >
            <ShoppingCart size={24} className="text-white" />
          </motion.div>
        </motion.div>

        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-blue-800 flex items-center justify-center gap-2">
            <span role="img" aria-label="cart">🛒</span> Oops! Your cart is empty
          </h2>
          <p className="text-blue-700">
            Looks like you haven&apos;t added anything yet.<br />
            Start exploring and fill your cart with joy!
          </p>
        </div>

        <div>
          <Link
            href="/"
            className="group block bg-blue-600/90 border border-blue-700 text-center py-2.5 rounded-full text-sm font-semibold tracking-wide text-white shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 animate-pulse-btn"
          >
            Discover Products
            <ArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform duration-200" size={18} />
          </Link>
        </div>
        <div className="text-center mt-2 min-h-[1.5em]">
          <span className="text-blue-500 text-xs italic">
            {displayed}
            <span className="text-blue-300">{typing && "|"}</span>
          </span>
        </div>
      </motion.div>
      <style jsx global>{`
        @keyframes bg-move {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .animate-bg-move {
          background-size: 200% 200%;
          animation: bg-move 8s linear infinite alternate;
        }
        @keyframes pulse-btn {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.3); }
          50% { box-shadow: 0 0 0 8px rgba(37, 99, 235, 0.12); }
        }
        .animate-pulse-btn {
          animation: pulse-btn 2s infinite;
        }
      `}</style>
    </div>
  );
}