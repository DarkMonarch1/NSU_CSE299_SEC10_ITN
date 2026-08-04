"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { user, login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({ name: "Jihanur Rahman Ratul", email, role: "alumni" });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-16 lg:px-8">
        <div className="grid w-full gap-10 rounded-[32px] border border-white/10 bg-slate-900/80 p-10 shadow-2xl shadow-black/40 backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Welcome back</p>
            <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              Login to your CareerSetu account
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
              Access your verified alumni profile, job recommendations, and employer connections with one secure login.
            </p>
            <div className="mt-8 space-y-4">
              <button className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/10">
                Continue with Google
              </button>
              <button className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/10">
                Continue with LinkedIn
              </button>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-slate-950/90 p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-slate-200">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter password"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Login
              </button>
              <p className="text-center text-sm text-slate-400">
                Don’t have an account?{' '}
                <Link href="/signup" className="text-cyan-300 hover:text-cyan-200">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
