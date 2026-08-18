"use client";

import { useState, useEffect } from "react";
import TrustBadge from "@/components/TrustBadge";
import { MOCK_JOBS, MOCK_ALUMNI } from "@/data/mockData";
import { getAdminStats } from "@/lib/api";
import {
  Shield,
  CheckCircle2,
  AlertTriangle,
  Users,
  FileCheck,
  Building2,
} from "lucide-react";

export default function AdminConsolePage() {
  const [approvedJobs, setApprovedJobs] = useState<string[]>(MOCK_JOBS.map((j) => j.id));
  const [stats, setStats] = useState({
    totalUsers: 24,
    totalAlumni: 4200,
    totalJobs: 38,
    totalApplications: 142,
    verifiedCompanies: 45,
    scamAttemptsBlocked: 12,
  });

  useEffect(() => {
    async function loadStats() {
      const data = await getAdminStats();
      setStats(data);
    }
    loadStats();
  }, []);

  const toggleApproveJob = (id: string) => {
    if (approvedJobs.includes(id)) {
      setApprovedJobs(approvedJobs.filter((jId) => jId !== id));
    } else {
      setApprovedJobs([...approvedJobs, id]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* HEADER BANNER */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300 mb-2">
            <Shield className="h-3.5 w-3.5 text-emerald-400" />
            <span>CareerSetu Platform Moderation Console — Database Connected</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Admin Governance & Scam Moderation Dashboard
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Monitor verified graduate credentials, review AI scam risk flags, override trust ratings, and manage employer permissions across CareerSetu.
          </p>
        </div>

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
            <p className="text-[11px] text-slate-400 mt-1">EMSCAD Intercepts</p>
          </div>
        </div>

        {/* MODERATION TABLES */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* JOB MODERATION */}
          <div className="lg:col-span-12 space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">Job Posting Moderation Queue</h2>

            <div className="space-y-4">
              {MOCK_JOBS.map((job) => {
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
                      onClick={() => toggleApproveJob(job.id)}
                      className={`flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-bold transition ${
                        isApproved
                          ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300"
                          : "bg-pink-500/20 border border-pink-500/40 text-pink-300"
                      }`}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>{isApproved ? "Approved & Verified" : "Flagged for Moderation"}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
