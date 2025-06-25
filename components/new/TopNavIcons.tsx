import { Search, ShoppingCart, List, User } from "lucide-react";
import Link from "next/link";

const TopNavIcons = () => {
  return (
    <div className="flex items-center gap-4">
      <button className="hover:text-pink-500 transition-colors">
        <Search size={22} />
      </button>
      <Link href="/cart" className="relative">
        <ShoppingCart size={22} />
        <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">2</span>
      </Link>
      <button className="hover:text-pink-500 transition-colors">
        <List size={22} />
      </button>
      <button className="hover:text-pink-500 transition-colors">
        <User size={22} />
      </button>
    </div>
  );
};

export default TopNavIcons;
