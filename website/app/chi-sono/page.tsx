import { Metadata } from 'next'
import { ChiSonoHero } from './components/ChiSonoHero'
import { Story } from './components/Story'
import { Values } from './components/Values'
import { ThreeV } from './components/ThreeV'
import { Quote } from '@/components/sections/Quote'
import { CTA } from '@/components/sections/CTA'

export const metadata: Metadata = {
  title: 'Chi Sono',
  description:
    'La mia storia: 7 rinascite, paracadutista militare, sopravvissuto al cancro, fondatore di Quantum Academy. Scopri il percorso che mi ha portato a trasformare le vite degli altri.',
}

export default function ChiSonoPage() {
  return (
    <>
      <ChiSonoHero />
      <Story />
      <Quote
        text="Ogni volta che cado, mi rialzo più forte. Non perché sono speciale. Perché ho imparato che cadere è l'unico modo per scoprire quanto in alto puoi arrivare."
        author="Luca Pellicari"
      />
      <Values />
      <ThreeV />
      <CTA />
    </>
  )
}
