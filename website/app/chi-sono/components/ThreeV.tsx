'use client'

import { motion } from 'framer-motion'
import { Compass, Eye, Shield, Heart, Sparkles, Target } from 'lucide-react'

const threeV = [
  {
    icon: Compass,
    title: 'Valori',
    subtitle: 'Le fondamenta',
    description:
      'I valori sono il terreno su cui costruisci la tua identità. Sono la bussola che ti orienta quando tutto sembra incerto. Rispetto, educazione, eleganza, amore per sé stessi e per gli altri.',
  },
  {
    icon: Eye,
    title: 'Visione',
    subtitle: 'La direzione',
    description:
      'La mia visione è semplice, enorme e luminosa: Ricchezza, Bellezza, Condivisione. Trasformare passioni in professioni. Portare identità nelle aziende. Creare ricchezza che diventa amore.',
  },
  {
    icon: Shield,
    title: 'Verità',
    subtitle: 'Il centro',
    description:
      'Io non sono resiliente. Io sono coraggioso. Io non rimbalzo. Io attraverso. La verità non si racconta: si è. È la coerenza tra ciò che senti, ciò che dici e ciò che fai.',
  },
]

const threeR = [
  {
    icon: Heart,
    title: 'Riconoscimento',
    description: 'Conoscere me stesso. Sono coraggio, coerenza e visione.',
  },
  {
    icon: Sparkles,
    title: 'Riconoscibilità',
    description: 'Le persone mi vogliono bene. Mi cercano. Ridono con me. Vivono bene con me.',
  },
  {
    icon: Target,
    title: 'Riconoscenza',
    description: 'Ogni mattina ringrazio San Michele, il mio arcangelo. La gratitudine è il mio motore quantico.',
  },
]

export function ThreeV() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-navy-dark via-navy to-navy-dark relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-10 w-80 h-80 bg-teal/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-coral/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-teal/3 to-transparent rounded-full" />
      </div>

      <div className="container-custom relative z-10">
        {/* 3V Section Header */}
        <div className="text-center mb-16">
          <motion.span
            className="inline-block text-teal text-sm font-medium uppercase tracking-[0.3em] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Il Mio Codice
          </motion.span>
          <motion.h2
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Le Tre{' '}
            <span className="bg-gradient-to-r from-teal via-teal-light to-coral bg-clip-text text-transparent">
              V
            </span>
          </motion.h2>
          <motion.p
            className="text-white/70 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Il codice d'identità che guida ogni mia scelta, ogni mia azione, ogni mio insegnamento.
          </motion.p>
        </div>

        {/* 3V Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {threeV.map((item, index) => (
            <motion.div
              key={item.title}
              className="group h-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1] as const
              }}
            >
              <div className="relative h-full bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-teal/30 transition-all duration-500 overflow-hidden hover:bg-white/[0.08]">
                {/* Hover glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-teal/20 via-coral/10 to-teal/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center mb-6 shadow-lg">
                    <item.icon size={32} className="text-white" />
                  </div>

                  {/* Subtitle */}
                  <span className="text-teal text-sm font-medium uppercase tracking-wider">
                    {item.subtitle}
                  </span>

                  {/* Title */}
                  <h3 className="font-serif text-3xl text-white font-bold mt-2 mb-4 group-hover:text-teal-light transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Decorative corners */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-teal/20 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-coral/20 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3R Section Header */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              className="inline-block text-coral text-sm font-medium uppercase tracking-[0.3em] mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              La Mia Identità Relazionale
            </motion.span>
            <motion.h2
              className="font-serif text-4xl md:text-5xl font-bold text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Le Tre{' '}
              <span className="bg-gradient-to-r from-coral to-coral-light bg-clip-text text-transparent">
                R
              </span>
            </motion.h2>
          </div>

          {/* 3R Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {threeR.map((item, index) => (
              <motion.div
                key={item.title}
                className="group text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1] as const
                }}
              >
                {/* Icon Circle */}
                <div className="relative mx-auto mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-coral/20 to-coral/10 border-2 border-coral/30 flex items-center justify-center mx-auto group-hover:border-coral group-hover:from-coral group-hover:to-coral-dark transition-all duration-500">
                    <item.icon size={32} className="text-coral group-hover:text-white transition-colors duration-500" />
                  </div>
                  {/* Pulse effect on hover */}
                  <div className="absolute inset-0 w-20 h-20 rounded-full bg-coral/20 mx-auto opacity-0 group-hover:opacity-100 animate-ping" style={{ animationDuration: '2s' }} />
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl text-white font-semibold mb-3 group-hover:text-coral-light transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Quote */}
        <motion.div
          className="text-center mt-20 pt-16 border-t border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-serif text-2xl lg:text-3xl text-white/80 italic max-w-3xl mx-auto mb-4">
            "Identità + Visione + Verità = Flow"
          </p>
          <p className="text-teal font-medium">Il Metodo In-Flow</p>
        </motion.div>
      </div>
    </section>
  )
}
