"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import TrustBadge from "@/components/TrustBadge";
import { getAdminStats, getJobs, adminApproveJob } from "@/lib/api";
import { JobPosting, AdminStats } from "@/types";
import {
  Shield,
  CheckCircle2,
  AlertTriangle,
  Users,
  FileCheck,
  Building2,
  Loader2,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

export default function AdminConsolePage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [approvedJobs, setApprovedJobs] = useState<string[]>([]);
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalAlumni: 0,
    totalJobs: 0,
    totalApplications: 0,
    verifiedCompanies: 0,
    scamAttemptsBlocked: 0,
  });
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        const [statsData, jobsData] = await Promise.all([
          getAdminStats(),
          getJobs(),
        ]);
        setStats(statsData);
        setJobs(jobsData);
        setApprovedJobs(
          jobsData.filter((j) => j.isApproved ?? true).map((j) => j.id)
        );
      } catch (err: any) {
        console.error("Failed to load admin dashboard data:", err);
        setError("Unable to load latest platform statistics from server.");
      } finally {
        setLoading(false);
      }
    }

    if (user?.role === "admin") {
      loadData();
    }
  }, [user]);

  const toggleApproveJob = async (id: string) => {
    const isCurrentlyApproved = approvedJobs.includes(id);
    const newStatus = !isCurrentlyApproved;

    // Optimistic update
    if (newStatus) {
      setApprovedJobs((prev) => [...prev, id]);
    } else {
      setApprovedJobs((prev) => prev.filter((jId) => jId !== id));
    }

    try {
      await adminApproveJob(id, newStatus);
    } catch (err) {
      console.error("Failed to persist job approval state to backend:", err);
      // Revert on failure
      if (isCurrentlyApproved) {
        setApprovedJobs((prev) => [...prev, id]);
      } else {
        setApprovedJobs((prev) => prev.filter((jId) => jId !== id));
      }
    }
  };

  if (!authLoading && user && user.role !== "admin") {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center py-12">
          <div className="rounded-3xl border border-pink-500/30 bg-slate-900/90 p-8 max-w-md text-center">
            <AlertCircle className="h-12 w-12 text-pink-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
            <p className="text-xs text-slate-300 mb-6">
              You must have an administrator account to access the platform moderation console.
            </p>
            <button
              onClick={() => router.push("/dashboard")}
              className="rounded-full bg-cyan-500 px-6 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-400"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* HEADER BANNER */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300">
                <Shield className="h-3.5 w-3.5 text-emerald-400" />
                <span>CareerSetu Platform Moderation Console — Database Connected</span>
              </div>
              <Link
                href="/admin/moderation"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition"
              >
                <span>Profile Moderation Queue</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
              Admin Governance & Scam Moderation Dashboard
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Monitor verified graduate credentials, review AI scam risk flags, override trust ratings, and manage employer permissions across CareerSetu.
            </p>
          </div>

          {error && (
            <div className="mb-8 flex items-center gap-2 rounded-2xl border border-pink-500/30 bg-pink-500/10 p-4 text-xs font-semibold text-pink-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* STATS OVERVIEW */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Total System Users</span>
                <Users className="h-5 w-5 text-cyan-400" />
              </div>
              <p className="text-3xl font-extrabold text-white mt-2">{stats.totalUsers}</p>
              <p className="text-[11px] text-slate-400 mt-1">Alumni, Recruiters & Admins</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Convocation Graduates</span>
                <FileCheck className="h-5 w-5 text-emerald-400" />
              </div>
              <p className="text-3xl font-extrabold text-emerald-400 mt-2">{stats.totalAlumni}</p>
              <p className="text-[11px] text-slate-400 mt-1">19th, 20th & 21st Convocation</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Verified Companies</span>
                <Building2 className="h-5 w-5 text-indigo-400" />
              </div>
              <p className="text-3xl font-extrabold text-white mt-2">{stats.verifiedCompanies}</p>
              <p className="text-[11px] text-slate-400 mt-1">Partner Firms Ingested</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Scams Blocked</span>
                <AlertTriangle className="h-5 w-5 text-pink-400" />
              </div>
              <p className="text-3xl font-extrabold text-pink-400 mt-2">{stats.scamAttemptsBlocked}</p>
              <p className="text-[11px] text-slate-400 mt-1">High & Moderate Risk Filtered</p>
            </div>
          </div>

          {/* MODERATION TABLES */}
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-12 space-y-4">
              <h2 className="text-xl font-bold text-white mb-4">Job Posting Moderation Queue</h2>

              {loading ? (
                <div className="flex items-center justify-center py-16 rounded-3xl border border-white/10 bg-slate-900/50">
                  <Loader2 className="h-8 w-8 text-emerald-400 animate-spin mr-3" />
                  <p className="text-sm text-slate-400">Loading jobs from database...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => {
                    const isApproved = approvedJobs.includes(job.id);

                    return (
                      <div
                        key={job.id}
                        className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <TrustBadge score={job.trustScore} companyName={job.company} />
                            <span className="text-xs font-semibold text-slate-400">{job.postedDate}</span>
                          </div>
                          <h3 className="text-base font-bold text-white">{job.title}</h3>
                          <p className="text-xs text-slate-300">{job.company} · {job.location}</p>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleApproveJob(job.id)}
                          className={`flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-bold transition ${
                            isApproved
                              ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30"
                              : "bg-pink-500/20 border border-pink-500/40 text-pink-300 hover:bg-pink-500/30"
                          }`}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>{isApproved ? "Approved & Verified" : "Flagged for Moderation"}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
