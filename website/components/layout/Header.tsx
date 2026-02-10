'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
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
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-coral focus:text-white focus:rounded-lg"
      >
        Vai al contenuto principale
      </a>

      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled || !isHomePage
            ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm border-b border-gray-100'
            : 'bg-transparent py-6'
        )}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between" aria-label="Navigazione principale">
            {/* Logo */}
            <Link href="/" className="relative z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 rounded-sm">
              <motion.span
                className={cn(
                  "font-display text-2xl font-bold transition-colors duration-300",
                  hasDarkBackground ? "text-white" : "text-navy"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Luca <span className={cn(hasDarkBackground ? "text-teal-light" : "text-teal")}>Pellicari</span>
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.slice(0, 7).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal',
                    pathname === link.href
                      ? (hasDarkBackground ? 'text-teal-light' : 'text-teal')
                      : (hasDarkBackground ? 'text-white/80 hover:text-teal-light' : 'text-navy-dark hover:text-teal')
                  )}
                  aria-current={pathname === link.href ? 'page' : undefined}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.span
                      layoutId="activeNav"
                      className={cn(
                        "absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full",
                        hasDarkBackground ? "bg-teal-light" : "bg-teal"
                      )}
                    />
                  )}
                </Link>
              ))}

              <Link
                href="/contatti"
                className="ml-4 px-6 py-2.5 text-sm font-medium bg-coral text-white rounded-full hover:bg-coral-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
              >
                Contattami
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "lg:hidden relative z-10 p-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal transition-colors duration-300",
                hasDarkBackground ? "text-white" : "text-navy"
              )}
              aria-label={isMobileMenuOpen ? 'Chiudi menu' : 'Apri menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
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
              className="absolute inset-0 bg-navy-dark/95 backdrop-blur-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-navy-dark p-8 pt-24"
              aria-label="Menu mobile"
            >
              <div className="flex flex-col gap-2">
                {NAV_LINKS.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        'block py-3 text-xl font-medium transition-colors border-b border-teal/20 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal',
                        pathname === link.href
                          ? 'text-teal-light'
                          : 'text-white/80 hover:text-teal-light'
                      )}
                      aria-current={pathname === link.href ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-12 pt-8 border-t border-teal/20">
                <p className="text-sm text-teal-50 mb-4">Seguimi su</p>
                <div className="flex gap-4">
                  <a
                    href={SITE_CONFIG.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-teal-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded-sm"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={SITE_CONFIG.links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-teal-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded-sm"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
