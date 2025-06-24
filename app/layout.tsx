import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import localFont from "next/font/local";
import { Metadata } from "next";
import "./globals.css";
import SonnerToaster from "@/components/SonnerToaster";

export const metadata: Metadata = {
  title: "E-commerce - Shop the Latest Trends",
  description:
    "Discover top fashion and lifestyle brands curated to help you look your best and feel confident — all in one place.",
};

const poppins = localFont({
  src: "./fonts/Poppins.woff2",
  variable: "--font-poppins",
  weight: "400",
  preload: false,
});
const raleway = localFont({
  src: "./fonts/Raleway.woff2",
  variable: "--font-raleway",
  weight: "100 900",
});

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${poppins.variable} ${raleway.variable} antialiased`}>
          <SonnerToaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;