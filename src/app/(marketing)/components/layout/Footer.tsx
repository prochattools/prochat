import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-background pt-20 pb-10 border-t border-border font-mono [&_*]:font-mono">
      <div className="max-w-7xl mx-auto px-page">
        
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
              <p className="text-muted-foreground text-sm">Test first. SaaS second.</p>
           </div>

           {/* Links */}
           <div>
              <h4 className="font-bold text-foreground mb-4">Menu</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                 <li>
                    <Link href="/#system" className="hover:text-primary transition-colors">
                      System
                    </Link>
                 </li>
                 <li>
                    <Link href="/kits" className="hover:text-primary transition-colors">
                      Kits
                    </Link>
                 </li>
                 <li>
                    <Link href="/contact" className="hover:text-primary transition-colors">
                      Contact
                    </Link>
                 </li>
              </ul>
           </div>

           {/* Legal */}
           <div>
              <h4 className="font-bold text-foreground mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                 <li>
                    <Link href="/terms" className="hover:text-primary transition-colors">
                      Terms of services
                    </Link>
                 </li>
                 <li>
                    <Link href="/privacy" className="hover:text-primary transition-colors">
                      Privacy Policy
                    </Link>
                 </li>
                 <li>
                    <a
                      href="https://prochat.tools/terms#digital-product-license"
                      className="hover:text-primary transition-colors"
                    >
                      Licences
                    </a>
                 </li>
              </ul>
           </div>

           {/* Contact / Maker */}
           <div>
              <h4 className="font-bold text-foreground mb-4">Contact the maker</h4>
              <ul className="space-y-3 text-sm text-muted-foreground mb-6">
                 <li className="font-medium text-foreground">Steve Westhoek</li>
              </ul>
              <div className="flex gap-2">
                 <Link
                   href="https://www.youtube.com/@stevewesthoek"
                   target="_blank"
                   rel="noopener noreferrer"
                   aria-label="Steve Westhoek on YouTube"
                   className="relative inline-flex items-center justify-center rounded-full border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background"
                 >
                   <Youtube size={16} />
                 </Link>
                 <a
                   href="https://x.com/prochattools"
                   target="_blank"
                   rel="nofollow noopener noreferrer"
                   aria-label="ProChat on X"
                   className="relative inline-flex items-center justify-center rounded-full border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background"
                 >
                   <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                     <path d="M18.901 2h3.68l-8.04 9.19L24 22h-7.406l-5.8-7.584L3.95 22H.268l8.6-9.834L0 2h7.594l5.243 6.932L18.901 2zm-1.292 17.8h2.04L6.486 4.106H4.3L17.61 19.8z" />
                   </svg>
                 </a>
              </div>
           </div>

        </div>

        <div className="pt-8 border-t border-border">
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
            <div className="text-center text-muted-foreground text-sm sm:text-right">
              © {new Date().getFullYear()} ProChat - All rights reserved
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
