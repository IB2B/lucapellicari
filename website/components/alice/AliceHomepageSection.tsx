'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { BookOpen, ArrowDown, Sparkles, MessageCircle } from 'lucide-react'
import { useAliceContext } from './AliceProvider'
import { AliceOrbVisualizer } from './AliceOrbVisualizer'
import { playSound } from './AliceSounds'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
}

export function AliceHomepageSection() {
  const { openAlice } = useAliceContext()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const scrollToNext = () => {
    const section = document.getElementById('alice-section')
    if (section) {
      const next = section.nextElementSibling
      if (next) next.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="alice-section"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Dark background — seamless from hero */}
      <div className="absolute inset-0 bg-navy-dark" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-[#1E3347] to-navy-dark" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-teal/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cream/5 to-transparent" />

      <div className="container-custom relative">
        {/* Section header */}
        <motion.div
          className="text-center mb-14 md:mb-20"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          <motion.span
            className="inline-block text-[13px] font-sans font-bold uppercase tracking-[0.25em] text-teal-light mb-5"
            variants={fadeUp}
          >
            Scegli
          </motion.span>
          <motion.h2
            className="font-display text-title text-cream mb-5"
            variants={fadeUp}
          >
            Come vuoi conoscermi?
          </motion.h2>
          <motion.p
            className="font-serif italic text-xl text-cream/40 max-w-lg mx-auto"
            variants={fadeUp}
          >
            Hai due strade davanti a te.
          </motion.p>
        </motion.div>

        {/* Two cards */}
        <motion.div
          className="grid lg:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          {/* ===== Card 1: Read the site ===== */}
          <motion.div
            className="group relative"
            variants={fadeUp}
          >
            <div className="relative bg-white rounded-3xl p-10 md:p-12 h-full flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:shadow-white/5 border border-white/10">
              {/* Watermark */}
              <div className="absolute top-8 right-8 opacity-[0.04]">
                <BookOpen size={140} strokeWidth={0.6} className="text-navy" />
              </div>

              {/* Icon container */}
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-teal/12 to-teal/5 border border-teal/12 flex items-center justify-center mb-8">
                <BookOpen className="text-teal" size={36} strokeWidth={1.5} />
              </div>

              <h3 className="font-display text-[28px] md:text-[32px] text-navy-dark mb-4 leading-tight">
                Esplora il sito
              </h3>

              <p className="font-serif text-navy/60 text-[17px] leading-relaxed mb-10 max-w-sm">
                Scorri, leggi, scopri. Ogni pagina racconta un frammento della mia storia, della mia visione, del mio metodo.
              </p>

              <button
                onClick={scrollToNext}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border-2 border-navy/12 text-navy/70 font-sans text-[15px] font-semibold hover:border-navy/25 hover:text-navy hover:bg-navy/[0.03] transition-all duration-200 group/btn"
              >
                <span>Continua a leggere</span>
                <ArrowDown size={18} className="transition-transform group-hover/btn:translate-y-0.5" strokeWidth={2} />
              </button>

              {/* Matrix reference */}
              <p className="mt-10 font-serif italic text-[13px] text-navy/25">
                La pillola blu. Il sentiero sicuro.
              </p>
            </div>
          </motion.div>

          {/* Divider (mobile only) */}
          <div className="flex items-center justify-center lg:hidden -my-1">
            <div className="w-14 h-14 rounded-full border-2 border-cream/10 flex items-center justify-center bg-white/5 backdrop-blur-sm">
              <span className="text-[11px] font-sans font-bold text-cream/40 uppercase tracking-wider">
                oppure
              </span>
            </div>
          </div>

          {/* ===== Card 2: Talk to Alice ===== */}
          <motion.div
            className="group relative"
            variants={fadeUp}
          >
            <div className="relative bg-[#162A3C] rounded-3xl p-10 md:p-12 h-full flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:shadow-teal/8 overflow-hidden border border-white/[0.06]">
              {/* Gradient overlays */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal/[0.04] via-transparent to-coral/[0.04]" />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal/[0.06] via-transparent to-coral/[0.06] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Top accent line */}
              <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-teal/25 to-transparent" />

              {/* Watermark */}
              <div className="absolute top-6 right-6 opacity-[0.04]">
                <MessageCircle size={140} strokeWidth={0.6} className="text-cream" />
              </div>

              {/* Mini orb */}
              <div className="relative mb-6">
                <AliceOrbVisualizer
                  size={96}
                  audioLevel={0}
                  status="idle"
                  isSpeaking={false}
                />
                {/* Centered icon on orb */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <MessageCircle size={32} className="text-white/60" strokeWidth={1.5} />
                </div>
              </div>

              <h3 className="relative font-display text-[28px] md:text-[32px] text-cream mb-4 leading-tight">
                Parla con Alice
              </h3>

              {/* AI badge */}
              <span className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal/10 border border-teal/15 mb-5">
                <span className="w-2 h-2 rounded-full bg-teal/60 animate-pulse" />
                <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-teal-light font-sans">
                  Assistente AI
                </span>
              </span>

              <p className="relative font-serif text-cream/75 text-[17px] leading-relaxed mb-10 max-w-sm">
                La mia assistente AI. Chiedile qualsiasi cosa su di me, i miei percorsi, la mia visione. Ti risponderà a voce.
              </p>

              <button
                onClick={() => { playSound('open'); openAlice() }}
                className="relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-teal to-teal-light text-white font-sans text-[15px] font-semibold shadow-lg shadow-teal/20 hover:shadow-xl hover:shadow-teal/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles size={20} strokeWidth={2} />
                <span>Inizia la conversazione</span>
              </button>

              {/* Matrix reference */}
              <p className="relative mt-10 font-serif italic text-[13px] text-cream/25">
                La pillola rossa. Il coniglio bianco.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
