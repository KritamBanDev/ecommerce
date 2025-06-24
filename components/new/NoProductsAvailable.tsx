"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Loader2, PackageX } from "lucide-react";

const NoProductAvailable = ({
  selectedTab,
  className,
}: {
  selectedTab: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center py-16 min-h-80 space-y-7 text-center bg-white/70 backdrop-blur-xl rounded-3xl w-full mt-12 shadow-2xl border border-fuchsia-100/40 animate-fade-in overflow-hidden",
        className
      )}
    >
      {/* Animated blurred background shape */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-72 bg-gradient-to-br from-fuchsia-300/20 to-blue-300/10 rounded-full blur-3xl pointer-events-none z-0 animate-float" />
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-2 z-10"
      >
        <PackageX className="w-14 h-14 text-fuchsia-400 drop-shadow-lg animate-bounce" />
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tight drop-shadow">
          No Products Available
        </h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-base md:text-lg text-gray-700/90 font-medium max-w-[420px] mx-auto z-10"
      >
        Sorry, we couldn&apos;t find any products for
        <span className="text-base font-bold text-fuchsia-600 mx-1">
          {selectedTab}
        </span>
        at the moment.
      </motion.p>

      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="flex items-center space-x-2 text-blue-600 bg-white/80 px-5 py-2 rounded-full shadow border border-blue-100/40 z-10"
      >
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="font-semibold">We&apos;re restocking shortly</span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-sm text-gray-500 z-10"
      >
        Please check back later or explore our other product categories.
      </motion.p>

      <motion.a
        href="#categories"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="inline-block mt-2 px-7 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-fuchsia-500 text-white font-extrabold shadow-lg hover:scale-105 hover:shadow-fuchsia-400/40 transition-all duration-200 text-base z-10 border-2 border-white/30"
      >
        Browse Categories
      </motion.a>
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

export default NoProductAvailable;
