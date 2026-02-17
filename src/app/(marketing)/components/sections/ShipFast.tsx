'use client';
import React from 'react';
import { Users, FileText, Package, Repeat } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

interface ShipFastStep {
  step: string;
  title: string;
  sub?: string;
  icon: React.ReactNode;
}

interface ShipFastProps {
  heading?: string;
  subhead?: string;
  steps?: ShipFastStep[];
  supportingCopy?: string;
  sectionId?: string;
  gridClassName?: string;
  connectorClassName?: string;
}

const DEFAULT_STEPS: ShipFastStep[] = [
  { step: "01", title: "Secure paid clients", sub: "Sell a narrow service (WaaS)", icon: <Users size={24} /> },
  { step: "02", title: "Log recurring friction", sub: "Identify patterns in client work", icon: <FileText size={24} /> },
  { step: "03", title: "Ship one workflow", sub: "Automate the solution with code", icon: <Package size={24} /> },
  { step: "04", title: "Scale the asset", sub: "Turn the workflow into SaaS", icon: <Repeat size={24} /> },
];

export const ShipFast: React.FC<ShipFastProps> = ({
  heading = "The ProChat loop",
  subhead = "The operational sequence for extracting software from service.",
  steps = DEFAULT_STEPS,
  supportingCopy,
  sectionId = "system",
  gridClassName = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative mb-16",
  connectorClassName = "hidden lg:block absolute top-10 left-[12%] right-[12%] h-px bg-slate-200 dark:bg-[#2A3445]"
}) => {
  return (
    <section id={sectionId} className="py-32 relative bg-white border-b border-slate-100 dark:bg-[#0B111B] dark:border-[#1E242D]">
      <div className="max-w-5xl mx-auto px-8">
        
        <div className="text-center mb-24">
            <Reveal>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{heading}</h2>
            </Reveal>
            {subhead && (
              <Reveal delay={0.3}>
                <p className="text-slate-500 mt-2 font-light dark:text-slate-400">{subhead}</p>
              </Reveal>
            )}
        </div>

        <div className={gridClassName}>
             {/* Connecting Line - Visible only on large screens when items are in a row */}
             <div className={connectorClassName} />

             {steps.map((item, i) => (
                 <div key={i} className="relative flex flex-col items-center text-center group z-10">
                     <Reveal delay={i * 0.1} width="fit-content">
                       <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-8 text-slate-400 group-hover:text-[#5b49f5] group-hover:border-[#5b49f5]/30 group-hover:shadow-[0_0_30px_-10px_rgba(91,73,245,0.2)] transition-all duration-500 dark:bg-[#0F1626] dark:border-[#2A3445] dark:text-slate-400 dark:shadow-none">
                           {item.icon}
                       </div>
                       <div className="absolute top-0 right-[calc(50%-40px)] -mt-3 -mr-3 w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-xs font-bold text-[#5b49f5] font-mono shadow-sm dark:bg-[#0F1626] dark:border-[#2A3445] dark:shadow-none">
                          {item.step}
                       </div>
                       <h3 className="font-bold text-slate-900 text-lg mb-1 dark:text-white">{item.title}</h3>
                       {item.sub && (
                         <p className="text-sm text-slate-500 dark:text-slate-400">{item.sub}</p>
                       )}
                     </Reveal>
                 </div>
             ))}
        </div>

        {supportingCopy && (
          <Reveal delay={0.2} width="100%">
            <p className="text-slate-500 text-base font-light text-center max-w-2xl mx-auto dark:text-slate-400">
              {supportingCopy}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
};
