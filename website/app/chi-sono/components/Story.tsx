'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const storyChapters = [
  {
    title: 'Il Paracadutista',
    subtitle: 'Primo Salto Quantico',
    year: '1983',
    content: `Il 3 marzo 1983 divento paracadutista militare. Non lo so ancora, ma quel salto nel vuoto segnerà per sempre il mio modo di vivere. La disciplina. Il coraggio di lanciarsi quando tutto dentro di te urla "fermati". La capacità di mantenere la calma mentre precipiti. E soprattutto: la visione che si apre solo quando sei in caduta libera.`,
  },
  {
    title: 'La Morte e la Rinascita',
    subtitle: 'Secondo Salto Quantico',
    year: '1993',
    content: `Linfoma non Hodgkin. Sei mesi di vita. Avevo trent'anni. La medicina mi dava poche speranze, ma io ho scelto di vivere. Ho scoperto la meditazione trascendentale. Ho imparato che il corpo segue la mente, e la mente segue l'anima. Sono guarito. E da quel giorno, non ho più avuto paura di nulla.`,
  },
  {
    title: 'La Scoperta del Talento',
    subtitle: 'Terzo Salto Quantico',
    year: '2002',
    content: `Incontro Davide Possi. Poi Filomena e Rita Cossu. Entro in Pyramis. E scopro qualcosa che non sapevo di avere: un talento naturale per la gestione delle relazioni. In 12 anni arrivo a gestire 1.100 collaboratori. 100 milioni di euro di fatturato. Ma soprattutto, scopro cosa significa costruire qualcosa che funziona perché le persone ci credono.`,
  },
  {
    title: "L'Incontro che Cambia Tutto",
    subtitle: 'Quarto Salto Quantico',
    year: '2010',
    content: `Lucia Facchinetti entra nella mia vita. Non lo so ancora, ma insieme fonderemo Quantum Academy. Lei vede in me quello che io non riesco ancora a vedere. Mi spinge a formalizzare il mio metodo. A trasformare l'istinto in sistema. L'esperienza in trasmissione.`,
  },
  {
    title: 'Quantum Academy',
    subtitle: 'Quinto Salto Quantico',
    year: '2015',
    content: `Nasce Quantum Academy. Con Lucia e Alberto Lori. È il sogno che non sapevo di sognare. Un luogo dove le persone imparano a riconoscersi. Dove l'identità diventa il punto di partenza, non il punto di arrivo. Dove il cambiamento non è un evento, ma un processo consapevole.`,
  },
  {
    title: 'Alphakom',
    subtitle: 'Sesto Salto Quantico',
    year: '2020',
    content: `Lancio la Scuola degli Alpha Leaders. La leadership, la comunicazione, l'identità professionale: tutto converge in un unico percorso. Per imprenditori, manager, professionisti che vogliono smettere di recitare un ruolo e iniziare a essere chi sono davvero.`,
  },
]

export function Story() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%'])

  return (
    <section ref={containerRef} className="py-24 lg:py-32 bg-gradient-to-b from-navy-dark via-navy to-navy-dark relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-coral/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-teal/3 to-transparent rounded-full" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            className="inline-block text-teal text-sm font-medium uppercase tracking-[0.3em] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            La Mia Storia
          </motion.span>
          <motion.h2
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Sette Salti{' '}
            <span className="bg-gradient-to-r from-teal via-teal-light to-coral bg-clip-text text-transparent">
              Quantici
            </span>
          </motion.h2>
          <motion.p
            className="text-white/70 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ogni caduta è stata un salto verso chi sono oggi.
            Questa è la storia di sei trasformazioni che mi hanno reso l'uomo che sono.
          </motion.p>
        </div>

        {/* Steps Timeline */}
        <div className="max-w-5xl mx-auto relative">
          {/* Animated Progress Line */}
          <div className="absolute left-[28px] lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-[2px] bg-white/10">
            <motion.div
              className="w-full bg-gradient-to-b from-teal via-coral to-teal"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline Steps */}
          <div className="space-y-8 lg:space-y-0">
            {storyChapters.map((chapter, index) => (
              <motion.div
                key={chapter.year}
                className={`relative flex flex-col lg:flex-row items-start gap-6 lg:gap-12 lg:min-h-[280px] ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1] as const
                }}
              >
                {/* Step Number Circle */}
                <div className="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 z-20">
                  <div className="relative group">
                    {/* Outer glow ring */}
                    <div className="absolute inset-0 w-14 h-14 rounded-full bg-gradient-to-br from-teal to-coral opacity-50 blur-md group-hover:opacity-80 transition-opacity duration-500" />

                    {/* Main circle */}
                    <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center border-4 border-navy-dark shadow-2xl">
                      <span className="font-serif text-xl font-bold text-white">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Card */}
                <div className={`flex-1 pl-20 lg:pl-0 ${index % 2 === 0 ? 'lg:pr-20' : 'lg:pl-20'}`}>
                  <div className="group relative h-full">
                    {/* Card background glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-teal/20 via-coral/10 to-teal/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Main card - Fixed height for uniformity */}
                    <div className="relative h-full min-h-[220px] bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8 hover:border-teal/30 transition-all duration-500 hover:bg-white/[0.08] flex flex-col">
                      {/* Year badge */}
                      <div className="inline-flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-coral animate-pulse" />
                        <span className="text-coral font-mono text-sm font-semibold tracking-wider">
                          {chapter.year}
                        </span>
                      </div>

                      {/* Subtitle */}
                      <p className="text-teal text-xs uppercase tracking-[0.2em] font-medium mb-2">
                        {chapter.subtitle}
                      </p>

                      {/* Title */}
                      <h3 className="font-serif text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-teal-light transition-colors duration-300">
                        {chapter.title}
                      </h3>

                      {/* Content */}
                      <p className="text-white/70 leading-relaxed text-sm lg:text-base flex-grow">
                        {chapter.content}
                      </p>

                      {/* Decorative corner */}
                      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-teal/20 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-coral/20 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                </div>

                {/* Empty space for alternating layout on desktop */}
                <div className="hidden lg:block flex-1" />
              </motion.div>
            ))}
          </div>

          {/* End marker */}
          <motion.div
            className="absolute left-[28px] lg:left-1/2 lg:-translate-x-1/2 -bottom-4 z-20"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center border-4 border-navy-dark">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom quote */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-serif text-xl lg:text-2xl text-white/80 italic max-w-3xl mx-auto">
            "Il viaggio continua. E il settimo salto? È quello che farò domani."
          </p>
          <p className="text-teal mt-4 font-medium">— Luca Pellicari</p>
        </motion.div>
      </div>
    </section>
  )
}
