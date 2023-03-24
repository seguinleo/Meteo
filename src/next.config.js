/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    API_KEY: process.env.API_KEY
  }
}

module.exports = nextConfig
