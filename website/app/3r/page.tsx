import { Metadata } from 'next'
import Link from 'next/link'
import { TextReveal } from '@/components/animations/TextReveal'
import { FadeIn } from '@/components/animations/FadeIn'
import { CTA } from '@/components/sections/CTA'
import { Quote } from '@/components/sections/Quote'
import {
  Heart,
  Sparkles,
  Target,
  ArrowRight,
  Eye,
  Users,
  Handshake,
  Sun,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Le Tre R — Riconoscimento, Riconoscibilit\u00e0, Riconoscenza',
  description:
    'La mia identit\u00e0 relazionale: Riconoscimento, Riconoscibilit\u00e0, Riconoscenza. Il codice che guida ogni mia relazione autentica.',
}

const treR = [
  {
    icon: Heart,
    title: 'Riconoscimento',
    subtitle: 'Conoscere s\u00e9 stessi',
    color: 'from-coral to-coral-dark',
    accentClass: 'text-coral',
    description:
      'Il primo passo \u00e8 guardarsi dentro con onest\u00e0 assoluta. Riconoscersi significa sapere chi sei, cosa ti muove, cosa ti ferma. Sono coraggio, coerenza e visione. Non \u00e8 un esercizio intellettuale: \u00e8 un atto di profondit\u00e0 che cambia tutto.',
    details: [
      'Conoscere i propri valori profondi',
      'Accettare la propria storia senza filtri',
      'Scoprire la propria identit\u00e0 autentica',
      'Trasformare la consapevolezza in forza',
    ],
  },
  {
    icon: Sparkles,
    title: 'Riconoscibilit\u00e0',
    subtitle: 'Essere riconosciuti',
    color: 'from-teal to-teal-dark',
    accentClass: 'text-teal',
    description:
      'Le persone mi vogliono bene. Mi cercano. Ridono con me. Vivono bene con me. La riconoscibilit\u00e0 non \u00e8 fama: \u00e8 la capacit\u00e0 di lasciare un\u2019impronta autentica in chi ti incontra. \u00c8 la tua frequenza che parla prima delle tue parole.',
    details: [
      'Creare relazioni autentiche e durature',
      'Comunicare con coerenza e presenza',
      'Lasciare un\u2019impronta positiva nelle persone',
      'Diventare un punto di riferimento naturale',
    ],
  },
  {
    icon: Target,
    title: 'Riconoscenza',
    subtitle: 'Gratitudine come motore',
    color: 'from-gold to-coral',
    accentClass: 'text-gold',
    description:
      'Ogni mattina ringrazio San Michele, il mio arcangelo, il mio protettore. E scelgo chi ringraziare. La gratitudine \u00e8 il mio motore quantico. Non \u00e8 un gesto, non \u00e8 un\u2019emozione: \u00e8 una tecnologia del campo che apre strade, incontri, opportunit\u00e0.',
    details: [
      'Praticare la gratitudine come disciplina quotidiana',
      'Riconoscere il valore di ogni incontro',
      'Trasformare ogni esperienza in insegnamento',
      'Attivare la frequenza che genera abbondanza',
    ],
  },
]

const connections = [
  {
    icon: Eye,
    title: 'Dalle 3V alle 3R',
    description:
      'Le 3V (Valori, Visione, Verit\u00e0) fondano la tua identit\u00e0 interiore. Le 3R la portano nel mondo delle relazioni: sono il ponte tra chi sei e come vivi con gli altri.',
  },
  {
    icon: Users,
    title: 'Relazioni che Trasformano',
    description:
      'Quando ti riconosci, vieni riconosciuto. Quando vieni riconosciuto, nasce la gratitudine. E la gratitudine genera un campo di possibilit\u00e0 infinite.',
  },
  {
    icon: Handshake,
    title: 'Ecosistema Relazionale',
    description:
      'Le 3R non sono un concetto: sono un modo di vivere. Ogni relazione autentica nasce da questa sequenza: conosci te stesso, fatti riconoscere, ringrazia.',
  },
]

export default function TreRPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pb-20 lg:pt-40 lg:pb-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-coral/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <FadeIn>
              <span className="inline-block text-coral text-sm font-medium uppercase tracking-[0.3em] mb-4 md:mb-6">
                La Mia Identit&agrave; Relazionale
              </span>
            </FadeIn>

            <TextReveal className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-navy mb-6 md:mb-8 leading-tight">
              Le Tre R
            </TextReveal>

            <FadeIn delay={0.3}>
              <p className="text-base md:text-xl lg:text-2xl text-navy/80 leading-relaxed">
                <strong className="text-coral">Riconoscimento. Riconoscibilit&agrave;. Riconoscenza.</strong>{' '}
                Il codice relazionale che trasforma ogni incontro in un&apos;opportunit&agrave;
                di crescita, ogni relazione in un legame autentico, ogni giorno
                in un atto di gratitudine.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-8 flex flex-wrap gap-3">
                {['Riconoscimento', 'Riconoscibilit\u00e0', 'Riconoscenza'].map((v) => (
                  <span
                    key={v}
                    className="inline-flex items-center px-5 py-2.5 bg-coral/10 border border-coral/20 rounded-full text-coral font-serif font-bold text-base md:text-lg"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Three R Cards — Expanded */}
      <section className="py-16 md:py-24 lg:py-32 bg-navy-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-40 left-10 w-80 h-80 bg-coral/5 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-coral/3 to-transparent rounded-full" />
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-12 md:mb-20">
            <FadeIn>
              <span className="inline-block text-coral text-sm font-medium uppercase tracking-[0.3em] mb-4">
                Il Codice Relazionale
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                Tre pilastri per{' '}
                <span className="bg-gradient-to-r from-coral via-gold to-coral bg-clip-text text-transparent">
                  relazioni autentiche
                </span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto">
                Le 3R sono il modo in cui la tua identit&agrave; incontra il mondo.
                Sono la traduzione relazionale delle tue 3V.
              </p>
            </FadeIn>
          </div>

          <div className="space-y-8 md:space-y-12">
            {treR.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.15}>
                <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-coral/30 transition-all duration-500 overflow-hidden">
                  <div className="absolute -inset-1 bg-gradient-to-r from-coral/10 via-gold/5 to-coral/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative z-10 p-6 md:p-10 lg:p-12">
                    <div className="grid lg:grid-cols-[1fr,1.2fr] gap-8 lg:gap-12 items-start">
                      {/* Left — Info */}
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                            <item.icon size={28} className="text-white md:w-8 md:h-8" />
                          </div>
                          <div>
                            <span className={`${item.accentClass} text-sm font-medium uppercase tracking-wider`}>
                              {item.subtitle}
                            </span>
                            <h3 className="font-serif text-2xl md:text-3xl text-white font-bold group-hover:text-coral-light transition-colors duration-300">
                              {item.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-white/70 text-base md:text-lg leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Right — Details */}
                      <div className="space-y-3">
                        {item.details.map((detail, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors duration-300"
                          >
                            <div className="w-8 h-8 rounded-lg bg-coral/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <ArrowRight className="w-4 h-4 text-coral" />
                            </div>
                            <p className="text-white/80 text-sm md:text-base font-medium">{detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Connection Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-coral/5 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <FadeIn>
              <span className="inline-block text-teal text-sm font-medium uppercase tracking-[0.3em] mb-4">
                Il Collegamento
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4 md:mb-6">
                Identit&agrave; e Relazione
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-base md:text-lg text-navy/60 max-w-2xl mx-auto">
                Le 3R completano le 3V. Insieme formano il sistema completo
                di identit&agrave; personale e relazionale di Luca Pellicari.
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {connections.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.1}>
                <div className="group relative h-full">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-teal/20 to-coral/20 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
                  <div className="relative bg-cream rounded-xl p-6 md:p-8 border border-cream-dark h-full">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-teal/10 flex items-center justify-center mb-5 md:mb-6 text-teal group-hover:bg-teal group-hover:text-white transition-colors duration-300">
                      <item.icon size={24} className="md:w-7 md:h-7" />
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl text-navy font-bold mb-3">
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

      {/* Gratitude Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-navy-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <Sun className="w-12 h-12 md:w-16 md:h-16 text-gold/50 mx-auto mb-6" />
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-10">
                La Gratitudine &egrave; una{' '}
                <span className="bg-gradient-to-r from-gold to-coral bg-clip-text text-transparent">
                  Tecnologia
                </span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="space-y-6 md:space-y-8 text-lg md:text-xl text-white/70 leading-relaxed">
                <p>
                  Non un&apos;emozione, non un gesto.
                  Una <strong className="text-gold">tecnologia del campo</strong>.
                </p>
                <p>
                  Quando ringrazi senza motivo attivi una frequenza
                  che apre strade, incontri, opportunit&agrave;.
                </p>
                <p className="font-serif text-2xl md:text-3xl text-white italic">
                  Non &egrave; magia.<br />
                  <span className="text-gold">&Egrave; consapevolezza.</span>
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-10 md:mt-12">
                <Link
                  href="/3v"
                  className="group inline-flex items-center gap-3 bg-coral text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-medium shadow-lg shadow-coral/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span>Scopri le Tre V</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <Quote
        text="La gratitudine \u00e8 il mio motore quantico. Ogni mattina scelgo chi ringraziare. E da l\u00ec nasce tutto."
        author="Luca Pellicari"
        variant="light"
      />

      <CTA variant="light" />
    </>
  )
}
