'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { FadeIn } from '@/components/animations/FadeIn'
import { ParallaxImage } from '@/components/animations/ParallaxImage'

export function AboutPreview() {
  return (
    <section className="py-24 lg:py-32 bg-dark">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Column */}
          <FadeIn direction="left" className="order-2 lg:order-1">
            <div className="relative">
              {/* Main Image */}
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
                <ParallaxImage
                  src="/images/luca-portrait.jpg"
                  alt="Luca Pellicari"
                  className="rounded-lg"
                  priority
                />
              </div>

              {/* Floating Card */}
              <motion.div
                className="absolute -bottom-8 -right-8 bg-dark-surface border border-gold/30 rounded-lg p-6 shadow-glow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <p className="font-serif text-2xl text-gold italic">
                  &ldquo;7 rinascite&rdquo;
                </p>
                <p className="text-light-surface/70 mt-2">
                  Una vita di trasformazioni
                </p>
              </motion.div>
            </div>
          </FadeIn>

          {/* Content Column */}
          <div className="order-1 lg:order-2">
            <SectionHeading
              subtitle="Chi Sono"
              title="Un uomo che ha attraversato i propri inferi"
              align="left"
              description="Non sono un formatore. Non sono un motivatore. Non sono un guru. Sono un uomo che ha scelto di tornare indietro con qualcosa da donare."
            />

            <FadeIn delay={0.4}>
              <div className="space-y-6 text-light-surface/80 text-lg leading-relaxed mb-8">
                <p>
                  La mia storia non è lineare, non è comoda, non è protetta.
                  È un percorso fatto di <strong className="text-gold">sette rinascite</strong>,
                  di scelte coraggiose, di cadute violentissime e di risalite verticali.
                </p>
                <p>
                  Ho attraversato la malattia, la rinascita, la disciplina del paracadutismo,
                  i fallimenti e la rinascita professionale. Ed è proprio da questo percorso
                  che nasce tutto ciò che oggi insegno.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <Button href="/chi-sono" arrow>
                Scopri la mia storia
              </Button>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
