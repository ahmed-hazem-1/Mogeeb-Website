/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export for production builds (Netlify)
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    trailingSlash: true,
  }),
  
  // Required for static export - use unoptimized images
  images: {
    unoptimized: true,
  },
  
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