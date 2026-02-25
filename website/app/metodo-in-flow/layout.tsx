import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Metodo In-Flow',
  description:
    'Il Metodo In-Flow: identità + visione + verità = flow. La scienza dell\'identità, la bellezza della verità. Un sistema trasformativo unico.',
}

export default function MetodoInFlowLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
