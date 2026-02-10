import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SmoothScroll } from '@/components/animations/SmoothScroll'
import { SITE_CONFIG } from '@/lib/constants'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'Luca Pellicari',
    'Identity Coach',
    'Quantum Academy',
    'Metodo In-Flow',
    'Alphakom',
    'Leadership',
    'Formazione',
    'Speaker',
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={`${dmSans.variable} ${playfair.variable} ${cormorant.variable}`}>
      <head>
        {/* Preload critical hero images for faster LCP */}
        <link rel="preload" as="image" href="/images/hero-1.jpg" type="image/jpeg" />
        <link rel="preload" as="image" href="/images/hero-2.jpg" type="image/jpeg" />
        <link rel="preload" as="image" href="/images/hero-3.jpg" type="image/jpeg" />
      </head>
      <body className="font-sans">
        <SmoothScroll>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
