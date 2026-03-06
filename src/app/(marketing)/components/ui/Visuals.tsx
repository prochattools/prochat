import React from 'react';

export const FakeLogos = () => (
  <div className="flex gap-8 opacity-50 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100 items-center justify-center dark:opacity-60">
    <div className="flex items-center gap-2 group cursor-default">
      <div className="w-4 h-4 bg-foreground rounded-sm group-hover:bg-primary transition-colors" />
      <span className="font-bold text-muted-foreground text-xs tracking-tight group-hover:text-foreground transition-colors">VOLTA</span>
    </div>
    <div className="flex items-center gap-2 group cursor-default">
      <div className="w-4 h-4 rounded-full border-2 border-foreground group-hover:border-primary transition-colors" />
      <span className="font-bold text-muted-foreground text-xs tracking-tight group-hover:text-foreground transition-colors">ORBIT</span>
    </div>
    <div className="flex items-center gap-2 group cursor-default">
      <div className="w-4 h-4 bg-foreground rotate-45 rounded-sm group-hover:bg-primary transition-colors" />
      <span className="font-bold text-muted-foreground text-xs tracking-tight group-hover:text-foreground transition-colors">NEXUS</span>
    </div>
  </div>
);

export const DashboardMockup = () => (
  <div className="w-full h-full bg-surface-soft/70 relative flex flex-col font-sans select-none overflow-hidden">
    {/* Nav - Real SaaS Style */}
    <div className="h-12 border-b border-border-subtle bg-surface flex items-center px-5 justify-between shrink-0 z-10">
        
        {/* Left: Breadcrumb / Context */}
        <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-foreground rounded-md shadow-sm flex items-center justify-center text-primary-foreground">
                <div className="w-2.5 h-2.5 border-2 border-white/80 rounded-full" />
            </div>
            <div className="h-4 w-px bg-border-subtle" />
            <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground font-medium">Dashboard</span>
                <span className="text-tertiary">/</span>
                <span className="text-foreground font-semibold">Overview</span>
            </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 bg-surface-soft p-0.5 rounded-lg border border-border-subtle">
                <div className="px-2 py-1 rounded-md bg-surface border border-border-subtle text-[10px] font-bold text-foreground shadow-sm">7d</div>
                <div className="px-2 py-1 rounded-md text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-default">30d</div>
            </div>
            <div className="h-4 w-px bg-border-subtle hidden sm:block" />
            <div className="flex items-center gap-2">
                 <div className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-surface-soft text-muted-foreground hover:text-foreground transition-colors cursor-default border border-transparent hover:border-border-subtle">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                 </div>
                 <div className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-surface-soft text-muted-foreground hover:text-foreground transition-colors cursor-default border border-transparent hover:border-border-subtle">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                 </div>
                 <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-secondary ring-2 ring-surface shadow-sm ml-1" />
            </div>
        </div>
    </div>

    {/* Body */}
    <div className="p-4 sm:p-5 flex-1 overflow-hidden flex flex-col gap-4">
        <div className="flex justify-between items-end">
            <div>
                <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-1">Total Revenue</div>
                <div className="text-2xl font-bold text-foreground tracking-tight">€24,500.00</div>
            </div>
            <div className="px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-bold rounded-full shadow-sm dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-400/20">+12.5%</div>
        </div>
        {/* Charts */}
        <div className="flex-1 flex items-end gap-1 sm:gap-2 pb-px border-b border-border-subtle/80 border-dashed">
            {[35, 55, 45, 70, 60, 85, 95, 75, 60, 80, 50, 65].map((h, i) => (
                <div key={i} className="flex-1 bg-primary/10 hover:bg-primary transition-all duration-300 rounded-t-sm relative group cursor-crosshair dark:bg-primary/20" style={{ height: `${h}%` }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 bg-foreground text-primary-foreground text-[9px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                        ${h}k
                    </div>
                </div>
            ))}
        </div>
        <div className="grid grid-cols-2 gap-3 h-20 shrink-0">
             <div className="bg-surface rounded border border-border-subtle p-3 shadow-sm flex flex-col justify-between">
                <div className="w-7 h-7 rounded bg-orange-50 text-orange-500 border border-orange-100 flex items-center justify-center dark:bg-orange-500/10 dark:text-orange-300 dark:border-orange-400/20">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div className="w-10 h-1.5 bg-muted rounded-full" />
             </div>
             <div className="bg-surface rounded border border-border-subtle p-3 shadow-sm flex flex-col justify-between">
                <div className="w-7 h-7 rounded bg-surface-soft text-primary border border-border-subtle flex items-center justify-center dark:bg-primary/10 dark:border-primary/20">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </div>
                <div className="w-10 h-1.5 bg-muted rounded-full" />
             </div>
        </div>
    </div>
  </div>
);

export const AuthMockup = () => (
  <div className="w-full h-full bg-surface flex flex-col items-center justify-center p-6 sm:p-8 font-sans select-none relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(29,78,216,0.03),transparent_40%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(29,78,216,0.12),transparent_45%)]" />
      
      <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl mb-6 shadow-lg shadow-primary/20" />
      
      <div className="w-full space-y-3 relative z-10">
          <div className="space-y-1.5">
              <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider ml-0.5">Work Email</div>
              <div className="h-9 w-full bg-surface border border-border-subtle focus:border-primary rounded-lg flex items-center px-3 text-[11px] text-foreground shadow-sm transition-colors">
                  steve@example.com
              </div>
          </div>
          <div className="space-y-1.5">
              <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider ml-0.5">Password</div>
              <div className="h-9 w-full bg-surface border border-border-subtle rounded-lg flex items-center px-3 shadow-sm">
                  <div className="flex gap-1.5">
                      {[1,2,3,4,5,6].map(i => <div key={i} className="w-1.5 h-1.5 bg-border-strong rounded-full" />)}
                  </div>
              </div>
          </div>
          <div className="h-9 w-full bg-primary hover:bg-primary/90 transition-colors rounded-lg flex items-center justify-center text-primary-foreground text-[11px] font-bold mt-2 shadow-md cursor-default">
              Sign In
          </div>
          
          <div className="flex justify-center gap-3 mt-3 items-center opacity-60">
             <div className="w-full h-px bg-border-subtle" />
             <div className="text-[8px] text-muted-foreground font-medium whitespace-nowrap">OR</div>
             <div className="w-full h-px bg-border-subtle" />
          </div>
          
          <div className="h-9 w-full bg-surface border border-border-subtle hover:border-border transition-colors rounded-lg flex items-center justify-center gap-2 text-muted-foreground text-[10px] font-bold shadow-sm cursor-default">
              <div className="w-3 h-3 rounded-full border border-border-strong flex items-center justify-center text-[8px] font-serif">G</div> Google
          </div>
      </div>
  </div>
);

export const BillingMockup = () => (
    <div className="w-full h-full bg-surface-soft/70 p-6 font-sans select-none flex flex-col relative">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-surface to-transparent pointer-events-none" />
        
        <div className="mb-5 flex items-center justify-between relative z-10">
             <div className="text-xs font-bold text-foreground">Current Plan</div>
             <div className="px-2 py-0.5 bg-emerald-100/50 text-emerald-700 text-[9px] font-bold rounded-full border border-emerald-200/50 flex items-center gap-1 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-400/20">
                 <div className="w-1 h-1 bg-emerald-500 rounded-full" /> ACTIVE
             </div>
        </div>
        
        <div className="bg-surface border border-border-subtle rounded-xl p-4 shadow-sm mb-4 relative z-10 group hover:border-primary/30 transition-colors">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <div className="text-[10px] text-muted-foreground font-medium mb-0.5">Pro Foundation</div>
                    <div className="text-xl font-bold text-foreground tracking-tight">€29<span className="text-xs font-medium text-tertiary">/mo</span></div>
                </div>
                <div className="w-5 h-5 bg-surface-soft rounded-full flex items-center justify-center text-primary">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-primary rounded-full" />
            </div>
            <div className="mt-2.5 flex justify-between items-center">
                <div className="text-[9px] text-tertiary font-medium">Renews Oct 24</div>
                <div className="text-[9px] text-primary font-bold cursor-default hover:underline">Manage</div>
            </div>
        </div>
        
        <div className="space-y-2.5 relative z-10">
             <div className="h-8 w-full border border-border-subtle bg-surface rounded-lg flex items-center px-3 justify-between shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-muted rounded-sm" />
                    <div className="w-16 h-1.5 bg-muted rounded-full" />
                </div>
                <div className="w-8 h-1.5 bg-muted rounded-full" />
             </div>
             <div className="h-8 w-full border border-border-subtle bg-surface rounded-lg flex items-center px-3 justify-between shadow-sm opacity-60">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-muted rounded-sm" />
                    <div className="w-12 h-1.5 bg-muted rounded-full" />
                </div>
                <div className="w-8 h-1.5 bg-muted rounded-full" />
             </div>
        </div>
    </div>
);

export const EmailMockup = () => (
    <div className="w-full h-full bg-surface flex flex-col font-sans select-none">
        <div className="h-9 border-b border-border-subtle flex items-center px-4 gap-1.5 bg-surface-soft/70">
            <div className="w-2 h-2 rounded-full bg-border-strong" />
            <div className="w-2 h-2 rounded-full bg-border-strong" />
            <div className="w-2 h-2 rounded-full bg-border-strong" />
        </div>
        <div className="p-5 flex-1 flex flex-col items-center text-center pt-8">
             <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl mb-5 shadow-lg shadow-primary/20" />
             <div className="space-y-2 w-full max-w-[140px] mb-6">
                 <div className="w-full h-2.5 bg-slate-800 rounded-sm dark:bg-slate-200" />
                 <div className="w-2/3 h-2.5 bg-slate-800 rounded-sm mx-auto dark:bg-slate-200" />
             </div>
             <div className="space-y-1.5 w-full max-w-[160px] mb-6">
                 <div className="w-full h-1.5 bg-muted rounded-sm" />
                 <div className="w-full h-1.5 bg-muted rounded-sm" />
                 <div className="w-4/5 h-1.5 bg-muted rounded-sm mx-auto" />
             </div>
             <div>
                 <div className="px-4 py-1.5 bg-primary rounded-md text-primary-foreground text-[9px] font-bold shadow-md shadow-primary/20">
                     Confirm Email
                 </div>
             </div>
        </div>
    </div>
);
