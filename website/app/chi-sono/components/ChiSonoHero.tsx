'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function ChiSonoHero() {
  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-gradient-to-b from-[#0a1628] via-[#0d1f35] to-[#0a1628] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-teal/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-coral/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <motion.span
              className="inline-block text-teal text-sm font-medium uppercase tracking-[0.3em] mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Chi Sono
            </motion.span>

            <motion.h1
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Siediti un attimo.{' '}
              <span className="bg-gradient-to-r from-teal via-teal-light to-coral bg-clip-text text-transparent">
                Questa è la parte che non racconto mai in pubblico.
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-white/80 leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Mi chiamo <strong className="text-teal">Luca Pellicari</strong> e la verità è che non ho mai vissuto una vita normale.
              La mia storia non è lineare, non è comoda, non è protetta.
            </motion.p>

            <motion.p
              className="text-xl text-white/80 leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              È un percorso fatto di <strong className="text-coral">sette rinascite</strong>, di scelte coraggiose,
              di cadute violentissime e di risalite verticali.
            </motion.p>

            <motion.p
              className="text-lg text-white/60 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Io non sono un formatore. Non sono un motivatore. Non sono un guru.
              Sono un uomo che ha attraversato i propri inferi personali e ha scelto di tornare indietro con qualcosa da donare.
            </motion.p>
          </div>

          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src="/images/luca-portrait-2.jpg"
                alt="Luca Pellicari"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 via-transparent to-transparent" />
            </div>

            {/* Quote card */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-gradient-to-br from-teal to-teal-dark text-white p-6 rounded-2xl max-w-xs shadow-2xl"
              initial={{ opacity: 0, x: -20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="w-8 h-1 bg-white/50 rounded mb-4" />
              <p className="font-serif text-lg italic leading-relaxed">
                "Trasformare identità, liberare visioni, generare verità, creare ricchezza condivisa."
              </p>
              <p className="text-white/70 mt-3 text-sm font-medium">— La mia missione</p>
            </motion.div>

            {/* Decorative corner */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-coral/30 rounded-tr-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
