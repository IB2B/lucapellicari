'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight, Linkedin, Instagram } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Check if we're on homepage (has dark hero) or other pages (white background)
  const isHomePage = pathname === '/'
  const hasDarkBackground = isHomePage && !isScrolled

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-teal focus:text-white focus:rounded-lg"
      >
        Vai al contenuto principale
      </a>

      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
          isScrolled || !isHomePage
            ? 'bg-white/90 backdrop-blur-xl py-3 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border-b border-gray-100/80'
            : 'bg-transparent py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <nav className="flex items-center justify-between" aria-label="Navigazione principale">
            {/* Logo */}
            <Link
              href="/"
              className="relative z-10 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 rounded-sm"
            >
              <div className="flex items-center gap-3">
                {/* Logo Mark */}
                <motion.div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center font-display text-lg font-bold transition-all duration-300",
                    hasDarkBackground
                      ? "bg-white/10 text-white border border-white/20"
                      : "bg-teal/10 text-teal border border-teal/20 group-hover:bg-teal group-hover:text-white"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  LP
                </motion.div>
                {/* Logo Text */}
                <div className="hidden sm:block">
                  <motion.span
                    className={cn(
                      "font-display text-xl font-semibold transition-colors duration-300 tracking-tight",
                      hasDarkBackground ? "text-white" : "text-navy"
                    )}
                  >
                    Luca{' '}
                    <span className={cn(
                      "transition-colors duration-300",
                      hasDarkBackground ? "text-teal-light" : "text-teal"
                    )}>
                      Pellicari
                    </span>
                  </motion.span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              {/* Nav Links */}
              <div className="flex items-center gap-1 mr-6">
                {NAV_LINKS.slice(0, 6).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2',
                      pathname === link.href
                        ? (hasDarkBackground ? 'text-white' : 'text-teal')
                        : (hasDarkBackground ? 'text-white/70 hover:text-white' : 'text-navy/70 hover:text-navy')
                    )}
                    aria-current={pathname === link.href ? 'page' : undefined}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {/* Hover background */}
                    <span className={cn(
                      "absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                      hasDarkBackground ? "bg-white/10" : "bg-gray-100"
                    )} />
                    {/* Active indicator */}
                    {pathname === link.href && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className={cn(
                          "absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full",
                          hasDarkBackground ? "bg-teal-light" : "bg-teal"
                        )}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className={cn(
                "w-px h-6 mr-6 transition-colors duration-300",
                hasDarkBackground ? "bg-white/20" : "bg-gray-200"
              )} />

              {/* CTA Button */}
              <Link
                href="/contatti"
                className={cn(
                  "group relative inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-full overflow-hidden transition-all duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2",
                  hasDarkBackground
                    ? "bg-white text-navy hover:bg-teal hover:text-white shadow-lg shadow-black/10"
                    : "bg-teal text-white hover:bg-teal-dark shadow-lg shadow-teal/20 hover:shadow-xl hover:shadow-teal/30"
                )}
              >
                <span>Contattami</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "lg:hidden relative z-10 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal",
                hasDarkBackground
                  ? "text-white bg-white/10 hover:bg-white/20"
                  : "text-navy bg-gray-100 hover:bg-gray-200"
              )}
              aria-label={isMobileMenuOpen ? 'Chiudi menu' : 'Apri menu'}
              aria-expanded={isMobileMenuOpen}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-navy-dark/98 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-x-0 top-0 bottom-0 flex flex-col px-6 pt-24 pb-8 overflow-y-auto"
              aria-label="Menu mobile"
            >
              {/* Navigation Links */}
              <div className="flex-1">
                <div className="space-y-1">
                  {NAV_LINKS.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          'flex items-center justify-between py-4 text-2xl font-display font-medium transition-colors rounded-lg px-4 -mx-4',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal',
                          pathname === link.href
                            ? 'text-teal-light bg-white/5'
                            : 'text-white/80 hover:text-white hover:bg-white/5'
                        )}
                        aria-current={pathname === link.href ? 'page' : undefined}
                      >
                        <span>{link.label}</span>
                        {pathname === link.href && (
                          <span className="w-2 h-2 rounded-full bg-teal-light" />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="mt-8"
                >
                  <Link
                    href="/contatti"
                    className="flex items-center justify-center gap-3 w-full py-4 bg-teal text-white text-lg font-semibold rounded-2xl hover:bg-teal-dark transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>Contattami</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              </div>

              {/* Bottom Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="pt-8 border-t border-white/10"
              >
                {/* Social Links */}
                <p className="text-sm text-white/40 mb-4 uppercase tracking-wider">Seguimi</p>
                <div className="flex gap-3">
                  <a
                    href={SITE_CONFIG.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href={SITE_CONFIG.links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                </div>

                {/* Copyright */}
                <p className="mt-8 text-sm text-white/30">
                  © {new Date().getFullYear()} Luca Pellicari
                </p>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
