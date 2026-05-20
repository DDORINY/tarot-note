"use client";

import Link from "next/link";
import { LogOut, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common/Button";
import { routes } from "@/lib/routes";
import { signOut } from "@/features/auth/api";

export function Header() {
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push(routes.home);
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-night/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href={routes.home} className="flex items-center gap-2 font-semibold text-softGold">
          <Sparkles size={19} />
          tarot-note
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          <Link className="hidden text-mist hover:text-softGold sm:inline" href={routes.history}>
            기록
          </Link>
          <Link className="hidden text-mist hover:text-softGold sm:inline" href={routes.pricing}>
            프리미엄
          </Link>
          <Button href={routes.login} variant="secondary" className="min-h-9 px-3">
            로그인
          </Button>
          <button
            aria-label="로그아웃"
            className="grid size-9 place-items-center rounded-md text-mist hover:bg-white/10 hover:text-softGold"
            onClick={handleSignOut}
          >
            <LogOut size={17} />
          </button>
        </nav>
      </div>
    </header>
  );
}
