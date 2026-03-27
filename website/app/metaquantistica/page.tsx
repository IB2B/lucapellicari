import { Metadata } from 'next'
import Link from 'next/link'
import { TextReveal } from '@/components/animations/TextReveal'
import { FadeIn } from '@/components/animations/FadeIn'
import { CTA } from '@/components/sections/CTA'
import { Quote } from '@/components/sections/Quote'
import {
  Atom,
  Brain,
  Waves,
  Sparkles,
  Eye,
  Heart,
  Zap,
  Infinity,
  ArrowRight,
  Sun,
  Shield,
  Target,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Metaquantistica — La Coscienza Applicata alla Vita',
  description:
    'La Metaquantistica di Luca Pellicari: quando la scienza della coscienza incontra la vita quotidiana. Frequenze, consapevolezza, trasformazione.',
}

const pillars = [
  {
    icon: Brain,
    title: 'Coscienza',
    subtitle: 'Il campo che crea',
    description:
      'La mente crea, la coscienza guida. La Metaquantistica parte da un principio fondamentale: la realt\u00e0 che vivi \u00e8 il riflesso della tua frequenza interiore. Cambia la frequenza, cambia la realt\u00e0.',
    accent: 'from-teal to-teal-dark',
  },
  {
    icon: Waves,
    title: 'Frequenza',
    subtitle: 'La vibrazione che attrai',
    description:
      'Tu non attrai ci\u00f2 che desideri. Attrai ci\u00f2 che sei. Il mondo risponde alla tua vibrazione, non alle tue parole. La Metaquantistica ti insegna a modulare la tua frequenza per allinearti ai risultati che cerchi.',
    accent: 'from-gold to-coral',
  },
  {
    icon: Sparkles,
    title: 'Trasformazione',
    subtitle: 'Il salto quantico',
    description:
      'Ogni grande cambiamento \u00e8 un collasso quantico: il momento in cui smetti di osservare le infinite possibilit\u00e0 e ne scegli una. Con coraggio, con coerenza, con la tua identit\u00e0 pi\u00f9 alta.',
    accent: 'from-coral to-gold',
  },
]

const principles = [
  {
    icon: Eye,
    title: 'L\u2019osservatore crea la realt\u00e0',
    description: 'Come in fisica quantistica, la tua osservazione consapevole collassa le possibilit\u00e0 in realt\u00e0 concrete.',
  },
  {
    icon: Heart,
    title: 'La paura collassa l\u2019onda',
    description: 'La paura collassa l\u2019onda dell\u2019evento temuto. Il coraggio apre il campo a infinite possibilit\u00e0.',
  },
  {
    icon: Zap,
    title: 'Cambia frequenza, cambia frequentazioni',
    description: 'Quando trasformi la tua energia interiore, il tuo ambiente esterno si riallinea naturalmente.',
  },
  {
    icon: Infinity,
    title: 'Nulla ti capita per caso',
    description: 'Ogni persona, ogni errore, ogni dolore arriva esattamente nel momento in cui puoi comprenderlo.',
  },
  {
    icon: Sun,
    title: 'La gratitudine \u00e8 una tecnologia',
    description: 'Quando ringrazi senza motivo attivi una frequenza che apre strade, incontri, opportunit\u00e0.',
  },
  {
    icon: Shield,
    title: 'L\u2019identit\u00e0 \u00e8 la frequenza base',
    description: 'Tutto parte dall\u2019identit\u00e0: \u00e8 la tua frequenza fondamentale, quella che determina ogni altra vibrazione.',
  },
]

const applications = [
  {
    title: 'Leadership Quantistica',
    description: 'Guidare team e organizzazioni attraverso la coerenza della propria frequenza, non attraverso il potere del ruolo.',
  },
  {
    title: 'Negoziazione Consapevole',
    description: 'Negoziare partendo dalla propria identit\u00e0, creando campi di fiducia reciproca che generano accordi win-win.',
  },
  {
    title: 'Crescita Personale',
    description: 'Utilizzare i principi quantistici per superare blocchi, paure e schemi limitanti. Collassare nuove realt\u00e0.',
  },
  {
    title: 'Benessere Olistico',
    description: 'Integrare corpo, mente e coscienza per raggiungere uno stato di flow permanente e sostenibile.',
  },
]

export default function MetaquantisticaPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pb-20 lg:pt-40 lg:pb-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-teal/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <FadeIn>
              <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/30 rounded-full px-5 py-2 mb-6 md:mb-8">
                <Atom size={18} className="text-teal" />
                <span className="text-teal text-sm font-medium">
                  Scienza della Coscienza
                </span>
              </div>
            </FadeIn>

            <TextReveal className="font-serif text-3xl md:text-5xl lg:text-7xl font-bold text-navy mb-6 md:mb-8 leading-tight">
              Metaquantistica
            </TextReveal>

            <FadeIn delay={0.3}>
              <p className="text-lg md:text-xl lg:text-2xl text-navy/80 leading-relaxed mb-6 md:mb-8">
                La coscienza applicata alla vita quotidiana.
                Quando la <strong className="text-teal">scienza incontra l&apos;anima</strong>,
                e la fisica quantistica diventa uno strumento di trasformazione personale.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="text-base md:text-lg text-navy/60 leading-relaxed">
                La Metaquantistica non &egrave; new age. Non &egrave; misticismo.
                &Egrave; un approccio rigoroso che fonde neuroscienze, scienze cognitive
                e principi della fisica quantistica per creare un modello pratico
                di trasformazione e crescita.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-navy-dark via-navy to-navy-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-40 left-10 w-80 h-80 bg-teal/5 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-teal/3 to-transparent rounded-full" />
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <FadeIn>
              <span className="inline-block text-teal text-sm font-medium uppercase tracking-[0.3em] mb-4">
                I Fondamenti
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                Le tre dimensioni della{' '}
                <span className="bg-gradient-to-r from-teal via-teal-light to-gold bg-clip-text text-transparent">
                  Metaquantistica
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

      <Quote
        text="Quando cambi frequenza, cambi frequentazioni. Quando cambi frequentazioni, cambi la tua vita."
        author="Luca Pellicari"
        variant="light"
      />

      {/* Principles */}
      <section className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 bg-teal/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
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
                Le leggi della Metaquantistica
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-base md:text-lg text-navy/60 max-w-2xl mx-auto">
                Non regole astratte, ma principi vissuti e sperimentati in prima persona.
              </p>
            </FadeIn>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {principles.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.08}>
                <div className="group relative h-full">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-teal/20 to-gold/20 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
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

      {/* Applications */}
      <section className="py-16 md:py-24 lg:py-32 bg-navy-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal/5 rounded-full blur-[120px]" />
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <FadeIn>
              <span className="inline-block text-gold text-sm font-medium uppercase tracking-[0.3em] mb-4">
                Applicazioni Pratiche
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                La Metaquantistica nella{' '}
                <span className="bg-gradient-to-r from-gold to-coral bg-clip-text text-transparent">
                  vita reale
                </span>
              </h2>
            </FadeIn>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
            {applications.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.1}>
                <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:border-gold/30 transition-all duration-500 overflow-hidden hover:bg-white/[0.08] h-full">
                  <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-coral/10 to-gold/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative z-10">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center mb-4 md:mb-5 group-hover:border-gold group-hover:bg-gold transition-all duration-500">
                      <Target size={18} className="text-gold group-hover:text-white transition-colors duration-500 md:w-5 md:h-5" />
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl text-white font-bold mb-2 md:mb-3 group-hover:text-gold transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-sm md:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.5}>
            <div className="text-center mt-10 md:mt-12">
              <Link
                href="/libri"
                className="group inline-flex items-center gap-3 bg-gold text-navy-dark px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold shadow-lg shadow-gold/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Leggi la Guida alla Metaquantistica</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTA />
    </>
  )
}
