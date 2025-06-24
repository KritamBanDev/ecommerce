"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category } from "@/sanity.types";
import { useCategoryStore } from "@/store/categoryStore";

interface HeaderMenuProps {
  categories: Category[];
}

const menuOrder = [
  { title: "Home", href: "/" },
  { title: "Featured", match: "featured" },
  { title: "Accessories", match: "accessories" },
  { title: "Men", match: "men" },
  { title: "Women", match: "women" },
];

const HeaderMenu: React.FC<HeaderMenuProps> = ({ categories }) => {
  const pathname = usePathname();
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);

  // Map categories by lowercased title for easy lookup
  const categoryMap = Object.fromEntries(
    categories.map((cat) => [cat.title?.toLowerCase(), cat])
  );

  return (
    <ul className="flex items-center gap-3 h-full px-0 min-w-0 max-w-full">
      {menuOrder.map((item) => {
        if (item.title === "Home") {
          return (
            <li key="home" className="relative group mx-0.5">
              <Link
                href={item.href || "/"}
                className={`px-2 py-1 rounded-lg font-medium text-sm whitespace-nowrap transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 ${
                  pathname === "/" || (!selectedCategory && pathname === "/")
                    ? "bg-gradient-to-r from-blue-100 via-fuchsia-100 to-pink-100 text-black shadow font-extrabold"
                    : "text-gray-500 hover:bg-fuchsia-50 hover:text-fuchsia-700 hover:font-bold"
                }`}
                tabIndex={0}
              >
                Home
              </Link>
              <span
                className={`absolute left-1/2 -bottom-1 w-0 h-1 rounded bg-gradient-to-r from-blue-500 via-fuchsia-500 to-pink-500 transition-all duration-300 group-hover:w-3/4 group-hover:left-1/8 ${
                  pathname === "/" || (!selectedCategory && pathname === "/") ? "w-3/4 left-1/8" : ""
                }`}
              />
            </li>
          );
        }
        const cat = categoryMap[item.title.toLowerCase()];
        if (!cat) return null;
        const isActive = selectedCategory
          ? selectedCategory === cat.slug?.current
          : pathname === `/category/${cat.slug?.current}`;
        return (
          <li key={cat?._id} className="relative group mx-0.5">
            <Link
              href={cat?.slug?.current ? `/category/${cat.slug.current}` : "#"}
              className={`px-2 py-1 rounded-lg font-medium text-sm whitespace-nowrap transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 ${
                isActive
                  ? "bg-gradient-to-r from-blue-100 via-fuchsia-100 to-pink-100 text-black shadow font-extrabold"
                  : "text-gray-500 hover:bg-fuchsia-50 hover:text-fuchsia-700 hover:font-bold"
              }`}
              tabIndex={0}
            >
              {cat?.title}
            </Link>
            <span
              className={`absolute left-1/2 -bottom-1 w-0 h-1 rounded bg-gradient-to-r from-blue-500 via-fuchsia-500 to-pink-500 transition-all duration-300 group-hover:w-3/4 group-hover:left-1/8 ${
                isActive ? "w-3/4 left-1/8" : ""
              }`}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default HeaderMenu;
