import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Scaffolding: React.FC<{ opacity?: number, className?: string }> = ({ opacity = 0.4, className = '' }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`} style={{ opacity }}>
      {/* Base Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(var(--pc-border-subtle-rgb)/0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--pc-border-subtle-rgb)/0.16)_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(var(--pc-border-subtle-rgb)/0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--pc-border-subtle-rgb)/0.22)_1px,transparent_1px)] bg-[size:120px_120px]" />

      {/* Center Axis */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px border-l border-dashed border-border-subtle/45" />

      {/* Floating Technical Elements (Parallax) */}
      <motion.div style={{ y: y1 }} className="absolute top-20 left-[10%] w-64 h-64 border border-dashed border-border-subtle/35 rounded-full" />
      <motion.div style={{ y: y2 }} className="absolute top-[40%] right-[5%] w-96 h-96 border border-dashed border-border-subtle/35 rounded-full" />

      {/* Measurement Markers */}
      <div className="absolute top-32 left-6 hidden origin-left rotate-90 font-mono text-[9px] tracking-widest text-tertiary lg:block">
        OFFSET-Y: 128px
      </div>
      <div className="absolute bottom-32 right-6 hidden origin-right rotate-90 font-mono text-[9px] tracking-widest text-tertiary lg:block">
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
      relative bg-surface
      border border-border-subtle
      shadow-surface
      rounded-2xl
      overflow-hidden
      transition-all duration-300 ease-out
      hover:shadow-elevated
      hover:border-border-strong
      hover:-translate-y-[2px]
      transform-gpu
      group
      ${className}
    `}
  >
    {/* Label */}
    {label && (
      <div className="absolute top-4 right-5 text-[9px] font-mono text-muted-soft uppercase tracking-wider group-hover:text-primary transition-colors z-20 pointer-events-none">
        {label}
      </div>
    )}

    {children}
  </div>
);
