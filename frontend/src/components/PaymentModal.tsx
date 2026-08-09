"use client";

import React, { useState } from "react";
import { CreditCard, CheckCircle, Sparkles, Building2, Lock } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  itemTitle: string;
  amountBDT: number;
}

export default function PaymentModal({
  isOpen,
  onClose,
  onSuccess,
  itemTitle,
  amountBDT,
}: PaymentModalProps) {
  const [method, setMethod] = useState<"bkash" | "nagad" | "card">("bkash");
  const [phone, setPhone] = useState("");
  const [trxId, setTrxId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onSuccess();
        setIsSuccess(false);
        onClose();
      }, 1800);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-pink-950/20">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/20 text-pink-400">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">CareerSetu Checkout</h3>
              <p className="text-xs text-slate-400">Monetization Gateway</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-white/5 p-2 text-slate-400 hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h4 className="text-xl font-bold text-white">Payment Confirmed!</h4>
            <p className="text-xs text-slate-300">
              Your posting "{itemTitle}" has been verified and published live with AI Trust Score badge.
            </p>
          </div>
        ) : (
          <form onSubmit={handlePaymentSubmit} className="mt-6 space-y-4 text-sm text-slate-300">
            <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Service Selection</p>
                  <p className="font-semibold text-white mt-0.5">{itemTitle}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Total Fee</p>
                  <p className="text-lg font-bold text-emerald-400">BDT {amountBDT.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                Select Local Payment Gateway
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setMethod("bkash")}
                  className={`rounded-2xl border p-3 text-center transition ${
                    method === "bkash"
                      ? "border-pink-500 bg-pink-500/10 text-pink-400 font-bold"
                      : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  <span className="block text-sm">bKash</span>
                  <span className="text-[10px] opacity-75">Mobile Wallet</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMethod("nagad")}
                  className={`rounded-2xl border p-3 text-center transition ${
                    method === "nagad"
                      ? "border-orange-500 bg-orange-500/10 text-orange-400 font-bold"
                      : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  <span className="block text-sm">Nagad</span>
                  <span className="text-[10px] opacity-75">Digital Pay</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMethod("card")}
                  className={`rounded-2xl border p-3 text-center transition ${
                    method === "card"
                      ? "border-cyan-500 bg-cyan-500/10 text-cyan-400 font-bold"
                      : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  <span className="block text-sm">Card</span>
                  <span className="text-[10px] opacity-75">Visa / MC</span>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs text-slate-300">
                {method === "card" ? "Card Number" : "Wallet Mobile Number"}
                <input
                  type="text"
                  required
                  placeholder={method === "card" ? "4111 2222 3333 4444" : "017XXXXXXXX"}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-2.5 text-white outline-none focus:border-pink-500/50"
                />
              </label>

              <label className="block text-xs text-slate-300">
                {method === "card" ? "CVV & Expiry" : "Transaction TrxID"}
                <input
                  type="text"
                  required
                  placeholder={method === "card" ? "123 (12/28)" : "9H72K9L3M"}
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-2.5 text-white outline-none focus:border-pink-500/50"
                />
              </label>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
              <Lock className="h-3.5 w-3.5 text-emerald-400" />
              <span>Encrypted SSL payment pipeline backed by SSLCommerz simulator.</span>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="mt-2 w-full rounded-full bg-pink-500 px-6 py-3 font-semibold text-white transition hover:bg-pink-400 disabled:opacity-50"
            >
              {isProcessing ? "Processing Payment..." : `Pay BDT ${amountBDT.toLocaleString()} Now`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
