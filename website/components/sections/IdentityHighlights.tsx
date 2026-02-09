'use client'

import { motion } from 'framer-motion'
import { FadeIn } from '@/components/animations/FadeIn'
import { Zap, Heart, Sparkles, Target } from 'lucide-react'

const highlights = [
  {
    icon: Zap,
    title: '7 Rinascite',
    description: 'Ogni caduta è stata un salto quantico verso chi sono oggi.',
  },
  {
    icon: Target,
    title: 'Mentalità da Paracadutista',
    description: 'Il coraggio di lanciarsi nel vuoto, sapendo che il paracadute si apre solo se salti.',
  },
  {
    icon: Sparkles,
    title: 'Scienza + Spiritualità + Quantum',
    description: 'Un metodo che unisce rigore scientifico, ricerca interiore e fisica quantistica.',
  },
  {
    icon: Heart,
    title: 'Portatore Sano di Felicità',
    description: 'La felicità non è un traguardo. È una scelta quotidiana che si può imparare.',
  },
]

export function IdentityHighlights() {
  return (
    <section className="py-20 lg:py-28 bg-dark relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/5 blur-[120px] rounded-full" />

      <div className="container-custom relative">
        <FadeIn className="text-center mb-16">
          <span className="inline-block text-gold text-sm font-medium uppercase tracking-[0.3em] mb-4">
            In una parola
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-light-surface">
            Quello che mi definisce
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, index) => (
            <FadeIn key={item.title} delay={0.1 * index}>
              <motion.div
                className="group relative bg-dark-surface rounded-xl p-8 border border-dark-lighter hover:border-gold/30 transition-all duration-500"
                whileHover={{ y: -8 }}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                  <item.icon size={28} className="text-gold" />
                </div>

                {/* Content */}
                <h3 className="font-serif text-xl font-semibold text-light-surface mb-3">
                  {item.title}
                </h3>
                <p className="text-light-surface/70 leading-relaxed">
                  {item.description}
                </p>

                {/* Hover accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-gold opacity-0 group-hover:opacity-100 transition-opacity rounded-b-xl" />
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
