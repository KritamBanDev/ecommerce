import React, { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebarStore } from "@/store/sidebarStore";
import MobileNavHeader from "./MobileNavHeader";
import MobileNavLink from "./MobileNavLink";
import MobileNavIcons from "./MobileNavIcons";
import { navLinks } from "./navLinks";
import { usePathname } from "next/navigation";

const sidebarVariants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 30 },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: { duration: 0.2, ease: "easeInOut" as const },
  },
};

const MobileSidebar: React.FC = () => {
  const { isOpen, close } = useSidebarStore();
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Accessibility: close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  // Accessibility: focus trap
  useEffect(() => {
    if (!isOpen) return;
    const focusable = sidebarRef.current?.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable && focusable.length) {
      focusable[0].focus();
    }
  }, [isOpen, pathname]);

  // Close on outside click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) close();
    },
    [close]
  );

  // Close on route change
  useEffect(() => {
    close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Lock background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          key="mobile-sidebar"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={sidebarVariants}
          ref={sidebarRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          tabIndex={-1}
          className="fixed top-0 left-0 w-full h-screen z-50 bg-white dark:bg-black/95 backdrop-blur-xl shadow-2xl border-r border-zinc-200 dark:border-zinc-800 flex flex-col md:hidden transition-all"
          onClick={handleBackdropClick}
        >
          <div className="flex flex-col h-full px-6 py-6 gap-y-4 justify-between">
            <div>
              <MobileNavHeader />
              <nav
                className="flex flex-col gap-y-2 mt-2"
                aria-label="Main navigation"
              >
                {navLinks.map((item) => (
                  <MobileNavLink key={item.href} href={item.href}>
                    {item.title}
                  </MobileNavLink>
                ))}
              </nav>
            </div>
            <MobileNavIcons />
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;