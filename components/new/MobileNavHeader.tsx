import React from "react";
import { X } from "lucide-react";
import clsx from "clsx";
import { useSidebarStore } from "@/store/sidebarStore";

const MobileNavHeader: React.FC = () => {
  const { close } = useSidebarStore();
  return (
    <header className="flex items-center justify-between w-full mb-6">
      <span
        className="text-2xl font-extrabold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent tracking-widest select-none"
        aria-label="Brand logo"
      >
        E-COMMERCE
      </span>
      <button
        onClick={close}
        aria-label="Close menu"
        className={clsx(
          "p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
        )}
      >
        <X size={28} />
      </button>
    </header>
  );
};

export default MobileNavHeader;
