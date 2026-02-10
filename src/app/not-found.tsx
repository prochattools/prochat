'use client'
import React from 'react'
import Link from 'next/link';
import { Button } from '@/components/ui/button'
import { Scaffolding } from '../components/ui/Scaffolding'
import { Home, Triangle } from 'lucide-react'
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50 font-sans relative overflow-hidden flex flex-col items-center justify-center selection:bg-[#885efe] selection:text-white dark:selection:bg-[#885efe]/70 dark:selection:text-white">
      
      {/* Background Scaffolding */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Scaffolding opacity={0.5} />
      </div>

      <div className="relative z-10 max-w-3xl px-6 w-full flex flex-col items-center text-center">
        
        {/* Construction Visualization */}
        <div className="relative w-64 h-64 mb-12 select-none">
            {/* Crane Tower */}
            <div className="absolute bottom-0 left-12 w-4 h-48 border-x border-slate-300 bg-slate-50/50 dark:border-slate-700 dark:bg-slate-900/60 flex flex-col items-center justify-around">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-full h-px bg-slate-200" />
                ))}
            </div>
            {/* Crane Jib */}
            <div className="absolute top-16 left-10 w-40 h-3 border border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-900 -rotate-6 origin-left flex items-center justify-around z-10">
                <div className="w-px h-full bg-slate-200" />
                <div className="w-px h-full bg-slate-200" />
                <div className="w-px h-full bg-slate-200" />
            </div>
            {/* Hanging Payload (The 404 Block) */}
            <motion.div 
                animate={{ 
                    rotate: [0, 2, 0, -2, 0],
                    y: [0, 2, 0, 2, 0] 
                }}
                transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                }}
                className="absolute top-[70px] left-[140px] flex flex-col items-center origin-top"
            >
                <div className="w-px h-16 bg-slate-400" />
                <div className="w-20 h-20 bg-white dark:bg-slate-900 border-2 border-dashed border-[#5b49f5] dark:border-[#8d7bff] rounded-xl flex items-center justify-center shadow-xl shadow-purple-500/10">
                    <span className="text-2xl font-bold text-[#5b49f5] dark:text-[#a290ff]">404</span>
                </div>
            </motion.div>

            {/* Base Blocks */}
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg translate-y-2 opacity-50" />
            <div className="absolute bottom-0 right-8 w-16 h-16 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg z-20 flex items-center justify-center">
                 <Triangle className="text-orange-400" size={24} />
            </div>
        </div>

        {/* Text Content */}
        <div className="space-y-6 max-w-lg mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                Still building this part.
            </h1>
            
            <p className="text-slate-500 dark:text-slate-400 text-lg font-light leading-relaxed">
                The blueprint you are looking for doesn&apos;t exist or hasn&apos;t been shipped yet. The system is standard, but this page is missing.
            </p>

            {/* Action Bar */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/">
                    <Button size="lg" className="h-14 px-8 bg-[#5b49f5] hover:bg-[#4a3bd1] text-white">
                        <Home size={18} className="mr-2" /> Return Home
                    </Button>
                </Link>
                <Link href="/contact">
                    <Button variant="ghost" size="lg" className="h-14 px-8">
                        Report Broken Link
                    </Button>
                </Link>
            </div>
        </div>

        {/* Footer Meta */}
        <div className="mt-16 pt-8 border-t border-dashed border-slate-200/60 text-center">
             <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                Status: 404_NOT_FOUND // System: Operational
             </p>
        </div>

      </div>
    </main>
  )
}
