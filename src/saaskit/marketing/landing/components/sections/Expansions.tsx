import React from 'react';
import { DashboardMockup, AuthMockup, BillingMockup, EmailMockup } from '../ui/Visuals';
import { BlueprintCard } from '../ui/Scaffolding';

export const Proof: React.FC = () => {
    return (
        <section className="py-24 bg-slate-50/50 dark:bg-[#0B111B] relative overflow-hidden border-b border-slate-200/50 dark:border-[#1E242D]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 space-y-3">
                     <h2 className="text-3xl font-bold text-slate-900 dark:text-white">It looks like this.</h2>
                     <p className="text-slate-500 dark:text-[#808389] font-light">
                        No lorem ipsum. Realistic, production-ready interfaces.
                     </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]">
                    
                    {/* Dashboard - Large */}
                    <div className="md:col-span-8 row-span-1 md:row-span-2">
                        <BlueprintCard className="h-full bg-white dark:bg-[#0B111B] p-1">
                            <DashboardMockup />
                        </BlueprintCard>
                    </div>

                    {/* Auth - Medium */}
                    <div className="md:col-span-4 row-span-1">
                        <BlueprintCard className="h-full bg-white dark:bg-[#0B111B] p-1" label="Auth Flow">
                            <AuthMockup />
                        </BlueprintCard>
                    </div>

                    {/* Billing - Small */}
                    <div className="md:col-span-2 row-span-1 hidden md:block">
                        <BlueprintCard className="h-full bg-white dark:bg-[#0B111B] p-1" label="Email View">
                             <EmailMockup />
                        </BlueprintCard>
                    </div>

                    {/* Billing - Medium */}
                    <div className="md:col-span-2 row-span-1">
                         <BlueprintCard className="h-full bg-white dark:bg-[#0B111B] p-1" label="Billing">
                            <BillingMockup />
                        </BlueprintCard>
                    </div>

                </div>
            </div>
        </section>
    );
};
