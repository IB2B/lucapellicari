'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowRight, ArrowDown, ChevronRight, ChevronLeft, Target, Eye, Shield, Users, Brain, Star, Compass, Sparkles, Mail, Quote, ArrowUpRight, BookOpen, GraduationCap, Route } from 'lucide-react'

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
}

const slideIn = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }
}

// Hero Slider Data
const heroSlides = [
  {
    image: '/images/hero-1.jpg',
    subtitle: 'Benvenuto',
    title: 'Adesso siamo qui,',
    highlight: 'tu ed io.',
    description: 'E sono felice che tu sia arrivato.',
  },
  {
    image: '/images/hero-2.jpg',
    subtitle: 'La Porta',
    title: 'Questa non è',
    highlight: 'una pagina web.',
    description: 'È una porta. La porta che conduce alla tua identità profonda, alla tua visione, alla tua verità.',
  },
  {
    image: '/images/hero-3.jpg',
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
            <Image src={slide.image} alt="" fill className="object-cover" priority loading="eager" quality={75} sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/80 via-navy-dark/50 to-transparent" />
          </div>
        ))}
      </motion.div>

      {/* Content */}
      <motion.div className="relative z-10 h-full flex items-start pt-32 md:pt-40 lg:pt-44" style={{ opacity }}>
        <div className="w-full px-6 md:px-12 lg:px-16">
          <div className="max-w-2xl">
            <div className="mb-6">
              <span className="text-coral text-sm uppercase tracking-widest font-medium">
                {heroSlides[currentSlide].subtitle}
              </span>
            </div>

            <div className="relative h-[140px] md:h-[160px] lg:h-[180px] mb-6">
              {heroSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1]">
                    {slide.title}{' '}
                    <span className="text-teal-light">{slide.highlight}</span>
                  </h1>
                </div>
              ))}
            </div>

            <div className="relative h-16 md:h-14 mb-10">
              {heroSlides.map((slide, index) => (
                <p
                  key={index}
                  className={`absolute inset-0 text-white/80 text-base md:text-lg leading-relaxed transition-opacity duration-700 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {slide.description}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/chi-sono" className="group relative inline-flex items-center gap-2 bg-coral text-white px-8 py-4 rounded-full font-medium overflow-hidden shadow-lg shadow-coral/25 hover:shadow-xl hover:shadow-coral/30 transition-all duration-500">
                <span className="relative z-10">Scopri chi sono</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-coral-dark to-coral opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
              <Link href="/contatti" className="group relative inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-full font-medium backdrop-blur-sm hover:border-white/60 hover:bg-white/10 transition-all duration-300">
                <span>Contattami</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <div className="absolute bottom-10 left-0 right-0 z-20 px-6 md:px-12 lg:px-16">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <span className="text-white font-medium">0{currentSlide + 1}</span>
            <span>/</span>
            <span>0{heroSlides.length}</span>
          </div>
          <div className="w-24 md:w-32">
            <div className="h-0.5 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-coral"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 6.5, ease: "linear" }}
                key={currentSlide}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={prevSlide} className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={nextSlide} className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// OPENING SECTION - Creative Split Layout
// ============================================
function OpeningSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[80vh]">
        {/* Left - Dark Side */}
        <div className="relative bg-navy-dark py-20 lg:py-32 px-6 md:px-12 lg:px-16 flex items-center">
          {/* Floating Number */}
          <motion.div
            style={{ y }}
            className="absolute top-10 right-10 text-[12rem] md:text-[16rem] font-display text-white/[0.03] leading-none select-none"
          >
            7
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="relative z-10"
          >
            <motion.p
              variants={fadeUp}
              className="text-white/50 text-sm uppercase tracking-[0.2em] mb-8"
            >
              Una verità semplice
            </motion.p>

            <motion.div variants={fadeUp} className="space-y-4 mb-12">
              {['Io non sono un formatore.', 'Non sono un motivatore.', 'Non sono un guru.'].map((text, i) => (
                <p key={i} className="font-display text-2xl md:text-3xl text-white/40">
                  {text}
                </p>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="h-px w-20 bg-gradient-to-r from-teal to-transparent mb-12" />

            <motion.p
              variants={fadeUp}
              className="font-display text-2xl md:text-3xl lg:text-4xl text-white leading-relaxed"
            >
              Sono un uomo che ha vissuto{' '}
              <span className="text-teal-light font-semibold">sette rinascite</span>.
            </motion.p>
          </motion.div>
        </div>

        {/* Right - Light Side */}
        <div className="relative bg-white py-20 lg:py-32 px-6 md:px-12 lg:px-16 flex items-center">
          {/* Decorative Circle */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-64 h-64 rounded-full border border-teal/10" />
          <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-coral/5" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="relative z-10"
          >
            <motion.p
              variants={fadeUp}
              className="font-serif text-xl md:text-2xl text-navy/70 italic leading-relaxed mb-8"
            >
              E oggi ho scelto di mettere tutta la mia esperienza al servizio delle persone che vogliono finalmente{' '}
              <span className="text-coral font-semibold not-italic">riconoscersi</span>.
            </motion.p>

            {/* Missing content added */}
            <motion.div
              variants={fadeUp}
              className="bg-gradient-to-r from-teal/5 to-transparent p-6 rounded-2xl border-l-2 border-teal mb-12"
            >
              <p className="text-navy/80 leading-relaxed">
                Se sei qui, se sei arrivato fino a questa riga, è perché una parte di te sente che{' '}
                <span className="text-teal font-semibold">è il momento di andare oltre</span>.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-6">
              {[
                { text: 'Oltre la maschera', color: 'bg-teal' },
                { text: 'Oltre il ruolo', color: 'bg-coral' },
                { text: 'Per incontrare chi sei', color: 'bg-navy' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-4 group cursor-default"
                >
                  <span className={`w-2 h-2 rounded-full ${item.color} group-hover:scale-150 transition-transform duration-300`} />
                  <span className="text-navy text-lg font-medium group-hover:translate-x-1 transition-transform duration-300">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-16 pt-8 border-t border-navy/10"
            >
              <p className="text-navy/50 text-sm">
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
// CHI SONO SECTION - Asymmetric Modern Layout
// ============================================
function ChiSonoSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#f8fafa]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
            className="lg:col-span-5 order-2 lg:order-1"
          >
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                <Image
                  src="/images/luca-portrait.jpg"
                  alt="Luca Pellicari"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  loading="lazy"
                  quality={80}
                />
              </div>
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-8 shadow-2xl"
              >
                <p className="text-5xl font-display text-coral mb-1"><AnimatedNumber value={7} /></p>
                <p className="text-sm text-navy/60 uppercase tracking-wider">Rinascite</p>
              </motion.div>
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
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
              <span className="w-12 h-px bg-teal" />
              <span className="text-teal text-sm uppercase tracking-widest font-medium">Chi Sono</span>
            </motion.div>

            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl lg:text-6xl text-navy mb-8">
              Io sono Luca Pellicari
            </motion.h2>

            <motion.div variants={fadeUp} className="space-y-6 text-navy/70 text-lg mb-10">
              <p>
                Sono un uomo che non ha mai avuto paura di guardare la vita negli occhi.
                Ho attraversato la malattia, la rinascita, la disciplina del paracadutismo,
                i fallimenti, la rinascita professionale.
              </p>
              <p>
                E ho trasformato tutto in un metodo: <span className="text-teal font-semibold">In-Flow</span>.
              </p>
            </motion.div>

            <motion.blockquote variants={fadeUp} className="relative pl-8 py-6 mb-10 border-l-2 border-coral">
              <p className="text-xl md:text-2xl font-serif italic text-navy">
                Il mio talento non è motivarti.<br />
                <span className="text-teal">Il mio talento è aiutarti a ricordare chi sei.</span>
              </p>
            </motion.blockquote>

            <motion.div variants={fadeUp}>
              <Link href="/chi-sono" className="group relative inline-flex items-center gap-3 text-navy font-medium">
                <span className="relative">
                  Scopri la mia storia
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-coral group-hover:w-full transition-all duration-300" />
                </span>
                <span className="w-10 h-10 rounded-full border-2 border-navy/20 flex items-center justify-center group-hover:border-coral group-hover:bg-coral transition-all duration-300">
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
// IO SONO SECTION - Bold Statement
// ============================================
function IoSonoSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], [-100, 100])

  return (
    <section ref={ref} className="relative py-32 lg:py-40 bg-navy-dark overflow-hidden">
      {/* Moving Background Text */}
      <motion.div
        style={{ x }}
        className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap"
      >
        <span className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-display text-white/[0.02] select-none">
          Luca Pellicari • Luca Pellicari • Luca Pellicari •
        </span>
      </motion.div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-coral/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          {/* Label */}
          <motion.div variants={fadeUp} className="mb-8">
            <span className="inline-flex items-center gap-3 text-teal-light/60 text-sm uppercase tracking-[0.2em]">
              <span className="w-8 h-px bg-teal-light/40" />
              Identità
              <span className="w-8 h-px bg-teal-light/40" />
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h2
            variants={fadeUp}
            className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-8"
          >
            Io sono{' '}
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-light via-teal to-teal-light">
                Luca Pellicari
              </span>
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="font-serif text-xl md:text-2xl text-white/60 italic max-w-2xl mx-auto mb-12"
          >
            Identity Coach • Autore • Fondatore di Quantum Academy
          </motion.p>

          {/* Stats Row */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { number: '7', label: 'Rinascite' },
              { number: '20+', label: 'Anni di esperienza' },
              { number: '1000+', label: 'Vite trasformate' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl md:text-5xl font-display text-coral mb-2">{stat.number}</p>
                <p className="text-sm text-white/40 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
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
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-12 h-px bg-coral" />
            <span className="text-coral text-sm uppercase tracking-widest font-medium">La Mia Missione</span>
            <span className="w-12 h-px bg-coral" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-navy mb-6">
            Trasformo le persone aiutandole a riconoscersi.
          </h2>
          <p className="text-xl text-navy/60 max-w-2xl mx-auto mb-4">
            Il mio lavoro è semplice: ti porto dentro te stesso.
          </p>
          <p className="text-lg text-navy/50 max-w-xl mx-auto">
            Lo faccio con delicatezza, con forza, con consapevolezza e con verità.
          </p>
        </div>

        {/* Cards Grid - Simple CSS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {missionItems.map((item) => (
            <div
              key={item.label}
              className="group relative bg-white border border-gray-100 rounded-2xl p-6 hover:border-teal/30 hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center mb-4 group-hover:bg-teal group-hover:scale-110 transition-all duration-300">
                  <item.icon className="w-6 h-6 text-navy/60 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-medium text-navy mb-1">{item.label}</h3>
                <p className="text-sm text-navy/50">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Link href="/missione" className="group relative inline-flex items-center gap-3 bg-navy text-white px-8 py-4 rounded-full font-medium overflow-hidden shadow-lg shadow-navy/25 hover:shadow-xl transition-all duration-500">
            <span className="relative z-10">Scopri la mia missione</span>
            <span className="relative z-10 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-navy-dark to-navy opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ============================================
// QUANTUM ACADEMY - Immersive Dark Section
// ============================================
function QuantumAcademySection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section ref={ref} className="relative py-32 lg:py-40 bg-navy-dark overflow-hidden">
      {/* Animated Background */}
      <motion.div style={{ y }} className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-coral rounded-full blur-[150px]" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.span variants={fadeUp} className="inline-block px-4 py-2 bg-coral text-white text-sm font-medium rounded-full mb-8">
              Quantum Academy
            </motion.span>

            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight">
              Il sogno che non sapevo di sognare, diventato realtà.
            </motion.h2>

            <motion.div variants={fadeUp} className="space-y-6 text-white/70 text-lg mb-8">
              <p className="text-teal-light text-xl font-medium">Quantum Academy non è una scuola.</p>
              <p>È un luogo di trasformazione. È un portale. È un laboratorio di identità.</p>
            </motion.div>

            {/* Founders */}
            <motion.div variants={fadeUp} className="mb-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-teal/30 border-2 border-navy-dark flex items-center justify-center text-xs text-white font-medium">LP</div>
                  <div className="w-10 h-10 rounded-full bg-coral/30 border-2 border-navy-dark flex items-center justify-center text-xs text-white font-medium">L</div>
                  <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-navy-dark flex items-center justify-center text-xs text-white font-medium">A</div>
                </div>
                <p className="text-white/60 text-sm">È nata da tre anime in risonanza: <span className="text-white">io, Lucia e Alberto</span>.</p>
              </div>
              <p className="text-white/70 pl-14">E oggi sta diventando una nuova forma di conoscenza: <span className="text-teal-light">pratica, profonda, scientifica, spirituale</span>.</p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Link href="/quantum-academy" className="group relative inline-flex items-center gap-3 bg-white text-navy px-8 py-4 rounded-full font-medium overflow-hidden shadow-xl shadow-black/10 hover:shadow-2xl transition-all duration-500">
                <span className="relative z-10">Entra in Quantum Academy</span>
                <span className="relative z-10 w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center group-hover:bg-teal group-hover:text-white transition-all duration-300">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 relative">
              <Image
                src="/images/quantum-academy.jpg"
                alt="Quantum Academy"
                fill
                className="object-cover"
                sizes="50vw"
                loading="lazy"
                quality={80}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-transparent to-transparent" />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-teal/30 rounded-2xl" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-coral/20 rounded-xl blur-xl" />
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
    <section className="py-24 lg:py-32 bg-[#f8fafa]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden relative shadow-2xl">
              <Image
                src="/images/luca-speaking.jpg"
                alt="Alphakom"
                fill
                className="object-cover"
                sizes="50vw"
                loading="lazy"
                quality={80}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/30 to-transparent" />
            </div>
            {/* Decorative */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-teal/20 rounded-2xl -z-10" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
              <span className="w-12 h-px bg-teal" />
              <span className="text-teal text-sm uppercase tracking-widest font-medium">Alphakom</span>
            </motion.div>

            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl text-navy mb-10">
              La Scuola degli Alpha Leaders.
            </motion.h2>

            <motion.div variants={fadeUp} className="space-y-4 mb-10">
              {points.map((point, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                    point.highlight
                      ? 'bg-gradient-to-r from-teal/10 to-teal/5 border-teal/30 shadow-md'
                      : 'bg-white border-gray-100 hover:border-teal/30 hover:shadow-md'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    point.highlight ? 'bg-teal text-white' : 'bg-teal/10'
                  }`}>
                    <span className={`text-sm font-medium ${point.highlight ? '' : 'text-teal'}`}>{i + 1}</span>
                  </div>
                  <p className={point.highlight ? 'text-navy font-medium' : 'text-navy/80'}>{point.text}</p>
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
    <section className="py-32 lg:py-40 bg-white">
      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <Quote className="w-12 h-12 text-teal/20 mx-auto mb-8" />
          <p className="font-display text-3xl md:text-4xl lg:text-5xl text-navy leading-relaxed mb-8">
            Non sei quello che ti è successo.<br />
            <span className="text-teal">Sei quello che scegli di diventare.</span>
          </p>
          <div className="flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-coral" />
            <span className="text-coral font-medium">Luca Pellicari</span>
            <span className="w-12 h-px bg-coral" />
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
    <section className="py-24 lg:py-32 bg-navy-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-12 h-px bg-teal-light" />
            <span className="text-teal-light text-sm uppercase tracking-widest font-medium">Cosa Possiamo Fare</span>
            <span className="w-12 h-px bg-teal-light" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
            Percorsi, seminari, corsi, eventi.
          </h2>
          <p className="text-lg text-white/50">
            Metodi pratici per crescere, evolvere, trasformare.
          </p>
        </div>

        {/* Cards Grid - Simple CSS */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {percorsiItems.map((item) => (
            <div
              key={item.title}
              className="group p-6 md:p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-teal/30 transition-all duration-300 cursor-pointer"
            >
              <item.icon className="w-8 h-8 text-teal-light mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-medium">{item.title}</h3>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Link href="/contatti" className="group relative inline-flex items-center gap-3 bg-coral text-white px-8 py-4 rounded-full font-medium overflow-hidden shadow-lg shadow-coral/30 hover:shadow-xl hover:shadow-coral/40 transition-all duration-500">
            <span className="relative z-10">Scopri i percorsi</span>
            <span className="relative z-10 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-coral-dark to-coral opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ============================================
// METODO SECTION - Premium In-Flow Design
// ============================================
function MetodoSection() {
  const offerings = [
    { icon: BookOpen, label: 'Un libro', color: 'from-navy to-navy-dark', bg: 'bg-navy/5', text: 'text-navy' },
    { icon: GraduationCap, label: 'Un corso', color: 'from-coral to-coral-dark', bg: 'bg-coral/10', text: 'text-coral' },
    { icon: Route, label: 'Un percorso', color: 'from-teal to-teal-dark', bg: 'bg-teal/10', text: 'text-teal' },
  ]

  return (
    <section className="relative py-32 lg:py-40 bg-gradient-to-b from-white via-teal-50/30 to-white overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-coral/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-teal/3 to-coral/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-8">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-teal" />
            <span className="px-4 py-2 bg-teal/10 rounded-full text-teal text-sm uppercase tracking-widest font-medium">
              Il Mio Metodo
            </span>
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-teal" />
          </div>

          <div className="relative inline-block mb-6">
            <h2 className="font-display text-7xl md:text-8xl lg:text-[10rem] text-transparent bg-clip-text bg-gradient-to-r from-navy via-teal to-navy leading-none">
              In-Flow
            </h2>
            <div className="absolute -inset-4 bg-gradient-to-r from-teal/20 via-coral/10 to-teal/20 blur-2xl -z-10 opacity-60" />
          </div>

          <p className="font-serif text-xl md:text-2xl lg:text-3xl text-navy/60 italic max-w-2xl mx-auto">
            La scienza dell&apos;identità, la bellezza della verità.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="relative bg-white rounded-[2rem] p-8 md:p-12 lg:p-16 shadow-2xl shadow-navy/5 border border-gray-100/80 backdrop-blur-sm">
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-teal/20 rounded-tl-[2rem]" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-coral/20 rounded-br-[2rem]" />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <div>
              <p className="text-navy/60 text-lg md:text-xl mb-8 leading-relaxed">
                Ogni persona può entrare nel suo{' '}
                <span className="text-teal font-semibold relative">
                  stato naturale
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal/30" />
                </span>:
              </p>

              <div className="space-y-5 mb-10">
                {[
                  'un equilibrio tra chi sei e ciò che fai',
                  'tra la tua storia e il tuo futuro',
                  'tra il tuo cuore e la tua visione',
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-teal to-coral flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
                    <p className="text-navy text-lg md:text-xl font-display">{text}</p>
                  </div>
                ))}
              </div>

              <div className="relative pl-6 border-l-2 border-teal/30">
                <p className="text-navy font-medium text-lg">
                  Il metodo In-Flow è il risultato di{' '}
                  <span className="text-teal">una vita intera</span>.
                </p>
              </div>
            </div>

            {/* Right: Offerings - Simple CSS */}
            <div className="space-y-4">
              {offerings.map((item) => (
                <div
                  key={item.label}
                  className="group relative bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:border-teal/30 hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  <div className="relative flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-xl ${item.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className={`w-7 h-7 ${item.text}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-xl font-display ${item.text} mb-1`}>{item.label}</h4>
                      <p className="text-sm text-navy/50">Scopri di più →</p>
                    </div>
                    <ArrowUpRight className={`w-5 h-5 ${item.text} opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-12 pt-10 border-t border-gray-100 text-center">
            <Link href="/metodo-in-flow" className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-teal to-teal-dark text-white px-10 py-5 rounded-full text-lg font-medium overflow-hidden shadow-xl shadow-teal/25 hover:shadow-2xl hover:shadow-teal/35 transition-all duration-500 hover:scale-[1.02]">
              <span className="relative z-10">Scopri In-Flow</span>
              <span className="relative z-10 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-dark via-teal to-teal-dark bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-500" />
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
    <section className="py-24 lg:py-32 bg-[#f8fafa]">
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
              <span className="w-12 h-px bg-coral" />
              <span className="text-coral text-sm uppercase tracking-widest font-medium">I Miei Libri</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl text-navy">
              Storie vere, identità vere.
            </motion.h2>
          </div>
          <motion.div variants={fadeUp}>
            <Link href="/libri" className="group relative inline-flex items-center gap-3 text-navy font-medium">
              <span className="relative">
                Vedi tutti
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-coral group-hover:w-full transition-all duration-300" />
              </span>
              <span className="w-10 h-10 rounded-full border-2 border-navy/20 flex items-center justify-center group-hover:border-coral group-hover:bg-coral transition-all duration-300">
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
          className="grid md:grid-cols-3 gap-8"
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
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                  quality={80}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <p className="text-coral text-sm font-medium mb-1">{libro.subtitle}</p>
              <h3 className="font-display text-2xl text-navy group-hover:text-teal transition-colors">{libro.title}</h3>
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
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
            <span className="text-navy/70 font-medium">Altri progetti in arrivo…</span>
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
    <section className="py-24 lg:py-32 bg-white">
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
                <span className="w-12 h-px bg-coral" />
                <span className="text-coral text-sm uppercase tracking-widest font-medium">Blog</span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl text-navy mb-2">
                Pensieri liberi.<br />Verità condivise.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-teal text-lg font-medium mb-3">
                Identità che si aprono.
              </motion.p>
              <motion.p variants={fadeUp} className="text-navy/50 text-base max-w-md">
                Scrivo per raccontare, per comprendere e per far vibrare qualcosa dentro chi legge.
              </motion.p>
            </div>
            <motion.div variants={fadeUp}>
              <Link href="/blog" className="group relative inline-flex items-center gap-3 text-navy font-medium">
                <span className="relative">
                  Tutti gli articoli
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-coral group-hover:w-full transition-all duration-300" />
                </span>
                <span className="w-10 h-10 rounded-full border-2 border-navy/20 flex items-center justify-center group-hover:border-coral group-hover:bg-coral transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 group-hover:text-white transition-colors duration-300" />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Blog Grid */}
          <motion.div
            variants={stagger}
            className="grid md:grid-cols-3 gap-8"
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
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                    quality={80}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-navy">
                    {post.category}
                  </span>
                </div>
                <h3 className="font-display text-xl text-navy mb-2 group-hover:text-teal transition-colors duration-300">
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
      {/* Large Typography Background */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <span className="text-[20rem] md:text-[30rem] lg:text-[40rem] font-display font-bold text-white/[0.02] leading-none">
          ?
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 min-h-[600px] lg:min-h-[700px]">
          {/* Left Side - Dark with Content */}
          <div className="relative flex items-center px-8 md:px-16 lg:px-20 py-20 lg:py-32">
            {/* Accent Line */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-coral via-coral to-transparent" />

            <div className="relative">
              <span className="inline-block text-coral text-sm uppercase tracking-[0.3em] mb-6 font-medium">
                Inizia ora
              </span>

              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-8">
                Vuoi lavorare<br />
                <span className="text-teal-light">con me?</span>
              </h2>

              <div className="space-y-4 text-white/50 text-lg max-w-md">
                <p>Vuoi portarmi nella tua azienda?</p>
                <p>Vuoi iniziare il tuo percorso identitario?</p>
              </div>
            </div>
          </div>

          {/* Right Side - Coral Gradient with CTA */}
          <div className="relative flex items-center justify-center px-8 md:px-16 lg:px-20 py-20 lg:py-32 bg-gradient-to-br from-coral via-coral to-coral-dark">
            {/* Decorative Circles */}
            <div className="absolute top-10 right-10 w-20 h-20 rounded-full border border-white/20" />
            <div className="absolute bottom-20 left-10 w-32 h-32 rounded-full border border-white/10" />
            <div className="absolute top-1/2 right-20 w-40 h-40 rounded-full bg-white/5" />

            <div className="relative text-center lg:text-left">
              <p className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-12">
                Scrivimi.<br />
                <span className="text-white/80">Sono qui.</span>
              </p>

              <Link
                href="/contatti"
                className="group inline-flex items-center gap-6 bg-white text-navy px-10 py-6 rounded-full text-xl font-semibold shadow-2xl shadow-black/20 hover:shadow-black/30 transition-all duration-500 hover:scale-[1.02]"
              >
                <span>Contattami</span>
                <span className="w-14 h-14 rounded-full bg-navy flex items-center justify-center group-hover:bg-teal transition-colors duration-300">
                  <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>

              {/* Bottom Tagline */}
              <p className="mt-12 text-white/60 text-sm tracking-wide">
                Il primo passo verso la tua trasformazione
              </p>
            </div>
          </div>
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
      <OpeningSection />
      <ChiSonoSection />
      <IoSonoSection />
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
