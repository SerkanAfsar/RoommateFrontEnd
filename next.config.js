/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'picsum.photos']
  },
  swcMinify: true
}

module.exports = nextConfig
