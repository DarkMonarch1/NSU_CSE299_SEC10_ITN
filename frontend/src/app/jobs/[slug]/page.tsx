"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import TrustBadge from "@/components/TrustBadge";
import { getJobBySlug, submitJobApplication } from "@/lib/api";
import { JobPosting } from "@/types";
import {
  Building2,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  Send,
  Lock,
  Loader2,
} from "lucide-react";

export default function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { user, profile } = useAuth();
  const [job, setJob] = useState<JobPosting | null>(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [coverNote, setCoverNote] = useState("");


  useEffect(() => {
    async function loadJob() {
      setLoading(true);
      const data = await getJobBySlug(resolvedParams.slug);
      setJob(data);
      if (data) {
        setCoverNote(
          `Dear ${data.company} Hiring Team,\nI am an NSU CSE graduate interested in the ${data.title} role. My profile includes verified CGPA credentials and full stack experience.`
        );
      }
      setLoading(false);
    }
    loadJob();
  }, [resolvedParams.slug]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;

    await submitJobApplication(
      job.id,
      profile.fullName,
      user?.email || "alumni@northsouth.edu",
      coverNote
    );

    setApplied(true);
    setShowApplyModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 text-emerald-400 animate-spin" />
          <p className="text-sm text-slate-400">Loading job details from database...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Job Posting Not Found</h1>
          <Link href="/jobs" className="text-sm text-cyan-400 hover:underline">
            Return to Job Board
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:underline mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to All Job Openings
        </Link>

        {/* HEADER HERO CARD */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl mb-8 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <TrustBadge score={job.trustScore} companyName={job.company} />
                <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 text-xs font-semibold text-cyan-300">
                  {job.aiMatchScore}% Candidate Fit
                </span>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                  {job.targetConvocation}
                </span>
              </div>
              <h1 className="text-3xl font-extrabold text-white sm:text-4xl">{job.title}</h1>
              <p className="text-sm text-slate-300 mt-2 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-slate-400" />
                <span className="font-semibold text-white">{job.company}</span>
                <span>·</span>
                <MapPin className="h-4 w-4 text-slate-400" />
                <span>{job.location}</span>
              </p>
            </div>

            <div className="flex flex-col items-start sm:items-end gap-2">
              <span className="text-xl font-bold text-emerald-400">{job.salary}</span>
              {applied ? (
                <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-5 py-2.5 text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" /> Application Submitted
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowApplyModal(true)}
                  className="rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-7 py-3 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
                >
                  Apply with Verified Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* DETAILS GRID */}
        <div className="grid gap-8 md:grid-cols-12">
          {/* MAIN DESCRIPTION */}
          <div className="md:col-span-8 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white uppercase tracking-wider text-cyan-400">
                  Role Overview
                </h2>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">{job.description}</p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white uppercase tracking-wider text-emerald-400">
                  Key Requirements
                </h2>
                <ul className="mt-3 space-y-2.5 text-sm text-slate-300">
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-emerald-400 font-bold shrink-0">✓</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white uppercase tracking-wider text-indigo-400">
                  Responsibilities
                </h2>
                <ul className="mt-3 space-y-2.5 text-sm text-slate-300">
                  {job.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-indigo-400 font-bold shrink-0">·</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white uppercase tracking-wider text-pink-400">
                  Perks & Benefits
                </h2>
                <ul className="mt-3 space-y-2.5 text-sm text-slate-300">
                  {job.benefits.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-pink-400 font-bold shrink-0">★</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* SIDEBAR MATCH ANALYSIS */}
          <div className="md:col-span-4 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl space-y-4">
              <h3 className="text-base font-bold text-white uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                AI Candidate Fit Analysis
              </h3>

              <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4 text-center">
                <p className="text-xs text-slate-400">Profile Match Rating</p>
                <p className="text-3xl font-extrabold text-cyan-400 mt-1">{job.aiMatchScore}%</p>
                <p className="text-[11px] text-slate-300 mt-1">High compatibility with your skills</p>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">Alumnus Name</span>
                  <span className="font-semibold text-white">{profile.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">Academic CGPA</span>
                  <span className="font-semibold text-emerald-400">{profile.cgpa}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">Credential Status</span>
                  <span className="font-semibold text-cyan-300">Verified Ledger</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* APPLICATION SUBMISSION MODAL */}
        {showApplyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md">
            <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                    <Send className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Apply to {job.title}</h3>
                    <p className="text-xs text-slate-400">{job.company}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowApplyModal(false)}
                  className="rounded-full bg-white/5 p-2 text-slate-400 hover:bg-white/10 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleApply} className="mt-6 space-y-4 text-sm text-slate-300">
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 space-y-1 text-xs">
                  <p className="font-bold text-emerald-400">Verified Profile Attachment</p>
                  <p>Name: <strong className="text-white">{profile.fullName}</strong></p>
                  <p>Degree: <strong className="text-white">{profile.degree}</strong> (CGPA {profile.cgpa})</p>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Cover Note to Recruiter
                  </label>
                  <textarea
                    rows={4}
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-xs text-white outline-none focus:border-emerald-400/40"
                  />
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <Lock className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Full CV & grade sheet unlocked only after application acceptance.</span>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-emerald-400 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
                >
                  Submit Application Now
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
