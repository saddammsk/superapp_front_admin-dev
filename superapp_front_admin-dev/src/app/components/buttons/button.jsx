"use client";

import { cn } from "@/utils/utils";

export const Button = ({
  variant,
  onClick,
  className,
  children,
}) => {
  return (
    <button

      onClick={onClick}
      className={cn(
        "flex justify-center items-center text-sm font-medium pl-7 pr-6 py-2 h-12 border rounded-lg bg-white",
        variant === "success" && "bg-green-1000 border-green-1000 text-white",
        className,
      )}
    >
      {children}
    </button>
  )
}