"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
  const { user, login } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({ name: name || "New Alumni", email, role: "alumni" });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-16 lg:px-8">
        <div className="grid w-full gap-10 rounded-[32px] border border-white/10 bg-slate-900/80 p-10 shadow-2xl shadow-black/40 backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Create account</p>
            <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              Join CareerSetu for verified alumni success
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
              Build your alumni profile, get AI CV feedback, and explore trusted job opportunities from employers who value NSU talent.
            </p>
            <div className="mt-8 grid gap-4">
              <button className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-emerald-400/30 hover:bg-white/10">
                Sign up with Google
              </button>
              <button className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-emerald-400/30 hover:bg-white/10">
                Sign up with Email
              </button>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-slate-950/90 p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-slate-200">Full name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/10"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/10"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Create a password"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/10"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
              >
                Create account
              </button>
              <p className="text-center text-sm text-slate-400">
                Already a member?{' '}
                <Link href="/login" className="text-emerald-300 hover:text-emerald-200">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
