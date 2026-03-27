'use client'

import { TextReveal } from '@/components/animations/TextReveal'
import { FadeIn } from '@/components/animations/FadeIn'
import { MagneticButton } from '@/components/animations/MagneticButton'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface CTAProps {
  variant?: 'dark' | 'light'
}

export function CTA({ variant = 'dark' }: CTAProps) {
  const isDark = variant === 'dark'

  return (
    <section className={cn(
      "py-24 lg:py-32 relative overflow-hidden",
      isDark ? "bg-navy-dark" : "bg-white"
    )}>
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className={cn(
          "absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl",
          isDark ? "bg-teal/10" : "bg-teal/5"
        )} />
        <div className={cn(
          "absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl",
          isDark ? "bg-coral/10" : "bg-coral/5"
        )} />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <span className="inline-block text-teal text-sm font-medium uppercase tracking-[0.3em] mb-6">
              Inizia il tuo viaggio
            </span>
          </FadeIn>

          <TextReveal className={cn(
            "font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-8",
            isDark ? "text-white" : "text-navy"
          )}>
            Pronto a trasformare la tua vita?
          </TextReveal>

          <FadeIn delay={0.4}>
            <p className={cn(
              "text-xl leading-relaxed mb-12",
              isDark ? "text-white/70" : "text-navy/60"
            )}>
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
                {isDark ? (
                  <Button href="/quantum-academy" variant="secondary" size="lg">
                    Scopri i percorsi
                  </Button>
                ) : (
                  <a
                    href="/quantum-academy"
                    className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium bg-transparent text-navy border-2 border-navy/20 rounded-xl hover:border-teal hover:text-teal transition-all duration-300"
                  >
                    Scopri i percorsi
                  </a>
                )}
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
