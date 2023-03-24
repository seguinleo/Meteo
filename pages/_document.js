import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <meta name="theme-color" id="themecolor" content="#1c95ec" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#1c95ec" />
        <meta name="description" content="Météo en temps réel, précise et fiable pour n'importe quelle ville du monde avec prévisions des 5 prochains jours." />
        <link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
