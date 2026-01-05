'use client';
import React from 'react';
import { DashboardMockup, AuthMockup, BillingMockup, EmailMockup } from '../ui/Visuals';
import { BlueprintCard } from '../ui/Scaffolding';
import { Reveal } from '../ui/Reveal';
import { Button } from '../ui/Button';
import Link from 'next/link';

export const Proof: React.FC = () => {
    const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL || "#";

    return (
        <section className="py-24 bg-white relative overflow-hidden border-b border-slate-200/50">
            <div className="max-w-7xl mx-auto px-8">
                <div className="mb-16 space-y-3">
                     <Reveal>
                        <h2 className="text-3xl font-bold text-slate-900">Proof over promises.</h2>
                     </Reveal>
                     <Reveal delay={0.3}>
                        <p className="text-slate-500 font-light max-w-2xl">
                            These are standardized interface patterns we ship repeatedly—shown here as examples, not promises.
                        </p>
                     </Reveal>
                     <Reveal delay={0.4}>
                        <div className="pt-4">
                            <Link href={youtubeUrl} target="_blank">
                                <Button variant="secondary" withArrow>Watch the build series</Button>
                            </Link>
                        </div>
                     </Reveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]">
                    
                    {/* Dashboard - Large */}
                    <div className="md:col-span-8 row-span-1 md:row-span-2">
                        <BlueprintCard className="h-full bg-white p-1">
                            <DashboardMockup />
                        </BlueprintCard>
                    </div>

                    {/* Auth - Medium */}
                    <div className="md:col-span-4 row-span-1">
                        <BlueprintCard className="h-full bg-white p-1" label="Standard Auth">
                            <AuthMockup />
                        </BlueprintCard>
                    </div>

                    {/* Billing - Small */}
                    <div className="md:col-span-2 row-span-1 hidden md:block">
                        <BlueprintCard className="h-full bg-white p-1" label="Email View">
                             <EmailMockup />
                        </BlueprintCard>
                    </div>

                    {/* Billing - Medium */}
                    <div className="md:col-span-2 row-span-1">
                         <BlueprintCard className="h-full bg-white p-1" label="Billing Portal">
                            <BillingMockup />
                        </BlueprintCard>
                    </div>

                </div>
            </div>
        </section>
    );
};