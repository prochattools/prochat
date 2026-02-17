import React from 'react';
import { Youtube, Send } from 'lucide-react';
import { Button } from '../ui/Button';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-8">
        
        <div className="grid md:grid-cols-4 gap-12 mb-16">
           
           {/* Brand */}
           <div className="space-y-4">
              <div className="font-bold text-xl text-slate-900">prochat</div>
              <p className="text-slate-500 text-sm">A system for turning service into SaaS.</p>
           </div>

           {/* Links */}
           <div>
              <h4 className="font-bold text-slate-900 mb-4">System</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                 <li><a href="#" className="hover:text-[#5b49f5] transition-colors">System notes</a></li>
                 <li><a href="/contact" className="hover:text-[#5b49f5] transition-colors">Contact</a></li>
              </ul>
           </div>

           {/* Legal */}
           <div>
              <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                 <li><a href="#" className="hover:text-[#5b49f5] transition-colors">Terms of services</a></li>
                 <li><a href="#" className="hover:text-[#5b49f5] transition-colors">Privacy Policy</a></li>
                 <li><a href="#" className="hover:text-[#5b49f5] transition-colors">Licences</a></li>
              </ul>
           </div>

           {/* Contact / Maker */}
           <div>
              <h4 className="font-bold text-slate-900 mb-4">Contact the maker</h4>
              <ul className="space-y-3 text-sm text-slate-500 mb-6">
                 <li className="font-medium text-slate-900">Steve Westhoek</li>
                 <li>ProChat</li>
              </ul>
              <div className="flex gap-2">
                 <Button variant="secondary" size="sm" className="px-3">
                    <Youtube size={16} />
                 </Button>
                 <Button variant="secondary" size="sm" className="px-3">
                    <Send size={16} />
                 </Button>
              </div>
           </div>

        </div>

        <div className="pt-8 border-t border-slate-100 text-center text-slate-400 text-sm">
           © {new Date().getFullYear()} ProChat - All rights reserved
        </div>

      </div>
    </footer>
  );
};