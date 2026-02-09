"use client";

import Link from "next/link";

const features = [
  "Auth, billing, and infra ready",
  "Next.js + TypeScript + Tailwind/shadcn",
  "Stripe + Clerk + Prisma/Postgres + n8n wired in",
];

export default function StorePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <p className="text-sm uppercase tracking-wide text-slate-500">ProChat</p>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          ProChat Store
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Buy ProKit, our production-grade SaaS boilerplate, and get GitHub access instantly after checkout.
        </p>
      </div>
      <div className="border rounded-2xl p-8 shadow-sm bg-white dark:bg-[#0B111B] dark:border-[#1f2937]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
              ProKit – SaaS Boilerplate for Next.js
            </h2>
            <ul className="mt-3 space-y-1 text-slate-600 dark:text-slate-300">
              {features.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <div className="text-3xl font-bold text-slate-900 dark:text-white">
              ProKit Access
            </div>
            <Link
              href="/store/prokit"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-white font-semibold shadow hover:bg-blue-700 transition"
            >
              View details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
