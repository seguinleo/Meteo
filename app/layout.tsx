import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Météo – Léo SEGUIN',
  description: 'Météo en temps réel, précise et fiable pour n\'importe quelle ville du monde avec prévisions.'
}

export const dynamic = "force-dynamic";

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <html lang="fr-FR">
      <head>
        <meta name="theme-color" className="themecolor" content="#1c95ec" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" className="themecolor" content="#1c95ec" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Météo &#8211; Léo SEGUIN" />
        <meta name="twitter:description" content="Météo en temps réel, précise et fiable pour n'importe quelle ville du monde avec prévisions." />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Météo &#8211; Léo SEGUIN" />
        <meta property="og:description" content="Météo en temps réel, précise et fiable pour n'importe quelle ville du monde avec prévisions." />
        <meta property="og:site_name" content="Météo &#8211; Léo SEGUIN" />
        <meta property="og:url" content="https://meteo-leoseguin.vercel.app/" />
        <meta property="og:locale" content="fr-FR" />
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
