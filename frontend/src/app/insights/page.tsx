"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  BarChart3,
  DollarSign,
  Award,
  Users,
  Briefcase,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function InsightsPage() {
  const [selectedDept, setSelectedDept] = useState("CSE");

  const salaryData = [
    { role: "Senior Backend Architect (FastAPI / Node)", minSalary: 180, maxSalary: 240, avgSalary: 210, demand: "Very High" },
    { role: "AI / ML Research Engineer", minSalary: 160, maxSalary: 220, avgSalary: 190, demand: "High" },
    { role: "Full Stack Developer (Next.js / React)", minSalary: 140, maxSalary: 190, avgSalary: 165, demand: "Very High" },
    { role: "AI Product Manager", minSalary: 150, maxSalary: 200, avgSalary: 175, demand: "Moderate" },
    { role: "DevOps & Cloud Security Engineer", minSalary: 130, maxSalary: 180, avgSalary: 155, demand: "High" },
    { role: "Data Analyst & Risk Engine", minSalary: 110, maxSalary: 150, avgSalary: 130, demand: "High" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* HEADER BANNER */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-300 mb-2">
            <TrendingUp className="h-3.5 w-3.5 text-cyan-400" />
            <span>North South University Career Analytics & Benchmark Insights</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Bangladesh Tech Market Salary & Career Insights
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Data-driven salary benchmarks, skill demand trends, and placement analytics collected from NSU 19th, 20th, and 21st Convocation graduates.
          </p>
        </div>

        {/* METRICS ROW */}
        <div className="grid gap-4 sm:grid-cols-4 mb-8">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 backdrop-blur-xl">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Avg Graduate Entry Salary</p>
            <p className="mt-2 text-3xl font-extrabold text-emerald-400">BDT 145k</p>
            <span className="text-[10px] text-emerald-400 font-semibold mt-1 inline-block">Monthly Compensation</span>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 backdrop-blur-xl">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Top Recruiter Department</p>
            <p className="mt-2 text-3xl font-extrabold text-cyan-400">CSE (68%)</p>
            <span className="text-[10px] text-cyan-300 font-semibold mt-1 inline-block">Computer Science & Eng</span>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 backdrop-blur-xl">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Most Demanded Skill</p>
            <p className="mt-2 text-3xl font-extrabold text-indigo-300">Next.js & AI</p>
            <span className="text-[10px] text-indigo-300 font-semibold mt-1 inline-block">FastAPI / Python</span>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 backdrop-blur-xl">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Placement Speed</p>
            <p className="mt-2 text-3xl font-extrabold text-pink-400">&lt; 45 Days</p>
            <span className="text-[10px] text-pink-300 font-semibold mt-1 inline-block">From Convocation</span>
          </div>
        </div>

        {/* SALARY BENCHMARK TABLE */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl mb-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-cyan-400" />
                Role Salary Benchmarks in Bangladesh Tech Sector (2026)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Compensation stats gathered from partner employers (Pathao, bKash, Brain Station 23, Optimizely)
              </p>
            </div>
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-300">
              BDT Monthly Scale
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-semibold">
                  <th className="py-3 px-4">Role Title</th>
                  <th className="py-3 px-4">Salary Range (BDT / mo)</th>
                  <th className="py-3 px-4">Average Salary</th>
                  <th className="py-3 px-4 text-right">Market Demand</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {salaryData.map((s, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition">
                    <td className="py-3 px-4 font-bold text-white">{s.role}</td>
                    <td className="py-3 px-4 text-slate-300">BDT {s.minSalary}k - {s.maxSalary}k</td>
                    <td className="py-3 px-4 font-bold text-emerald-400">BDT {s.avgSalary},000</td>
                    <td className="py-3 px-4 text-right">
                      <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 font-bold text-cyan-300">
                        {s.demand}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* TOP DEMANDED SKILLS CARDS */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              Top Web & Frontend Stack
            </h3>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between"><span>Next.js App Router</span><span className="text-cyan-400 font-bold">94%</span></div>
              <div className="flex justify-between"><span>TypeScript</span><span className="text-cyan-400 font-bold">89%</span></div>
              <div className="flex justify-between"><span>Tailwind CSS</span><span className="text-cyan-400 font-bold">85%</span></div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              Top Backend & AI Stack
            </h3>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between"><span>FastAPI & Python</span><span className="text-emerald-400 font-bold">92%</span></div>
              <div className="flex justify-between"><span>Node.js / NestJS</span><span className="text-emerald-400 font-bold">88%</span></div>
              <div className="flex justify-between"><span>PostgreSQL & Redis</span><span className="text-emerald-400 font-bold">91%</span></div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              DevOps & Cloud Stack
            </h3>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between"><span>Docker Containerization</span><span className="text-indigo-300 font-bold">90%</span></div>
              <div className="flex justify-between"><span>GitHub Actions CI/CD</span><span className="text-indigo-300 font-bold">86%</span></div>
              <div className="flex justify-between"><span>AWS Cloud Services</span><span className="text-indigo-300 font-bold">82%</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
