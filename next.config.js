/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is now stable in Next.js 14, no experimental flags needed
  
  // Remove output: 'standalone' as it can cause issues with Netlify's Next.js plugin
  
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
  
  // Add trailing slash for better compatibility
  trailingSlash: true,
  
  // Needed for Netlify
  target: 'serverless'
}

module.exports = nextConfig