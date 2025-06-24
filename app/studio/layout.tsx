import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "E-commerce - Shop the Latest Trends",
  description:
    "Discover top fashion and lifestyle brands curated to help you look your best and feel confident — all in one place.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
