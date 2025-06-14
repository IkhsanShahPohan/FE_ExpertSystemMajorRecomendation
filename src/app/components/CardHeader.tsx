"use client";
import React, { ReactNode, HTMLAttributes } from "react";
import { CardProps } from "./CardContent";

// Card Components
type CardProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;
export const CardHeader = ({ children, className = "" }: CardProps) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);
