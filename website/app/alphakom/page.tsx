import { Metadata } from 'next'
import { TextReveal } from '@/components/animations/TextReveal'
import { FadeIn } from '@/components/animations/FadeIn'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { CTA } from '@/components/sections/CTA'
import { Quote } from '@/components/sections/Quote'
import { Shield, Target, Compass, Zap, Users, Crown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Alphakom - La Scuola degli Alpha Leaders',
  description:
    'Alphakom: essere Alpha significa avere il coraggio di restare coerente alla propria visione, assumendosi la responsabilità di guidare gli altri non con la forza, ma con il valore.',
}

const principles = [
  {
    icon: Shield,
    title: 'Coraggio',
    description: 'Il coraggio di restare fedele a ciò che senti, anche quando il mondo spinge dall\'altra parte.',
  },
  {
    icon: Compass,
    title: 'Coerenza',
    description: 'Mantenere la tua visione salda nelle decisioni, incarnando i tuoi valori ogni giorno.',
  },
  {
    icon: Target,
    title: 'Responsabilità',
    description: 'Assumerti la responsabilità di guidare, non per dominare ma per elevare.',
  },
  {
    icon: Zap,
    title: 'Presenza',
    description: 'Una frequenza che emana, che inspira, che attrae senza dover convincere.',
  },
  {
    icon: Users,
    title: 'Leadership Gentile',
    description: 'Guidare con il valore di ciò che sei, non con la forza del ruolo.',
  },
  {
    icon: Crown,
    title: 'Identità Alpha',
    description: 'Diventare la versione più potente, più sincera, più libera di te stesso.',
  },
]

const versions = [
  {
    title: 'Versione Epica',
    quote: 'Essere Alpha significa levare il proprio spirito oltre la paura, restare coerenti alla visione che ci guida.',
  },
  {
    title: 'Versione Spirituale',
    quote: 'Essere Alpha significa allineare la propria frequenza alla visione più alta di sé.',
  },
  {
    title: 'Versione Intima',
    quote: 'Essere Alpha è quando finalmente smetti di fuggire da chi sei.',
  },
]

export default function AlphakomPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,rgba(107,155,174,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(107,155,174,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <FadeIn>
              <span className="inline-block text-teal text-sm font-medium uppercase tracking-[0.3em] mb-6">
                La Scuola degli Alpha Leaders
              </span>
            </FadeIn>

            <TextReveal className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-navy mb-8">
              ALPHAKOM
            </TextReveal>

            <FadeIn delay={0.4}>
              <p className="text-2xl md:text-3xl text-teal font-serif italic mb-8">
                &ldquo;Essere Alpha significa avere il coraggio di restare coerente
                alla propria visione.&rdquo;
              </p>
            </FadeIn>

            <FadeIn delay={0.5}>
              <p className="text-xl text-navy/80 leading-relaxed mb-12">
                Qui impari a guidare, non a seguire. A vedere, non a reagire.
                A influenzare in modo consapevole. A creare ricchezza — economica,
                relazionale, spirituale. A entrare nel tuo stato naturale: <strong className="text-teal">In-Flow</strong>.
              </p>
            </FadeIn>

            <FadeIn delay={0.6}>
              <Button href="/contatti" size="lg" arrow>
                Diventa un Alpha Leader
              </Button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Definition Section */}
      <section className="py-24 lg:py-32 bg-navy-dark">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <span className="text-gold text-sm font-medium uppercase tracking-[0.3em] mb-4 block">
                Cosa Significa
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-light-surface font-bold mb-12">
                Essere Alpha
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-xl text-light-surface/80 leading-relaxed mb-12">
                Essere Alpha non significa dominare. Significa <strong className="text-gold">assumersi
                la responsabilità</strong> che gli altri evitano. Significa guidare
                con il cuore e con la mente. Significa diventare il punto di riferimento
                che il tuo ambiente cerca, non perché ti imponi, ma perché <strong className="text-gold">sei</strong>.
              </p>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              {versions.map((version, index) => (
                <FadeIn key={version.title} delay={0.3 + index * 0.1}>
                  <div className="bg-dark rounded-xl p-8 border border-dark-lighter">
                    <span className="text-gold text-sm font-medium mb-4 block">
                      {version.title}
                    </span>
                    <p className="font-serif text-lg text-light-surface italic">
                      &ldquo;{version.quote}&rdquo;
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Quote
        text="Alpha: il coraggio di essere coerente. Lead by being."
        author="Metodo Alpha"
      />

      {/* Principles Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container-custom">
          <SectionHeading
            subtitle="I Principi"
            title="Il codice Alpha"
            description="I fondamenti su cui si costruisce un vero leader. Non regole, ma principi di vita."
            light
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {principles.map((principle, index) => (
              <FadeIn key={principle.title} delay={index * 0.1}>
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-teal/20 to-coral/20 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
                  <div className="relative bg-cream rounded-xl p-8 border border-cream-dark h-full">
                    <div className="w-14 h-14 rounded-xl bg-teal/10 flex items-center justify-center mb-6 text-teal group-hover:bg-teal group-hover:text-white transition-colors">
                      <principle.icon size={28} />
                    </div>
                    <h3 className="font-serif text-2xl text-navy font-bold mb-3">
                      {principle.title}
                    </h3>
                    <p className="text-navy/70 leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-24 lg:py-32 bg-navy-dark">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <span className="text-gold text-sm font-medium uppercase tracking-[0.3em] mb-6 block">
                Il Manifesto
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-light-surface font-bold mb-12">
                Il Giuramento Alpha
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-dark-surface rounded-xl p-12 border border-gold/20">
                <p className="font-serif text-xl text-light-surface leading-relaxed italic">
                  &ldquo;Giuro di restare fedele alla mia visione,<br />
                  di onorare i miei valori e la mia verità,<br />
                  di assumermi la responsabilità della mia presenza nel mondo.<br /><br />
                  Giuro di guidare con il coraggio,<br />
                  di comunicare con coerenza,<br />
                  di vivere con integrità.<br /><br />
                  Giuro di essere Alpha:<br />
                  non sopra gli altri, ma davanti a me stesso.&rdquo;
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
