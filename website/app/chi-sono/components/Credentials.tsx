'use client'

import { motion } from 'framer-motion'
import { GraduationCap, BookOpen, Award, Cpu, FlaskConical, University } from 'lucide-react'

const credentials = [
  {
    icon: GraduationCap,
    title: 'Laurea in Scienze Politiche',
    detail: '110 e Lode',
    description: 'Un percorso accademico completato con il massimo dei voti, a conferma di una formazione rigorosa e multidisciplinare.',
  },
  {
    icon: University,
    title: 'Docente Universitario',
    detail: 'Negoziazione e Analisi del Comportamento',
    description: 'Insegno all\'università integrando neuroscienze, psicologia applicata e analisi comportamentale nel contesto professionale.',
  },
  {
    icon: FlaskConical,
    title: 'Ricercatore Scientifico',
    detail: 'ResearchGate',
    description: 'Pubblico ricerche scientifiche su comportamento, neuroscienze e psicologia applicata al mondo del lavoro.',
  },
  {
    icon: Award,
    title: 'Accreditamento Regione Lombardia',
    detail: 'Formatore Professionale',
    description: 'Formatore accreditato per percorsi professionali di riqualificazione e sviluppo delle competenze.',
  },
  {
    icon: Cpu,
    title: 'Docente AI & Lavoro',
    detail: 'Corsi Professionali',
    description: 'Tengo corsi di formazione sull\'utilizzo dell\'intelligenza artificiale come strumento per creare opportunità di lavoro futuro.',
  },
  {
    icon: BookOpen,
    title: 'Autore & Speaker',
    detail: '3 Libri Pubblicati',
    description: 'Autore di In-Flow, Oltre la Diagnosi e La Guida alla Metaquantistica. Speaker in eventi e conferenze nazionali.',
  },
]

export function Credentials() {
  return (
    <section className="py-24 lg:py-32 bg-navy-dark relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-teal/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-coral/5 rounded-full blur-3xl" />
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
            Formazione & Ricerca
          </motion.span>
          <motion.h2
            className="font-serif text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Esperienza{' '}
            <span className="bg-gradient-to-r from-teal via-teal-light to-coral bg-clip-text text-transparent">
              + Conoscenza
            </span>
          </motion.h2>
          <motion.p
            className="text-white/70 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Non insegno da manuali. Prima vivo, poi ricerco modelli scientifici,
            poi — solo dopo aver trovato una soluzione valida — la condivido.
          </motion.p>
        </div>

        {/* Credentials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {credentials.map((cred, index) => (
            <motion.div
              key={cred.title}
              className="group h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
            >
              <div className="relative h-full bg-white/5 backdrop-blur-sm rounded-2xl p-7 border border-white/10 hover:border-teal/30 transition-all duration-500 hover:bg-white/[0.08]">
                {/* Hover glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-teal/20 via-transparent to-teal/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center mb-5 shadow-lg">
                    <cred.icon size={24} className="text-white" />
                  </div>

                  {/* Detail badge */}
                  <span className="inline-block text-teal text-xs font-medium uppercase tracking-wider mb-2">
                    {cred.detail}
                  </span>

                  {/* Title */}
                  <h3 className="font-serif text-xl text-white font-bold mb-3 group-hover:text-teal-light transition-colors duration-300">
                    {cred.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 text-sm leading-relaxed">
                    {cred.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-white/50 text-sm italic">
            Affidabilità nasce dall'esperienza. Credibilità nasce dallo studio.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
