import { Hero } from '@/components/sections/Hero'
import { IdentityHighlights } from '@/components/sections/IdentityHighlights'
import { Intro } from '@/components/sections/Intro'
import { Stats } from '@/components/sections/Stats'
import { Features } from '@/components/sections/Features'
import { Quote } from '@/components/sections/Quote'
import { CTA } from '@/components/sections/CTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <IdentityHighlights />
      <Intro />
      <Stats />
      <Quote
        text="Non sei quello che ti è successo. Sei quello che scegli di diventare."
        author="Luca Pellicari"
      />
      <Features />
      <Quote
        text="La coerenza è una forma di eleganza. Il coraggio è una forma di disciplina. La responsabilità è una forma d'amore. La verità è una forma di libertà."
        author="Luca Pellicari"
        variant="light"
      />
      <CTA />
    </>
  )
}
