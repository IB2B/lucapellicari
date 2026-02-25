import { Metadata } from 'next'
import { TextReveal } from '@/components/animations/TextReveal'
import { FadeIn } from '@/components/animations/FadeIn'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { CTA } from '@/components/sections/CTA'
import { Quote } from '@/components/sections/Quote'
import { Compass, Eye, Shield, ArrowRight, Zap, Heart, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Metodo In-Flow',
  description:
    'Il Metodo In-Flow: identità + visione + verità = flow. La scienza dell\'identità, la bellezza della verità. Un sistema trasformativo unico.',
}

const benefits = [
  { icon: Zap, title: 'Pace interiore', description: 'Liberati dal rumore mentale e trova la tua quiete.' },
  { icon: Star, title: 'Successo autentico', description: 'Raggiungi risultati allineati con chi sei veramente.' },
  { icon: Heart, title: 'Amore consapevole', description: 'Relazioni più profonde e significative.' },
  { icon: Compass, title: 'Libertà di essere', description: 'Vivi secondo i tuoi valori, non le aspettative altrui.' },
]

export default function MetodoInFlowPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-teal/5 blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <span className="inline-block text-teal text-sm font-medium uppercase tracking-[0.3em] mb-6">
                Il Mio Metodo
              </span>
            </FadeIn>

            <TextReveal className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-navy mb-8">
              In-Flow
            </TextReveal>

            <FadeIn delay={0.4}>
              <p className="text-2xl md:text-3xl text-teal font-serif italic mb-8">
                La scienza dell'identità, la bellezza della verità
              </p>
            </FadeIn>

            <FadeIn delay={0.5}>
              <p className="text-xl text-navy/80 leading-relaxed mb-12">
                Tutta la mia vita converge in un'unica formula:<br />
                <strong className="text-teal text-2xl">Identità + Visione + Verità = Flow</strong>
              </p>
            </FadeIn>

            <FadeIn delay={0.6}>
              <Button href="/contatti" size="lg" arrow>
                Inizia il tuo percorso
              </Button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 3V Framework */}
      <section className="py-24 lg:py-32 bg-dark-surface">
        <div className="container-custom">
          <SectionHeading
            subtitle="Le Tre V"
            title="Le colonne del metodo"
            description="Tre elementi fondamentali che, quando allineati, generano il tuo stato naturale di eccellenza."
          />

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <FadeIn delay={0.1}>
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
                  <Compass size={40} className="text-gold" />
                </div>
                <h3 className="font-serif text-3xl text-light-surface font-bold mb-4">Valori</h3>
                <p className="text-light-surface/70 leading-relaxed">
                  I valori sono il terreno su cui costruisci la tua identità.
                  Sono la bussola che ti orienta quando tutto sembra incerto.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
                  <Eye size={40} className="text-gold" />
                </div>
                <h3 className="font-serif text-3xl text-light-surface font-bold mb-4">Visione</h3>
                <p className="text-light-surface/70 leading-relaxed">
                  La visione è la stella polare della tua vita.
                  È dove vuoi arrivare, chi vuoi diventare.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
                  <Shield size={40} className="text-gold" />
                </div>
                <h3 className="font-serif text-3xl text-light-surface font-bold mb-4">Verità</h3>
                <p className="text-light-surface/70 leading-relaxed">
                  La verità non si racconta: si è.
                  È la coerenza tra ciò che senti, dici e fai.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Flow Formula */}
          <FadeIn delay={0.4}>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <span className="font-serif text-2xl text-gold">Valori</span>
              <span className="text-light-surface/50">+</span>
              <span className="font-serif text-2xl text-gold">Visione</span>
              <span className="text-light-surface/50">+</span>
              <span className="font-serif text-2xl text-gold">Verità</span>
              <ArrowRight className="text-light-surface/50 mx-4" />
              <span className="font-serif text-3xl text-light-surface font-bold bg-gradient-gold bg-clip-text text-transparent">
                FLOW
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      <Quote
        text="Ogni persona può entrare nel suo stato naturale: un equilibrio tra chi sei e ciò che fai, tra la tua storia e il tuo futuro, tra il tuo cuore e la tua visione."
        author="Luca Pellicari"
      />

      {/* Benefits */}
      <section className="py-24 lg:py-32 bg-light section-light">
        <div className="container-custom">
          <SectionHeading
            subtitle="Il Flow Genera"
            title="Cosa ottieni quando entri in flow"
            light
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <FadeIn key={benefit.title} delay={index * 0.1}>
                <div className="bg-white rounded-lg p-8 border border-light-darker hover:border-gold/50 hover:shadow-lg transition-all duration-300 text-center h-full">
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6 text-gold">
                    <benefit.icon size={32} />
                  </div>
                  <h3 className="font-serif text-xl text-dark font-semibold mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-dark/70">
                    {benefit.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Book Section */}
      <section className="py-24 lg:py-32 bg-dark">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <span className="text-gold text-sm font-medium uppercase tracking-[0.3em] mb-6 block">
                Il Libro
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-light-surface font-bold mb-8">
                In-Flow: Il Metodo
              </h2>
              <p className="text-xl text-light-surface/80 leading-relaxed mb-12">
                Il metodo In-Flow è il risultato di una vita intera. Ed è anche un libro,
                un corso, un percorso. Scopri come entrare nel tuo stato naturale di
                eccellenza e trasformare la tua vita.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
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
