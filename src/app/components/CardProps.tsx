"use client";
import React, { ReactNode, HTMLAttributes } from "react";

// Card Components
export type CardProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;
export const CardDescription = ({ children, className = "" }: CardProps) => (
  <p className={`text-sm text-slate-300 ${className}`}>{children}</p>
);
