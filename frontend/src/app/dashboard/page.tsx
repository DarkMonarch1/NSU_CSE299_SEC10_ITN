"use client";

import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";

const progressItems = [
  { label: "Profile completeness", value: 82 },
  { label: "CV match score", value: 91 },
  { label: "Verified credentials", value: 100 },
];

const activityItems = [
  "Application submitted to Pathao",
  "New recruiter message from ByteScale Labs",
  "AI grooming report ready",
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_0.45fr]">
            <section className="space-y-6 rounded-[32px] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Alumni dashboard</p>
                  <h1 className="mt-3 text-3xl font-semibold text-white">
                    Hi, {user?.name || "alumni"} — your profile is almost ready.
                  </h1>
                </div>
                <Link
                  href="/profile"
                  className="rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Review profile
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {progressItems.map((item) => (
                  <div key={item.label} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                    <p className="text-sm text-slate-400">{item.label}</p>
                    <p className="mt-3 text-3xl font-semibold text-white">{item.value}%</p>
                  </div>
                ))}
              </div>

              <div className="rounded-[28px] border border-white/10 bg-slate-900/90 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Priority actions</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <h2 className="text-lg font-semibold text-white">Complete your portfolio</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Add projects, achievements, and skills to improve your match score.
                    </p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <h2 className="text-lg font-semibold text-white">Apply to verified roles</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Browse jobs that are pre-screened for trust and employer fit.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <aside className="space-y-6">
              <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Recent activity</p>
                <ul className="mt-6 space-y-4 text-sm text-slate-300">
                  {activityItems.map((item) => (
                    <li key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Quick links</p>
                <div className="mt-6 grid gap-3">
                  <Link
                    href="/profile"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/10"
                  >
                    View profile
                  </Link>
                  <button className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/10">
                    Download CV report
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
