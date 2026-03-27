'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight, ChevronDown, Linkedin, Facebook, Youtube, Compass, Layers, BookOpen, Mail } from 'lucide-react'
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
      { href: '/3r', label: 'Le Tre R', desc: 'Identità relazionale' },
      { href: '/percorsi', label: 'Percorsi', desc: 'I cammini di trasformazione' },
    ],
  },
  progetti: {
    label: 'Progetti',
    icon: Layers,
    links: [
      { href: '/metodo-in-flow', label: 'Metodo In-Flow', desc: 'Il metodo di trasformazione' },
      { href: '/quantum-academy', label: 'Quantum Academy', desc: 'Scuola di identità e consapevolezza' },
      { href: '/alphakom', label: 'Alphakom', desc: 'Leadership e comunicazione' },
      { href: '/metaquantistica', label: 'Metaquantistica', desc: 'La coscienza applicata alla vita' },
      { href: '/analisi-comportamento', label: 'Analisi del Comportamento', desc: 'Psicologia e neuroscienze' },
      { href: '/negoziazione', label: 'NegoziAzione', desc: 'Negoziare con identità' },
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
}

type DropdownKey = 'percorso' | 'progetti' | 'risorse'
const dropdownKeys: DropdownKey[] = ['percorso', 'progetti', 'risorse']

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null)
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()

  const isHomePage = pathname === '/'
  const hasDarkBg = isHomePage && !isScrolled

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50)
        ticking = false
      })
    }
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
      // Only restore if we were the ones who set it
      if (document.body.style.overflow === 'hidden') {
        document.body.style.overflow = ''
      }
    }
    return () => {
      if (document.body.style.overflow === 'hidden') {
        document.body.style.overflow = ''
      }
    }
  }, [isMobileMenuOpen])

  const handleMouseEnter = (key: DropdownKey) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    setOpenDropdown(key)
  }

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => setOpenDropdown(null), 120)
  }

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
            ? 'bg-transparent py-3'
            : isScrolled || !isHomePage
              ? 'bg-white/95 backdrop-blur-xl py-2.5 shadow-[0_1px_0_rgba(0,0,0,0.04)] border-b border-black/[0.04]'
              : 'bg-transparent py-4'
        )}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <nav className="flex items-center justify-between" aria-label="Navigazione principale">

            {/* Logo */}
            <Link
              href="/"
              className="relative z-10 group flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded-sm"
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center font-display text-[13px] font-bold tracking-tight transition-all duration-300",
                    hasDarkBg || isMobileMenuOpen
                      ? "bg-white/15 text-white backdrop-blur-sm border border-white/10"
                      : "bg-navy text-white group-hover:bg-teal"
                  )}
                >
                  LP
                </div>
                <div className="hidden sm:flex flex-col">
                  <span
                    className={cn(
                      "font-display text-[15px] font-semibold leading-tight tracking-tight transition-colors duration-300",
                      hasDarkBg || isMobileMenuOpen ? "text-white" : "text-navy"
                    )}
                  >
                    Luca Pellicari
                  </span>
                  <span
                    className={cn(
                      "text-[10px] font-medium uppercase tracking-[0.12em] transition-colors duration-300",
                      hasDarkBg || isMobileMenuOpen ? "text-white/60" : "text-navy/50"
                    )}
                  >
                    Identity Coach
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1.5">
              {NAV_GROUPS.primary.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                    pathname === link.href
                      ? (hasDarkBg ? 'text-white bg-white/10' : 'text-teal bg-teal/[0.06]')
                      : (hasDarkBg ? 'text-white/70 hover:text-white hover:bg-white/[0.06]' : 'text-navy/55 hover:text-navy hover:bg-navy/[0.03]')
                  )}
                  aria-current={pathname === link.href ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}

              {/* Thin separator */}
              <div className={cn("w-px h-4 mx-1", hasDarkBg ? "bg-white/15" : "bg-navy/10")} />

              {/* Dropdown groups */}
              {dropdownKeys.map((key) => {
                const group = NAV_GROUPS[key]
                const isActive = group.links.some(l => l.href === pathname)
                const isOpen = openDropdown === key
                const Icon = group.icon

                return (
                  <div
                    key={key}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(key)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      className={cn(
                        'flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                        isActive
                          ? (hasDarkBg ? 'text-white' : 'text-teal')
                          : isOpen
                            ? (hasDarkBg ? 'text-white bg-white/10' : 'text-navy bg-navy/[0.04]')
                            : (hasDarkBg ? 'text-white/70 hover:text-white hover:bg-white/[0.06]' : 'text-navy/55 hover:text-navy hover:bg-navy/[0.03]')
                      )}
                      aria-expanded={isOpen}
                    >
                      {group.label}
                      <ChevronDown
                        size={12}
                        className={cn(
                          'transition-transform duration-200 opacity-50',
                          isOpen && 'rotate-180 opacity-100'
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5"
                        >
                          <div className="w-[300px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.10),0_1px_3px_rgba(0,0,0,0.04)] border border-black/[0.05] p-2 backdrop-blur-xl">
                            {/* Group header */}
                            <div className="flex items-center gap-2 px-3.5 pt-2 pb-2.5 mb-0.5">
                              <div className="w-6 h-6 rounded-md bg-teal/8 flex items-center justify-center">
                                <Icon size={12} className="text-teal" />
                              </div>
                              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-navy/30">{group.label}</span>
                            </div>

                            {group.links.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                  'group/item flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-150',
                                  pathname === link.href
                                    ? 'bg-teal/[0.06]'
                                    : 'hover:bg-gray-50/80'
                                )}
                              >
                                <div className={cn(
                                  "w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200",
                                  pathname === link.href
                                    ? 'bg-teal scale-125'
                                    : 'bg-navy/10 group-hover/item:bg-teal/50 group-hover/item:scale-110'
                                )} />
                                <div className="flex flex-col gap-0.5 min-w-0">
                                  <span className={cn(
                                    "text-[13px] font-semibold transition-colors duration-150",
                                    pathname === link.href ? 'text-teal' : 'text-navy/80 group-hover/item:text-navy'
                                  )}>
                                    {link.label}
                                  </span>
                                  <span className={cn(
                                    "text-[11px] leading-snug transition-colors duration-150",
                                    pathname === link.href ? 'text-teal/60' : 'text-navy/40 group-hover/item:text-navy/55'
                                  )}>
                                    {link.desc}
                                  </span>
                                </div>
                                <ArrowRight size={12} className={cn(
                                  "ml-auto flex-shrink-0 transition-all duration-200 opacity-0 -translate-x-1",
                                  "group-hover/item:opacity-40 group-hover/item:translate-x-0",
                                  pathname === link.href && "opacity-30 translate-x-0"
                                )} />
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}

              {/* Separator before CTA */}
              <div className={cn("w-px h-4 mx-2", hasDarkBg ? "bg-white/15" : "bg-navy/10")} />

              {/* CTA */}
              <Link
                href="/contatti"
                className={cn(
                  "group relative inline-flex items-center gap-1.5 px-5 py-2 text-[13px] font-semibold rounded-full overflow-hidden transition-all duration-300",
                  hasDarkBg
                    ? "bg-white text-navy hover:bg-teal hover:text-white shadow-lg shadow-black/10"
                    : "bg-teal text-white hover:bg-teal-dark shadow-lg shadow-teal/20 hover:shadow-xl hover:shadow-teal/30"
                )}
              >
                <span>Contattami</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "lg:hidden relative z-10 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200",
                isMobileMenuOpen
                  ? "text-white"
                  : hasDarkBg
                    ? "text-white/80"
                    : "text-navy/70"
              )}
              aria-label={isMobileMenuOpen ? 'Chiudi menu' : 'Apri menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu — no per-item animations for speed */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-navy-dark" />

            <nav
              className="relative h-full flex flex-col pt-[72px] overflow-y-auto"
              aria-label="Menu mobile"
            >
              {/* Primary */}
              <div className="px-6 pt-6 pb-3">
                {NAV_GROUPS.primary.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center justify-between py-3 px-4 -mx-1 rounded-xl transition-colors',
                      pathname === link.href ? 'text-white bg-white/8' : 'text-white/65'
                    )}
                  >
                    <span className="text-[17px] font-display font-medium">{link.label}</span>
                    {pathname === link.href && (
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-light" />
                    )}
                  </Link>
                ))}
              </div>

              {/* Groups */}
              {dropdownKeys.map((key) => {
                const group = NAV_GROUPS[key]
                const Icon = group.icon
                return (
                  <div key={key} className="px-6 py-3 border-t border-white/[0.06]">
                    <div className="flex items-center gap-2 px-3 mb-2">
                      <Icon size={13} className="text-teal-light/70" />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-teal-light/50">{group.label}</span>
                    </div>
                    {group.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          'flex items-center justify-between py-2.5 px-4 -mx-1 rounded-xl transition-colors',
                          pathname === link.href ? 'text-white bg-white/8' : 'text-white/65'
                        )}
                      >
                        <div>
                          <span className="text-[15px] font-display font-medium block">{link.label}</span>
                          <span className="text-[11px] text-white/50 leading-tight">{link.desc}</span>
                        </div>
                        {pathname === link.href && (
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-light flex-shrink-0" />
                        )}
                      </Link>
                    ))}
                  </div>
                )
              })}

              {/* CTA */}
              <div className="px-6 pt-4 pb-2">
                <Link
                  href="/contatti"
                  className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-teal text-white text-[15px] font-semibold rounded-xl active:bg-teal-dark transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Mail size={16} />
                  Contattami
                </Link>
              </div>

              {/* Bottom */}
              <div className="mt-auto px-6 py-5 border-t border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {[
                      { href: SITE_CONFIG.links.linkedin, label: 'LinkedIn', icon: Linkedin },
                      { href: SITE_CONFIG.links.facebook, label: 'Facebook', icon: Facebook },
                      { href: SITE_CONFIG.links.youtube, label: 'YouTube', icon: Youtube },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-white/50 hover:text-white/70 transition-colors"
                        aria-label={s.label}
                      >
                        <s.icon size={16} />
                      </a>
                    ))}
                  </div>
                  <span className="text-[10px] text-white/15 tracking-wide">
                    &copy; {new Date().getFullYear()}
                  </span>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
