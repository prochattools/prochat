"use client";

import Link from "next/link";

const products = [
  {
    slug: "prokit",
    name: "ProKit – SaaS Boilerplate for Next.js",
    blurb: "Auth, billing, infra-ready starter used internally by ProChat.",
    bullets: [
      "Auth, billing, and infra ready",
      "Next.js + TypeScript + Tailwind/shadcn",
      "Stripe + Clerk + Prisma/Postgres + n8n wired in",
    ],
  },
  {
    slug: "saaskit",
    name: "SaaSkit – Service-to-SaaS delivery kit",
    blurb: "Funnel + delivery kit for selling and fulfilling SaaS/agency offers fast.",
    bullets: [
      "Done-for-you service funnel patterns",
      "Stripe checkout + fulfillment flow",
      "Reusable sections and ops checklists",
    ],
  },
];

export default function StorePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-white text-slate-900 dark:text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-50/50 blur-3xl opacity-60 mix-blend-multiply filter" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-50/50 blur-3xl opacity-60 mix-blend-multiply filter" />
        </div>

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-widest font-bold text-blue-600">ProChat</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
              ProChat Store
            </h1>
            <p className="mt-3 text-slate-600">
              Buy ProKit, our production-grade SaaS boilerplate, and get GitHub access instantly after checkout.
            </p>
          </div>

          <div className="grid gap-6">
            {products.map((product) => (
              <div
                key={product.slug}
                className="relative rounded-3xl p-8 border border-slate-200/60 bg-white/80 backdrop-blur-xl shadow-2xl ring-1 ring-slate-900/5"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900">
                      {product.name}
                    </h2>
                    <p className="mt-2 text-slate-600">{product.blurb}</p>
                    <ul className="mt-3 space-y-1 text-slate-700">
                      {product.bullets.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-blue-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-3">
                    <Link
                      href={`/store/${product.slug}`}
                      className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-white font-semibold shadow-lg shadow-blue-600/20 transition-all duration-200 hover:bg-blue-700 hover:shadow-blue-600/30"
                    >
                      View details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
