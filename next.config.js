/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is now stable in Next.js 14, no experimental flags needed
  
  // Add output configuration for Netlify
  output: 'standalone',
  
  // Enable image optimization
  images: {
    unoptimized: false,
    // Add external image domains if needed
    // domains: ['example.com'],
    // Add external image remotePatterns if needed
    // remotePatterns: [{ protocol: 'https', hostname: '**.example.com' }]
  },
  
  // Enable TypeScript error checking during build
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig