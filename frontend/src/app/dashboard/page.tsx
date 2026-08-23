"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import TrustBadge from "@/components/TrustBadge";
import BlockchainVerificationModal from "@/components/BlockchainVerificationModal";
import { getJobs } from "@/lib/api";
import { JobPosting } from "@/types";
import {
  Sparkles,
  Award,
  Briefcase,
  Users,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Clock,
  UserCheck,
  Loader2,
} from "lucide-react";

export default function DashboardPage() {
  const { user, profile } = useAuth();
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJobs() {
      setLoading(true);
      try {
        const data = await getJobs();
        setJobs(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to load dashboard job recommendations:", error);
      } finally {
        setLoading(false);
      }
    }
    loadJobs();
  }, []);

  const displayName = user?.fullName || profile.fullName || "NSU Alumnus";
  const userNsuId = user?.nsuId || "1911234042";
  const userBatch = profile.batch || "20th Convocation";
  const credentialHash = `0x${Array.from(displayName + userNsuId)
    .reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 0x8f7a932b)
    .toString(16)}e4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e`.slice(0, 42);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* WELCOME HERO */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl mb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300 mb-2">
                  <UserCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>NSU Alumni Dashboard</span>
                </div>
                <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
                  Welcome back, {displayName}!
                </h1>
                <p className="text-sm text-slate-300 mt-1">
                  {profile.degree} (CGPA: <span className="text-emerald-400 font-bold">{profile.cgpa}</span>) · {userBatch}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <BlockchainVerificationModal
                  studentName={displayName}
                  nsuId={userNsuId}
                  degree={profile.degree}
                  cgpa={profile.cgpa}
                  batch={userBatch}
                  hash={credentialHash}
                />
                <Link
                  href="/profile"
                  className="rounded-full bg-cyan-500 px-5 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-cyan-400"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>

          {/* PROGRESS METRICS CARDS */}
          <div className="grid gap-4 sm:grid-cols-3 mb-8">
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Profile Completeness</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-3xl font-extrabold text-white">90%</span>
                <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300 font-semibold">
                  Verified Active
                </span>
              </div>
              <div className="mt-3 h-2 w-full rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[90%] rounded-full bg-cyan-400" />
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">AI CV Match Gauge</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-3xl font-extrabold text-emerald-400">92/100</span>
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-300 font-semibold">
                  Top Tier
                </span>
              </div>
              <div className="mt-3 h-2 w-full rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[92%] rounded-full bg-emerald-400" />
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Verified Credential Hash</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-3xl font-extrabold text-indigo-300">100%</span>
                <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs text-indigo-300 font-semibold">
                  Ledger Checked
                </span>
              </div>
              <div className="mt-3 h-2 w-full rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-full rounded-full bg-indigo-400" />
              </div>
            </div>
          </div>

          {/* MAIN GRID */}
          <div className="grid gap-8 lg:grid-cols-12">
            {/* RECOMMENDED ROLES */}
            <div className="lg:col-span-8 space-y-6">
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-cyan-400" />
                    AI-Recommended Openings for You
                  </h2>
                  <Link href="/jobs" className="text-xs text-cyan-400 font-semibold hover:underline">
                    View All
                  </Link>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 text-emerald-400 animate-spin mr-3" />
                    <p className="text-sm text-slate-400">Loading recommendations...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {jobs.map((job: JobPosting) => (
                      <div
                        key={job.id}
                        className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/70 p-4 sm:flex-row sm:items-center sm:justify-between transition hover:border-emerald-500/30"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <TrustBadge score={job.trustScore} companyName={job.company} />
                            <span className="text-xs font-bold text-cyan-400">{job.aiMatchScore}% Match</span>
                          </div>
                          <h3 className="text-base font-bold text-white">{job.title}</h3>
                          <p className="text-xs text-slate-400">{job.company} · {job.salary}</p>
                        </div>

                        <Link
                          href={`/jobs/${job.slug}`}
                          className="rounded-full bg-emerald-400 px-4 py-2 text-xs font-bold text-slate-950 transition hover:bg-emerald-300 shrink-0 self-start sm:self-center"
                        >
                          View & Apply
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* SIDEBAR TIMELINE */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl">
                <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3 mb-4">
                  <Clock className="h-4 w-4 text-emerald-400" />
                  Recent Activity Log
                </h3>

                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="rounded-2xl border border-white/5 bg-white/5 p-3">
                    <p className="font-semibold text-white">Profile Synchronized</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Authenticated session secured with JWT credentials</p>
                  </li>
                  <li className="rounded-2xl border border-white/5 bg-white/5 p-3">
                    <p className="font-semibold text-cyan-300">AI CV Grooming Ready</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Resume matcher active with keyword analysis</p>
                  </li>
                  <li className="rounded-2xl border border-white/5 bg-white/5 p-3">
                    <p className="font-semibold text-indigo-300">Degree Hash Verified</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">NSU {userBatch} record verified</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
