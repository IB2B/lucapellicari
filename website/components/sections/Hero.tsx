'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TextReveal } from '@/components/animations/TextReveal'
import { FadeIn } from '@/components/animations/FadeIn'
import { MagneticButton } from '@/components/animations/MagneticButton'
import { Button } from '@/components/ui/Button'
import { ArrowDown } from 'lucide-react'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image - Intense photo with zero visual noise */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <Image
          src="/images/hero-bg.jpg"
          alt="Luca Pellicari"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/40 to-dark" />
      </motion.div>

      {/* Content - Emotional gradient: Impact → Connection */}
      <motion.div
        className="relative z-10 container-custom text-center"
        style={{ y, opacity }}
      >
        {/* Main Title - First impact */}
        <TextReveal
          className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-light-surface mb-4"
          delay={0.2}
        >
          Adesso siamo qui,
        </TextReveal>

        <TextReveal
          className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8"
          delay={0.4}
        >
          <span className="text-gradient">tu ed io.</span>
        </TextReveal>

        {/* Subtitle - Connection */}
        <FadeIn delay={0.7} className="max-w-3xl mx-auto mb-6">
          <p className="text-2xl md:text-3xl text-light-surface font-serif italic">
            E sono felice che tu sia arrivato.
          </p>
        </FadeIn>

        {/* The Door - Identification */}
        <FadeIn delay={0.9} className="max-w-2xl mx-auto mb-8">
          <p className="text-xl md:text-2xl text-light-surface/80 leading-relaxed">
            Questa non è una pagina web. <span className="text-gold">È una porta.</span>
          </p>
        </FadeIn>

        {/* Signature Line - Transformation */}
        <FadeIn delay={1.1} className="max-w-3xl mx-auto mb-12">
          <p className="text-lg md:text-xl text-light-surface/70 leading-relaxed">
            Sono <span className="text-gold font-semibold">Luca Pellicari</span>.
            E questo è il viaggio di una vita che cambia la vita.
          </p>
        </FadeIn>

        {/* CTA - Action */}
        <FadeIn delay={1.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton>
              <Button href="/chi-sono" size="lg" arrow>
                Scopri chi sono
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button href="/contatti" variant="secondary" size="lg">
                Inizia il viaggio
              </Button>
            </MagneticButton>
          </div>
        </FadeIn>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-light-surface/50"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}
