import React from 'react';
import { Check, X } from 'lucide-react';
import { BlueprintCard } from '../ui/Scaffolding';

export const AudienceFilter: React.FC = () => {
  return (
    <section className="py-24 border-y border-slate-200 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="text-center mb-12 space-y-2">
          <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">We’d rather be clear than oversell</p>
          <h2 className="text-2xl font-bold text-slate-900">This is not for everyone.</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* NOT FOR YOU */}
          <div className="p-8 rounded-lg border border-dashed border-slate-200 bg-slate-50/50">
            <h3 className="text-sm font-bold text-slate-500 mb-6 flex items-center gap-2 uppercase tracking-wide">
              Not for you if...
            </h3>
            <ul className="space-y-4">
              {[
                "You want a drag-and-drop no-code toy",
                "You don’t want to ship anything yourself",
                "You expect a hosted SaaS builder"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-500">
                  <X size={14} className="mt-0.5 text-slate-300 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* IS FOR YOU */}
          <BlueprintCard className="p-8 bg-white border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-[#1D4ED8] mb-6 flex items-center gap-2 uppercase tracking-wide">
              ProKit is for you if...
            </h3>
            <ul className="space-y-4">
              {[
                "You can follow simple instructions",
                "You want full ownership of your product",
                "You want agency-grade results without agency costs"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-800 font-medium">
                  <Check size={14} className="mt-0.5 text-[#1D4ED8] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </BlueprintCard>

        </div>
      </div>
    </section>
  );
};