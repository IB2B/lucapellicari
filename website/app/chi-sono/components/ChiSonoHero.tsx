'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { TextReveal } from '@/components/animations/TextReveal'
import { FadeIn } from '@/components/animations/FadeIn'

export function ChiSonoHero() {
  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gold/20 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <FadeIn>
              <span className="inline-block text-gold text-sm font-medium uppercase tracking-[0.3em] mb-6">
                Chi Sono
              </span>
            </FadeIn>

            <TextReveal className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-light-surface mb-8 leading-tight">
              Non sono un formatore. Sono un uomo che ha attraversato i propri inferi.
            </TextReveal>

            <FadeIn delay={0.4}>
              <p className="text-xl text-light-surface/80 leading-relaxed mb-6">
                Mi chiamo <strong className="text-gold">Luca Pellicari</strong>.
                Non sono un guru, non sono un motivatore da palcoscenico.
                Sono un uomo che ha scelto di tornare indietro per tendere la mano a chi è ancora nel buio.
              </p>
            </FadeIn>

            <FadeIn delay={0.5}>
              <p className="text-xl text-light-surface/80 leading-relaxed mb-6">
                La mia storia non è lineare. Non è comoda. Non è protetta.
                È un percorso fatto di <strong className="text-gold">sette rinascite</strong>,
                di scelte coraggiose, di cadute violentissime e di risalite verticali.
              </p>
            </FadeIn>

            <FadeIn delay={0.6}>
              <p className="text-lg text-light-surface/70 leading-relaxed">
                Ed è proprio da questo percorso — dal linfoma che doveva uccidermi, dal lancio con il paracadute,
                dalla meditazione trascendentale, dal crollo e dalla rinascita — che nasce tutto ciò che oggi insegno.
              </p>
            </FadeIn>
          </div>

          {/* Image */}
          <FadeIn direction="right" className="relative">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
              <Image
                src="/images/luca-portrait-2.jpg"
                alt="Luca Pellicari"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent" />
            </div>

            {/* Quote card */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-gold text-dark p-6 rounded-lg max-w-xs"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <p className="font-serif text-lg italic">
                &ldquo;Trasformare identità, liberare visioni, generare verità.
                Questa è la mia missione.&rdquo;
              </p>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
