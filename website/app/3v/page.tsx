import { Metadata } from 'next'
import Link from 'next/link'
import { TextReveal } from '@/components/animations/TextReveal'
import { FadeIn } from '@/components/animations/FadeIn'
import { CTA } from '@/components/sections/CTA'
import { Quote } from '@/components/sections/Quote'
import {
  Compass,
  Eye,
  Shield,
  Heart,
  Sparkles,
  Star,
  Award,
  Gem,
  Flame,
  Handshake,
  Sun,
  SmilePlus,
  ArrowRight,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Le Tre V — Valori, Visione, Verità',
  description:
    'Il codice d\'identità di Luca Pellicari: Valori, Visione, Verità. Le tre fondamenta su cui costruisce ogni percorso di trasformazione.',
}

const valori = [
  { icon: Heart, title: 'Rispetto', description: 'Il fondamento di ogni relazione autentica. Il modo in cui entri in una stanza, il tono con cui parli, la cura con cui guardi gli altri.' },
  { icon: Award, title: 'Educazione', description: 'L\'eleganza vera non sta nei vestiti, ma nel modo in cui fai sentire l\'altra persona. Bellezza interiore.' },
  { icon: Gem, title: 'Eleganza & Classe', description: 'Il coraggio di essere raffinati anche quando il mondo ti spinge verso la volgarità. La parola giusta, il silenzio giusto.' },
  { icon: Sun, title: 'Amore per Sé', description: 'Non esiste amore per gli altri senza amore per sé stessi. Non esiste generosità senza radici profonde.' },
  { icon: Sparkles, title: 'Riconoscere il Valore negli Altri', description: 'Vedere le potenzialità, le intuizioni, il talento. E incoraggiarlo. Sempre.' },
  { icon: Handshake, title: 'Stima Reciproca', description: 'Quando la dai, ti elevi. Quando la ricevi, cresci. Il tessuto delle relazioni sane.' },
  { icon: Star, title: 'Credere nei Sogni', description: 'I sogni non sono favole: sono mappe. E quando le segui con coraggio diventano percorsi.' },
  { icon: Shield, title: 'Verità', description: 'La coerenza tra ciò che senti, ciò che dici e ciò che fai. Il coraggio di guardare in faccia le proprie ombre.' },
  { icon: Flame, title: 'Coraggio', description: 'La forza di entrare nei luoghi bui della mente sapendo che la luce la porti tu. Mi ha salvato la vita sette volte.' },
  { icon: Compass, title: 'Coerenza', description: 'Vivere secondo i propri valori anche quando costa fatica. Identità allo stato puro.' },
  { icon: Heart, title: 'Negoziabilità del Cuore', description: 'La negoziazione non è una tecnica: è un atto d\'amore verso sé stessi e verso gli altri. Si vince insieme, sempre.' },
  { icon: SmilePlus, title: 'Felicità', description: 'Essere un portatore sano di felicità. Farla circolare. La felicità condivisa è la forma più alta di ricchezza.' },
]

const visionePoints = [
  'Ricchezza, Bellezza, Condivisione',
  'Trasformare passioni in professioni',
  'Portare identità nelle aziende',
  'Creare ricchezza che diventa amore',
  'Finanziare i giovani per costruire un mondo migliore',
]

export default function TreVPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pb-20 lg:pt-40 lg:pb-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <FadeIn>
              <span className="inline-block text-teal text-sm font-medium uppercase tracking-[0.3em] mb-4 md:mb-6">
                Il Mio Codice d&apos;Identità
              </span>
            </FadeIn>

            <TextReveal className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-navy mb-6 md:mb-8 leading-tight">
              Le Tre V
            </TextReveal>

            <FadeIn delay={0.3}>
              <p className="text-base md:text-xl lg:text-2xl text-navy/80 leading-relaxed">
                <strong className="text-teal">Valori. Visione. Verità.</strong>{' '}
                Il codice d&apos;identità che guida ogni mia scelta, ogni mia azione,
                ogni mio insegnamento. Non sono concetti: sono la struttura su cui
                costruisco tutto.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-8 flex flex-wrap gap-3">
                {['Valori', 'Visione', 'Verità'].map((v) => (
                  <span
                    key={v}
                    className="inline-flex items-center px-5 py-2.5 bg-teal/10 border border-teal/20 rounded-full text-teal font-serif font-bold text-lg"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* VALORI Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-navy-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-coral/5 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <FadeIn>
              <span className="inline-block text-teal text-sm font-medium uppercase tracking-[0.3em] mb-4">
                Prima V
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                Valori
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto">
                I valori non sono parole. Non sono slogan.
                Sono ciò che rimane quando la vita ti toglie tutto.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {valori.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.05}>
                <div className="group bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 hover:bg-white/10 hover:border-teal/30 transition-all duration-300 h-full">
                  <div className="w-10 md:w-12 h-10 md:h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-3 md:mb-4 text-teal-light group-hover:bg-teal group-hover:text-white transition-all duration-300">
                    <item.icon size={20} className="md:w-6 md:h-6" />
                  </div>
                  <h3 className="font-serif text-base md:text-lg text-white font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-xs md:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* VISIONE Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <FadeIn>
                <span className="inline-block text-gold text-sm font-medium uppercase tracking-[0.3em] mb-4 md:mb-6">
                  Seconda V
                </span>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4 md:mb-6">
                  Visione
                </h2>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-base md:text-lg text-navy/70 leading-relaxed mb-6 md:mb-8">
                  La mia visione è semplice, enorme e luminosa.
                  Non è un obiettivo: è una direzione. È la risposta alla domanda
                  più importante: &ldquo;Per cosa esisto?&rdquo;
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="space-y-3 md:space-y-4">
                  {visionePoints.map((point, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-cream rounded-xl border border-cream-dark"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <ArrowRight className="w-4 h-4 text-gold" />
                      </div>
                      <p className="text-navy/80 text-sm md:text-base font-medium">{point}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            <FadeIn direction="right">
              <div className="relative bg-gradient-to-br from-navy-dark to-navy rounded-2xl p-8 md:p-12">
                <div className="w-8 h-1 bg-gold/50 rounded mb-6" />
                <p className="font-serif text-xl md:text-2xl lg:text-3xl text-white italic leading-relaxed mb-6">
                  &ldquo;Vedo un futuro in cui migliaia di persone entrano nei nostri percorsi
                  pensando di imparare una tecnica… e invece imparano sé stesse.&rdquo;
                </p>
                <p className="text-gold font-medium">— Luca Pellicari</p>

                {/* Decorative */}
                <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-gold/20 rounded-tr-2xl" />
                <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-teal/20 rounded-bl-2xl" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* VERITÀ Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-navy-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal/5 rounded-full blur-[120px]" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <span className="inline-block text-coral text-sm font-medium uppercase tracking-[0.3em] mb-4 md:mb-6">
                Terza V
              </span>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-10">
                Verità
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="space-y-6 md:space-y-8 text-lg md:text-xl text-white/70 leading-relaxed">
                <p className="font-serif text-2xl md:text-3xl text-white italic">
                  Io non sono resiliente.<br />
                  <span className="text-teal-light">Io sono coraggioso.</span>
                </p>
                <p className="font-serif text-2xl md:text-3xl text-white italic">
                  Io non rimbalzo.<br />
                  <span className="text-teal-light">Io attraverso.</span>
                </p>
                <p>
                  Sono un uomo di coerenza, costanza, visione, emozione, onestà.
                </p>
                <p>
                  Questa è la mia verità:{' '}
                  <strong className="text-white">vivo con il cuore aperto e gli occhi limpidi</strong>.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Formula Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <span className="inline-block text-teal text-sm font-medium uppercase tracking-[0.3em] mb-4 md:mb-6">
                La Formula
              </span>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-6 md:mb-8">
                Identità + Visione + Verità ={' '}
                <span className="text-teal">Flow</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-base md:text-lg text-navy/60 leading-relaxed mb-8">
                Tutta la mia vita converge in un&apos;unica formula.
                E il flow genera: pace, successo, ricchezza, amore, libertà, realizzazione.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <Link
                href="/metodo-in-flow"
                className="group inline-flex items-center gap-3 bg-teal text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-medium shadow-lg shadow-teal/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Scopri il Metodo In-Flow</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      <Quote
        text="La coerenza è una forma di eleganza. Il coraggio è una forma di disciplina. La responsabilità è una forma d'amore. La verità è una forma di libertà."
        author="Luca Pellicari"
        variant="light"
      />

      <CTA variant="light" />
    </>
  )
}
