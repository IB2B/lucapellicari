'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { TextReveal } from '@/components/animations/TextReveal'
import { FadeIn } from '@/components/animations/FadeIn'
import { Button } from '@/components/ui/Button'
import { CTA } from '@/components/sections/CTA'
import { Quote } from '@/components/sections/Quote'
import { BookOpen, Sparkles, Heart, Brain } from 'lucide-react'

const books = [
  {
    title: 'In-Flow',
    subtitle: 'Il Metodo',
    description:
      'Il libro che racchiude tutta la mia filosofia e il metodo che ho sviluppato in oltre 30 anni di esperienza. Identità + Visione + Verità = Flow. Un percorso pratico per entrare nel tuo stato naturale di eccellenza.',
    image: '/images/book-inflow.jpg',
    blurDataURL: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAcDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAHRAAAQQCAwAAAAAAAAAAAAAAAQACBBEDBQYTUf/EABUBAQEAAAAAAAAAAAAAAAAAAAID/8QAFhEBAQEAAAAAAAAAAAAAAAAAAQAh/9oADAMBAAIRAxEAPwDDt0deeMRIsFju3G68rj6ihOcbAs0iA1U2/9k=',
    icon: Sparkles,
    featured: true,
    highlights: ['Identità + Visione + Verità', 'Il metodo completo In-Flow', '30+ anni di esperienza'],
  },
  {
    title: 'Oltre la diagnosi',
    subtitle: 'Storia di una rinascita',
    description:
      'La mia storia di sopravvivenza al linfoma non Hodgkin. Sei mesi di vita, trent\'anni dopo sono ancora qui. Come la malattia è diventata il mio più grande maestro e la meditazione trascendentale la mia medicina.',
    image: '/images/book-diagnosi.jpg',
    blurDataURL: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAcDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAYH/8QAHRAAAgEEAwAAAAAAAAAAAAAAAQIABAUGEQczcf/EABUBAQEAAAAAAAAAAAAAAAAAAAED/8QAGREBAAIDAAAAAAAAAAAAAAAAAQAxAgMR/9oADAMBAAIRAxEAPwCfyPk/Eb3TO1VaiC7Aq2jsaiYKOkexHq3JmjEqf//Z',
    icon: Heart,
    featured: false,
    highlights: ['Una storia vera di rinascita', 'Meditazione e guarigione', 'Il coraggio di vivere'],
  },
  {
    title: 'La Guida alla Metaquantistica',
    subtitle: 'Coscienza applicata',
    description:
      'Un viaggio nella metaquantistica: come la coscienza influenza la realtà e come puoi usare questa conoscenza nella vita quotidiana. La scienza della consapevolezza applicata alla trasformazione personale.',
    image: '/images/book-metaquantistica.jpg',
    blurDataURL: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAYDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAQH/8QAHhAAAgEDBQAAAAAAAAAAAAAAAQIAAwQFBhEzQXH/xAAUAQEAAAAAAAAAAAAAAAAAAAAB/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAEhEf/aAAwDAQACEQMRAD8Az+rjLFNP40KVrsRuw7ESHE8C+RGKA3p//9k=',
    icon: Brain,
    featured: false,
    highlights: ['Coscienza e realtà', 'Applicazioni pratiche', 'Trasformazione quantistica'],
  },
]

export default function LibriPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-coral/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-teal/5 blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <span className="inline-block text-teal text-sm font-medium uppercase tracking-[0.3em] mb-6">
                I Miei Libri
              </span>
            </FadeIn>

            <TextReveal className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-8 leading-tight">
              Storie vere. Identità vere.
            </TextReveal>

            <FadeIn delay={0.4}>
              <p className="text-xl md:text-2xl text-navy/80 leading-relaxed">
                Scrivo per raccontare, per comprendere e per far vibrare qualcosa
                dentro chi legge. Ogni libro è un pezzo della mia anima condiviso
                con chi cerca risposte.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Books */}
      {books.map((book, index) => {
        const isEven = index % 2 === 0
        const isDark = !isEven
        const IconComponent = book.icon

        return (
          <section
            key={book.title}
            className={`py-24 lg:py-32 relative overflow-hidden ${
              isDark ? 'bg-navy-dark' : 'bg-white'
            }`}
          >
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none">
              {isDark ? (
                <>
                  <div className="absolute top-20 right-10 w-72 h-72 bg-teal/5 rounded-full blur-3xl" />
                  <div className="absolute bottom-20 left-10 w-96 h-96 bg-coral/5 rounded-full blur-3xl" />
                </>
              ) : (
                <>
                  <div className="absolute top-20 left-10 w-72 h-72 bg-teal/5 rounded-full blur-3xl" />
                  <div className="absolute bottom-20 right-10 w-96 h-96 bg-coral/5 rounded-full blur-3xl" />
                </>
              )}
            </div>

            <div className="container-custom relative z-10">
              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                isEven ? '' : 'lg:[direction:rtl]'
              }`}>
                {/* Book Image */}
                <FadeIn direction={isEven ? 'left' : 'right'}>
                  <div className="lg:[direction:ltr]">
                    <div className="relative max-w-md mx-auto group">
                      {/* Glow effect behind the image */}
                      <div className={`absolute -inset-4 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 ${
                        isDark
                          ? 'bg-gradient-to-br from-gold to-coral'
                          : 'bg-gradient-to-br from-teal to-teal-dark'
                      }`} />

                      {/* Book image container */}
                      <motion.div
                        className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                        whileHover={{ y: -8 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <div className="relative aspect-[3/4]">
                          <Image
                            src={book.image}
                            alt={`${book.title} - ${book.subtitle}`}
                            fill
                            className="object-cover"
                            quality={60}
                            sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 400px"
                            loading={index === 0 ? 'eager' : 'lazy'}
                            priority={index === 0}
                            placeholder="blur"
                            blurDataURL={book.blurDataURL}
                          />
                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        </div>

                        {/* Book title overlay at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                          <p className="font-serif text-2xl lg:text-3xl text-white font-bold drop-shadow-lg">
                            {book.title}
                          </p>
                          <p className="text-white/80 text-sm mt-1 drop-shadow">
                            {book.subtitle}
                          </p>
                        </div>
                      </motion.div>

                      {/* Featured badge */}
                      {book.featured && (
                        <motion.div
                          className="absolute -top-3 -right-3 z-10"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5, duration: 0.4 }}
                        >
                          <span className="inline-flex items-center gap-1.5 bg-gold text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-lg">
                            <BookOpen size={14} />
                            In evidenza
                          </span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </FadeIn>

                {/* Book Info */}
                <div className="lg:[direction:ltr]">
                  <FadeIn delay={0.1}>
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                      isDark
                        ? 'bg-gold/20 text-gold'
                        : 'bg-teal/10 text-teal'
                    }`}>
                      <IconComponent size={28} />
                    </div>
                  </FadeIn>

                  <FadeIn delay={0.15}>
                    <span className={`text-sm font-medium uppercase tracking-[0.2em] block mb-3 ${
                      isDark ? 'text-gold' : 'text-teal'
                    }`}>
                      {book.subtitle}
                    </span>
                  </FadeIn>

                  <FadeIn delay={0.2}>
                    <h2 className={`font-serif text-4xl md:text-5xl font-bold mb-6 ${
                      isDark ? 'text-white' : 'text-navy'
                    }`}>
                      {book.title}
                    </h2>
                  </FadeIn>

                  <FadeIn delay={0.25}>
                    <p className={`text-lg leading-relaxed mb-8 ${
                      isDark ? 'text-white/70' : 'text-navy/70'
                    }`}>
                      {book.description}
                    </p>
                  </FadeIn>

                  {/* Highlights */}
                  <FadeIn delay={0.3}>
                    <div className="space-y-3 mb-10">
                      {book.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                            isDark ? 'bg-gold' : 'bg-teal'
                          }`} />
                          <span className={`text-base ${
                            isDark ? 'text-white/80' : 'text-navy/80'
                          }`}>
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </FadeIn>

                  <FadeIn delay={0.35}>
                    <div className="flex flex-wrap gap-4">
                      <Button
                        href="/contatti"
                        variant={isDark ? 'primary' : 'primary'}
                        arrow
                      >
                        Richiedi informazioni
                      </Button>
                    </div>
                  </FadeIn>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* Quote */}
      <Quote
        text="Scrivo perché le parole sono ponti. Collegano la mia esperienza alla tua ricerca. E in quel collegamento nasce qualcosa di nuovo."
        author="Luca Pellicari"
      />

      {/* CTA */}
      <CTA />
    </>
  )
}
