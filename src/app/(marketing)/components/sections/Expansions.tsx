'use client';
import React from 'react';
import { DashboardMockup, AuthMockup, BillingMockup, EmailMockup } from '../ui/Visuals';
import { BlueprintCard } from '../ui/Scaffolding';
import { Reveal } from '../ui/Reveal';
import { Button } from '../ui/Button';
import Link from 'next/link';

interface ProofProps {
    title?: string;
    description?: string;
    showCta?: boolean;
    ctaLabel?: string;
    ctaHref?: string;
    ctaTarget?: string;
}

export const Proof: React.FC<ProofProps> = ({
    title = "Proof over promises.",
    description = "These are standardized interface patterns we ship repeatedly—shown here as examples, not promises.",
    showCta = true,
    ctaLabel = "Watch the build series",
    ctaHref,
    ctaTarget = "_blank"
}) => {
    const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL || "#";
    const resolvedCtaHref = ctaHref ?? youtubeUrl;

    return (
        <section className="py-24 bg-background relative overflow-hidden border-b border-border-subtle/60">
            <div className="max-w-7xl mx-auto px-page">
                <div className="mb-16 space-y-3">
                     <Reveal>
                        <h2 className="text-3xl font-bold text-foreground">{title}</h2>
                     </Reveal>
                     <Reveal delay={0.3}>
                        <p className="text-muted-foreground font-light max-w-2xl">
                            {description}
                        </p>
                     </Reveal>
                     {showCta && (
                        <Reveal delay={0.4}>
                            <div className="pt-4">
                                <Link href={resolvedCtaHref} target={ctaTarget}>
                                    <Button variant="secondary" withArrow>{ctaLabel}</Button>
                                </Link>
                            </div>
                        </Reveal>
                     )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]">
                    
                    {/* Dashboard - Large */}
                    <div className="md:col-span-8 row-span-1 md:row-span-2">
                        <BlueprintCard className="h-full bg-surface-elevated p-1">
                            <DashboardMockup />
                        </BlueprintCard>
                    </div>

                    {/* Auth - Medium */}
                    <div className="md:col-span-4 row-span-1">
                        <BlueprintCard className="h-full bg-surface-elevated p-1" label="Standard Auth">
                            <AuthMockup />
                        </BlueprintCard>
                    </div>

                    {/* Billing - Small */}
                    <div className="md:col-span-2 row-span-1 hidden md:block">
                        <BlueprintCard className="h-full bg-surface-elevated p-1" label="Email View">
                             <EmailMockup />
                        </BlueprintCard>
                    </div>

                    {/* Billing - Medium */}
                    <div className="md:col-span-2 row-span-1">
                         <BlueprintCard className="h-full bg-surface-elevated p-1" label="Billing Portal">
                            <BillingMockup />
                        </BlueprintCard>
                    </div>

                </div>
            </div>
        </section>
    );
};
