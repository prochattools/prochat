"use client";

import { useState } from "react";

const heroBullets = [
  "Service-to-SaaS transition framework",
  "Structured funnel + positioning pages",
  "Stripe checkout + automated delivery flows",
  "Reusable pricing, FAQ, and ops checklist sections",
  "Designed to reduce decision friction",
  "Built to keep delivery predictable",
];

const whoForBullets = [
  "You already sell services (or are about to)",
  "You want predictable packaging and delivery",
  "You want operational clarity, not “sales hype”",
  "You want a system you can reuse across offers",
];

async function startCheckout(setLoading: (v: boolean) => void) {
  setLoading(true);
  try {
    const res = await fetch("/api/store/checkout/saaskit", { method: "POST" });
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

export default function SaaskitPage() {
  const [loading, setLoading] = useState(false);

  // Card component for reuse in responsive layout
  const PurchaseCard = ({ className }: { className?: string }) => (
    <div className={`relative bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-8 shadow-2xl ring-1 ring-slate-900/5 ${className}`}>
      <div className="flex flex-col gap-2 mb-8">
        <h3 className="text-2xl font-bold text-slate-900">€197 one-time</h3>
        <p className="text-sm text-slate-500 font-medium">(includes updates)</p>
      </div>

      <button
        onClick={() => startCheckout(setLoading)}
        disabled={loading}
        className="w-full rounded-xl bg-blue-600 px-6 py-4 text-white text-lg font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
      >
        {loading ? "Redirecting…" : "Buy SaaSkit"}
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
        {/* Subtle Background Gradient - slightly different for visual variety but consistent language */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-50/50 blur-3xl opacity-60 mix-blend-multiply filter" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-50/50 blur-3xl opacity-60 mix-blend-multiply filter" />
        </div>

        <div className="container mx-auto px-6 relative z-10 h-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center h-full">
            {/* Left Column: Copy */}
            <div className="flex flex-col justify-center order-1 lg:order-1 pt-20 lg:pt-0">
              <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4">PROCHAT</span>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                SaaSKit — Structured SaaS Delivery System
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-lg">
                A delivery system to package services into scalable SaaS offers without improvisation.
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
                Pragmatic by design: every decision is cost, risk, and impact.
              </p>
            </div>

            {/* Right Column: Purchase Card (Desktop only) */}
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
                    <p className="mb-4 text-base font-normal text-slate-500">(commitment before complexity)</p>
                  </li>
                  <li className="mb-10 ml-8">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white">
                      <span className="text-blue-600 font-bold text-sm">3</span>
                    </span>
                    <h3 className="flex items-center mb-1 text-lg font-semibold text-slate-900">Use SaaSKit to package and deliver clearly</h3>
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
