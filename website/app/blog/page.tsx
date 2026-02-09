import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { TextReveal } from '@/components/animations/TextReveal'
import { FadeIn } from '@/components/animations/FadeIn'
import { CTA } from '@/components/sections/CTA'
import { ArrowRight, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Articoli, pensieri e riflessioni di Luca Pellicari su identità, leadership, trasformazione personale e metaquantistica.',
}

const posts = [
  {
    slug: 'identita-che-cambia-destino',
    title: 'L\'identità che ti cambia il destino',
    excerpt: 'Ci sono giorni in cui la vita non ti chiede il permesso. Ti guarda negli occhi… e ti mette alla prova.',
    image: '/images/blog-1.jpg',
    date: '2024-01-15',
    category: 'Identità',
  },
  {
    slug: 'azienda-clima-energetico',
    title: 'L\'azienda non è un logo: è il suo clima energetico',
    excerpt: 'Un\'azienda toppa quando le persone remano in versi opposti. Un\'azienda evolve quando si riconoscono.',
    image: '/images/blog-2.jpg',
    date: '2024-01-10',
    category: 'Leadership',
  },
  {
    slug: 'coraggio-chiamarsi-nome',
    title: 'Il coraggio di chiamarsi per nome',
    excerpt: 'Vuoi davvero crescere? Allora lascia stare le maschere. Comincia da una domanda semplice e spietata.',
    image: '/images/blog-3.jpg',
    date: '2024-01-05',
    category: 'Crescita',
  },
  {
    slug: 'responsabilita-forma-amore',
    title: 'La responsabilità è una forma di amore',
    excerpt: 'Molti confondono responsabilità con peso. Io la vedo in un altro modo: è il gesto più alto di amore.',
    image: '/images/blog-4.jpg',
    date: '2024-01-01',
    category: 'Valori',
  },
  {
    slug: 'forza-frequenza',
    title: 'La forza non è nell\'imposizione, ma nella frequenza',
    excerpt: 'Non influenzi nessuno se non sei in grado di influenzare te stesso. La vera leadership nasce dalla frequenza.',
    image: '/images/blog-5.jpg',
    date: '2023-12-28',
    category: 'Leadership',
  },
  {
    slug: 'viaggio-unica-via',
    title: 'Il viaggio è l\'unica via',
    excerpt: 'Nella vita non esistono scorciatoie. Il viaggio ti rompe, ti riforgia, ti restituisce a ciò che sei sempre stato.',
    image: '/images/blog-6.jpg',
    date: '2023-12-20',
    category: 'Filosofia',
  },
]

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function BlogPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 bg-dark">
        <div className="container-custom">
          <div className="max-w-3xl">
            <FadeIn>
              <span className="inline-block text-gold text-sm font-medium uppercase tracking-[0.3em] mb-6">
                Blog
              </span>
            </FadeIn>

            <TextReveal className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-light-surface mb-8">
              Pensieri liberi. Verità condivise.
            </TextReveal>

            <FadeIn delay={0.3}>
              <p className="text-xl text-light-surface/80 leading-relaxed">
                Scrivo per raccontare, per comprendere e per far vibrare
                qualcosa dentro chi legge. Identità che si aprono, una parola alla volta.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 lg:py-24 bg-dark-surface">
        <div className="container-custom">
          {/* Featured Post */}
          <FadeIn className="mb-16">
            <Link href={`/blog/${posts[0].slug}`} className="group block">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-[16/10] rounded-lg overflow-hidden">
                  <Image
                    src={posts[0].image}
                    alt={posts[0].title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-gold text-sm font-medium uppercase">
                      {posts[0].category}
                    </span>
                    <span className="text-light-surface/50 text-sm flex items-center gap-2">
                      <Calendar size={14} />
                      {formatDate(posts[0].date)}
                    </span>
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl text-light-surface font-bold mb-4 group-hover:text-gold transition-colors">
                    {posts[0].title}
                  </h2>
                  <p className="text-light-surface/70 text-lg mb-6">
                    {posts[0].excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-gold font-medium group-hover:gap-4 transition-all">
                    Leggi l'articolo
                    <ArrowRight size={18} />
                  </span>
                </div>
              </div>
            </Link>
          </FadeIn>

          {/* Post Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post, index) => (
              <FadeIn key={post.slug} delay={index * 0.1}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <article className="bg-dark rounded-lg overflow-hidden border border-dark-lighter hover:border-gold/30 transition-colors">
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-gold text-xs font-medium uppercase">
                          {post.category}
                        </span>
                        <span className="text-light-surface/50 text-xs">
                          {formatDate(post.date)}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl text-light-surface font-semibold mb-3 group-hover:text-gold transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-light-surface/70 text-sm line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
