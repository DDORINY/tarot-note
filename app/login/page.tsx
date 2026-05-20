"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { signInWithEmail } from "@/features/auth/api";
import { routes } from "@/lib/routes";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function submit() {
    try {
      const { error } = await signInWithEmail(email, password);
      if (error) setMessage(error.message);
      else router.push(routes.history);
    } catch {
      setMessage("Supabase 환경변수를 설정한 뒤 로그인할 수 있습니다.");
    }
  }

  return (
    <Card className="mx-auto max-w-md">
      <h1 className="text-2xl font-semibold text-softGold">이메일 로그인</h1>
      <input className="mt-6 w-full rounded-md border border-white/10 bg-black/25 p-3" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="mt-3 w-full rounded-md border border-white/10 bg-black/25 p-3" placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {message && <p className="mt-3 text-sm text-gold">{message}</p>}
      <Button className="mt-5 w-full" onClick={submit}>로그인</Button>
      <p className="mt-4 text-sm text-mist">
        계정이 없다면 <Link className="text-softGold" href={routes.signup}>회원가입</Link>
      </p>
    </Card>
  );
}
