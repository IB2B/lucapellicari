'use client'

import { motion } from 'framer-motion'
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

const values = [
  {
    icon: Shield,
    title: 'Rispetto',
    description: 'Il fondamento di ogni relazione autentica. Senza rispetto non esiste connessione vera.'
  },
  {
    icon: Sparkles,
    title: 'Educazione',
    description: "L'eleganza vera è nel modo in cui fai sentire l'altra persona quando è con te."
  },
  {
    icon: Star,
    title: 'Eleganza',
    description: 'Il coraggio di essere raffinati. La bellezza come scelta quotidiana.'
  },
  {
    icon: Eye,
    title: 'Classe',
    description: 'Non è ciò che indossi, è come porti te stesso nel mondo.'
  },
  {
    icon: Heart,
    title: 'Amore per Sé',
    description: 'Non esiste amore per gli altri senza amore per sé stessi. È il punto di partenza.'
  },
  {
    icon: Users,
    title: 'Amore per gli Altri',
    description: 'Vedere il bello nelle persone e aiutarle a vederlo in loro stesse.'
  },
  {
    icon: Target,
    title: 'Verità',
    description: 'La coerenza tra ciò che senti, ciò che dici e ciò che fai. Senza compromessi.'
  },
  {
    icon: Flame,
    title: 'Coraggio',
    description: 'La forza di entrare nei luoghi bui sapendo che la luce la porti tu.'
  },
  {
    icon: Scale,
    title: 'Coerenza',
    description: 'Vivere secondo i propri valori anche quando costa fatica e sacrificio.'
  },
  {
    icon: Handshake,
    title: 'Stima Reciproca',
    description: 'Il tessuto delle relazioni sane. Si vince insieme, mai uno contro l\'altro.'
  },
  {
    icon: Lightbulb,
    title: 'Credere nei Sogni',
    description: 'I sogni non sono favole: sono mappe per chi ha il coraggio di seguirle.'
  },
  {
    icon: Smile,
    title: 'Portare Felicità',
    description: 'Essere un portatore sano di felicità. Ovunque tu vada, lascia luce.'
  },
]

export function Values() {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-teal/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-coral/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            className="inline-block text-teal text-sm font-medium uppercase tracking-[0.3em] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            I Miei Valori
          </motion.span>
          <motion.h2
            className="font-serif text-4xl md:text-5xl font-bold text-navy mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Le fondamenta della{' '}
            <span className="bg-gradient-to-r from-teal to-coral bg-clip-text text-transparent">
              mia identità
            </span>
          </motion.h2>
          <motion.p
            className="text-navy/70 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            I valori non sono parole. Sono ciò che rimane quando la vita ti toglie tutto.
            Io li ho imparati così: nell'amore, nella sofferenza, nelle rinascite.
          </motion.p>
        </div>

        {/* Values Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className="group h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1] as const
              }}
            >
              <div className="relative h-full bg-white rounded-2xl p-6 border border-gray-100 hover:border-teal/30 hover:shadow-xl transition-all duration-500 overflow-hidden">
                {/* Hover glow effect */}
                <div className="absolute -inset-px bg-gradient-to-r from-teal/20 to-coral/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal/10 to-coral/10 flex items-center justify-center mb-5 group-hover:from-teal group-hover:to-teal-dark transition-all duration-500">
                    <value.icon
                      size={26}
                      className="text-teal group-hover:text-white transition-colors duration-500"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl text-navy font-semibold mb-3 group-hover:text-teal transition-colors duration-300">
                    {value.title}
                  </h3>

                  {/* Description */}
                  <p className="text-navy/70 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>

                {/* Decorative corner */}
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-teal/5 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
