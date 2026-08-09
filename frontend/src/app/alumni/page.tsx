"use client";

import { useState } from "react";
import { MOCK_ALUMNI } from "@/data/mockData";
import { AlumniProfile } from "@/types";
import BlockchainVerificationModal from "@/components/BlockchainVerificationModal";
import {
  Users,
  Search,
  Award,
  Building2,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  Sparkles,
  ChevronRight,
  Filter,
} from "lucide-react";

export default function AlumniPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBatch, setSelectedBatch] = useState<string>("All");
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [benchmarkAlum, setBenchmarkAlum] = useState<AlumniProfile | null>(null);

  const filteredAlumni = MOCK_ALUMNI.filter((alum) => {
    const matchesSearch =
      alum.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alum.currentCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alum.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      alum.headline.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBatch =
      selectedBatch === "All" || alum.convocationBatch.toLowerCase().includes(selectedBatch.toLowerCase());

    const matchesDept =
      selectedDept === "All" || alum.department.toLowerCase() === selectedDept.toLowerCase();

    return matchesSearch && matchesBatch && matchesDept;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* HEADER BANNER */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300 mb-3">
            <Award className="h-3.5 w-3.5 text-emerald-400" />
            <span>North South University Convocation Registry</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            NSU Graduates Directory & CV Benchmarking
          </h1>
          <p className="mt-2 text-sm text-slate-300 max-w-3xl leading-relaxed">
            Browse verified graduates from the 19th and 20th Convocations and 21st Convocation procession lists. Benchmark your career progression and skills against peers working in Bangladesh's top tech firms.
          </p>

          {/* SEARCH & FILTER CONTROLS */}
          <div className="mt-6 grid gap-4 md:grid-cols-12">
            <div className="relative md:col-span-6">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search alumni by name, skill (e.g. React), company (Pathao, bKash)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 pl-11 pr-4 py-3 text-sm text-white outline-none focus:border-emerald-400/40"
              />
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-200 outline-none focus:border-emerald-400/40"
              >
                <option value="All">All Convocations (19th, 20th, 21st)</option>
                <option value="19th">19th Convocation List</option>
                <option value="20th">20th Convocation List</option>
                <option value="21st">21st Convocation Procession List</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-200 outline-none focus:border-emerald-400/40"
              >
                <option value="All">All Departments</option>
                <option value="CSE">CSE (Computer Science & Eng)</option>
                <option value="EEE">EEE (Electrical & Telecom Eng)</option>
                <option value="BBA">BBA (School of Business)</option>
              </select>
            </div>
          </div>
        </div>

        {/* ALUMNI CARDS GRID */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAlumni.map((alum) => (
            <div
              key={alum.id}
              className="group rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl transition hover:border-cyan-500/40 hover:bg-slate-900 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500 via-emerald-500 to-indigo-500 text-slate-950 font-extrabold text-base shadow-md">
                    {alum.fullName.charAt(0)}
                  </div>
                  <div className="text-right">
                    <span className="rounded-full bg-emerald-400/10 border border-emerald-400/30 px-3 py-1 text-xs font-bold text-emerald-300">
                      CGPA {alum.cgpa}
                    </span>
                    <span className="block text-[10px] text-cyan-400 mt-1 font-semibold">
                      {alum.convocationBatch}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition">
                    {alum.fullName}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {alum.currentRole} at <strong className="text-slate-200">{alum.currentCompany}</strong>
                  </p>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    {alum.headline}
                  </p>
                </div>

                {/* SKILLS PILLS */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {alum.skills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[11px] text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                  {alum.skills.length > 4 && (
                    <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[11px] text-slate-400">
                      +{alum.skills.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* CARD FOOTER & ACTIONS */}
              <div className="border-t border-white/10 pt-4 space-y-3">
                <BlockchainVerificationModal
                  studentName={alum.fullName}
                  nsuId={alum.nsuId}
                  degree={alum.degree}
                  cgpa={alum.cgpa}
                  batch={alum.convocationBatch}
                  hash={alum.blockchainCredentialHash}
                />

                <button
                  type="button"
                  onClick={() => setBenchmarkAlum(alum)}
                  className="w-full flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 py-2 text-xs font-semibold text-white transition hover:bg-cyan-500/20 hover:border-cyan-400/40"
                >
                  <BarChart3 className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Benchmark CV Against {alum.fullName.split(" ")[0]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* BENCHMARK MODAL */}
        {benchmarkAlum && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md">
            <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-cyan-950/50">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">CV Benchmarking Insights</h3>
                    <p className="text-xs text-slate-400">Comparing Against {benchmarkAlum.fullName}</p>
                  </div>
                </div>
                <button
                  onClick={() => setBenchmarkAlum(null)}
                  className="rounded-full bg-white/5 p-2 text-slate-400 hover:bg-white/10 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="mt-6 space-y-4 text-sm text-slate-300">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
                    <span className="text-xs text-slate-400 block">Target Peer CGPA</span>
                    <span className="text-2xl font-bold text-emerald-400 mt-1 block">{benchmarkAlum.cgpa} / 4.00</span>
                    <span className="text-[10px] text-slate-400">{benchmarkAlum.convocationBatch}</span>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
                    <span className="text-xs text-slate-400 block">Current Industry Role</span>
                    <span className="text-base font-bold text-white mt-1 block truncate">{benchmarkAlum.currentRole}</span>
                    <span className="text-[10px] text-cyan-300 font-medium">{benchmarkAlum.currentCompany}</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                    Peer Skills & Tech Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {benchmarkAlum.skills.map((skill) => (
                      <span key={skill} className="rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-xs text-cyan-300 font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 space-y-1.5 text-xs text-slate-300">
                  <p className="font-semibold text-emerald-400">AI Benchmark Advice:</p>
                  <p className="leading-relaxed">
                    To reach roles similar to {benchmarkAlum.currentRole} at {benchmarkAlum.currentCompany}, focus on adding experience with <strong className="text-white">{benchmarkAlum.skills.slice(0, 2).join(" & ")}</strong> to your CV.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setBenchmarkAlum(null)}
                  className="rounded-full bg-cyan-500 px-6 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Close Benchmark View
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
