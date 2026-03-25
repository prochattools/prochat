'use client'

import { ReactNode } from 'react'

const KitsShell = ({ children }: { children: ReactNode }) => {
	return (
		<div className="font-marketing min-h-screen bg-transparent text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden relative">
			<div className="relative z-10">{children}</div>
		</div>
	)
}

export default KitsShell
