import React from "react";
import Title from "../Title";
import { FaArrowRight } from "react-icons/fa6";

const HomeBanner = () => {
  return (
    <div className="relative flex flex-col items-center justify-center gap-8 py-20 px-6 md:px-12 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl overflow-hidden min-h-[400px] md:min-h-[480px]">
      {/* Animated glassy floating shapes */}
      <div className="absolute animate-spin-slow -top-24 left-1/4 w-60 h-60 bg-gradient-to-br from-pink-400/30 to-blue-400/20 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute animate-pulse-slow -bottom-28 right-1/4 w-72 h-72 bg-gradient-to-tr from-blue-400/30 to-fuchsia-400/20 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute animate-float -top-10 right-10 w-32 h-32 bg-gradient-to-br from-fuchsia-300/30 to-blue-200/20 rounded-full blur-2xl pointer-events-none z-0" />
      {/* Elegant Tagline */}
      <span className="relative z-10 text-xs md:text-base font-semibold uppercase tracking-[0.3em] text-fuchsia-700 bg-white/70 px-4 py-1 rounded-full mb-2 shadow-md border border-fuchsia-100 animate-fade-in">
        New Season Arrivals
      </span>
      <Title className="relative z-10 text-4xl md:text-6xl uppercase font-black text-center bg-gradient-to-r from-blue-700 via-fuchsia-600 to-pink-500 bg-clip-text text-transparent drop-shadow-2xl tracking-tight animate-fade-in">
        Elevate Your Style with the Best in Fashion
      </Title>
      <p className="relative z-10 text-lg md:text-xl text-center text-gray-700/90 font-medium max-w-[600px] leading-relaxed animate-fade-in delay-100">
        Discover top fashion and lifestyle brands curated to help you look your
        best and feel confident — all in one place.
      </p>
      <a
        href="#shop"
        className="relative z-10 mt-7 px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 via-fuchsia-500 to-pink-500 text-white font-extrabold shadow-xl hover:scale-105 hover:shadow-fuchsia-400/40 hover:shadow-2xl transition-all duration-200 text-lg flex items-center gap-3 animate-fade-in delay-200 group overflow-hidden border-2 border-white/30"
      >
        <span className="relative z-10">Shop Now</span>
        <FaArrowRight className="text-xl group-hover:translate-x-1 transition-transform duration-200 relative z-10" />
        {/* Shimmer effect */}
        <span className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-white/10 via-white/40 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer pointer-events-none rounded-full" />
      </a>
    </div>
  );
};

export default HomeBanner;
