"use client";

import { useState } from "react";

const benefitList = [
  "Service-to-SaaS funnel patterns",
  "Stripe checkout + delivery flows",
  "Reusable sections, pricing, FAQs, ops checklists",
];

const SAASKIT_PRICE = "€197";

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

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-wide text-slate-500">ProChat</p>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">SaaSkit – Delivery Kit</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Service and SaaS delivery kit used internally by ProChat to move from client work to SaaS offers quickly.
        </p>
      </div>

      <div className="border rounded-2xl p-8 shadow-sm bg-white dark:bg-[#0B111B] dark:border-[#1f2937] space-y-6">
        <div className="flex items-baseline gap-2">
          <div className="text-3xl font-bold text-slate-900 dark:text-white">{SAASKIT_PRICE}</div>
          <div className="text-slate-500 text-sm">one-time</div>
        </div>
        <div className="flex items-baseline gap-2">
          <div className="text-lg font-semibold text-slate-900 dark:text-white">One-time purchase</div>
          <div className="text-slate-500 text-sm">(includes updates)</div>
        </div>

        <ul className="space-y-2 text-slate-700 dark:text-slate-200">
          {benefitList.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
              {item}
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="text-slate-600 dark:text-slate-300">
            Secure checkout via Stripe. GitHub access delivered immediately after purchase.
          </div>
          <button
            onClick={() => startCheckout(setLoading)}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-white font-semibold shadow hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Redirecting…" : "Buy SaaSkit"}
          </button>
        </div>
      </div>

      <div className="mt-10 text-sm text-slate-600 dark:text-slate-300">
        After payment you'll be sent to a finish page to submit your GitHub username. If you close the tab, reopen the
        success link from Stripe and finish later.
      </div>
    </div>
  );
}
