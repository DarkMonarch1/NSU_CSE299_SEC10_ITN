"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { profile, updateProfile } = useAuth();
  const [formData, setFormData] = useState(profile);

  const handleChange = (field: keyof typeof profile) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateProfile(formData);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_0.45fr]">
            <section className="rounded-[32px] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Alumni profile</p>
              <h1 className="mt-3 text-3xl font-semibold text-white">Edit your profile</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                Update your background, showcase your skills, and preview your public CV before you apply.
              </p>

              <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block text-sm text-slate-300">
                    Full name
                    <input
                      value={formData.fullName}
                      onChange={handleChange("fullName")}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
                    />
                  </label>
                  <label className="block text-sm text-slate-300">
                    Headline
                    <input
                      value={formData.headline}
                      onChange={handleChange("headline")}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
                    />
                  </label>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block text-sm text-slate-300">
                    Degree
                    <input
                      value={formData.degree}
                      onChange={handleChange("degree")}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
                    />
                  </label>
                  <label className="block text-sm text-slate-300">
                    CGPA
                    <input
                      value={formData.cgpa}
                      onChange={handleChange("cgpa")}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
                    />
                  </label>
                </div>

                <label className="block text-sm text-slate-300">
                  Skills
                  <input
                    value={formData.skills}
                    onChange={handleChange("skills")}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
                  />
                </label>

                <label className="block text-sm text-slate-300">
                  Bio
                  <textarea
                    value={formData.bio}
                    onChange={handleChange("bio")}
                    rows={5}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
                  />
                </label>

                <button
                  type="submit"
                  className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
                >
                  Save profile
                </button>
              </form>
            </section>

            <aside className="space-y-6">
              <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">CV preview</p>
                <div className="mt-6 rounded-[24px] border border-white/10 bg-slate-950/90 p-5 text-sm text-slate-300">
                  <h2 className="text-lg font-semibold text-white">{profile.fullName}</h2>
                  <p className="mt-1 text-slate-400">{profile.headline}</p>
                  <div className="mt-4 space-y-2">
                    <p>
                      <strong className="text-slate-100">Degree:</strong> {profile.degree}
                    </p>
                    <p>
                      <strong className="text-slate-100">CGPA:</strong> {profile.cgpa}
                    </p>
                    <p>
                      <strong className="text-slate-100">Skills:</strong> {profile.skills}
                    </p>
                  </div>
                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-300">
                    {profile.bio}
                  </div>
                </div>
              </div>
              <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Snapshot</p>
                <div className="mt-6 grid gap-4 text-sm text-slate-300">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-slate-400">Profile views</p>
                    <p className="mt-2 text-xl font-semibold text-white">1.2k</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-slate-400">Applications sent</p>
                    <p className="mt-2 text-xl font-semibold text-white">18</p>
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
