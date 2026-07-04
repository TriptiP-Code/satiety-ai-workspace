import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../../utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
}

function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-500 focus:ring-indigo-500",

    secondary:
      "bg-slate-800 text-slate-100 hover:bg-slate-700 focus:ring-slate-500",

    danger:
      "bg-red-600 text-white hover:bg-red-500 focus:ring-red-500",
  };

  return (
    <button
      className={cn(baseStyles,variants[variant],className)}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;