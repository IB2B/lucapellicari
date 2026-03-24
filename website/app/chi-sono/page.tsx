import { Metadata } from 'next'
import { ChiSonoHero } from './components/ChiSonoHero'
import { Story } from './components/Story'
import { Stemma } from './components/Stemma'
import { Credentials } from './components/Credentials'
import { Values } from './components/Values'
import { ThreeV } from './components/ThreeV'
import { Quote } from '@/components/sections/Quote'
import { CTA } from '@/components/sections/CTA'

export const metadata: Metadata = {
  title: 'Chi Sono',
  description:
    'La mia storia: 7 rinascite, paracadutista militare, sopravvissuto al cancro, fondatore di Quantum Academy. Laureato in Scienze Politiche, docente universitario, ricercatore e formatore accreditato.',
}

export default function ChiSonoPage() {
  return (
    <>
      <ChiSonoHero />
      <Story />
      <Stemma />
      <Quote
        text="Ogni volta che cado, mi rialzo più forte. Non perché sono speciale. Perché ho imparato che cadere è l'unico modo per scoprire quanto in alto puoi arrivare."
        author="Luca Pellicari"
      />
      <Credentials />
      <Values />
      <ThreeV />
      <CTA />
    </>
  )
}
