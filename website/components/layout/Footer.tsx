'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Linkedin, Facebook, Youtube, ArrowUpRight } from 'lucide-react'
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants'

const socialLinks = [
  { icon: Linkedin, href: SITE_CONFIG.links.linkedin, label: 'LinkedIn' },
  { icon: Facebook, href: SITE_CONFIG.links.facebook, label: 'Facebook' },
  { icon: Youtube, href: SITE_CONFIG.links.youtube, label: 'YouTube' },
]

export function Footer() {
  return (
    <footer className="bg-navy-dark border-t border-teal/20">
      {/* Main Footer */}
      <div className="container-custom py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded-sm">
              <span className="font-display text-3xl font-bold text-white">
                Luca <span className="text-teal-light">Pellicari</span>
              </span>
            </Link>
            <p className="text-teal-50 text-lg leading-relaxed max-w-md mb-8">
              Trasformo le persone aiutandole a riconoscersi.
              Identity Coach, Speaker, Autore e Fondatore di Quantum Academy.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-navy flex items-center justify-center text-teal-50 hover:text-teal-light hover:bg-navy-light transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Links - Column 1 */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-6">
              Navigazione
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.slice(0, 7).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-teal-50 hover:text-teal-light transition-colors duration-300 inline-flex items-center gap-1 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded-sm"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Links - Column 2 */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-6 opacity-0 pointer-events-none">
              &nbsp;
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.slice(7).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-teal-50 hover:text-teal-light transition-colors duration-300 inline-flex items-center gap-1 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded-sm"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-teal/20">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-teal-50/60 text-sm">
            &copy; {new Date().getFullYear()} Luca Pellicari. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  )
}
