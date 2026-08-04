"use client";

import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";

const job = {
  title: "Senior Product Manager, AI",
  company: "ByteScale Labs",
  location: "Dhaka, Bangladesh",
  type: "Hybrid",
  salary: "BDT 180k-220k",
  summary:
    "Lead the product strategy for AI-powered career solutions and employer matching. Work closely with data, engineering, and employer success teams.",
  responsibilities: [
    "Define product vision for AI-driven alumni matching.",
    "Partner with recruiters and alumni to improve job trust scores.",
    "Monitor performance of job recommendations and feedback loops.",
  ],
  requirements: [
    "3+ years of product management experience.",
    "Strong understanding of AI-driven recruitment workflows.",
    "Excellent communication with alumni and employer stakeholders.",
  ],
};

export default function JobDetailPage({ params }: { params: { slug: string } }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Job details</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">{job.title}</h1>
            <p className="mt-2 text-sm text-slate-400">
              {job.company} · {job.location} · {job.type}
            </p>
          </div>
          <Link
            href="/jobs"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/10"
          >
            Back to jobs
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.75fr_0.25fr]">
          <section className="rounded-[32px] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">About the role</p>
                <p className="mt-4 text-lg leading-8 text-slate-300">{job.summary}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Responsibilities</h2>
                <ul className="mt-4 space-y-3 text-slate-300">
                  {job.responsibilities.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 block h-2 w-2 rounded-full bg-cyan-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Requirements</h2>
                <ul className="mt-4 space-y-3 text-slate-300">
                  {job.requirements.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 block h-2 w-2 rounded-full bg-cyan-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Application</p>
              <div className="mt-6 space-y-4">
                <div className="rounded-3xl bg-slate-950/80 p-5">
                  <p className="text-sm text-slate-400">Salary</p>
                  <p className="mt-2 text-xl font-semibold text-white">{job.salary}</p>
                </div>
                <div className="rounded-3xl bg-slate-950/80 p-5">
                  <p className="text-sm text-slate-400">Type</p>
                  <p className="mt-2 text-xl font-semibold text-white">{job.type}</p>
                </div>
                <button className="w-full rounded-full bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300">
                  Apply with profile
                </button>
              </div>
            </div>
            <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Employer info</p>
              <div className="mt-6 space-y-3 text-slate-300">
                <div>
                  <p className="text-sm text-slate-400">Company</p>
                  <p className="mt-1 text-base font-semibold text-white">{job.company}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Trusted score</p>
                  <p className="mt-1 text-base font-semibold text-white">98%</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Employer network</p>
                  <p className="mt-1 text-base font-semibold text-white">Verified hiring partner</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
