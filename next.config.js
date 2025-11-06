/** @type {import('next').NextConfig} */
const nextConfig = {
  // For Netlify static deployment with functions
  output: 'export',
  
  // Required for static export - use unoptimized images
  images: {
    unoptimized: true,
  },
  
  // Static export works best with trailing slashes
  trailingSlash: true,
  
  // Disable server-side features for static export
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  typescript: {
    ignoreBuildErrors: true,
  },

  // Add environment variable for font fallbacks
  env: {
    NEXT_FONT_GOOGLE_MOCKED_RESPONSES: 'true',
  },
}

module.exports = nextConfig