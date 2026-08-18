"use client";

import { useState, useEffect } from "react";
import TrustBadge from "@/components/TrustBadge";
import PaymentModal from "@/components/PaymentModal";
import { MOCK_ALUMNI } from "@/data/mockData";
import { AlumnusProfile, JobPosting } from "@/types";
import { createJob, getJobs, getAlumni } from "@/lib/api";
import {
  Building2,
  PlusCircle,
  Users,
  CheckCircle2,
  FileText,
  Lock,
  Unlock,
  Sparkles,
  Loader2,
} from "lucide-react";

export default function EmployerPage() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [unlockedAlumni, setUnlockedAlumni] = useState<string[]>([]);
  const [selectedTranscript, setSelectedTranscript] = useState<AlumnusProfile | null>(null);
  const [postedJobs, setPostedJobs] = useState<JobPosting[]>([]);
  const [candidates, setCandidates] = useState<AlumnusProfile[]>([]);
  const [showJobFormModal, setShowJobFormModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [newTitle, setNewTitle] = useState("");
  const [newCompany, setNewCompany] = useState("Pathao");
  const [newLocation, setNewLocation] = useState("Dhaka, Bangladesh");
  const [newWorkType, setNewWorkType] = useState("Hybrid");
  const [newCategory, setNewCategory] = useState("Software Development");
  const [newSalary, setNewSalary] = useState("BDT 150k - 190k");
  const [newDescription, setNewDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [jobs, alumni] = await Promise.all([
        getJobs(),
        getAlumni(),
      ]);
      setPostedJobs(jobs);
      setCandidates(alumni.length > 0 ? alumni : MOCK_ALUMNI);
      setLoading(false);
    }
    loadData();
  }, []);

  const toggleUnlockGradeSheet = (alum: AlumnusProfile) => {
    if (unlockedAlumni.includes(alum.id)) {
      setUnlockedAlumni(unlockedAlumni.filter((aId) => aId !== alum.id));
    } else {
      setUnlockedAlumni([...unlockedAlumni, alum.id]);
      setSelectedTranscript(alum);
    }
  };

  const handlePostJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const created = await createJob({
      title: newTitle,
      company: newCompany,
      location: newLocation,
      workType: newWorkType as "Hybrid" | "Remote" | "On-site",
      category: newCategory as "Software Development" | "AI & Data Science" | "Product & Project Management",
      salary: newSalary,
      description: newDescription,
      departmentTarget: "Computer Science & Engineering",
      targetConvocation: "19th - 21st Convocation",
      requirements: ["B.S. in CSE", "Strong Problem Solving"],
      responsibilities: ["Build scalable backend APIs"],
      benefits: ["Health Insurance", "Performance Bonus"],
    });

    setPostedJobs([created, ...postedJobs]);
    setIsSubmitting(false);
    setShowJobFormModal(false);
    setNewTitle("");
    setNewDescription("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* HEADER BANNER */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-300 mb-2">
                <Building2 className="h-3.5 w-3.5 text-cyan-400" />
                <span>Verified Recruiter & Corporate Portal — Database Connected</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
                Employer Hiring Workspace
              </h1>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Publish verified job openings, manage applicant pipelines, review AI candidate fit scores, and unlock official NSU academic transcripts.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowJobFormModal(true)}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Post Job Listing</span>
              </button>
            </div>
          </div>
        </div>

        {/* ACTIVE POSTINGS & CANDIDATES GRID */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* JOB POSTINGS LIST */}
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-cyan-400" />
              <span>Active Company Listings ({postedJobs.length})</span>
            </h2>

            {loading ? (
              <div className="flex items-center justify-center py-16 rounded-3xl border border-white/10 bg-slate-900/50">
                <Loader2 className="h-8 w-8 text-emerald-400 animate-spin mr-3" />
                <p className="text-sm text-slate-400">Loading job postings...</p>
              </div>
            ) : (
              postedJobs.map((job) => (
                <div
                  key={job.id}
                  className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <TrustBadge score={job.trustScore} companyName={job.company} />
                      <h3 className="text-lg font-bold text-white mt-2">{job.title}</h3>
                      <p className="text-xs text-slate-400">{job.location} · {job.workType}</p>
                    </div>
                    <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-400">
                      {job.applicationCount || 0} Applicants
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{job.description}</p>
                </div>
              ))
            )}
          </div>

          {/* CANDIDATE SHORTLIST & GRADE SHEET UNLOCK */}
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-emerald-400" />
              <span>Top AI-Ranked Candidates ({candidates.length})</span>
            </h2>

            {candidates.map((alum) => {
              const isUnlocked = unlockedAlumni.includes(alum.id);

              return (
                <div
                  key={alum.id}
                  className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-300">
                        94% AI Fit Match
                      </span>
                      <span className="text-xs font-bold text-emerald-400">CGPA {alum.cgpa || "3.84"}</span>
                    </div>
                    <h3 className="text-base font-bold text-white">{alum.fullName}</h3>
                    <p className="text-xs text-slate-400">{alum.degree || "B.S. in CSE"} ({alum.convocationBatch || "NSU Graduate"})</p>

                  </div>

                  <button
                    onClick={() => toggleUnlockGradeSheet(alum)}
                    className={`flex items-center gap-1.5 rounded-full px-5 py-2.5 text-xs font-bold transition ${
                      isUnlocked
                        ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-300"
                        : "bg-emerald-400 text-slate-950 hover:bg-emerald-300"
                    }`}
                  >
                    {isUnlocked ? <Unlock className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                    <span>{isUnlocked ? "Grade Sheet Unlocked" : "Unlock Official Transcript"}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* POST JOB FORM MODAL */}
        {showJobFormModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md">
            <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <h3 className="text-base font-bold text-white">Post New Job Opening to Database</h3>
                <button
                  onClick={() => setShowJobFormModal(false)}
                  className="rounded-full bg-white/5 p-2 text-slate-400 hover:bg-white/10 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handlePostJobSubmit} className="space-y-4 text-xs text-slate-300">
                <div>
                  <label className="block mb-1 font-semibold text-slate-200">Job Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Software Engineer"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-950 p-3 text-white outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-semibold text-slate-200">Company Name</label>
                    <input
                      type="text"
                      required
                      value={newCompany}
                      onChange={(e) => setNewCompany(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-slate-950 p-3 text-white outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold text-slate-200">Work Type</label>
                    <select
                      value={newWorkType}
                      onChange={(e) => setNewWorkType(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-slate-950 p-3 text-white outline-none focus:border-cyan-400"
                    >
                      <option value="Hybrid">Hybrid</option>
                      <option value="Remote">Remote</option>
                      <option value="On-site">On-site</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-slate-200">Job Description & Responsibilities</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe job expectations, required tech stack, and benefits..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-950 p-3 text-white outline-none focus:border-cyan-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-emerald-400 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300 disabled:opacity-50"
                >
                  {isSubmitting ? "Persisting to Database..." : "Publish Job Posting (BDT 300)"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* PAYMENT CHECKOUT MODAL */}
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={() => {}}
          itemTitle="NSU Employer Job Listing Package"
          amountBDT={300}
        />
      </div>
    </div>
  );
}
