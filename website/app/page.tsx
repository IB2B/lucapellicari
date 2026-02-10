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

// HERO SECTION WITH SLIDER
function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  // Auto-play slider
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setIsAutoPlaying(false)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setIsAutoPlaying(false)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }, [])

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Preload all hero images */}
      <div className="hidden">
        {heroSlides.map((slide, index) => (
          <Image
            key={index}
            src={slide.image}
            alt=""
            width={1920}
            height={1080}
            priority
            quality={75}
          />
        ))}
      </div>

      {/* Background Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
          style={{ scale }}
        >
          <Image
            src={heroSlides[currentSlide].image}
            alt={heroSlides[currentSlide].title}
            fill
            className="object-cover object-center"
            priority
            quality={75}
            sizes="100vw"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/60 to-dark/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/50" />
        </motion.div>
      </AnimatePresence>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex items-center"
        style={{ opacity }}
      >
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <div className="max-w-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Subtitle Badge */}
                  <motion.span
                    className="inline-block text-gold text-xs sm:text-sm uppercase tracking-[0.3em] mb-4 sm:mb-6"
                  >
                    <span className="inline-block w-8 sm:w-12 h-px bg-gold mr-3 sm:mr-4 align-middle" />
                    {heroSlides[currentSlide].subtitle}
                  </motion.span>

                  {/* Title */}
                  <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-light leading-[1.1] mb-2">
                    {heroSlides[currentSlide].title}
                  </h1>
                  <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-gradient-gold leading-[1.1] mb-6 sm:mb-8">
                    {heroSlides[currentSlide].highlight}
                  </h1>

                  {/* Description */}
                  <p className="text-light/70 text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10 max-w-md">
                    {heroSlides[currentSlide].description}
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
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Empty for image focus on desktop */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </motion.div>

      {/* Slider Controls */}
      <div className="absolute bottom-8 sm:bottom-12 left-0 right-0 z-20">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Slide Indicators */}
            <div className="flex items-center gap-3">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative h-1 transition-all duration-500 ${
                    index === currentSlide ? 'w-12 sm:w-16' : 'w-6 sm:w-8'
                  }`}
                >
                  <span className="absolute inset-0 bg-white/20 rounded-full" />
                  {index === currentSlide && (
                    <motion.span
                      className="absolute inset-0 bg-gold rounded-full"
                      layoutId="activeSlide"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-gold hover:text-gold transition-all hover:scale-105"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-gold hover:text-gold transition-all hover:scale-105"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Counter */}
      <div className="absolute top-1/2 right-6 sm:right-12 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-4">
        <span className="text-gold font-medium text-lg">0{currentSlide + 1}</span>
        <div className="w-px h-16 bg-white/20 relative">
          <motion.div
            className="absolute top-0 left-0 w-full bg-gold"
            initial={{ height: '0%' }}
            animate={{ height: '100%' }}
            transition={{ duration: 6, ease: 'linear' }}
            key={currentSlide}
          />
        </div>
        <span className="text-white/40 text-sm">0{heroSlides.length}</span>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/40"
        >
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
      <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gold/5 rounded-full blur-[100px] sm:blur-[150px]" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] sm:aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden max-w-md mx-auto lg:max-w-none">
              <Image
                src="/images/luca-portrait.jpg"
                alt="Luca Pellicari"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
            </div>
            {/* Decorative frame - hidden on mobile */}
            <div className="hidden sm:block absolute -inset-3 lg:-inset-4 border border-gold/20 rounded-2xl sm:rounded-3xl -z-10" />
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

            <motion.h2 variants={fadeUp} className="font-display text-2xl sm:text-3xl md:text-4xl text-light mb-6 sm:mb-8">
              &ldquo;Io sono Luca Pellicari&rdquo;
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
              <p className="text-lg sm:text-xl font-serif italic text-light/90 border-l-2 border-gold/50 pl-4 sm:pl-6 text-left">
                Il mio talento non è motivarti.<br />
                Il mio talento è <span className="text-gold">aiutarti a ricordare chi sei</span>.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 sm:mt-10">
              <Link href="/chi-sono" className="btn-link group">
                Scopri la mia storia
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
      <div className="container-custom">
        <SectionTitle
          badge="La Mia Missione"
          title="Trasformo le persone aiutandole a riconoscersi."
          subtitle="Il mio lavoro è semplice: ti porto dentro te stesso. Lo faccio con delicatezza, con forza, con consapevolezza e con verità."
        />

        {/* Attraverso */}
        <motion.p
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-center text-gold uppercase tracking-[0.3em] text-sm mb-12"
        >
          Attraverso
        </motion.p>

        {/* Mission Items */}
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
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-dark-50 rounded-2xl p-4 sm:p-6 border border-dark-200/50 hover:border-gold/30 transition-all text-center group cursor-pointer h-full min-h-[140px] sm:min-h-[160px] flex flex-col items-center justify-center"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-gold/20 transition-colors">
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
              </div>
              <p className="text-light font-medium text-sm sm:text-base">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <Link href="/missione" className="btn-secondary">
            Scopri la mia missione
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
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
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/quantum-academy.jpg"
          alt="Quantum Academy"
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-50 via-dark-50/95 to-dark-50" />
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
              <motion.span variants={fadeUp} className="badge mb-4 sm:mb-6 inline-block text-xs">
                Quantum Academy
              </motion.span>

              <motion.h2 variants={fadeUp} className="font-display text-2xl sm:text-3xl md:text-4xl text-light mb-6 sm:mb-8">
                Il sogno che non sapevo di sognare, diventato realtà.
              </motion.h2>

              <motion.div variants={fadeUp} className="space-y-3 sm:space-y-4 text-light/70 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10">
                <p className="text-gold font-medium text-lg sm:text-xl">
                  Quantum Academy non è una scuola.
                </p>
                <p>È un luogo di trasformazione. È un portale. È un laboratorio di identità.</p>
                <p>
                  È nata da tre anime in risonanza: <span className="text-light">io, Lucia e Alberto</span>.
                </p>
                <p>
                  E oggi sta diventando una nuova forma di conoscenza:
                  <span className="text-gold"> pratica, profonda, scientifica, spirituale</span>.
                </p>
              </motion.div>

              <motion.div variants={fadeUp}>
                <Link href="/quantum-academy" className="btn-primary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4">
                  Entra in Quantum Academy
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <Image
                src="/images/quantum-academy.jpg"
                alt="Luca Pellicari at Quantum Academy"
                fill
                className="object-cover"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
            </div>
            {/* Decorative */}
            <div className="absolute -inset-4 border border-gold/10 rounded-3xl -z-10" />
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
    'Qui impari a guidare, non a seguire.',
    'A vedere, non a reagire.',
    'A influenzare in modo consapevole.',
    'A creare ricchezza — economica, relazionale, spirituale.',
    'A entrare nel tuo stato naturale: In-Flow.',
  ]

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-dark relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/alphakom-event.jpg"
          alt="Alphakom Event"
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/95 to-dark" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <SectionTitle
              badge="Alphakom"
              title="La Scuola degli Alpha Leaders."
              center={false}
            />

            <motion.div
              ref={ref}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={stagger}
              className="space-y-3 sm:space-y-4 mb-10 sm:mb-12"
            >
              {alphaPoints.map((point, index) => (
                <motion.p
                  key={index}
                  variants={fadeUp}
                  className="text-base sm:text-lg md:text-xl text-light/80 flex items-start gap-3"
                >
                  <span className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
                  {point.includes('In-Flow') ? (
                    <>
                      {point.split('In-Flow')[0]}
                      <span className="text-gold font-medium">In-Flow</span>
                      {point.split('In-Flow')[1]}
                    </>
                  ) : (
                    point
                  )}
                </motion.p>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <Link href="/alphakom" className="btn-primary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4">
                Scopri Alphakom
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <Image
                src="/images/luca-speaking.jpg"
                alt="Luca Pellicari Speaking"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
            </div>
            {/* Decorative */}
            <div className="absolute -inset-4 border border-gold/10 rounded-3xl -z-10" />
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
    <section className="py-14 sm:py-20 lg:py-24 bg-dark-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-transparent to-transparent" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="container-narrow text-center relative z-10 px-4"
      >
        <div className="text-gold text-4xl sm:text-5xl lg:text-6xl font-serif mb-4 sm:mb-6">&ldquo;</div>
        <p className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-light leading-relaxed mb-6 sm:mb-8">
          Non sei quello che ti è successo.<br />
          Sei quello che scegli di diventare.
        </p>
        <p className="text-gold font-medium text-sm sm:text-base">— Luca Pellicari</p>
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
    <section className="py-16 sm:py-20 lg:py-28 bg-light">
      <div className="container-custom">
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
          {percorsiItems.map((item) => (
            <motion.div
              key={item}
              variants={fadeUp}
              whileHover={{ x: 8 }}
              className="flex items-center gap-3 sm:gap-4 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-light-100 hover:border-gold/30 hover:shadow-card-hover transition-all cursor-pointer h-full min-h-[70px]"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                <ArrowRight className="w-4 h-4 text-gold" />
              </div>
              <span className="text-dark font-medium text-sm sm:text-base">{item}</span>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <Link href="/contatti" className="btn-primary">
            I miei percorsi
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

// SEZIONE 6 - METODO IN-FLOW
function MetodoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-dark relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] lg:w-[1000px] h-[300px] sm:h-[400px] lg:h-[500px] bg-gold/5 rounded-full blur-[100px] sm:blur-[150px]" />
      </div>

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

          <motion.h2 variants={fadeUp} className="font-display text-4xl sm:text-5xl md:text-6xl text-gradient-gold mb-3 sm:mb-4">
            In-Flow
          </motion.h2>

          <motion.p variants={fadeUp} className="font-serif text-lg sm:text-xl md:text-2xl text-gold/80 italic mb-8 sm:mb-10">
            La scienza dell'identità, la bellezza della verità.
          </motion.p>

          <motion.div variants={fadeUp} className="space-y-3 sm:space-y-4 text-base sm:text-lg text-light/70 leading-relaxed mb-10 sm:mb-12">
            <p>
              Ogni persona può entrare nel suo <span className="text-gold">stato naturale</span>:
            </p>
            <p className="text-light/90">
              un equilibrio tra chi sei e ciò che fai,<br />
              tra la tua storia e il tuo futuro,<br />
              tra il tuo cuore e la tua visione.
            </p>
            <p>
              Il metodo In-Flow è il risultato di una vita intera.<br />
              E ora è anche <span className="text-light">un libro, un corso, un percorso</span>.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Link href="/metodo-in-flow" className="btn-primary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4">
              Scopri In-Flow
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// SEZIONE 7 - I MIEI LIBRI
const libri = [
  { title: 'In-Flow', subtitle: 'Il metodo' },
  { title: 'Oltre la diagnosi', subtitle: 'La mia storia' },
  { title: 'La Guida alla Metaquantistica', subtitle: 'La scienza della coscienza' },
]

function LibriSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-dark-50">
      <div className="container-custom">
        <SectionTitle
          badge="I Miei Libri"
          title="Storie vere, identità vere."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-12"
        >
          {libri.map((libro) => (
            <motion.div
              key={libro.title}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="group relative bg-dark rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer h-full"
            >
              <div className="aspect-[4/3] sm:aspect-[3/4] relative bg-gradient-to-br from-dark-100 to-dark-200 flex items-center justify-center">
                <BookOpen className="w-14 h-14 sm:w-16 sm:h-16 text-gold/20 group-hover:text-gold/40 transition-colors" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <p className="text-gold/60 text-xs sm:text-sm mb-1">{libro.subtitle}</p>
                <h3 className="font-display text-base sm:text-lg lg:text-xl text-light font-medium">
                  {libro.title}
                </h3>
              </div>
              {/* Hover glow */}
              <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 rounded-2xl sm:rounded-3xl transition-colors" />
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <p className="text-light/50 mb-6">Altri progetti in arrivo...</p>
          <Link href="/libri" className="btn-secondary">
            Leggi i miei libri
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

// SEZIONE 8 - BLOG
function BlogSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-dark">
      <div className="container-narrow text-center px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl sm:rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-6 sm:mb-8">
            <Pen className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-gold" />
          </motion.div>

          <motion.span variants={fadeUp} className="badge mb-4 sm:mb-6 inline-block text-xs">
            Blog
          </motion.span>

          <motion.h2 variants={fadeUp} className="font-display text-2xl sm:text-3xl md:text-4xl text-light mb-4 sm:mb-6">
            Pensieri liberi. Verità condivise.<br className="hidden sm:block" />Identità che si aprono.
          </motion.h2>

          <motion.p variants={fadeUp} className="text-base sm:text-lg text-light/70 leading-relaxed mb-8 sm:mb-10">
            Scrivo per raccontare, per comprendere e per far vibrare qualcosa dentro chi legge.
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link href="/blog" className="btn-primary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4">
              Leggi gli articoli
              <ArrowRight className="ml-2 w-4 h-4" />
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
    <section className="py-20 sm:py-28 lg:py-36 bg-gradient-to-b from-dark-50 to-dark relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[500px] lg:w-[600px] h-[400px] sm:h-[500px] lg:h-[600px] bg-gold/10 rounded-full blur-[150px] sm:blur-[200px]" />
      </div>

      <div className="container-narrow text-center relative z-10 px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6 sm:mb-8 border border-gold/20">
            <Mail className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-gold" />
          </motion.div>

          <motion.span variants={fadeUp} className="badge mb-4 sm:mb-6 inline-block text-xs">
            Contatti
          </motion.span>

          <motion.h2 variants={fadeUp} className="font-display text-2xl sm:text-3xl md:text-4xl text-light mb-6 sm:mb-8">
            Vuoi lavorare con me?
          </motion.h2>

          <motion.div variants={fadeUp} className="space-y-2 text-base sm:text-lg md:text-xl text-light/70 mb-6 sm:mb-8">
            <p>Vuoi portarmi nella tua azienda?</p>
            <p>Vuoi iniziare il tuo percorso identitario?</p>
          </motion.div>

          <motion.p variants={fadeUp} className="font-serif text-xl sm:text-2xl text-light mb-8 sm:mb-10">
            Scrivimi. <span className="text-gold">Sono qui.</span>
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link href="/contatti" className="btn-primary text-sm sm:text-base md:text-lg px-8 sm:px-10 py-3 sm:py-4 md:py-5">
              Contattami
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
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
