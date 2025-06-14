"use client";
import React, { ReactNode } from "react";

// Badge Component
export const Badge = ({
  children,
  variant = "default",
  className = "",
}: {
  children: ReactNode;
  variant?: "default" | "secondary" | "success" | "warning";
  className?: string;
}) => {
  const variants = {
    default:
      "bg-slate-900/50 hover:bg-slate-900/80 border-slate-700/50 text-slate-100",
    secondary:
      "bg-slate-100/10 hover:bg-slate-100/20 border-slate-700/50 text-slate-100",
    success: "bg-green-500/20 border-green-500/30 text-green-100",
    warning: "bg-yellow-500/20 border-yellow-500/30 text-yellow-100",
  };

  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  );
};
