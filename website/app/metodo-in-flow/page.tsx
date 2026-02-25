'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { TextReveal } from '@/components/animations/TextReveal'
import { FadeIn } from '@/components/animations/FadeIn'
import { Button } from '@/components/ui/Button'
import { CTA } from '@/components/sections/CTA'
import { Quote } from '@/components/sections/Quote'
import {
  Compass,
  Eye,
  Shield,
  ArrowRight,
  Zap,
  Heart,
  Star,
  Sparkles,
  Target,
  Flame,
  Infinity,
} from 'lucide-react'

const pillars = [
  {
    icon: Compass,
    title: 'Identità',
    subtitle: 'Chi sei davvero',
    description:
      'Il primo passo è guardarsi dentro senza filtri. Scoprire i tuoi valori, la tua essenza, ciò che resta quando la vita ti toglie tutto. L\'identità non è un concetto: è il terreno su cui costruisci ogni cosa.',
    accent: 'from-teal to-teal-dark',
  },
  {
    icon: Eye,
    title: 'Visione',
    subtitle: 'Dove vuoi arrivare',
    description:
      'La visione è la stella polare della tua vita. Non è un obiettivo: è una direzione. È la risposta alla domanda più importante: "Per cosa esisto?" Senza visione, ogni strada è quella sbagliata.',
    accent: 'from-gold to-coral',
  },
  {
    icon: Shield,
    title: 'Verità',
    subtitle: 'La coerenza totale',
    description:
      'La verità non si racconta: si è. È la coerenza tra ciò che senti, dici e fai. Quando identità e visione si allineano nella verità, nasce il flow — il tuo stato naturale di eccellenza.',
    accent: 'from-coral to-gold',
  },
]

const journey = [
  {
    step: '01',
    title: 'Risveglio',
    description: 'Prendi coscienza di chi sei veramente, al di là delle maschere e delle aspettative.',
    icon: Sparkles,
  },
  {
    step: '02',
    title: 'Allineamento',
    description: 'Allinea i tuoi valori con le tue azioni. Elimina ciò che non ti appartiene.',
    icon: Target,
  },
  {
    step: '03',
    title: 'Trasformazione',
    description: 'Entra nel tuo stato di flow. Vivi, lavora e ama dalla tua essenza più profonda.',
    icon: Flame,
  },
  {
    step: '04',
    title: 'Espansione',
    description: 'Il flow diventa il tuo stato naturale. Ogni giorno è un\'espressione autentica di te.',
    icon: Infinity,
  },
]

const benefits = [
  { icon: Zap, title: 'Pace interiore', description: 'Liberati dal rumore mentale e trova la tua quiete profonda.' },
  { icon: Star, title: 'Successo autentico', description: 'Raggiungi risultati allineati con chi sei veramente.' },
  { icon: Heart, title: 'Amore consapevole', description: 'Relazioni più profonde, vere e significative.' },
  { icon: Compass, title: 'Libertà di essere', description: 'Vivi secondo i tuoi valori, non le aspettative altrui.' },
]

export default function MetodoInFlowPage() {
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
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="inline-flex items-center gap-2 bg-teal/10 border border-teal/30 rounded-full px-6 py-2 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles size={18} className="text-teal" />
              <span className="text-teal text-sm font-medium">
                Il Mio Metodo
              </span>
            </motion.div>

            <TextReveal className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-navy mb-8">
              In-Flow
            </TextReveal>

            <FadeIn delay={0.4}>
              <p className="text-2xl md:text-3xl font-serif italic mb-8">
                <span className="bg-gradient-to-r from-teal via-teal-light to-teal-dark bg-clip-text text-transparent">
                  La scienza dell'identità, la bellezza della verità
                </span>
              </p>
            </FadeIn>

            <FadeIn delay={0.5}>
              <p className="text-xl text-navy/80 leading-relaxed mb-6">
                Tutta la mia vita converge in un'unica formula:
              </p>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="flex items-center justify-center gap-3 md:gap-5 flex-wrap mb-12">
                <span className="font-serif text-2xl md:text-3xl font-bold text-navy">Identità</span>
                <span className="text-teal text-2xl font-light">+</span>
                <span className="font-serif text-2xl md:text-3xl font-bold text-navy">Visione</span>
                <span className="text-teal text-2xl font-light">+</span>
                <span className="font-serif text-2xl md:text-3xl font-bold text-navy">Verità</span>
                <ArrowRight className="text-teal mx-2" size={24} />
                <span className="font-serif text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal to-coral bg-clip-text text-transparent">
                  FLOW
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.7}>
              <Button href="/contatti" size="lg" arrow>
                Inizia il tuo percorso
              </Button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-navy-dark via-navy to-navy-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-40 left-10 w-80 h-80 bg-teal/5 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-10 w-96 h-96 bg-coral/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-teal/3 to-transparent rounded-full" />
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <motion.span
              className="inline-block text-teal text-sm font-medium uppercase tracking-[0.3em] mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Le Tre Colonne
            </motion.span>
            <motion.h2
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Identità. Visione.{' '}
              <span className="bg-gradient-to-r from-teal via-teal-light to-coral bg-clip-text text-transparent">
                Verità.
              </span>
            </motion.h2>
            <motion.p
              className="text-white/70 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Tre elementi fondamentali che, quando allineati, generano il tuo stato naturale di eccellenza.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                className="group h-full"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
              >
                <div className="relative h-full bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-teal/30 transition-all duration-500 overflow-hidden hover:bg-white/[0.08]">
                  <div className="absolute -inset-1 bg-gradient-to-r from-teal/20 via-coral/10 to-teal/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${pillar.accent} flex items-center justify-center mb-6 shadow-lg`}>
                      <pillar.icon size={32} className="text-white" />
                    </div>

                    <span className="text-teal text-sm font-medium uppercase tracking-wider">
                      {pillar.subtitle}
                    </span>

                    <h3 className="font-serif text-3xl text-white font-bold mt-2 mb-4 group-hover:text-teal-light transition-colors duration-300">
                      {pillar.title}
                    </h3>

                    <p className="text-white/70 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-teal/20 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-coral/20 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Flow Formula */}
          <motion.div
            className="text-center mt-16 pt-12 border-t border-white/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <span className="font-serif text-2xl text-gold">Identità</span>
              <span className="text-white/30 text-2xl">+</span>
              <span className="font-serif text-2xl text-gold">Visione</span>
              <span className="text-white/30 text-2xl">+</span>
              <span className="font-serif text-2xl text-gold">Verità</span>
              <ArrowRight className="text-white/30 mx-2" size={24} />
              <span className="font-serif text-3xl font-bold bg-gradient-to-r from-gold to-coral bg-clip-text text-transparent">
                FLOW
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <Quote
        text="Ogni persona può entrare nel suo stato naturale: un equilibrio tra chi sei e ciò che fai, tra la tua storia e il tuo futuro, tra il tuo cuore e la tua visione."
        author="Luca Pellicari"
      />

      {/* Journey / Steps - Full width cinematic with parallax */}
      <section ref={parallaxRef} className="relative py-32 lg:py-44 bg-navy-dark overflow-hidden">
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

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-coral/5 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-20">
            <motion.span
              className="inline-block text-gold text-sm font-medium uppercase tracking-[0.3em] mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Il Percorso
            </motion.span>
            <motion.h2
              className="font-serif text-4xl md:text-5xl font-bold text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Come si entra{' '}
              <span className="bg-gradient-to-r from-gold to-coral bg-clip-text text-transparent">
                nel flow
              </span>
            </motion.h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {journey.map((step, index) => (
                <motion.div
                  key={step.step}
                  className="group relative"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.12,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                >
                  <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-gold/30 transition-all duration-500 overflow-hidden hover:bg-white/[0.08]">
                    <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-coral/10 to-gold/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="relative z-10 flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold/20 to-coral/10 border-2 border-gold/30 flex items-center justify-center group-hover:border-gold group-hover:from-gold group-hover:to-coral transition-all duration-500">
                          <step.icon size={24} className="text-gold group-hover:text-white transition-colors duration-500" />
                        </div>
                      </div>

                      <div>
                        <span className="text-gold/50 font-serif text-sm font-bold tracking-wider">
                          PASSO {step.step}
                        </span>
                        <h3 className="font-serif text-2xl text-white font-bold mt-1 mb-3 group-hover:text-gold transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="text-white/70 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gold/10 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 bg-teal/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-coral/5 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <motion.span
              className="inline-block text-teal text-sm font-medium uppercase tracking-[0.3em] mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Il Flow Genera
            </motion.span>
            <motion.h2
              className="font-serif text-4xl md:text-5xl font-bold text-navy mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Cosa ottieni quando{' '}
              <span className="bg-gradient-to-r from-teal to-coral bg-clip-text text-transparent">
                entri in flow
              </span>
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="group h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
              >
                <div className="relative h-full bg-white rounded-2xl p-8 border border-gray-100 hover:border-teal/30 hover:shadow-xl transition-all duration-500 overflow-hidden text-center">
                  <div className="absolute -inset-px bg-gradient-to-r from-teal/20 to-coral/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-teal/10 to-coral/10 flex items-center justify-center mx-auto mb-6 group-hover:from-teal group-hover:to-teal-dark transition-all duration-500">
                      <benefit.icon size={32} className="text-teal group-hover:text-white transition-colors duration-500" />
                    </div>
                    <h3 className="font-serif text-xl text-navy font-semibold mb-3 group-hover:text-teal transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-navy/70 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>

                  <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-teal/5 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Section - Cinematic close */}
      <section className="py-24 lg:py-32 bg-navy-dark relative overflow-hidden">
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
              <span className="font-serif text-8xl text-teal/20 leading-none block mb-4">&ldquo;</span>

              <p className="font-serif text-3xl md:text-4xl text-white leading-relaxed italic -mt-12">
                Il metodo In-Flow è il risultato di una vita intera.
                Ed è anche un libro, un corso, un percorso.
                Scopri come entrare nel tuo stato naturale di eccellenza
                e trasformare la tua vita.
              </p>

              <span className="font-serif text-8xl text-teal/20 leading-none block mt-4">&rdquo;</span>
            </motion.div>

            <FadeIn delay={0.3}>
              <div className="mt-8 flex items-center justify-center gap-4 mb-12">
                <div className="w-12 h-px bg-gold/50" />
                <p className="text-gold font-medium text-lg">Luca Pellicari</p>
                <div className="w-12 h-px bg-gold/50" />
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <Button href="/libri" size="lg" arrow>
                Scopri il libro
              </Button>
            </FadeIn>
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
