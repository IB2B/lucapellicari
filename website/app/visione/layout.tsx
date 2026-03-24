import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Visione',
  description:
    'La mia visione: costruire una grande scuola di consapevolezza dove chi entra impara a vivere, non solo a lavorare. Ricchezza condivisa, identità, bellezza.',
}

export default function VisioneLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
