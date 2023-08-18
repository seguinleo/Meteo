/** @type {import('next').NextConfig} */
module.exports = {
  poweredByHeader: false,
  reactStrictMode: true,
  env: {
    API_KEY: process.env.API_KEY,
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), display-capture=(), fullscreen=(), microphone=()',
        },
        {
          key: 'Content-Security-Policy',
          value: 'upgrade-insecure-requests',
        },
        {
          key: 'access-control-allow-origin',
          value: 'https://meteo-leoseguin.vercel.app',
        },
      ],
    },
  ],
};
