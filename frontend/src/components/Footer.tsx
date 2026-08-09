"use client";

import Link from "next/link";
import { Shield, Sparkles, Award, Lock, ExternalLink, Activity } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-400 text-sm">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="space-y-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Shield className="h-4 w-4" />
              </div>
              <span className="text-base font-bold tracking-[0.2em] text-white">
                CAREER<span className="text-emerald-400">SETU</span>
              </span>
            </Link>
            <p className="text-xs leading-6 text-slate-400">
              An AI-Powered Alumni – Industry Bridge Platform. Verified profiles, AI CV grooming, smart job matching, and fraud-free hiring built for the North South University community.
            </p>
            <div className="flex items-center gap-3 text-xs text-emerald-400">
              <span className="flex items-center gap-1">
                <Lock className="h-3 w-3" /> Fraud-Free Hiring
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Award className="h-3 w-3" /> Blockchain Ledger
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Platform Features</h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link href="/jobs" className="transition hover:text-emerald-400">
                  Verified Job Board & Trust Scores
                </Link>
              </li>
              <li>
                <Link href="/cv-grooming" className="transition hover:text-cyan-400">
                  AI CV Grooming & Match Scoring
                </Link>
              </li>
              <li>
                <Link href="/alumni" className="transition hover:text-emerald-400">
                  Convocation Alumni Directory (19th, 20th, 21st)
                </Link>
              </li>
              <li>
                <Link href="/employer" className="transition hover:text-indigo-400">
                  Employer Recruiter Portal & Candidate Ranker
                </Link>
              </li>
              <li>
                <Link href="/magazine" className="transition hover:text-pink-400">
                  Career Magazine & Sponsored Ads
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">NSU Convocation Archives</h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link href="/alumni?batch=19th" className="transition hover:text-slate-200">
                  19th Convocation Graduates List
                </Link>
              </li>
              <li>
                <Link href="/alumni?batch=20th" className="transition hover:text-slate-200">
                  20th Convocation Graduates List
                </Link>
              </li>
              <li>
                <Link href="/alumni?batch=21st" className="transition hover:text-slate-200">
                  21st Convocation Procession List
                </Link>
              </li>
              <li>
                <a href="https://www.northsouth.edu" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-cyan-400 transition hover:underline">
                  North South University Portal <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Administration & Insights</h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link href="/insights" className="flex items-center gap-1.5 transition hover:text-cyan-400">
                  <Activity className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Salary & Tech Career Insights</span>
                </Link>
              </li>
              <li>
                <Link href="/admin" className="flex items-center gap-1.5 transition hover:text-emerald-400">
                  <Shield className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Admin Moderation Console</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} CareerSetu · North South University Alumni – Industry Bridge Platform.</p>
          <p className="flex items-center gap-2">
            <span>Powered by Next.js 16</span>
            <span>·</span>
            <span>FastAPI AI Engine</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
