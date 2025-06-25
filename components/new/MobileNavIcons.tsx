import { Search, ShoppingCart, List, User } from "lucide-react";
import Link from "next/link";

const MobileNavIcons = () => {
  return (
    <nav className="flex items-center gap-6 w-full justify-center mt-8" aria-label="Quick actions">
      <button className="hover:text-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded-full transition-colors" aria-label="Search">
        <Search size={22} />
      </button>
      <Link href="/cart" className="relative" aria-label="Cart">
        <ShoppingCart size={22} />
        <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">2</span>
      </Link>
      <button className="hover:text-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded-full transition-colors" aria-label="Orders">
        <List size={22} />
      </button>
      <button className="hover:text-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded-full transition-colors" aria-label="Profile">
        <User size={22} />
      </button>
    </nav>
  );
};

export default MobileNavIcons;
