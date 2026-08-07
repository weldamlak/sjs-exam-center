"use client";

import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

export default function LoginPage() {
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center">
        {/* Logo */}
        <div className="relative w-16 h-16 rounded-full overflow-hidden border border-slate-700 mx-auto mb-4 bg-slate-900">
          <Image
            src="/logo.jpg"
            alt="SJS Exam Center Logo"
            fill
            className="object-cover"
            priority
          />
        </div>

        <h1 className="text-2xl font-black text-white tracking-tight mb-2">
          SJS EXAM CENTER
        </h1>
        <p className="text-sm text-slate-400 mb-8">
          Sign in to access exam practice questions and track your performance.
        </p>

        {/* Google Auth Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full py-3.5 px-4 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-750 text-white font-medium flex items-center justify-center gap-3 transition-all hover:border-slate-600 shadow-md"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
            />
            <path
              fill="#FBBC05"
              d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
            />
          </svg>
          Continue with Google
        </button>

        <div className="mt-8 text-xs text-slate-500">
          Protected by SJS Exam Portal Authentication.
        </div>
      </div>
    </div>
  );
}