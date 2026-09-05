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
    { role: "Senior Software Engineer (5+ years)", minSalary: 90, maxSalary: 300, avgSalary: 150, demand: "Very High" },
    { role: "AI / ML Engineer", minSalary: 45, maxSalary: 150, avgSalary: 85, demand: "High" },
    { role: "Full Stack Developer (Next.js / React)", minSalary: 35, maxSalary: 110, avgSalary: 60, demand: "Very High" },
    { role: "Backend Developer (Python / Node.js)", minSalary: 35, maxSalary: 120, avgSalary: 65, demand: "Very High" },
    { role: "DevOps & Cloud Engineer", minSalary: 50, maxSalary: 150, avgSalary: 80, demand: "High" },
    { role: "Junior Software Engineer (0-2 years)", minSalary: 20, maxSalary: 60, avgSalary: 35, demand: "High" },
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
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">NSU CSE Entry Salary</p>
            <p className="mt-2 text-3xl font-extrabold text-emerald-400">BDT 50-80K</p>
            <span className="text-[10px] text-emerald-400 font-semibold mt-1 inline-block">Monthly for Fresh Graduates</span>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 backdrop-blur-xl">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">NSU Employment Rate</p>
            <p className="mt-2 text-3xl font-extrabold text-cyan-400">84.1%</p>
            <span className="text-[10px] text-cyan-300 font-semibold mt-1 inline-block">Graduates Employed</span>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 backdrop-blur-xl">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Most Demanded Skills</p>
            <p className="mt-2 text-3xl font-extrabold text-indigo-300">JavaScript</p>
            <span className="text-[10px] text-indigo-300 font-semibold mt-1 inline-block">Python, React, Next.js</span>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 backdrop-blur-xl">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">ICT Sector Growth</p>
            <p className="mt-2 text-3xl font-extrabold text-pink-400">40%</p>
            <span className="text-[10px] text-pink-300 font-semibold mt-1 inline-block">Annual Growth Rate</span>
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
                Compensation stats based on 2026 Bangladesh tech industry research (PayScale, Levels.fyi, BdTechJobs)
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
              <div className="flex justify-between"><span>JavaScript / TypeScript</span><span className="text-cyan-400 font-bold">92%</span></div>
              <div className="flex justify-between"><span>React / Next.js</span><span className="text-cyan-400 font-bold">88%</span></div>
              <div className="flex justify-between"><span>Vue.js / Angular</span><span className="text-cyan-400 font-bold">65%</span></div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              Top Backend & AI Stack
            </h3>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between"><span>Python / Django / FastAPI</span><span className="text-emerald-400 font-bold">85%</span></div>
              <div className="flex justify-between"><span>Node.js / Express</span><span className="text-emerald-400 font-bold">82%</span></div>
              <div className="flex justify-between"><span>Java / ASP.NET</span><span className="text-emerald-400 font-bold">78%</span></div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              DevOps & Cloud Stack
            </h3>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between"><span>AWS / Azure / GCP</span><span className="text-indigo-300 font-bold">75%</span></div>
              <div className="flex justify-between"><span>Docker / Kubernetes</span><span className="text-indigo-300 font-bold">70%</span></div>
              <div className="flex justify-between"><span>CI/CD (GitHub Actions)</span><span className="text-indigo-300 font-bold">68%</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
