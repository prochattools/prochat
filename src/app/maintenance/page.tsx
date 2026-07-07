'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Triangle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Scaffolding } from '@/components/ui/Scaffolding'

export default function MaintenancePage() {
  return (
    <main className="min-h-screen bg-transparent text-foreground dark:text-slate-50 font-sans relative overflow-hidden flex flex-col items-center justify-center selection:bg-primary selection:text-primary-foreground dark:selection:bg-primary/80 dark:selection:text-primary-foreground">
      <div className="absolute inset-0 pointer-events-none z-0">
        <Scaffolding opacity={0.5} />
      </div>

      <div className="relative z-10 max-w-3xl px-6 w-full flex flex-col items-center text-center">
        <div className="relative w-64 h-64 mb-12 select-none" aria-hidden="true">
          <div className="absolute bottom-0 left-12 w-4 h-48 border-x border-slate-300 bg-slate-50/50 dark:border-slate-700 dark:bg-slate-900/60 flex flex-col items-center justify-around">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-full h-px bg-slate-200" />
            ))}
          </div>

          <div className="absolute top-16 left-10 w-40 h-3 border border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-900 -rotate-6 origin-left flex items-center justify-around z-10">
            <div className="w-px h-full bg-slate-200" />
            <div className="w-px h-full bg-slate-200" />
            <div className="w-px h-full bg-slate-200" />
          </div>

          <motion.div
            animate={{
              rotate: [0, 2, 0, -2, 0],
              y: [0, 2, 0, 2, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-[70px] left-[140px] flex flex-col items-center origin-top"
          >
            <div className="w-px h-16 bg-slate-400" />
            <div className="w-24 h-20 bg-white dark:bg-slate-900 border-2 border-dashed border-primary dark:border-primary/80 rounded-xl flex items-center justify-center shadow-xl shadow-blue-500/10">
              <span className="text-sm font-bold tracking-[0.2em] text-primary dark:text-primary/80">
                SOON
              </span>
            </div>
          </motion.div>

          <div className="absolute bottom-0 right-0 w-16 h-16 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg translate-y-2 opacity-50" />
          <div className="absolute bottom-0 right-8 w-16 h-16 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg z-20 flex items-center justify-center">
            <Triangle className="text-orange-400" size={24} />
          </div>
        </div>

        <div className="space-y-6 max-w-xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Website under construction
          </p>

          <h1 className="text-4xl font-bold tracking-[-0.05em] text-slate-900 dark:text-white md:text-5xl">
            We are rebuilding ProChat.
          </h1>

          <p className="text-slate-500 dark:text-slate-400 text-lg font-light leading-relaxed">
            The ProChat website is temporarily unavailable while we simplify the product story, clean up the design, and prepare the next public version. We will be available again soon.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="mailto:support@prochat.tools">
              <Button size="lg" className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Mail size={18} className="mr-2" /> Contact ProChat
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-dashed border-slate-200/60 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600">
            ProChat · Private persistent memory for AI-assisted work
          </p>
        </div>
      </div>
    </main>
  )
}
