import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Plein Cap Luxury Voyages',
  description: 'Boutique luxury voyages: maritime, fluvial, rail, cultural.',
  verification: {
    google: 'hoU2jDRNkDh3pKxF2y6Nfd4dIPrp-LcytPwblHEyi18',
  },
}

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="light">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700,0,900;1,400&family=Inter:wght@300;400;500;600&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
