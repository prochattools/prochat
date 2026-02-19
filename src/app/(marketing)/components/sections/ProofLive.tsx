'use client';

import React from 'react';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

const ProofLive: React.FC = () => {
    return (
        <section
            id="live"
            className="w-full pt-20 pb-10 bg-slate-50 border-b border-slate-200 dark:bg-[#0F1626] dark:border-[#1E242D]"
        >
            <div className="mx-auto w-full max-w-[1120px] px-6 sm:px-8">
                {/* Text Block */}
                <div className="max-w-4xl mx-auto text-center mb-8">
                    <Reveal width="100%">
                        <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-white border border-emerald-100 rounded-full shadow-sm mb-6 dark:bg-white/10 dark:border-emerald-400/20">
                            <div className="relative flex items-center justify-center w-2 h-2">
                                <div className="absolute w-full h-full bg-emerald-500 rounded-full animate-ping opacity-75 duration-1000" />
                                <div className="relative w-2 h-2 bg-emerald-500 rounded-full" />
                            </div>
                            <span className="text-[10px] font-bold text-emerald-800 tracking-wide uppercase dark:text-emerald-200">
                                Live Deployment
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-[1.1] dark:text-white">
                            A real niche. A real offer. Live.
                        </h2>
                        <div className="text-slate-500 max-w-2xl mx-auto font-light text-xl leading-relaxed mb-8 dark:text-slate-300">
                            The ProChat system is currently being applied to a real niche. The offer exists. The funnel is
                            live. Anyone can inspect it.
                        </div>
                        <Link
                            href="https://accountant.prochat.tools"
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                        >
                            <Button
                                variant="primary"
                                size="lg"
                                className="h-12 px-8 shadow-xl shadow-[#1D4ED8]/20 hover:shadow-[#1D4ED8]/40"
                                withArrow
                            >
                                View the live accountant funnel
                            </Button>
                        </Link>
                    </Reveal>
                </div>

                {/* Mock Block - anchored immediately below */}
                <Reveal delay={0.2} width="100%">
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-white rounded-xl border border-slate-200 shadow-2xl overflow-hidden group hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 dark:bg-[#0F1424] dark:border-[#1E242D]">
                            {/* Browser Header */}
                            <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center px-4 gap-4 sticky top-0 z-20 dark:bg-[#0B111B] dark:border-[#1E242D]">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                                </div>
                                <div className="flex-1 max-w-xl mx-auto h-7 bg-white border border-slate-200 rounded flex items-center px-3 gap-2 shadow-sm transition-all duration-300 group-hover:border-slate-300 dark:bg-[#0F1626] dark:border-[#1E242D] dark:text-slate-200">
                                    <Lock size={10} className="text-emerald-500" />
                                    <span className="text-[10px] text-slate-600 font-mono dark:text-slate-300">
                                        https://accountant.prochat.tools
                                    </span>
                                </div>
                                <div className="w-12" />
                            </div>

                            {/* Browser Content */}
                            <div className="relative w-full aspect-[16/9] max-h-[320px] sm:max-h-[440px] lg:max-h-[520px] bg-white border-t border-slate-100 flex flex-col items-center overflow-hidden dark:bg-[#0F1424] dark:border-[#1E242D]">
                                <div className="absolute inset-0 bg-slate-50/30 dark:bg-black/10" />
                                {/* Mock UI Layer */}
                                <div className="w-full max-w-5xl px-8 pt-12 space-y-8 opacity-90 select-none relative z-10 transition-transform duration-700 ease-out group-hover:scale-[1.01]">
                                    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-slate-200 dark:bg-[#0B111B] dark:border-[#1E242D]">
                                        <div className="w-32 h-6 bg-slate-900 rounded dark:bg-slate-700" />
                                        <div className="flex gap-6">
                                            <div className="w-16 h-4 bg-slate-100 rounded dark:bg-slate-700/60" />
                                            <div className="w-16 h-4 bg-slate-100 rounded dark:bg-slate-700/60" />
                                            <div className="w-20 h-8 bg-slate-800 rounded dark:bg-slate-600" />
                                        </div>
                                    </div>
                                    <div className="text-center space-y-6 pt-6">
                                        <div className="w-3/4 h-16 bg-slate-900 rounded-lg mx-auto shadow-md dark:bg-slate-700" />
                                        <div className="w-1/2 h-4 bg-slate-300 rounded mx-auto dark:bg-slate-600" />
                                        <div className="flex justify-center gap-4 pt-2">
                                            <div className="w-32 h-10 bg-[#1D4ED8] rounded-lg shadow-lg" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-6 pt-8">
                                        {[1, 2, 3].map((i) => (
                                            <div
                                                key={i}
                                                className="h-32 bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col gap-3 dark:bg-[#0B111B] dark:border-[#1E242D]"
                                            >
                                                <div className="w-8 h-8 bg-slate-100 rounded-lg dark:bg-slate-700/60" />
                                                <div className="w-3/4 h-3 bg-slate-200 rounded dark:bg-slate-700/70" />
                                                <div className="flex-1 w-full bg-slate-50 rounded dark:bg-[#101826]" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Status Badge */}
                                <div className="absolute top-6 right-6 z-30">
                                    <div className="bg-white/90 backdrop-blur-md text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-2 shadow-sm dark:bg-emerald-500/10 dark:text-emerald-200 dark:border-emerald-400/20">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                        </span>
                                        LIVE
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default ProofLive;
