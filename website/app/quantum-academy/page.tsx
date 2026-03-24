import { Metadata } from 'next'
import Image from 'next/image'
import { TextReveal } from '@/components/animations/TextReveal'
import { FadeIn } from '@/components/animations/FadeIn'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { CTA } from '@/components/sections/CTA'
import { Quote } from '@/components/sections/Quote'
import { Sparkles, Users, Heart, BookOpen, Target, Lightbulb, Mail, Phone, MapPin, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Quantum Academy',
  description:
    'Quantum Academy: una scuola di consapevolezza dove la formazione diventa trasformazione. Non un corso, ma un portale verso la tua identità più autentica.',
}

const features = [
  {
    icon: Sparkles,
    title: 'Trasformazione Profonda',
    description: 'Non insegniamo tecniche, trasmettiamo identità. Ogni percorso è un viaggio dentro te stesso.',
  },
  {
    icon: Users,
    title: 'Comunità di Anime',
    description: 'Un ecosistema di persone che credono nella crescita, nella bellezza e nella ricchezza condivisa.',
  },
  {
    icon: Heart,
    title: 'Approccio Olistico',
    description: 'Uniamo mente e cuore, scienza e spiritualità, business e consapevolezza.',
  },
  {
    icon: BookOpen,
    title: 'Metodi Esclusivi',
    description: 'In-Flow, le 3V, le 3R, la Metaquantistica: metodologie sviluppate in anni di esperienza.',
  },
  {
    icon: Target,
    title: 'Risultati Concreti',
    description: 'Percorsi che producono cambiamenti reali e misurabili nella vita personale e professionale.',
  },
  {
    icon: Lightbulb,
    title: 'Formazione Continua',
    description: 'Un percorso che non finisce mai: seminari, masterclass, eventi esclusivi.',
  },
]

const team = [
  {
    name: 'Luca Pellicari',
    role: 'Fondatore & Identity Coach',
    image: '/images/luca-portrait.jpg',
    description: 'Paracadutista, sopravvissuto, trasformatore. Porta 30+ anni di esperienza.',
  },
  {
    name: 'Lucia Facchinetti',
    role: 'Co-Fondatrice',
    image: '/images/lucia.jpg',
    description: 'Anima, sorella di destino. Insieme a Luca guida la visione dell\'Academy.',
  },
  {
    name: 'Alberto Lori',
    role: 'Narratore & Formatore',
    image: '/images/alberto.jpg',
    description: 'Voce storica della RAI. Porta l\'arte della narrazione nella formazione.',
  },
]

export default function QuantumAcademyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(107,155,174,0.08),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(196,149,106,0.08),transparent_50%)]" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/30 rounded-full px-6 py-2 mb-8">
                <Sparkles size={18} className="text-teal" />
                <span className="text-teal text-sm font-medium">
                  Il sogno che non sapevo di sognare
                </span>
              </div>
            </FadeIn>

            <TextReveal className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold text-navy mb-8">
              Quantum Academy
            </TextReveal>

            <FadeIn delay={0.4}>
              <p className="text-xl md:text-2xl text-navy/80 leading-relaxed mb-12">
                Non è una scuola. È un luogo di trasformazione. È un portale.
                È un laboratorio di identità dove la formazione diventa risveglio.
              </p>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button href="/contatti" size="lg" arrow>
                  Scopri i percorsi
                </Button>
                <Button href="#team" variant="outline" size="lg" className="text-navy border-navy/30 hover:border-teal hover:text-teal">
                  Conosci il team
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 lg:py-32 bg-navy-dark">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <div className="relative">
                <div className="aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="/images/quantum-academy.jpg"
                    alt="Quantum Academy"
                    fill
                    className="object-cover"
                    quality={70}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-gold text-dark p-6 rounded-lg">
                  <p className="font-serif text-4xl font-bold">2015</p>
                  <p className="text-sm">Anno di fondazione</p>
                </div>
              </div>
            </FadeIn>

            <div>
              <FadeIn>
                <span className="inline-block text-gold text-sm font-medium uppercase tracking-[0.3em] mb-4">
                  La Nostra Storia
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-light-surface font-bold mb-8">
                  Da tre anime in risonanza, una nuova forma di conoscenza
                </h2>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="space-y-6 text-light-surface/80 text-lg leading-relaxed">
                  <p>
                    Quantum Academy è nata da un incontro che non poteva non accadere.
                    Tre anime - io, Lucia e Alberto - legate da un legame quantistico
                    che ci permette di pensare le stesse cose a chilometri di distanza.
                  </p>
                  <p>
                    All'inizio era un contenitore per altri formatori. Ma dopo dieci anni
                    ho capito la verità: Quantum Academy non era nata per loro.
                    Era nata per <strong className="text-gold">noi tre</strong>.
                  </p>
                  <p>
                    Era nata per diventare una <strong className="text-gold">Scuola di Identità
                    e Consapevolezza</strong>. Ed è ciò che ora sta finalmente diventando.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <Quote
        text="Tutto è comunicazione. Tutto è informazione."
        author="Quantum Academy"
      />

      {/* Features */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container-custom">
          <SectionHeading
            subtitle="Cosa Offriamo"
            title="Un'esperienza unica di crescita"
            description="Percorsi che uniscono esperienza, studio, analisi del comportamento e visione quantistica."
            light
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FadeIn key={feature.title} delay={index * 0.1}>
                <div className="bg-cream rounded-lg p-8 border border-cream-dark hover:border-teal/30 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="w-14 h-14 rounded-lg bg-teal/10 flex items-center justify-center mb-6 text-teal">
                    <feature.icon size={28} />
                  </div>
                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-navy/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 lg:py-32 bg-navy-dark">
        <div className="container-custom">
          <SectionHeading
            subtitle="Il Trio Quantico"
            title="Chi siamo"
            description="Tre anime in risonanza, unite dalla stessa visione e dalla stessa missione."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <FadeIn key={member.name} delay={index * 0.15}>
                <div className="group">
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-6">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      quality={70}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent" />
                  </div>
                  <span className="text-gold text-sm font-medium uppercase tracking-wider">
                    {member.role}
                  </span>
                  <h3 className="font-serif text-2xl text-light-surface font-bold mt-2 mb-3">
                    {member.name}
                  </h3>
                  <p className="text-light-surface/70 leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container-custom">
          <SectionHeading
            subtitle="Contatti"
            title="Dove trovarci"
            description="Per informazioni sui percorsi, iscrizioni o collaborazioni."
            light
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <FadeIn delay={0}>
              <div className="text-center">
                <div className="w-14 h-14 rounded-lg bg-teal/10 flex items-center justify-center mx-auto mb-4 text-teal">
                  <Mail size={28} />
                </div>
                <h4 className="font-serif text-lg text-navy font-semibold mb-2">Email</h4>
                <a href="mailto:luca.pellicari@quantumacademy.org" className="text-navy/70 hover:text-teal transition-colors text-sm break-all">
                  luca.pellicari@quantumacademy.org
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="text-center">
                <div className="w-14 h-14 rounded-lg bg-teal/10 flex items-center justify-center mx-auto mb-4 text-teal">
                  <Phone size={28} />
                </div>
                <h4 className="font-serif text-lg text-navy font-semibold mb-2">Telefono</h4>
                <a href="tel:+393482201309" className="text-navy/70 hover:text-teal transition-colors text-sm">
                  +39 348 220 1309
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="text-center">
                <div className="w-14 h-14 rounded-lg bg-teal/10 flex items-center justify-center mx-auto mb-4 text-teal">
                  <MapPin size={28} />
                </div>
                <h4 className="font-serif text-lg text-navy font-semibold mb-2">Sede</h4>
                <p className="text-navy/70 text-sm">
                  Via Cappelletta, 4<br />
                  37121 Verona VR, Italia
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="text-center">
                <div className="w-14 h-14 rounded-lg bg-teal/10 flex items-center justify-center mx-auto mb-4 text-teal">
                  <Globe size={28} />
                </div>
                <h4 className="font-serif text-lg text-navy font-semibold mb-2">Sito Web</h4>
                <a href="https://quantumacademy.org/" target="_blank" rel="noopener noreferrer" className="text-navy/70 hover:text-teal transition-colors text-sm">
                  quantumacademy.org
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
