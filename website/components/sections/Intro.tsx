'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/animations/FadeIn'
import { TextReveal } from '@/components/animations/TextReveal'
import { ParallaxImage } from '@/components/animations/ParallaxImage'
import { Button } from '@/components/ui/Button'

export function Intro() {
  return (
    <section className="py-24 lg:py-32 bg-dark-surface relative overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Column */}
          <FadeIn direction="right" className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <ParallaxImage
                src="/images/luca-portrait.jpg"
                alt="Luca Pellicari"
                speed={0.1}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-6 -right-6 bg-gold text-dark px-6 py-4 rounded-xl shadow-glow"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="font-serif text-2xl font-bold">30+</p>
              <p className="text-sm font-medium">anni di esperienza</p>
            </motion.div>
          </FadeIn>

          {/* Text Column */}
          <div>
            <FadeIn>
              <span className="inline-block text-gold text-sm font-medium uppercase tracking-[0.3em] mb-6">
                Chi sono in breve
              </span>
            </FadeIn>

            <TextReveal className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-light-surface mb-8 leading-tight">
              Sono un uomo che ha imparato a cadere per insegnare a volare.
            </TextReveal>

            <FadeIn delay={0.3}>
              <div className="space-y-6 text-light-surface/80 text-lg leading-relaxed">
                <p>
                  <strong className="text-gold">Identity Coach</strong>, <strong className="text-gold">formatore</strong>,
                  <strong className="text-gold"> speaker</strong> e <strong className="text-gold">scrittore</strong>.
                  Fondatore di <strong className="text-light-surface">Quantum Academy</strong> insieme a
                  Lucia Facchinetti e Alberto Lori.
                </p>
                <p>
                  Ho vissuto <strong className="text-gold">7 rinascite</strong>. Un linfoma che doveva uccidermi.
                  La perdita di tutto ciò che credevo di essere. E ogni volta, sono tornato più forte,
                  più vero, più allineato con chi sono davvero.
                </p>
                <p>
                  Oggi trasformo le persone aiutandole a <strong className="text-light-surface">riconoscersi</strong>.
                  Perché il problema non è mai chi siamo. È che non lo sappiamo ancora.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.5} className="mt-10">
              <Button href="/chi-sono" size="lg" arrow>
                La mia storia completa
              </Button>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
