'use client';
import React from 'react';
import { Reveal } from '@/app/marketing-ai-studio/components/ui/Reveal';
import { Check } from 'lucide-react';
import StartSignupForm from './_components/StartSignupForm';

export default function FunnelPage() {
    return (
        <main className="relative z-10 min-h-screen flex flex-col items-center py-20 px-6 font-sans">
            <div className="w-full max-w-2xl mx-auto space-y-24">

                {/* HEADER */}
                <section className="text-center space-y-8">
                    <Reveal width="100%">
                        <div className="inline-block px-3 py-1 mb-6 rounded-full bg-purple-50 text-[#5b49f5] text-xs font-bold uppercase tracking-wider">
                            The SaaS Starting Point
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1]">
                            Structure first. SaaS second.
                        </h1>
                    </Reveal>
                    <Reveal delay={0.3} width="100%">
                        <p className="text-xl text-slate-500 font-light leading-relaxed max-w-lg mx-auto">
                            A calm, practical foundation before you build your SaaS.
                        </p>
                    </Reveal>
                </section>

                {/* PRIMARY FORM */}
                <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/50">
                    <div className="text-center mb-6">
                        <p className="text-sm font-medium text-slate-900">
                            Get the free PDF + a 3-email guided series.
                        </p>
                    </div>

                    <StartSignupForm />

                    <div className="text-center mt-4">
                        <p className="text-xs text-slate-400">
                            No spam. Unsubscribe anytime.
                        </p>
                    </div>
                </section>

                {/* WHO THIS IS FOR */}
                <section className="space-y-6">
                    <Reveal width="100%">
                        <h3 className="text-lg font-bold text-slate-900">Who this is for</h3>
                        <div className="prose prose-slate prose-lg text-slate-500 font-light leading-relaxed">
                            <p>
                                You’ve seen what AI makes possible — and you’re serious enough to try.
                                But you’re stuck in tool overload, stack confusion, and “where do I even start?”
                            </p>
                            <p>
                                This is for non-technical builders who want to build SaaS the right way:
                                clear structure, disciplined decisions, and foundations that don’t collapse later.
                            </p>
                        </div>
                    </Reveal>
                </section>

                <hr className="border-slate-100" />

                {/* WHY I MADE THIS */}
                <section className="space-y-6">
                    <Reveal width="100%">
                        <h3 className="text-lg font-bold text-slate-900">Why I made this</h3>
                        <div className="prose prose-slate prose-lg text-slate-500 font-light leading-relaxed">
                            <p>
                                I’m Steve Westhoek. I spent 12 years as a professional software tester, focused on what makes systems hold up over time — and what quietly causes them to break.
                            </p>
                            <p className="font-medium text-slate-800">
                                Most SaaS doesn’t fail because of code.<br />
                                It fails because of premature decisions.
                            </p>
                            <p>
                                Reliable beats impressive.
                            </p>
                        </div>
                    </Reveal>
                </section>

                <hr className="border-slate-100" />

                {/* WHAT YOU'LL GET */}
                <section className="space-y-8">
                    <Reveal width="100%">
                        <h3 className="text-lg font-bold text-slate-900">What you’ll get</h3>
                        <p className="text-slate-500 mb-6">When you join, you’ll receive:</p>

                        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 space-y-4">
                            <div className="flex gap-4">
                                <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#5b49f5] shrink-0 mt-0.5">
                                    <Check size={14} strokeWidth={3} />
                                </div>
                                <div>
                                    <span className="font-bold text-slate-900 block mb-1">The SaaS Starting Point (PDF)</span>
                                    <span className="text-sm text-slate-500">Short, practical, and calm</span>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#5b49f5] shrink-0 mt-0.5">
                                    <Check size={14} strokeWidth={3} />
                                </div>
                                <div>
                                    <span className="font-bold text-slate-900 block mb-2">3 emails that walk you through:</span>
                                    <ul className="text-sm text-slate-500 space-y-1.5 list-disc pl-4">
                                        <li>Counting the real cost before you commit</li>
                                        <li>Choosing the right order of decisions</li>
                                        <li>Simplifying your idea into a stable version 1</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <p className="text-center text-slate-400 italic text-sm pt-4">
                            No hype. No “get rich” energy. Just structure.
                        </p>
                    </Reveal>
                </section>

                <hr className="border-slate-100" />

                {/* WHAT THIS IS NOT */}
                <section className="space-y-6">
                    <Reveal width="100%">
                        <h3 className="text-lg font-bold text-slate-900">What this is not</h3>
                        <div className="space-y-3">
                            {["Not a course.", "Not a growth playbook.", "Not a promise of revenue."].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-slate-500 font-light text-lg">
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                    {item}
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 p-6 bg-slate-900 text-white rounded-xl shadow-lg">
                            <p className="font-medium text-lg leading-relaxed">
                                It’s a starting framework — so you build on stable ground.
                                <br /><br />
                                <span className="text-[#5b49f5] font-bold">You scale stability — not chaos.</span>
                            </p>
                        </div>
                    </Reveal>
                </section>

                {/* FINAL CTA */}
                <section className="pt-12 w-full">
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/50 text-center">
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Ready to start without guessing?</h2>
                        <p className="text-slate-500 mb-8">Enter your email and I’ll send the PDF + the 3-email series.</p>

                        <StartSignupForm buttonLabel="Get the Starter Pack" />

                        <div className="text-center mt-4">
                            <p className="text-xs text-slate-400">
                                No spam. Unsubscribe anytime.
                            </p>
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="pt-12 pb-6 text-center text-xs text-slate-300">
                    — Steve Westhoek
                </footer>

            </div>
        </main>
    );
}
