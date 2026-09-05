"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import {
  Shield,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  FileText,
  AlertCircle,
  Loader2,
  ArrowLeft,
} from "lucide-react";

interface ProfileEdit {
  id: number;
  userEmail: string;
  editType: string;
  fieldName: string;
  oldValue: string | null;
  newValue: string;
  reason: string | null;
  status: string;
  createdAt: string;
}

export default function AdminModerationPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [edits, setEdits] = useState<ProfileEdit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState<number | null>(null);

  useEffect(() => {
    async function loadPendingEdits() {
      setLoading(true);
      setError(null);
      try {
        const apiBase = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/+$/, "");
        const token = localStorage.getItem("careerSetuToken") || localStorage.getItem("token") || "";
        const response = await fetch(`${apiBase}/admin/moderation/pending-edits`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error("Failed to load pending edits");
        }
        
        const data = await response.json();
        setEdits(data);
      } catch (err: any) {
        console.error("Failed to load pending edits:", err);
        setError("Unable to load pending profile edits from server.");
      } finally {
        setLoading(false);
      }
    }

    if (user?.role === "admin") {
      loadPendingEdits();
    }
  }, [user]);

  const processEdit = async (editId: number, action: "approve" | "reject") => {
    setProcessing(editId);
    try {
      const apiBase = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/+$/, "");
      const token = localStorage.getItem("careerSetuToken") || localStorage.getItem("token") || "";
      const response = await fetch(`${apiBase}/admin/moderation/process-edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          editId: editId,
          action: action,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to process edit");
      }

      // Remove the processed edit from the list
      setEdits((prev) => prev.filter((edit) => edit.id !== editId));
    } catch (err: any) {
      console.error("Failed to process edit:", err);
      setError("Failed to process profile edit. Please try again.");
    } finally {
      setProcessing(null);
    }
  };

  if (!authLoading && user && user.role !== "admin") {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center py-12">
          <div className="rounded-3xl border border-pink-500/30 bg-slate-900/90 p-8 max-w-md text-center">
            <AlertCircle className="h-12 w-12 text-pink-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
            <p className="text-xs text-slate-300 mb-6">
              You must have an administrator account to access the moderation console.
            </p>
            <button
              onClick={() => router.push("/dashboard")}
              className="rounded-full bg-cyan-500 px-6 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-400"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* HEADER BANNER */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl mb-8">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => router.push("/admin")}
                className="flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Admin Console</span>
              </button>
            </div>
            
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300 mb-2">
              <Shield className="h-3.5 w-3.5 text-emerald-400" />
              <span>Profile Moderation Queue — Pending Reviews</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
              Student Profile Edit Moderation
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Review and approve or reject pending profile edit requests from students. Changes are only applied to user profiles upon approval.
            </p>
          </div>

          {error && (
            <div className="mb-8 flex items-center gap-2 rounded-2xl border border-pink-500/30 bg-pink-500/10 p-4 text-xs font-semibold text-pink-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* STATS HEADER */}
          <div className="grid gap-4 sm:grid-cols-3 mb-8">
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Pending Reviews</span>
                <Clock className="h-5 w-5 text-yellow-400" />
              </div>
              <p className="text-3xl font-extrabold text-white mt-2">{edits.length}</p>
              <p className="text-[11px] text-slate-400 mt-1">Awaiting Action</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Total Processed</span>
                <FileText className="h-5 w-5 text-emerald-400" />
              </div>
              <p className="text-3xl font-extrabold text-emerald-400 mt-2">0</p>
              <p className="text-[11px] text-slate-400 mt-1">This Session</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Moderation Rate</span>
                <User className="h-5 w-5 text-cyan-400" />
              </div>
              <p className="text-3xl font-extrabold text-cyan-400 mt-2">100%</p>
              <p className="text-[11px] text-slate-400 mt-1">Response Efficiency</p>
            </div>
          </div>

          {/* MODERATION QUEUE */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">Pending Profile Edit Requests</h2>

            {loading ? (
              <div className="flex items-center justify-center py-16 rounded-3xl border border-white/10 bg-slate-900/50">
                <Loader2 className="h-8 w-8 text-emerald-400 animate-spin mr-3" />
                <p className="text-sm text-slate-400">Loading pending edits from database...</p>
              </div>
            ) : edits.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-8 text-center">
                <Clock className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-base text-slate-300 font-semibold">No pending profile edits to review</p>
                <p className="text-xs text-slate-400 mt-2">All caught up! Check back later for new moderation requests.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {edits.map((edit) => (
                  <div
                    key={edit.id}
                    className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      {/* Edit Details */}
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-sm">
                            {edit.userEmail.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{edit.userEmail}</p>
                            <p className="text-xs text-slate-400">{new Date(edit.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-2">Edit Type</p>
                            <p className="text-sm font-semibold text-white">{edit.editType}</p>
                          </div>
                          <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-2">Field Name</p>
                            <p className="text-sm font-semibold text-white">{edit.fieldName}</p>
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="rounded-2xl border border-pink-500/20 bg-pink-500/5 p-4">
                            <p className="text-[10px] uppercase tracking-wider text-pink-400 font-semibold mb-2">Current Value</p>
                            <p className="text-sm text-slate-300">{edit.oldValue || "Not set"}</p>
                          </div>
                          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                            <p className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold mb-2">Requested Value</p>
                            <p className="text-sm font-semibold text-emerald-300">{edit.newValue}</p>
                          </div>
                        </div>

                        {edit.reason && (
                          <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-2">Reason Provided</p>
                            <p className="text-sm text-slate-300">{edit.reason}</p>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-3 lg:w-48">
                        <button
                          onClick={() => processEdit(edit.id, "approve")}
                          disabled={processing === edit.id}
                          className="flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-3 text-xs font-bold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {processing === edit.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4" />
                          )}
                          <span>Approve</span>
                        </button>
                        
                        <button
                          onClick={() => processEdit(edit.id, "reject")}
                          disabled={processing === edit.id}
                          className="flex items-center justify-center gap-2 rounded-full border border-pink-500/40 bg-pink-500/10 px-4 py-3 text-xs font-bold text-pink-300 transition hover:bg-pink-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {processing === edit.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <XCircle className="h-4 w-4" />
                          )}
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}