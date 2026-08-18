"use client";

import { useState, useEffect } from "react";
import { MOCK_ALUMNI } from "@/data/mockData";
import { AlumnusProfile } from "@/types";
import BlockchainVerificationModal from "@/components/BlockchainVerificationModal";
import { getAlumni } from "@/lib/api";
import {
  Users,
  Search,
  Award,
  Building2,
  CheckCircle2,
  BarChart3,
  Sparkles,
  Loader2,
} from "lucide-react";

export default function AlumniPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBatch, setSelectedBatch] = useState<string>("All");
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [benchmarkAlum, setBenchmarkAlum] = useState<AlumnusProfile | null>(null);
  const [alumniList, setAlumniList] = useState<AlumnusProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAlumniData() {
      setLoading(true);
      const data = await getAlumni(selectedBatch === "All" ? undefined : selectedBatch);
      setAlumniList(data);
      setLoading(false);
    }
    loadAlumniData();
  }, [selectedBatch]);

  const filteredAlumni = (alumniList.length > 0 ? alumniList : MOCK_ALUMNI).filter((alum) => {
    const matchesSearch =
      alum.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (alum.currentCompany && alum.currentCompany.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (alum.currentRole && alum.currentRole.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesBatch =
      selectedBatch === "All" || (alum.convocationBatch || "").toLowerCase().includes(selectedBatch.toLowerCase());


    const matchesDept =
      selectedDept === "All" || (alum.department || "").toLowerCase().includes(selectedDept.toLowerCase());

    return matchesSearch && matchesBatch && matchesDept;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* HEADER HERO */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-300 mb-2">
                <Users className="h-3.5 w-3.5 text-cyan-400" />
                <span>NSU Convocation Graduates Directory (19th, 20th & 21st)</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
                Alumni Network & CV Benchmarking
              </h1>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Search verified North South University graduates, compare skill profiles, inspect academic credentials, and benchmark your career progress.
              </p>
            </div>
          </div>

          {/* SEARCH & BATCH FILTERS */}
          <div className="mt-6 grid gap-4 md:grid-cols-12">
            <div className="relative md:col-span-6">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search alumni by graduate name, company (Pathao, bKash), or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 pl-11 pr-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40"
              />
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-200 outline-none focus:border-cyan-400/40"
              >
                <option value="All">All Convocation Batches</option>
                <option value="19th">19th Convocation</option>
                <option value="20th">20th Convocation</option>
                <option value="21st">21st Convocation</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-200 outline-none focus:border-cyan-400/40"
              >
                <option value="All">All Departments</option>
                <option value="Computer Science">Computer Science & Engineering</option>
                <option value="Electrical">EEE</option>
                <option value="Architecture">Architecture</option>
              </select>
            </div>
          </div>
        </div>

        {/* ALUMNI GRID */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 rounded-3xl border border-white/10 bg-slate-900/50">
            <Loader2 className="h-8 w-8 text-cyan-400 animate-spin mb-3" />
            <p className="text-sm text-slate-400">Querying alumni dataset from database...</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAlumni.slice(0, 18).map((alum) => (
              <div
                key={alum.id}
                className="group rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl transition hover:border-cyan-500/40 hover:bg-slate-900 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-300">
                      {alum.convocationBatch}
                    </span>
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" /> CGPA {alum.cgpa || "3.65"}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition">
                    {alum.fullName}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{alum.degree}</p>

                  <p className="text-xs text-slate-300 mt-3 flex items-center gap-1.5 font-medium">
                    <Building2 className="h-3.5 w-3.5 text-slate-400" />
                    <span>{alum.currentRole || "Software Engineer"}</span>
                    <span>at</span>
                    <strong className="text-white">{alum.currentCompany || "Leading Tech Firm"}</strong>
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <BlockchainVerificationModal
                    studentName={alum.fullName}
                    nsuId={alum.nsuId}
                    cgpa={alum.cgpa || "3.65"}
                    degree={alum.degree}
                    batch={alum.convocationBatch || "20th Convocation"}
                    hash={alum.blockchainCredentialHash || "0x8f7a932b1e4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e"}
                  />



                  <button
                    onClick={() => setBenchmarkAlum(alum)}
                    className="flex items-center gap-1 font-semibold text-cyan-400 hover:text-cyan-300"
                  >
                    <BarChart3 className="h-3.5 w-3.5" />
                    <span>Benchmark CV</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BENCHMARK MODAL */}
        {benchmarkAlum && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md">
            <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">AI CV Benchmark vs {benchmarkAlum.fullName}</h3>
                    <p className="text-xs text-slate-400">{benchmarkAlum.currentRole} at {benchmarkAlum.currentCompany}</p>
                  </div>
                </div>
                <button
                  onClick={() => setBenchmarkAlum(null)}
                  className="rounded-full bg-white/5 p-2 text-slate-400 hover:bg-white/10 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="mt-6 space-y-4 text-xs text-slate-300">
                <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4 flex items-center justify-between">
                  <div>
                    <p className="text-slate-400">CGPA Comparison</p>
                    <p className="text-base font-bold text-white mt-0.5">Your CGPA: 3.75 vs Peer: {benchmarkAlum.cgpa || "3.65"}</p>
                  </div>
                  <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 font-bold text-emerald-300">
                    +0.10 Advantage
                  </span>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950 p-4 space-y-2">
                  <p className="font-bold text-white uppercase tracking-wider text-[11px] text-cyan-400">Skill Gap Recommendation</p>
                  <p className="leading-relaxed">
                    To reach target seniority level equal to {benchmarkAlum.fullName}, focus on adding <strong>Distributed System Design</strong> and <strong>Kubernetes Orchestration</strong> to your CV.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
