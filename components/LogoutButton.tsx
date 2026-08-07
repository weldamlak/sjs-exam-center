"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    // 1. Sign out from Supabase
    await supabase.auth.signOut();

    // 2. Refresh the route & redirect to home or login page
    router.refresh();
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="px-4 py-2 text-xs font-bold text-rose-400 hover:text-rose-300 bg-rose-950/30 hover:bg-rose-900/50 border border-rose-800/50 rounded-xl transition-all disabled:opacity-50"
    >
      {loading ? "Signing Out..." : "Log Out"}
    </button>
  );
}