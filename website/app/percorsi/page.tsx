import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { TextReveal } from '@/components/animations/TextReveal'
import { FadeIn } from '@/components/animations/FadeIn'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { CTA } from '@/components/sections/CTA'
import { Quote } from '@/components/sections/Quote'
import {
  Users,
  Building2,
  GraduationCap,
  User,
  CalendarDays,
  Mic,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Target,
  Eye,
  Brain,
  Star,
  Compass,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Percorsi',
  description:
    'Seminari live, formazione aziendale, masterclass, percorsi identitari 1-to-1 ed eventi speciali. Metodi pratici per crescere, evolvere, trasformare.',
}

const percorsi = [
  {
    icon: Mic,
    title: 'Seminari Live',
    subtitle: 'Esperienza dal vivo',
    description:
      'Giornate di formazione intensiva dove il cambiamento avviene in tempo reale. Non conferenze: esperienze trasformative. Ogni seminario è un viaggio dentro te stesso, guidato dalla voce e dalla presenza di Luca.',
    highlights: [
      'Giornate full-immersion',
      'Interazione diretta con Luca',
      'Esercizi pratici e trasformativi',
      'Community di partecipanti',
    ],
    accent: 'teal',
  },
  {
    icon: Building2,
    title: 'Formazione Aziendale',
    subtitle: 'Per team e organizzazioni',
    description:
      'Percorsi su misura per aziende che vogliono trasformare la leadership interna, migliorare la comunicazione e costruire un\'identità aziendale coerente. Non vendo tecniche: lavoro sulla struttura che genera risultati stabili e replicabili.',
    highlights: [
      'Programmi personalizzati',
      'Leadership e comunicazione',
      'Identità aziendale',
      'Risultati misurabili',
    ],
    accent: 'gold',
  },
  {
    icon: GraduationCap,
    title: 'Masterclass',
    subtitle: 'Formazione d\'eccellenza',
    description:
      'Percorsi avanzati per chi vuole padroneggiare il Metodo In-Flow, la leadership Alpha e la metaquantistica applicata. Ogni masterclass è un approfondimento verticale su un tema specifico, con strumenti immediatamente applicabili.',
    highlights: [
      'Metodo In-Flow avanzato',
      'AlphaKom Leadership',
      'Metaquantistica applicata',
      'Strumenti operativi',
    ],
    accent: 'teal',
  },
  {
    icon: User,
    title: 'Percorsi Identitari 1-to-1',
    subtitle: 'Trasformazione personale',
    description:
      'Il percorso più intimo e potente. Un cammino individuale con Luca, costruito interamente su di te: la tua storia, i tuoi blocchi, le tue potenzialità. Per chi è pronto a fare il proprio salto quantico.',
    highlights: [
      'Sessioni individuali',
      'Percorso personalizzato',
      'Accompagnamento diretto',
      'Trasformazione profonda',
    ],
    accent: 'gold',
  },
  {
    icon: CalendarDays,
    title: 'Eventi Speciali',
    subtitle: 'Momenti unici',
    description:
      'Conferenze, ritiri, incontri esclusivi e collaborazioni speciali. Eventi che nascono quando l\'energia è giusta, quando il messaggio chiede di essere condiviso in modo nuovo. Ogni evento è irripetibile.',
    highlights: [
      'Conferenze e keynote',
      'Ritiri trasformativi',
      'Incontri esclusivi',
      'Collaborazioni speciali',
    ],
    accent: 'teal',
  },
]

const areeFormative = [
  { icon: Eye, label: 'Formazione identitaria' },
  { icon: Users, label: 'Leadership e comunicazione' },
  { icon: Brain, label: 'Consapevolezza professionale' },
  { icon: Star, label: 'Appagamento personale' },
  { icon: Compass, label: 'Cambiamento interiore' },
  { icon: Sparkles, label: 'Metaquantistica applicata' },
]

export default function PercorsiPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pb-20 lg:pt-40 lg:pb-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <FadeIn>
              <span className="inline-block text-teal text-sm font-medium uppercase tracking-[0.3em] mb-4 md:mb-6">
                Cosa Possiamo Fare Insieme
              </span>
            </FadeIn>

            <TextReveal className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-navy mb-6 md:mb-8 leading-tight">
              Percorsi, seminari, corsi, eventi.
            </TextReveal>

            <FadeIn delay={0.4}>
              <p className="text-base md:text-xl lg:text-2xl text-navy/80 leading-relaxed">
                Metodi pratici per crescere, evolvere, trasformare.
                Ogni percorso è costruito su un principio semplice: portarti dalla confusione
                alla chiarezza, dalla paura al coraggio, dalla sopravvivenza alla piena identità.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Aree Formative Grid */}
      <section className="py-16 md:py-24 lg:py-32 bg-navy-dark">
        <div className="container-custom">
          <SectionHeading
            subtitle="Le Aree"
            title="Aree di formazione"
            description="Ogni area è un ingresso diverso nello stesso cammino: riconoscere chi sei, esprimere ciò che vali, creare ciò che desideri."
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {areeFormative.map((item, index) => (
              <FadeIn key={item.label} delay={index * 0.08}>
                <div className="group p-5 md:p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-teal/30 transition-all duration-300">
                  <item.icon className="w-7 md:w-8 h-7 md:h-8 text-teal-light mb-3 md:mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-medium text-sm md:text-base">{item.label}</h3>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Percorsi List */}
      {percorsi.map((percorso, index) => {
        const isEven = index % 2 === 0
        const IconComponent = percorso.icon

        return (
          <section
            key={percorso.title}
            className={`py-16 md:py-24 lg:py-32 ${isEven ? 'bg-white' : 'bg-navy-dark'} relative overflow-hidden`}
          >
            <div className="container-custom">
              <div className={`grid lg:grid-cols-2 gap-10 md:gap-16 items-center ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
                {/* Content */}
                <div className={!isEven ? 'lg:col-start-2' : ''}>
                  <FadeIn>
                    <span className={`inline-block text-sm font-medium uppercase tracking-[0.3em] mb-4 md:mb-6 ${
                      isEven ? 'text-teal' : 'text-gold'
                    }`}>
                      {percorso.subtitle}
                    </span>
                  </FadeIn>

                  <FadeIn delay={0.1}>
                    <div className="flex items-center gap-4 mb-4 md:mb-6">
                      <div className={`w-12 md:w-14 h-12 md:h-14 rounded-xl flex items-center justify-center ${
                        isEven ? 'bg-teal/10 text-teal' : 'bg-teal/20 text-teal-light'
                      }`}>
                        <IconComponent size={28} />
                      </div>
                      <h2 className={`font-serif text-2xl md:text-3xl lg:text-4xl font-bold ${
                        isEven ? 'text-navy' : 'text-white'
                      }`}>
                        {percorso.title}
                      </h2>
                    </div>
                  </FadeIn>

                  <FadeIn delay={0.2}>
                    <p className={`text-base md:text-lg leading-relaxed mb-6 md:mb-8 ${
                      isEven ? 'text-navy/70' : 'text-white/70'
                    }`}>
                      {percorso.description}
                    </p>
                  </FadeIn>

                  <FadeIn delay={0.3}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 md:mb-10">
                      {percorso.highlights.map((highlight) => (
                        <div key={highlight} className="flex items-center gap-3">
                          <CheckCircle className={`w-4 h-4 flex-shrink-0 ${
                            isEven ? 'text-teal' : 'text-teal-light'
                          }`} />
                          <span className={`text-sm md:text-base ${
                            isEven ? 'text-navy/60' : 'text-white/60'
                          }`}>
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </FadeIn>

                  <FadeIn delay={0.4}>
                    <Button href="/contatti" variant={isEven ? 'primary' : 'secondary'} arrow>
                      Richiedi informazioni
                    </Button>
                  </FadeIn>
                </div>

                {/* Visual */}
                <FadeIn direction={isEven ? 'right' : 'left'} className={!isEven ? 'lg:col-start-1' : ''}>
                  <div className={`relative rounded-2xl p-8 md:p-12 ${
                    isEven
                      ? 'bg-gradient-to-br from-cream to-white border border-cream-dark'
                      : 'bg-white/5 border border-white/10'
                  }`}>
                    <div className="text-center">
                      <div className={`w-20 md:w-24 h-20 md:h-24 rounded-2xl mx-auto mb-6 flex items-center justify-center ${
                        isEven ? 'bg-teal/10' : 'bg-teal/20'
                      }`}>
                        <IconComponent className={`w-10 md:w-12 h-10 md:h-12 ${
                          isEven ? 'text-teal' : 'text-teal-light'
                        }`} />
                      </div>
                      <h3 className={`font-serif text-xl md:text-2xl font-bold mb-3 ${
                        isEven ? 'text-navy' : 'text-white'
                      }`}>
                        {percorso.title}
                      </h3>
                      <p className={`text-sm ${isEven ? 'text-navy/50' : 'text-white/50'}`}>
                        {percorso.subtitle}
                      </p>
                      {/* Decorative number */}
                      <span className={`block font-serif text-7xl md:text-8xl font-bold mt-4 ${
                        isEven ? 'text-teal/15' : 'text-white/5'
                      }`}>
                        0{index + 1}
                      </span>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>
        )
      })}

      <Quote
        text="Quando tu diventi vero, tutto ciò che ti circonda cambia frequenza."
        author="Luca Pellicari"
      />

      <CTA />
    </>
  )
}
