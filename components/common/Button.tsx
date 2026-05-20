import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
};

const variants = {
  primary: "bg-gold text-night hover:bg-softGold",
  secondary: "border border-gold/40 bg-white/5 text-softGold hover:bg-white/10",
  ghost: "text-mist hover:bg-white/10"
};

export function Button({ href, variant = "primary", className, children, ...props }: Props) {
  const classes = twMerge(
    "inline-flex min-h-11 items-center justify-center rounded-md px-5 py-2 text-sm font-semibold transition",
    variants[variant],
    className
  );

  if (href) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
