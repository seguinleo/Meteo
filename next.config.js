/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    API_KEY: process.env.API_KEY,
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'access-control-allow-origin',
          value: 'https://meteo-leoseguin.vercel.app',
        },
        {
          key: 'content-security-policy',
          value: 'upgrade-insecure-requests; default-src \'none\'; base-uri \'none\'; child-src \'none\'; connect-src \'self\'; frame-src \'none\'; frame-ancestors \'none\'; font-src \'self\'; form-action \'self\'; img-src \'self\'; manifest-src \'self\'; media-src \'none\'; object-src \'none\'; script-src \'self\'; script-src-attr \'none\'; script-src-elem \'self\'; style-src \'self\'; worker-src \'self\';',
        },
        {
          key: 'cross-origin-embedder-policy',
          value: 'require-corp',
        },
        {
          key: 'cross-origin-opener-policy',
          value: 'same-origin',
        },
        {
          key: 'cross-origin-resource-policy',
          value: 'cross-origin',
        },
        {
          key: 'permissions-policy',
          value: 'camera=(), display-capture=(), fullscreen=(), microphone=()',
        },
        {
          key: 'referrer-policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'x-content-type-options',
          value: 'nosniff',
        },
        {
          key: 'x-frame-options',
          value: 'deny',
        },
      ],
    },
  ],
};

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  sw: 'sw.js',
});

module.exports = withPWA({
  ...nextConfig,
});
