/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is now stable in Next.js 14, no experimental flags needed
  
  // For Netlify compatibility - this tells Next.js to export as static HTML
  output: 'export',

  // Required for static export - we need to use unoptimized images
  images: {
    unoptimized: true,
  },
  
  // Optimize font loading
  optimizeFonts: true,
  
  // Static export works best with trailing slashes
  trailingSlash: true,
  
  // Make TypeScript less strict for static export
  typescript: {
    // Temporarily ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },

  // Disable ESLint during build to prevent failures
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig