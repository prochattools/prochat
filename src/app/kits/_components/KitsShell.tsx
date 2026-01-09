'use client'

import { ReactNode } from 'react'
import { Scaffolding } from '@/app/marketing-ai-studio/components/ui/Scaffolding'

const KitsShell = ({ children }: { children: ReactNode }) => {
	return (
		<div className="min-h-screen bg-white text-slate-900 dark:bg-[#010814] dark:text-white selection:bg-[#885efe] selection:text-white overflow-x-hidden relative">
			<div className="fixed inset-0 pointer-events-none z-0">
				<Scaffolding opacity={0.6} />
			</div>
			<div className="relative z-10">{children}</div>
		</div>
	)
}

export default KitsShell
