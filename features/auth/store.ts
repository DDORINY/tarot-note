"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Profile } from "@/features/auth/types";

export function useAuthUser() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    async function loadProfile(nextUser: User | null) {
      setUser(nextUser);

      if (!nextUser) {
        setProfile(null);
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("id, nickname, created_at")
        .eq("id", nextUser.id)
        .maybeSingle();

      setProfile(data ?? null);
    }

    supabase.auth.getUser().then(async ({ data }) => {
      await loadProfile(data.user);
      setLoading(false);
    });

    const { data } = supabase.auth.onAuthStateChange(async (_event, session) => {
      await loadProfile(session?.user ?? null);
      setLoading(false);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  return { user, profile, loading };
}
