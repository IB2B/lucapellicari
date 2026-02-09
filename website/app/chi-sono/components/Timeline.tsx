'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FadeIn } from '@/components/animations/FadeIn'
import { TIMELINE_EVENTS } from '@/lib/constants'

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section ref={containerRef} className="py-24 lg:py-32 bg-dark-surface">
      <div className="container-custom">
        <SectionHeading
          subtitle="Il Mio Percorso"
          title="I sette salti quantici"
          description="Ogni caduta è stata una rinascita. Ogni ostacolo, una porta verso una versione più autentica di me stesso."
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Animated line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-dark-lighter">
            <motion.div
              className="w-full bg-gradient-to-b from-gold to-copper"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline events */}
          <div className="space-y-16">
            {TIMELINE_EVENTS.map((event, index) => (
              <FadeIn
                key={event.year}
                direction={index % 2 === 0 ? 'left' : 'right'}
                delay={index * 0.1}
              >
                <div
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Year bubble */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gold flex items-center justify-center z-10">
                    <span className="font-serif text-dark font-bold text-sm">
                      {event.year}
                    </span>
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 pl-24 md:pl-0 ${
                      index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'
                    }`}
                  >
                    <div className="bg-dark rounded-lg p-6 border border-dark-lighter hover:border-gold/30 transition-colors">
                      <h3 className="font-serif text-2xl text-light-surface font-semibold mb-3">
                        {event.title}
                      </h3>
                      <p className="text-light-surface/70 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
