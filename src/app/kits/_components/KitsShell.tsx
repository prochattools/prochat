'use client'

import { ReactNode } from 'react'
import { Scaffolding } from '@/components/ui/Scaffolding'

const KitsShell = ({ children }: { children: ReactNode }) => {
	return (
		<div className="font-marketing min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden relative">
			<div className="fixed inset-0 pointer-events-none z-0">
				<Scaffolding opacity={0.6} />
			</div>
			<div className="relative z-10">{children}</div>
		</div>
	)
}

export default KitsShell
