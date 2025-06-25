import React from "react";
import { Menu } from "lucide-react";
import { useSidebarStore } from "@/store/sidebarStore";

const HamburgerButton: React.FC = () => {
  const { open } = useSidebarStore();
  return (
    <button
      onClick={open}
      className="md:hidden p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none"
      aria-label="Open sidebar"
    >
      <Menu size={28} />
    </button>
  );
};

export default HamburgerButton;
