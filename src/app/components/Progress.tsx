"use client";
import React from "react";

// Progress Component
export const Progress = ({
  value,
  className = "",
}: {
  value: number;
  className?: string;
}) => (
  <div
    className={`relative h-4 w-full overflow-hidden rounded-full bg-slate-900/20 ${className}`}
  >
    <div
      className="h-full w-full flex-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-700 ease-in-out"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </div>
);
