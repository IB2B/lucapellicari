import { Metadata } from 'next'
import Image from 'next/image'
import { TextReveal } from '@/components/animations/TextReveal'
import { FadeIn } from '@/components/animations/FadeIn'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CTA } from '@/components/sections/CTA'
import { Play, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Media',
  description:
    'Video, interviste e conferenze di Luca Pellicari. La mia voce, la mia presenza, i miei momenti più intensi.',
}

const videos = [
  {
    title: 'Il Metodo In-Flow',
    description: 'Una panoramica completa del mio metodo trasformativo.',
    thumbnail: '/images/video-1.jpg',
    duration: '45:00',
  },
  {
    title: 'Le 7 Rinascite',
    description: 'La mia storia raccontata in una conferenza emozionante.',
    thumbnail: '/images/video-2.jpg',
    duration: '60:00',
  },
  {
    title: 'Leadership Alpha',
    description: 'Cosa significa essere un leader autentico oggi.',
    thumbnail: '/images/video-3.jpg',
    duration: '30:00',
  },
  {
    title: 'Quantum Academy',
    description: 'La presentazione della nostra scuola di consapevolezza.',
    thumbnail: '/images/video-4.jpg',
    duration: '25:00',
  },
]

const gallery = [
  '/images/gallery-1.jpg',
  '/images/gallery-2.jpg',
  '/images/gallery-3.jpg',
  '/images/gallery-4.jpg',
  '/images/gallery-5.jpg',
  '/images/gallery-6.jpg',
]

export default function MediaPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 bg-dark">
        <div className="container-custom">
          <div className="max-w-3xl">
            <FadeIn>
              <span className="inline-block text-gold text-sm font-medium uppercase tracking-[0.3em] mb-6">
                Media
              </span>
            </FadeIn>

            <TextReveal className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-light-surface mb-8">
              Video, Interviste, Conferenze
            </TextReveal>

            <FadeIn delay={0.3}>
              <p className="text-xl text-light-surface/80 leading-relaxed">
                La mia voce, la mia presenza, i miei momenti più intensi.
                Questa pagina è un acceleratore di fiducia.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-16 lg:py-24 bg-dark-surface">
        <div className="container-custom">
          <SectionHeading
            subtitle="Video"
            title="Guarda, ascolta, trasformati"
          />

          <div className="grid md:grid-cols-2 gap-8">
            {videos.map((video, index) => (
              <FadeIn key={video.title} delay={index * 0.1}>
                <div className="group cursor-pointer">
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-dark/50 group-hover:bg-dark/30 transition-colors" />

                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-gold/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play size={32} className="text-dark ml-1" fill="currentColor" />
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="absolute bottom-4 right-4 bg-dark/80 px-3 py-1 rounded text-sm text-light-surface">
                      {video.duration}
                    </div>
                  </div>
                  <h3 className="font-serif text-xl text-light-surface font-semibold mb-2 group-hover:text-gold transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-light-surface/70">
                    {video.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.5} className="text-center mt-12">
            <a
              href="https://youtube.com/@lucapellicari"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors font-medium"
            >
              Vedi tutti i video su YouTube
              <ExternalLink size={18} />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 lg:py-24 bg-dark">
        <div className="container-custom">
          <SectionHeading
            subtitle="Galleria"
            title="Momenti catturati"
            description="Conferenze, eventi, incontri. Frammenti di un viaggio condiviso."
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((image, index) => (
              <FadeIn key={index} delay={index * 0.05}>
                <div className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer">
                  <Image
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/20 transition-colors" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
