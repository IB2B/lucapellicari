import { Metadata } from 'next'
import Link from 'next/link'
import { TextReveal } from '@/components/animations/TextReveal'
import { FadeIn } from '@/components/animations/FadeIn'
import { CTA } from '@/components/sections/CTA'
import { Quote } from '@/components/sections/Quote'
import {
  Handshake,
  Heart,
  Shield,
  Target,
  Compass,
  Users,
  ArrowRight,
  Zap,
  Crown,
  Sparkles,
  Scale,
  MessageCircle,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'NegoziAzione Quantistica — Negoziare con Identit\u00e0',
  description:
    'La NegoziAzione Quantistica di Luca Pellicari: negoziare non \u00e8 una tecnica, \u00e8 un atto d\u2019amore verso s\u00e9 stessi e verso gli altri. Si vince insieme, sempre.',
}

const pillars = [
  {
    icon: Heart,
    title: 'Identit\u00e0',
    subtitle: 'Chi sei al tavolo',
    description:
      'La negoziazione inizia prima di sedersi al tavolo. Inizia da chi sei. La tua identit\u00e0 \u00e8 il tuo asset pi\u00f9 potente: quando sei autentico, la fiducia nasce spontaneamente.',
    accent: 'from-coral to-coral-dark',
  },
  {
    icon: Scale,
    title: 'Equilibrio',
    subtitle: 'Vincere insieme',
    description:
      'La negoziazione non \u00e8 un campo di battaglia. \u00c8 un terreno di incontro. Si vince insieme, sempre. Mai uno contro l\u2019altro. L\u2019equilibrio genera accordi che durano.',
    accent: 'from-teal to-teal-dark',
  },
  {
    icon: Sparkles,
    title: 'Frequenza',
    subtitle: 'Il campo quantico',
    description:
      'Quando entri in negoziazione dalla tua frequenza pi\u00f9 alta, crei un campo che influenza l\u2019intero processo. Non \u00e8 manipolazione: \u00e8 presenza consapevole.',
    accent: 'from-gold to-coral',
  },
]

const principles = [
  {
    icon: Shield,
    title: 'Coerenza',
    description: 'La coerenza tra ci\u00f2 che senti, dici e fai \u00e8 la base di ogni negoziazione riuscita. Le persone sentono l\u2019autenticit\u00e0.',
  },
  {
    icon: MessageCircle,
    title: 'Ascolto Profondo',
    description: 'Ascoltare non \u00e8 aspettare il proprio turno per parlare. \u00c8 entrare nel mondo dell\u2019altro con rispetto e curiosit\u00e0 autentica.',
  },
  {
    icon: Target,
    title: 'Intenzione Chiara',
    description: 'Sapere cosa vuoi \u00e8 importante. Sapere perch\u00e9 lo vuoi \u00e8 fondamentale. L\u2019intenzione chiara genera azioni precise.',
  },
  {
    icon: Users,
    title: 'Relazione Prima del Risultato',
    description: 'Il risultato \u00e8 una conseguenza della relazione. Cura la relazione e il risultato arriver\u00e0, coerente e duraturo.',
  },
  {
    icon: Zap,
    title: 'Presenza Energetica',
    description: 'La tua energia parla prima delle tue parole. Quando sei centrato e presente, l\u2019ambiente si trasforma.',
  },
  {
    icon: Crown,
    title: 'Leadership nella Trattativa',
    description: 'Guidare una negoziazione non significa dominarla. Significa creare le condizioni perch\u00e9 tutti vincano.',
  },
]

const differences = [
  {
    traditional: 'Tecniche di persuasione',
    quantum: 'Autenticit\u00e0 e presenza',
  },
  {
    traditional: 'Vincere sull\u2019altro',
    quantum: 'Vincere con l\u2019altro',
  },
  {
    traditional: 'Manipolazione',
    quantum: 'Trasparenza radicale',
  },
  {
    traditional: 'Forzare l\u2019accordo',
    quantum: 'Creare il campo per l\u2019accordo',
  },
  {
    traditional: 'Focus sul risultato',
    quantum: 'Focus sulla relazione',
  },
]

export default function NegoziazionePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pb-20 lg:pt-40 lg:pb-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <FadeIn>
              <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/30 rounded-full px-5 py-2 mb-6 md:mb-8">
                <Handshake size={18} className="text-teal" />
                <span className="text-teal text-sm font-medium">
                  Il Metodo Relazionale
                </span>
              </div>
            </FadeIn>

            <TextReveal className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-navy mb-6 md:mb-8 leading-tight">
              NegoziAzione Quantistica
            </TextReveal>

            <FadeIn delay={0.3}>
              <p className="text-lg md:text-2xl text-teal font-serif italic mb-6 md:mb-8">
                &ldquo;La negoziazione non &egrave; una tecnica: &egrave; un atto d&apos;amore
                verso s&eacute; stessi e verso gli altri.&rdquo;
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="text-base md:text-xl text-navy/80 leading-relaxed mb-6 md:mb-8">
                La NegoziAzione Quantistica ribalta ogni paradigma tradizionale.
                Non insegna a <em>vincere sugli altri</em>: insegna a{' '}
                <strong className="text-teal">vincere con gli altri</strong>.
                Perch&eacute; quando il campo relazionale &egrave; in equilibrio,
                l&apos;accordo non &egrave; un compromesso &mdash; &egrave; un&apos;evoluzione.
              </p>
            </FadeIn>

            <FadeIn delay={0.5}>
              <Link
                href="/contatti"
                className="group inline-flex items-center gap-3 bg-teal text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-medium shadow-lg shadow-teal/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Scopri il percorso</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-navy-dark via-navy to-navy-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-40 left-10 w-80 h-80 bg-teal/5 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-10 w-96 h-96 bg-coral/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-teal/3 to-transparent rounded-full" />
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <FadeIn>
              <span className="inline-block text-teal text-sm font-medium uppercase tracking-[0.3em] mb-4">
                Le Tre Colonne
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                I fondamenti della{' '}
                <span className="bg-gradient-to-r from-teal via-teal-light to-gold bg-clip-text text-transparent">
                  NegoziAzione
                </span>
              </h2>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {pillars.map((pillar, index) => (
              <FadeIn key={pillar.title} delay={index * 0.15}>
                <div className="group h-full">
                  <div className="relative h-full bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:border-teal/30 transition-all duration-500 overflow-hidden hover:bg-white/[0.08]">
                    <div className="absolute -inset-1 bg-gradient-to-r from-teal/20 via-gold/10 to-teal/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="relative z-10">
                      <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${pillar.accent} flex items-center justify-center mb-5 md:mb-6 shadow-lg`}>
                        <pillar.icon size={28} className="text-white md:w-8 md:h-8" />
                      </div>

                      <span className="text-teal text-sm font-medium uppercase tracking-wider">
                        {pillar.subtitle}
                      </span>

                      <h3 className="font-serif text-2xl md:text-3xl text-white font-bold mt-2 mb-4 group-hover:text-teal-light transition-colors duration-300">
                        {pillar.title}
                      </h3>

                      <p className="text-white/70 text-sm md:text-base leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>

                    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-teal/20 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-gold/20 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Traditional vs Quantum */}
      <section className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <FadeIn>
                <span className="inline-block text-gold text-sm font-medium uppercase tracking-[0.3em] mb-4">
                  Un Paradigma Diverso
                </span>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4 md:mb-6">
                  Negoziazione Tradizionale vs{' '}
                  <span className="text-teal">Quantistica</span>
                </h2>
              </FadeIn>
            </div>

            <div className="space-y-3 md:space-y-4">
              {/* Header */}
              <div className="grid grid-cols-2 gap-3 md:gap-4 px-4 md:px-6">
                <FadeIn>
                  <p className="text-sm md:text-base font-semibold text-navy/40 uppercase tracking-wider">Approccio Tradizionale</p>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <p className="text-sm md:text-base font-semibold text-teal uppercase tracking-wider">Approccio Quantistico</p>
                </FadeIn>
              </div>

              {differences.map((item, index) => (
                <FadeIn key={index} delay={index * 0.08}>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="p-4 md:p-5 bg-navy/5 rounded-xl border border-navy/5">
                      <p className="text-navy/50 text-sm md:text-base line-through decoration-navy/20">{item.traditional}</p>
                    </div>
                    <div className="p-4 md:p-5 bg-teal/5 rounded-xl border border-teal/20">
                      <p className="text-navy font-medium text-sm md:text-base">{item.quantum}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Quote
        text="Non insegno a vincere sugli altri. Insegno a vincere con gli altri."
        author="Luca Pellicari"
      />

      {/* Principles */}
      <section className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 bg-teal/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-coral/5 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <FadeIn>
              <span className="inline-block text-teal text-sm font-medium uppercase tracking-[0.3em] mb-4">
                I Principi
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4 md:mb-6">
                Il codice della NegoziAzione
              </h2>
            </FadeIn>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {principles.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.08}>
                <div className="group relative h-full">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-teal/20 to-coral/20 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
                  <div className="relative bg-cream rounded-xl p-6 md:p-8 border border-cream-dark h-full">
                    <div className="w-11 h-11 md:w-14 md:h-14 rounded-xl bg-teal/10 flex items-center justify-center mb-4 md:mb-6 text-teal group-hover:bg-teal group-hover:text-white transition-colors duration-300">
                      <item.icon size={22} className="md:w-7 md:h-7" />
                    </div>
                    <h3 className="font-serif text-lg md:text-xl text-navy font-bold mb-2 md:mb-3">
                      {item.title}
                    </h3>
                    <p className="text-navy/70 text-sm md:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Connection to Methods */}
      <section className="py-16 md:py-24 lg:py-32 bg-navy-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal/5 rounded-full blur-[120px]" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <Compass className="w-12 h-12 md:w-16 md:h-16 text-gold/50 mx-auto mb-6" />
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-10">
                Negoziare &egrave;{' '}
                <span className="bg-gradient-to-r from-gold to-coral bg-clip-text text-transparent">
                  vivere
                </span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="space-y-6 md:space-y-8 text-lg md:text-xl text-white/70 leading-relaxed">
                <p>
                  La NegoziAzione Quantistica non &egrave; solo per il tavolo delle trattative.
                  &Egrave; un modo di <strong className="text-white">vivere ogni relazione</strong>.
                </p>
                <p>
                  Con il partner, con i figli, con i colleghi, con te stesso.
                  Ogni giorno negozi qualcosa: tempo, attenzione, priorit&agrave;, amore.
                </p>
                <p className="font-serif text-2xl md:text-3xl text-white italic">
                  La domanda &egrave;: lo fai con{' '}
                  <span className="text-gold">consapevolezza</span>?
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/metodo-in-flow"
                  className="group inline-flex items-center gap-3 bg-teal text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-medium shadow-lg shadow-teal/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span>Scopri il Metodo In-Flow</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  href="/analisi-comportamento"
                  className="group inline-flex items-center gap-3 border-2 border-white/20 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-medium hover:border-gold hover:text-gold transition-all duration-300"
                >
                  <span>Analisi del Comportamento</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
