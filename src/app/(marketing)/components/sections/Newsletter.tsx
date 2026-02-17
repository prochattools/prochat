import React from 'react';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';

export const Newsletter: React.FC = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left: Text */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900">
            Subscribe to release notes & product updates
          </h3>
          <p className="text-slate-500">
            Stay in the loop with the latest improvements and features.
          </p>
        </div>

        {/* Right: Form */}
        <div className="flex gap-3 w-full max-w-md ml-auto">
          <div className="relative flex-grow group">
             <input 
               type="email" 
               placeholder="Enter your email address"
               className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5b49f5]/20 focus:border-[#5b49f5] transition-all duration-300"
             />
             <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
          <Button>
            Subscribe
          </Button>
        </div>

      </div>
      
      {/* Decorative separator line */}
      <div className="max-w-7xl mx-auto px-6 mt-24">
         <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>
    </section>
  );
};