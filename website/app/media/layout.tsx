import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Media',
  description:
    'Galleria fotografica di Luca Pellicari. Conferenze, eventi, incontri. La mia voce, la mia presenza, i miei momenti più intensi.',
}

export default function MediaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
