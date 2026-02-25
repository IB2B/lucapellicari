'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { TextReveal } from '@/components/animations/TextReveal'
import { FadeIn } from '@/components/animations/FadeIn'
import { CTA } from '@/components/sections/CTA'
import { Quote } from '@/components/sections/Quote'
import { Camera } from 'lucide-react'

const galleryImages = [
  {
    src: '/images/gallery-1.jpg',
    alt: 'Luca Pellicari - Cerimonia di riconoscimento ISFOA',
    width: 1200,
    height: 540,
    caption: 'Cerimonia di riconoscimento',
    blurDataURL: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAEAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAfEAABBAEFAQAAAAAAAAAAAAACAAEDBAUREhQkMVH/xAAUAQEAAAAAAAAAAAAAAAAAAAAB/8QAGBEAAgMAAAAAAAAAAAAAAAAAADIBAgP/2gAMAwEAAhEDEQA/AJWdzF6PN8eOchiIdXFlaGzY2t2JfPqImiwOjH//2Q==',
  },
  {
    src: '/images/video-1.jpg',
    alt: 'Luca Pellicari - Sul palco, saluta il pubblico',
    width: 1200,
    height: 1804,
    caption: 'L\'energia del palco',
    blurDataURL: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAcDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAHhAAAgEDBQAAAAAAAAAAAAAAAQIAAxESBBQhMVH/xAAUAQEAAAAAAAAAAAAAAAAAAAAD/8QAGREAAwADAAAAAAAAAAAAAAAAAAEDEUFh/9oADAMBAAIRAxEAPwDE6iU3RVQXYHk+xLOlRdixxF8u7RCc+jquNH//2Q==',
  },
  {
    src: '/images/gallery-5.jpg',
    alt: 'Luca Pellicari - Evento Quantum Academy, Nosce Te Ipsum',
    width: 1200,
    height: 801,
    caption: 'Quantum Academy: Nosce Te Ipsum',
    blurDataURL: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAHAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAYH/8QAHxAAAQMDBQAAAAAAAAAAAAAAAQACBQMREgQGExUh/8QAFAEBAAAAAAAAAAAAAAAAAAAAA//EABkRAQADAQEAAAAAAAAAAAAAAAEAAgMxEf/aAAwDAQACEQMRAD8Ay2Lk5HVbN6s0KPABhnf0BQr4Gq1xAeLA2RELraz4vI5lUBDs/9k=',
  },
  {
    src: '/images/gallery-2.jpg',
    alt: 'Luca Pellicari - Laurea con corona d\'alloro',
    width: 1200,
    height: 2667,
    caption: 'Un traguardo accademico',
    blurDataURL: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAUDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAT/xAAdEAABBAIDAAAAAAAAAAAAAAABAAIDBBExBRIz/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAP/xAAXEQEBAQEAAAAAAAAAAAAAAAABAgAD/9oADAMBAAIRAxEAPwCUNkddtQReULg1mNYwip4EAtsE77oq8oKgpzpTNIb/2Q==',
  },
  {
    src: '/images/quantum-event.jpg',
    alt: 'Luca Pellicari - Quantum Academy evento con panel',
    width: 1200,
    height: 800,
    caption: 'Quantum Academy: il panel',
    blurDataURL: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAHAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAgEAACAQQBBQAAAAAAAAAAAAABAgMABAURIQYHMoHh/8QAFAEBAAAAAAAAAAAAAAAAAAAABP/EABcRAQADAAAAAAAAAAAAAAAAAAEAEVH/2gAMAwEAAhEDEQA/AJzgu4MeA6QlwFpt7eYEMzLzz6qfNaYhmJM82yd+PylKPTrFWYT/2Q==',
  },
  {
    src: '/images/video-2.jpg',
    alt: 'Luca Pellicari - Conferenza, parla al pubblico',
    width: 1200,
    height: 1803,
    caption: 'Parole che trasformano',
    blurDataURL: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAcDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAHRAAAgEEAwAAAAAAAAAAAAAAAQIAAwQTIiExUf/EABQBAQAAAAAAAAAAAAAAAAAAAAP/xAAZEQACAwEAAAAAAAAAAAAAAAAAAQIDETH/2gAMAwEAAhEDEQA/AMcuVDUEQLsDyYl/GmapovfkQnAdWb1H/9k=',
  },
  {
    src: '/images/gallery-3.jpg',
    alt: 'Luca Pellicari - Skydive Verona paracadutismo',
    width: 1200,
    height: 707,
    caption: 'Il paracadutista: disciplina e coraggio',
    blurDataURL: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAGAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAQF/8QAHRAAAgIBBQAAAAAAAAAAAAAAAQIAAwQFERIhYf/EABQBAQAAAAAAAAAAAAAAAAAAAAb/xAAXEQADAQAAAAAAAAAAAAAAAAABAhEA/9oADAMBAAIRAxEAPwDX1q2zHxktpchgw39ldd3JFJHZAJiIRZjJkyKCad//2Q==',
  },
  {
    src: '/images/alphakom-event.jpg',
    alt: 'Luca Pellicari - Evento Alphakom',
    width: 1200,
    height: 798,
    caption: 'Alphakom: la scuola degli Alpha Leaders',
    blurDataURL: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAHAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAHBAAAgICAwAAAAAAAAAAAAAAAAECBAMRBRMi/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwT/xAAZEQEAAgMAAAAAAAAAAAAAAAABAAIRIjH/2gAMAwEAAhEDEQA/AMircPkVVT6sclGW22yiqdXS8IACu0oUq8zP/9k=',
  },
  {
    src: '/images/video-3.jpg',
    alt: 'Luca Pellicari - Sul palco a braccia aperte',
    width: 1200,
    height: 1803,
    caption: 'Abbracciare la platea',
    blurDataURL: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAcDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAdEAABAwUBAAAAAAAAAAAAAAABAAIDBAURITFS/8QAFAEBAAAAAAAAAAAAAAAAAAAABP/EABkRAAMAAwAAAAAAAAAAAAAAAAABAwIRYf/aAAwDAQACEQMRAD8AiNHbKOYuYI3nB7hFQbVDGHajZzyERcrPYlQ6f//Z',
  },
  {
    src: '/images/gallery-4.jpg',
    alt: 'Luca Pellicari - Incontro con un amico',
    width: 1200,
    height: 2661,
    caption: 'Relazioni che contano',
    blurDataURL: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAUDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUG/8QAHxAAAQMDBQAAAAAAAAAAAAAAAQACAwQFIQYRMnFy/8QAFQEBAQAAAAAAAAAAAAAAAAAAAgP/xAAXEQEBAQEAAAAAAAAAAAAAAAABAgAR/9oADAMBAAIRAxEAPwCjX6rhuFwqHMgFSxhAEjt847RYGzcZvQRCKlkeatyind//2Q==',
  },
  {
    src: '/images/quantum-team.jpg',
    alt: 'Luca Pellicari - Al lavoro con il team',
    width: 1600,
    height: 1200,
    caption: 'Dietro le quinte: il team',
    blurDataURL: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAHxAAAQQCAgMAAAAAAAAAAAAAAQACAxEEBgUTFDFR/8QAFAEBAAAAAAAAAAAAAAAAAAAABP/EABYRAQEBAAAAAAAAAAAAAAAAABEAMf/aAAwDAQACEQMRAD8AjaNsjvB4zrlEsYNTuPsD4tCduuG1xAx7ANWiIhshwv/Z',
  },
  {
    src: '/images/gallery-6.jpg',
    alt: 'Luca Pellicari - Conferenza sul palco',
    width: 1200,
    height: 1798,
    caption: 'Sul palco, nel mio elemento',
    blurDataURL: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAcDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMH/8QAHxAAAQQBBQEAAAAAAAAAAAAAAgABAxEGBBIHMUHh/8QAFAEBAAAAAAAAAAAAAAAAAAAAA//EABURAQEAAAAAAAAAAAAAAAAAAAEA/9oADAMBAAIRAxEAPwDDyPRBjAxxiZSkbWdeX8ZFXNhaPYMbMA30PDIjCRv/2Q==',
  },
  {
    src: '/images/video-4.jpg',
    alt: 'Luca Pellicari - Ritratto seduto',
    width: 1200,
    height: 1798,
    caption: 'Momenti di riflessione',
    blurDataURL: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAcDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAYH/8QAHRAAAQMFAQAAAAAAAAAAAAAAAQADBQIEERIhBv/EABUBAQEAAAAAAAAAAAAAAAAAAAED/8QAFREBAQAAAAAAAAAAAAAAAAAAAAH/2gAMAwEAAhEDEQA/AMVkYgteOswyzx1zO5pOSiqoMByBtxWNgBwHuERFK//Z',
  },
]

export default function MediaPage() {
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
              <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/30 rounded-full px-6 py-2 mb-8">
                <Camera size={18} className="text-teal" />
                <span className="text-teal text-sm font-medium">
                  Galleria
                </span>
              </div>
            </FadeIn>

            <TextReveal className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-8 leading-tight">
              Momenti catturati
            </TextReveal>

            <FadeIn delay={0.4}>
              <p className="text-xl md:text-2xl text-navy/80 leading-relaxed">
                La mia voce, la mia presenza, i miei momenti più intensi.
                Conferenze, eventi, incontri. Frammenti di un viaggio condiviso.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Masonry Gallery */}
      <section className="py-16 lg:py-24 bg-navy-dark">
        <div className="container-custom">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 lg:gap-6 space-y-4 lg:space-y-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.src}
                className="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Image with natural aspect ratio */}
                <div className="relative">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    quality={60}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading={index < 3 ? 'eager' : 'lazy'}
                    placeholder="blur"
                    blurDataURL={image.blurDataURL}
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Caption on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-white font-serif text-lg font-semibold drop-shadow-lg">
                      {image.caption}
                    </p>
                  </div>

                  {/* Subtle border glow on hover */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gold/30 transition-colors duration-500 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <Quote
        text="La mia voce, la mia presenza, i miei discorsi, i miei momenti più intensi. Ogni immagine racconta un pezzo del viaggio."
        author="Luca Pellicari"
      />

      {/* CTA */}
      <CTA />
    </>
  )
}
