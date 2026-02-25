import { Metadata } from 'next'
import { TextReveal } from '@/components/animations/TextReveal'
import { FadeIn } from '@/components/animations/FadeIn'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CTA } from '@/components/sections/CTA'
import { Quote } from '@/components/sections/Quote'

export const metadata: Metadata = {
  title: 'Visione',
  description:
    'La mia visione: costruire una grande scuola di consapevolezza dove chi entra impara a vivere, non solo a lavorare. Ricchezza condivisa, identità, bellezza.',
}

const visionPillars = [
  {
    title: 'Ricchezza Condivisa',
    description:
      'Ricchezza fatta di identità, dignità, valori, bellezza, riconoscimento e amore. Non come accumulo, ma come energia che scorre da chi è consapevole verso chi vuole diventarlo.',
  },
  {
    title: 'Consapevolezza Accessibile',
    description:
      'Un mondo in cui la consapevolezza non è un lusso, ma un diritto. In cui il successo non è una corsa solitaria, ma un viaggio condiviso.',
  },
  {
    title: 'Identità come Conquista',
    description:
      'Un futuro in cui l\'identità non è un mistero, ma una conquista. Dove le persone imparano a guardarsi dentro senza paura.',
  },
]

export default function VisionePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-coral/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-teal/5 blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <span className="inline-block text-teal text-sm font-medium uppercase tracking-[0.3em] mb-6">
                La Mia Visione
              </span>
            </FadeIn>

            <TextReveal className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-8 leading-tight">
              Perché esisto. Perché sono qui. Perché faccio tutto questo.
            </TextReveal>

            <FadeIn delay={0.4}>
              <p className="text-xl md:text-2xl text-navy/80 leading-relaxed">
                Ho una sola visione, ed è limpida come l'aria sottile che respiri
                quando ti lanci da un aereo e capisci che l'unica direzione possibile
                è quella della tua verità.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Main Vision */}
      <section className="py-24 lg:py-32 bg-navy-dark">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <div className="space-y-8 text-light-surface/80 text-xl leading-relaxed">
                <p>
                  La mia visione è <strong className="text-gold">trasformare vite</strong>,
                  non con la teoria, ma con la sostanza profonda di ciò che ho vissuto
                  sulla mia pelle, nelle mie rinascite, nei miei errori, nelle mie vittorie
                  e in tutte le volte in cui ho guardato l'abisso dicendo: «Non oggi.»
                </p>
                <p>
                  Io voglio costruire una <strong className="text-gold">grande scuola di consapevolezza</strong>,
                  un luogo che non assomigli a nulla di quello che hai già visto.
                  Una scuola che parla alla mente degli imprenditori… per poi aprirgli il cuore.
                </p>
                <p>
                  Una scuola dove chi entra lo fa per imparare a negoziare, comunicare, guidare…
                  e finisce per imparare a <strong className="text-gold">vivere</strong>.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <Quote
        text="Vedo un futuro in cui migliaia di persone entrano nei nostri percorsi pensando di imparare una tecnica… e invece imparano sé stesse."
        author="Luca Pellicari"
      />

      {/* Vision Pillars */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container-custom">
          <SectionHeading
            subtitle="I Pilastri"
            title="Questa visione ha un nome"
            light
          />

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {visionPillars.map((pillar, index) => (
              <FadeIn key={pillar.title} delay={index * 0.15}>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-teal/20 to-coral/20 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
                  <div className="relative bg-cream rounded-xl p-8 border border-cream-dark h-full">
                    <span className="text-teal font-serif text-6xl font-bold opacity-20">
                      0{index + 1}
                    </span>
                    <h3 className="font-serif text-2xl text-navy font-bold mt-4 mb-4">
                      {pillar.title}
                    </h3>
                    <p className="text-navy/70 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Final Statement */}
      <section className="py-24 lg:py-32 bg-navy-dark">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <p className="font-serif text-3xl md:text-4xl text-light-surface leading-relaxed italic">
                &ldquo;Io esisto per accendere questa scintilla. Per accompagnare
                chi sente che sta per iniziare il proprio salto quantico.
                Per dare al mondo quella scuola che io avrei voluto incontrare
                trent'anni fa.&rdquo;
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="mt-8 text-gold font-medium text-lg">
                E fino all'ultimo respiro, questa visione sarà la mia strada.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
