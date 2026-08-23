"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import BlockchainVerificationModal from "@/components/BlockchainVerificationModal";
import {
  User,
  Award,
  CheckCircle2,
  FileText,
  Save,
  Sparkles,
  Eye,
  Briefcase,
} from "lucide-react";

export default function ProfilePage() {
  const { user, profile, updateProfile } = useAuth();
  const [formData, setFormData] = useState(profile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange =
    (field: keyof typeof profile) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [field]: event.target.value });
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* EDIT FORM PANEL */}
            <section className="lg:col-span-7 rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300 mb-1">
                    <User className="h-3.5 w-3.5 text-emerald-400" />
                    <span>NSU Verified Alumnus Profile</span>
                  </div>
                  <h1 className="text-2xl font-extrabold text-white">Manage Your Profile</h1>
                </div>

                {savedSuccess && (
                  <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-xs font-bold text-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Saved!
                  </span>
                )}
              </div>

              <form className="space-y-5 text-sm" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Full Name
                    <input
                      value={formData.fullName}
                      onChange={handleChange("fullName")}
                      className="mt-1.5 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400/40"
                    />
                  </label>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Professional Headline
                    <input
                      value={formData.headline}
                      onChange={handleChange("headline")}
                      className="mt-1.5 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400/40"
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Degree Title
                    <input
                      value={formData.degree}
                      onChange={handleChange("degree")}
                      className="mt-1.5 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400/40"
                    />
                  </label>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Academic CGPA
                    <input
                      value={formData.cgpa}
                      onChange={handleChange("cgpa")}
                      className="mt-1.5 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400/40"
                    />
                  </label>
                </div>

                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Core Skills & Technologies (comma separated)
                  <input
                    value={formData.skills}
                    onChange={handleChange("skills")}
                    className="mt-1.5 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400/40"
                  />
                </label>

                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Professional Bio & Summary
                  <textarea
                    value={formData.bio}
                    onChange={handleChange("bio")}
                    rows={4}
                    className="mt-1.5 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400/40"
                  />
                </label>

                <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                  <BlockchainVerificationModal
                    studentName={formData.fullName || profile.fullName}
                    nsuId={user?.nsuId || "1911234042"}
                    degree={formData.degree || profile.degree}
                    cgpa={formData.cgpa || profile.cgpa}
                    batch={profile.batch || "20th Convocation"}
                    hash={`0x${Array.from((formData.fullName || profile.fullName) + (user?.nsuId || "1911234042"))
                      .reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 0x8f7a932b)
                      .toString(16)}e4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e`.slice(0, 42)}
                  />

                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-full bg-emerald-400 px-7 py-3 text-xs font-bold text-slate-950 transition hover:bg-emerald-300 shadow-md shadow-emerald-500/20"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Profile Changes</span>
                  </button>
                </div>
              </form>
            </section>

            {/* LIVE PUBLIC CV PREVIEW CARD */}
            <aside className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl space-y-4">
                <h2 className="text-base font-bold text-white uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Public Alumnus CV Preview
                </h2>

                <div className="rounded-2xl border border-white/10 bg-slate-950/90 p-5 space-y-4 text-xs text-slate-300">
                  <div className="border-b border-white/10 pb-3">
                    <h3 className="text-lg font-bold text-white">{profile.fullName}</h3>
                    <p className="text-cyan-300 font-medium mt-0.5">{profile.headline}</p>
                    <span className="mt-2 inline-block rounded-full bg-emerald-400/10 border border-emerald-400/30 px-3 py-0.5 text-[10px] font-bold text-emerald-300">
                      NSU 20th Convocation Verified
                    </span>
                  </div>

                  <div className="space-y-2">
                    <p><strong className="text-white">Degree:</strong> {profile.degree}</p>
                    <p><strong className="text-white">CGPA:</strong> <span className="text-emerald-400 font-bold">{profile.cgpa} / 4.00</span></p>
                    <p><strong className="text-white">Skills:</strong> {profile.skills}</p>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-white/5 p-3 leading-relaxed">
                    {profile.bio}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
