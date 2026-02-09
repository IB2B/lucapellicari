'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TextReveal } from '@/components/animations/TextReveal'

interface QuoteProps {
  text: string
  author?: string
  className?: string
  variant?: 'dark' | 'light'
}

export function Quote({ text, author, className, variant = 'dark' }: QuoteProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95])

  const isDark = variant === 'dark'

  return (
    <section
      ref={ref}
      className={`py-24 lg:py-40 ${isDark ? 'bg-dark' : 'bg-light'} relative overflow-hidden ${className}`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold blur-3xl" />
      </div>

      <motion.div
        className="container-custom relative z-10"
        style={{ opacity, scale }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            className="text-gold text-8xl font-serif leading-none block mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.3, y: 0 }}
            viewport={{ once: true }}
          >
            &ldquo;
          </motion.span>

          <TextReveal className={`font-serif text-3xl md:text-4xl lg:text-5xl leading-relaxed italic ${isDark ? 'text-light-surface' : 'text-dark'}`}>
            {text}
          </TextReveal>

          {author && (
            <motion.p
              className="mt-12 text-gold font-medium text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              — {author}
            </motion.p>
          )}
        </div>
      </motion.div>
    </section>
  )
}
