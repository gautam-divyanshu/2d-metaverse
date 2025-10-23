import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['api.dicebear.com', 'images.unsplash.com'],
  },
}

export default nextConfig