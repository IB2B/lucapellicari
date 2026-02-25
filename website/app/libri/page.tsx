import { Metadata } from 'next'
import Image from 'next/image'
import { TextReveal } from '@/components/animations/TextReveal'
import { FadeIn } from '@/components/animations/FadeIn'
import { Button } from '@/components/ui/Button'
import { CTA } from '@/components/sections/CTA'
import { BookOpen, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Libri',
  description:
    'I libri di Luca Pellicari: In-Flow, Oltre la diagnosi, La Guida alla Metaquantistica. Storie vere, identità vere, trasformazioni reali.',
}

const books = [
  {
    title: 'In-Flow',
    subtitle: 'Il Metodo',
    description:
      'Il libro che racchiude tutta la mia filosofia e il metodo che ho sviluppato in oltre 30 anni di esperienza. Identità + Visione + Verità = Flow.',
    image: '/images/book-inflow.jpg',
    featured: true,
  },
  {
    title: 'Oltre la diagnosi',
    subtitle: 'Storia di una rinascita',
    description:
      'La mia storia di sopravvivenza al linfoma. Come la malattia è diventata il mio più grande maestro e la meditazione la mia medicina.',
    image: '/images/book-diagnosi.jpg',
    featured: false,
  },
  {
    title: 'La Guida alla Metaquantistica',
    subtitle: 'Coscienza applicata',
    description:
      'Un viaggio nella metaquantistica: come la coscienza influenza la realtà e come puoi usare questa conoscenza nella vita quotidiana.',
    image: '/images/book-metaquantistica.jpg',
    featured: false,
  },
]

export default function LibriPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <FadeIn>
              <span className="inline-block text-teal text-sm font-medium uppercase tracking-[0.3em] mb-6">
                I Miei Libri
              </span>
            </FadeIn>

            <TextReveal className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-8">
              Storie vere. Identità vere.
            </TextReveal>

            <FadeIn delay={0.3}>
              <p className="text-xl text-navy/80 leading-relaxed">
                Scrivo per raccontare, per comprendere e per far vibrare qualcosa
                dentro chi legge. Ogni libro è un pezzo della mia anima condiviso
                con chi cerca risposte.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-16 lg:py-24 bg-navy-dark">
        <div className="container-custom">
          <div className="space-y-16">
            {books.map((book, index) => (
              <FadeIn key={book.title} delay={index * 0.15}>
                <div
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Book Cover */}
                  <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="relative group perspective">
                      <div className="relative aspect-[3/4] max-w-md mx-auto transform transition-transform duration-500 group-hover:rotate-y-6 preserve-3d">
                        <div className="absolute inset-0 bg-gradient-gold rounded-lg blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                        <div className="relative bg-dark rounded-lg overflow-hidden border border-dark-lighter shadow-2xl">
                          <Image
                            src={book.image}
                            alt={book.title}
                            fill
                            className="object-cover"
                            quality={70}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Book Info */}
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    {book.featured && (
                      <span className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1 mb-6">
                        <BookOpen size={14} className="text-gold" />
                        <span className="text-gold text-xs font-medium uppercase">
                          Più venduto
                        </span>
                      </span>
                    )}
                    <span className="text-gold text-sm font-medium uppercase tracking-wider block mb-2">
                      {book.subtitle}
                    </span>
                    <h2 className="font-serif text-4xl md:text-5xl text-light-surface font-bold mb-6">
                      {book.title}
                    </h2>
                    <p className="text-light-surface/70 text-lg leading-relaxed mb-8">
                      {book.description}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button arrow>
                        Acquista ora
                      </Button>
                      <Button variant="secondary" icon={<ExternalLink size={18} />}>
                        Anteprima
                      </Button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <p className="font-serif text-3xl md:text-4xl text-navy leading-relaxed italic">
                &ldquo;Scrivo perché le parole sono ponti. Collegano la mia esperienza
                alla tua ricerca. E in quel collegamento nasce qualcosa di nuovo.&rdquo;
              </p>
              <p className="mt-8 text-teal font-medium">— Luca Pellicari</p>
            </FadeIn>
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
