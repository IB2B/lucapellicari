'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const storyChapters = [
  {
    title: 'Le Origini',
    subtitle: 'L\'Infanzia e la Scuola',
    year: '1963',
    content: `Sono figlio unico, cresciuto in un bozzolo di amore e vulnerabilità. Ero sempre malato, non ho mai fatto l'asilo. Mio padre tornava ogni giorno con un piccolo regalo — un gesto che ancora oggi porto nel cuore. A cinque anni due interventi chirurgici cambiarono la mia salute. La scuola fu il primo grande salto: una suora meravigliosa, una calligrafia costruita a pennino e inchiostro, e un mondo che cominciava ad aprirsi.`,
  },
  {
    title: 'Il Liceo e la Frattura',
    subtitle: 'La Prima Rinascita',
    year: '1979',
    content: `A 16 anni mi si spezza l'anca. Quarantasei giorni immobile, otto materie non classificate, tutto sembrava perduto. E invece quello è stato il mio primo vero salto identitario: mi sono rialzato con determinazione, ho recuperato l'anno e ho scoperto che avevo molta più forza di quanto credessi. La vita ti spezza solo fino a quando non le dimostri che sei più forte.`,
  },
  {
    title: 'Il Paracadutista',
    subtitle: 'Secondo Salto Quantico',
    year: '1983',
    content: `Il 3 marzo 1983 — 3/3/83 — numerologicamente un portale. Divento paracadutista militare. Ho imparato la disciplina, la libertà dentro le regole, la forza del team, la bellezza del sacrificio. Sono quasi morto due volte: un colpo di vela che quasi mi strappa un orecchio e un malfunzionamento del paracadute al quarto lancio. Non ho mai avuto paura della morte. Perché la morte, per me, è solo una tuta in pelle che si lascia in un armadio.`,
  },
  {
    title: 'La Morte e la Rinascita',
    subtitle: 'Terzo Salto Quantico',
    year: '1993',
    content: `Linfoma non Hodgkin. Sei mesi di vita. Avevo trent'anni. Io non ho avuto paura. Mai. La paura collassa l'onda dell'evento temuto. E io ho sempre scelto la vita. Ho scoperto la meditazione trascendentale, ho incontrato medici ayurvedici straordinari, ho imparato ad ascoltare il mio corpo, a lasciar andare il controllo, a negoziare con il destino. Trentadue anni dopo, sono ancora qui.`,
  },
  {
    title: "L'Errore d'Oro",
    subtitle: 'Quarto Salto Quantico',
    year: '1996',
    content: `Dopo la guarigione faccio la cosa più folle: apro un'azienda che produce scatole di cartone — quando sono allergico alla carta. Sette anni di sacrifici, debiti, lacrime, notti senza dormire. Ma ho pagato tutto fino all'ultima lira. Per rispetto del mio nome e della mia famiglia. È stato l'errore più grande della mia vita. Ed è stato anche uno dei più grandi insegnamenti.`,
  },
  {
    title: 'La Famiglia che Ho Scelto',
    subtitle: 'Quinto Salto Quantico',
    year: '2002',
    content: `Incontro Davide Possi, Filomena e Rita Cossu. Entro in Pyramis in 27 mq. Oggi l'azienda ha superato i 1.100 collaboratori e sfiora i 100 milioni di fatturato. Non ero un bravo venditore. Eppure ho scoperto la mia vera skill: la gestione delle relazioni. Oggi l'80% del fatturato Vodafone Italia, all'interno di Pyramis, nasce dalla gestione dei clienti. Il mio talento: non perdere le persone.`,
  },
  {
    title: "L'Entanglement Sacro",
    subtitle: 'Sesto Salto Quantico',
    year: '2010',
    content: `Lucia Facchinetti entra nella mia vita. Anima, sorella, madre, figlia, compagna di destino. Insieme fondiamo Quantum Academy. Poi arriva Alberto Lori, narratore RAI, voce storica dell'Italia, il mio fratello maggiore. Io, Lucia e Alberto abbiamo un legame quantistico. Pensiamo le stesse cose a chilometri di distanza. Siamo un trio. Un'unità. Una missione.`,
  },
  {
    title: 'Quantum Academy e Alphakom',
    subtitle: 'Settimo Salto Quantico',
    year: '2015',
    content: `Quantum Academy nasce come contenitore per altri formatori. Ma dopo dieci anni capisco la verità: non era nata per loro. Era nata per me, Lucia e Alberto. Era nata per diventare una Scuola di Identità e Consapevolezza. E poi lancio Alphakom — la Scuola degli Alpha Leaders. La leadership, la comunicazione, l'identità professionale: tutto converge nel Metodo In-Flow.`,
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
            Questa è la storia di sette trasformazioni che mi hanno reso l'uomo che sono.
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

        {/* Chi Sono Oggi - Closing */}
        <motion.div
          className="mt-20 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <span className="text-teal text-sm font-medium uppercase tracking-[0.3em]">Chi Sono Oggi</span>
          </div>
          <div className="space-y-2 text-center">
            {[
              'Sono un uomo realizzato e in cammino.',
              'Sono compagno di viaggio di Lucia e Alberto.',
              'Sono fondatore di Quantum Academy.',
              'Sono creatore di Alphakom.',
              'Sono autore, speaker, narratore, formatore.',
              'Sono un portatore sano di felicità.',
              'Sono una fenice cimbra rinata sette volte.',
            ].map((line, i) => (
              <p key={i} className="font-serif text-lg md:text-xl text-white/80 leading-relaxed">{line}</p>
            ))}
          </div>
          <div className="text-center mt-8 pt-8 border-t border-white/10">
            <p className="font-serif text-xl lg:text-2xl text-white/90 italic">
              &ldquo;Sono ciò che ho vissuto. Sono ciò che dono. Sono ciò che amo.&rdquo;
            </p>
            <p className="text-teal mt-4 font-medium">— Luca Pellicari</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
