'use client'

import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FadeIn } from '@/components/animations/FadeIn'
import { Compass, Eye, Shield } from 'lucide-react'

const threeV = [
  {
    icon: Compass,
    title: 'Valori',
    subtitle: 'Le fondamenta',
    description:
      'I valori sono il terreno su cui costruisci la tua identità. Sono la bussola che ti orienta quando tutto sembra incerto. Rispetto, educazione, eleganza, amore per sé stessi e per gli altri.',
    color: 'from-gold to-gold-light',
  },
  {
    icon: Eye,
    title: 'Visione',
    subtitle: 'La direzione',
    description:
      'La visione è la stella polare della tua vita. È dove vuoi arrivare, chi vuoi diventare. Ricchezza, Bellezza, Condivisione. Trasformare passioni in professioni. Creare ricchezza che diventa amore.',
    color: 'from-copper to-copper-light',
  },
  {
    icon: Shield,
    title: 'Verità',
    subtitle: 'Il centro',
    description:
      'La verità non si racconta: si è. È la coerenza tra ciò che senti, ciò che dici e ciò che fai. Il coraggio di guardare in faccia le proprie ombre e restare comunque in piedi.',
    color: 'from-gold-dark to-gold',
  },
]

const threeR = [
  {
    title: 'Riconoscimento',
    description: 'Conoscere me stesso. Sono coraggio, coerenza e visione.',
  },
  {
    title: 'Riconoscibilità',
    description: 'Le persone mi vogliono bene. Mi cercano. Vivono bene con me.',
  },
  {
    title: 'Riconoscenza',
    description: 'Ogni mattina ringrazio. La gratitudine è il mio motore quantico.',
  },
]

export function ThreeV() {
  return (
    <section className="py-24 lg:py-32 bg-dark">
      <div className="container-custom">
        {/* 3V Section */}
        <SectionHeading
          subtitle="Il Mio Codice"
          title="Le Tre V"
          description="Il codice d'identità che guida ogni mia scelta, ogni mia azione, ogni mio insegnamento."
        />

        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {threeV.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.15}>
              <motion.div
                className="relative bg-dark-surface rounded-xl p-8 border border-dark-lighter overflow-hidden group"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-xl bg-gradient-gold flex items-center justify-center mb-6">
                    <item.icon size={32} className="text-dark" />
                  </div>

                  <span className="text-gold text-sm font-medium uppercase tracking-wider">
                    {item.subtitle}
                  </span>
                  <h3 className="font-serif text-3xl text-light-surface font-bold mt-2 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-light-surface/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* 3R Section */}
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-gold text-sm font-medium uppercase tracking-[0.3em] mb-4">
                La Mia Identità Relazionale
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-light-surface font-bold">
                Le Tre R
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {threeR.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.1}>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-dark-surface border-2 border-gold flex items-center justify-center mx-auto mb-6">
                    <span className="font-serif text-3xl text-gold font-bold">
                      R{index + 1}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-light-surface font-semibold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-light-surface/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
