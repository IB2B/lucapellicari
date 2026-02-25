import { Metadata } from 'next'
import Image from 'next/image'
import { TextReveal } from '@/components/animations/TextReveal'
import { FadeIn } from '@/components/animations/FadeIn'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CTA } from '@/components/sections/CTA'
import { Quote } from '@/components/sections/Quote'
import { Rocket, Heart, Users, Lightbulb, Target, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Missione',
  description:
    'La mia missione è trasformare le persone aiutandole a riconoscersi. Ogni giorno lavoro per risvegliare identità, liberare visioni, generare verità.',
}

const missionPoints = [
  {
    icon: Heart,
    title: 'Risvegliare Identità',
    description: 'Accompagno le persone in quel punto esatto in cui la loro voce diventa più forte delle loro paure.',
  },
  {
    icon: Target,
    title: 'Portare Coraggio',
    description: 'Il coraggio non come concetto ma come esperienza vissuta, come scelta quotidiana.',
  },
  {
    icon: Users,
    title: 'Creare Comunità',
    description: 'Un ecosistema di anime affini che credono nella bellezza, nella crescita e nella ricchezza condivisa.',
  },
  {
    icon: Lightbulb,
    title: 'Ridare Coerenza',
    description: 'Aiuto le persone a ritrovare l\'allineamento tra ciò che sentono, dicono e fanno.',
  },
  {
    icon: Rocket,
    title: 'Accendere Responsabilità',
    description: 'Spingo chi mi segue a diventare ciò che può essere, a rompere gli schemi invisibili.',
  },
  {
    icon: Sparkles,
    title: 'Trasformare Vite',
    description: 'Non vendo corsi: accompagno le persone a ricordare chi sono veramente.',
  },
]

export default function MissionePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal/20 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <FadeIn>
              <span className="inline-block text-teal text-sm font-medium uppercase tracking-[0.3em] mb-6">
                La Mia Missione
              </span>
            </FadeIn>

            <TextReveal className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-8 leading-tight">
              Trasformo le persone aiutandole a riconoscersi
            </TextReveal>

            <FadeIn delay={0.4}>
              <p className="text-xl md:text-2xl text-navy/80 leading-relaxed">
                Ogni giorno lavoro per risvegliare identità, liberare visioni, generare verità,
                creare ricchezza condivisa. Non sono qui per motivarti. Sono qui per aiutarti
                a ricordare chi sei.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 lg:py-32 bg-dark-surface">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="/images/luca-speaking.jpg"
                  alt="Luca Pellicari speaking"
                  fill
                  className="object-cover"
                  quality={70}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            </FadeIn>

            <div>
              <FadeIn>
                <h2 className="font-serif text-3xl md:text-4xl text-light-surface font-bold mb-8">
                  Cosa faccio. Come lo faccio. Perché lo faccio ogni singolo giorno.
                </h2>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="space-y-6 text-light-surface/80 text-lg leading-relaxed">
                  <p>
                    La mia missione è trasformare la formazione in un atto di verità.
                    Non vendo corsi, non vendo tecniche, non vendo promesse: io accompagno
                    le persone a <strong className="text-gold">ricordare chi sono</strong>.
                  </p>
                  <p>
                    Ogni aula che apro, ogni parola che scelgo, ogni percorso che costruisco
                    ha un unico obiettivo: portare le persone dalla confusione alla chiarezza,
                    dalla paura al coraggio, dalla sopravvivenza alla piena identità.
                  </p>
                  <p>
                    La mia missione è insegnare ciò che so perché l'ho vissuto. Perché la
                    sofferenza mi ha forgiato, i fallimenti mi hanno educato, la malattia
                    mi ha svegliato e la rinascita mi ha consacrato.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <Quote
        text="Se sono vivo è per un motivo: trasmettere ciò che la vita mi ha insegnato a caro prezzo."
        author="Luca Pellicari"
      />

      {/* Mission Points */}
      <section className="py-24 lg:py-32 bg-light section-light">
        <div className="container-custom">
          <SectionHeading
            subtitle="Come Opero"
            title="I pilastri della mia missione"
            light
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {missionPoints.map((point, index) => (
              <FadeIn key={point.title} delay={index * 0.1}>
                <div className="bg-white rounded-lg p-8 border border-light-darker hover:border-gold/50 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="w-14 h-14 rounded-lg bg-gold/10 flex items-center justify-center mb-6 text-gold">
                    <point.icon size={28} />
                  </div>
                  <h3 className="font-serif text-xl text-dark font-semibold mb-3">
                    {point.title}
                  </h3>
                  <p className="text-dark/70 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
