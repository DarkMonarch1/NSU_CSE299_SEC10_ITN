"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import TrustBadge from "@/components/TrustBadge";
import PaymentModal from "@/components/PaymentModal";
import { getJobs } from "@/lib/api";
import { JobPosting } from "@/types";
import {
  Briefcase,
  Search,
  PlusCircle,
  Filter,
  ShieldCheck,
  Building2,
  MapPin,
  ChevronRight,
  Loader2,
} from "lucide-react";

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJobs() {
      setLoading(true);
      const fetched = await getJobs(searchTerm, selectedCategory, selectedType);
      setJobs(fetched);
      setLoading(false);
    }
    loadJobs();
  }, [searchTerm, selectedType, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* HEADER BANNER */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-300 mb-2">
                <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
                <span>Verified Hiring Portal — EMSCAD Scam Classifier & Live Database Active</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
                Verified Job Board for NSU Graduates
              </h1>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Browse pre-screened openings from top tech companies. Every job posting is audited for trust and persisted in CareerSetu DB.
              </p>
            </div>

            <button
              onClick={() => setShowPaymentModal(true)}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Post a Job as Alumnus (BDT 300)</span>
            </button>
          </div>

          {/* SEARCH & QUICK FILTERS */}
          <div className="mt-6 grid gap-4 md:grid-cols-12">
            <div className="relative md:col-span-6">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by job title, company (Pathao, bKash), or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 pl-11 pr-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40"
              />
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-200 outline-none focus:border-cyan-400/40"
              >
                <option value="All">All Work Types (Remote/Hybrid/Onsite)</option>
                <option value="Remote">Remote Only</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-200 outline-none focus:border-cyan-400/40"
              >
                <option value="All">All Tech Fields</option>
                <option value="Software Development">Software Development</option>
                <option value="AI & Data Science">AI & Data Science</option>
                <option value="Product & Project Management">Product & Project Management</option>
              </select>
            </div>
          </div>
        </div>

        {/* JOB LISTINGS MAIN CONTENT */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* JOBS FEED */}
          <div className="lg:col-span-8 space-y-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 rounded-3xl border border-white/10 bg-slate-900/50">
                <Loader2 className="h-8 w-8 text-emerald-400 animate-spin mb-3" />
                <p className="text-sm text-slate-400">Fetching live job postings from database...</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-8 text-center">
                <p className="text-base text-slate-300 font-semibold">No job postings found matching your filters.</p>
              </div>
            ) : (
              jobs.map((job) => (
                <article
                  key={job.id}
                  className="group rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl transition hover:border-emerald-500/40 hover:bg-slate-900"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <TrustBadge score={job.trustScore} companyName={job.company} />
                        <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-300">
                          {job.aiMatchScore}% Match Fit
                        </span>
                        <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] text-slate-300">
                          {job.targetConvocation}
                        </span>
                      </div>

                      <h2 className="text-xl font-bold text-white group-hover:text-emerald-300 transition">
                        {job.title}
                      </h2>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5 text-slate-400" />
                        <span>{job.company}</span>
                        <span>·</span>
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        <span>{job.location}</span>
                      </p>
                    </div>

                    <span className="rounded-2xl border border-white/10 bg-white/5 px-3.5 py-1 text-xs text-slate-200 font-semibold self-start">
                      {job.workType}
                    </span>
                  </div>

                  <p className="mt-4 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-slate-400">
                    <span className="font-bold text-emerald-400 text-sm">{job.salary}</span>
                    <Link
                      href={`/jobs/${job.slug}`}
                      className="flex items-center gap-1 rounded-full bg-emerald-400 px-5 py-2 text-xs font-bold text-slate-950 transition hover:bg-emerald-300"
                    >
                      <span>View Details</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* SIDEBAR WIDGETS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl">
              <h3 className="text-base font-bold text-white uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Scam Prevention Protocol
              </h3>
              <ul className="mt-4 space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Every employer is verified against official NSU database.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Automatic EMSCAD machine learning audit evaluates 18 listing features.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Never pay registration or training fees to any job publisher.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl">
              <h3 className="text-base font-bold text-white uppercase tracking-wider text-emerald-400">
                Live Platform Metrics
              </h3>
              <div className="mt-4 space-y-3">
                <div className="rounded-2xl border border-white/5 bg-white/5 p-3.5">
                  <p className="text-xs text-slate-400">Database Job Postings</p>
                  <p className="text-xl font-bold text-white mt-0.5">{jobs.length} Active Roles</p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/5 p-3.5">
                  <p className="text-xs text-slate-400">Average Salary Range</p>
                  <p className="text-xl font-bold text-emerald-400 mt-0.5">BDT 140k - 200k</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* POST JOB PAYMENT MODAL (FEE: 300 BDT) */}
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={() => {}}
          itemTitle="NSU Alumnus Job Posting Listing"
          amountBDT={300}
        />
      </div>
    </div>
  );
}
