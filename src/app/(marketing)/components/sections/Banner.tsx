import React from 'react';
import { ShieldCheck, Zap, Layers } from 'lucide-react';

export const Banner: React.FC = () => {
  return (
    <section className="py-10 border-y border-slate-100 bg-slate-50/50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          
          <div className="flex items-center gap-3 group cursor-default">
            <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-400 group-hover:text-slate-600 group-hover:border-slate-300 transition-colors">
              <ShieldCheck size={20} />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">MIT Licensed</div>
              <div className="text-xs text-slate-500">Code is yours forever</div>
            </div>
          </div>

          <div className="flex items-center gap-3 group cursor-default">
            <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-400 group-hover:text-[#5b49f5] group-hover:border-[#5b49f5]/30 transition-colors">
              <Zap size={20} />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Ship Faster</div>
              <div className="text-xs text-slate-500">Save 40+ hours dev time</div>
            </div>
          </div>

          <div className="flex items-center gap-3 group cursor-default">
            <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-400 group-hover:text-slate-600 group-hover:border-slate-300 transition-colors">
              <Layers size={20} />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Scalable</div>
              <div className="text-xs text-slate-500">Built on Next.js 14</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};