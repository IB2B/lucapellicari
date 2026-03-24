'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight, ChevronDown, Linkedin, Facebook, Youtube, User, Compass, BookOpen, Mic2, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SITE_CONFIG } from '@/lib/constants'

const NAV_GROUPS = {
  primary: [
    { href: '/', label: 'Home' },
    { href: '/chi-sono', label: 'Chi Sono' },
  ],
  percorso: {
    label: 'Percorso',
    icon: Compass,
    links: [
      { href: '/missione', label: 'Missione', desc: 'Il mio scopo e la mia direzione' },
      { href: '/visione', label: 'Visione', desc: 'Come vedo il futuro' },
      { href: '/3v', label: 'Le Tre V', desc: 'Valori, Visione, Verità' },
      { href: '/percorsi', label: 'Percorsi', desc: 'I cammini di trasformazione' },
    ],
  },
  progetti: {
    label: 'Progetti',
    icon: User,
    links: [
      { href: '/metodo-in-flow', label: 'Metodo In-Flow', desc: 'Il metodo di trasformazione' },
      { href: '/quantum-academy', label: 'Quantum Academy', desc: 'Scuola di identità e consapevolezza' },
      { href: '/alphakom', label: 'Alphakom', desc: 'Leadership e comunicazione' },
    ],
  },
  risorse: {
    label: 'Risorse',
    icon: BookOpen,
    links: [
      { href: '/libri', label: 'Libri', desc: 'Le mie pubblicazioni' },
      { href: '/media', label: 'Media', desc: 'Foto, video e interviste' },
      { href: '/blog', label: 'Blog', desc: 'Articoli e riflessioni' },
    ],
  },
  cta: { href: '/contatti', label: 'Contatti' },
}

const ALL_NAV_LINKS = [
  ...NAV_GROUPS.primary,
  ...NAV_GROUPS.percorso.links,
  ...NAV_GROUPS.progetti.links,
  ...NAV_GROUPS.risorse.links,
  NAV_GROUPS.cta,
]

type DropdownKey = 'percorso' | 'progetti' | 'risorse'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null)
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()

  const isHomePage = pathname === '/'
  const hasDarkBackground = isHomePage && !isScrolled

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  const handleMouseEnter = (key: DropdownKey) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    setOpenDropdown(key)
  }

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => setOpenDropdown(null), 150)
  }

  const dropdownKeys: DropdownKey[] = ['percorso', 'progetti', 'risorse']

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-teal focus:text-white focus:rounded-lg"
      >
        Vai al contenuto principale
      </a>

      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
          isMobileMenuOpen
            ? 'bg-transparent py-3 border-b border-transparent shadow-none'
            : isScrolled || !isHomePage
              ? 'bg-white/95 backdrop-blur-xl py-3 shadow-[0_1px_3px_rgba(0,0,0,0.06)] border-b border-gray-100'
              : 'bg-transparent py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <nav className="flex items-center justify-between" aria-label="Navigazione principale">
            {/* Logo */}
            <Link
              href="/"
              className="relative z-10 group flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 rounded-sm"
            >
              <div className="flex items-center gap-2.5">
                <motion.div
                  className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center font-display text-sm font-bold transition-all duration-300",
                    hasDarkBackground || isMobileMenuOpen
                      ? "bg-white/10 text-white border border-white/20"
                      : "bg-navy text-white group-hover:bg-teal"
                  )}
                  whileTap={{ scale: 0.95 }}
                >
                  LP
                </motion.div>
                <span
                  className={cn(
                    "hidden sm:block font-display text-lg font-semibold tracking-tight transition-colors duration-300",
                    hasDarkBackground || isMobileMenuOpen ? "text-white" : "text-navy"
                  )}
                >
                  Luca Pellicari
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Primary links */}
              {NAV_GROUPS.primary.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal',
                    pathname === link.href
                      ? (hasDarkBackground ? 'text-white bg-white/15' : 'text-teal')
                      : (hasDarkBackground ? 'text-white/75 hover:text-white' : 'text-navy/65 hover:text-navy')
                  )}
                  aria-current={pathname === link.href ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}

              {/* Dropdown groups */}
              {dropdownKeys.map((key) => {
                const group = NAV_GROUPS[key]
                const isActive = group.links.some(l => l.href === pathname)
                const isOpen = openDropdown === key

                return (
                  <div
                    key={key}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(key)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      className={cn(
                        'flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal',
                        isActive
                          ? (hasDarkBackground ? 'text-white bg-white/15' : 'text-teal')
                          : isOpen
                            ? (hasDarkBackground ? 'text-white bg-white/10' : 'text-navy bg-gray-50')
                            : (hasDarkBackground ? 'text-white/75 hover:text-white' : 'text-navy/65 hover:text-navy')
                      )}
                      aria-expanded={isOpen}
                    >
                      {group.label}
                      <ChevronDown
                        size={13}
                        className={cn(
                          'transition-transform duration-200',
                          isOpen && 'rotate-180'
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.97 }}
                          transition={{ duration: 0.15, ease: 'easeOut' }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl shadow-xl shadow-black/8 border border-gray-100 p-2 z-50"
                        >
                          {group.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className={cn(
                                'flex flex-col gap-0.5 px-4 py-3 rounded-xl transition-all duration-150',
                                pathname === link.href
                                  ? 'bg-teal/8 text-teal'
                                  : 'hover:bg-gray-50 text-navy'
                              )}
                            >
                              <span className="text-sm font-semibold">{link.label}</span>
                              <span className={cn(
                                "text-xs",
                                pathname === link.href ? 'text-teal/70' : 'text-navy/45'
                              )}>
                                {link.desc}
                              </span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}

              {/* Divider */}
              <div className={cn(
                "w-px h-5 mx-2 transition-colors duration-300",
                hasDarkBackground ? "bg-white/20" : "bg-gray-200"
              )} />

              {/* CTA */}
              <Link
                href="/contatti"
                className={cn(
                  "group inline-flex items-center gap-1.5 px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2",
                  hasDarkBackground
                    ? "bg-white text-navy hover:bg-teal hover:text-white"
                    : "bg-navy text-white hover:bg-teal"
                )}
              >
                Contatti
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "lg:hidden relative z-10 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal",
                isMobileMenuOpen
                  ? "text-white bg-white/10"
                  : hasDarkBackground
                    ? "text-white bg-white/10"
                    : "text-navy bg-gray-100"
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
                    <X size={18} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={18} />
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
            <div className="absolute inset-0 bg-navy-dark" />

            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative h-full flex flex-col pt-20 overflow-y-auto"
              aria-label="Menu mobile"
            >
              {/* Primary Links */}
              <div className="px-6 pb-4">
                {NAV_GROUPS.primary.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        'flex items-center justify-between py-3.5 px-4 -mx-4 rounded-xl transition-all duration-200',
                        pathname === link.href ? 'text-white bg-teal/20' : 'text-white/70'
                      )}
                    >
                      <span className="text-lg font-display font-medium">{link.label}</span>
                      {pathname === link.href && <span className="w-1.5 h-1.5 rounded-full bg-teal-light" />}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Grouped Sections */}
              {dropdownKeys.map((key, groupIdx) => {
                const group = NAV_GROUPS[key]
                const Icon = group.icon
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 + groupIdx * 0.08 }}
                    className="px-6 py-4 border-t border-white/8"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Icon size={14} className="text-teal-light" />
                      <span className="text-teal-light text-xs uppercase tracking-[0.15em] font-semibold">{group.label}</span>
                    </div>
                    {group.links.map((link, i) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + groupIdx * 0.08 + i * 0.03, duration: 0.2 }}
                      >
                        <Link
                          href={link.href}
                          className={cn(
                            'flex items-center justify-between py-3 px-4 -mx-4 rounded-xl transition-all duration-200',
                            pathname === link.href ? 'text-white bg-teal/20' : 'text-white/70'
                          )}
                        >
                          <div>
                            <span className="text-base font-display font-medium block">{link.label}</span>
                            <span className="text-xs text-white/40">{link.desc}</span>
                          </div>
                          {pathname === link.href && <span className="w-1.5 h-1.5 rounded-full bg-teal-light flex-shrink-0" />}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )
              })}

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.25 }}
                className="px-6 py-4"
              >
                <Link
                  href="/contatti"
                  className="flex items-center justify-center gap-3 w-full py-4 bg-teal text-white text-base font-semibold rounded-2xl active:bg-teal-dark transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Mail size={18} />
                  <span>Contattami</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              {/* Bottom */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.25 }}
                className="mt-auto px-6 py-5 border-t border-white/8"
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {[
                      { href: SITE_CONFIG.links.linkedin, label: 'LinkedIn', icon: Linkedin },
                      { href: SITE_CONFIG.links.facebook, label: 'Facebook', icon: Facebook },
                      { href: SITE_CONFIG.links.youtube, label: 'YouTube', icon: Youtube },
                    ].map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/40 active:bg-white/10 transition-all"
                        aria-label={social.label}
                      >
                        <social.icon size={16} />
                      </a>
                    ))}
                  </div>
                  <p className="text-xs text-white/20">
                    &copy; {new Date().getFullYear()} Luca Pellicari
                  </p>
                </div>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
