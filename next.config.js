/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  env: {
    API_KEY: process.env.API_KEY
  }
}

module.exports = nextConfig
