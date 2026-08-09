"use client";

import { useState } from "react";
import TrustBadge from "@/components/TrustBadge";
import { MOCK_JOBS, MOCK_ALUMNI } from "@/data/mockData";
import {
  Shield,
  CheckCircle2,
  AlertTriangle,
  Users,
  Award,
  FileCheck,
  TrendingUp,
  Search,
  Lock,
  Unlock,
} from "lucide-react";

export default function AdminConsolePage() {
  const [approvedJobs, setApprovedJobs] = useState<string[]>(MOCK_JOBS.map((j) => j.id));
  const [verifiedCredentials, setVerifiedCredentials] = useState<string[]>(
    MOCK_ALUMNI.map((a) => a.id)
  );

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
            <span>CareerSetu Platform Moderation Console</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Admin Moderation & Security Dashboard
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Review job postings audited by the EMSCAD ML fraud detector, verify graduate credentials against the NSU Registrar ledger, and inspect platform activity metrics.
          </p>
        </div>

        {/* ANALYTICS ROW */}
        <div className="grid gap-4 sm:grid-cols-4 mb-8">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 backdrop-blur-xl">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Verified Alumni</p>
            <p className="mt-2 text-3xl font-extrabold text-white">1,240</p>
            <span className="text-[10px] text-emerald-400 font-semibold mt-1 inline-block">19th & 20th Convocations</span>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 backdrop-blur-xl">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">21st Procession List</p>
            <p className="mt-2 text-3xl font-extrabold text-cyan-400">850</p>
            <span className="text-[10px] text-cyan-300 font-semibold mt-1 inline-block">2024 Graduates</span>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 backdrop-blur-xl">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Live Job Postings</p>
            <p className="mt-2 text-3xl font-extrabold text-emerald-400">{approvedJobs.length} Approved</p>
            <span className="text-[10px] text-emerald-400 font-semibold mt-1 inline-block">EMSCAD Verified</span>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 backdrop-blur-xl">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Scam Risk Intercepts</p>
            <p className="mt-2 text-3xl font-extrabold text-pink-400">14 Blocked</p>
            <span className="text-[10px] text-pink-300 font-semibold mt-1 inline-block">100% Protection</span>
          </div>
        </div>

        {/* MODERATION SECTIONS */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* JOB MODERATION QUEUE */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-cyan-400" />
                  Job Listing Moderation Queue
                </h2>
                <span className="text-xs text-slate-400 font-semibold">EMSCAD Scam Classifier</span>
              </div>

              <div className="space-y-4">
                {MOCK_JOBS.map((job) => {
                  const isApproved = approvedJobs.includes(job.id);

                  return (
                    <div
                      key={job.id}
                      className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/70 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <TrustBadge score={job.trustScore} companyName={job.company} />
                          <span className="text-xs font-semibold text-slate-400">{job.postedDate}</span>
                        </div>
                        <h3 className="text-base font-bold text-white">{job.title}</h3>
                        <p className="text-xs text-slate-400">{job.company} · {job.salary}</p>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-center">
                        {isApproved ? (
                          <button
                            onClick={() => toggleApproveJob(job.id)}
                            className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 flex items-center gap-1 hover:bg-emerald-500/30"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" /> Published Live
                          </button>
                        ) : (
                          <button
                            onClick={() => toggleApproveJob(job.id)}
                            className="rounded-full bg-amber-500/20 border border-amber-500/40 px-3.5 py-1.5 text-xs font-semibold text-amber-300 flex items-center gap-1 hover:bg-amber-500/30"
                          >
                            <AlertTriangle className="h-3.5 w-3.5" /> Approve & Publish
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CREDENTIAL VERIFICATION QUEUE */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Award className="h-5 w-5 text-emerald-400" />
                  NSU Registrar Credential Queue
                </h2>
              </div>

              <div className="space-y-3">
                {MOCK_ALUMNI.map((alum) => (
                  <div
                    key={alum.id}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/70 p-3.5 text-xs"
                  >
                    <div>
                      <h4 className="font-bold text-white">{alum.fullName}</h4>
                      <p className="text-slate-400">{alum.degree} ({alum.convocationBatch})</p>
                      <p className="text-cyan-400 font-mono text-[10px] truncate max-w-[200px]">
                        {alum.blockchainCredentialHash.substring(0, 20)}...
                      </p>
                    </div>

                    <span className="rounded-full bg-emerald-400/20 px-2.5 py-1 font-bold text-emerald-300 border border-emerald-400/30 shrink-0">
                      CGPA {alum.cgpa}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
