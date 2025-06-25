import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useSidebarStore } from "@/store/sidebarStore";

interface MobileNavLinkProps {
  href: string;
  children: React.ReactNode;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, children }) => {
  const pathname = usePathname();
  const { close } = useSidebarStore();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      onClick={close}
      className={clsx(
        "w-full px-4 py-3 rounded-lg font-semibold text-lg flex items-center gap-2 transition-all duration-200",
        isActive
          ? "bg-gradient-to-r from-pink-500 to-violet-500 text-white shadow-md"
          : "text-zinc-700 dark:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-pink-600"
      )}
      aria-current={isActive ? "page" : undefined}
      tabIndex={0}
    >
      {children}
    </Link>
  );
};

export default MobileNavLink;
