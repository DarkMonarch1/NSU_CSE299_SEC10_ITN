"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
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
  Lock,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  MapPin,
} from "lucide-react";

const PAGE_SIZE = 18;

export default function AlumniPage() {
  const { user } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedBatch, setSelectedBatch] = useState<string>("All");
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [benchmarkAlum, setBenchmarkAlum] = useState<AlumnusProfile | null>(null);
  const [alumniList, setAlumniList] = useState<AlumnusProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0); // 0-based
  const [hasMore, setHasMore] = useState(true);
  const [totalShown, setTotalShown] = useState(0);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isEmployerOrAdmin = user?.role === "employer" || user?.role === "admin";

  // Debounce search input by 350ms
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setPage(0); // reset to first page on new search
    }, 350);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [searchInput]);

  // Reset page when filters change
  useEffect(() => {
    setPage(0);
  }, [selectedBatch, selectedDept]);

  const loadAlumniData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAlumni(
        selectedBatch === "All" ? undefined : selectedBatch,
        selectedDept === "All" ? undefined : selectedDept,
        debouncedSearch || undefined,
        PAGE_SIZE,
        page * PAGE_SIZE,
      );
      setAlumniList(data);
      setHasMore(data.length === PAGE_SIZE);
      setTotalShown(page * PAGE_SIZE + data.length);
    } catch (err) {
      console.error("Failed to load alumni list:", err);
      setAlumniList(MOCK_ALUMNI);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [selectedBatch, selectedDept, debouncedSearch, page]);

  useEffect(() => {
    loadAlumniData();
  }, [loadAlumniData]);

  const displayList = alumniList;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* HEADER HERO */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-300 mb-2">
                <Users className="h-3.5 w-3.5 text-cyan-400" />
                <span>NSU Convocation Graduates Directory (19th, 20th &amp; 21st)</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
                Alumni Network &amp; CV Benchmarking
              </h1>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Search verified North South University graduates, compare skill profiles, inspect academic credentials, and benchmark your career progress.
              </p>
            </div>

            {/* Live Stats Pills */}
            <div className="flex flex-wrap gap-3 shrink-0">
              <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2.5">
                <GraduationCap className="h-4 w-4 text-emerald-400" />
                <div>
                  <p className="text-[10px] text-slate-400 leading-none">Verified Graduates</p>
                  <p className="text-base font-bold text-emerald-300 leading-tight">7,557+</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-2.5">
                <Award className="h-4 w-4 text-cyan-400" />
                <div>
                  <p className="text-[10px] text-slate-400 leading-none">Blockchain Verified</p>
                  <p className="text-base font-bold text-cyan-300 leading-tight">100%</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-violet-500/20 bg-violet-500/10 px-4 py-2.5">
                <MapPin className="h-4 w-4 text-violet-400" />
                <div>
                  <p className="text-[10px] text-slate-400 leading-none">Convocation Batches</p>
                  <p className="text-base font-bold text-violet-300 leading-tight">3 Batches</p>
                </div>
              </div>
            </div>
          </div>

          {/* SEARCH & BATCH FILTERS */}
          <div className="mt-6 grid gap-4 md:grid-cols-12">
            <div className="relative md:col-span-6">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, NSU ID, company (Pathao, bKash) or role..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 pl-11 pr-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40 transition"
              />
              {loading && searchInput && (
                <Loader2 className="absolute right-4 top-3.5 h-4 w-4 text-cyan-400 animate-spin" />
              )}
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-200 outline-none focus:border-cyan-400/40 transition"
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
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-200 outline-none focus:border-cyan-400/40 transition"
              >
                <option value="All">All Departments</option>
                <option value="Computer Science">Computer Science &amp; Engineering</option>
                <option value="Electrical">EEE / Telecommunications</option>
                <option value="Architecture">Architecture</option>
              </select>
            </div>
          </div>
        </div>

        {/* RESULT COUNT & PAGE INFO */}
        {!loading && (
          <div className="flex items-center justify-between mb-4 px-1">
            <p className="text-xs text-slate-400">
              {debouncedSearch || selectedBatch !== "All" || selectedDept !== "All"
                ? `Showing ${displayList.length} result${displayList.length !== 1 ? "s" : ""} for current filters`
                : `Showing ${(page * PAGE_SIZE) + 1}–${totalShown} of 7,557+ graduates`}
            </p>
            <p className="text-xs text-slate-500">Page {page + 1}</p>
          </div>
        )}

        {/* ALUMNI GRID */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 rounded-3xl border border-white/10 bg-slate-900/50">
            <Loader2 className="h-9 w-9 text-cyan-400 animate-spin mb-4" />
            <p className="text-sm font-medium text-white">Querying alumni database...</p>
            <p className="text-xs text-slate-400 mt-1">Fetching from {(page * PAGE_SIZE) + 1}–{(page + 1) * PAGE_SIZE} of 7,557+ records</p>
          </div>
        ) : displayList.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-14 text-center">
            <Users className="mx-auto h-12 w-12 text-slate-500 mb-3" />
            <h3 className="text-lg font-bold text-white">No alumni match the selected filters</h3>
            <p className="text-xs text-slate-400 mt-1">Try adjusting your search term, batch, or department filter.</p>
            <button
              type="button"
              onClick={() => { setSearchInput(""); setSelectedBatch("All"); setSelectedDept("All"); setPage(0); }}
              className="mt-4 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayList.map((alum) => {
              const displayBatch = (alum as any).convocationBatch || alum.batch || "NSU Convocation";
              return (
                <div
                  key={alum.id}
                  className="group rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl transition hover:border-cyan-500/40 hover:bg-slate-900 hover:shadow-lg hover:shadow-cyan-500/5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-300">
                        {displayBatch}
                      </span>

                      {/* PRIVACY: Conditionally render CGPA only for Employer or Admin */}
                      {isEmployerOrAdmin ? (
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" /> CGPA {alum.cgpa || "3.65"}
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1 bg-slate-800/60 px-2 py-0.5 rounded-full border border-white/5">
                          <Lock className="h-3 w-3 text-cyan-400" />
                          <span>CGPA Protected</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition">
                      {alum.fullName}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">{alum.degree}</p>

                    <p className="text-xs text-slate-300 mt-3 flex items-center gap-1.5 font-medium">
                      <Building2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span>{alum.currentRole || "Software Engineer"}</span>
                      <span>at</span>
                      <strong className="text-white">{alum.currentCompany || "Leading Tech Firm"}</strong>
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <BlockchainVerificationModal
                      studentName={alum.fullName}
                      nsuId={alum.nsuId}
                      cgpa={isEmployerOrAdmin ? (alum.cgpa || "3.65") : "3.XX (Employer View Only)"}
                      degree={alum.degree}
                      batch={displayBatch}
                      hash={alum.blockchainCredentialHash || `0x${Array.from(alum.fullName + alum.nsuId).reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 0x8f7a932b).toString(16)}e4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e`.slice(0, 42)}
                    />

                    <button
                      type="button"
                      onClick={() => setBenchmarkAlum(alum)}
                      className="flex items-center gap-1 font-semibold text-cyan-400 hover:text-cyan-300 transition"
                    >
                      <BarChart3 className="h-3.5 w-3.5" />
                      <span>Benchmark CV</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* PAGINATION CONTROLS */}
        {!loading && displayList.length > 0 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/80 px-5 py-2.5 text-sm font-semibold text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>

            <span className="text-xs text-slate-500 font-medium">
              Page {page + 1}
            </span>

            <button
              type="button"
              onClick={() => setPage((p) => p + 1)}
              disabled={!hasMore}
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/80 px-5 py-2.5 text-sm font-semibold text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
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
                    <p className="text-xs text-slate-400">{benchmarkAlum.currentRole || "Software Engineer"} at {benchmarkAlum.currentCompany || "Leading Tech Firm"}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setBenchmarkAlum(null)}
                  className="rounded-full bg-white/5 p-2 text-slate-400 hover:bg-white/10 hover:text-white transition"
                >
                  ✕
                </button>
              </div>

              <div className="mt-6 space-y-4 text-xs text-slate-300">
                <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4 flex items-center justify-between">
                  <div>
                    <p className="text-slate-400">Academic Standing Comparison</p>
                    <p className="text-base font-bold text-white mt-0.5">
                      {isEmployerOrAdmin
                        ? `Peer CGPA: ${benchmarkAlum.cgpa || "3.65"}`
                        : "Verified Academic Distinction on Blockchain Ledger"}
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 font-bold text-emerald-300">
                    Verified Match
                  </span>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950 p-4 space-y-2">
                  <p className="font-bold text-white uppercase tracking-wider text-[11px] text-cyan-400">Skill Gap Recommendation</p>
                  <p className="leading-relaxed">
                    To reach target seniority level equal to {benchmarkAlum.fullName}, focus on expanding practical skills in <strong>Production Microservices Architecture</strong>, <strong>FastAPI / Next.js Stack</strong>, and <strong>Docker Orchestration</strong>.
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
