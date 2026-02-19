import React from 'react';

export const FakeLogos = () => (
  <div className="flex gap-8 opacity-50 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100 items-center justify-center dark:opacity-60">
    <div className="flex items-center gap-2 group cursor-default">
      <div className="w-4 h-4 bg-slate-800 rounded-sm group-hover:bg-[#1D4ED8] transition-colors dark:bg-slate-300" />
      <span className="font-bold text-slate-700 text-xs tracking-tight group-hover:text-slate-900 transition-colors dark:text-slate-300 dark:group-hover:text-white">VOLTA</span>
    </div>
    <div className="flex items-center gap-2 group cursor-default">
      <div className="w-4 h-4 rounded-full border-2 border-slate-800 group-hover:border-[#1D4ED8] transition-colors dark:border-slate-300" />
      <span className="font-bold text-slate-700 text-xs tracking-tight group-hover:text-slate-900 transition-colors dark:text-slate-300 dark:group-hover:text-white">ORBIT</span>
    </div>
    <div className="flex items-center gap-2 group cursor-default">
      <div className="w-4 h-4 bg-slate-800 rotate-45 rounded-sm group-hover:bg-[#1D4ED8] transition-colors dark:bg-slate-300" />
      <span className="font-bold text-slate-700 text-xs tracking-tight group-hover:text-slate-900 transition-colors dark:text-slate-300 dark:group-hover:text-white">NEXUS</span>
    </div>
  </div>
);

export const DashboardMockup = () => (
  <div className="w-full h-full bg-slate-50/50 dark:bg-[#0B111B] relative flex flex-col font-sans select-none overflow-hidden">
    {/* Nav - Real SaaS Style */}
    <div className="h-12 border-b border-slate-200 bg-white flex items-center px-5 justify-between shrink-0 z-10 dark:border-[#1E2A42] dark:bg-[#0F1626]">
        
        {/* Left: Breadcrumb / Context */}
        <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-slate-900 rounded-md shadow-sm flex items-center justify-center text-white dark:bg-[#182235] dark:text-slate-100 dark:shadow-none">
                <div className="w-2.5 h-2.5 border-2 border-white/80 rounded-full" />
            </div>
            <div className="h-4 w-px bg-slate-200 dark:bg-[#1E2A42]" />
            <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-500 font-medium dark:text-slate-400">Dashboard</span>
                <span className="text-slate-300 dark:text-slate-600">/</span>
                <span className="text-slate-900 font-semibold dark:text-slate-100">Overview</span>
            </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 bg-slate-50 p-0.5 rounded-lg border border-slate-200/60 dark:bg-[#10192B] dark:border-[#1E2A42]">
                <div className="px-2 py-1 rounded-md bg-white border border-slate-200 text-[10px] font-bold text-slate-700 shadow-sm dark:bg-[#141D31] dark:border-[#24304A] dark:text-slate-200 dark:shadow-none">7d</div>
                <div className="px-2 py-1 rounded-md text-[10px] font-medium text-slate-500 hover:text-slate-700 transition-colors cursor-default dark:text-slate-400 dark:hover:text-slate-200">30d</div>
            </div>
            <div className="h-4 w-px bg-slate-200 hidden sm:block dark:bg-[#1E2A42]" />
            <div className="flex items-center gap-2">
                 <div className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors cursor-default border border-transparent hover:border-slate-100 dark:hover:bg-[#131B2D] dark:text-slate-500 dark:hover:text-slate-200 dark:hover:border-[#1E2A42]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                 </div>
                 <div className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors cursor-default border border-transparent hover:border-slate-100 dark:hover:bg-[#131B2D] dark:text-slate-500 dark:hover:text-slate-200 dark:hover:border-[#1E2A42]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                 </div>
                 <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#1D4ED8] to-[#2563EB] ring-2 ring-white shadow-sm ml-1 dark:ring-[#0F1424]" />
            </div>
        </div>
    </div>

    {/* Body */}
    <div className="p-4 sm:p-5 flex-1 overflow-hidden flex flex-col gap-4">
        <div className="flex justify-between items-end">
            <div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1 dark:text-slate-500">Total Revenue</div>
                <div className="text-2xl font-bold text-slate-900 tracking-tight dark:text-slate-100">€24,500.00</div>
            </div>
            <div className="px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-bold rounded-full shadow-sm dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-400/20">+12.5%</div>
        </div>
        {/* Charts */}
        <div className="flex-1 flex items-end gap-1 sm:gap-2 pb-px border-b border-slate-200/60 border-dashed dark:border-[#1E2A42]/80">
            {[35, 55, 45, 70, 60, 85, 95, 75, 60, 80, 50, 65].map((h, i) => (
                <div key={i} className="flex-1 bg-[#1D4ED8]/5 hover:bg-[#1D4ED8] transition-all duration-300 rounded-t-sm relative group cursor-crosshair dark:bg-[#1D4ED8]/20 dark:hover:bg-[#1D4ED8]" style={{ height: `${h}%` }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 bg-slate-800 text-white text-[9px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none dark:bg-[#121826] dark:text-slate-100">
                        ${h}k
                    </div>
                </div>
            ))}
        </div>
        <div className="grid grid-cols-2 gap-3 h-20 shrink-0">
             <div className="bg-white rounded border border-slate-200 p-3 shadow-sm flex flex-col justify-between dark:bg-[#0F1626] dark:border-[#1E2A42] dark:shadow-none">
                <div className="w-7 h-7 rounded bg-orange-50 text-orange-500 border border-orange-100 flex items-center justify-center dark:bg-orange-500/10 dark:text-orange-300 dark:border-orange-400/20">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div className="w-10 h-1.5 bg-slate-100 rounded-full dark:bg-[#1E2A42]" />
             </div>
             <div className="bg-white rounded border border-slate-200 p-3 shadow-sm flex flex-col justify-between dark:bg-[#0F1626] dark:border-[#1E2A42] dark:shadow-none">
                <div className="w-7 h-7 rounded bg-gray-50 text-[#1D4ED8] border border-gray-200 flex items-center justify-center dark:bg-[#1D4ED8]/10 dark:text-[#2563EB] dark:border-[#1D4ED8]/20">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </div>
                <div className="w-10 h-1.5 bg-slate-100 rounded-full dark:bg-[#1E2A42]" />
             </div>
        </div>
    </div>
  </div>
);

export const AuthMockup = () => (
  <div className="w-full h-full bg-white flex flex-col items-center justify-center p-6 sm:p-8 font-sans select-none relative dark:bg-[#0F1424]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(29,78,216,0.03),transparent_40%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(29,78,216,0.12),transparent_45%)]" />
      
      <div className="w-10 h-10 bg-gradient-to-br from-[#1D4ED8] to-[#2563EB] rounded-xl mb-6 shadow-lg shadow-[#1D4ED8]/20" />
      
      <div className="w-full space-y-3 relative z-10">
          <div className="space-y-1.5">
              <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider ml-0.5 dark:text-slate-400">Work Email</div>
              <div className="h-9 w-full bg-white border border-slate-200 focus:border-[#1D4ED8] rounded-lg flex items-center px-3 text-[11px] text-slate-800 shadow-sm transition-colors dark:bg-[#0B111B] dark:border-[#1E2A42] dark:text-slate-100 dark:shadow-none">
                  steve@example.com
              </div>
          </div>
          <div className="space-y-1.5">
              <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider ml-0.5 dark:text-slate-400">Password</div>
              <div className="h-9 w-full bg-white border border-slate-200 rounded-lg flex items-center px-3 shadow-sm dark:bg-[#0B111B] dark:border-[#1E2A42] dark:shadow-none">
                  <div className="flex gap-1.5">
                      {[1,2,3,4,5,6].map(i => <div key={i} className="w-1.5 h-1.5 bg-slate-300 rounded-full dark:bg-slate-600" />)}
                  </div>
              </div>
          </div>
          <div className="h-9 w-full bg-slate-900 hover:bg-slate-800 transition-colors rounded-lg flex items-center justify-center text-white text-[11px] font-bold mt-2 shadow-md cursor-default dark:bg-[#1D4ED8] dark:hover:bg-[#2563EB] dark:text-white dark:shadow-none">
              Sign In
          </div>
          
          <div className="flex justify-center gap-3 mt-3 items-center opacity-60">
             <div className="w-full h-px bg-slate-200 dark:bg-[#1E2A42]" />
             <div className="text-[8px] text-slate-400 font-medium whitespace-nowrap dark:text-slate-500">OR</div>
             <div className="w-full h-px bg-slate-200 dark:bg-[#1E2A42]" />
          </div>
          
          <div className="h-9 w-full bg-white border border-slate-200 hover:border-slate-300 transition-colors rounded-lg flex items-center justify-center gap-2 text-slate-600 text-[10px] font-bold shadow-sm cursor-default dark:bg-[#0F1626] dark:border-[#1E2A42] dark:text-slate-200 dark:hover:border-[#2A3445] dark:shadow-none">
              <div className="w-3 h-3 rounded-full border border-slate-300 flex items-center justify-center text-[8px] font-serif dark:border-[#2A3445] dark:text-slate-200">G</div> Google
          </div>
      </div>
  </div>
);

export const BillingMockup = () => (
    <div className="w-full h-full bg-slate-50/50 p-6 font-sans select-none flex flex-col relative dark:bg-[#0C121F]">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent pointer-events-none dark:from-[#0F1424]" />
        
        <div className="mb-5 flex items-center justify-between relative z-10">
             <div className="text-xs font-bold text-slate-900 dark:text-slate-100">Current Plan</div>
             <div className="px-2 py-0.5 bg-emerald-100/50 text-emerald-700 text-[9px] font-bold rounded-full border border-emerald-200/50 flex items-center gap-1 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-400/20">
                 <div className="w-1 h-1 bg-emerald-500 rounded-full" /> ACTIVE
             </div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-4 relative z-10 group hover:border-[#1D4ED8]/30 transition-colors dark:bg-[#0F1626] dark:border-[#1E2A42] dark:shadow-none dark:hover:border-[#1D4ED8]/40">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <div className="text-[10px] text-slate-500 font-medium mb-0.5 dark:text-slate-400">Pro Foundation</div>
                    <div className="text-xl font-bold text-slate-900 tracking-tight dark:text-slate-100">€29<span className="text-xs font-medium text-slate-400 dark:text-slate-500">/mo</span></div>
                </div>
                <div className="w-5 h-5 bg-slate-50 rounded-full flex items-center justify-center text-[#1D4ED8] dark:bg-[#111827]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden dark:bg-[#1E2A42]">
                <div className="w-3/4 h-full bg-[#1D4ED8] rounded-full" />
            </div>
            <div className="mt-2.5 flex justify-between items-center">
                <div className="text-[9px] text-slate-400 font-medium dark:text-slate-500">Renews Oct 24</div>
                <div className="text-[9px] text-[#1D4ED8] font-bold cursor-default hover:underline dark:text-[#2563EB]">Manage</div>
            </div>
        </div>
        
        <div className="space-y-2.5 relative z-10">
             <div className="h-8 w-full border border-slate-200 bg-white rounded-lg flex items-center px-3 justify-between shadow-sm dark:border-[#1E2A42] dark:bg-[#0B111B] dark:shadow-none">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-slate-100 rounded-sm dark:bg-[#1E2A42]" />
                    <div className="w-16 h-1.5 bg-slate-100 rounded-full dark:bg-[#1E2A42]" />
                </div>
                <div className="w-8 h-1.5 bg-slate-100 rounded-full dark:bg-[#1E2A42]" />
             </div>
             <div className="h-8 w-full border border-slate-200 bg-white rounded-lg flex items-center px-3 justify-between shadow-sm opacity-60 dark:border-[#1E2A42] dark:bg-[#0B111B] dark:shadow-none">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-slate-100 rounded-sm dark:bg-[#1E2A42]" />
                    <div className="w-12 h-1.5 bg-slate-100 rounded-full dark:bg-[#1E2A42]" />
                </div>
                <div className="w-8 h-1.5 bg-slate-100 rounded-full dark:bg-[#1E2A42]" />
             </div>
        </div>
    </div>
);

export const EmailMockup = () => (
    <div className="w-full h-full bg-white flex flex-col font-sans select-none dark:bg-[#0F1424]">
        <div className="h-9 border-b border-slate-100 flex items-center px-4 gap-1.5 bg-slate-50/50 dark:border-[#1E2A42] dark:bg-[#0B111B]">
            <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
            <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
            <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
        </div>
        <div className="p-5 flex-1 flex flex-col items-center text-center pt-8">
             <div className="w-10 h-10 bg-gradient-to-br from-[#1D4ED8] to-[#2563EB] rounded-xl mb-5 shadow-lg shadow-[#1D4ED8]/20" />
             <div className="space-y-2 w-full max-w-[140px] mb-6">
                 <div className="w-full h-2.5 bg-slate-800 rounded-sm dark:bg-slate-200" />
                 <div className="w-2/3 h-2.5 bg-slate-800 rounded-sm mx-auto dark:bg-slate-200" />
             </div>
             <div className="space-y-1.5 w-full max-w-[160px] mb-6">
                 <div className="w-full h-1.5 bg-slate-200 rounded-sm dark:bg-[#1E2A42]" />
                 <div className="w-full h-1.5 bg-slate-200 rounded-sm dark:bg-[#1E2A42]" />
                 <div className="w-4/5 h-1.5 bg-slate-200 rounded-sm mx-auto dark:bg-[#1E2A42]" />
             </div>
             <div>
                 <div className="px-4 py-1.5 bg-[#1D4ED8] rounded-md text-white text-[9px] font-bold shadow-md shadow-[#1D4ED8]/20 dark:shadow-none">
                     Confirm Email
                 </div>
             </div>
        </div>
    </div>
);
