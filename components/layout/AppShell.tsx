import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto min-h-[calc(100vh-65px)] max-w-6xl px-4 py-8">{children}</main>
    </>
  );
}
