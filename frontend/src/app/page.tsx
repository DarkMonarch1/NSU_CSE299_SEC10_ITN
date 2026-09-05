"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import TrustBadge from "@/components/TrustBadge";
import { MOCK_JOBS, MOCK_ALUMNI } from "@/data/mockData";
import { getJobs, getAlumni } from "@/lib/api";
import { JobPosting, AlumnusProfile } from "@/types";
import {
  ShieldCheck,
  Sparkles,
  Award,
  Briefcase,
  Users,
  Building2,
  ChevronRight,
  TrendingUp,
  CheckCircle2,
  Lock,
  Search,
  ArrowRight,
  BookOpen,
  Loader2,
} from "lucide-react";

export default function Home() {
  const [featuredJobs, setFeaturedJobs] = useState<JobPosting[]>([]);
  const [topAlumni, setTopAlumni] = useState<AlumnusProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [jobs, alumni] = await Promise.all([
          getJobs(undefined, "All", "All"),
          getAlumni("20th Convocation"),
        ]);
        setFeaturedJobs(jobs.slice(0, 4));
        setTopAlumni(alumni.slice(0, 3));
      } catch (err) {
        console.error("Failed to load home page data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-tr from-emerald-600/20 via-cyan-500/20 to-indigo-600/10 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 h-[400px] w-[500px] rounded-full bg-cyan-600/15 blur-[140px]" />
        <div className="absolute bottom-10 -left-40 h-[400px] w-[500px] rounded-full bg-emerald-600/15 blur-[140px]" />
      </div>

      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="mx-auto max-w-7xl px-6 pt-16 pb-20 lg:px-8 lg:pt-24">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-300 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              <span>Built for North South University Graduates & Employers</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.1]">
              Connecting <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">NSU Alumni</span> with Industry Leaders.
            </h1>

            <p className="text-base text-slate-300 sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Verified graduate profiles, AI-powered CV grooming, smart job matching, and fraud-free employer hiring — built to bridge academic excellence with real career growth.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/jobs"
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-7 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/25 transition hover:scale-105 hover:brightness-110"
              >
                <Briefcase className="h-4 w-4" />
                <span>Explore Verified Jobs</span>
              </Link>
              <Link
                href="/cv-grooming"
                className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/10 hover:border-cyan-400/40"
              >
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <span>Try AI CV Grooming</span>
              </Link>
            </div>

            {/* Quick Metrics Banner */}
            <div className="mt-12 grid grid-cols-2 gap-4 rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl sm:grid-cols-4">
              <div>
                <p className="text-2xl font-bold text-white sm:text-3xl">84.1%</p>
                <p className="text-xs text-slate-400 mt-1">NSU Graduate Employment Rate</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-cyan-400 sm:text-3xl">BDT 50K-80K</p>
                <p className="text-xs text-slate-400 mt-1">Avg NSU CSE Starting Salary</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-400 sm:text-3xl">40%</p>
                <p className="text-xs text-slate-400 mt-1">Bangladesh ICT Annual Growth</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-indigo-400 sm:text-3xl">$1.4B</p>
                <p className="text-xs text-slate-400 mt-1">Annual IT Export Revenue</p>
              </div>
            </div>
          </div>
        </section>

        {/* THREE PILLARS OF TRUST & GROWTH */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-cyan-400">Core Platform Strategy</p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">The Three AI Pillars of CareerSetu</h2>
            <p className="text-sm text-slate-400">
              Engineered with spaCy NER, Sentence-BERT embeddings, and EMSCAD job-scam classification.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="group rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-xl backdrop-blur-xl transition hover:border-emerald-500/40 hover:bg-slate-900">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">1. AI CV Grooming</h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Parses your resume using NLP embeddings, identifies missing skill keywords, and provides actionable benchmark feedback for target roles.
              </p>
              <Link href="/cv-grooming" className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:underline">
                Analyze your CV <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="group rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-xl backdrop-blur-xl transition hover:border-cyan-500/40 hover:bg-slate-900">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-400 group-hover:scale-110 transition">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">2. Smart Job Matching</h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Vectorizes candidate profiles and job requirements to deliver accurate fit scores so candidates apply with confidence.
              </p>
              <Link href="/jobs" className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:underline">
                Browse Matched Roles <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="group rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-xl backdrop-blur-xl transition hover:border-indigo-500/40 hover:bg-slate-900">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-400 group-hover:scale-110 transition">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">3. Job Trust & Scam Detector</h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Classifies every job posting before it goes live, assigning a visible Trust Score badge to safeguard NSU graduates from online hiring fraud.
              </p>
              <Link href="/jobs" className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:underline">
                View Trust Audits <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* FEATURED VERIFIED JOBS */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] font-semibold text-emerald-400">Verified Opportunities</p>
              <h2 className="text-2xl font-bold text-white sm:text-3xl mt-1">Featured Jobs for NSU Alumni</h2>
            </div>
            <Link
              href="/jobs"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
            >
              <span>View All Postings</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16 rounded-3xl border border-white/10 bg-slate-900/50">
              <Loader2 className="h-8 w-8 text-emerald-400 animate-spin mr-3" />
              <p className="text-sm text-slate-400">Fetching live job postings from database...</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {featuredJobs.map((job) => (
                <div
                  key={job.id}
                  className="group rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl transition hover:border-emerald-500/30 hover:bg-slate-900/90"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <TrustBadge score={job.trustScore} companyName={job.company} />
                        <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-300">
                          {job.aiMatchScore}% AI Match
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition">
                        {job.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        {job.company} · {job.location}
                      </p>
                    </div>
                    <span className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 font-medium">
                      {job.workType}
                    </span>
                  </div>

                  <p className="mt-4 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-slate-400">
                    <span className="font-semibold text-emerald-400">{job.salary}</span>
                    <Link
                      href={`/jobs/${job.slug}`}
                      className="rounded-full bg-white/10 px-4 py-2 font-semibold text-white transition hover:bg-emerald-400 hover:text-slate-950"
                    >
                      View Details & Apply
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CONVOCATION GRADUATE SPOTLIGHT & DIRECTORY */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 border-t border-white/10">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-300">
                <Award className="h-3.5 w-3.5 text-cyan-400" />
                <span>NSU 19th, 20th & 21st Convocation Data</span>
              </div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl leading-tight">
                Benchmark Your Skills Against Top NSU Alumni
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Explore profiles from recent convocation batches working at companies like Pathao, bKash, Brain Station 23, Optimizely, and Therap. Compare CGPA, core skills, and career milestones.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/alumni"
                  className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
                >
                  Open Alumni Directory
                </Link>
                <Link
                  href="/alumni?batch=20th"
                  className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  View 20th Convocation List
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              {topAlumni.map((alum) => (
                <div
                  key={alum.id}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/80 p-4 backdrop-blur-xl transition hover:border-cyan-500/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-500 text-slate-950 font-extrabold text-sm">
                      {alum.fullName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{alum.fullName}</h4>
                      <p className="text-xs text-slate-400">
                        {alum.currentRole || "Software Engineer"} at <span className="text-slate-200">{alum.currentCompany || "Leading Tech Firm"}</span>
                      </p>
                      <span className="text-[10px] text-cyan-400 font-semibold">{alum.convocationBatch || "NSU Graduate"}</span>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-400/10 border border-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                    CGPA {alum.cgpa || "3.65"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CAREER MAGAZINE BANNER */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900 via-indigo-950/50 to-slate-900 p-8 shadow-2xl backdrop-blur-xl sm:p-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-pink-500/20 px-3 py-1 text-xs font-semibold text-pink-300 border border-pink-500/30">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>CareerSetu Sub-site</span>
                </div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Career Magazine & Employer Insights
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Read sponsored features from partner employers, learn how to beat Applicant Tracking Systems, and stay updated on salary benchmarks across Bangladesh tech firms.
                </p>
              </div>
              <Link
                href="/magazine"
                className="shrink-0 rounded-full bg-pink-500 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-pink-400 shadow-lg shadow-pink-500/25"
              >
                Read Magazine Features
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
