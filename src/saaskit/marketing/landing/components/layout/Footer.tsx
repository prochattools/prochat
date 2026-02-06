import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Send, Youtube } from 'lucide-react'

import { Button } from '../ui/Button'

export const Footer: React.FC = () => {
  return (
    <footer className="font-marketing bg-white dark:bg-[#010814] pt-20 pb-10 border-t border-slate-200 dark:border-[#1E242D]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo/prochat_logo_light.png"
                alt="SaaSKit"
                width={250}
                height={50}
                className="h-[3.12rem] w-auto dark:hidden"
              />
              <Image
                src="/logo/prochat_logo_dark.png"
                alt="SaaSKit"
                width={250}
                height={50}
                className="hidden h-[3.12rem] w-auto dark:block"
              />
            </Link>
            <p className="text-slate-500 dark:text-[#808389] text-sm">
              Launch your SaaS in days, not weeks.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-4">Links</h4>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-[#808389]">
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-[#5b49f5] dark:hover:text-[#885efe] transition-colors"
                >
                  Demo
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="hover:text-[#5b49f5] dark:hover:text-[#885efe] transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-[#5b49f5] dark:hover:text-[#885efe] transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <a
                  href="mailto:info@prochat.tools"
                  className="hover:text-[#5b49f5] dark:hover:text-[#885efe] transition-colors"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-[#808389]">
              <li>
                <Link
                  href="/tos"
                  className="hover:text-[#5b49f5] dark:hover:text-[#885efe] transition-colors"
                >
                  Terms of service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-[#5b49f5] dark:hover:text-[#885efe] transition-colors"
                >
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  href="/#license"
                  className="hover:text-[#5b49f5] dark:hover:text-[#885efe] transition-colors"
                >
                  License
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-[#808389] mb-6">
              <li className="font-medium text-slate-900 dark:text-white">ProChat Tools</li>
              <li>
                <a
                  href="mailto:info@prochat.tools"
                  className="hover:text-[#5b49f5] dark:hover:text-[#885efe] transition-colors"
                >
                  info@prochat.tools
                </a>
              </li>
            </ul>
            <div className="flex gap-2">
              <Button
                href="https://www.youtube.com"
                variant="secondary"
                size="sm"
                className="px-3"
              >
                <Youtube size={16} />
              </Button>
              <Button
                href="mailto:info@prochat.tools"
                variant="secondary"
                size="sm"
                className="px-3"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 dark:border-[#1E242D] text-center text-slate-400 dark:text-[#5A5E66] text-sm">
          © {new Date().getFullYear()} ProChat Tools - All rights reserved
        </div>
      </div>
    </footer>
  )
}
