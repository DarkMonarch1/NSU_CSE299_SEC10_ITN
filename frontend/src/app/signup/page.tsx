"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiSignup } from "@/lib/api";
import { AlertCircle, Loader2 } from "lucide-react";

export default function SignupPage() {
  const { user, login } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await apiSignup({
        email,
        password,
        fullName: name,
        role: "alumni",
      });
      login(response.user, response.accessToken);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
              <button
                type="button"
                disabled
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-400 cursor-not-allowed opacity-60 flex items-center justify-between"
              >
                <span>Sign up with Google</span>
                <span className="text-xs text-slate-500 font-mono">Coming Soon</span>
              </button>
              <button
                type="button"
                disabled
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-400 cursor-not-allowed opacity-60 flex items-center justify-between"
              >
                <span>Sign up with Email</span>
                <span className="text-xs text-slate-500 font-mono">Coming Soon</span>
              </button>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-slate-950/90 p-8">
            {error && (
              <div className="mb-6 flex items-center gap-2 rounded-2xl border border-pink-500/30 bg-pink-500/10 p-4 text-xs font-semibold text-pink-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

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
                  placeholder="Create a password (min 8 characters)"
                  minLength={8}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/10"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:opacity-50"
              >
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                <span>{isLoading ? "Creating account..." : "Create account"}</span>
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
