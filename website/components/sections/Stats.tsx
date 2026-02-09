'use client'

import { FadeIn } from '@/components/animations/FadeIn'
import { Counter } from '@/components/animations/Counter'
import { STATS } from '@/lib/constants'

export function Stats() {
  return (
    <section className="py-20 bg-dark-surface border-y border-dark-lighter">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {STATS.map((stat, index) => (
            <FadeIn
              key={stat.label}
              delay={index * 0.1}
              className="text-center"
            >
              <div className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-gold mb-3">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-light-surface/70 text-lg">{stat.label}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
