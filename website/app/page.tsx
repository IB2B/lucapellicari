'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowRight, ChevronRight, ChevronLeft, Target, Eye, Shield, Users, Brain, Star, Compass, Sparkles, Quote, ArrowUpRight } from 'lucide-react'
import { InFlowSection } from '@/components/sections/InFlowSection'

// Animation variants - refined for premium feel
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
}

const slideIn = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }
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
            <Image src={slide.image} alt={slide.alt} fill className="object-cover" priority loading="eager" quality={75} sizes="100vw" />
            {/* Premium gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy-dark/60 to-navy-dark/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/50 via-transparent to-transparent" />
          </div>
        ))}
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent" />

      {/* Subtle corner accents */}
      <div className="absolute top-32 left-8 w-24 h-24 border-l border-t border-cream/10 rounded-tl-3xl" />
      <div className="absolute bottom-32 right-8 w-24 h-24 border-r border-b border-teal/10 rounded-br-3xl" />

      {/* Content */}
      <motion.div className="relative z-10 h-full flex items-center" style={{ opacity }}>
        <div className="w-full px-8 md:px-16 lg:px-24">
          <div className="max-w-3xl">
            {/* Subtitle with line */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="w-12 h-px bg-teal-light" />
              <span className="text-teal-light text-sm uppercase tracking-[0.2em] font-medium">
                {heroSlides[currentSlide].subtitle}
              </span>
            </motion.div>

            <div className="relative min-h-[160px] md:min-h-[180px] lg:min-h-[200px] mb-8">
              {heroSlides.map((slide, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: index === currentSlide ? 1 : 0,
                    y: index === currentSlide ? 0 : 20
                  }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={`absolute inset-0 ${index === currentSlide ? '' : 'pointer-events-none'}`}
                >
                  <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-cream leading-[1.05] tracking-tight">
                    {slide.title}{' '}
                    <span className="text-teal-light italic">{slide.highlight}</span>
                  </h1>
                </motion.div>
              ))}
            </div>

            <div className="relative min-h-[4.5rem] md:min-h-[4rem] mb-12">
              {heroSlides.map((slide, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === currentSlide ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`absolute inset-0 text-cream/80 text-lg md:text-xl leading-relaxed max-w-xl ${
                    index === currentSlide ? '' : 'pointer-events-none'
                  }`}
                >
                  {slide.description}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-5"
            >
              <Link href="/chi-sono" className="group relative inline-flex items-center gap-3 bg-teal text-white px-9 py-4 rounded-full font-semibold overflow-hidden shadow-xl shadow-teal/25 hover:shadow-2xl hover:shadow-teal/35 transition-all duration-500 hover:-translate-y-0.5">
                <span className="relative z-10">Scopri chi sono</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-teal-dark opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
              <Link href="/contatti" className="group relative inline-flex items-center gap-3 px-9 py-4 border border-cream/30 text-cream rounded-full font-medium backdrop-blur-sm hover:border-cream/60 hover:bg-white/5 transition-all duration-300">
                <span>Contattami</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <div className="absolute bottom-12 left-0 right-0 z-20 px-8 md:px-16 lg:px-24">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Slide counter */}
            <div className="flex items-center gap-3 text-sm font-medium">
              <span className="text-cream text-2xl font-display">0{currentSlide + 1}</span>
              <span className="text-cream/60">/</span>
              <span className="text-cream/60">0{heroSlides.length}</span>
            </div>

            {/* Progress bar */}
            <div className="w-32 md:w-48">
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
          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              aria-label="Slide precedente"
              className="w-12 h-12 rounded-full border border-cream/20 flex items-center justify-center text-cream/60 hover:text-cream hover:border-cream/40 hover:bg-white/5 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Slide successiva"
              className="w-12 h-12 rounded-full border border-cream/20 flex items-center justify-center text-cream/60 hover:text-cream hover:border-cream/40 hover:bg-white/5 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-cream/60 text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-cream/20 flex items-start justify-center p-1.5"
        >
          <motion.div className="w-1 h-2 rounded-full bg-teal-light" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// ============================================
// OPENING SECTION - Creative Split Layout
// ============================================
function OpeningSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[85vh]">
        {/* Left - Dark Side */}
        <div className="relative bg-navy-dark py-24 lg:py-36 px-8 md:px-16 lg:px-20 flex items-center">
          {/* Floating Number */}
          <motion.div
            style={{ y }}
            className="absolute top-10 right-10 text-[10rem] md:text-[14rem] font-display text-cream/[0.03] leading-none select-none"
          >
            7
          </motion.div>

          {/* Subtle gradient accent */}
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-teal/50 via-teal/20 to-transparent" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="relative z-10 max-w-lg"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-10">
              <span className="w-8 h-px bg-white/30" />
              <span className="text-cream/50 text-xs uppercase tracking-[0.25em] font-medium">
                Una verità semplice
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-3 mb-14">
              {['Io non sono un formatore.', 'Non sono un motivatore.', 'Non sono un guru.'].map((text, i) => (
                <p key={i} className="font-display text-2xl md:text-3xl text-cream/30 tracking-tight">
                  {text}
                </p>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="h-px w-16 bg-gradient-to-r from-teal-light to-transparent mb-10" />

            <motion.p
              variants={fadeUp}
              className="font-display text-2xl md:text-3xl lg:text-4xl text-cream leading-snug tracking-tight"
            >
              Sono un uomo che ha vissuto{' '}
              <span className="text-teal-light">sette rinascite</span>.
            </motion.p>
          </motion.div>
        </div>

        {/* Right - Light Side */}
        <div className="relative bg-white py-24 lg:py-36 px-8 md:px-16 lg:px-20 flex items-center">
          {/* Decorative elements */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-48 h-48 rounded-full border border-teal/10" />
          <div className="absolute bottom-16 right-16 w-24 h-24 rounded-full bg-teal/5" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="relative z-10 max-w-lg"
          >
            <motion.p
              variants={fadeUp}
              className="font-serif text-xl md:text-2xl text-navy/70 italic leading-relaxed mb-10"
            >
              E oggi ho scelto di mettere tutta la mia esperienza al servizio delle persone che vogliono finalmente{' '}
              <span className="text-teal font-semibold not-italic">riconoscersi</span>.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="bg-teal/5 p-6 rounded-2xl border-l-2 border-teal/40 mb-12"
            >
              <p className="text-navy/80 leading-relaxed">
                Se sei qui, se sei arrivato fino a questa riga, è perché una parte di te sente che{' '}
                <span className="text-teal font-semibold">è il momento di andare oltre</span>.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-5">
              {[
                { text: 'Oltre la maschera', color: 'bg-teal' },
                { text: 'Oltre il ruolo', color: 'bg-teal-dark' },
                { text: 'Per incontrare chi sei', color: 'bg-navy' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="flex items-center gap-4 group cursor-default"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${item.color} group-hover:scale-[2] transition-transform duration-300`} />
                  <span className="text-navy text-lg font-medium group-hover:translate-x-1 transition-transform duration-300">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-14 pt-6 border-t border-navy/10"
            >
              <p className="text-navy/60 text-sm tracking-wide">
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
    <section className="py-24 lg:py-32 bg-white">
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
                  alt="Luca Pellicari - Identity Coach"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  loading="lazy"
                  quality={80}
                />
              </div>
              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-6 shadow-2xl"
              >
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-display text-teal mb-0.5"><AnimatedNumber value={7} /></p>
                    <p className="text-xs text-navy/60 uppercase tracking-wider">Rinascite</p>
                  </div>
                  <div>
                    <p className="text-3xl font-display text-teal mb-0.5"><AnimatedNumber value={20} suffix="+" /></p>
                    <p className="text-xs text-navy/60 uppercase tracking-wider">Anni</p>
                  </div>
                  <div>
                    <p className="text-3xl font-display text-navy mb-0.5"><AnimatedNumber value={1000} suffix="+" /></p>
                    <p className="text-xs text-navy/60 uppercase tracking-wider">Vite</p>
                  </div>
                </div>
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
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <span className="w-12 h-px bg-teal" />
              <span className="text-teal text-sm uppercase tracking-widest font-medium">Chi Sono</span>
            </motion.div>

            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl lg:text-6xl text-navy mb-4">
              Io sono Luca Pellicari
            </motion.h2>

            <motion.p variants={fadeUp} className="font-serif text-lg text-navy/60 italic mb-8">
              Identity Coach • Autore • Fondatore di Quantum Academy
            </motion.p>

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

            <motion.blockquote variants={fadeUp} className="relative pl-8 py-6 mb-10 border-l-2 border-teal">
              <p className="text-xl md:text-2xl font-serif italic text-navy">
                Il mio talento non è motivarti.<br />
                <span className="text-teal">Il mio talento è aiutarti a ricordare chi sei.</span>
              </p>
            </motion.blockquote>

            <motion.div variants={fadeUp}>
              <Link href="/chi-sono" className="group relative inline-flex items-center gap-3 text-navy font-medium">
                <span className="relative">
                  Scopri la mia storia
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
    <section className="py-28 lg:py-36 bg-gray-50">
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-20"
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mb-8">
            <span className="w-10 h-px bg-teal/50" />
            <span className="text-teal text-xs uppercase tracking-[0.2em] font-medium">La Mia Missione</span>
            <span className="w-10 h-px bg-teal/50" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl text-navy mb-6 tracking-tight">
            Trasformo le persone aiutandole a riconoscersi.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-navy/60 max-w-xl mx-auto leading-relaxed">
            Il mio lavoro è semplice: ti porto dentro te stesso.
            Lo faccio con delicatezza, con forza, con consapevolezza e con verità.
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {missionItems.map((item) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              className="group relative bg-gray-50 border border-navy/5 rounded-2xl p-6 hover:bg-white hover:border-teal/20 hover:shadow-lg hover:shadow-teal/5 transition-all duration-400 cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl bg-teal/10 flex items-center justify-center mb-4 group-hover:bg-teal group-hover:scale-105 transition-all duration-300">
                <item.icon className="w-5 h-5 text-teal group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-semibold text-navy mb-1 text-sm">{item.label}</h3>
              <p className="text-xs text-navy/60">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-14"
        >
          <Link href="/missione" className="group inline-flex items-center gap-3 bg-navy text-white px-8 py-4 rounded-full font-medium shadow-lg shadow-navy/10 hover:shadow-xl hover:shadow-navy/15 hover:-translate-y-0.5 transition-all duration-300">
            <span>Scopri la mia missione</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
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
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-dark rounded-full blur-[150px]" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.span variants={fadeUp} className="inline-block px-4 py-2 bg-teal text-white text-sm font-medium rounded-full mb-8">
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
                  <div className="w-10 h-10 rounded-full bg-teal-light/30 border-2 border-navy-dark flex items-center justify-center text-xs text-white font-medium">L</div>
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
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-teal/20 rounded-xl blur-xl" />
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
    <section className="py-24 lg:py-32 bg-white">
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
    <section className="py-28 lg:py-36 bg-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-8 md:px-16 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Quote className="w-10 h-10 text-teal/30 mx-auto mb-10" />
          <p className="font-display text-3xl md:text-4xl lg:text-5xl text-navy leading-[1.3] tracking-tight mb-10">
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
          <p className="text-lg text-white/70">
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
          <Link href="/contatti" className="group inline-flex items-center gap-3 bg-teal text-white px-8 py-4 rounded-full font-medium shadow-lg shadow-teal/25 hover:shadow-xl hover:shadow-teal/35 hover:-translate-y-0.5 transition-all duration-300">
            <span>Scopri i percorsi</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
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
    <section className="py-24 lg:py-32 bg-white">
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
              <span className="w-12 h-px bg-teal" />
              <span className="text-teal text-sm uppercase tracking-widest font-medium">I Miei Libri</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl text-navy">
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
              <p className="text-teal text-sm font-medium mb-1">{libro.subtitle}</p>
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
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
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
    <section className="py-24 lg:py-32 bg-gray-50">
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
                <span className="w-12 h-px bg-teal" />
                <span className="text-teal text-sm uppercase tracking-widest font-medium">Blog</span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl text-navy mb-2">
                Pensieri liberi.<br />Verità condivise.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-teal text-lg font-medium mb-3">
                Identità che si aprono.
              </motion.p>
              <motion.p variants={fadeUp} className="text-navy/70 text-base max-w-md">
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
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy-dark to-navy opacity-50" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 min-h-[550px] lg:min-h-[600px]">
          {/* Left Side - Dark with Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative flex items-center px-8 md:px-16 lg:px-20 py-20 lg:py-28"
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

              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream leading-[1.1] tracking-tight mb-8">
                Vuoi lavorare<br />
                <span className="text-teal-light italic">con me?</span>
              </h2>

              <div className="space-y-3 text-cream/60 text-lg max-w-sm">
                <p>Vuoi portarmi nella tua azienda?</p>
                <p>Vuoi iniziare il tuo percorso identitario?</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Teal Gradient with CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative flex items-center justify-center px-8 md:px-16 lg:px-20 py-20 lg:py-28 bg-gradient-to-br from-teal to-teal-dark"
          >
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-16 h-16 rounded-full border border-cream/10" />
            <div className="absolute bottom-16 left-10 w-24 h-24 rounded-full border border-cream/5" />

            <div className="relative text-center lg:text-left">
              <p className="font-display text-4xl md:text-5xl text-cream leading-tight tracking-tight mb-10">
                Scrivimi.<br />
                <span className="text-cream/80 font-serif italic">Sono qui.</span>
              </p>

              <Link
                href="/contatti"
                className="group inline-flex items-center gap-5 bg-white text-navy-dark px-9 py-5 rounded-full text-lg font-semibold shadow-xl shadow-navy-dark/20 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Contattami</span>
                <span className="w-12 h-12 rounded-full bg-navy-dark flex items-center justify-center group-hover:bg-teal-dark transition-colors duration-300">
                  <ArrowRight className="w-5 h-5 text-cream group-hover:translate-x-0.5 transition-transform duration-300" />
                </span>
              </Link>

              <p className="mt-10 text-cream/60 text-sm tracking-wide">
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
// MAIN PAGE
// ============================================
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <OpeningSection />
      <ChiSonoSection />
      <MissioneSection />
      <QuantumAcademySection />
      <AlphakomSection />
      <QuoteSection />
      <PercorsiSection />
      <InFlowSection />
      <LibriSection />
      <BlogSection />
      <ContattiSection />
    </>
  )
}
