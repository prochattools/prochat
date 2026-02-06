import React from 'react';
import { BlueprintCard } from '../ui/Scaffolding';
import { Layout, Users, Mail, CreditCard, Search, FileText, Database, Share2 } from 'lucide-react';

const SYSTEMS = [
    {
        title: "Identity System",
        description: "Clerk Authentication, User Profiles, Protected Routes, Organization Support.",
        icon: <Users className="text-slate-700 dark:text-slate-200" />
    },
    {
        title: "Revenue System",
        description: "Stripe Checkout, Webhooks, Customer Portal, Subscription Management.",
        icon: <CreditCard className="text-slate-700 dark:text-slate-200" />
    },
    {
        title: "Growth Engine",
        description: "Sitemaps, Metadata, JSON-LD, OpenGraph generation, Analytics.",
        icon: <Search className="text-slate-700 dark:text-slate-200" />
    },
    {
        title: "Content System",
        description: "MDX Blog, CMS Integration, SEO-optimized article layouts.",
        icon: <FileText className="text-slate-700 dark:text-slate-200" />
    },
    {
        title: "Communication",
        description: "Resend Email Integration, React Email Templates, Welcome sequences.",
        icon: <Mail className="text-slate-700 dark:text-slate-200" />
    },
    {
        title: "Data Layer",
        description: "Prisma ORM, PostgreSQL, Type-safe queries, Seed scripts.",
        icon: <Database className="text-slate-700 dark:text-slate-200" />
    },
    {
        title: "Interface Kit",
        description: "Shadcn UI, TailwindCSS, Dark Mode, Framer Motion, Radix Primitives.",
        icon: <Layout className="text-slate-700 dark:text-slate-200" />
    },
    {
        title: "Social",
        description: "OG Image generation, Social sharing cards, Meta tags automation.",
        icon: <Share2 className="text-slate-700 dark:text-slate-200" />
    }
];

export const Features: React.FC = () => {
  return (
    <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Included Systems
            </h2>
            <p className="text-slate-500 dark:text-[#808389] mt-4 max-w-2xl mx-auto font-light">
                Not components. Integrated systems that already talk to each other.
            </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SYSTEMS.map((feature, idx) => (
                <BlueprintCard key={idx} className="flex flex-col h-full group hover:border-[#5b49f5]/30 dark:hover:border-[#885efe]/40">
                    <div className="p-6 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 bg-slate-50 dark:bg-[#1E242D] rounded-lg border border-slate-100 dark:border-[#373C53] flex items-center justify-center group-hover:bg-[#5b49f5]/5 dark:group-hover:bg-[#5b49f5]/10 group-hover:text-[#5b49f5] dark:group-hover:text-[#885efe] transition-colors duration-300">
                                {feature.icon}
                            </div>
                            <div className="w-2 h-2 rounded-full bg-[#61ce70] shadow-[0_0_8px_rgba(97,206,112,0.4)] dark:shadow-[0_0_6px_rgba(97,206,112,0.2)]" title="Ready" />
                        </div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-[#808389] leading-relaxed font-light">
                            {feature.description}
                        </p>
                    </div>
                </BlueprintCard>
            ))}
        </div>
    </section>
  );
};
