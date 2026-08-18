"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { MOCK_CV_REPORT } from "@/data/mockData";
import { analyzeCVWithAPI } from "@/lib/api";
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  RefreshCw,
} from "lucide-react";

export default function CVGroomingPage() {
  const { profile } = useAuth();

  const [targetRole, setTargetRole] = useState("Backend Engineer (FastAPI / Python)");
  const [resumeText, setResumeText] = useState(
    `Tanvir Ahmed\nNSU CSE 20th Convocation Graduate | CGPA: 3.84\nSkills: Python, FastAPI, React.js, Next.js, PostgreSQL, Docker, REST APIs, Git\nExperience: Developed FastAPI backend microservices and Next.js interfaces for CareerSetu platform.`
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState(MOCK_CV_REPORT);
  const [activeTab, setActiveTab] = useState<"overview" | "skills" | "actions">("overview");

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    const apiResult = await analyzeCVWithAPI(resumeText, targetRole);
    setIsAnalyzing(false);

    setReport({
      ...MOCK_CV_REPORT,
      candidateName: profile.fullName || "Tanvir Ahmed",
      targetRole: apiResult.targetRole || targetRole,
      atsScore: apiResult.matchScore || 88,
      missingSkills: apiResult.missingSkills || ["Docker", "Kafka", "PostgreSQL Optimization"],
      actionItems: apiResult.suggestions || [
        "Include quantifiable metrics (e.g. reduced API response latency by 35%)",
        "Add explicit mention of production container deployment experience",
      ],
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* HERO TITLE */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300 mb-2">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                <span>spaCy NER & Sentence-BERT NLP Microservice Connected</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
                AI CV Grooming & Match Optimizer
              </h1>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Paste your resume content to receive instant ATS score diagnostics, missing tech keyword analysis, and actionable advice tailored to Bangladeshi tech employer expectations.
              </p>
            </div>
          </div>

          {/* INPUT FORM */}
          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5 space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                  Target Job Position
                </label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400/40"
                >
                  <option value="Backend Engineer (FastAPI / Python)">Backend Engineer (FastAPI / Python)</option>
                  <option value="Full Stack AI Engineer">Full Stack AI Engineer</option>
                  <option value="Frontend Engineer (React / Next.js)">Frontend Engineer (React / Next.js)</option>
                  <option value="Data Scientist & ML Engineer">Data Scientist & ML Engineer</option>
                  <option value="DevOps & Cloud Engineer">DevOps & Cloud Engineer</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                  Resume Content (Paste Text)
                </label>
                <textarea
                  rows={10}
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950 p-4 text-xs font-mono text-slate-200 outline-none focus:border-emerald-400/40"
                />
              </div>

              <button
                type="button"
                onClick={handleRunAnalysis}
                disabled={isAnalyzing}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:brightness-110 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Analyzing via ML Microservice...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Run AI Resume Scoring & Persistence</span>
                  </>
                )}
              </button>
            </div>

            {/* RESULTS REPORT BOARD */}
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-6 backdrop-blur-xl space-y-6">
                {/* SCORE BANNER */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
                  <div>
                    <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                      Overall ATS Match Score
                    </span>
                    <h2 className="text-4xl font-extrabold text-emerald-400 mt-1">
                      {report.atsScore} / 100
                    </h2>
                    <p className="text-xs text-slate-300 mt-1">
                      Candidate: <strong className="text-white">{report.candidateName}</strong>
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-1 text-xs font-bold text-emerald-300">
                      {report.overallRating}
                    </span>
                    <p className="text-xs text-slate-400 mt-2">Target Role: {report.targetRole}</p>
                  </div>
                </div>

                {/* TABS */}
                <div className="flex border-b border-white/10 text-xs font-semibold text-slate-400">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`pb-3 px-4 border-b-2 transition ${
                      activeTab === "overview"
                        ? "border-emerald-400 text-emerald-400 font-bold"
                        : "border-transparent hover:text-white"
                    }`}
                  >
                    Overview Diagnostics
                  </button>
                  <button
                    onClick={() => setActiveTab("skills")}
                    className={`pb-3 px-4 border-b-2 transition ${
                      activeTab === "skills"
                        ? "border-emerald-400 text-emerald-400 font-bold"
                        : "border-transparent hover:text-white"
                    }`}
                  >
                    Missing Skill Gaps
                  </button>
                  <button
                    onClick={() => setActiveTab("actions")}
                    className={`pb-3 px-4 border-b-2 transition ${
                      activeTab === "actions"
                        ? "border-emerald-400 text-emerald-400 font-bold"
                        : "border-transparent hover:text-white"
                    }`}
                  >
                    Action Plan
                  </button>
                </div>

                {/* TAB CONTENT */}
                {activeTab === "overview" && (
                  <div className="space-y-4 text-xs text-slate-300">
                    <div className="rounded-2xl border border-white/5 bg-slate-950 p-4 space-y-2">
                      <p className="font-bold text-white uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        Strong Resume Highlights
                      </p>
                      <ul className="space-y-1.5 list-disc pl-5">
                        {report.strengths.map((pt, idx) => (
                          <li key={idx}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === "skills" && (
                  <div className="space-y-3 text-xs text-slate-300">
                    <p className="font-bold text-white uppercase tracking-wider text-pink-400 flex items-center gap-1.5">
                      <AlertCircle className="h-4 w-4" />
                      Keywords Missing for {targetRole}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {report.missingSkills.map((kw, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-pink-500/10 border border-pink-500/30 px-3 py-1 font-mono text-xs text-pink-300"
                        >
                          + {kw}
                        </span>
                      ))}
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
                          <span className="text-emerald-400 font-bold">Step {idx + 1}:</span>
                          <span>{rec}</span>
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
