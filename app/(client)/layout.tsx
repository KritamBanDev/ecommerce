import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatIcon from "@/components/new/ChatIcon";

export const metadata: Metadata = {
  title: "E-commerce - Shop the Latest Trends",
  description:
    "Discover top fashion and lifestyle brands curated to help you look your best and feel confident — all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
      <ChatIcon />
    </div>
  );
}
