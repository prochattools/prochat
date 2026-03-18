'use client';

import React from 'react';
import { Check, Zap } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

// SECTION: TIMELINE
const ProofTimeline: React.FC = () => {
    return (
        <section id="phases" className="w-full py-20 bg-background">
            <div className="mx-auto w-full max-w-[1120px] px-page">
                <div className="mx-auto w-full max-w-4xl text-center">
                    <Reveal width="100%">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                Proof should collapse into a clean build plan.
                            </h2>
                            <div className="text-muted-foreground max-w-xl mx-auto mb-16 font-light text-xl">
                                The useful sequence is simple: validate the buyer problem, define the MVP, build inside
                                SaaSKit, then launch with the operational basics already in place.
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={0.2} width="100%">
                        <div className="mt-12 flex justify-center">
                            <div className="relative inline-flex flex-wrap items-center justify-center gap-10 md:gap-14">
                                {/* Connecting Line */}
                                <div className="hidden md:block absolute top-[28px] left-0 right-0 h-0.5 bg-border-subtle -z-10" />

                                {[
                                    { step: '01', label: 'Validate', status: 'complete', sub: 'Done' },
                                    { step: '02', label: 'Define Scope', status: 'complete', sub: 'Done' },
                                    { step: '03', label: 'Build In SaaSKit', status: 'active', sub: 'Current' },
                                    { step: '04', label: 'Launch', status: 'locked', sub: 'Next' },
                                ].map((s, i) => (
                                    <div key={i} className="flex flex-col items-center group">
                                        <div
                                            className={`
                        w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold border-[4px] transition-all duration-500 z-10 bg-surface
                        ${s.status === 'complete' ? 'border-foreground text-foreground' : ''}
                        ${
                            s.status === 'active'
                                ? 'border-primary text-primary shadow-[0_0_0_8px_rgb(var(--pc-blue-600-rgb)/0.15)] scale-110'
                                : ''
                        }
                        ${s.status === 'locked' ? 'border-border-subtle text-tertiary' : ''}
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
                                                        ? 'text-primary'
                                                        : s.status === 'locked'
                                                            ? 'text-tertiary'
                                                            : 'text-foreground'
                                                }`}
                                            >
                                                {s.label}
                                            </div>
                                            <div className="text-[10px] font-mono uppercase tracking-widest text-tertiary">
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
