"use client";

import React, { useState } from "react";
import { ShieldCheck, Info, CheckCircle2, AlertTriangle, Lock } from "lucide-react";

interface TrustBadgeProps {
  score: number;
  companyName: string;
  isVerified?: boolean;
}

export default function TrustBadge({ score, companyName, isVerified = true }: TrustBadgeProps) {
  const [showModal, setShowModal] = useState(false);

  const getScoreColor = (s: number) => {
    if (s >= 95) return "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
    if (s >= 85) return "text-cyan-400 border-cyan-500/30 bg-cyan-500/10";
    return "text-amber-400 border-amber-500/30 bg-amber-500/10";
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-md transition hover:scale-105 ${getScoreColor(
          score
        )}`}
      >
        <ShieldCheck className="h-3.5 w-3.5" />
        <span>{score}% AI Trust Score</span>
        <Info className="h-3 w-3 opacity-60 hover:opacity-100" />
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-emerald-950/30">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">AI Job Trust & Fraud Audit</h3>
                  <p className="text-xs text-slate-400">{companyName} Listing Verification</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-full bg-white/5 p-2 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-4 text-sm text-slate-300">
              <div className="flex items-center justify-between rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">Legitimacy Rating</p>
                  <p className="text-2xl font-bold text-white mt-1">{score}% Verified Safe</p>
                </div>
                <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Scam Risk: Very Low
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Automated Audit Checks (EMSCAD Model)</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/5 p-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Company domain and registration match official NSU recruiter registry</span>
                  </li>
                  <li className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/5 p-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Salary and requirements within standard industry benchmarks</span>
                  </li>
                  <li className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/5 p-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>No advance fee requests or unverified payment links detected</span>
                  </li>
                  <li className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/5 p-2.5">
                    <Lock className="h-4 w-4 text-cyan-400 shrink-0" />
                    <span>Contact details verified via company official email domain</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-full bg-emerald-400 px-6 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
              >
                Close Audit Report
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
