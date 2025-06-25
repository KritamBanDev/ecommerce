import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative px-3 py-2 rounded-md font-bold transition-colors duration-200
        ${isActive ? "bg-gradient-to-r from-pink-500 to-violet-500 text-white" : "text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"}
      `}
    >
      {children}
      {isActive && (
        <span className="absolute left-0 top-full w-full h-1 bg-gradient-to-r from-pink-500 to-violet-500 rounded-b-md" />
      )}
    </Link>
  );
};

export default NavLink;
