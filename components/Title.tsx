import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Title = ({ children, className }: Props) => {
  return (
    <h1 className={cn("text-2xl font-semibold", className)}>
      {children}
    </h1>
  );
};

export default Title;
