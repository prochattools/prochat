// ProChat public website
// (c) 2025 Steve Westhoek / ProChat
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  staticPageGenerationTimeout: 300,
  experimental: {
    optimizePackageImports: ['@/components'],
  },
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/prochat-memory',
        destination: '/memory',
        permanent: true,
      },
      {
        source: '/qa-memory',
        destination: '/memory-qa',
        permanent: true,
      },
      {
        source: '/tos',
        destination: '/terms',
        permanent: true,
      },
      {
        source: '/privacy-policy',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/buildflow',
        destination: '/workbench',
        permanent: true,
      },
      {
        source: '/system/prochat-os',
        destination: '/workbench',
        permanent: true,
      },
      {
        source: '/systems/prochat-os',
        destination: '/workbench',
        permanent: true,
      },
      {
        source: '/waiting-list',
        destination: '/contact?topic=memory-qa-beta#contact-form-card',
        permanent: true,
      },
      {
        source: '/learn',
        destination: '/docs',
        permanent: true,
      },
      {
        source: '/learn/:path*',
        destination: '/docs',
        permanent: true,
      },
      {
        source: '/docs/learn',
        destination: '/docs',
        permanent: true,
      },
      {
        source: '/docs/learn/:path*',
        destination: '/docs',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'logos-world.net',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'blogger.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'fast-strapi-cms-651b34b82e95.herokuapp.com',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
      },
      {
        protocol: 'http',
        hostname: '3.73.130.136',
      },
      {
        protocol: 'https',
        hostname: '3.73.130.136',
      },
    ],
  },
}

export default withBundleAnalyzer(nextConfig)
