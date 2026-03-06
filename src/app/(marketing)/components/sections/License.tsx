import React from 'react';
import { ShieldCheck, Check } from 'lucide-react';

export const License: React.FC = () => {
  return (
    <section className="py-16 bg-background border-t border-border-subtle">
        <div className="max-w-4xl mx-auto px-page">
            <div className="bg-surface-soft border border-border-subtle rounded-lg p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-surface border-2 border-border-subtle flex items-center justify-center flex-shrink-0 text-muted-foreground">
                        <ShieldCheck size={32} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-foreground mb-1">Code Ownership</h2>
                        <p className="text-sm text-muted-foreground font-light max-w-sm">
                            You get full source code access. Build unlimited projects. No recurring fees or royalties.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                    {["MIT Licensed", "No royalties", "Unlimited projects"].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-surface border border-border-subtle rounded text-xs font-bold text-muted-foreground uppercase tracking-wide">
                            <Check size={12} className="text-emerald-500" />
                            {item}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    </section>
  );
};
