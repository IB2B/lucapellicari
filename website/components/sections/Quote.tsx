'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { TextReveal } from '@/components/animations/TextReveal'

interface QuoteProps {
  text: string
  author?: string
  className?: string
  variant?: 'dark' | 'light'
}

export function Quote({ text, author, className, variant = 'dark' }: QuoteProps) {
  const ref = useRef<HTMLDivElement>(null)

  const isDark = variant === 'dark'

  return (
    <section
      ref={ref}
      className={`py-20 lg:py-28 ${isDark ? 'bg-navy-dark' : 'bg-white'} relative overflow-hidden ${className}`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-teal blur-3xl" />
      </div>

      <motion.div
        className="container-custom relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            className="text-teal text-8xl font-serif leading-none block mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.2, y: 0 }}
            viewport={{ once: true }}
          >
            &ldquo;
          </motion.span>

          <TextReveal className={`font-serif text-3xl md:text-4xl lg:text-5xl leading-relaxed italic ${isDark ? 'text-white' : 'text-navy'}`}>
            {text}
          </TextReveal>

          {author && (
            <motion.p
              className="mt-12 text-teal font-medium text-lg"
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
