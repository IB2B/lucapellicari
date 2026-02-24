'use client'

import { TextReveal } from '@/components/animations/TextReveal'
import { FadeIn } from '@/components/animations/FadeIn'
import { MagneticButton } from '@/components/animations/MagneticButton'
import { Button } from '@/components/ui/Button'

export function CTA() {
  return (
    <section className="py-24 lg:py-32 bg-navy-dark relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-coral/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <span className="inline-block text-teal text-sm font-medium uppercase tracking-[0.3em] mb-6">
              Inizia il tuo viaggio
            </span>
          </FadeIn>

          <TextReveal className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
            Pronto a trasformare la tua vita?
          </TextReveal>

          <FadeIn delay={0.4}>
            <p className="text-xl text-white/70 leading-relaxed mb-12">
              Se sei arrivato fin qui, forse significa solo una cosa:
              che una parte della mia storia parla anche di te.
              Questo è il punto in cui i nostri percorsi si incontrano.
            </p>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton>
                <Button href="/contatti" size="lg" arrow>
                  Contattami
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button href="/quantum-academy" variant="secondary" size="lg">
                  Scopri i percorsi
                </Button>
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
