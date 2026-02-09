'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowRight, ArrowDown, Play, Sparkles, Target, Eye, Shield, Users, Brain, Star, Compass, BookOpen, Pen, Mail, ChevronRight } from 'lucide-react'

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
      className={`${center ? 'text-center' : ''} mb-16 lg:mb-20`}
    >
      <motion.span variants={fadeUp} className="badge mb-6 inline-block">
        {badge}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        className={`font-display text-title font-semibold ${light ? 'text-dark' : 'text-light'} mb-6`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className={`text-subtitle ${light ? 'text-dark/70' : 'text-light/70'} max-w-2xl ${center ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}

// HERO SECTION
function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <Image
          src="/images/hero-bg.jpg"
          alt="Luca Pellicari"
          fill
          className="object-cover"
          priority
          quality={95}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/50 to-dark" />
        <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div className="relative z-10 container-custom text-center" style={{ y, opacity }}>
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-display text-hero text-light mb-4">
            Adesso siamo qui,
          </h1>
          <h1 className="font-display text-hero text-gradient-gold mb-8">
            tu ed io.
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-serif text-2xl md:text-3xl text-light/90 italic mb-6"
        >
          E sono felice che tu sia arrivato.
        </motion.p>

        {/* The Door */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="max-w-3xl mx-auto mb-10"
        >
          <p className="text-lg md:text-xl text-light/80 leading-relaxed">
            Questa non è una pagina web. <span className="text-gold font-medium">È una porta.</span><br />
            La porta che conduce alla tua identità profonda, alla tua visione, alla tua verità.
          </p>
        </motion.div>

        {/* Opening Paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <p className="text-base md:text-lg text-light/60 leading-relaxed">
            Lascia che ti dica una cosa semplice e vera: io non sono un formatore.
            Non sono un motivatore. Non sono un guru. Sono un uomo che ha vissuto
            <span className="text-gold"> sette rinascite</span> e che oggi ha scelto
            di mettere tutta la sua esperienza — le ferite, i successi, i fallimenti, le scoperte —
            al servizio delle persone che vogliono finalmente riconoscersi.
          </p>
        </motion.div>

        {/* Final CTA Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <p className="text-base md:text-lg text-light/50 leading-relaxed">
            Se sei qui, se sei arrivato fino a questa riga, è perché una parte di te sente
            che è il momento di andare oltre. Oltre la maschera. Oltre il ruolo. Oltre ciò che fai.
            <span className="text-gold font-medium"> Per incontrare ciò che sei.</span>
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/chi-sono" className="btn-primary group">
            Scopri chi sono
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/contatti" className="btn-secondary">
            Inizia il viaggio con me
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-light/40"
        >
          <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
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
    <section className="section-darker relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px]" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <Image
                src="/images/luca-portrait.jpg"
                alt="Luca Pellicari"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
            </div>
            {/* Decorative frame */}
            <div className="absolute -inset-4 border border-gold/20 rounded-3xl -z-10" />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 border border-gold/30 rounded-full -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={stagger}
          >
            <motion.span variants={fadeUp} className="badge mb-6 inline-block">
              Chi Sono
            </motion.span>

            <motion.h2 variants={fadeUp} className="font-display text-title text-light mb-8">
              &ldquo;Io sono Luca Pellicari&rdquo;
            </motion.h2>

            <motion.div variants={fadeUp} className="space-y-6 text-light/70 text-lg leading-relaxed">
              <p>
                Sono un uomo che non ha mai avuto paura di guardare la vita negli occhi.
                Ho attraversato la malattia, la rinascita, la disciplina del paracadutismo,
                i fallimenti, la rinascita professionale, gli incontri che cambiano un destino.
              </p>
              <p>
                E ho trasformato tutto in un metodo: <span className="text-gold font-medium">In-Flow</span>.
              </p>
              <p className="text-xl font-serif italic text-light/90 border-l-2 border-gold/50 pl-6">
                Il mio talento non è motivarti.<br />
                Il mio talento è <span className="text-gold">aiutarti a ricordare chi sei</span>.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10">
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
    <section className="section-dark relative overflow-hidden">
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
          className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-16"
        >
          {missionItems.map((item, index) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="card-hover text-center group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                <item.icon className="w-7 h-7 text-gold" />
              </div>
              <p className="text-light font-medium">{item.label}</p>
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
    <section className="section-darker relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[200px]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={stagger}
          >
            <motion.span variants={fadeUp} className="badge mb-6 inline-block">
              Quantum Academy
            </motion.span>

            <motion.h2 variants={fadeUp} className="font-display text-title text-light mb-8">
              Il sogno che non sapevo di sognare, diventato realtà.
            </motion.h2>

            <motion.div variants={fadeUp} className="space-y-4 text-light/70 text-lg leading-relaxed mb-10">
              <p className="text-gold font-medium text-xl">
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
              <Link href="/quantum-academy" className="btn-primary">
                Entra in Quantum Academy
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden">
              <Image
                src="/images/quantum-academy.jpg"
                alt="Quantum Academy"
                fill
                className="object-cover"
              />
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-gold opacity-20 blur-2xl rounded-3xl -z-10" />
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
    <section className="section-dark relative">
      <div className="container-narrow text-center">
        <SectionTitle
          badge="Alphakom"
          title="La Scuola degli Alpha Leaders."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="space-y-4 mb-12"
        >
          {alphaPoints.map((point, index) => (
            <motion.p
              key={index}
              variants={fadeUp}
              className="text-xl text-light/80"
            >
              {point.includes('In-Flow') ? (
                <>
                  {point.split('In-Flow')[0]}
                  <span className="text-gold font-medium">In-Flow</span>
                  {point.split('In-Flow')[1]}
                </>
              ) : point.includes('guidare') || point.includes('vedere') || point.includes('influenzare') || point.includes('ricchezza') ? (
                <>
                  {point.split(',')[0].split(' ').slice(0, -1).join(' ')}{' '}
                  <span className="text-gold font-medium">{point.split(' ').find(w => ['guidare', 'vedere', 'influenzare', 'creare'].some(k => w.includes(k)))}</span>
                  {point.includes(',') ? ', ' + point.split(',').slice(1).join(',') : point.split(point.split(' ').find(w => ['guidare', 'vedere', 'influenzare', 'creare'].some(k => w.includes(k))) || '')[1]}
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
          <Link href="/alphakom" className="btn-primary">
            Scopri Alphakom
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// Quote Section
function QuoteSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-20 lg:py-28 bg-dark-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-transparent to-transparent" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="container-narrow text-center relative z-10"
      >
        <div className="text-gold text-6xl font-serif mb-6">&ldquo;</div>
        <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-light leading-relaxed mb-8">
          Non sei quello che ti è successo.<br />
          Sei quello che scegli di diventare.
        </p>
        <p className="text-gold font-medium">— Luca Pellicari</p>
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
    <section className="section-light">
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
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12"
        >
          {percorsiItems.map((item) => (
            <motion.div
              key={item}
              variants={fadeUp}
              whileHover={{ x: 8 }}
              className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-light-100 hover:border-gold/30 hover:shadow-card-hover transition-all cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                <ArrowRight className="w-4 h-4 text-gold" />
              </div>
              <span className="text-dark font-medium">{item}</span>
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
    <section className="section-dark relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gold/5 rounded-full blur-[150px]" />
      </div>

      <div className="container-narrow text-center relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.span variants={fadeUp} className="badge mb-6 inline-block">
            Il Mio Metodo
          </motion.span>

          <motion.h2 variants={fadeUp} className="font-display text-display text-gradient-gold mb-4">
            In-Flow
          </motion.h2>

          <motion.p variants={fadeUp} className="font-serif text-2xl text-gold/80 italic mb-10">
            La scienza dell'identità, la bellezza della verità.
          </motion.p>

          <motion.div variants={fadeUp} className="space-y-4 text-lg text-light/70 leading-relaxed mb-12">
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
            <Link href="/metodo-in-flow" className="btn-primary">
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
    <section className="section-darker">
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
          className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12"
        >
          {libri.map((libro) => (
            <motion.div
              key={libro.title}
              variants={fadeUp}
              whileHover={{ y: -12 }}
              className="group relative bg-dark rounded-3xl overflow-hidden cursor-pointer"
            >
              <div className="aspect-[3/4] relative bg-gradient-to-br from-dark-100 to-dark-200 flex items-center justify-center">
                <BookOpen className="w-20 h-20 text-gold/20 group-hover:text-gold/40 transition-colors" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-gold/60 text-sm mb-1">{libro.subtitle}</p>
                <h3 className="font-display text-xl text-light font-medium">
                  {libro.title}
                </h3>
              </div>
              {/* Hover glow */}
              <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 rounded-3xl transition-colors" />
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
    <section className="section-dark">
      <div className="container-narrow text-center">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="w-20 h-20 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-8">
            <Pen className="w-8 h-8 text-gold" />
          </motion.div>

          <motion.span variants={fadeUp} className="badge mb-6 inline-block">
            Blog
          </motion.span>

          <motion.h2 variants={fadeUp} className="font-display text-title text-light mb-6">
            Pensieri liberi. Verità condivise.<br />Identità che si aprono.
          </motion.h2>

          <motion.p variants={fadeUp} className="text-lg text-light/70 leading-relaxed mb-10">
            Scrivo per raccontare, per comprendere e per far vibrare qualcosa dentro chi legge.
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link href="/blog" className="btn-primary">
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
    <section className="py-32 lg:py-40 bg-gradient-to-b from-dark-50 to-dark relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[200px]" />
      </div>

      <div className="container-narrow text-center relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="w-24 h-24 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-8 border border-gold/20">
            <Mail className="w-10 h-10 text-gold" />
          </motion.div>

          <motion.span variants={fadeUp} className="badge mb-6 inline-block">
            Contatti
          </motion.span>

          <motion.h2 variants={fadeUp} className="font-display text-title text-light mb-8">
            Vuoi lavorare con me?
          </motion.h2>

          <motion.div variants={fadeUp} className="space-y-2 text-xl text-light/70 mb-8">
            <p>Vuoi portarmi nella tua azienda?</p>
            <p>Vuoi iniziare il tuo percorso identitario?</p>
          </motion.div>

          <motion.p variants={fadeUp} className="font-serif text-2xl text-light mb-12">
            Scrivimi. <span className="text-gold">Sono qui.</span>
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link href="/contatti" className="btn-primary text-lg px-10 py-5">
              Contattami
              <ArrowRight className="ml-2 w-5 h-5" />
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
