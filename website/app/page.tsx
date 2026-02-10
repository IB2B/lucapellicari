'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowDown, Play, Sparkles, Target, Eye, Shield, Users, Brain, Star, Compass, BookOpen, Pen, Mail, ChevronRight, ChevronLeft } from 'lucide-react'

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}

// Hero Slider Data
const heroSlides = [
  {
    image: '/images/hero-1.jpg',
    subtitle: 'Benvenuto',
    title: 'Adesso siamo qui,',
    highlight: 'tu ed io.',
    description: 'Questa non è una pagina web. È una porta verso la tua identità profonda.',
  },
  {
    image: '/images/hero-2.jpg',
    subtitle: 'La Missione',
    title: 'Trasformo le persone',
    highlight: 'aiutandole a riconoscersi.',
    description: 'Non sei quello che ti è successo. Sei quello che scegli di diventare.',
  },
  {
    image: '/images/hero-3.jpg',
    subtitle: 'Il Metodo',
    title: 'Entra nel tuo',
    highlight: 'stato naturale.',
    description: 'In-Flow: la scienza dell\'identità, la bellezza della verità.',
  },
]

// Reusable Section Title Component
function SectionTitle({ badge, title, subtitle, center = true, light = false }: {
  badge: string
  title: string
  subtitle?: string
  center?: boolean
  light?: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={stagger}
      className={`${center ? 'text-center' : ''} mb-10 sm:mb-12 lg:mb-16 px-4 sm:px-0`}
    >
      <motion.span variants={fadeUp} className="badge mb-4 sm:mb-6 inline-block text-xs">
        {badge}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        className={`font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold ${light ? 'text-dark' : 'text-light'} mb-4 sm:mb-6`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className={`text-base sm:text-lg md:text-xl ${light ? 'text-dark/70' : 'text-light/70'} max-w-2xl ${center ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}

// HERO SECTION WITH FAST CSS SLIDER
function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  // Mark as loaded after mount
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Fast auto-play slider - 3 seconds
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, currentSlide])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setIsAutoPlaying(false)
    // Resume auto-play after 8 seconds
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }, [])

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-dark">
      {/* Background Slides - All Pre-rendered with CSS Transitions */}
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ease-out will-change-opacity ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover object-center scale-105"
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
              quality={75}
              sizes="100vw"
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/70 to-dark/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/60" />
          </div>
        ))}
      </motion.div>

      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-transparent to-transparent pointer-events-none" />

      {/* Decorative Lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex items-center"
        style={{ opacity }}
      >
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left: Text Content - Fast CSS Transitions */}
            <div className="max-w-xl">
              {heroSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ease-out ${
                    index === currentSlide
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-8 absolute pointer-events-none'
                  }`}
                >
                  {/* Subtitle Badge */}
                  <span className="inline-block text-gold text-xs sm:text-sm uppercase tracking-[0.3em] mb-4 sm:mb-6">
                    <span className="inline-block w-8 sm:w-12 h-px bg-gold mr-3 sm:mr-4 align-middle" />
                    {slide.subtitle}
                  </span>

                  {/* Title */}
                  <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-light leading-[1.1] mb-2">
                    {slide.title}
                  </h1>
                  <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-gradient-gold leading-[1.1] mb-6 sm:mb-8">
                    {slide.highlight}
                  </h1>

                  {/* Description */}
                  <p className="text-light/70 text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10 max-w-md">
                    {slide.description}
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    <Link href="/chi-sono" className="btn-primary group text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4">
                      Scopri chi sono
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link href="/contatti" className="btn-secondary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4">
                      Contattami
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Empty for image focus on desktop */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </motion.div>

      {/* Glassmorphism Slider Controls */}
      <div className="absolute bottom-8 sm:bottom-12 left-0 right-0 z-20">
        <div className="container-custom">
          <div className="flex items-center justify-between glass rounded-full p-2 sm:p-3 max-w-md mx-auto lg:mx-0 lg:max-w-lg">
            {/* Progress Bar with Slide Indicators */}
            <div className="flex items-center gap-2 flex-1">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="relative h-1.5 flex-1 rounded-full overflow-hidden bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {index === currentSlide && (
                    <div
                      className="absolute inset-y-0 left-0 bg-gold rounded-full animate-progress"
                      key={`progress-${currentSlide}`}
                    />
                  )}
                  {index < currentSlide && (
                    <div className="absolute inset-0 bg-gold/50 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-1 ml-4">
              <button
                onClick={prevSlide}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-gold/20 hover:text-gold transition-all"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-gold/20 hover:text-gold transition-all"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Counter - Enhanced */}
      <div className="absolute top-1/2 right-6 sm:right-12 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-3">
        <span className="text-gold font-medium text-xl font-display">0{currentSlide + 1}</span>
        <div className="w-px h-20 bg-white/10 relative overflow-hidden rounded-full">
          <div
            className="absolute top-0 left-0 w-full bg-gold transition-all duration-300 ease-out rounded-full"
            style={{ height: `${((currentSlide + 1) / heroSlides.length) * 100}%` }}
          />
        </div>
        <span className="text-white/30 text-sm">0{heroSlides.length}</span>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-28 sm:bottom-32 left-1/2 -translate-x-1/2 z-20 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// SEZIONE 1 - CHI SONO
function ChiSonoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-dark-50 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-center">
          {/* Image with Enhanced Effects */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40, scale: 0.95 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="relative order-2 lg:order-1 group"
          >
            <div className="relative aspect-[4/5] sm:aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden max-w-md mx-auto lg:max-w-none">
              <Image
                src="/images/luca-portrait.jpg"
                alt="Luca Pellicari"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/20 to-transparent" />

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-gold/10 via-transparent to-transparent" />
            </div>

            {/* Decorative Frame with Glow */}
            <div className="hidden sm:block absolute -inset-3 lg:-inset-4 border border-gold/20 rounded-2xl sm:rounded-3xl -z-10 group-hover:border-gold/40 transition-colors duration-500" />
            <div className="hidden sm:block absolute -inset-6 lg:-inset-8 border border-gold/10 rounded-3xl sm:rounded-4xl -z-20" />

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 glass-gold rounded-2xl p-4 sm:p-5 hidden sm:block"
            >
              <p className="text-gold font-display text-2xl sm:text-3xl font-semibold">7</p>
              <p className="text-gold/70 text-xs uppercase tracking-wider">Rinascite</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={stagger}
            className="order-1 lg:order-2 text-center lg:text-left"
          >
            <motion.span variants={fadeUp} className="badge mb-4 sm:mb-6 inline-block text-xs">
              Chi Sono
            </motion.span>

            <motion.h2 variants={fadeUp} className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-light mb-6 sm:mb-8">
              &ldquo;Io sono <span className="text-gradient-gold">Luca Pellicari</span>&rdquo;
            </motion.h2>

            <motion.div variants={fadeUp} className="space-y-4 sm:space-y-6 text-light/70 text-base sm:text-lg leading-relaxed">
              <p>
                Sono un uomo che non ha mai avuto paura di guardare la vita negli occhi.
                Ho attraversato la malattia, la rinascita, la disciplina del paracadutismo,
                i fallimenti, la rinascita professionale, gli incontri che cambiano un destino.
              </p>
              <p>
                E ho trasformato tutto in un metodo: <span className="text-gold font-medium">In-Flow</span>.
              </p>

              {/* Enhanced Quote Block */}
              <div className="relative glass-dark rounded-2xl p-5 sm:p-6 my-6">
                <div className="absolute -top-3 left-6 text-gold text-4xl font-serif">&ldquo;</div>
                <p className="text-lg sm:text-xl font-serif italic text-light/90 pl-4 sm:pl-6">
                  Il mio talento non è motivarti.<br />
                  Il mio talento è <span className="text-gold">aiutarti a ricordare chi sei</span>.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 sm:mt-10">
              <Link href="/chi-sono" className="btn-primary group text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4">
                Scopri la mia storia
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// SEZIONE 2 - LA MIA MISSIONE
const missionItems = [
  { icon: Eye, label: 'Identità' },
  { icon: Target, label: 'Visione' },
  { icon: Shield, label: 'Verità' },
  { icon: Users, label: 'Relazioni' },
  { icon: Brain, label: 'Consapevolezza' },
  { icon: Sparkles, label: 'Metaquantistica applicata' },
  { icon: Star, label: 'Leadership Alpha' },
  { icon: Compass, label: 'Metodo In-Flow' },
]

function MissioneSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-dark relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
      </div>

      <div className="container-custom relative z-10">
        <SectionTitle
          badge="La Mia Missione"
          title="Trasformo le persone aiutandole a riconoscersi."
          subtitle="Il mio lavoro è semplice: ti porto dentro te stesso. Lo faccio con delicatezza, con forza, con consapevolezza e con verità."
        />

        {/* Attraverso */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10 sm:mb-12"
        >
          <span className="inline-flex items-center gap-4 text-gold uppercase tracking-[0.3em] text-sm">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-gold" />
            Attraverso
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-gold" />
          </span>
        </motion.div>

        {/* Mission Items - Glassmorphism Cards */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-12 sm:mb-16"
        >
          {missionItems.map((item, index) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
              className="glass-dark rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:border-gold/30 hover:bg-dark-50/80 transition-all text-center group cursor-pointer h-full min-h-[140px] sm:min-h-[170px] flex flex-col items-center justify-center relative overflow-hidden"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-radial from-gold/5 via-transparent to-transparent" />

              {/* Icon */}
              <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mb-3 sm:mb-4 group-hover:from-gold/30 group-hover:to-gold/10 transition-all duration-300">
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
              </div>

              <p className="relative z-10 text-light font-medium text-sm sm:text-base group-hover:text-gold transition-colors">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Link href="/missione" className="btn-primary group">
            Scopri la mia missione
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// SEZIONE 3 - QUANTUM ACADEMY
function QuantumAcademySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-dark-50 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/quantum-academy.jpg"
          alt="Quantum Academy"
          fill
          className="object-cover opacity-15"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-50 via-dark-50/95 to-dark-50/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-50 via-transparent to-dark-50" />
      </div>


      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <motion.div
              ref={ref}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={stagger}
            >
              <motion.span variants={fadeUp} className="badge mb-4 sm:mb-6 inline-block text-xs glow-pulse">
                Quantum Academy
              </motion.span>

              <motion.h2 variants={fadeUp} className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-light mb-6 sm:mb-8">
                Il sogno che non sapevo di sognare, <span className="text-gradient-gold">diventato realtà.</span>
              </motion.h2>

              <motion.div variants={fadeUp} className="space-y-3 sm:space-y-4 text-light/70 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10">
                <p className="text-gold font-medium text-lg sm:text-xl">
                  Quantum Academy non è una scuola.
                </p>
                <p>È un luogo di trasformazione. È un portale. È un laboratorio di identità.</p>
                <p>
                  È nata da tre anime in risonanza: <span className="text-light font-medium">io, Lucia e Alberto</span>.
                </p>
                <p>
                  E oggi sta diventando una nuova forma di conoscenza:
                  <span className="text-gold font-medium"> pratica, profonda, scientifica, spirituale</span>.
                </p>
              </motion.div>

              <motion.div variants={fadeUp}>
                <Link href="/quantum-academy" className="btn-primary group text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4">
                  Entra in Quantum Academy
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Image with Enhanced Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 40 }}
            animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="relative hidden lg:block group"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <Image
                src="/images/quantum-academy.jpg"
                alt="Luca Pellicari at Quantum Academy"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/20 to-transparent" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-gold/10 via-transparent to-transparent" />
            </div>

            {/* Decorative Frames */}
            <div className="absolute -inset-4 border border-gold/20 rounded-3xl -z-10 group-hover:border-gold/40 transition-colors duration-500" />
            <div className="absolute -inset-8 border border-gold/10 rounded-4xl -z-20" />

            {/* Floating Label */}
            <div className="absolute -bottom-4 -left-4 glass-gold rounded-2xl p-4">
              <p className="text-gold/70 text-xs uppercase tracking-wider mb-1">La Triade</p>
              <p className="text-gold font-display text-lg font-semibold">Luca, Lucia, Alberto</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// SEZIONE 4 - ALPHAKOM
function AlphakomSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const alphaPoints = [
    { text: 'Qui impari a guidare, non a seguire.', icon: Target },
    { text: 'A vedere, non a reagire.', icon: Eye },
    { text: 'A influenzare in modo consapevole.', icon: Brain },
    { text: 'A creare ricchezza — economica, relazionale, spirituale.', icon: Sparkles },
    { text: 'A entrare nel tuo stato naturale: In-Flow.', icon: Compass },
  ]

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-dark relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/alphakom-event.jpg"
          alt="Alphakom Event"
          fill
          className="object-cover opacity-15"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/95 to-dark/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-transparent to-dark" />
      </div>


      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="badge mb-4 sm:mb-6 inline-block text-xs"
            >
              Alphakom
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-light mb-8 sm:mb-10"
            >
              La Scuola degli <span className="text-gradient-gold">Alpha Leaders.</span>
            </motion.h2>

            <motion.div
              ref={ref}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={stagger}
              className="space-y-4 mb-10 sm:mb-12"
            >
              {alphaPoints.map((point, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="glass-dark rounded-xl sm:rounded-2xl p-4 flex items-center gap-4 hover:border-gold/30 transition-all group cursor-default"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                    <point.icon className="w-5 h-5 text-gold" />
                  </div>
                  <p className="text-base sm:text-lg text-light/80 group-hover:text-light transition-colors">
                    {point.text.includes('In-Flow') ? (
                      <>
                        {point.text.split('In-Flow')[0]}
                        <span className="text-gold font-medium">In-Flow</span>
                        {point.text.split('In-Flow')[1]}
                      </>
                    ) : (
                      point.text
                    )}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <Link href="/alphakom" className="btn-primary group text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4">
                Scopri Alphakom
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Image with Enhanced Effects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 40 }}
            animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="relative hidden lg:block group"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <Image
                src="/images/luca-speaking.jpg"
                alt="Luca Pellicari Speaking"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/20 to-transparent" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-gold/10 via-transparent to-transparent" />
            </div>

            {/* Decorative Frames */}
            <div className="absolute -inset-4 border border-gold/20 rounded-3xl -z-10 group-hover:border-gold/40 transition-colors duration-500" />
            <div className="absolute -inset-8 border border-gold/10 rounded-4xl -z-20" />

            {/* Alpha Badge */}
            <div className="absolute -top-4 -right-4 glass-gold rounded-2xl p-4">
              <p className="text-gold font-display text-2xl font-bold">α</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Quote Section
function QuoteSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 sm:py-28 lg:py-36 bg-dark-50 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-gold/10 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="container-narrow text-center relative z-10 px-4"
      >
        {/* Decorative Quote Mark */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="relative inline-block mb-6 sm:mb-8"
        >
          <span className="text-gold/30 text-7xl sm:text-8xl lg:text-9xl font-serif absolute -top-4 -left-8 select-none">&ldquo;</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-light leading-relaxed mb-8 sm:mb-10"
        >
          Non sei quello che ti è successo.<br />
          <span className="text-gradient-gold">Sei quello che scegli di diventare.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-4"
        >
          <span className="w-12 h-px bg-gradient-to-r from-transparent to-gold/50" />
          <p className="text-gold font-medium text-sm sm:text-base tracking-wider">Luca Pellicari</p>
          <span className="w-12 h-px bg-gradient-to-l from-transparent to-gold/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// SEZIONE 5 - COSA POSSIAMO FARE INSIEME
const percorsiItems = [
  'Formazione identitaria',
  'Leadership e comunicazione',
  'Consapevolezza professionale',
  'Appagamento personale',
  'Cambiamento interiore',
  'Metaquantistica applicata',
  'Metodi pratici per crescere, evolvere, trasformare',
]

function PercorsiSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-light relative overflow-hidden">
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #d4af37 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="container-custom relative z-10">
        <SectionTitle
          badge="Cosa Possiamo Fare Insieme"
          title="Percorsi, seminari, corsi, eventi."
          light
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-10 sm:mb-12"
        >
          {percorsiItems.map((item, index) => (
            <motion.div
              key={item}
              variants={fadeUp}
              whileHover={{ x: 8, scale: 1.02 }}
              className="group flex items-center gap-3 sm:gap-4 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-light-100 hover:border-gold/40 hover:shadow-xl transition-all cursor-pointer h-full min-h-[70px]"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold group-hover:scale-110 transition-all duration-300">
                <ArrowRight className="w-4 h-4 text-gold group-hover:text-dark transition-colors" />
              </div>
              <span className="text-dark font-medium text-sm sm:text-base group-hover:text-gold transition-colors">{item}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Link href="/contatti" className="btn-primary group">
            I miei percorsi
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// SEZIONE 6 - METODO IN-FLOW
function MetodoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-dark relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-narrow text-center relative z-10 px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.span variants={fadeUp} className="badge mb-4 sm:mb-6 inline-block text-xs">
            Il Mio Metodo
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gradient-gold mb-4 sm:mb-6"
          >
            In-Flow
          </motion.h2>

          <motion.p variants={fadeUp} className="font-serif text-xl sm:text-2xl md:text-3xl text-gold/80 italic mb-10 sm:mb-12">
            La scienza dell&apos;identità, la bellezza della verità.
          </motion.p>

          <motion.div variants={fadeUp} className="glass-dark rounded-3xl p-6 sm:p-8 lg:p-10 mb-10 sm:mb-12 max-w-2xl mx-auto">
            <p className="text-light/80 text-base sm:text-lg leading-relaxed mb-4">
              Ogni persona può entrare nel suo <span className="text-gold font-medium">stato naturale</span>:
            </p>
            <p className="text-light text-lg sm:text-xl leading-relaxed mb-4">
              un equilibrio tra chi sei e ciò che fai,<br />
              tra la tua storia e il tuo futuro,<br />
              tra il tuo cuore e la tua visione.
            </p>
            <p className="text-light/70 text-base sm:text-lg">
              Il metodo In-Flow è il risultato di una vita intera.<br />
              E ora è anche <span className="text-gold">un libro, un corso, un percorso</span>.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Link href="/metodo-in-flow" className="btn-primary group text-sm sm:text-base px-8 sm:px-10 py-4 sm:py-5">
              Scopri In-Flow
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// SEZIONE 7 - I MIEI LIBRI
const libri = [
  { title: 'In-Flow', subtitle: 'Il metodo', image: '/images/book-inflow.jpg' },
  { title: 'Oltre la diagnosi', subtitle: 'La mia storia', image: '/images/book-diagnosi.jpg' },
  { title: 'La Guida alla Metaquantistica', subtitle: 'La scienza della coscienza', image: '/images/book-metaquantistica.jpg' },
]

function LibriSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-dark-50 relative overflow-hidden">

      <div className="container-custom relative z-10">
        <SectionTitle
          badge="I Miei Libri"
          title="Storie vere, identità vere."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-12 perspective-1000"
        >
          {libri.map((libro) => (
            <motion.div
              key={libro.title}
              variants={fadeUp}
              whileHover={{ y: -12, rotateY: 5, rotateX: -5 }}
              transition={{ duration: 0.3 }}
              className="group relative bg-dark rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer h-full preserve-3d"
            >
              <div className="aspect-[3/4] relative">
                {/* Book Cover Image */}
                <Image
                  src={libro.image}
                  alt={libro.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />

                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-gold/20 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <p className="text-gold/70 text-xs sm:text-sm mb-2 uppercase tracking-wider">{libro.subtitle}</p>
                <h3 className="font-display text-lg sm:text-xl lg:text-2xl text-light font-medium group-hover:text-gold transition-colors">
                  {libro.title}
                </h3>
              </div>

              {/* Border Glow */}
              <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/40 rounded-2xl sm:rounded-3xl transition-all duration-500" />

              {/* Corner Accent */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gold/0 group-hover:border-gold/50 transition-colors duration-500" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <p className="text-light/40 mb-6 text-sm">Altri progetti in arrivo...</p>
          <Link href="/libri" className="btn-primary group">
            Leggi i miei libri
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// SEZIONE 8 - BLOG
function BlogSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-dark relative overflow-hidden">
      {/* Background Line */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent pointer-events-none" />

      <div className="container-narrow text-center px-4 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div
            variants={fadeUp}
            className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mx-auto mb-6 sm:mb-8"
          >
            <Pen className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-gold" />
          </motion.div>

          <motion.span variants={fadeUp} className="badge mb-4 sm:mb-6 inline-block text-xs">
            Blog
          </motion.span>

          <motion.h2 variants={fadeUp} className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-light mb-4 sm:mb-6">
            Pensieri liberi. <span className="text-gradient-gold">Verità condivise.</span><br className="hidden sm:block" />
            Identità che si aprono.
          </motion.h2>

          <motion.p variants={fadeUp} className="text-base sm:text-lg md:text-xl text-light/70 leading-relaxed mb-8 sm:mb-10 max-w-xl mx-auto">
            Scrivo per raccontare, per comprendere e per far vibrare qualcosa dentro chi legge.
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link href="/blog" className="btn-primary group text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4">
              Leggi gli articoli
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// SEZIONE FINALE - CONTATTI
function ContattiSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-gradient-to-b from-dark-50 to-dark relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="container-narrow text-center relative z-10 px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          {/* Icon */}
          <motion.div
            variants={fadeUp}
            className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center border border-gold/30 mx-auto mb-8 sm:mb-10"
          >
            <Mail className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gold" />
          </motion.div>

          <motion.span variants={fadeUp} className="badge mb-4 sm:mb-6 inline-block text-xs">
            Contatti
          </motion.span>

          <motion.h2 variants={fadeUp} className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-light mb-6 sm:mb-8">
            Vuoi lavorare <span className="text-gradient-gold">con me?</span>
          </motion.h2>

          <motion.div variants={fadeUp} className="glass-dark rounded-2xl p-6 sm:p-8 mb-8 sm:mb-10 max-w-lg mx-auto">
            <div className="space-y-3 text-base sm:text-lg md:text-xl text-light/80">
              <p>Vuoi portarmi nella tua azienda?</p>
              <p>Vuoi iniziare il tuo percorso identitario?</p>
            </div>
          </motion.div>

          <motion.p variants={fadeUp} className="font-serif text-2xl sm:text-3xl text-light mb-10 sm:mb-12">
            Scrivimi. <span className="text-gold font-medium">Sono qui.</span>
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link href="/contatti" className="btn-primary group text-base sm:text-lg md:text-xl px-10 sm:px-12 py-4 sm:py-5 md:py-6">
              Contattami
              <ArrowRight className="ml-2 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Main Page Component
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ChiSonoSection />
      <MissioneSection />
      <QuantumAcademySection />
      <AlphakomSection />
      <QuoteSection />
      <PercorsiSection />
      <MetodoSection />
      <LibriSection />
      <BlogSection />
      <ContattiSection />
    </>
  )
}
