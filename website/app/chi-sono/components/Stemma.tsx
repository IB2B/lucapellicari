'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { TextReveal } from '@/components/animations/TextReveal'
import { FadeIn } from '@/components/animations/FadeIn'

export function Stemma() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-teal/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Image */}
          <FadeIn direction="left">
            <div className="relative mx-4 md:mx-0">
              <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/luca-militare-bw.jpg"
                  alt="Luca Pellicari — Paracadutista, le mie origini"
                  fill
                  className="object-cover"
                  quality={75}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
              </div>

              {/* Decorative corners — hidden on mobile */}
              <div className="hidden md:block absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-gold/30 rounded-tr-3xl" />
              <div className="hidden md:block absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-teal/30 rounded-bl-3xl" />

              {/* Floating motto card — repositioned on mobile */}
              <motion.div
                className="absolute -bottom-4 right-2 md:-bottom-6 md:-right-6 bg-gradient-to-br from-navy-dark to-navy text-white p-4 md:p-6 rounded-xl md:rounded-2xl max-w-[180px] md:max-w-[200px] shadow-2xl"
                initial={{ opacity: 0, x: 20, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="w-6 md:w-8 h-1 bg-gold/50 rounded mb-2 md:mb-3" />
                <p className="text-gold font-serif text-lg md:text-xl font-bold tracking-[0.1em] mb-0.5 md:mb-1">ARRMA</p>
                <p className="text-white/60 text-[10px] md:text-xs">Motto di famiglia</p>
              </motion.div>
            </div>
          </FadeIn>

          {/* Content */}
          <div className="mt-4 md:mt-0">
            <FadeIn>
              <span className="inline-block text-teal text-sm font-medium uppercase tracking-[0.3em] mb-4 md:mb-6">
                Le Mie Origini
              </span>
            </FadeIn>

            <TextReveal className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-3 md:mb-4 leading-tight">
              Pellicari.
            </TextReveal>

            <FadeIn delay={0.2}>
              <p className="font-serif text-lg md:text-xl lg:text-2xl text-gold italic mb-6 md:mb-8">
                Dal cimbro &ldquo;Pelecher&rdquo; &mdash; uomo della betulla.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="space-y-4 md:space-y-6 text-navy/70 text-base md:text-lg leading-relaxed">
                <p>
                  A 24 anni scoprii qualcosa di incredibile: il mio cognome, Pellicari, deriva dal cimbro &ldquo;Pelecher&rdquo;.
                  Il mio cognome porta con sé più di <strong className="text-navy">500 anni di storia</strong>.
                  Appartengo a un&apos;antica stirpe oggi riconosciuta come minoranza etnica:{' '}
                  <strong className="text-teal">i Cimbri</strong>, popolo del Nord Europa, dei boschi,
                  della Danimarca e della Germania del Nord.
                </p>
                <p>
                  Quando andai ad Amburgo la prima volta, mi sentii a casa.
                  E capii che non era suggestione: era <strong className="text-teal">memoria genetica</strong>.
                  La mia anima appartiene al Nord Europa, ai boschi, alla Danimarca.
                </p>
                <p>
                  Il simbolo della mia famiglia è una{' '}
                  <strong className="text-teal">fenice bianca</strong> aggredita da oche
                  che le strappano il cuore. E io sono quella fenice.
                  Sono morto e rinato sette volte.
                  Il motto della mia famiglia è <strong className="text-navy">ARRMA</strong> — come la mia identità militare.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-6 md:mt-8 flex flex-wrap gap-2 md:gap-3">
                {[
                  { label: 'Stirpe Cimbra', value: '500+ anni' },
                  { label: 'Simbolo', value: 'Fenice bianca' },
                  { label: 'Rinascite', value: '7 volte' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 md:gap-3 bg-cream rounded-full px-4 md:px-5 py-2 md:py-2.5 border border-cream-dark"
                  >
                    <span className="text-teal font-serif font-bold text-xs md:text-sm">{item.value}</span>
                    <span className="w-px h-3 md:h-4 bg-navy/10" />
                    <span className="text-navy/50 text-[10px] md:text-xs font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
