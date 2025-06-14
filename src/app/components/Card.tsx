"use client";
import React, { ReactNode, HTMLAttributes } from "react";
import { CardProps } from "./CardContent";

// Card Components
type CardProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;
export const Card = ({ children, className = "", ...props }: CardProps) => (
  <div
    className={`rounded-xl border border-slate-200/20 bg-white/5 backdrop-blur-sm shadow-lg ${className}`}
    {...props}
  >
    {children}
  </div>
);
