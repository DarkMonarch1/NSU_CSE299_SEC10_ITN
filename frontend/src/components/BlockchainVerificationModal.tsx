"use client";

import React, { useState } from "react";
import { Award, CheckCircle2, ShieldCheck, Copy, ExternalLink, Cpu } from "lucide-react";

interface BlockchainVerificationModalProps {
  studentName: string;
  nsuId: string;
  degree: string;
  cgpa: string;
  batch: string;
  hash: string;
}

export default function BlockchainVerificationModal({
  studentName,
  nsuId,
  degree,
  cgpa,
  batch,
  hash,
}: BlockchainVerificationModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyHash = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-medium text-cyan-300 backdrop-blur-md transition hover:bg-cyan-500/20"
      >
        <Award className="h-4 w-4 text-cyan-400" />
        <span>Verified Credential Ledger</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-cyan-950/40">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
                  <Cpu className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Blockchain Credential Record</h3>
                  <p className="text-xs text-slate-400">NSU Registrar Permissioned Ledger</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-white/5 p-2 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-4 text-sm text-slate-300">
              <div className="flex items-center justify-between rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">Ledger Status</p>
                    <p className="text-sm font-bold text-white">Cryptographically Validated</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Block #1,492,084
                </span>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">Graduate Name</span>
                    <span className="font-semibold text-white">{studentName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">NSU ID</span>
                    <span className="font-semibold text-white">{nsuId}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Degree / Major</span>
                    <span className="font-semibold text-white">{degree}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Academic CGPA</span>
                    <span className="font-semibold text-emerald-400">{cgpa} / 4.00</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 block">Convocation Batch</span>
                    <span className="font-semibold text-cyan-300">{batch}</span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-3">
                  <span className="text-xs text-slate-400 block mb-1">SHA-256 Tamper-Proof Hash</span>
                  <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 text-[11px] font-mono text-cyan-300">
                    <span className="truncate max-w-[280px]">{hash}</span>
                    <button
                      onClick={copyHash}
                      className="ml-2 flex items-center gap-1 text-xs text-slate-300 hover:text-white"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-cyan-500 px-6 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Close Verification
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
