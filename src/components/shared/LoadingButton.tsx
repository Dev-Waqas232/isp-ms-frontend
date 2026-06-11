import type { ButtonHTMLAttributes, ReactNode } from "react";

import Spinner from "./Spinner";

type LoadingButtonProps = {
  children: ReactNode;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function LoadingButton({ children, className = "", disabled, isLoading = false, ...props }: LoadingButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    >
      {isLoading && <Spinner className="text-white" />}
      {children}
    </button>
  );
}
