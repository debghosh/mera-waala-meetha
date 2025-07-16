/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
  poweredByHeader: false,
}

module.exports = nextConfig