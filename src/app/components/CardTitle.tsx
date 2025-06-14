"use client";
import React, { ReactNode, HTMLAttributes } from "react";
import { CardProps } from "./CardContent";

// Card Components
type CardProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;
export const CardTitle = ({ children, className = "" }: CardProps) => (
  <h3
    className={`text-2xl font-semibold leading-none tracking-tight text-white ${className}`}
  >
    {children}
  </h3>
);
