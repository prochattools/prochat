import React from 'react';

export const FakeLogos = () => (
  <div className="flex gap-8 opacity-50 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100 items-center justify-center">
    <div className="flex items-center gap-2 group cursor-default">
      <div className="w-4 h-4 bg-slate-800 dark:bg-slate-200 rounded-sm group-hover:bg-[#5b49f5] transition-colors" />
      <span className="font-bold text-slate-700 dark:text-slate-300 text-xs tracking-tight group-hover:text-slate-900 dark:group-hover:text-white transition-colors">VOLTA</span>
    </div>
    <div className="flex items-center gap-2 group cursor-default">
      <div className="w-4 h-4 rounded-full border-2 border-slate-800 dark:border-slate-200 group-hover:border-[#5b49f5] transition-colors" />
      <span className="font-bold text-slate-700 dark:text-slate-300 text-xs tracking-tight group-hover:text-slate-900 dark:group-hover:text-white transition-colors">ORBIT</span>
    </div>
    <div className="flex items-center gap-2 group cursor-default">
      <div className="w-4 h-4 bg-slate-800 dark:bg-slate-200 rotate-45 rounded-sm group-hover:bg-[#5b49f5] transition-colors" />
      <span className="font-bold text-slate-700 dark:text-slate-300 text-xs tracking-tight group-hover:text-slate-900 dark:group-hover:text-white transition-colors">NEXUS</span>
    </div>
  </div>
);

export const DashboardMockup = () => (
  <div className="w-full h-full bg-slate-50/50 dark:bg-[#0B111B] relative flex flex-col font-sans select-none overflow-hidden">
    {/* Nav - Real SaaS Style */}
    <div className="h-12 border-b border-slate-200 dark:border-[#1E242D] bg-white dark:bg-[#0B111B] flex items-center px-5 justify-between shrink-0 z-10">
        
        {/* Left: Breadcrumb / Context */}
        <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-slate-900 dark:bg-[#1E242D] rounded-md shadow-sm dark:shadow-none flex items-center justify-center text-white">
                <div className="w-2.5 h-2.5 border-2 border-white/80 rounded-full" />
            </div>
            <div className="h-4 w-px bg-slate-200 dark:bg-[#1E242D]" />
            <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-500 dark:text-[#808389] font-medium">Dashboard</span>
                <span className="text-slate-300 dark:text-[#5A5E66]">/</span>
                <span className="text-slate-900 dark:text-white font-semibold">Overview</span>
            </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 bg-slate-50 dark:bg-[#1E242D] p-0.5 rounded-lg border border-slate-200/60 dark:border-[#373C53]">
                <div className="px-2 py-1 rounded-md bg-white dark:bg-[#0B111B] border border-slate-200 dark:border-[#373C53] text-[10px] font-bold text-slate-700 dark:text-white shadow-sm dark:shadow-none">7d</div>
                <div className="px-2 py-1 rounded-md text-[10px] font-medium text-slate-500 dark:text-[#808389] hover:text-slate-700 dark:hover:text-white transition-colors cursor-default">30d</div>
            </div>
            <div className="h-4 w-px bg-slate-200 dark:bg-[#1E242D] hidden sm:block" />
            <div className="flex items-center gap-2">
                 <div className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-slate-50 dark:hover:bg-[#1E242D] text-slate-400 dark:text-[#808389] hover:text-slate-600 dark:hover:text-white transition-colors cursor-default border border-transparent hover:border-slate-100 dark:hover:border-[#373C53]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                 </div>
                 <div className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-slate-50 dark:hover:bg-[#1E242D] text-slate-400 dark:text-[#808389] hover:text-slate-600 dark:hover:text-white transition-colors cursor-default border border-transparent hover:border-slate-100 dark:hover:border-[#373C53]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                 </div>
                 <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 ring-2 ring-white dark:ring-[#0B111B] shadow-sm dark:shadow-none ml-1" />
            </div>
        </div>
    </div>

    {/* Body */}
    <div className="p-4 sm:p-5 flex-1 overflow-hidden flex flex-col gap-4">
        <div className="flex justify-between items-end">
            <div>
                <div className="text-[10px] text-slate-400 dark:text-[#808389] font-semibold uppercase tracking-wider mb-1">Total Revenue</div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">$24,500.00</div>
            </div>
            <div className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20 text-[10px] font-bold rounded-full shadow-sm dark:shadow-none">+12.5%</div>
        </div>
        {/* Charts */}
        <div className="flex-1 flex items-end gap-1 sm:gap-2 pb-px border-b border-slate-200/60 dark:border-[#1E242D] border-dashed">
            {[35, 55, 45, 70, 60, 85, 95, 75, 60, 80, 50, 65].map((h, i) => (
                <div key={i} className="flex-1 bg-[#5b49f5]/5 dark:bg-[#5b49f5]/15 hover:bg-[#5b49f5] transition-all duration-300 rounded-t-sm relative group cursor-crosshair" style={{ height: `${h}%` }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 bg-slate-800 dark:bg-[#1E242D] text-white text-[9px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                        ${h}k
                    </div>
                </div>
            ))}
        </div>
        <div className="grid grid-cols-2 gap-3 h-20 shrink-0">
             <div className="bg-white dark:bg-[#0B111B] rounded border border-slate-200 dark:border-[#373C53] p-3 shadow-sm dark:shadow-none flex flex-col justify-between">
                <div className="w-7 h-7 rounded bg-orange-50 dark:bg-orange-500/10 text-orange-500 dark:text-orange-400 border border-orange-100 dark:border-orange-500/20 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div className="w-10 h-1.5 bg-slate-100 dark:bg-[#1E242D] rounded-full" />
             </div>
             <div className="bg-white dark:bg-[#0B111B] rounded border border-slate-200 dark:border-[#373C53] p-3 shadow-sm dark:shadow-none flex flex-col justify-between">
                <div className="w-7 h-7 rounded bg-blue-50 dark:bg-blue-500/10 text-blue-500 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </div>
                <div className="w-10 h-1.5 bg-slate-100 dark:bg-[#1E242D] rounded-full" />
             </div>
        </div>
    </div>
  </div>
);

export const AuthMockup = () => (
  <div className="w-full h-full bg-white dark:bg-[#0B111B] flex flex-col items-center justify-center p-6 sm:p-8 font-sans select-none relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(91,73,245,0.03),transparent_40%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(91,73,245,0.15),transparent_45%)]" />
      
      <div className="w-10 h-10 bg-gradient-to-br from-[#5b49f5] to-[#885efe] rounded-xl mb-6 shadow-lg shadow-indigo-500/20" />
      
      <div className="w-full space-y-3 relative z-10">
          <div className="space-y-1.5">
              <div className="text-[9px] font-bold text-slate-500 dark:text-[#808389] uppercase tracking-wider ml-0.5">Work Email</div>
              <div className="h-9 w-full bg-white dark:bg-[#0B111B] border border-slate-200 dark:border-[#373C53] focus:border-[#5b49f5] rounded-lg flex items-center px-3 text-[11px] text-slate-800 dark:text-white shadow-sm dark:shadow-none transition-colors">
                  steve@example.com
              </div>
          </div>
          <div className="space-y-1.5">
              <div className="text-[9px] font-bold text-slate-500 dark:text-[#808389] uppercase tracking-wider ml-0.5">Password</div>
              <div className="h-9 w-full bg-white dark:bg-[#0B111B] border border-slate-200 dark:border-[#373C53] rounded-lg flex items-center px-3 shadow-sm dark:shadow-none">
                  <div className="flex gap-1.5">
                      {[1,2,3,4,5,6].map(i => <div key={i} className="w-1.5 h-1.5 bg-slate-300 dark:bg-[#5A5E66] rounded-full" />)}
                  </div>
              </div>
          </div>
          <div className="h-9 w-full bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors rounded-lg flex items-center justify-center text-white dark:text-[#0B111B] text-[11px] font-bold mt-2 shadow-md dark:shadow-none cursor-default">
              Sign In
          </div>
          
          <div className="flex justify-center gap-3 mt-3 items-center opacity-60">
             <div className="w-full h-px bg-slate-200 dark:bg-[#1E242D]" />
             <div className="text-[8px] text-slate-400 dark:text-[#5A5E66] font-medium whitespace-nowrap">OR</div>
             <div className="w-full h-px bg-slate-200 dark:bg-[#1E242D]" />
          </div>
          
          <div className="h-9 w-full bg-white dark:bg-[#0B111B] border border-slate-200 dark:border-[#373C53] hover:border-slate-300 dark:hover:border-[#5b6285] transition-colors rounded-lg flex items-center justify-center gap-2 text-slate-600 dark:text-[#B2B5BA] text-[10px] font-bold shadow-sm dark:shadow-none cursor-default">
              <div className="w-3 h-3 rounded-full border border-slate-300 dark:border-[#5A5E66] flex items-center justify-center text-[8px] font-serif dark:text-[#B2B5BA]">G</div> Google
          </div>
      </div>
  </div>
);

export const BillingMockup = () => (
    <div className="w-full h-full bg-slate-50/50 dark:bg-[#0B111B] p-6 font-sans select-none flex flex-col relative">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white dark:from-[#0B111B] to-transparent pointer-events-none" />
        
        <div className="mb-5 flex items-center justify-between relative z-10">
             <div className="text-xs font-bold text-slate-900 dark:text-white">Current Plan</div>
             <div className="px-2 py-0.5 bg-emerald-100/50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[9px] font-bold rounded-full border border-emerald-200/50 dark:border-emerald-500/20 flex items-center gap-1">
                 <div className="w-1 h-1 bg-emerald-500 rounded-full" /> ACTIVE
             </div>
        </div>
        
        <div className="bg-white dark:bg-[#1E242D] border border-slate-200 dark:border-[#373C53] rounded-xl p-4 shadow-sm dark:shadow-none mb-4 relative z-10 group hover:border-[#5b49f5]/30 transition-colors">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <div className="text-[10px] text-slate-500 dark:text-[#808389] font-medium mb-0.5">Pro Foundation</div>
                    <div className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">$29<span className="text-xs font-medium text-slate-400 dark:text-[#5A5E66]">/mo</span></div>
                </div>
                <div className="w-5 h-5 bg-slate-50 dark:bg-[#0B111B] rounded-full flex items-center justify-center text-[#5b49f5] dark:text-[#885efe]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-[#0B111B] rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-[#5b49f5] rounded-full" />
            </div>
            <div className="mt-2.5 flex justify-between items-center">
                <div className="text-[9px] text-slate-400 dark:text-[#5A5E66] font-medium">Renews Oct 24</div>
                <div className="text-[9px] text-[#5b49f5] dark:text-[#885efe] font-bold cursor-default hover:underline">Manage</div>
            </div>
        </div>
        
        <div className="space-y-2.5 relative z-10">
             <div className="h-8 w-full border border-slate-200 dark:border-[#373C53] bg-white dark:bg-[#0B111B] rounded-lg flex items-center px-3 justify-between shadow-sm dark:shadow-none">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-slate-100 dark:bg-[#1E242D] rounded-sm" />
                    <div className="w-16 h-1.5 bg-slate-100 dark:bg-[#1E242D] rounded-full" />
                </div>
                <div className="w-8 h-1.5 bg-slate-100 dark:bg-[#1E242D] rounded-full" />
             </div>
             <div className="h-8 w-full border border-slate-200 dark:border-[#373C53] bg-white dark:bg-[#0B111B] rounded-lg flex items-center px-3 justify-between shadow-sm dark:shadow-none opacity-60">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-slate-100 dark:bg-[#1E242D] rounded-sm" />
                    <div className="w-12 h-1.5 bg-slate-100 dark:bg-[#1E242D] rounded-full" />
                </div>
                <div className="w-8 h-1.5 bg-slate-100 dark:bg-[#1E242D] rounded-full" />
             </div>
        </div>
    </div>
);

export const EmailMockup = () => (
    <div className="w-full h-full bg-white dark:bg-[#0B111B] flex flex-col font-sans select-none">
        <div className="h-9 border-b border-slate-100 dark:border-[#1E242D] flex items-center px-4 gap-1.5 bg-slate-50/50 dark:bg-[#1E242D]">
            <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-[#5A5E66]" />
            <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-[#5A5E66]" />
            <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-[#5A5E66]" />
        </div>
        <div className="p-5 flex-1 flex flex-col items-center text-center pt-8">
             <div className="w-10 h-10 bg-gradient-to-br from-[#5b49f5] to-[#885efe] rounded-xl mb-5 shadow-lg shadow-indigo-500/20" />
             <div className="space-y-2 w-full max-w-[140px] mb-6">
                 <div className="w-full h-2.5 bg-slate-800 dark:bg-slate-100 rounded-sm" />
                 <div className="w-2/3 h-2.5 bg-slate-800 dark:bg-slate-100 rounded-sm mx-auto" />
             </div>
             <div className="space-y-1.5 w-full max-w-[160px] mb-6">
                 <div className="w-full h-1.5 bg-slate-200 dark:bg-[#1E242D] rounded-sm" />
                 <div className="w-full h-1.5 bg-slate-200 dark:bg-[#1E242D] rounded-sm" />
                 <div className="w-4/5 h-1.5 bg-slate-200 dark:bg-[#1E242D] rounded-sm mx-auto" />
             </div>
             <div>
                 <div className="px-4 py-1.5 bg-[#5b49f5] rounded-md text-white text-[9px] font-bold shadow-md shadow-indigo-500/20">
                     Confirm Email
                 </div>
             </div>
        </div>
    </div>
);
