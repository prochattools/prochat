'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Scaffolding: React.FC<{ opacity?: number, className?: string }> = ({ opacity = 0.4, className = '' }) => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

    return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`} style={{ opacity }}>
            {/* Base Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800f_1px,transparent_1px),linear-gradient(to_bottom,#8080800f_1px,transparent_1px)] bg-[size:120px_120px] dark:bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)]" />

            {/* Center Axis */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px border-l border-dashed border-slate-300/30 dark:border-slate-700/50" />

            {/* Floating Technical Elements (Parallax) */}
            <motion.div style={{ y: y1 }} className="absolute top-20 left-[10%] w-64 h-64 border border-dashed border-slate-300/20 rounded-full dark:border-slate-700/40" />
            <motion.div style={{ y: y2 }} className="absolute top-[40%] right-[5%] w-96 h-96 border border-dashed border-slate-300/20 rounded-full dark:border-slate-700/40" />

            {/* Measurement Markers */}
            <div className="absolute top-32 left-6 font-mono text-[9px] text-slate-300 tracking-widest hidden lg:block rotate-90 origin-left dark:text-slate-600">
                OFFSET-Y: 128px
            </div>
            <div className="absolute bottom-32 right-6 font-mono text-[9px] text-slate-300 tracking-widest hidden lg:block rotate-90 origin-right dark:text-slate-600">
                GRID-Z: 0.05
            </div>
        </div>
    );
};

interface BlueprintCardProps {
    children: React.ReactNode;
    className?: string;
    label?: string;
    onClick?: () => void;
}

export const BlueprintCard: React.FC<BlueprintCardProps> = ({ children, className = '', label, onClick }) => (
    <div
        onClick={onClick}
        className={`
      relative bg-white 
      border border-slate-200 
      shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] 
      rounded-2xl 
      overflow-hidden 
      transition-all duration-300 ease-out
      hover:shadow-[0_12px_40px_-12px_rgba(91,73,245,0.15)] 
      hover:border-slate-300
      hover:-translate-y-[2px]
      transform-gpu
      group 
      ${className}
    `}
    >
        {/* Label */}
        {label && (
            <div className="absolute top-4 right-5 text-[9px] font-mono text-slate-400 uppercase tracking-wider group-hover:text-[#5b49f5] transition-colors z-20 pointer-events-none">
                {label}
            </div>
        )}

        {children}
    </div>
);
