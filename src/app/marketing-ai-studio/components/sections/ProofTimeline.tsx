'use client';

import React from 'react';
import { Check, Zap } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

// SECTION: TIMELINE
const ProofTimeline: React.FC = () => {
    return (
        <section id="phases" className="w-full py-20 bg-white dark:bg-[#0B111B]">
            <div className="mx-auto w-full max-w-[1120px] px-6 sm:px-8">
                <div className="mx-auto w-full max-w-4xl text-center">
                    <Reveal width="100%">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 dark:text-white">
                                Proof accumulates. It doesn’t get invented.
                            </h2>
                            <div className="text-slate-500 max-w-xl mx-auto mb-16 font-light text-xl dark:text-slate-400">
                                This page will evolve only as the system progresses. Each stage appears only after it is
                                reached.
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={0.2} width="100%">
                        <div className="mt-12 flex justify-center">
                            <div className="relative inline-flex flex-wrap items-center justify-center gap-10 md:gap-14">
                                {/* Connecting Line */}
                                <div className="hidden md:block absolute top-[28px] left-0 right-0 h-0.5 bg-slate-100 -z-10 dark:bg-[#1E242D]" />

                                {[
                                    { step: '01', label: 'Service', status: 'complete', sub: 'Done' },
                                    { step: '02', label: 'Discovery', status: 'complete', sub: 'Done' },
                                    { step: '03', label: 'Build', status: 'active', sub: 'In Progress' },
                                    { step: '04', label: 'SaaS', status: 'locked', sub: 'Locked' },
                                ].map((s, i) => (
                                    <div key={i} className="flex flex-col items-center group">
                                        <div
                                            className={`
                        w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold border-[4px] transition-all duration-500 z-10 bg-white dark:bg-[#0F1424]
                        ${s.status === 'complete' ? 'border-slate-900 text-slate-900 dark:border-slate-100 dark:text-slate-100' : ''}
                        ${
                            s.status === 'active'
                                ? 'border-[#5b49f5] text-[#5b49f5] shadow-[0_0_0_8px_rgba(91,73,245,0.15)] scale-110'
                                : ''
                        }
                        ${s.status === 'locked' ? 'border-slate-100 text-slate-300 dark:border-[#1E242D] dark:text-slate-600' : ''}
                      `}
                                        >
                                            {s.status === 'complete' && <Check size={20} strokeWidth={3} />}
                                            {s.status === 'active' && (
                                                <Zap
                                                    size={20}
                                                    className="fill-current animate-[pulse_2s_ease-in-out_infinite]"
                                                />
                                            )}
                                            {s.status === 'locked' && <span className="font-mono">{s.step}</span>}
                                        </div>
                                        <div className="mt-4 text-center space-y-1">
                                            <div
                                                className={`text-sm font-bold uppercase tracking-wider ${
                                                    s.status === 'active'
                                                        ? 'text-[#5b49f5]'
                                                        : s.status === 'locked'
                                                            ? 'text-slate-300 dark:text-slate-600'
                                                            : 'text-slate-900 dark:text-slate-100'
                                                }`}
                                            >
                                                {s.label}
                                            </div>
                                            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                                {s.sub}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default ProofTimeline;
