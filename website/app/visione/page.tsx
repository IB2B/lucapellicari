'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { TextReveal } from '@/components/animations/TextReveal'
import { FadeIn } from '@/components/animations/FadeIn'
import { CTA } from '@/components/sections/CTA'
import { Quote } from '@/components/sections/Quote'
import { Eye, Gem, Heart, Lightbulb } from 'lucide-react'

const visionPillars = [
  {
    icon: Gem,
    title: 'Ricchezza Condivisa',
    description:
      'Ricchezza fatta di identità, dignità, valori, bellezza, riconoscimento e amore. Non come accumulo, ma come energia che scorre da chi è consapevole verso chi vuole diventarlo.',
  },
  {
    icon: Lightbulb,
    title: 'Consapevolezza Accessibile',
    description:
      'Un mondo in cui la consapevolezza non è un lusso, ma un diritto. In cui il successo non è una corsa solitaria, ma un viaggio condiviso.',
  },
  {
    icon: Heart,
    title: 'Identità come Conquista',
    description:
      'Un futuro in cui l\'identità non è un mistero, ma una conquista. Dove le persone imparano a guardarsi dentro senza paura.',
  },
]

export default function VisionePage() {
  const parallaxRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-teal/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-coral/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <motion.div
                className="inline-flex items-center gap-2 bg-teal/10 border border-teal/30 rounded-full px-6 py-2 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Eye size={18} className="text-teal" />
                <span className="text-teal text-sm font-medium">
                  La Mia Visione
                </span>
              </motion.div>

              <motion.h1
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-8 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Perché esisto.{' '}
                <span className="bg-gradient-to-r from-teal via-teal-light to-teal-dark bg-clip-text text-transparent">
                  Perché sono qui. Perché faccio tutto questo.
                </span>
              </motion.h1>

              <motion.p
                className="text-xl text-navy/80 leading-relaxed mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Ho una sola visione, ed è limpida come l'aria sottile che respiri
                quando ti lanci da un aereo e capisci che l'unica direzione possibile
                è quella della tua verità.
              </motion.p>

              <motion.p
                className="text-lg text-navy/70 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Io non insegno come vivere.
                Io mostro come ho scelto di vivere io. E da lì, chi risuona… parte.
              </motion.p>
            </div>

            {/* Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src="/images/luca-portrait.jpg"
                  alt="Luca Pellicari - La mia visione"
                  fill
                  className="object-cover"
                  priority
                  quality={75}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
              </div>

              {/* Quote card */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-gradient-to-br from-teal to-teal-dark text-white p-6 rounded-2xl max-w-xs shadow-2xl"
                initial={{ opacity: 0, x: -20, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="w-8 h-1 bg-white/50 rounded mb-4" />
                <p className="font-serif text-lg italic leading-relaxed">
                  "Costruire una grande scuola di consapevolezza."
                </p>
                <p className="text-white/70 mt-3 text-sm font-medium">— Il mio sogno</p>
              </motion.div>

              {/* Decorative corner */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-teal/30 rounded-tr-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Vision - Full width with parallax image */}
      <section ref={parallaxRef} className="relative py-32 lg:py-44 bg-navy-dark overflow-hidden">
        {/* Parallax background image */}
        <motion.div
          className="absolute inset-0"
          style={{ y: imageY }}
        >
          <Image
            src="/images/video-3.jpg"
            alt="Luca Pellicari sul palco"
            fill
            className="object-cover object-top"
            quality={60}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy-dark/85" />
        </motion.div>

        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-coral/5 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <div className="space-y-8 text-light-surface/80 text-xl leading-relaxed">
                <p className="text-2xl lg:text-3xl font-serif text-white/90 leading-relaxed">
                  La mia visione è <strong className="text-gold">trasformare vite</strong>,
                  non con la teoria, ma con la sostanza profonda di ciò che ho vissuto
                  sulla mia pelle, nelle mie rinascite, nei miei errori, nelle mie vittorie
                  e in tutte le volte in cui ho guardato l'abisso dicendo: «Non oggi.»
                </p>
                <p>
                  Io voglio costruire una <strong className="text-gold">grande scuola di consapevolezza</strong>,
                  un luogo che non assomigli a nulla di quello che hai già visto.
                  Una scuola che parla alla mente degli imprenditori… per poi aprirgli il cuore.
                </p>
                <p>
                  Una scuola dove chi entra lo fa per imparare a negoziare, comunicare, guidare…
                  e finisce per imparare a <strong className="text-gold">vivere</strong>.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <Quote
        text="Vedo un futuro in cui migliaia di persone entrano nei nostri percorsi pensando di imparare una tecnica… e invece imparano sé stesse."
        author="Luca Pellicari"
      />

      {/* Vision Pillars */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <FadeIn>
              <span className="inline-block text-teal text-sm font-medium uppercase tracking-[0.3em] mb-4">
                I Pilastri
              </span>
            </FadeIn>
            <TextReveal className="font-serif text-4xl md:text-5xl font-bold text-navy">
              Questa visione ha un nome
            </TextReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {visionPillars.map((pillar, index) => {
              const IconComponent = pillar.icon
              return (
                <motion.div
                  key={pillar.title}
                  className="relative group"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-teal/20 to-coral/20 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
                  <div className="relative bg-cream rounded-xl p-8 border border-cream-dark h-full hover:border-teal/30 transition-all duration-500">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-teal/10 flex items-center justify-center mb-6 group-hover:bg-teal/20 transition-colors duration-500">
                      <IconComponent size={28} className="text-teal" />
                    </div>

                    <span className="text-teal font-serif text-6xl font-bold opacity-10 absolute top-6 right-8">
                      0{index + 1}
                    </span>

                    <h3 className="font-serif text-2xl text-navy font-bold mt-4 mb-4">
                      {pillar.title}
                    </h3>
                    <p className="text-navy/70 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Final Statement - Full width cinematic */}
      <section className="py-24 lg:py-32 bg-navy-dark relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-teal/5 to-transparent rounded-full" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Large decorative quote marks */}
              <span className="font-serif text-8xl text-teal/20 leading-none block mb-4">&ldquo;</span>

              <p className="font-serif text-3xl md:text-4xl text-light-surface leading-relaxed italic -mt-12">
                Io esisto per accendere questa scintilla. Per accompagnare
                chi sente che sta per iniziare il proprio salto quantico.
                Per dare al mondo quella scuola che io avrei voluto incontrare
                trent'anni fa.
              </p>

              <span className="font-serif text-8xl text-teal/20 leading-none block mt-4">&rdquo;</span>
            </motion.div>

            <FadeIn delay={0.3}>
              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="w-12 h-px bg-gold/50" />
                <p className="text-gold font-medium text-lg">
                  E fino all'ultimo respiro, questa visione sarà la mia strada.
                </p>
                <div className="w-12 h-px bg-gold/50" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
