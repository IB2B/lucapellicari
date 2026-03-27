import { Metadata } from 'next'
import Link from 'next/link'
import { TextReveal } from '@/components/animations/TextReveal'
import { FadeIn } from '@/components/animations/FadeIn'
import { CTA } from '@/components/sections/CTA'
import { Quote } from '@/components/sections/Quote'
import {
  Brain,
  Eye,
  Users,
  Target,
  Shield,
  Compass,
  ArrowRight,
  Search,
  Lightbulb,
  BarChart3,
  BookOpen,
  GraduationCap,
  Handshake,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Analisi del Comportamento — Coerenza e Consapevolezza',
  description:
    'L\u2019Analisi del Comportamento di Luca Pellicari: psicologia applicata, neuroscienze e scienze cognitive al servizio della leadership e della crescita personale.',
}

const areas = [
  {
    icon: Brain,
    title: 'Psicologia Applicata',
    description:
      'Anni di studio nel mondo della psicologia applicata al lavoro: comprendere i meccanismi profondi che guidano le scelte, le reazioni e i comportamenti delle persone.',
  },
  {
    icon: Eye,
    title: 'Neuroscienze',
    description:
      'Lo studio in ambito neuroscientifico per capire come il cervello elabora decisioni, emozioni e relazioni. La scienza al servizio della crescita.',
  },
  {
    icon: Lightbulb,
    title: 'Scienze Cognitive',
    description:
      'Comprendere come pensiamo, come percepiamo la realt\u00e0 e come possiamo riprogrammare i nostri schemi mentali per ottenere risultati coerenti.',
  },
]

const competencies = [
  {
    icon: Search,
    title: 'Leggere le Persone',
    description: 'Chi sa leggere le persone non commette due volte lo stesso errore. Non sbaglia i partner. Non sbaglia le scelte. Non sbaglia i tempi.',
  },
  {
    icon: Shield,
    title: 'Coerenza Sotto Pressione',
    description: 'L\u2019analisi del comportamento insegna a restare coerenti quando tutto spinge nella direzione opposta. Essere affidabili, responsabili, presenti.',
  },
  {
    icon: Users,
    title: 'Gestione delle Relazioni',
    description: 'L\u201980% del successo nasce dalla gestione delle relazioni. Non perdere le persone. Questo \u00e8 il vero talento che l\u2019analisi del comportamento sviluppa.',
  },
  {
    icon: Target,
    title: 'Comunicazione Efficace',
    description: 'Comunicare non \u00e8 parlare. \u00c8 far arrivare un messaggio che l\u2019altro sente suo. L\u2019analisi del comportamento rende la comunicazione precisa e autentica.',
  },
  {
    icon: Compass,
    title: 'Leadership Consapevole',
    description: 'Il leader pi\u00f9 efficace non \u00e8 il pi\u00f9 esperto. \u00c8 il pi\u00f9 consapevole. Quello che non perde lucidit\u00e0, non cede alla reattivit\u00e0.',
  },
  {
    icon: Handshake,
    title: 'Negoziazione Autentica',
    description: 'La negoziazione non \u00e8 una tecnica: \u00e8 un atto d\u2019amore verso s\u00e9 stessi e verso gli altri. Si vince insieme, sempre.',
  },
]

const credentials = [
  {
    icon: GraduationCap,
    title: 'Docenza Universitaria',
    description: 'Insegna all\u2019universit\u00e0 \u201cNegoziazione e Analisi Del Comportamento\u201d',
  },
  {
    icon: BookOpen,
    title: 'Ricerca Scientifica',
    description: 'Pubblica ricerche scientifiche su ResearchGate in ambito comportamentale',
  },
  {
    icon: BarChart3,
    title: 'Formazione Accreditata',
    description: 'Formatore accreditato in Regione Lombardia per professionisti e manager',
  },
]

export default function AnalisiComportamentoPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pb-20 lg:pt-40 lg:pb-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,rgba(107,155,174,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(107,155,174,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <FadeIn>
              <div className="inline-flex items-center gap-2 bg-navy/5 border border-navy/10 rounded-full px-5 py-2 mb-6 md:mb-8">
                <Brain size={18} className="text-navy/60" />
                <span className="text-navy/60 text-sm font-medium">
                  Psicologia &middot; Neuroscienze &middot; Scienze Cognitive
                </span>
              </div>
            </FadeIn>

            <TextReveal className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-navy mb-6 md:mb-8 leading-tight">
              Analisi del Comportamento
            </TextReveal>

            <FadeIn delay={0.3}>
              <p className="text-base md:text-xl lg:text-2xl text-navy/80 leading-relaxed mb-6 md:mb-8">
                <strong className="text-teal">Capire le persone per guidarle meglio.</strong>{' '}
                L&apos;analisi del comportamento &egrave; lo strumento scientifico
                che trasforma l&apos;intuizione in competenza e la sensibilit&agrave;
                in un superpotere manageriale.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="text-base md:text-lg text-navy/60 leading-relaxed">
                Luca non insegna teorie. Luca prima vive sperimentando in prima persona,
                poi ricerca modelli scientifici capaci di interpretare i processi
                e solo dopo aver trovato una soluzione valida, la condivide nei suoi percorsi formativi.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Three Areas */}
      <section className="py-16 md:py-24 lg:py-32 bg-navy-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-40 left-10 w-80 h-80 bg-teal/5 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-10 w-96 h-96 bg-coral/5 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <FadeIn>
              <span className="inline-block text-teal text-sm font-medium uppercase tracking-[0.3em] mb-4">
                Le Basi Scientifiche
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                Tre discipline,{' '}
                <span className="bg-gradient-to-r from-teal via-teal-light to-coral bg-clip-text text-transparent">
                  un metodo
                </span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto">
                L&apos;analisi del comportamento nasce dall&apos;intersezione di tre mondi scientifici
                che, insieme, offrono una visione completa dell&apos;essere umano.
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {areas.map((area, index) => (
              <FadeIn key={area.title} delay={index * 0.15}>
                <div className="group h-full">
                  <div className="relative h-full bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:border-teal/30 transition-all duration-500 overflow-hidden hover:bg-white/[0.08]">
                    <div className="absolute -inset-1 bg-gradient-to-r from-teal/20 via-coral/10 to-teal/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="relative z-10">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center mb-5 md:mb-6 shadow-lg">
                        <area.icon size={28} className="text-white md:w-8 md:h-8" />
                      </div>

                      <h3 className="font-serif text-2xl md:text-3xl text-white font-bold mb-3 md:mb-4 group-hover:text-teal-light transition-colors duration-300">
                        {area.title}
                      </h3>

                      <p className="text-white/70 text-sm md:text-base leading-relaxed">
                        {area.description}
                      </p>
                    </div>

                    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-teal/20 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-coral/20 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Quote
        text="La sensibilit\u00e0 \u00e8 un superpotere manageriale. E si allena."
        author="Luca Pellicari"
        variant="light"
      />

      {/* Competencies */}
      <section className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 bg-teal/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-coral/5 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <FadeIn>
              <span className="inline-block text-teal text-sm font-medium uppercase tracking-[0.3em] mb-4">
                Le Competenze
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4 md:mb-6">
                Cosa sviluppi con l&apos;analisi
              </h2>
            </FadeIn>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {competencies.map((item, index) => (
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

      {/* Credentials */}
      <section className="py-16 md:py-24 lg:py-32 bg-navy-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal/5 rounded-full blur-[120px]" />
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <FadeIn>
              <span className="inline-block text-gold text-sm font-medium uppercase tracking-[0.3em] mb-4">
                Credibilit&agrave; e Competenza
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
                Esperienza + Conoscenza ={' '}
                <span className="bg-gradient-to-r from-gold to-coral bg-clip-text text-transparent">
                  Credibilit&agrave;
                </span>
              </h2>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            {credentials.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.1}>
                <div className="group text-center">
                  <div className="relative mx-auto mb-5 md:mb-6">
                    <div className="w-18 h-18 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-gold/20 to-gold/10 border-2 border-gold/30 flex items-center justify-center mx-auto group-hover:border-gold group-hover:from-gold group-hover:to-coral transition-all duration-500">
                      <item.icon size={28} className="text-gold group-hover:text-white transition-colors duration-500 md:w-8 md:h-8" />
                    </div>
                  </div>
                  <h3 className="font-serif text-lg md:text-xl text-white font-semibold mb-2 md:mb-3 group-hover:text-gold transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div className="text-center mt-10 md:mt-12">
              <Link
                href="/chi-sono"
                className="group inline-flex items-center gap-3 bg-teal text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-medium shadow-lg shadow-teal/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Scopri la mia storia</span>
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
