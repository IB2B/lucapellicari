'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TextReveal } from '@/components/animations/TextReveal'
import { FadeIn } from '@/components/animations/FadeIn'
import { Button } from '@/components/ui/Button'
import { SITE_CONFIG } from '@/lib/constants'
import { Mail, Linkedin, Instagram, Facebook, Youtube, MapPin, Send, CheckCircle } from 'lucide-react'

const socialLinks = [
  { icon: Linkedin, href: SITE_CONFIG.links.linkedin, label: 'LinkedIn' },
  { icon: Instagram, href: SITE_CONFIG.links.instagram, label: 'Instagram' },
  { icon: Facebook, href: SITE_CONFIG.links.facebook, label: 'Facebook' },
  { icon: Youtube, href: SITE_CONFIG.links.youtube, label: 'YouTube' },
]

export default function ContattiPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <FadeIn>
              <span className="inline-block text-teal text-sm font-medium uppercase tracking-[0.3em] mb-6">
                Contatti
              </span>
            </FadeIn>

            <TextReveal className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-8">
              Inizia il tuo viaggio
            </TextReveal>

            <FadeIn delay={0.3}>
              <p className="text-xl text-navy/80 leading-relaxed">
                Vuoi lavorare con me? Vuoi portarmi nella tua azienda?
                Vuoi iniziare il tuo percorso identitario? Scrivimi. Sono qui.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 lg:py-24 bg-dark-surface">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <FadeIn>
              <div className="bg-dark rounded-xl p-8 lg:p-12 border border-dark-lighter">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={40} className="text-gold" />
                    </div>
                    <h3 className="font-serif text-2xl text-light-surface font-bold mb-4">
                      Messaggio inviato!
                    </h3>
                    <p className="text-light-surface/70">
                      Grazie per avermi contattato. Ti risponderò il prima possibile.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="font-serif text-2xl text-light-surface font-bold mb-8">
                      Scrivimi un messaggio
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-light-surface/70 text-sm mb-2">
                            Nome *
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full bg-dark-surface border border-dark-lighter rounded-lg px-4 py-3 text-light-surface focus:outline-none focus:border-gold transition-colors"
                            placeholder="Il tuo nome"
                          />
                        </div>
                        <div>
                          <label className="block text-light-surface/70 text-sm mb-2">
                            Cognome *
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full bg-dark-surface border border-dark-lighter rounded-lg px-4 py-3 text-light-surface focus:outline-none focus:border-gold transition-colors"
                            placeholder="Il tuo cognome"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-light-surface/70 text-sm mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          className="w-full bg-dark-surface border border-dark-lighter rounded-lg px-4 py-3 text-light-surface focus:outline-none focus:border-gold transition-colors"
                          placeholder="La tua email"
                        />
                      </div>

                      <div>
                        <label className="block text-light-surface/70 text-sm mb-2">
                          Oggetto *
                        </label>
                        <select
                          required
                          className="w-full bg-dark-surface border border-dark-lighter rounded-lg px-4 py-3 text-light-surface focus:outline-none focus:border-gold transition-colors"
                        >
                          <option value="">Seleziona un argomento</option>
                          <option value="percorso">Percorso individuale</option>
                          <option value="azienda">Formazione aziendale</option>
                          <option value="quantum">Quantum Academy</option>
                          <option value="alphakom">Alphakom</option>
                          <option value="speaking">Speaking / Eventi</option>
                          <option value="altro">Altro</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-light-surface/70 text-sm mb-2">
                          Messaggio *
                        </label>
                        <textarea
                          required
                          rows={5}
                          className="w-full bg-dark-surface border border-dark-lighter rounded-lg px-4 py-3 text-light-surface focus:outline-none focus:border-gold transition-colors resize-none"
                          placeholder="Raccontami di te e di come posso aiutarti..."
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        isLoading={isLoading}
                        icon={<Send size={18} />}
                        iconPosition="right"
                      >
                        Invia messaggio
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </FadeIn>

            {/* Contact Info */}
            <div className="space-y-12">
              <FadeIn delay={0.2}>
                <div>
                  <h3 className="font-serif text-xl text-light-surface font-semibold mb-6">
                    Contatto diretto
                  </h3>
                  <a
                    href="mailto:info@lucapellicari.com"
                    className="inline-flex items-center gap-3 text-gold hover:text-gold-light transition-colors text-lg"
                  >
                    <Mail size={24} />
                    info@lucapellicari.com
                  </a>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div>
                  <h3 className="font-serif text-xl text-light-surface font-semibold mb-6">
                    Seguimi sui social
                  </h3>
                  <div className="flex gap-4">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 rounded-full bg-dark flex items-center justify-center text-light-surface/70 hover:text-gold hover:bg-dark-lighter border border-dark-lighter hover:border-gold/30 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={social.label}
                      >
                        <social.icon size={24} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div>
                  <h3 className="font-serif text-xl text-light-surface font-semibold mb-6">
                    Dove mi trovi
                  </h3>
                  <div className="flex items-start gap-3 text-light-surface/70">
                    <MapPin size={24} className="text-gold flex-shrink-0 mt-1" />
                    <p>
                      Italia<br />
                      Disponibile per eventi e formazione in tutta Italia e all'estero
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.5}>
                <div className="bg-dark rounded-xl p-8 border border-gold/20">
                  <h3 className="font-serif text-xl text-light-surface font-semibold mb-4">
                    Preferisci una chiamata?
                  </h3>
                  <p className="text-light-surface/70 mb-6">
                    Compila il form indicando "Chiamata conoscitiva" nell'oggetto
                    e ti contatterò per fissare un appuntamento.
                  </p>
                  <div className="divider" />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
