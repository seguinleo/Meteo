/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  env: {
    // eslint-disable-next-line no-undef
    API_KEY: process.env.API_KEY
  }
}

export default nextConfig
