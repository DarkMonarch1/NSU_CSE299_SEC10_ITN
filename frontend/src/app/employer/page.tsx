"use client";

import { useState } from "react";
import TrustBadge from "@/components/TrustBadge";
import PaymentModal from "@/components/PaymentModal";
import { MOCK_JOBS, MOCK_ALUMNI } from "@/data/mockData";
import { AlumniProfile } from "@/types";
import {
  Building2,
  PlusCircle,
  Users,
  CheckCircle2,
  Award,
  FileText,
  Lock,
  Unlock,
  Sparkles,
  ChevronRight,
  TrendingUp,
  BookOpen,
} from "lucide-react";

export default function EmployerPage() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [unlockedAlumni, setUnlockedAlumni] = useState<string[]>(["alum-1"]);
  const [selectedTranscript, setSelectedTranscript] = useState<AlumniProfile | null>(null);

  const toggleUnlockGradeSheet = (alum: AlumniProfile) => {
    if (unlockedAlumni.includes(alum.id)) {
      setUnlockedAlumni(unlockedAlumni.filter((aId) => aId !== alum.id));
    } else {
      setUnlockedAlumni([...unlockedAlumni, alum.id]);
      setSelectedTranscript(alum);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* HEADER BANNER */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-300 mb-2">
                <Building2 className="h-3.5 w-3.5 text-indigo-400" />
                <span>Employer & Recruiter Workspace Portal</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
                ByteScale Labs — Hiring Dashboard
              </h1>
              <p className="text-sm text-slate-300 mt-1">
                Manage verified job listings, inspect AI-ranked candidate shortlists, and unlock official NSU academic transcripts.
              </p>
            </div>

            <button
              onClick={() => setShowPaymentModal(true)}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-indigo-500/25 transition hover:brightness-110"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Post New Job (bKash/Nagad — BDT 300)</span>
            </button>
          </div>
        </div>

        {/* METRICS ROW */}
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 backdrop-blur-xl">
            <p className="text-xs text-slate-400 font-medium">Active Listings</p>
            <p className="mt-2 text-3xl font-bold text-white">4 Live</p>
            <span className="text-[10px] text-emerald-400 font-semibold mt-1 inline-block">
              ✓ All AI Trust Verified
            </span>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 backdrop-blur-xl">
            <p className="text-xs text-slate-400 font-medium">Total NSU Applicants</p>
            <p className="mt-2 text-3xl font-bold text-cyan-400">126 Applicants</p>
            <span className="text-[10px] text-cyan-300 font-semibold mt-1 inline-block">
              19th, 20th & 21st Convocations
            </span>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 backdrop-blur-xl">
            <p className="text-xs text-slate-400 font-medium">Unlocked Academic Records</p>
            <p className="mt-2 text-3xl font-bold text-indigo-400">{unlockedAlumni.length} Granted</p>
            <span className="text-[10px] text-slate-400 mt-1 inline-block">
              Alumnus Consent Unlocked
            </span>
          </div>
        </div>

        {/* AI-RANKED CANDIDATE SHORTLIST TABLE */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl mb-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-cyan-400" />
                AI-Ranked Candidate Shortlist
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Automatically scored and ranked by Content-Based NLP Match Engine
              </p>
            </div>
            <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 text-xs font-semibold text-cyan-300">
              Sorted by Fit Rating %
            </span>
          </div>

          <div className="space-y-4">
            {MOCK_ALUMNI.map((candidate, idx) => {
              const fitScore = 96 - idx * 3;
              const isUnlocked = unlockedAlumni.includes(candidate.id);

              return (
                <div
                  key={candidate.id}
                  className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-950/70 p-5 sm:flex-row sm:items-center sm:justify-between transition hover:border-cyan-500/30"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-500 text-slate-950 font-extrabold text-lg">
                      #{idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white">{candidate.fullName}</h3>
                        <span className="rounded-full bg-emerald-400/10 border border-emerald-400/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
                          {fitScore}% AI Fit
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {candidate.degree} · <strong className="text-cyan-300">CGPA {candidate.cgpa}</strong> ({candidate.convocationBatch})
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {candidate.skills.slice(0, 3).map((skill) => (
                          <span key={skill} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-slate-300">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 sm:justify-end border-t border-white/10 sm:border-t-0 pt-3 sm:pt-0">
                    {isUnlocked ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedTranscript(candidate)}
                          className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-xs font-semibold text-emerald-300 flex items-center gap-1 hover:bg-emerald-500/30"
                        >
                          <Unlock className="h-3.5 w-3.5" /> View Grade Sheet & CV
                        </button>
                        <button
                          onClick={() => toggleUnlockGradeSheet(candidate)}
                          className="text-xs text-slate-400 underline hover:text-white"
                        >
                          Lock
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => toggleUnlockGradeSheet(candidate)}
                        className="flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-500/20"
                      >
                        <Lock className="h-3.5 w-3.5" />
                        <span>Unlock Grade Sheet & CV</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* TRANSCRIPT & GRADE SHEET MODAL */}
        {selectedTranscript && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md">
            <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-indigo-950/50 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">North South University Academic Transcript</h3>
                    <p className="text-xs text-slate-400">Verified Registrar Grade Sheet Record</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTranscript(null)}
                  className="rounded-full bg-white/5 p-2 text-slate-400 hover:bg-white/10 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="mt-6 space-y-4 text-xs text-slate-300">
                <div className="grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-slate-950/80 p-4">
                  <div>
                    <span className="text-slate-400 block">Student Name</span>
                    <span className="font-bold text-white text-sm">{selectedTranscript.fullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">NSU ID</span>
                    <span className="font-bold text-white text-sm">{selectedTranscript.nsuId}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Degree & Major</span>
                    <span className="font-bold text-white">{selectedTranscript.degree}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Cumulative CGPA</span>
                    <span className="font-bold text-emerald-400 text-sm">{selectedTranscript.cgpa} / 4.00</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4 space-y-2">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider text-cyan-400">
                    Core Course Academic Performance
                  </h4>
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-slate-400">
                        <th className="py-2">Course Code</th>
                        <th className="py-2">Title</th>
                        <th className="py-2">Credits</th>
                        <th className="py-2 text-right">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-300">
                      <tr>
                        <td className="py-2 font-mono text-cyan-300">CSE115</td>
                        <td>Programming Language I (C/C++)</td>
                        <td>3.0</td>
                        <td className="py-2 text-right font-bold text-emerald-400">A</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-mono text-cyan-300">CSE215</td>
                        <td>Programming Language II (Java)</td>
                        <td>3.0</td>
                        <td className="py-2 text-right font-bold text-emerald-400">A</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-mono text-cyan-300">CSE225</td>
                        <td>Data Structures & Algorithms</td>
                        <td>3.0</td>
                        <td className="py-2 text-right font-bold text-emerald-400">A-</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-mono text-cyan-300">CSE311</td>
                        <td>Database Management Systems</td>
                        <td>3.0</td>
                        <td className="py-2 text-right font-bold text-emerald-400">A</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-mono text-cyan-300">CSE299</td>
                        <td>Junior Design Project</td>
                        <td>3.0</td>
                        <td className="py-2 text-right font-bold text-emerald-400">A</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-300">
                    SHA-256 Ledger Hash: <code className="font-mono">{selectedTranscript.blockchainCredentialHash.substring(0, 24)}...</code>
                  </span>
                  <span className="rounded-full bg-emerald-400/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
                    Verified Authentic
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedTranscript(null)}
                  className="rounded-full bg-indigo-500 px-6 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-400"
                >
                  Close Transcript
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PAYMENT MODAL INTEGRATION (FEE: 300 BDT) */}
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={() => {}}
          itemTitle="Featured Job Posting (ByteScale Labs)"
          amountBDT={300}
        />
      </div>
    </div>
  );
}
