import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Youtube, Send } from 'lucide-react';
import { Button } from '../ui/Button';
import TrackedOutboundLink from '@/components/TrackedOutboundLink';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-slate-200 dark:bg-[#0B111B] dark:border-[#1E242D]">
      <div className="max-w-7xl mx-auto px-8">
        
        <div className="grid md:grid-cols-4 gap-12 mb-16">
           
           {/* Brand */}
           <div className="space-y-4">
              <Link href="/" className="inline-flex items-center">
                 <Image
                   src="/logo/prochat_logo_light.png"
                   alt="ProChat"
                   width={175}
                   height={56}
                   className="h-[58.5px] w-auto dark:hidden"
                 />
                 <Image
                   src="/logo/prochat_logo_dark.png"
                   alt="ProChat"
                   width={175}
                   height={56}
                   className="h-[58.5px] w-auto hidden dark:block"
                 />
              </Link>
              <p className="text-slate-500 text-sm dark:text-slate-400">A system for turning service into SaaS.</p>
           </div>

           {/* Links */}
           <div>
              <h4 className="font-bold text-slate-900 mb-4 dark:text-white">System</h4>
              <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                 <li><a href="#" className="hover:text-[#5b49f5] transition-colors dark:hover:text-[#9b8bff]">System notes</a></li>
                 <li>
                    <Link href="/proof" className="hover:text-[#5b49f5] transition-colors dark:hover:text-[#9b8bff]">
                      Proof
                    </Link>
                 </li>
                 <li><a href="/contact" className="hover:text-[#5b49f5] transition-colors dark:hover:text-[#9b8bff]">Contact</a></li>
                 <li>
                    <TrackedOutboundLink
                      href="https://accountant.prochat.tools"
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="opacity-70 hover:text-[#5b49f5] transition-colors dark:hover:text-[#9b8bff]"
                      eventName="cta_click"
                      eventPayload={{
                        location: 'footer',
                        destination: 'accountant_funnel',
                        href: 'https://accountant.prochat.tools',
                      }}
                    >
                      WaaS for Accountants
                    </TrackedOutboundLink>
                 </li>
              </ul>
           </div>

           {/* Legal */}
           <div>
              <h4 className="font-bold text-slate-900 mb-4 dark:text-white">Legal</h4>
              <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                 <li><a href="#" className="hover:text-[#5b49f5] transition-colors dark:hover:text-[#9b8bff]">Terms of services</a></li>
                 <li><a href="#" className="hover:text-[#5b49f5] transition-colors dark:hover:text-[#9b8bff]">Privacy Policy</a></li>
                 <li><a href="#" className="hover:text-[#5b49f5] transition-colors dark:hover:text-[#9b8bff]">Licences</a></li>
              </ul>
           </div>

           {/* Contact / Maker */}
           <div>
              <h4 className="font-bold text-slate-900 mb-4 dark:text-white">Contact the maker</h4>
              <ul className="space-y-3 text-sm text-slate-500 mb-6 dark:text-slate-400">
                 <li className="font-medium text-slate-900 dark:text-white">Steve Westhoek</li>
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

        <div className="pt-8 border-t border-slate-100 dark:border-[#1E242D]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full items-center justify-center sm:w-auto sm:justify-start">
              <div className="w-full max-w-[250px]">
                <div className="relative h-[30px] w-full">
                  <a
                    href="https://status.prochat.tools/"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    aria-label="Open ProChat service status"
                    className="absolute inset-0 z-10"
                  >
                    <span className="sr-only">Open ProChat service status</span>
                  </a>
                  <div className="block dark:hidden">
                    <iframe
                      src="https://status.prochat.tools/badge?theme=light"
                      title="ProChat service status badge"
                      aria-label="ProChat service status badge"
                      loading="lazy"
                      width="250"
                      height="30"
                      frameBorder="0"
                      scrolling="no"
                      referrerPolicy="no-referrer"
                      sandbox="allow-scripts allow-same-origin"
                      className="block h-[30px] w-full border-0 pointer-events-none"
                      style={{ colorScheme: "normal" }}
                    />
                  </div>
                  <div className="hidden dark:block">
                    <iframe
                      src="https://status.prochat.tools/badge?theme=dark"
                      title="ProChat service status badge"
                      aria-label="ProChat service status badge"
                      loading="lazy"
                      width="250"
                      height="30"
                      frameBorder="0"
                      scrolling="no"
                      referrerPolicy="no-referrer"
                      sandbox="allow-scripts allow-same-origin"
                      className="block h-[30px] w-full border-0 pointer-events-none"
                      style={{ colorScheme: "normal" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center text-slate-400 text-sm dark:text-slate-500 sm:text-right">
              © {new Date().getFullYear()} ProChat - All rights reserved
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
