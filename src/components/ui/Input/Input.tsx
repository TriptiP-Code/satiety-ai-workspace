import type { InputHTMLAttributes } from "react";
import { cn } from "../../../utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 outline-none transition-all",
        "placeholder:text-slate-500",
        "focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20",
        className
      )}
      {...props}
    />
  );
}

export default Input;