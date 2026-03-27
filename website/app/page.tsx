'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowRight, ChevronRight, ChevronLeft, Target, Eye, Shield, Users, Brain, Star, Compass, Sparkles, Quote, ArrowUpRight, GraduationCap, Building2, Globe, Handshake, CheckCircle, RefreshCw, TrendingUp } from 'lucide-react'
import { InFlowSection } from '@/components/sections/InFlowSection'
import { AliceHomepageSection } from '@/components/alice/AliceHomepageSection'

// Animation variants - optimized for performance
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } }
}

const slideIn = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }
}

// Hero Slider Data
const heroSlides = [
  {
    image: '/images/hero-1.jpg',
    alt: 'Luca Pellicari - Identity Coach e fondatore di Quantum Academy',
    subtitle: 'Benvenuto',
    title: 'Adesso siamo qui,',
    highlight: 'tu ed io.',
    description: 'E sono felice che tu sia arrivato.',
  },
  {
    image: '/images/hero-2.jpg',
    alt: 'Percorso di trasformazione identitaria',
    subtitle: 'La Porta',
    title: 'Questa non è',
    highlight: 'una pagina web.',
    description: 'È una porta. La porta che conduce alla tua identità profonda, alla tua visione, alla tua verità.',
  },
  {
    image: '/images/hero-3.jpg',
    alt: 'Viaggio di crescita personale e consapevolezza',
    subtitle: 'Il Viaggio',
    title: 'Sei pronto ad andare',
    highlight: 'oltre?',
    description: 'Oltre la maschera. Oltre il ruolo. Oltre ciò che fai. Per incontrare ciò che sei.',
  },
]

// Animated Counter
function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return <span ref={ref}>{count}{suffix}</span>
}

// ============================================
// HERO SECTION
// ============================================
function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

  useEffect(() => {
    if (!isAutoPlaying || isPaused) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6500)
    return () => clearInterval(interval)
  }, [isAutoPlaying, isPaused])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-navy-dark"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image src={slide.image} alt={slide.alt} fill className="object-cover" priority={index === 0} loading={index === 0 ? "eager" : "lazy"} quality={65} sizes="100vw" />
            {/* Premium gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy-dark/60 to-navy-dark/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/50 via-transparent to-transparent" />
          </div>
        ))}
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent" />

      {/* Subtle corner accents - hidden on mobile to prevent overflow */}
      <div className="hidden md:block absolute top-32 left-8 w-24 h-24 border-l border-t border-cream/10 rounded-tl-3xl" />
      <div className="hidden md:block absolute bottom-32 right-8 w-24 h-24 border-r border-b border-teal/10 rounded-br-3xl" />

      {/* Content */}
      <motion.div className="relative z-10 h-full flex items-center" style={{ opacity }}>
        <div className="w-full px-6 md:px-16 lg:px-24">
          <div className="max-w-3xl">
            {/* Subtitle with line */}
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-px bg-teal-light" />
              <span className="text-teal-light text-sm uppercase tracking-[0.2em] font-medium">
                {heroSlides[currentSlide].subtitle}
              </span>
            </div>

            <div className="relative min-h-[160px] md:min-h-[180px] lg:min-h-[200px] mb-8">
              {heroSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-cream leading-[1.05] tracking-tight">
                    {slide.title}{' '}
                    <span className="text-teal-light italic">{slide.highlight}</span>
                  </h1>
                </div>
              ))}
            </div>

            <div className="relative min-h-[4.5rem] md:min-h-[4rem] mb-12">
              {heroSlides.map((slide, index) => (
                <p
                  key={index}
                  className={`absolute inset-0 text-cream/80 text-base md:text-xl leading-relaxed max-w-xl transition-opacity duration-500 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  {slide.description}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 md:gap-5">
              <Link href="/chi-sono" className="group relative inline-flex items-center gap-3 bg-teal text-white px-7 md:px-9 py-3.5 md:py-4 rounded-full font-semibold overflow-hidden shadow-xl shadow-teal/25 hover:shadow-2xl hover:shadow-teal/35 transition-all duration-500 hover:-translate-y-0.5">
                <span className="relative z-10">Scopri chi sono</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-teal-dark opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
              <Link href="/contatti" className="group relative inline-flex items-center gap-3 px-7 md:px-9 py-3.5 md:py-4 border border-cream/30 text-cream rounded-full font-medium backdrop-blur-sm hover:border-cream/60 hover:bg-white/5 transition-all duration-300">
                <span>Contattami</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <div className="absolute bottom-6 md:bottom-12 left-0 right-0 z-20 px-6 md:px-16 lg:px-24">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-8">
            {/* Slide counter */}
            <div className="flex items-center gap-2 md:gap-3 text-sm font-medium">
              <span className="text-cream text-xl md:text-2xl font-display">0{currentSlide + 1}</span>
              <span className="text-cream/60">/</span>
              <span className="text-cream/60">0{heroSlides.length}</span>
            </div>

            {/* Progress bar */}
            <div className="w-20 md:w-48">
              <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-teal to-teal-light"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 6.5, ease: "linear" }}
                  key={currentSlide}
                />
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-2 md:gap-3">
            <button
              onClick={prevSlide}
              aria-label="Slide precedente"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-cream/20 flex items-center justify-center text-cream/60 hover:text-cream hover:border-cream/40 hover:bg-white/5 active:bg-white/10 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Slide successiva"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-cream/20 flex items-center justify-center text-cream/60 hover:text-cream hover:border-cream/40 hover:bg-white/5 active:bg-white/10 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-cream/60 text-xs uppercase tracking-widest">Scroll</span>
        <div
          className="w-5 h-8 rounded-full border border-cream/20 flex items-start justify-center p-1.5 animate-bounce"
          style={{ animationDuration: '2s' }}
        >
          <div className="w-1 h-2 rounded-full bg-teal-light" />
        </div>
      </div>
    </section>
  )
}

// ============================================
// OPENING SECTION - Creative Split Layout
// ============================================
function OpeningSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[85vh]">
        {/* Left - Dark Side */}
        <div className="relative bg-navy-dark py-28 lg:py-40 px-6 md:px-16 lg:px-20 flex items-center overflow-hidden">
          {/* Floating Number — large watermark */}
          <div className="absolute top-8 right-6 md:top-10 md:right-10 text-[10rem] md:text-[16rem] font-display text-cream/[0.025] leading-none select-none pointer-events-none">
            7
          </div>

          {/* Left accent bar */}
          <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-teal via-teal/30 to-transparent" />

          {/* Subtle bottom gradient fade */}
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#1a2f42] to-transparent pointer-events-none" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="relative z-10 max-w-xl"
          >
            {/* Label */}
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-12">
              <span className="w-10 h-[2px] bg-gradient-to-r from-teal-light to-teal-light/0" />
              <span className="text-teal-light/70 text-[13px] uppercase tracking-[0.25em] font-semibold">
                Una verità semplice
              </span>
            </motion.div>

            {/* Negation lines — progressive fade */}
            <motion.div variants={fadeUp} className="space-y-4 mb-16">
              {[
                { text: 'Io non sono un formatore.', opacity: 'text-cream/25' },
                { text: 'Non sono un motivatore.', opacity: 'text-cream/20' },
                { text: 'Non sono un guru.', opacity: 'text-cream/15' },
              ].map((item, i) => (
                <p key={i} className={`font-display text-[26px] md:text-[32px] ${item.opacity} tracking-tight leading-snug`}>
                  {item.text}
                </p>
              ))}
            </motion.div>

            {/* Divider */}
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-12">
              <div className="h-[2px] w-12 bg-gradient-to-r from-teal-light to-transparent" />
              <div className="h-[2px] w-4 bg-teal-light/30" />
            </motion.div>

            {/* Main statement */}
            <motion.p
              variants={fadeUp}
              className="font-display text-[28px] md:text-[34px] lg:text-[40px] text-cream leading-[1.2] tracking-tight"
            >
              Sono un uomo che ha vissuto{' '}
              <span className="relative text-teal-light">
                sette rinascite
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-teal-light/50 to-transparent" />
              </span>.
            </motion.p>
          </motion.div>
        </div>

        {/* Right - Light Side */}
        <div className="relative bg-white py-28 lg:py-40 px-6 md:px-16 lg:px-20 flex items-center overflow-hidden">
          {/* Decorative circle */}
          <div className="hidden lg:block absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-56 h-56 rounded-full border border-teal/8" />
          <div className="absolute bottom-14 right-14 w-28 h-28 rounded-full bg-gradient-to-br from-teal/5 to-teal/0" />
          {/* Right accent bar */}
          <div className="hidden lg:block absolute top-0 right-0 w-[3px] h-full bg-gradient-to-b from-transparent via-teal/10 to-transparent" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="relative z-10 max-w-lg"
          >
            {/* Opening statement */}
            <motion.p
              variants={fadeUp}
              className="font-serif text-[22px] md:text-[26px] text-navy/65 italic leading-[1.6] mb-12"
            >
              E oggi ho scelto di mettere tutta la mia esperienza al servizio delle persone che vogliono finalmente{' '}
              <span className="text-teal font-bold not-italic">riconoscersi</span>.
            </motion.p>

            {/* Callout card */}
            <motion.div
              variants={fadeUp}
              className="relative bg-gradient-to-br from-teal/[0.06] to-teal/[0.02] p-7 md:p-8 rounded-2xl border border-teal/10 mb-14"
            >
              {/* Accent bar */}
              <div className="absolute left-0 top-5 bottom-5 w-[3px] rounded-full bg-gradient-to-b from-teal to-teal/30" />
              <p className="text-navy/80 text-[17px] leading-[1.75] pl-4">
                Se sei qui, se sei arrivato fino a questa riga, è perché una parte di te sente che{' '}
                <span className="text-teal font-bold">è il momento di andare oltre</span>.
              </p>
            </motion.div>

            {/* "Oltre" items */}
            <motion.div variants={fadeUp} className="space-y-0">
              {[
                { text: 'Oltre la maschera', color: 'bg-teal', hoverColor: 'group-hover:text-teal' },
                { text: 'Oltre il ruolo', color: 'bg-teal-dark', hoverColor: 'group-hover:text-teal-dark' },
                { text: 'Per incontrare chi sei', color: 'bg-navy', hoverColor: 'group-hover:text-navy-dark' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-5 py-4 border-b border-navy/5 last:border-b-0 cursor-default"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-navy/[0.04] flex items-center justify-center group-hover:bg-navy/[0.08] transition-colors duration-300">
                    <span className={`w-2 h-2 rounded-full ${item.color} group-hover:scale-125 transition-transform duration-300`} />
                  </div>
                  <span className={`text-navy/80 text-[18px] font-semibold tracking-tight group-hover:translate-x-1 ${item.hoverColor} transition-all duration-300`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Closing line */}
            <motion.div
              variants={fadeUp}
              className="mt-14 pt-7 border-t border-navy/8"
            >
              <p className="text-navy/45 text-[15px] font-sans tracking-wide leading-relaxed">
                Lascia che ti dica una cosa semplice e vera.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// CHI SONO SECTION - Editorial Premium Layout
// ============================================
function ChiSonoSection() {
  return (
    <section className="py-28 lg:py-36 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            className="lg:col-span-5 order-2 lg:order-1"
          >
            <div className="relative">
              {/* Background accent shape */}
              <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl bg-gradient-to-br from-teal/8 to-teal/3 -z-10" />

              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl shadow-navy/10">
                <Image
                  src="/images/luca-portrait.jpg"
                  alt="Luca Pellicari - Identity Coach"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  quality={65}
                  loading="lazy"
                />
                {/* Subtle overlay gradient at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-dark/30 to-transparent" />
              </div>

              {/* Floating Stats Card — refined */}
              <div className="absolute -bottom-6 -right-4 md:-bottom-8 md:-right-6 bg-white rounded-2xl p-5 md:p-6 shadow-xl shadow-navy/8 border border-navy/5 hidden md:block">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <p className="text-[32px] font-display text-teal leading-none mb-1"><AnimatedNumber value={7} /></p>
                    <p className="text-[11px] text-navy/50 uppercase tracking-[0.15em] font-semibold">Rinascite</p>
                  </div>
                  <div className="border-x border-navy/6 px-2">
                    <p className="text-[32px] font-display text-teal leading-none mb-1"><AnimatedNumber value={30} suffix="+" /></p>
                    <p className="text-[11px] text-navy/50 uppercase tracking-[0.15em] font-semibold">Anni</p>
                  </div>
                  <div>
                    <p className="text-[32px] font-display text-navy-dark leading-none mb-1"><AnimatedNumber value={1000} suffix="+" /></p>
                    <p className="text-[11px] text-navy/50 uppercase tracking-[0.15em] font-semibold">Vite</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="lg:col-span-7 order-1 lg:order-2"
          >
            {/* Label */}
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
              <span className="w-10 h-[2px] bg-gradient-to-r from-teal to-teal/0" />
              <span className="text-teal text-[13px] uppercase tracking-[0.2em] font-semibold">Chi Sono</span>
            </motion.div>

            {/* Name */}
            <motion.h2 variants={fadeUp} className="font-display text-[40px] md:text-[52px] lg:text-[60px] text-navy-dark mb-5 tracking-tight leading-[1.05]">
              Io sono Luca Pellicari
            </motion.h2>

            {/* Role subtitle */}
            <motion.p variants={fadeUp} className="font-serif text-[19px] md:text-[21px] text-navy/50 italic mb-8 leading-relaxed">
              Identity Coach &bull; Autore &bull; Fondatore di Quantum Academy
            </motion.p>

            {/* Credential badges — refined */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2.5 mb-10">
              {[
                { text: 'Laurea in Scienze Politiche — 110 e Lode', accent: true },
                { text: 'Docente Universitario', accent: false },
                { text: 'Ricercatore ResearchGate', accent: false },
                { text: 'Accreditato Regione Lombardia', accent: false },
              ].map((badge) => (
                <span
                  key={badge.text}
                  className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[12px] font-semibold tracking-wide ${
                    badge.accent
                      ? 'bg-teal/8 border border-teal/15 text-teal'
                      : 'bg-navy/[0.03] border border-navy/8 text-navy/65'
                  }`}
                >
                  {badge.accent && <span className="w-1.5 h-1.5 rounded-full bg-teal/50" />}
                  {badge.text}
                </span>
              ))}
            </motion.div>

            {/* Body text */}
            <motion.div variants={fadeUp} className="space-y-5 mb-12">
              <p className="text-navy/70 text-[18px] leading-[1.8]">
                Sono un uomo che non ha mai avuto paura di guardare la vita negli occhi.
                Ho attraversato la malattia, la rinascita, la disciplina del paracadutismo,
                i fallimenti, la rinascita professionale.
              </p>
              <p className="text-navy/70 text-[18px] leading-[1.8]">
                E ho trasformato tutto in un metodo: <span className="text-teal font-bold">In-Flow</span>.
              </p>
            </motion.div>

            {/* Quote — editorial style */}
            <motion.blockquote
              variants={fadeUp}
              className="relative pl-7 py-4 mb-12"
            >
              <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-teal to-teal/20" />
              <p className="text-[22px] md:text-[26px] font-serif italic text-navy-dark leading-[1.45]">
                Il mio talento non è motivarti.
              </p>
              <p className="text-[22px] md:text-[26px] font-serif italic text-teal leading-[1.45] mt-1">
                Il mio talento è aiutarti a ricordare chi sei.
              </p>
            </motion.blockquote>

            {/* CTA link */}
            <motion.div variants={fadeUp}>
              <Link href="/chi-sono" className="group inline-flex items-center gap-4">
                <span className="relative text-[16px] font-semibold text-navy-dark">
                  Scopri la mia storia
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-teal group-hover:w-full transition-all duration-400" />
                </span>
                <span className="w-11 h-11 rounded-full border-2 border-navy/15 flex items-center justify-center group-hover:border-teal group-hover:bg-teal transition-all duration-300">
                  <ArrowUpRight className="w-[18px] h-[18px] text-navy/60 group-hover:text-white transition-colors duration-300" />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


// ============================================
// MISSIONE SECTION - Bento Grid
// ============================================
const missionItems = [
  { icon: Eye, label: 'Identità', desc: 'Chi sei veramente' },
  { icon: Target, label: 'Visione', desc: 'Dove stai andando' },
  { icon: Shield, label: 'Verità', desc: 'La tua essenza' },
  { icon: Users, label: 'Relazioni', desc: 'Connessioni autentiche' },
  { icon: Brain, label: 'Consapevolezza', desc: 'Presenza totale' },
  { icon: Sparkles, label: 'Metaquantistica', desc: 'Scienza della coscienza' },
  { icon: Star, label: 'Leadership Alpha', desc: 'Guida naturale' },
  { icon: Compass, label: 'In-Flow', desc: 'Stato naturale' },
]

function MissioneSection() {
  return (
    <section className="py-28 lg:py-36 bg-cream overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="w-10 h-[2px] bg-gradient-to-r from-transparent to-teal/40" />
            <span className="text-teal text-[13px] uppercase tracking-[0.2em] font-semibold">La Mia Missione</span>
            <span className="w-10 h-[2px] bg-gradient-to-l from-transparent to-teal/40" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-navy-dark mb-6 tracking-tight">
            Trasformo le persone aiutandole a riconoscersi.
          </h2>
          <p className="text-base md:text-lg text-navy/60 max-w-xl mx-auto leading-relaxed">
            Il mio lavoro è semplice: ti porto dentro te stesso.
            Lo faccio con delicatezza, con forza, con consapevolezza e con verità.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {missionItems.map((item) => (
            <div
              key={item.label}
              className="group relative bg-white border border-navy/6 rounded-2xl p-4 md:p-6 shadow-sm hover:border-teal/20 hover:shadow-lg hover:shadow-teal/5 transition-all duration-300 cursor-pointer"
            >
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-teal/10 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-teal group-hover:scale-105 transition-all duration-300">
                <item.icon className="w-4 h-4 md:w-5 md:h-5 text-teal group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-semibold text-navy mb-1 text-xs md:text-sm">{item.label}</h3>
              <p className="text-xs text-navy/60 hidden md:block">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-14">
          <Link href="/missione" className="group inline-flex items-center gap-3 bg-navy text-white px-8 py-4 rounded-full font-medium shadow-lg shadow-navy/10 hover:shadow-xl hover:shadow-navy/15 hover:-translate-y-0.5 transition-all duration-300">
            <span>Scopri la mia missione</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ============================================
// IL VERO PROBLEMA - Core Message Section
// ============================================
function IlVeroProblemaSection() {
  return (
    <section className="relative py-28 lg:py-36 bg-white overflow-hidden">
      {/* Background accents - reduced blur for performance */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-teal/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-navy/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-12 md:mb-20"
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mb-8">
            <span className="w-10 h-[2px] bg-gradient-to-r from-transparent to-teal/40" />
            <span className="text-teal text-[13px] uppercase tracking-[0.2em] font-semibold">Il Vero Problema</span>
            <span className="w-10 h-[2px] bg-gradient-to-l from-transparent to-teal/40" />
          </motion.div>

          <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-5xl lg:text-6xl text-navy mb-6 md:mb-8 tracking-tight leading-tight">
            Il problema non è ottenere risultati.{' '}
            <span className="text-teal italic">È mantenerli.</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-base md:text-xl text-navy/60 max-w-2xl mx-auto leading-relaxed">
            Quando si lavora bene, i risultati arrivano. Ma il vero problema è un altro:
            è renderli coerenti, stabili e replicabili. E questo è il cuore di tutto quello che faccio.
          </motion.p>
        </motion.div>

        {/* Three Result Pillars */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          {[
            {
              icon: CheckCircle,
              title: 'Coerenti',
              description: 'Allineati con ciò che l\'impresa rappresenta realmente — la sua identità. Non risultati casuali, ma risultati che rispecchiano chi sei.',
            },
            {
              icon: RefreshCw,
              title: 'Stabili',
              description: 'Non dipendono dall\'entusiasmo del momento, ma da una struttura solida. È la struttura che genera risultati che durano.',
            },
            {
              icon: TrendingUp,
              title: 'Replicabili',
              description: 'Premiano tutta la filiera, dall\'addetto alle pulizie al top-manager. Risultati condivisibili che creano ricchezza per tutti.',
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="group relative"
            >
              <div className="relative bg-white border border-navy/8 rounded-2xl p-6 md:p-8 shadow-sm hover:border-teal/20 hover:shadow-xl hover:shadow-teal/5 transition-all duration-300 h-full">
                <div className="w-12 md:w-14 h-12 md:h-14 rounded-xl bg-teal/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-teal group-hover:scale-105 transition-all duration-300">
                  <item.icon className="w-6 md:w-7 h-6 md:h-7 text-teal group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-teal/10 font-display text-5xl md:text-6xl font-bold absolute top-4 md:top-6 right-6 md:right-8">
                  0{index + 1}
                </span>
                <h3 className="font-display text-xl md:text-2xl text-navy font-semibold mb-2 md:mb-3">
                  Risultati {item.title}
                </h3>
                <p className="text-navy/60 text-sm md:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-10 md:mt-16"
        >
          <div className="inline-flex items-center gap-3 md:gap-4 bg-navy text-white rounded-full px-5 md:px-8 py-3 md:py-4 shadow-lg shadow-navy/10">
            <span className="w-2 h-2 rounded-full bg-teal-light animate-pulse flex-shrink-0" />
            <p className="font-medium text-sm md:text-base">
              Io non vendo contenuti. Non vendo motivazione. Lavoro sulla <span className="text-teal-light">struttura</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================
// QUANTUM ACADEMY - Immersive Dark Section
// ============================================
function QuantumAcademySection() {
  return (
    <section className="relative py-28 lg:py-36 bg-navy-dark overflow-hidden">
      {/* Background - reduced blur for performance */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-teal rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-teal-dark rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.span variants={fadeUp} className="inline-block px-4 py-2 bg-teal text-white text-sm font-medium rounded-full mb-8">
              Quantum Academy
            </motion.span>

            <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-8 leading-tight">
              Il sogno che non sapevo di sognare, diventato realtà.
            </motion.h2>

            <motion.div variants={fadeUp} className="space-y-6 text-white/70 text-base md:text-lg mb-8">
              <p className="text-teal-light text-lg md:text-xl font-medium">Quantum Academy non è una scuola.</p>
              <p>È un luogo di trasformazione. È un portale. È un laboratorio di identità.</p>
            </motion.div>

            {/* Founders */}
            <motion.div variants={fadeUp} className="mb-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-teal/30 border-2 border-navy-dark flex items-center justify-center text-xs text-white font-medium">LP</div>
                  <div className="w-10 h-10 rounded-full bg-teal-light/30 border-2 border-navy-dark flex items-center justify-center text-xs text-white font-medium">L</div>
                  <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-navy-dark flex items-center justify-center text-xs text-white font-medium">A</div>
                </div>
                <p className="text-white/60 text-sm">È nata da tre anime in risonanza: <span className="text-white">io, Lucia e Alberto</span>.</p>
              </div>
              <p className="text-white/70 pl-14">E oggi sta diventando una nuova forma di conoscenza: <span className="text-teal-light">pratica, profonda, scientifica, spirituale</span>.</p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Link href="/quantum-academy" className="group relative inline-flex items-center gap-3 bg-white text-navy px-6 md:px-8 py-3.5 md:py-4 rounded-full font-medium overflow-hidden shadow-xl shadow-black/10 hover:shadow-2xl transition-all duration-500">
                <span className="relative z-10">Entra in Quantum Academy</span>
                <span className="relative z-10 w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center group-hover:bg-teal group-hover:text-white transition-all duration-300">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 relative">
              <Image
                src="/images/quantum-academy.jpg"
                alt="Quantum Academy"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={60}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-transparent to-transparent" />
            </div>
            {/* Decorative Elements */}
            <div className="hidden md:block absolute -bottom-4 -right-4 w-24 h-24 border-2 border-teal/30 rounded-2xl" />
            <div className="hidden md:block absolute -top-4 -left-4 w-16 h-16 bg-teal/20 rounded-xl blur-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// ALPHAKOM SECTION - Clean Minimal
// ============================================
function AlphakomSection() {
  const points = [
    { text: 'Impari a guidare, non a seguire.', highlight: false },
    { text: 'A vedere, non a reagire.', highlight: false },
    { text: 'A influenzare in modo consapevole.', highlight: false },
    { text: 'A creare ricchezza — economica, relazionale, spirituale.', highlight: false },
    { text: 'A entrare nel tuo stato naturale: In-Flow.', highlight: true },
  ]

  return (
    <section className="py-28 lg:py-36 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden relative shadow-2xl">
              <Image
                src="/images/luca-speaking.jpg"
                alt="Alphakom"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={60}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/30 to-transparent" />
            </div>
            {/* Decorative */}
            <div className="hidden md:block absolute -bottom-6 -left-6 w-32 h-32 border-2 border-teal/20 rounded-2xl -z-10" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <span className="w-10 h-[2px] bg-gradient-to-r from-teal to-teal/0" />
              <span className="text-teal text-[13px] uppercase tracking-[0.2em] font-semibold">AlphaKom</span>
            </motion.div>

            <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-4xl lg:text-5xl text-navy mb-3">
              Il Metodo che Trasforma.
            </motion.h2>

            <motion.p variants={fadeUp} className="text-xs text-navy/55 font-medium tracking-[0.12em] uppercase mb-10">
              Advanced Leadership Program for High Achievement
            </motion.p>

            <motion.div variants={fadeUp} className="space-y-3 md:space-y-4 mb-10">
              {points.map((point, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl border transition-all ${
                    point.highlight
                      ? 'bg-gradient-to-r from-teal/10 to-teal/5 border-teal/30 shadow-md'
                      : 'bg-white border-navy/6 hover:border-teal/30 hover:shadow-md'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    point.highlight ? 'bg-teal text-white' : 'bg-teal/10'
                  }`}>
                    <span className={`text-sm font-medium ${point.highlight ? '' : 'text-teal'}`}>{i + 1}</span>
                  </div>
                  <p className={`text-sm md:text-base ${point.highlight ? 'text-navy font-medium' : 'text-navy/80'}`}>{point.text}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp}>
              <Link href="/alphakom" className="group relative inline-flex items-center gap-3 text-navy font-medium">
                <span className="relative">
                  Scopri Alphakom
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal group-hover:w-full transition-all duration-300" />
                </span>
                <span className="w-10 h-10 rounded-full border-2 border-navy/20 flex items-center justify-center group-hover:border-teal group-hover:bg-teal transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 group-hover:text-white transition-colors duration-300" />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// QUOTE SECTION - Full Width Statement
// ============================================
function QuoteSection() {
  return (
    <section className="py-28 lg:py-36 bg-cream relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-16 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <Quote className="w-8 h-8 md:w-10 md:h-10 text-teal/30 mx-auto mb-8 md:mb-10" />
          <p className="font-display text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-navy leading-[1.3] tracking-tight mb-8 md:mb-10">
            Non sei quello che ti è successo.<br />
            <span className="text-teal italic">Sei quello che scegli di diventare.</span>
          </p>
          <div className="flex items-center justify-center gap-5">
            <span className="w-10 h-px bg-teal/40" />
            <span className="text-teal font-medium text-sm uppercase tracking-widest">Luca Pellicari</span>
            <span className="w-10 h-px bg-teal/40" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================
// PERCORSI SECTION - Interactive Grid
// ============================================
const percorsiItems = [
  { title: 'Formazione identitaria', icon: Eye },
  { title: 'Leadership e comunicazione', icon: Users },
  { title: 'Consapevolezza professionale', icon: Brain },
  { title: 'Appagamento personale', icon: Star },
  { title: 'Cambiamento interiore', icon: Compass },
  { title: 'Metaquantistica applicata', icon: Sparkles },
]

function PercorsiSection() {
  return (
    <section className="py-28 lg:py-36 bg-navy-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-10 h-[2px] bg-gradient-to-r from-transparent to-teal-light/40" />
            <span className="text-teal-light text-[13px] uppercase tracking-[0.2em] font-semibold">Cosa Possiamo Fare</span>
            <span className="w-10 h-[2px] bg-gradient-to-l from-transparent to-teal-light/40" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Percorsi, seminari, corsi, eventi.
          </h2>
          <p className="text-base md:text-lg text-white/70">
            Metodi pratici per crescere, evolvere, trasformare.
          </p>
        </div>

        {/* Cards Grid - Simple CSS */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {percorsiItems.map((item) => (
            <div
              key={item.title}
              className="group p-5 md:p-6 lg:p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-teal/30 transition-all duration-300 cursor-pointer"
            >
              <item.icon className="w-6 h-6 md:w-8 md:h-8 text-teal-light mb-3 md:mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-medium text-sm md:text-base">{item.title}</h3>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Link href="/percorsi" className="group inline-flex items-center gap-3 bg-teal text-white px-8 py-4 rounded-full font-medium shadow-lg shadow-teal/25 hover:shadow-xl hover:shadow-teal/35 hover:-translate-y-0.5 transition-all duration-300">
            <span>Scopri i percorsi</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  )
}


// ============================================
// PARTNERSHIP SECTION
// ============================================
const partnerCategories = [
  {
    icon: GraduationCap,
    title: 'Università',
    description: 'Collaborazioni accademiche, docenze universitarie e ricerca scientifica.',
    partners: ['Docenza in Negoziazione e Analisi del Comportamento', 'Pubblicazioni su ResearchGate'],
  },
  {
    icon: Building2,
    title: 'Aziende',
    description: 'Formazione identitaria e leadership per team aziendali e manager.',
    partners: ['Pyramis Group', 'Programmi corporate su misura'],
  },
  {
    icon: GraduationCap,
    title: 'Scuole & Formazione',
    description: 'Percorsi accreditati e programmi formativi professionali.',
    partners: ['Accreditamento Regione Lombardia', 'Corsi professionali AI e lavoro'],
  },
  {
    icon: Globe,
    title: 'Istituzioni',
    description: 'Partnership istituzionali e progetti di formazione internazionale.',
    partners: ['Progetti di formazione internazionale', 'Collaborazioni istituzionali'],
  },
]

function PartnershipSection() {
  return (
    <section className="py-28 lg:py-36 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="w-10 h-[2px] bg-gradient-to-r from-transparent to-teal/40" />
            <span className="text-teal text-[13px] uppercase tracking-[0.2em] font-semibold">Partnership</span>
            <span className="w-10 h-[2px] bg-gradient-to-l from-transparent to-teal/40" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-navy mb-6 tracking-tight">
            Chi crede in questo progetto.
          </h2>
          <p className="text-base md:text-lg text-navy/60 max-w-2xl mx-auto leading-relaxed">
            Università, aziende, scuole e istituzioni che condividono la nostra visione
            di crescita, consapevolezza e trasformazione.
          </p>
        </div>

        {/* Partner Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {partnerCategories.map((category) => (
            <div
              key={category.title}
              className="group relative bg-white border border-navy/5 rounded-2xl p-6 md:p-8 hover:border-teal/20 hover:shadow-xl hover:shadow-teal/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-6 group-hover:bg-teal group-hover:scale-105 transition-all duration-300">
                <category.icon className="w-6 h-6 text-teal group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-display text-lg md:text-xl text-navy font-semibold mb-3">{category.title}</h3>
              <p className="text-navy/60 text-sm leading-relaxed mb-5">{category.description}</p>
              <ul className="space-y-2">
                {category.partners.map((partner, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-navy/70">
                    <span className="w-1 h-1 rounded-full bg-teal mt-2 flex-shrink-0" />
                    <span>{partner}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust Indicator */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 md:gap-4 px-6 md:px-8 py-3 md:py-4 bg-navy/5 rounded-full">
            <Handshake className="w-5 h-5 text-teal flex-shrink-0" />
            <span className="text-navy/70 font-medium text-sm md:text-base">Vuoi diventare partner?</span>
            <Link href="/contatti" className="text-teal font-semibold hover:text-teal-dark transition-colors">
              Contattaci →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// LIBRI SECTION - Editorial Style
// ============================================
const libri = [
  { title: 'In-Flow', subtitle: 'Il metodo', image: '/images/book-inflow.jpg' },
  { title: 'Oltre la diagnosi', subtitle: 'La mia storia', image: '/images/book-diagnosi.jpg' },
  { title: 'La Guida alla Metaquantistica', subtitle: 'La scienza', image: '/images/book-metaquantistica.jpg' },
]

function LibriSection() {
  return (
    <section className="py-28 lg:py-36 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16"
        >
          <div>
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-4">
              <span className="w-10 h-[2px] bg-gradient-to-r from-teal to-teal/0" />
              <span className="text-teal text-[13px] uppercase tracking-[0.2em] font-semibold">I Miei Libri</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-4xl lg:text-5xl text-navy">
              Storie vere, identità vere.
            </motion.h2>
          </div>
          <motion.div variants={fadeUp}>
            <Link href="/libri" className="group relative inline-flex items-center gap-3 text-navy font-medium">
              <span className="relative">
                Vedi tutti
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal group-hover:w-full transition-all duration-300" />
              </span>
              <span className="w-10 h-10 rounded-full border-2 border-navy/20 flex items-center justify-center group-hover:border-teal group-hover:bg-teal transition-all duration-300">
                <ArrowUpRight className="w-4 h-4 group-hover:text-white transition-colors duration-300" />
              </span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
        >
          {libri.map((libro) => (
            <motion.div
              key={libro.title}
              variants={fadeUp}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 bg-white shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
                <Image
                  src={libro.image}
                  alt={libro.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  quality={60}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <p className="text-teal text-sm font-medium mb-1">{libro.subtitle}</p>
              <h3 className="font-display text-xl md:text-2xl text-navy group-hover:text-teal transition-colors">{libro.title}</h3>
            </motion.div>
          ))}
        </motion.div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-navy/5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            <span className="text-navy/70 font-medium text-sm">Altri progetti in arrivo…</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================
// BLOG SECTION - With Images
// ============================================
const blogPosts = [
  {
    title: 'Il coraggio di essere se stessi',
    excerpt: 'Scopri come abbracciare la tua vera identità e vivere autenticamente.',
    image: '/images/blog-1.jpg',
    category: 'Identità',
  },
  {
    title: 'Le 7 rinascite: la mia storia',
    excerpt: 'Un viaggio attraverso le trasformazioni che hanno definito chi sono oggi.',
    image: '/images/blog-2.jpg',
    category: 'Crescita',
  },
  {
    title: 'In-Flow: vivere nel proprio stato naturale',
    excerpt: 'Come trovare l\'equilibrio tra chi sei e ciò che fai ogni giorno.',
    image: '/images/blog-3.jpg',
    category: 'Metodo',
  },
]

function BlogSection() {
  return (
    <section className="py-28 lg:py-36 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <div>
              <motion.div variants={fadeUp} className="flex items-center gap-4 mb-4">
                <span className="w-10 h-[2px] bg-gradient-to-r from-teal to-teal/0" />
                <span className="text-teal text-[13px] uppercase tracking-[0.2em] font-semibold">Blog</span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-4xl lg:text-5xl text-navy mb-2">
                Pensieri liberi.<br />Verità condivise.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-teal text-base md:text-lg font-medium mb-3">
                Identità che si aprono.
              </motion.p>
              <motion.p variants={fadeUp} className="text-navy/70 text-sm md:text-base max-w-md">
                Scrivo per raccontare, per comprendere e per far vibrare qualcosa dentro chi legge.
              </motion.p>
            </div>
            <motion.div variants={fadeUp}>
              <Link href="/blog" className="group relative inline-flex items-center gap-3 text-navy font-medium">
                <span className="relative">
                  Tutti gli articoli
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal group-hover:w-full transition-all duration-300" />
                </span>
                <span className="w-10 h-10 rounded-full border-2 border-navy/20 flex items-center justify-center group-hover:border-teal group-hover:bg-teal transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 group-hover:text-white transition-colors duration-300" />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Blog Grid */}
          <motion.div
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
          >
            {blogPosts.map((post) => (
              <motion.article
                key={post.title}
                variants={fadeUp}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    quality={60}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-navy">
                    {post.category}
                  </span>
                </div>
                <h3 className="font-display text-lg md:text-xl text-navy mb-2 group-hover:text-teal transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-navy/60 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================
// CONTATTI SECTION - Creative Pro Design
// ============================================
function ContattiSection() {
  return (
    <section className="relative bg-navy-dark overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy-dark to-navy opacity-50" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 min-h-[450px] md:min-h-[550px] lg:min-h-[600px]">
          {/* Left Side - Dark with Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative flex items-center px-6 md:px-16 lg:px-20 py-16 md:py-20 lg:py-28"
          >
            {/* Accent Line */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-28 bg-gradient-to-b from-teal via-teal/50 to-transparent" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-8 h-px bg-teal/50" />
                <span className="text-teal-light text-xs uppercase tracking-[0.25em] font-medium">
                  Inizia ora
                </span>
              </div>

              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-cream leading-[1.1] tracking-tight mb-8">
                Vuoi lavorare<br />
                <span className="text-teal-light italic">con me?</span>
              </h2>

              <div className="space-y-3 text-cream/60 text-base md:text-lg max-w-sm">
                <p>Vuoi portarmi nella tua azienda?</p>
                <p>Vuoi iniziare il tuo percorso identitario?</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Teal Gradient with CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative flex items-center justify-center px-6 md:px-16 lg:px-20 py-16 md:py-20 lg:py-28 bg-gradient-to-br from-teal to-teal-dark"
          >
            {/* Decorative elements - hidden on mobile */}
            <div className="hidden md:block absolute top-10 right-10 w-16 h-16 rounded-full border border-cream/10" />
            <div className="hidden md:block absolute bottom-16 left-10 w-24 h-24 rounded-full border border-cream/5" />

            <div className="relative text-center lg:text-left">
              <p className="font-display text-3xl md:text-4xl lg:text-5xl text-cream leading-tight tracking-tight mb-8 md:mb-10">
                Scrivimi.<br />
                <span className="text-cream/80 font-serif italic">Sono qui.</span>
              </p>

              <Link
                href="/contatti"
                className="group inline-flex items-center gap-4 md:gap-5 bg-white text-navy-dark px-7 md:px-9 py-4 md:py-5 rounded-full text-base md:text-lg font-semibold shadow-xl shadow-navy-dark/20 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Contattami</span>
                <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-navy-dark flex items-center justify-center group-hover:bg-teal-dark transition-colors duration-300">
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-cream group-hover:translate-x-0.5 transition-transform duration-300" />
                </span>
              </Link>

              <p className="mt-8 md:mt-10 text-cream/60 text-sm tracking-wide">
                Il primo passo verso la tua trasformazione
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// IDENTITY HIGHLIGHTS - Carousel Marquee
// ============================================
const identityTags = [
  { text: '7 Rinascite', color: 'bg-teal/10 text-teal border-teal/20' },
  { text: 'Paracadutista Militare', color: 'bg-navy/5 text-navy/80 border-navy/15' },
  { text: 'Sopravvissuto al Cancro', color: 'bg-coral/10 text-coral border-coral/20' },
  { text: 'Scienza & Spiritualità', color: 'bg-teal/10 text-teal-dark border-teal/20' },
  { text: 'Portatore di Felicità', color: 'bg-coral/10 text-coral border-coral/20' },
  { text: 'Ricchezza Condivisa', color: 'bg-teal/10 text-teal border-teal/20' },
  { text: '30+ Anni di Esperienza', color: 'bg-navy/5 text-navy/80 border-navy/15' },
  { text: 'Docente Universitario', color: 'bg-navy/5 text-navy/80 border-navy/15' },
  { text: 'Fenice Cimbra', color: 'bg-coral/10 text-coral border-coral/20' },
  { text: 'Metodo In-Flow', color: 'bg-teal/10 text-teal border-teal/20' },
]

function IdentityHighlightsSection() {
  return (
    <section className="py-14 md:py-18 lg:py-20 bg-cream overflow-hidden">
      {/* Top separator */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 md:mb-12">
        <div className="flex items-center justify-center gap-5">
          <span className="hidden md:block w-12 h-[2px] bg-gradient-to-r from-transparent to-teal/25" />
          <p className="text-teal text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.25em] text-center">
            Identità in sintesi
          </p>
          <span className="hidden md:block w-12 h-[2px] bg-gradient-to-l from-transparent to-teal/25" />
        </div>
      </div>

      {/* Marquee container */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />

        <div
          className="flex w-max items-center"
          style={{ animation: 'scroll-left 55s linear infinite' }}
        >
          {[...identityTags, ...identityTags].map((tag, i) => (
            <div key={i} className="flex items-center shrink-0">
              <span className={`whitespace-nowrap px-6 md:px-8 py-2.5 md:py-3 mx-2 md:mx-3 rounded-full border text-[12px] md:text-[14px] font-semibold tracking-wide ${tag.color}`}>
                {tag.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// MAIN PAGE
// ============================================
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AliceHomepageSection />
      <OpeningSection />
      <IdentityHighlightsSection />
      <ChiSonoSection />
      <MissioneSection />
      <IlVeroProblemaSection />
      <QuantumAcademySection />
      <AlphakomSection />
      <QuoteSection />
      <PercorsiSection />
      <PartnershipSection />
      <InFlowSection />
      <LibriSection />
      <BlogSection />
      <ContattiSection />
    </>
  )
}
