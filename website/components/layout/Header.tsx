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
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-dark/90 backdrop-blur-lg py-4 shadow-lg'
            : 'bg-transparent py-6'
        )}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative z-10">
              <motion.span
                className="font-serif text-2xl font-bold text-light-surface"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Luca <span className="text-gold">Pellicari</span>
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.slice(0, 7).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium transition-colors duration-300',
                    pathname === link.href
                      ? 'text-gold'
                      : 'text-light-surface/80 hover:text-gold'
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold rounded-full"
                    />
                  )}
                </Link>
              ))}

              {/* More dropdown could be added for remaining links */}
              <Link
                href="/contatti"
                className="ml-4 btn-secondary text-sm py-2 px-6"
              >
                Contattami
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-10 p-2 text-light-surface"
              aria-label="Toggle menu"
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
              className="absolute inset-0 bg-dark/95 backdrop-blur-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-dark-surface p-8 pt-24"
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
                        'block py-3 text-xl font-medium transition-colors border-b border-dark-lighter',
                        pathname === link.href
                          ? 'text-gold'
                          : 'text-light-surface/80 hover:text-gold'
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-12 pt-8 border-t border-dark-lighter">
                <p className="text-sm text-light-surface/50 mb-4">Seguimi su</p>
                <div className="flex gap-4">
                  <a
                    href={SITE_CONFIG.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-light-surface/70 hover:text-gold transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={SITE_CONFIG.links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-light-surface/70 hover:text-gold transition-colors"
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
