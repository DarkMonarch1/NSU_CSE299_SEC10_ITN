"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { MOCK_CV_REPORT } from "@/data/mockData";
import {
  Sparkles,
  FileText,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Download,
  RefreshCw,
  Award,
  BookOpen,
  ArrowRight,
} from "lucide-react";

export default function CVGroomingPage() {
  const { profile } = useAuth();

  const [targetRole, setTargetRole] = useState("Full Stack AI Engineer");
  const [resumeText, setResumeText] = useState(
    `Jihanur Rahman Ratul\nNSU CSE 20th Convocation Graduate | CGPA: 3.84\nSkills: React.js, Next.js, TypeScript, Tailwind CSS, UI/UX Design, REST APIs, Figma\nExperience: Designed user interfaces and micro-frontend components for CareerSetu and ByteScale Labs. Improved page performance by 40%.`
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState(MOCK_CV_REPORT);
  const [activeTab, setActiveTab] = useState<"overview" | "skills" | "actions">("overview");

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setReport({
        ...MOCK_CV_REPORT,
        candidateName: profile.fullName || "Jihanur Rahman Ratul",
        targetRole: targetRole,
      });
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Header Banner */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-300">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                <span>AI CV Grooming Pillar — spaCy NER & Sentence-BERT Engine</span>
              </div>
              <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
                AI Resume Optimizer & Match Benchmarker
              </h1>
              <p className="mt-2 text-sm text-slate-300 max-w-2xl">
                Paste your CV or update your NSU profile to receive instant ATS compatibility feedback, skill keyword gap analysis, and tailored recommendations.
              </p>
            </div>
            <button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:brightness-110 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isAnalyzing ? "animate-spin" : ""}`} />
              <span>{isAnalyzing ? "Analyzing CV..." : "Re-Run AI Grooming"}</span>
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* LEFT: INPUT CONTROL PANEL */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-cyan-400" />
                Target Role & Resume Input
              </h2>

              <div className="mt-4 space-y-4 text-sm">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Select Target Industry Role
                  </label>
                  <select
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-2.5 text-white outline-none focus:border-cyan-400/40"
                  >
                    <option value="Full Stack AI Engineer">Full Stack AI Engineer</option>
                    <option value="AI Product Manager">AI Product Manager</option>
                    <option value="Backend Developer (FastAPI/Node)">Backend Developer (FastAPI/Node)</option>
                    <option value="Data Analyst & Risk Engine">Data Analyst & Risk Engine</option>
                    <option value="DevOps & Security Specialist">DevOps & Security Specialist</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Paste Resume Content / CV Draft
                  </label>
                  <textarea
                    rows={8}
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-xs text-slate-200 outline-none focus:border-cyan-400/40 font-mono leading-relaxed"
                  />
                </div>

                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs text-slate-300 space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>NSU Academic Ledger Connected</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Degree: <strong className="text-white">{profile.degree}</strong> (CGPA: <strong className="text-emerald-400">{profile.cgpa}</strong>)
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleRunAnalysis}
                  disabled={isAnalyzing}
                  className="w-full rounded-full bg-cyan-500 py-3 text-xs font-bold text-slate-950 transition hover:bg-cyan-400"
                >
                  {isAnalyzing ? "Processing NLP Embeddings..." : "Analyze Selected Target Role"}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: AI ANALYSIS DISPLAY REPORT */}
          <div className="lg:col-span-7 space-y-6">
            {/* SCORE SUMMARY CARDS */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 backdrop-blur-xl text-center">
                <p className="text-xs text-slate-400 font-medium">ATS Match Score</p>
                <div className="mt-2 flex items-center justify-center gap-1">
                  <span className="text-4xl font-extrabold text-emerald-400">{report.atsScore}</span>
                  <span className="text-sm text-slate-400 font-bold">/100</span>
                </div>
                <span className="mt-2 inline-block rounded-full bg-emerald-500/10 px-3 py-0.5 text-[10px] font-semibold text-emerald-300 border border-emerald-500/20">
                  {report.overallRating}
                </span>
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 backdrop-blur-xl text-center">
                <p className="text-xs text-slate-400 font-medium">Matched Skills</p>
                <p className="mt-2 text-4xl font-extrabold text-cyan-400">{report.skillsFound.length}</p>
                <span className="mt-2 inline-block text-[10px] text-slate-400">
                  {report.missingSkills.length} Critical Gaps
                </span>
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 backdrop-blur-xl text-center">
                <p className="text-xs text-slate-400 font-medium">Target Fitting</p>
                <p className="mt-2 text-2xl font-bold text-indigo-300 truncate">{report.targetRole}</p>
                <span className="mt-2 inline-block text-[10px] text-cyan-400 font-semibold">
                  spaCy NLP Verified
                </span>
              </div>
            </div>

            {/* TABBED ANALYSIS DETAILS */}
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl">
              <div className="flex border-b border-white/10 pb-4 gap-4">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`text-xs font-semibold transition pb-1 ${
                    activeTab === "overview"
                      ? "text-emerald-400 border-b-2 border-emerald-400"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Strengths & Summary
                </button>
                <button
                  onClick={() => setActiveTab("skills")}
                  className={`text-xs font-semibold transition pb-1 ${
                    activeTab === "skills"
                      ? "text-cyan-400 border-b-2 border-cyan-400"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Skill Gap & Keywords
                </button>
                <button
                  onClick={() => setActiveTab("actions")}
                  className={`text-xs font-semibold transition pb-1 ${
                    activeTab === "actions"
                      ? "text-indigo-400 border-b-2 border-indigo-400"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Actionable Tips ({report.actionItems.length})
                </button>
              </div>

              <div className="mt-6 text-sm text-slate-300">
                {activeTab === "overview" && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider text-emerald-400">
                      Key Strengths Detected
                    </h3>
                    <ul className="space-y-3">
                      {report.strengths.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/5 p-3.5">
                          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-xs leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === "skills" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                        Extracted Skills Found in Resume
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {report.skillsFound.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300"
                          >
                            ✓ {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                        Missing Skill Gaps for {report.targetRole}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {report.missingSkills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300"
                          >
                            ! {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                        Recommended ATS Keywords to Add
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {report.suggestedKeywords.map((kw) => (
                          <span
                            key={kw}
                            className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300"
                          >
                            + {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "actions" && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">
                      Recommended CV Improvements
                    </h3>
                    <ul className="space-y-3">
                      {report.actionItems.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/5 p-3.5">
                          <AlertCircle className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                          <span className="text-xs leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
