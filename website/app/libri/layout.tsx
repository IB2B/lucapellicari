import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Libri',
  description:
    'I libri di Luca Pellicari: In-Flow, Oltre la diagnosi, La Guida alla Metaquantistica. Storie vere, identità vere, trasformazioni reali.',
}

export default function LibriLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
