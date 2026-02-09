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
      {/* Background Image */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <Image
          src="/images/hero-bg.jpg"
          alt="Luca Pellicari"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/50 to-dark" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 container-custom text-center"
        style={{ y, opacity }}
      >
        {/* Main Title */}
        <TextReveal
          className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-light-surface mb-4"
          delay={0.2}
        >
          Adesso siamo qui,
        </TextReveal>

        <TextReveal
          className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6"
          delay={0.4}
        >
          <span className="text-gradient">tu ed io.</span>
        </TextReveal>

        {/* Subtitle */}
        <FadeIn delay={0.6} className="max-w-3xl mx-auto mb-4">
          <p className="text-xl md:text-2xl text-light-surface font-serif italic">
            E sono felice che tu sia arrivato.
          </p>
        </FadeIn>

        {/* The Door */}
        <FadeIn delay={0.8} className="max-w-3xl mx-auto mb-8">
          <p className="text-lg md:text-xl text-light-surface/80 leading-relaxed">
            Questa non è una pagina web. <span className="text-gold">È una porta.</span><br />
            La porta che conduce alla tua identità profonda, alla tua visione, alla tua verità.
          </p>
        </FadeIn>

        {/* Opening Paragraph */}
        <FadeIn delay={1.0} className="max-w-4xl mx-auto mb-10">
          <p className="text-base md:text-lg text-light-surface/70 leading-relaxed">
            Lascia che ti dica una cosa semplice e vera: io non sono un formatore.
            Non sono un motivatore. Non sono un guru. Sono un uomo che ha vissuto
            <span className="text-gold font-semibold"> sette rinascite</span> e che oggi ha scelto
            di mettere tutta la sua esperienza — le ferite, i successi, i fallimenti, le scoperte —
            al servizio delle persone che vogliono finalmente riconoscersi.
          </p>
        </FadeIn>

        {/* Call to Action Text */}
        <FadeIn delay={1.2} className="max-w-3xl mx-auto mb-10">
          <p className="text-base md:text-lg text-light-surface/60 leading-relaxed">
            Se sei qui, se sei arrivato fino a questa riga, è perché una parte di te sente
            che è il momento di andare oltre. Oltre la maschera. Oltre il ruolo. Oltre ciò che fai.
            <span className="text-gold font-medium"> Per incontrare ciò che sei.</span>
          </p>
        </FadeIn>

        {/* CTA Buttons */}
        <FadeIn delay={1.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton>
              <Button href="/chi-sono" size="lg" arrow>
                Scopri chi sono
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button href="/contatti" variant="secondary" size="lg">
                Inizia il viaggio con me
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
        transition={{ delay: 2, duration: 0.6 }}
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
