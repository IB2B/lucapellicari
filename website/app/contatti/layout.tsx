import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contatti',
  description:
    'Contatta Luca Pellicari per percorsi individuali, formazione aziendale, Quantum Academy, Alphakom o eventi di speaking.',
}

export default function ContattiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
