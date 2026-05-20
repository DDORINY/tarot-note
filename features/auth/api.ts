"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export async function signInWithEmail(email: string, password: string) {
  return createSupabaseBrowserClient().auth.signInWithPassword({ email, password });
}

export async function signUpWithEmail(email: string, password: string) {
  return createSupabaseBrowserClient().auth.signUp({ email, password });
}

export async function signOut() {
  return createSupabaseBrowserClient().auth.signOut();
}
