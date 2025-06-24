"use client";
import Logo from "./new/Logo";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="fixed min-h-screen w-full left-0 top-0 flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200 z-50"
      aria-busy="true"
      role="status"
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <Logo>E-commerce</Logo>
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              "0 0 0px #22c55e55",
              "0 0 16px #22c55e99",
              "0 0 0px #22c55e55",
            ],
          }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex items-center space-x-2 text-green-800"
        >
          <Loader2 className="animate-spin drop-shadow-lg" size={32} />
          <span className="font-semibold tracking-wide text-lg">
            E-commerce is loading...
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loading;