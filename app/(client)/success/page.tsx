"use client";

import useCartStore from "@/store";
import { Check, Home, Package, ShoppingBag, Mail, Truck, Share2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { useUser } from "@clerk/nextjs";
import jsPDF from "jspdf";

const tips = [
  "Tip: Track your order status in your account!",
  "Did you know? You can reorder with one click!",
  "Pro tip: Save your address for faster checkout!",
  "Fun fact: We plant a tree for every order!",
];

const shareText = encodeURIComponent("I just placed an order on this awesome shop! 🎉");
const shareUrl = encodeURIComponent(typeof window !== "undefined" ? window.location.href : "");

const SuccessPage = () => {
  const [orders, setOrders] = useState<MY_ORDERS_QUERYResult>([]);
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const clearCart = useCartStore((state) => state.resetCart);
  const { user } = useUser();
  const userId = user?.id;
  const [tipIndex, setTipIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [showConfetti, setShowConfetti] = useState(true);

  const query = `*[_type == 'order' && clerkUserId == $userId] | order(orderData desc){...,products[]{...,product->}}`;

  useEffect(() => {
    if (orderNumber) {
      clearCart();
    }
  }, [orderNumber, clearCart]);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        return;
      }
      try {
        const ordersData = await client.fetch(query, { userId });
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchData();
  }, [userId, query]);

  // Typewriter effect for tips
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

  // Confetti burst on mount
  useEffect(() => {
    setShowConfetti(true);
    const timeout = setTimeout(() => setShowConfetti(false), 2200);
    return () => clearTimeout(timeout);
  }, []);

  // Delivery progress bar (fake for demo)
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame: number;
    if (progress < 100) {
      frame = window.setTimeout(() => setProgress(progress + 1), 18);
    }
    return () => clearTimeout(frame);
  }, [progress]);

  const generateReceipt = () => {
    if (!orders.length) return;
    const order = orders[0];
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Order Receipt", 10, 10);
    doc.setFontSize(12);
    doc.text(`Order Number: ${order.orderNumber || order._id}`, 10, 20);
    doc.text(`Status: ${order.status || "N/A"}`, 10, 30);
    doc.text(`Date: ${order.orderDate || "N/A"}`, 10, 40);
    doc.text("Products:", 10, 50);
    let y = 60;
    order.products?.forEach((item, idx) => {
      doc.text(
        `${idx + 1}. ${item.product?.name || "Product"} x${item.quantity || 1} - $${item.product?.price || 0}`,
        12,
        y
      );
      y += 10;
    });
    doc.text(`Total: $${order.products?.reduce((sum, item) => sum + (item.product?.price || 0) * (item.quantity || 1), 0)}` , 10, y + 10);
    doc.save(`receipt_${order.orderNumber || order._id}.pdf`);
  };

  return (
    <div className="py-10 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 animate-bg-move relative overflow-hidden min-h-screen">
      {/* Confetti burst */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {[...Array(60)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: `hsl(${Math.random() * 360}, 80%, 70%)`,
                  opacity: 0.8,
                }}
                animate={{
                  y: [0, 200 + Math.random() * 200],
                  x: [0, (Math.random() - 0.5) * 200],
                  opacity: [0.8, 0.2],
                }}
                transition={{
                  duration: 2 + Math.random() * 0.8,
                  delay: Math.random() * 0.5,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Subtle floating icons */}
      <motion.div
        className="absolute left-10 top-10 w-32 h-32 bg-green-200 rounded-full opacity-20 blur-2xl z-0"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-10 bottom-10 w-24 h-24 bg-blue-300 rounded-full opacity-10 blur-2xl z-0"
        animate={{ y: [0, -20, 0], x: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 rounded-3xl shadow-2xl px-8 py-12 max-w-xl w-full text-center relative z-20 backdrop-blur-2xl border-4 border-gradient-to-r from-green-300 via-blue-200 to-green-100 animate-border-glow"
        style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)" }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg animate-glow"
        >
          <Check className="text-white w-12 h-12" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2"
        >
          🎉 Order Confirmed!
        </motion.h1>
        {/* Delivery progress bar */}
        <div className="flex items-center gap-2 mb-6 justify-center">
          <Truck className="w-6 h-6 text-blue-500" />
          <div className="relative w-48 h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 font-semibold">{progress}%</span>
        </div>
        <div className="space-y-4 mb-8 text-left">
          <p className="text-gray-700">
            Thank you for your purchase. We&apos;re processing your order and
            will ship it soon. A confirmation email with your order details will
            be sent to your inbox shortly.
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <Mail className="w-4 h-4 text-green-500" />
            Order Number: <span className="text-black font-semibold">{orderNumber}</span>
          </p>
        </div>
        <div className="bg-gray-50/80 border border-gray-200 rounded-lg p-4 mb-8">
          <h2 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Truck className="w-4 h-4 text-blue-500" /> What&apos;s Next?
          </h2>
          <ul className="text-gray-700 text-sm space-y-1">
            <li>Check your email for order confirmation</li>
            <li>We&apos;ll notify you when your order ships</li>
            <li>Track your order status anytime</li>
          </ul>
        </div>
        <div className="mb-8">
          <h3 className="font-semibold text-gray-900 mb-2">Recent Orders</h3>
          <div className="space-y-2">
            <AnimatePresence>
              {orders.map((order, idx) => (
                <motion.div
                  key={order?._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  className="flex justify-between items-center bg-gray-50/80 p-2 rounded border border-gray-100"
                >
                  <span className="text-gray-700 text-sm font-medium flex items-center gap-1">
                    <Package className="w-4 h-4 text-blue-400" />
                    {order?._id}
                  </span>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      order.status === "shipped"
                        ? "bg-green-100 text-green-700"
                        : order.status === "paid"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "delivered"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Link
            href="/"
            className="flex items-center justify-center px-4 py-3 font-semibold bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-md"
          >
            <Home className="w-5 h-5 mr-2" />
            Home
          </Link>
          <Link
            href="/orders"
            className="flex items-center justify-center px-4 py-3 font-semibold bg-white text-black border border-black rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-md"
          >
            <Package className="w-5 h-5 mr-2" />
            Orders
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center px-4 py-3 font-semibold bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-md"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Shop
          </Link>
          <button
            onClick={generateReceipt}
            className="flex items-center justify-center px-4 py-3 font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md"
          >
            Download Receipt
          </button>
        </div>
        {/* Share your order */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "Order Success!",
                  text: "I just placed an order on this awesome shop! 🎉",
                  url: window.location.href,
                });
              } else {
                window.open(
                  `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
                  "_blank"
                );
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition-all duration-200"
          >
            <Share2 className="w-4 h-4" /> Share your order
          </button>
        </div>
        {/* Tip speech bubble */}
        <div className="flex justify-center">
          <div className="relative bg-green-50 border border-green-200 rounded-xl px-4 py-2 min-h-[2em] max-w-xs text-green-700 text-xs italic shadow-md flex items-center gap-2">
            <span role="img" aria-label="lightbulb">💡</span>
            {displayed}
            <span className="text-green-300">{typing && "|"}</span>
            <span className="absolute left-6 -bottom-2 w-4 h-4 bg-green-50 border-l border-b border-green-200 rotate-45" />
          </div>
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
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.3); }
          50% { box-shadow: 0 0 0 12px rgba(34,197,94,0.12); }
        }
        .animate-glow {
          animation: glow 2s infinite;
        }
        @keyframes border-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.15); }
          50% { box-shadow: 0 0 0 8px rgba(59,130,246,0.08); }
        }
        .animate-border-glow {
          animation: border-glow 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default SuccessPage;