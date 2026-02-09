'use client'

import { SectionHeading } from '@/components/ui/SectionHeading'
import { FeatureCard } from '@/components/ui/Card'
import { FadeIn } from '@/components/animations/FadeIn'
import {
  Compass,
  Target,
  Sparkles,
  Users,
  BookOpen,
  Rocket,
} from 'lucide-react'

const features = [
  {
    icon: <Compass size={28} />,
    title: 'Metodo In-Flow',
    description:
      'Il sistema trasformativo che unisce identità, visione e verità per raggiungere il tuo stato naturale di eccellenza.',
    href: '/metodo-in-flow',
  },
  {
    icon: <Target size={28} />,
    title: 'Le 3V',
    description:
      'Valori, Visione, Verità: le tre colonne portanti della mia filosofia di vita e del mio metodo formativo.',
    href: '/metodo-in-flow',
  },
  {
    icon: <Sparkles size={28} />,
    title: 'Quantum Academy',
    description:
      'Una scuola di consapevolezza dove la formazione diventa trasformazione. Non un corso, ma un portale.',
    href: '/quantum-academy',
  },
  {
    icon: <Rocket size={28} />,
    title: 'Alphakom',
    description:
      'La Scuola degli Alpha Leaders. Dove impari a guidare con coraggio, coerenza e responsabilità.',
    href: '/alphakom',
  },
  {
    icon: <Users size={28} />,
    title: 'Formazione Aziendale',
    description:
      'Percorsi su misura per team e organizzazioni. Leadership, comunicazione, identità aziendale.',
    href: '/contatti',
  },
  {
    icon: <BookOpen size={28} />,
    title: 'I Miei Libri',
    description:
      'In-Flow, Oltre la diagnosi, e altri scritti dove condivido la mia esperienza e il mio metodo.',
    href: '/libri',
  },
]

export function Features() {
  return (
    <section className="py-24 lg:py-32 bg-light section-light">
      <div className="container-custom">
        <SectionHeading
          subtitle="Cosa Posso Offrirti"
          title="Percorsi di trasformazione"
          description="Ogni percorso è un viaggio verso la tua identità più autentica. Non insegno tecniche, trasmetto identità."
          light
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FadeIn key={feature.title} delay={index * 0.1}>
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                href={feature.href}
                className="bg-white border-light-darker hover:border-gold/50 h-full"
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
