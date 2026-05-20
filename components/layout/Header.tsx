"use client";

import Link from "next/link";
import { LogOut, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common/Button";
import { signOut } from "@/features/auth/api";
import { useAuthUser } from "@/features/auth/store";
import { routes } from "@/lib/routes";

function getDisplayName(user: ReturnType<typeof useAuthUser>["user"], nickname?: string | null) {
  const metadata = user?.user_metadata ?? {};
  const metadataName = metadata.nickname ?? metadata.name ?? metadata.full_name;

  if (nickname?.trim()) return nickname.trim();
  if (typeof metadataName === "string" && metadataName.trim()) return metadataName.trim();
  if (user?.email) return user.email.split("@")[0];

  return "회원";
}

export function Header() {
  const router = useRouter();
  const { user, profile, loading } = useAuthUser();
  const displayName = getDisplayName(user, profile?.nickname);

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

          {!loading && user ? (
            <>
              <span className="hidden max-w-32 truncate rounded-full border border-white/10 bg-white/5 px-3 py-2 text-mist sm:inline">
                {displayName}
              </span>
              <button
                aria-label="로그아웃"
                className="grid size-9 place-items-center rounded-md text-mist hover:bg-white/10 hover:text-softGold"
                onClick={handleSignOut}
                type="button"
              >
                <LogOut size={17} />
              </button>
            </>
          ) : (
            <Button href={routes.login} variant="secondary" className="min-h-9 px-3">
              로그인
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
