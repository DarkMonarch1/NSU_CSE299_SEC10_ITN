"use client";

import Link from "next/link";

const jobPostings = [
  {
    slug: "ai-product-manager",
    title: "AI Product Manager",
    company: "ByteScale Labs",
    location: "Dhaka, Bangladesh",
    type: "Hybrid",
    salary: "BDT 150k-190k",
    tag: "Trusted",
  },
  {
    slug: "data-analyst",
    title: "Data Analyst",
    company: "Pathao",
    location: "Remote",
    type: "Remote",
    salary: "BDT 110k-140k",
    tag: "High-fit",
  },
  {
    slug: "full-stack-developer",
    title: "Full Stack Developer",
    company: "North Star Labs",
    location: "Dhaka",
    type: "On-site",
    salary: "BDT 180k-220k",
    tag: "Verified",
  },
];

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-10 rounded-[32px] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Job board</p>
          <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
            Discover trusted opportunities for NSU alumni
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
            Browse verified job postings, filter by role and work type, and connect with employers who trust your profile.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.75fr_0.25fr]">
          <div className="space-y-6">
            <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">Available roles</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Tailored opportunities for alumni, backed by trust scores and verified hiring teams.
                  </p>
                </div>
                <button className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
                  Post a job
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {jobPostings.map((job) => (
                <article
                  key={job.slug}
                  className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6 transition hover:border-cyan-400/30 hover:bg-slate-900/90"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">{job.tag}</p>
                      <h3 className="mt-3 text-2xl font-semibold text-white">{job.title}</h3>
                      <p className="mt-2 text-sm text-slate-400">{job.company} · {job.location}</p>
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                      {job.type}
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-300">
                    <span>{job.salary}</span>
                    <Link
                      href={`/jobs/${job.slug}`}
                      className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
                    >
                      View details
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Filters</p>
              <div className="mt-6 space-y-3">
                <button className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-200 hover:border-cyan-400/30 hover:bg-white/10">
                  Remote
                </button>
                <button className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-200 hover:border-cyan-400/30 hover:bg-white/10">
                  Hybrid
                </button>
                <button className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-200 hover:border-cyan-400/30 hover:bg-white/10">
                  On-site
                </button>
              </div>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Quick stats</p>
              <div className="mt-6 grid gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Verified vacancies</p>
                  <p className="mt-2 text-xl font-semibold text-white">38+</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Partner employers</p>
                  <p className="mt-2 text-xl font-semibold text-white">22</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
