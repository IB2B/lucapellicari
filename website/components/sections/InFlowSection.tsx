'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { ArrowRight, BookOpen, GraduationCap, Route } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function InFlowSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const linesRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Smoother easing
      const smoothEase = 'power2.out'

      // Title animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          end: 'top 60%',
          scrub: 0.8,
        },
        y: 40,
        opacity: 0,
        ease: smoothEase,
      })

      // Subtitle animation
      gsap.from(subtitleRef.current, {
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: 'top 85%',
          end: 'top 60%',
          scrub: 0.8,
        },
        y: 25,
        opacity: 0,
        ease: smoothEase,
      })

      // Lines stagger animation
      if (linesRef.current) {
        gsap.from(linesRef.current.children, {
          scrollTrigger: {
            trigger: linesRef.current,
            start: 'top 82%',
            end: 'top 50%',
            scrub: 0.8,
          },
          x: -25,
          opacity: 0,
          stagger: 0.1,
          ease: smoothEase,
        })
      }

      // Cards stagger animation
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 82%',
            end: 'top 50%',
            scrub: 0.8,
          },
          y: 35,
          opacity: 0,
          stagger: 0.08,
          ease: smoothEase,
        })
      }

      // CTA animation
      gsap.from(ctaRef.current, {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 90%',
          end: 'top 75%',
          scrub: 0.8,
        },
        y: 20,
        opacity: 0,
        ease: smoothEase,
      })

    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 bg-gradient-to-b from-white via-teal-50/30 to-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-teal/50" />
            <span className="px-4 py-1.5 bg-teal/10 rounded-full text-teal text-xs uppercase tracking-[0.2em] font-medium">
              Il Mio Metodo
            </span>
            <span className="w-10 h-px bg-teal/50" />
          </div>

          <h2
            ref={titleRef}
            className="font-display text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-navy via-teal to-navy mb-4"
          >
            In-Flow
          </h2>

          <p
            ref={subtitleRef}
            className="font-serif text-xl md:text-2xl text-navy/70 italic max-w-xl mx-auto"
          >
            La scienza dell&apos;identità, la bellezza della verità.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left - Text Content */}
          <div>
            <p className="text-navy/60 text-lg mb-8">
              Ogni persona può entrare nel suo{' '}
              <span className="text-teal font-semibold">stato naturale</span>:
            </p>

            <div ref={linesRef} className="space-y-5 mb-10">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                <span className="w-2 h-2 rounded-full bg-teal mt-2 flex-shrink-0" />
                <p className="text-navy text-lg">
                  un equilibrio tra <span className="font-semibold">chi sei</span> e <span className="font-semibold">ciò che fai</span>
                </p>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                <span className="w-2 h-2 rounded-full bg-coral mt-2 flex-shrink-0" />
                <p className="text-navy text-lg">
                  tra la tua <span className="font-semibold">storia</span> e il tuo <span className="font-semibold">futuro</span>
                </p>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                <span className="w-2 h-2 rounded-full bg-teal mt-2 flex-shrink-0" />
                <p className="text-navy text-lg">
                  tra il tuo <span className="font-semibold">cuore</span> e la tua <span className="font-semibold">visione</span>
                </p>
              </div>
            </div>

            <div className="pl-5 border-l-2 border-teal/40">
              <p className="text-navy/80 text-lg">
                Il metodo In-Flow è il risultato di{' '}
                <span className="text-teal font-semibold">una vita intera</span>.
              </p>
            </div>
          </div>

          {/* Right - Cards */}
          <div ref={cardsRef} className="space-y-4">
            <Link
              href="/libri"
              className="group flex items-center gap-5 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-teal/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-navy/5 flex items-center justify-center group-hover:bg-navy group-hover:scale-105 transition-all duration-300">
                <BookOpen className="w-7 h-7 text-navy group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-display text-navy mb-1">Un libro</h4>
                <p className="text-navy/70 text-sm">Scopri di più →</p>
              </div>
            </Link>

            <Link
              href="/quantum-academy"
              className="group flex items-center gap-5 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-coral/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-coral/10 flex items-center justify-center group-hover:bg-coral group-hover:scale-105 transition-all duration-300">
                <GraduationCap className="w-7 h-7 text-coral group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-display text-navy mb-1">Un corso</h4>
                <p className="text-navy/70 text-sm">Scopri di più →</p>
              </div>
            </Link>

            <Link
              href="/contatti"
              className="group flex items-center gap-5 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-teal/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-teal/10 flex items-center justify-center group-hover:bg-teal group-hover:scale-105 transition-all duration-300">
                <Route className="w-7 h-7 text-teal group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-display text-navy mb-1">Un percorso</h4>
                <p className="text-navy/70 text-sm">Scopri di più →</p>
              </div>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="text-center mt-16">
          <Link
            href="/metodo-in-flow"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-teal to-teal-dark text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg shadow-teal/25 hover:shadow-xl hover:shadow-teal/35 hover:scale-[1.02] transition-all duration-300"
          >
            <span>Scopri In-Flow</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
