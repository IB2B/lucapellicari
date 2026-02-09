'use client'

import { motion } from 'framer-motion'
import { FadeIn } from '@/components/animations/FadeIn'
import { TextReveal } from '@/components/animations/TextReveal'

const storyChapters = [
  {
    title: 'Primo Salto: Il Paracadutista',
    year: '1983',
    content: `Il 3 marzo 1983 divento paracadutista militare. Non lo so ancora, ma quel salto nel vuoto segnerà per sempre il mio modo di vivere. La disciplina. Il coraggio di lanciarsi quando tutto dentro di te urla "fermati". La capacità di mantenere la calma mentre precipiti. E soprattutto: la visione che si apre solo quando sei in caduta libera.`,
  },
  {
    title: 'Secondo Salto: La Morte e la Rinascita',
    year: '1993',
    content: `Linfoma non Hodgkin. Sei mesi di vita. Avevo trent'anni. La medicina mi dava poche speranze, ma io ho scelto di vivere. Ho scoperto la meditazione trascendentale. Ho imparato che il corpo segue la mente, e la mente segue l'anima. Sono guarito. E da quel giorno, non ho più avuto paura di nulla.`,
  },
  {
    title: 'Terzo Salto: La Scoperta del Talento',
    year: '2002',
    content: `Incontro Davide Possi. Poi Filomena e Rita Cossu. Entro in Pyramis. E scopro qualcosa che non sapevo di avere: un talento naturale per la gestione delle relazioni. In 12 anni arrivo a gestire 1.100 collaboratori. 100 milioni di euro di fatturato. Ma soprattutto, scopro cosa significa costruire qualcosa che funziona perché le persone ci credono.`,
  },
  {
    title: "Quarto Salto: L'Incontro che Cambia Tutto",
    year: '2010',
    content: `Lucia Facchinetti entra nella mia vita. Non lo so ancora, ma insieme fonderemo Quantum Academy. Lei vede in me quello che io non riesco ancora a vedere. Mi spinge a formalizzare il mio metodo. A trasformare l'istinto in sistema. L'esperienza in trasmissione.`,
  },
  {
    title: 'Quinto Salto: Quantum Academy',
    year: '2015',
    content: `Nasce Quantum Academy. Con Lucia e Alberto Lori. È il sogno che non sapevo di sognare. Un luogo dove le persone imparano a riconoscersi. Dove l'identità diventa il punto di partenza, non il punto di arrivo. Dove il cambiamento non è un evento, ma un processo consapevole.`,
  },
  {
    title: 'Sesto Salto: Alphakom',
    year: '2020',
    content: `Lancio la Scuola degli Alpha Leaders. La leadership, la comunicazione, l'identità professionale: tutto converge in un unico percorso. Per imprenditori, manager, professionisti che vogliono smettere di recitare un ruolo e iniziare a essere chi sono davvero.`,
  },
  {
    title: 'Settimo Salto: La Laurea e Nuovi Orizzonti',
    year: '2023',
    content: `A 60 anni mi laureo in Scienze Politiche con 110 e lode. Non per il titolo. Per dimostrare a me stesso che non si smette mai di crescere. E per preparare il terreno a nuovi progetti. Nuovi libri. Nuove sfide. Il viaggio continua.`,
  },
]

export function Story() {
  return (
    <section className="py-24 lg:py-32 bg-dark-surface">
      <div className="container-custom">
        <FadeIn className="text-center mb-20">
          <span className="inline-block text-gold text-sm font-medium uppercase tracking-[0.3em] mb-4">
            La Mia Storia
          </span>
          <TextReveal className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-light-surface mb-6">
            Sette Salti Quantici
          </TextReveal>
          <p className="text-light-surface/70 text-lg max-w-2xl mx-auto">
            Ogni caduta è stata un salto verso chi sono oggi.
            Questa è la storia di sette trasformazioni che mi hanno reso l'uomo che sono.
          </p>
        </FadeIn>

        <div className="max-w-4xl mx-auto">
          {storyChapters.map((chapter, index) => (
            <FadeIn key={chapter.year} delay={0.1 * index}>
              <motion.div
                className="relative pl-8 lg:pl-12 pb-16 last:pb-0 border-l-2 border-gold/30 last:border-l-0"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-0 w-4 h-4 bg-gold rounded-full -translate-x-1/2 shadow-glow" />

                {/* Year badge */}
                <div className="inline-block bg-gold/20 text-gold px-4 py-1 rounded-full text-sm font-medium mb-4">
                  {chapter.year}
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl lg:text-3xl font-bold text-light-surface mb-4">
                  {chapter.title}
                </h3>

                {/* Content */}
                <p className="text-light-surface/80 text-lg leading-relaxed">
                  {chapter.content}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
