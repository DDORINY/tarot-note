"use client";

import Link from "next/link";
import { useState } from "react";
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
      <h1 className="text-2xl font-semibold text-softGold">이메일 회원가입</h1>
      <input className="mt-6 w-full rounded-md border border-white/10 bg-black/25 p-3" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="mt-3 w-full rounded-md border border-white/10 bg-black/25 p-3" placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {message && <p className="mt-3 text-sm text-gold">{message}</p>}
      <Button className="mt-5 w-full" onClick={submit}>가입하기</Button>
      <p className="mt-4 text-sm text-mist">
        이미 계정이 있다면 <Link className="text-softGold" href={routes.login}>로그인</Link>
      </p>
    </Card>
  );
}
