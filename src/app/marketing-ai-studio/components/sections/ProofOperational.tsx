'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Server } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { BlueprintCard } from '../ui/Scaffolding';

type ProofSectionProps = {
    id?: string;
    variant?: 'white';
    className?: string;
    children: React.ReactNode;
};

type ProofContainerProps = {
    className?: string;
    children: React.ReactNode;
};

const ProofSection: React.FC<ProofSectionProps> = ({
    id,
    variant = 'white',
    className = '',
    children,
}) => {
    const variantClassName = variant === 'white' ? 'bg-white dark:bg-[#0B111B]' : '';

    return (
        <section id={id} className={`py-16 sm:py-24 ${variantClassName} ${className}`}>
            {children}
        </section>
    );
};

const ProofContainer: React.FC<ProofContainerProps> = ({ className = '', children }) => (
    <div className={`mx-auto max-w-[1120px] px-6 sm:px-8 ${className}`}>{children}</div>
);

// SECTION: OPERATIONAL REALITY
const ProofOperational: React.FC = () => {
    const cardHeightClasses = 'min-h-[400px] md:h-[420px]';
    const logs = [
        'POST /api/webhook/stripe 200 OK - 42ms',
        'GET /dashboard/overview 200 OK - 120ms',
        'AUTH /login/callback success - user_2k9s...',
        'DB pool connection acquired - 12ms',
        'GET /api/user/profile 200 OK - 85ms',
        'Worker process started - pid 4291',
        'Cache hit: key=user:metrics:12 - 2ms',
        'POST /api/generate 200 OK - 450ms',
        'Email dispatched: welcome_sequence - 100% deliv',
        'GET /favicon.ico 200 OK - 5ms',
    ];

    return (
        <ProofSection variant="white" id="infrastructure">
            <ProofContainer>
                <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
                    <Reveal width="100%">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-4 dark:text-white">
                                This is not a slide-deck business.
                            </h2>
                            <div className="text-slate-500 text-xl font-light leading-relaxed dark:text-slate-400">
                                Systems are running. Infrastructure is monitored. Failures would be visible.
                                <br className="hidden md:block" />
                                This page shows readiness, not scale.
                            </div>
                        </div>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
                    {/* Left: Infrastructure */}
                    <Reveal delay={0.1} width="100%">
                        <div className="h-full">
                            <BlueprintCard
                                className={`p-8 h-full flex flex-col justify-between ${cardHeightClasses}`}
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 dark:bg-emerald-500/10 dark:border-emerald-400/20 dark:text-emerald-200">
                                                <Server size={24} />
                                            </div>
                                            <div>
                                                <div className="text-base font-bold text-slate-900 dark:text-white">
                                                    Infrastructure
                                                </div>
                                                <div className="text-xs text-slate-500 font-mono mt-0.5 dark:text-slate-400">
                                                    US-East (N. Virginia)
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-200 dark:border-emerald-400/20">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            OPERATIONAL
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            'Database Primary',
                                            'Edge Functions',
                                            'Image Optimization',
                                            'Object Storage',
                                        ].map((item, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0 group dark:border-[#1E242D]"
                                            >
                                                <span className="text-slate-600 font-medium text-sm group-hover:text-slate-900 transition-colors dark:text-slate-300 dark:group-hover:text-white">
                                                    {item}
                                                </span>
                                                <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 dark:border-[#1E242D] dark:text-slate-500">
                                    <span>Uptime: 99.99%</span>
                                    <span className="font-mono">v2.4.0</span>
                                </div>
                            </BlueprintCard>
                        </div>
                    </Reveal>

                    {/* Right: Live Logs */}
                    <Reveal delay={0.2} width="100%">
                        <div className="h-full">
                            <BlueprintCard
                                className={`p-0 overflow-hidden bg-[#0f172a] border-slate-800 text-slate-300 h-full flex flex-col shadow-2xl ${cardHeightClasses}`}
                            >
                                <div className="p-4 border-b border-slate-700/50 bg-[#1e293b] flex items-center justify-between shrink-0">
                                    <div className="flex items-center gap-2">
                                        <Activity size={14} className="text-indigo-400" />
                                        <span className="text-xs font-bold text-white tracking-wide">
                                            Live Traffic
                                        </span>
                                    </div>
                                    <div className="flex gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-slate-600" />
                                        <div className="w-2 h-2 rounded-full bg-slate-600" />
                                    </div>
                                </div>

                                <div className="flex-1 min-h-0 overflow-hidden relative font-mono text-[10px] p-5 bg-[#0f172a] leading-relaxed">
                                    <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#0f172a] to-transparent z-10" />
                                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0f172a] to-transparent z-10" />

                                    <motion.div
                                        animate={{ y: [0, -200] }}
                                        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                                        className="space-y-3"
                                    >
                                        {[...logs, ...logs, ...logs, ...logs].map((log, i) => (
                                            <div key={i} className="flex gap-3">
                                                <span className="text-slate-600 shrink-0 select-none">
                                                    12:42:{String((i * 3) % 60).padStart(2, '0')} PM
                                                </span>
                                                <span
                                                    className={`break-all ${
                                                        log.includes('POST')
                                                            ? 'text-indigo-400'
                                                            : log.includes('AUTH')
                                                                ? 'text-purple-400'
                                                                : 'text-emerald-400'
                                                    }`}
                                                >
                                                    {log}
                                                </span>
                                            </div>
                                        ))}
                                    </motion.div>
                                </div>
                            </BlueprintCard>
                        </div>
                    </Reveal>
                </div>
            </ProofContainer>
        </ProofSection>
    );
};

export default ProofOperational;
