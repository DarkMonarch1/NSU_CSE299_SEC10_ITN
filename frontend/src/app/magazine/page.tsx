"use client";

import { useState } from "react";
import Link from "next/link";
import PaymentModal from "@/components/PaymentModal";
import { MOCK_MAGAZINE } from "@/data/mockData";
import {
  BookOpen,
  Sparkles,
  TrendingUp,
  Building2,
  Clock,
  User,
  ArrowRight,
  PlusCircle,
} from "lucide-react";

export default function MagazinePage() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const articles = MOCK_MAGAZINE.filter(
    (art) => activeCategory === "All" || art.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* HEADER BANNER */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900 via-pink-950/30 to-slate-900 p-8 shadow-2xl backdrop-blur-xl mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-3.5 py-1 text-xs font-semibold text-pink-300 mb-2">
                <BookOpen className="h-3.5 w-3.5 text-pink-400" />
                <span>Monetization Stream 2 — CareerSetu Sub-site</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
                Career Magazine & Employer Insights
              </h1>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Employer branding stories, tech industry benchmark reports, and career advice tailored for North South University graduates.
              </p>
            </div>

            <button
              onClick={() => setShowPaymentModal(true)}
              className="flex items-center gap-2 rounded-full bg-pink-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-pink-500/25 transition hover:bg-pink-400"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Sponsor an Article (bKash/Nagad)</span>
            </button>
          </div>

          {/* CATEGORY FILTERS */}
          <div className="mt-8 flex flex-wrap gap-2 border-t border-white/10 pt-4">
            {["All", "NSU Success Story", "Tech Trends", "Employer Spotlight"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  activeCategory === cat
                    ? "bg-pink-500 text-white"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ARTICLES GRID */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((art) => (
            <article
              key={art.id}
              className="group rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl transition hover:border-pink-500/40 hover:bg-slate-900 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="rounded-full bg-pink-500/10 border border-pink-500/30 px-3 py-1 text-[11px] font-semibold text-pink-300">
                    {art.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="h-3 w-3" /> {art.readTime}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-white group-hover:text-pink-300 transition leading-snug">
                  {art.title}
                </h2>

                <p className="mt-3 text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {art.excerpt}
                </p>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-pink-400" />
                  <div>
                    <p className="font-semibold text-white">{art.author}</p>
                    <p className="text-[10px] text-slate-400">{art.authorTitle}</p>
                  </div>
                </div>

                <span className="text-pink-400 group-hover:translate-x-1 transition">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* SPONSORED BANNER MODAL (UPDATED FEE: 500 BDT) */}
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={() => {}}
          itemTitle="Career Magazine Sponsored Article Feature"
          amountBDT={500}
        />
      </div>
    </div>
  );
}
