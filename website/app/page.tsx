'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Hero } from '@/components/sections/Hero'
import { Quote } from '@/components/sections/Quote'
import { FadeIn } from '@/components/animations/FadeIn'
import { TextReveal } from '@/components/animations/TextReveal'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import {
  Eye,
  Target,
  Shield,
  Users,
  Sparkles,
  Compass,
  Heart,
  BookOpen,
  Pen,
  Mail,
  ArrowRight,
  Rocket,
  Brain,
  Star,
  Zap,
} from 'lucide-react'

// SEZIONE 2 - LA MIA MISSIONE - Items
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

// SEZIONE 7 - I MIEI LIBRI
const libri = [
  { title: 'In-Flow', image: '/images/book-inflow.jpg' },
  { title: 'Oltre la diagnosi', image: '/images/book-diagnosi.jpg' },
  { title: 'La Guida alla Metaquantistica', image: '/images/book-metaquantistica.jpg' },
]

export default function HomePage() {
  return (
    <>
      {/* HERO SECTION */}
      <Hero />

      {/* SEZIONE 1 - CHI SONO (anteprima) */}
      <section className="py-24 lg:py-32 bg-dark-surface">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <FadeIn direction="right">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="/images/luca-portrait.jpg"
                  alt="Luca Pellicari"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent" />
              </div>
            </FadeIn>

            {/* Content */}
            <div>
              <FadeIn>
                <span className="inline-block text-gold text-sm font-medium uppercase tracking-[0.3em] mb-6">
                  Chi Sono
                </span>
              </FadeIn>

              <TextReveal className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-light-surface mb-8 leading-tight">
                &ldquo;Io sono Luca Pellicari&rdquo;
              </TextReveal>

              <FadeIn delay={0.3}>
                <div className="space-y-6 text-light-surface/80 text-lg leading-relaxed">
                  <p>
                    Sono un uomo che non ha mai avuto paura di guardare la vita negli occhi.
                    Ho attraversato la malattia, la rinascita, la disciplina del paracadutismo,
                    i fallimenti, la rinascita professionale, gli incontri che cambiano un destino.
                  </p>
                  <p>
                    E ho trasformato tutto in un metodo: <strong className="text-gold">In-Flow</strong>.
                  </p>
                  <p className="text-xl font-serif italic text-light-surface">
                    Il mio talento non è motivarti.<br />
                    Il mio talento è <span className="text-gold">aiutarti a ricordare chi sei</span>.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.5} className="mt-10">
                <Button href="/chi-sono" size="lg" arrow>
                  Scopri la mia storia
                </Button>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* SEZIONE 2 - LA MIA MISSIONE */}
      <section className="py-24 lg:py-32 bg-dark">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <FadeIn>
              <span className="inline-block text-gold text-sm font-medium uppercase tracking-[0.3em] mb-6">
                La Mia Missione
              </span>
            </FadeIn>

            <TextReveal className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-light-surface mb-8">
              Trasformo le persone aiutandole a riconoscersi.
            </TextReveal>

            <FadeIn delay={0.3}>
              <p className="text-xl text-light-surface/80 leading-relaxed">
                Il mio lavoro è semplice: <span className="text-gold">ti porto dentro te stesso</span>.
                Lo faccio con delicatezza, con forza, con consapevolezza e con verità.
              </p>
            </FadeIn>
          </div>

          {/* Mission Items Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {missionItems.map((item, index) => (
              <FadeIn key={item.label} delay={0.1 * index}>
                <motion.div
                  className="bg-dark-surface rounded-xl p-6 text-center border border-dark-lighter hover:border-gold/30 transition-all"
                  whileHover={{ y: -4 }}
                >
                  <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon size={24} className="text-gold" />
                  </div>
                  <p className="text-light-surface font-medium">{item.label}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.5} className="text-center mt-12">
            <Button href="/missione" variant="secondary" size="lg" arrow>
              Scopri la mia missione
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* SEZIONE 3 - QUANTUM ACADEMY */}
      <section className="py-24 lg:py-32 bg-dark-surface relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeIn>
                <span className="inline-block text-gold text-sm font-medium uppercase tracking-[0.3em] mb-6">
                  Quantum Academy
                </span>
              </FadeIn>

              <TextReveal className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-light-surface mb-6">
                Il sogno che non sapevo di sognare, diventato realtà.
              </TextReveal>

              <FadeIn delay={0.3}>
                <div className="space-y-4 text-light-surface/80 text-lg leading-relaxed mb-8">
                  <p>
                    <strong className="text-gold">Quantum Academy non è una scuola.</strong>
                  </p>
                  <p>È un luogo di trasformazione. È un portale. È un laboratorio di identità.</p>
                  <p>
                    È nata da tre anime in risonanza: <strong className="text-light-surface">io, Lucia e Alberto</strong>.
                  </p>
                  <p>
                    E oggi sta diventando una nuova forma di conoscenza:
                    <span className="text-gold"> pratica, profonda, scientifica, spirituale</span>.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.5}>
                <Button href="/quantum-academy" size="lg" arrow>
                  Entra in Quantum Academy
                </Button>
              </FadeIn>
            </div>

            <FadeIn direction="left">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/quantum-academy.jpg"
                  alt="Quantum Academy"
                  fill
                  className="object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SEZIONE 4 - ALPHAKOM */}
      <section className="py-24 lg:py-32 bg-dark">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <span className="inline-block text-gold text-sm font-medium uppercase tracking-[0.3em] mb-6">
                Alphakom
              </span>
            </FadeIn>

            <TextReveal className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-light-surface mb-8">
              La Scuola degli Alpha Leaders.
            </TextReveal>

            <FadeIn delay={0.3}>
              <div className="space-y-4 text-xl text-light-surface/80 leading-relaxed mb-12">
                <p>Qui impari a <strong className="text-gold">guidare</strong>, non a seguire.</p>
                <p>A <strong className="text-gold">vedere</strong>, non a reagire.</p>
                <p>A <strong className="text-gold">influenzare</strong> in modo consapevole.</p>
                <p>A <strong className="text-gold">creare ricchezza</strong> — economica, relazionale, spirituale.</p>
                <p>A entrare nel tuo stato naturale: <strong className="text-gold">In-Flow</strong>.</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <Button href="/alphakom" size="lg" arrow>
                Scopri Alphakom
              </Button>
            </FadeIn>
          </div>
        </div>
      </section>

      <Quote
        text="Non sei quello che ti è successo. Sei quello che scegli di diventare."
        author="Luca Pellicari"
      />

      {/* SEZIONE 5 - COSA POSSIAMO FARE INSIEME */}
      <section className="py-24 lg:py-32 bg-light section-light">
        <div className="container-custom">
          <SectionHeading
            subtitle="Cosa Possiamo Fare Insieme"
            title="Percorsi, seminari, corsi, eventi."
            light
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {percorsiItems.map((item, index) => (
              <FadeIn key={item} delay={0.1 * index}>
                <div className="flex items-center gap-4 bg-white rounded-lg p-6 border border-light-darker hover:border-gold/50 hover:shadow-lg transition-all">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <ArrowRight size={18} className="text-gold" />
                  </div>
                  <span className="text-dark font-medium">{item}</span>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center">
            <Button href="/contatti" size="lg" arrow>
              I miei percorsi
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* SEZIONE 6 - IL MIO METODO: IN-FLOW */}
      <section className="py-24 lg:py-32 bg-dark">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <span className="inline-block text-gold text-sm font-medium uppercase tracking-[0.3em] mb-6">
                Il Mio Metodo
              </span>
            </FadeIn>

            <TextReveal className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-light-surface mb-4">
              In-Flow
            </TextReveal>

            <FadeIn delay={0.3}>
              <p className="text-2xl text-gold font-serif italic mb-8">
                La scienza dell'identità, la bellezza della verità.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="space-y-4 text-lg text-light-surface/80 leading-relaxed mb-12">
                <p>
                  Ogni persona può entrare nel suo <strong className="text-gold">stato naturale</strong>:
                  un equilibrio tra chi sei e ciò che fai, tra la tua storia e il tuo futuro,
                  tra il tuo cuore e la tua visione.
                </p>
                <p>
                  Il metodo In-Flow è il risultato di una vita intera.
                  E ora è anche <strong className="text-light-surface">un libro, un corso, un percorso</strong>.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <Button href="/metodo-in-flow" size="lg" arrow>
                Scopri In-Flow
              </Button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SEZIONE 7 - I MIEI LIBRI */}
      <section className="py-24 lg:py-32 bg-dark-surface">
        <div className="container-custom">
          <div className="text-center mb-16">
            <FadeIn>
              <span className="inline-block text-gold text-sm font-medium uppercase tracking-[0.3em] mb-6">
                I Miei Libri
              </span>
            </FadeIn>

            <TextReveal className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-light-surface mb-4">
              Storie vere, identità vere.
            </TextReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {libri.map((libro, index) => (
              <FadeIn key={libro.title} delay={0.15 * index}>
                <motion.div
                  className="group relative bg-dark rounded-xl overflow-hidden"
                  whileHover={{ y: -8 }}
                >
                  <div className="aspect-[3/4] relative">
                    <Image
                      src={libro.image}
                      alt={libro.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-serif text-xl text-light-surface font-semibold">
                      {libro.title}
                    </h3>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center">
            <p className="text-light-surface/60 mb-6">Altri progetti in arrivo...</p>
            <Button href="/libri" variant="secondary" size="lg" arrow>
              Leggi i miei libri
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* SEZIONE 8 - BLOG */}
      <section className="py-24 lg:py-32 bg-dark">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-8">
                <Pen size={32} className="text-gold" />
              </div>
            </FadeIn>

            <FadeIn>
              <span className="inline-block text-gold text-sm font-medium uppercase tracking-[0.3em] mb-6">
                Blog
              </span>
            </FadeIn>

            <TextReveal className="font-serif text-3xl md:text-4xl font-bold text-light-surface mb-6">
              Pensieri liberi. Verità condivise. Identità che si aprono.
            </TextReveal>

            <FadeIn delay={0.3}>
              <p className="text-lg text-light-surface/80 leading-relaxed mb-10">
                Scrivo per raccontare, per comprendere e per far vibrare qualcosa dentro chi legge.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <Button href="/blog" size="lg" arrow>
                Leggi gli articoli
              </Button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SEZIONE FINALE - CONTATTI */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-dark-surface to-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-8">
                <Mail size={36} className="text-gold" />
              </div>
            </FadeIn>

            <FadeIn>
              <span className="inline-block text-gold text-sm font-medium uppercase tracking-[0.3em] mb-6">
                Contatti
              </span>
            </FadeIn>

            <TextReveal className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-light-surface mb-8">
              Vuoi lavorare con me?
            </TextReveal>

            <FadeIn delay={0.3}>
              <div className="space-y-2 text-xl text-light-surface/80 mb-12">
                <p>Vuoi portarmi nella tua azienda?</p>
                <p>Vuoi iniziare il tuo percorso identitario?</p>
                <p className="text-2xl font-serif text-light-surface mt-6">
                  Scrivimi. <span className="text-gold">Sono qui.</span>
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <Button href="/contatti" size="lg" arrow>
                Contattami
              </Button>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
