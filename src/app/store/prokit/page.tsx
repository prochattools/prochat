"use client";

import { useState } from "react";

const heroBullets = [
  "Auth + billing prewired (Clerk, Stripe, Resend)",
  "Schema-per-tenant Postgres + Prisma migrations",
  "Managed-first deployment pattern (Vercel + Supabase ready)",
  "n8n-ready automation hooks",
  "Marketing + dashboard scaffolding included",
  "Built to reduce early risk and rework",
];

const whoForBullets = [
  "You’ve done (or are doing) the preparation phase",
  "You want a stable base before adding features",
  "You prefer managed-first to avoid self-hosted complexity early",
  "You care about predictable architecture and maintenance",
];

const testerBullets = [
  "Minimize fragile early decisions",
  "Standardize the critical path",
  "Keep architecture predictable",
  "Reduce “rewrite risk” at the MVP stage",
];

async function startCheckout(setLoading: (v: boolean) => void) {
  setLoading(true);
  try {
    const res = await fetch("/api/store/checkout/prokit", { method: "POST" });
    if (!res.ok) throw new Error("Failed to start checkout");
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error("Checkout URL missing");
    }
  } catch (err) {
    console.error(err);
    alert("Could not start checkout. Please try again or contact info@prochat.tools.");
    setLoading(false);
  }
}

export default function ProkitPage() {
  const [loading, setLoading] = useState(false);

  // Card component for reuse in responsive layout
  const PurchaseCard = ({ className }: { className?: string }) => (
    <div className={`relative bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-8 shadow-2xl ring-1 ring-slate-900/5 ${className}`}>
      <div className="flex flex-col gap-2 mb-8">
        <h3 className="text-2xl font-bold text-slate-900">One-time purchase</h3>
        <p className="text-sm text-slate-500 font-medium">(includes updates)</p>
        <p className="text-sm text-slate-600 mt-2 pb-4 border-b border-slate-100">
          No subscriptions. No hidden add-ons.
        </p>
      </div>

      <button
        onClick={() => startCheckout(setLoading)}
        disabled={loading}
        className="w-full rounded-xl bg-blue-600 px-6 py-4 text-white text-lg font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
      >
        {loading ? "Redirecting…" : "Buy ProKit"}
      </button>

      <p className="mt-4 text-xs text-center text-slate-500">
        Secure checkout via Stripe. GitHub access delivered after purchase.
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-white text-slate-900 dark:text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* 100vh Hero Section */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden py-12 lg:py-0">
        {/* Subtle Background Gradient */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-50/50 blur-3xl opacity-60 mix-blend-multiply filter" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-50/50 blur-3xl opacity-60 mix-blend-multiply filter" />
        </div>

        <div className="container mx-auto px-6 relative z-10 h-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center h-full">
            {/* Left Column: Copy */}
            <div className="flex flex-col justify-center order-1 lg:order-1 pt-20 lg:pt-0">
              <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4">PROCHAT</span>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                ProKit — Structured SaaS Foundation
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-lg">
                A production-ready Next.js foundation for disciplined builders who value stability before speed.
              </p>

              {/* Mobile Card: Visible only on mobile, immediately after subhead */}
              <div className="block lg:hidden mb-12">
                <PurchaseCard />
              </div>

              <ul className="space-y-3 mb-8">
                {heroBullets.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-700">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                    <span className="text-base font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-sm font-medium text-slate-500 italic border-l-2 border-slate-200 pl-4">
                Built from a software tester’s lens: reduce risk before increasing complexity.
              </p>
            </div>

            {/* Right Column: Purchase Card (Desktop Only) */}
            <div className="order-2 lg:order-2 w-full max-w-md mx-auto lg:mr-0 hidden lg:block">
              <PurchaseCard />
            </div>
          </div>
        </div>
      </section>

      {/* Below Fold Content */}
      <div className="bg-white">

        {/* Who this is for */}
        <section className="py-24 border-t border-slate-100">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="grid md:grid-cols-12 gap-12">
              <div className="md:col-span-4">
                <h2 className="text-2xl font-bold text-slate-900">Who this is for</h2>
              </div>
              <div className="md:col-span-8">
                <ul className="space-y-4">
                  {whoForBullets.map((item, i) => (
                    <li key={i} className="flex gap-3 text-slate-700 text-lg">
                      <span className="text-blue-600 font-bold">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Built from a tester's perspective */}
        <section className="py-24 border-t border-slate-100 bg-slate-50/50">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="grid md:grid-cols-12 gap-12">
              <div className="md:col-span-4">
                <h2 className="text-2xl font-bold text-slate-900">Built from a tester’s perspective</h2>
              </div>
              <div className="md:col-span-8">
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  ProKit is designed to lower risk early. The goal is fewer fragile decisions, fewer moving parts, and a setup you can reason about. You can optimize later once usage patterns are real.
                </p>
                <ul className="space-y-3">
                  {testerBullets.map((item, i) => (
                    <li key={i} className="flex gap-3 text-slate-800 font-medium">
                      <svg className="w-5 h-5 text-blue-600 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Managed-first note */}
        <section className="py-24 border-t border-slate-100">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="bg-blue-50 rounded-3xl p-10 lg:p-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Managed-first doesn’t mean trapped</h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                Early on, managed tools reduce setup time and decision load. That’s the point: ship and learn with low overhead. If the product proves itself, you’ll have clearer data to migrate or optimize later.
              </p>
            </div>
          </div>
        </section>

        {/* How this fits into the system */}
        <section className="py-24 border-t border-slate-100">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="grid md:grid-cols-12 gap-12">
              <div className="md:col-span-4">
                <h2 className="text-2xl font-bold text-slate-900">How this fits into the system</h2>
              </div>
              <div className="md:col-span-8">
                <ol className="relative border-l border-slate-200 ml-3">
                  <li className="mb-10 ml-8">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white">
                      <span className="text-blue-600 font-bold text-sm">1</span>
                    </span>
                    <h3 className="flex items-center mb-1 text-lg font-semibold text-slate-900">Read The SaaS Starting Point</h3>
                    <p className="mb-4 text-base font-normal text-slate-500">(preparation)</p>
                  </li>
                  <li className="mb-10 ml-8">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white">
                      <span className="text-blue-600 font-bold text-sm">2</span>
                    </span>
                    <h3 className="flex items-center mb-1 text-lg font-semibold text-slate-900">Validate the outcome</h3>
                    <p className="mb-4 text-base font-normal text-slate-500">(commitment before code)</p>
                  </li>
                  <li className="mb-10 ml-8">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white">
                      <span className="text-blue-600 font-bold text-sm">3</span>
                    </span>
                    <h3 className="flex items-center mb-1 text-lg font-semibold text-slate-900">Use ProKit for structured execution</h3>
                  </li>
                  <li className="ml-8">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white">
                      <span className="text-blue-600 font-bold text-sm">4</span>
                    </span>
                    <h3 className="flex items-center mb-1 text-lg font-semibold text-slate-900">Follow the YouTube walkthroughs for implementation</h3>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Microcopy */}
        <div className="py-12 border-t border-slate-200 bg-slate-50 text-center">
          <p className="text-sm font-medium text-slate-500">Structure first. SaaS second.</p>
        </div>

      </div>
    </div>
  );
}
