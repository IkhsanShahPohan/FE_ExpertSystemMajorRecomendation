"use client";
import React, { ReactNode } from "react";

// Alert Component
export const Alert = ({
  children,
  variant = "default",
  className = "",
}: {
  children: ReactNode;
  variant?: "default" | "destructive" | "success";
  className?: string;
}) => {
  const variants = {
    default: "bg-slate-50/10 border-slate-200/20 text-slate-100",
    destructive: "bg-red-50/10 border-red-200/20 text-red-100",
    success: "bg-green-50/10 border-green-200/20 text-green-100",
  };

  return (
    <div
      className={`relative w-full rounded-lg border p-4 backdrop-blur-sm ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  );
};
