import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "E-commerce Backend",
  description: "This is the backend of the e-commerce application.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default RootLayout;