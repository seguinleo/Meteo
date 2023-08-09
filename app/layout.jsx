/* eslint-disable react/prop-types */
import React from 'react';

export default function RootLayout({ children }) {
  return (
    <html lang="fr-FR">
      <head>
        <title>Météo &#8211; Léo SEGUIN</title>
        <meta name="theme-color" className="themecolor" content="#1c95ec" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" className="themecolor" content="#1c95ec" />
        <meta name="description" content="Météo en temps réel, précise et fiable pour n'importe quelle ville du monde avec prévisions." />
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
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/app.webmanifest" />
      </head>
      <body>
        { children }
      </body>
    </html>
  );
}
