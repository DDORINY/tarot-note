"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { BrandImage } from "@/components/brand/BrandImage";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { signUpWithEmail } from "@/features/auth/api";
import { routes } from "@/lib/routes";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function submit() {
    try {
      const { error } = await signUpWithEmail(email, password);
      setMessage(error ? error.message : "가입 메일을 확인해주세요.");
    } catch {
      setMessage("Supabase 환경변수를 설정한 뒤 회원가입할 수 있습니다.");
    }
  }

  return (
    <Card className="mx-auto max-w-md">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center overflow-hidden rounded-md border border-gold/30 bg-white/5 text-softGold">
          <BrandImage
            alt="Tarot Note"
            className="size-11 object-cover"
            fallback={<Sparkles size={20} />}
            height={44}
            src="/images/brand/tarot-note-symbol.png"
            width={44}
          />
        </span>
        <div>
          <p className="text-sm text-gold">Tarot Note</p>
          <h1 className="text-2xl font-semibold text-softGold">이메일 회원가입</h1>
        </div>
      </div>
      <input className="mt-6 w-full rounded-md border border-white/10 bg-black/25 p-3" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="mt-3 w-full rounded-md border border-white/10 bg-black/25 p-3" placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {message && <p className="mt-3 text-sm text-gold">{message}</p>}
      <Button className="mt-5 w-full" onClick={submit}>
        가입하기
      </Button>
      <p className="mt-4 text-sm text-mist">
        이미 계정이 있다면{" "}
        <Link className="text-softGold" href={routes.login}>
          로그인
        </Link>
      </p>
    </Card>
  );
}
