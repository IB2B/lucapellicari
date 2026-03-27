'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { BookOpen, ArrowDown, Sparkles, Mic } from 'lucide-react'
import { useAliceContext } from './AliceProvider'
import { AliceOrbVisualizer } from './AliceOrbVisualizer'
import { playSound } from './AliceSounds'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}
const stagger = {
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.08 } },
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
    <section id="alice-section" ref={sectionRef} className="relative py-24 md:py-36 overflow-hidden">

      {/* ── Background ── */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(170deg,#0a1928 0%,#0e2235 50%,#0a1928 100%)' }} />

      {/* Subtle mesh grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(107,155,174,1) 1px,transparent 1px),linear-gradient(90deg,rgba(107,155,174,1) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

      {/* Wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to top,rgba(107,155,174,0.04),transparent)' }} />

      {/* Glow blob left */}
      <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(196,149,106,0.06) 0%,transparent 70%)', filter: 'blur(40px)' }} />

      {/* Glow blob right */}
      <div className="absolute -right-32 top-1/3 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(107,155,174,0.08) 0%,transparent 70%)', filter: 'blur(40px)' }} />

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right,transparent,rgba(107,155,174,0.2),transparent)' }} />
      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right,transparent,rgba(250,247,242,0.06),transparent)' }} />

      <div className="container-custom relative">

        {/* ── Section header ── */}
        <motion.div className="text-center mb-16 md:mb-24"
          initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={stagger}>
          <motion.span variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-[0.2em] mb-6"
            style={{ background: 'rgba(107,155,174,0.12)', border: '1px solid rgba(107,155,174,0.2)', color: '#8FB8C7' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#8FB8C7' }} />
            Scegli
          </motion.span>
          <motion.h2 variants={fadeUp}
            className="font-display text-title mb-5 leading-tight"
            style={{ color: 'rgba(250,247,242,0.95)' }}>
            Come vuoi conoscermi?
          </motion.h2>
          <motion.p variants={fadeUp}
            className="font-serif italic text-xl max-w-md mx-auto"
            style={{ color: 'rgba(250,247,242,0.38)' }}>
            Hai due strade davanti a te.
          </motion.p>
        </motion.div>

        {/* ── Two cards ── */}
        <motion.div className="grid lg:grid-cols-2 gap-5 md:gap-8 max-w-5xl mx-auto"
          initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={stagger}>

          {/* Card 1 — Explore site */}
          <motion.div className="group relative" variants={fadeUp}>
            <div className="relative rounded-3xl p-10 md:p-12 h-full flex flex-col items-center text-center transition-all duration-400 overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.97)',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.18)',
              }}>

              {/* Watermark */}
              <div className="absolute top-7 right-7 opacity-[0.05]">
                <BookOpen size={130} strokeWidth={0.6} className="text-navy" />
              </div>
              {/* Hover tint */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                style={{ background: 'linear-gradient(135deg,rgba(107,155,174,0.04),transparent)' }} />

              <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center mb-8"
                style={{ background: 'linear-gradient(135deg,rgba(107,155,174,0.15),rgba(107,155,174,0.06))', border: '1px solid rgba(107,155,174,0.14)' }}>
                <BookOpen className="text-teal" size={36} strokeWidth={1.5} />
              </div>

              <h3 className="font-display text-[28px] md:text-[32px] text-navy-dark mb-4 leading-tight">
                Esplora il sito
              </h3>

              <p className="font-serif text-navy/60 text-[17px] leading-relaxed mb-10 max-w-sm">
                Scorri, leggi, scopri. Ogni pagina racconta un frammento della mia storia, della mia visione, del mio metodo.
              </p>

              <button onClick={scrollToNext}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-sans text-[15px] font-semibold transition-all duration-200 group/btn"
                style={{ border: '2px solid rgba(44,67,86,0.12)', color: 'rgba(44,67,86,0.7)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(44,67,86,0.28)'; (e.currentTarget as HTMLElement).style.color = '#2C4356' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(44,67,86,0.12)'; (e.currentTarget as HTMLElement).style.color = 'rgba(44,67,86,0.7)' }}>
                <span>Continua a leggere</span>
                <ArrowDown size={18} className="transition-transform group-hover/btn:translate-y-0.5" strokeWidth={2} />
              </button>

              <p className="mt-10 font-serif italic text-[13px]" style={{ color: 'rgba(44,67,86,0.22)' }}>
                La pillola blu. Il sentiero sicuro.
              </p>
            </div>
          </motion.div>

          {/* Card 2 — Talk to Alice */}
          <motion.div className="group relative" variants={fadeUp}>
            {/* Outer glow */}
            <div className="absolute inset-[-1px] rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'linear-gradient(135deg,rgba(196,149,106,0.4),rgba(107,155,174,0.3))', filter: 'blur(1px)' }} />

            <div className="relative rounded-3xl p-10 md:p-12 h-full flex flex-col items-center text-center transition-all duration-400 overflow-hidden"
              style={{
                background: 'linear-gradient(145deg,#132233 0%,#0e1c2e 100%)',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
              }}>

              {/* Animated gradient sheen */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ background: 'linear-gradient(135deg,rgba(107,155,174,0.06),transparent 60%,rgba(196,149,106,0.06))' }} />
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'linear-gradient(135deg,rgba(107,155,174,0.10),transparent 60%,rgba(196,149,106,0.10))' }} />

              {/* Top accent line */}
              <div className="absolute top-0 left-12 right-12 h-px"
                style={{ background: 'linear-gradient(to right,transparent,rgba(107,155,174,0.35),transparent)' }} />

              {/* Watermark */}
              <div className="absolute top-6 right-6 opacity-[0.04]">
                <Mic size={130} strokeWidth={0.6} style={{ color: '#FAF7F2' }} />
              </div>

              {/* Orb */}
              <div className="relative mb-6">
                <AliceOrbVisualizer size={100} audioLevel={0} status="idle" isSpeaking={false} />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Mic size={32} strokeWidth={1.5} style={{ color: 'rgba(255,255,255,0.6)' }} />
                </div>
              </div>

              <h3 className="relative font-display text-[28px] md:text-[32px] mb-4 leading-tight"
                style={{ color: 'rgba(250,247,242,0.96)' }}>
                Parla con Alice
              </h3>

              {/* Badge */}
              <span className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
                style={{ background: 'rgba(107,155,174,0.12)', border: '1px solid rgba(107,155,174,0.18)' }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#6B9BAE' }} />
                <span className="text-[12px] font-bold uppercase tracking-[0.15em] font-sans" style={{ color: '#8FB8C7' }}>
                  Assistente AI
                </span>
              </span>

              <p className="relative font-serif text-[17px] leading-relaxed mb-10 max-w-sm"
                style={{ color: 'rgba(250,247,242,0.72)' }}>
                La mia assistente AI. Chiedile qualsiasi cosa su di me, i miei percorsi, la mia visione. Ti risponderà a voce.
              </p>

              <motion.button
                onClick={() => { playSound('open'); openAlice() }}
                className="relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-white font-sans text-[15px] font-semibold overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg,#6B9BAE,#8FB8C7)',
                  boxShadow: '0 8px 32px rgba(107,155,174,0.35)',
                }}
                whileHover={{ scale: 1.03, boxShadow: '0 14px 44px rgba(107,155,174,0.55)' }}
                whileTap={{ scale: 0.97 }}>
                <Sparkles size={20} strokeWidth={2} />
                <span>Inizia la conversazione</span>
              </motion.button>

              <p className="relative mt-10 font-serif italic text-[13px]" style={{ color: 'rgba(250,247,242,0.22)' }}>
                La pillola rossa. Il coniglio bianco.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
