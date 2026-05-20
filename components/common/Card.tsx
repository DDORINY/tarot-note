import type { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div className={twMerge("rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-glow", className)} {...props}>
      {children}
    </div>
  );
}
