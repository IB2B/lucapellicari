'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, BookOpen, GraduationCap, Route } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

export function InFlowSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white via-teal-50/30 to-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger}
          className="text-center mb-10 md:mb-16"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-3 mb-3 md:mb-6">
            <span className="w-10 h-px bg-teal/50" />
            <span className="px-4 py-1.5 bg-teal/10 rounded-full text-teal text-xs uppercase tracking-[0.2em] font-medium">
              Il Mio Metodo
            </span>
            <span className="w-10 h-px bg-teal/50" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-display text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-navy via-teal to-navy mb-2 md:mb-4"
          >
            In-Flow
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="font-serif text-lg md:text-2xl text-navy/70 italic max-w-xl mx-auto"
          >
            La scienza dell&apos;identità, la bellezza della verità.
          </motion.p>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger}
          className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start"
        >

          {/* Left - Text Content */}
          <div>
            <motion.p variants={fadeUp} className="text-navy/60 text-lg mb-8">
              Ogni persona può entrare nel suo{' '}
              <span className="text-teal font-semibold">stato naturale</span>:
            </motion.p>

            <motion.div variants={stagger} className="space-y-5 mb-10">
              <motion.div variants={fadeUp} className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                <span className="w-2 h-2 rounded-full bg-teal mt-2 flex-shrink-0" />
                <p className="text-navy text-lg">
                  un equilibrio tra <span className="font-semibold">chi sei</span> e <span className="font-semibold">ciò che fai</span>
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                <span className="w-2 h-2 rounded-full bg-coral mt-2 flex-shrink-0" />
                <p className="text-navy text-lg">
                  tra la tua <span className="font-semibold">storia</span> e il tuo <span className="font-semibold">futuro</span>
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                <span className="w-2 h-2 rounded-full bg-teal mt-2 flex-shrink-0" />
                <p className="text-navy text-lg">
                  tra il tuo <span className="font-semibold">cuore</span> e la tua <span className="font-semibold">visione</span>
                </p>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeUp} className="pl-5 border-l-2 border-teal/40">
              <p className="text-navy/80 text-lg">
                Il metodo In-Flow è il risultato di{' '}
                <span className="text-teal font-semibold">una vita intera</span>.
              </p>
            </motion.div>
          </div>

          {/* Right - Cards (hidden on mobile) */}
          <motion.div variants={stagger} className="hidden lg:block space-y-4">
            <motion.div variants={fadeUp}>
              <Link
                href="/libri"
                className="group flex items-center gap-5 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-teal/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-navy/5 flex items-center justify-center group-hover:bg-navy group-hover:scale-105 transition-all duration-300">
                  <BookOpen className="w-7 h-7 text-navy group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-display text-navy mb-1">Un libro</h4>
                  <p className="text-navy/70 text-sm">Scopri di più →</p>
                </div>
              </Link>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Link
                href="/quantum-academy"
                className="group flex items-center gap-5 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-coral/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-coral/10 flex items-center justify-center group-hover:bg-coral group-hover:scale-105 transition-all duration-300">
                  <GraduationCap className="w-7 h-7 text-coral group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-display text-navy mb-1">Un corso</h4>
                  <p className="text-navy/70 text-sm">Scopri di più →</p>
                </div>
              </Link>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Link
                href="/contatti"
                className="group flex items-center gap-5 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-teal/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-teal/10 flex items-center justify-center group-hover:bg-teal group-hover:scale-105 transition-all duration-300">
                  <Route className="w-7 h-7 text-teal group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-display text-navy mb-1">Un percorso</h4>
                  <p className="text-navy/70 text-sm">Scopri di più →</p>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            href="/metodo-in-flow"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-teal to-teal-dark text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg shadow-teal/25 hover:shadow-xl hover:shadow-teal/35 hover:scale-[1.02] transition-all duration-300"
          >
            <span>Scopri In-Flow</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
