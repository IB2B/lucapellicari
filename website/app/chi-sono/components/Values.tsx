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
    description: 'Per me il rispetto è sacro. È il modo in cui entri in una stanza, il tono con cui parli, la cura con cui guardi gli altri. È il fondamento di ogni relazione autentica.'
  },
  {
    icon: Sparkles,
    title: 'Educazione',
    description: "L'eleganza vera non sta nei vestiti, ma nel modo in cui fai sentire l'altra persona. Io credo nell'educazione come forma di bellezza interiore."
  },
  {
    icon: Star,
    title: 'Eleganza & Classe',
    description: 'Il coraggio di essere raffinati anche quando il mondo ti spinge verso la volgarità. La capacità di scegliere la parola giusta, il silenzio giusto, il gesto giusto.'
  },
  {
    icon: Heart,
    title: 'Amore per Sé',
    description: 'Non esiste amore per gli altri senza amore per sé stessi. Non esiste generosità senza radici profonde. Io ho imparato a volermi bene dopo avere rischiato la vita.'
  },
  {
    icon: Eye,
    title: 'Riconoscere il Valore',
    description: 'A me piace vedere le persone brillare. È una mia attitudine naturale: vedo le potenzialità, le intuizioni, il talento. E lo incoraggio. Sempre.'
  },
  {
    icon: Handshake,
    title: 'Stima',
    description: 'La stima è il tessuto delle relazioni sane. Quando la dai, ti elevi. Quando la ricevi, cresci. Si vince insieme, mai uno contro l\'altro.'
  },
  {
    icon: Lightbulb,
    title: 'Credere nei Sogni',
    description: 'Credo nei sogni miei e in quelli degli altri. Perché i sogni non sono favole: sono mappe. E quando le segui con coraggio diventano percorsi.'
  },
  {
    icon: Target,
    title: 'Verità',
    description: 'La verità non si racconta: si è. È la coerenza tra ciò che senti, ciò che dici e ciò che fai. È il coraggio di guardare in faccia le proprie ombre e restare comunque in piedi.'
  },
  {
    icon: Flame,
    title: 'Coraggio',
    description: 'È la mia matrice. È ciò che mi ha salvato la vita sette volte. È la forza di entrare nei luoghi bui della mente sapendo che la luce la porti tu.'
  },
  {
    icon: Scale,
    title: 'Coerenza Interiore',
    description: 'La coerenza per me è una religione. È identità allo stato puro. È vivere secondo i propri valori anche quando costa fatica.'
  },
  {
    icon: Users,
    title: 'Negoziabilità del Cuore',
    description: 'La negoziazione non è una tecnica: è un atto d\'amore verso sé stessi e verso gli altri. Si vince insieme, sempre. Mai uno contro l\'altro.'
  },
  {
    icon: Smile,
    title: 'Felicità',
    description: 'Il mio valore primario: essere un portatore sano di felicità. Farla circolare. Portarla nelle aziende, nelle relazioni, nei progetti, nelle vite.'
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
