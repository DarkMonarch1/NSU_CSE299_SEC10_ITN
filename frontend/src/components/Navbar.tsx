"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Briefcase,
  Users,
  Sparkles,
  BookOpen,
  Building2,
  UserCheck,
  LogOut,
  LogIn,
  UserPlus,
  Shield,
  TrendingUp,
} from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-3.5 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 via-cyan-500 to-indigo-500 p-0.5 text-slate-950 font-bold shadow-lg shadow-cyan-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950 text-emerald-400">
              <Shield className="h-5 w-5" />
            </div>
          </div>
          <div>
            <span className="text-lg font-bold tracking-[0.2em] text-white">
              CAREER<span className="text-emerald-400">SETU</span>
            </span>
            <span className="hidden sm:block text-[10px] uppercase tracking-widest text-slate-400 font-medium">
              NSU Alumni – Industry Bridge
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-medium text-slate-300 md:flex">
          <Link
            href="/jobs"
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition ${
              isActive("/jobs")
                ? "bg-white/10 font-semibold text-emerald-400"
                : "hover:bg-white/5 hover:text-white"
            }`}
          >
            <Briefcase className="h-4 w-4" />
            <span>Jobs</span>
          </Link>

          <Link
            href="/alumni"
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition ${
              isActive("/alumni")
                ? "bg-white/10 font-semibold text-emerald-400"
                : "hover:bg-white/5 hover:text-white"
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Alumni Directory</span>
          </Link>

          <Link
            href="/cv-grooming"
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition ${
              isActive("/cv-grooming")
                ? "bg-white/10 font-semibold text-cyan-400"
                : "hover:bg-white/5 hover:text-white"
            }`}
          >
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span>AI CV Grooming</span>
          </Link>

          <Link
            href="/employer"
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition ${
              isActive("/employer")
                ? "bg-white/10 font-semibold text-indigo-400"
                : "hover:bg-white/5 hover:text-white"
            }`}
          >
            <Building2 className="h-4 w-4" />
            <span>Employers</span>
          </Link>

          <Link
            href="/magazine"
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition ${
              isActive("/magazine")
                ? "bg-white/10 font-semibold text-pink-400"
                : "hover:bg-white/5 hover:text-white"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Magazine</span>
          </Link>

          <Link
            href="/insights"
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition ${
              isActive("/insights")
                ? "bg-white/10 font-semibold text-cyan-400"
                : "hover:bg-white/5 hover:text-white"
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            <span>Insights</span>
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2.5 text-sm">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className={`flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-3.5 py-1.5 text-slate-200 transition hover:border-emerald-400/40 ${
                  isActive("/dashboard") ? "border-emerald-500 text-white" : ""
                }`}
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold">
                  {user.name.charAt(0)}
                </div>
                <span className="hidden sm:inline font-medium">{user.name}</span>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 uppercase">
                  {user.role}
                </span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-white/15"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Login</span>
              </Link>
              <Link
                href="/signup"
                className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 py-2 text-xs font-semibold text-slate-950 shadow-md shadow-emerald-500/20 transition hover:brightness-110"
              >
                <UserPlus className="h-3.5 w-3.5" />
                <span>Sign up</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
