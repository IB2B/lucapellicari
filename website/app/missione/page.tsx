import { Metadata } from 'next'
import Image from 'next/image'
import { TextReveal } from '@/components/animations/TextReveal'
import { FadeIn } from '@/components/animations/FadeIn'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CTA } from '@/components/sections/CTA'
import { Quote } from '@/components/sections/Quote'
import { Rocket, Heart, Users, Lightbulb, Target, Sparkles, CheckCircle, RefreshCw, TrendingUp } from 'lucide-react'

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
      <section className="py-24 lg:py-32 bg-navy-dark">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-stretch">
            <FadeIn direction="left">
              <div className="relative min-h-[500px] lg:min-h-[600px] h-full rounded-lg overflow-hidden">
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
                    La mia missione è insegnare ciò che so perché l&apos;ho vissuto. Perché la
                    sofferenza mi ha forgiato, i fallimenti mi hanno educato, la malattia
                    mi ha svegliato e la rinascita mi ha consacrato.
                  </p>
                  <p>
                    Lo faccio attraverso: <strong className="text-gold">percorsi di consapevolezza imprenditoriale</strong>,
                    dove il business è la porta d&apos;ingresso e la trasformazione personale è l&apos;uscita.
                    Modelli formativi unici (<strong className="text-gold">3V, 3R, In-Flow</strong>),
                    che fondono neuroscienze, comportamenti, identità, visione e verità.
                    Un linguaggio diretto e sincero, che arriva dove le parole patinate non arrivano: al cuore.
                    Un ecosistema di anime affini, che credono nella bellezza, nella crescita e nella ricchezza condivisa.
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
        variant="light"
      />

      {/* Mission Points */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container-custom">
          <SectionHeading
            subtitle="Come Opero"
            title="I pilastri della mia missione"
            light
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {missionPoints.map((point, index) => (
              <FadeIn key={point.title} delay={index * 0.1}>
                <div className="bg-cream rounded-lg p-8 border border-cream-dark hover:border-teal/30 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="w-14 h-14 rounded-lg bg-teal/10 flex items-center justify-center mb-6 text-teal">
                    <point.icon size={28} />
                  </div>
                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">
                    {point.title}
                  </h3>
                  <p className="text-navy/70 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Il Vero Problema — Risultati Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-navy-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
            <FadeIn>
              <span className="inline-block text-gold text-sm font-medium uppercase tracking-[0.3em] mb-4 md:mb-6">
                Il Vero Problema
              </span>
            </FadeIn>

            <TextReveal className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-8 leading-tight">
              Il problema non è ottenere risultati. È mantenerli.
            </TextReveal>

            <FadeIn delay={0.3}>
              <p className="text-base md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto">
                Quando si lavora bene, i risultati arrivano. Ma il vero problema è un altro:
                è renderli coerenti, stabili e replicabili. Io lavoro sulla struttura,
                perché è la struttura che genera risultati che durano.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: CheckCircle,
                title: 'Coerenti',
                description: 'Allineati con ciò che l\'impresa rappresenta realmente — la sua identità.',
              },
              {
                icon: RefreshCw,
                title: 'Stabili',
                description: 'Non dipendono dall\'entusiasmo del momento, ma da una struttura solida.',
              },
              {
                icon: TrendingUp,
                title: 'Replicabili',
                description: 'Premiano tutta la filiera, dall\'addetto alle pulizie al top-manager.',
              },
            ].map((item, index) => (
              <FadeIn key={item.title} delay={0.1 * index}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 hover:border-teal/30 transition-all duration-300 h-full">
                  <div className="w-12 md:w-14 h-12 md:h-14 rounded-xl bg-teal/10 flex items-center justify-center mb-4 md:mb-6 text-teal">
                    <item.icon size={24} className="md:w-7 md:h-7" />
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl text-white font-semibold mb-2 md:mb-3">
                    Risultati {item.title}
                  </h3>
                  <p className="text-white/60 text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div className="text-center mt-10 md:mt-14">
              <p className="text-white/60 text-sm md:text-base italic font-serif">
                &ldquo;Non vendo contenuti. Non vendo motivazione. Non vendo tecniche.
                Lavoro su una cosa molto più profonda: <span className="text-gold">la struttura</span>.&rdquo;
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTA />
    </>
  )
}
