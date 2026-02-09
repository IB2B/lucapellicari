'use client'

import { SectionHeading } from '@/components/ui/SectionHeading'
import { FadeIn } from '@/components/animations/FadeIn'
import { VALUES } from '@/lib/constants'
import {
  Heart,
  Shield,
  Sparkles,
  Eye,
  Handshake,
  Lightbulb,
  Flame,
  Target,
  Scale,
  Smile,
  Star,
  Users,
} from 'lucide-react'

const icons = [
  Shield,
  Sparkles,
  Star,
  Heart,
  Handshake,
  Lightbulb,
  Flame,
  Target,
  Scale,
  Smile,
  Eye,
  Users,
]

export function Values() {
  return (
    <section className="py-24 lg:py-32 bg-light section-light">
      <div className="container-custom">
        <SectionHeading
          subtitle="I Miei Valori"
          title="Le fondamenta della mia identità"
          description="I valori non sono parole. Sono ciò che rimane quando la vita ti toglie tutto. Io li ho imparati così: nell'amore, nella sofferenza, nelle rinascite."
          light
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {VALUES.map((value, index) => {
            const Icon = icons[index % icons.length]
            return (
              <FadeIn key={value.title} delay={index * 0.05}>
                <div className="group bg-white rounded-lg p-6 border border-light-darker hover:border-gold/50 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4 text-gold group-hover:bg-gold group-hover:text-dark transition-colors">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-serif text-xl text-dark font-semibold mb-2">
                    {value.title}
                  </h3>
                  <p className="text-dark/70 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
