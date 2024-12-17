import React from 'react'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'

const opensans = Open_Sans({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Météo – Léo SEGUIN',
  description: 'Météo actuelle et prévisions partout dans le monde.',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://meteo-leoseguin.vercel.app/',
    siteName: 'Météo – Léo SEGUIN',
    title: 'Météo – Léo SEGUIN',
    description: 'Météo actuelle et prévisions partout dans le monde.',
  }
}

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr-FR" className={opensans.className}>
      <head>
        <meta name="theme-color" className="themecolor" content="#1c95ec" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" className="themecolor" content="#1c95ec" />
        <link rel="canonical" href="https://meteo-leoseguin.vercel.app/" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/app.webmanifest" />
      </head>
      <body>
        { children }
      </body>
    </html>
  )
}
