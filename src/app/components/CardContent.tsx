"use client";
import React, { ReactNode, HTMLAttributes } from "react";
import { CardProps } from "./CardProps";

// Card Components

export type CardProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;
export const CardContent = ({ children, className = "" }: CardProps) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);
