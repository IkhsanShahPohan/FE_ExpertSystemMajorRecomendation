"use client";
import React, { ReactNode, ButtonHTMLAttributes } from "react";

// Button Component
type VariantType = "default" | "primary" | "secondary" | "outline" | "ghost";
type SizeType = "default" | "sm" | "lg" | "xl";
type ButtonProps = {
  children: ReactNode;
  variant?: VariantType;
  size?: SizeType;
  className?: string;
  disabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;
export const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  disabled = false,
  ...props
}: ButtonProps) => {
  const variants = {
    default:
      "bg-slate-900/50 text-slate-100 hover:bg-slate-800/50 border-slate-700/50",
    primary:
      "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-transparent",
    secondary:
      "bg-slate-100/10 text-slate-100 hover:bg-slate-100/20 border-slate-700/50",
    outline:
      "border-slate-700/50 bg-transparent hover:bg-slate-100/10 text-slate-100",
    ghost: "hover:bg-slate-100/10 text-slate-100",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-11 px-8",
    xl: "h-14 px-10 text-lg",
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border cursor-pointer ${
        variants[variant]
      } ${sizes[size]} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
