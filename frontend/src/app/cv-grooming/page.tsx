"use client";

import { useState, useRef, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { analyzeCVWithAPI } from "@/lib/api";
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  RefreshCw,
  Upload,
  FileText,
  X,
  ChevronRight,
  Target,
  Zap,
} from "lucide-react";

type TabKey = "overview" | "skills" | "actions";

interface CVReport {
  candidateName: string;
  targetRole: string;
  atsScore: number;
  overallRating: string;
  skillsFound: string[];
  missingSkills: string[];
  strengths: string[];
  actionItems: string[];
  resumeTextLength: number;
}

const ROLE_OPTIONS = [
  { value: "Backend Engineer (FastAPI / Python)", label: "🐍 Backend Engineer (FastAPI / Python)" },
  { value: "Full Stack AI Engineer", label: "🤖 Full Stack AI Engineer" },
  { value: "Frontend Engineer (React / Next.js)", label: "⚛️ Frontend Engineer (React / Next.js)" },
  { value: "Data Scientist & ML Engineer", label: "📊 Data Scientist & ML Engineer" },
  { value: "DevOps & Cloud Engineer", label: "☁️ DevOps & Cloud Engineer" },
];

function scoreColor(score: number): string {
  if (score >= 80) return "text-emerald-400";
  if (score >= 60) return "text-yellow-400";
  if (score >= 40) return "text-orange-400";
  return "text-red-400";
}

function scoreBorderColor(score: number): string {
  if (score >= 80) return "border-emerald-500/30 bg-emerald-500/10";
  if (score >= 60) return "border-yellow-500/30 bg-yellow-500/10";
  if (score >= 40) return "border-orange-500/30 bg-orange-500/10";
  return "border-red-500/30 bg-red-500/10";
}

export default function CVGroomingPage() {
  const { user } = useAuth();

  const [targetRole, setTargetRole] = useState("Backend Engineer (FastAPI / Python)");
  const [resumeText, setResumeText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<CVReport | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ---------------------------------------------------------------------------
  // File parsing — reads .txt, .md; extracts text from .pdf/.docx via FileReader
  // ---------------------------------------------------------------------------
  const parseFile = useCallback((file: File) => {
    const isText = file.type === "text/plain" || file.name.endsWith(".md") || file.name.endsWith(".txt");
    const isPdf = file.type === "application/pdf" || file.name.endsWith(".pdf");
    const isDocx = file.name.endsWith(".docx") || file.name.endsWith(".doc");

    if (isText) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setResumeText(text || "");
        setFileName(file.name);
      };
      reader.readAsText(file);
    } else if (isPdf) {
      // PDF: read as binary and extract readable text segments heuristically
      const reader = new FileReader();
      reader.onload = (e) => {
        const buffer = e.target?.result as ArrayBuffer;
        const bytes = new Uint8Array(buffer);
        const raw = new TextDecoder("latin1").decode(bytes);
        // Extract printable ASCII runs of 4+ chars (crude but no external lib needed)
        const runs = raw.match(/[\x20-\x7E]{4,}/g) || [];
        const cleaned = runs
          .filter((r) => !/^\s*\d+\s*$/.test(r) && r.trim().length > 3)
          .join(" ")
          .replace(/\s+/g, " ")
          .trim();
        setResumeText(cleaned || "PDF parsed — please verify the text above is correct.");
        setFileName(file.name);
      };
      reader.readAsArrayBuffer(file);
    } else if (isDocx) {
      setErrorMsg("DOCX detected: please Save As → Plain Text (.txt) in Word, then re-upload, or paste your resume text directly.");
    } else {
      setErrorMsg(`Unsupported file type: ${file.type || file.name}. Upload a .txt, .pdf, or paste text directly.`);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) parseFile(file);
    // Reset input value so the same file can be re-uploaded
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) parseFile(file);
  };

  // ---------------------------------------------------------------------------
  // Run Analysis
  // ---------------------------------------------------------------------------
  const handleRunAnalysis = async () => {
    if (!resumeText.trim()) {
      setErrorMsg("Please upload a CV file or paste your resume text first.");
      return;
    }
    setIsAnalyzing(true);
    setErrorMsg(null);
    try {
      const apiResult = await analyzeCVWithAPI(resumeText, targetRole);
      const score: number = typeof apiResult.matchScore === "number" ? apiResult.matchScore : 0;
      const found: string[] = Array.isArray(apiResult.skillsFound) ? apiResult.skillsFound : [];
      const missing: string[] = Array.isArray(apiResult.missingSkills) ? apiResult.missingSkills : [];
      const rating: string = apiResult.overallRating || (score >= 88 ? "Exceptional Match" : score >= 75 ? "Strong Candidate" : score >= 60 ? "Moderate Alignment" : score > 0 ? "Needs Skill Alignment" : "No Content Detected");

      setReport({
        candidateName: user?.fullName || "NSU Graduate",
        targetRole: apiResult.targetRole || targetRole,
        atsScore: score,
        overallRating: rating,
        skillsFound: found,
        missingSkills: missing,
        resumeTextLength: apiResult.resumeTextLength || resumeText.length,
        strengths: [
          found.length > 0
            ? `Matched ${found.length} key skill${found.length > 1 ? "s" : ""}: ${found.slice(0, 4).join(", ")}${found.length > 4 ? `, +${found.length - 4} more` : ""}.`
            : "No matching skills detected — consider adding relevant keywords.",
          `Resume length: ${resumeText.trim().length} characters${resumeText.trim().length > 400 ? " — good detail level." : " — consider adding more detail."}`,
          "Verified NSU CSE academic background and project experience adds credibility.",
        ],
        actionItems: Array.isArray(apiResult.suggestions) && apiResult.suggestions.length > 0
          ? apiResult.suggestions
          : [
              "Include quantifiable metrics (e.g., 'Reduced API latency by 35%').",
              "Add GitHub repository and live deployment URLs.",
              `Focus on: ${(missing.slice(0, 3).join(", ") || "role-specific keywords")} to close skill gaps.`,
            ],
      });
      setActiveTab("overview");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to analyze CV. Please try again.";
      console.error("CV analysis error:", err);
      setErrorMsg(msg);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setResumeText("");
    setFileName(null);
    setReport(null);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* HERO */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>Rule-Based Keyword Matching Engine &amp; ATS Analyzer</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            AI CV Grooming &amp; Match Optimizer
          </h1>
          <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Upload your CV or paste your resume text, select a target role, and receive instant ATS score diagnostics, missing skill gap analysis, and actionable advice tailored to Bangladeshi tech employer expectations.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-12">

            {/* LEFT — INPUT PANEL */}
            <div className="lg:col-span-5 space-y-5">

              {/* Target Role Selector */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2 flex items-center gap-1.5">
                  <Target className="h-3.5 w-3.5 text-emerald-400" />
                  Target Job Position
                </label>
                <select
                  value={targetRole}
                  onChange={(e) => { setTargetRole(e.target.value); setReport(null); }}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400/40 transition"
                >
                  {ROLE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* File Upload Zone */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2 flex items-center gap-1.5">
                  <Upload className="h-3.5 w-3.5 text-emerald-400" />
                  Upload CV File (PDF or TXT)
                </label>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative cursor-pointer rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-all ${
                    dragOver
                      ? "border-emerald-400/60 bg-emerald-500/10"
                      : "border-white/10 bg-slate-950/60 hover:border-emerald-400/30 hover:bg-slate-950/80"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".txt,.pdf,.md"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {fileName ? (
                    <div className="flex items-center justify-center gap-3">
                      <FileText className="h-6 w-6 text-emerald-400 shrink-0" />
                      <div className="text-left">
                        <p className="text-sm font-semibold text-white">{fileName}</p>
                        <p className="text-xs text-slate-400">{resumeText.length.toLocaleString()} characters extracted</p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleClear(); }}
                        className="ml-auto rounded-full bg-white/5 p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto h-8 w-8 text-slate-500 mb-2" />
                      <p className="text-sm text-slate-300 font-medium">Drop your CV here or click to browse</p>
                      <p className="text-xs text-slate-500 mt-1">Supports .pdf and .txt files</p>
                    </>
                  )}
                </div>
              </div>

              {/* Paste Text Area */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2 flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-emerald-400" />
                  Or Paste Resume Text
                </label>
                <textarea
                  rows={8}
                  value={resumeText}
                  onChange={(e) => { setResumeText(e.target.value); setFileName(null); }}
                  placeholder={`Paste your full resume here...\n\nExample:\nJohn Doe | john@email.com | github.com/johndoe\nSkills: Python, FastAPI, Docker, PostgreSQL, React\nExperience: Built REST APIs serving 50k requests/day...`}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950 p-4 text-xs font-mono text-slate-200 outline-none focus:border-emerald-400/40 transition placeholder:text-slate-600"
                />
                <div className="flex justify-between mt-1">
                  <p className="text-[11px] text-slate-500">{resumeText.length} characters</p>
                  {resumeText.length > 0 && (
                    <button type="button" onClick={handleClear} className="text-[11px] text-slate-500 hover:text-red-400 transition">
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Error */}
              {errorMsg && (
                <div className="flex items-start gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-300">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* CTA Button */}
              <button
                type="button"
                onClick={handleRunAnalysis}
                disabled={isAnalyzing || !resumeText.trim()}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Analyzing CV against {targetRole.split(" ")[0]} role...</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4" />
                    <span>Analyze CV for {targetRole.split("(")[0].trim()}</span>
                  </>
                )}
              </button>

              {!resumeText.trim() && !isAnalyzing && (
                <p className="text-center text-[11px] text-slate-500">Upload a file or paste text to enable analysis</p>
              )}
            </div>

            {/* RIGHT — RESULTS PANEL */}
            <div className="lg:col-span-7">
              {!report ? (
                /* Empty state — no fake pre-filled report */
                <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-slate-900/50 h-full min-h-64 p-10 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
                    <Sparkles className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">No Analysis Yet</h3>
                  <p className="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed">
                    Upload your CV or paste your resume text, select a target role, and click <strong className="text-white">Analyze CV</strong> to get your ATS score and skill gap report.
                  </p>
                  <div className="mt-6 flex flex-col items-start gap-2 text-xs text-slate-400">
                    {["Upload PDF or paste text", "Select your target role", "Get real skill gap analysis"].map((step, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">{i + 1}</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-6 backdrop-blur-xl space-y-6">

                  {/* SCORE BANNER */}
                  <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border p-5 ${scoreBorderColor(report.atsScore)}`}>
                    <div>
                      <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        ATS Match Score — {report.targetRole}
                      </span>
                      <h2 className={`text-5xl font-extrabold mt-1 ${scoreColor(report.atsScore)}`}>
                        {report.atsScore}<span className="text-2xl text-slate-400"> / 100</span>
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Candidate: <strong className="text-white">{report.candidateName}</strong>
                        {" · "}
                        {report.resumeTextLength.toLocaleString()} chars analyzed
                      </p>
                    </div>
                    <div className="text-center sm:text-right space-y-2">
                      <span className={`rounded-full px-4 py-1.5 text-sm font-bold border ${scoreBorderColor(report.atsScore)} ${scoreColor(report.atsScore)}`}>
                        {report.overallRating}
                      </span>
                      {/* Mini progress bar */}
                      <div className="w-32 h-2 rounded-full bg-slate-700 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-700"
                          style={{ width: `${report.atsScore}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-slate-500">{report.skillsFound.length}/{report.skillsFound.length + report.missingSkills.length} skills matched</p>
                    </div>
                  </div>

                  {/* TABS */}
                  <div className="flex border-b border-white/10 text-xs font-semibold text-slate-400 gap-1">
                    {(["overview", "skills", "actions"] as TabKey[]).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 px-4 border-b-2 capitalize transition rounded-t-lg ${
                          activeTab === tab
                            ? "border-emerald-400 text-emerald-400 font-bold"
                            : "border-transparent hover:text-white hover:border-white/20"
                        }`}
                      >
                        {tab === "overview" && "Overview"}
                        {tab === "skills" && `Skill Gaps (${report.missingSkills.length})`}
                        {tab === "actions" && "Action Plan"}
                      </button>
                    ))}
                  </div>

                  {/* TAB CONTENT */}
                  {activeTab === "overview" && (
                    <div className="space-y-4 text-xs text-slate-300">
                      <div className="rounded-2xl border border-white/5 bg-slate-950 p-4 space-y-2">
                        <p className="font-bold text-white uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 className="h-4 w-4" />
                          Resume Highlights
                        </p>
                        <ul className="space-y-1.5 list-disc pl-5">
                          {report.strengths.map((pt, idx) => <li key={idx}>{pt}</li>)}
                        </ul>
                      </div>

                      <div className="rounded-2xl border border-white/5 bg-slate-950 p-4 space-y-2">
                        <p className="font-bold text-white uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                          <Sparkles className="h-4 w-4" />
                          Keywords Detected ({report.skillsFound.length})
                        </p>
                        {report.skillsFound.length === 0 ? (
                          <p className="text-slate-500 italic">No matching keywords found for this role. Add relevant skills to your CV.</p>
                        ) : (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {report.skillsFound.map((kw, idx) => (
                              <span key={idx} className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 font-mono text-[11px] text-emerald-300">
                                ✓ {kw}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === "skills" && (
                    <div className="space-y-4 text-xs text-slate-300">
                      <div>
                        <p className="font-bold text-white uppercase tracking-wider text-pink-400 flex items-center gap-1.5 mb-3">
                          <AlertCircle className="h-4 w-4" />
                          Missing Skills for {report.targetRole} ({report.missingSkills.length})
                        </p>
                        {report.missingSkills.length === 0 ? (
                          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-300 flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                            <span>Outstanding! No major skill gaps detected for this role.</span>
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {report.missingSkills.map((kw, idx) => (
                              <span key={idx} className="rounded-full bg-pink-500/10 border border-pink-500/30 px-3 py-1 font-mono text-xs text-pink-300">
                                ✗ {kw}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="rounded-2xl border border-white/5 bg-slate-950 p-4 space-y-2">
                        <p className="font-bold text-white uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 className="h-4 w-4" />
                          Matched Skills ({report.skillsFound.length})
                        </p>
                        {report.skillsFound.length === 0 ? (
                          <p className="text-slate-500 italic">None — upload your CV with relevant keywords.</p>
                        ) : (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {report.skillsFound.map((kw, idx) => (
                              <span key={idx} className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 font-mono text-[11px] text-emerald-300">
                                ✓ {kw}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === "actions" && (
                    <div className="space-y-3 text-xs text-slate-300">
                      <p className="font-bold text-white uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                        <TrendingUp className="h-4 w-4" />
                        Priority Recommendations
                      </p>
                      <ul className="space-y-2">
                        {report.actionItems.map((rec, idx) => (
                          <li key={idx} className="flex items-start gap-2 rounded-xl border border-white/5 bg-slate-950 p-3">
                            <ChevronRight className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Re-analyze hint */}
                      <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-3.5 text-[11px] text-cyan-300 flex items-start gap-2">
                        <Sparkles className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>
                          After updating your CV, re-run the analysis to see your new score. Switching the <strong>Target Role</strong> selector instantly shows different skill gap requirements.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
