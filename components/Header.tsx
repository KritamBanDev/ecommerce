import React from "react";
import Logo from "./new/Logo";
import RightBar from "./RightBar";
import Container from "./Container";
import { getAllCategories } from "@/sanity/helpers/index";
import HeaderMenu from "./new/HeaderMenu";
import MobileMenu from "./new/MobileMenu";

const Header = async () => {
  // Fetch categories on the server
  const categories = await getAllCategories();
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-white/80 via-blue-50/80 to-fuchsia-50/70 backdrop-blur-2xl shadow-2xl rounded-b-3xl border-b-2 border-fuchsia-100/60 transition-all duration-300 animate-fade-in ring-1 ring-fuchsia-100/40">
      <Container className="flex items-center min-h-[80px] px-3 md:px-12 relative gap-4">
        {/* Left: Desktop Menu */}
        <nav className="hidden md:flex items-center gap-3 h-full flex-1 justify-start min-w-0">
          <HeaderMenu categories={categories} />
        </nav>
        {/* Left: Mobile Menu */}
        <div className="flex md:hidden flex-1 justify-start">
          <MobileMenu />
        </div>
        {/* Center: Logo - perfectly centered with flex grow/shrink and absolute fallback */}
        <div className="flex-1 flex items-center justify-center min-w-0 relative">
          {/* Desktop Logo */}
          <span className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
            <Logo className="text-3xl md:text-4xl font-black tracking-tight drop-shadow-2xl bg-gradient-to-r from-blue-700 via-fuchsia-600 to-pink-500 bg-clip-text text-transparent hover:scale-110 transition-transform duration-200 cursor-pointer select-none whitespace-nowrap">
              E-COMMERCE
            </Logo>
          </span>
          {/* Mobile Logo */}
          <span className="block md:hidden">
            <Logo className="text-2xl font-black tracking-tight drop-shadow-xl bg-gradient-to-r from-blue-700 via-fuchsia-600 to-pink-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200 cursor-pointer select-none whitespace-nowrap">
              E-COMMERCE
            </Logo>
          </span>
        </div>
        {/* Right: Actions */}
        <div className="flex items-center gap-3 flex-1 justify-end min-w-0">
          <div className="hidden md:flex">
            <RightBar />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
