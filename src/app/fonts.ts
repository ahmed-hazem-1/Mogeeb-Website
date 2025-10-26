import { Inter, Cairo, Tajawal } from 'next/font/google'

// Inter for English text - using fewer weights for better build performance
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'Arial', 'sans-serif'],
  adjustFontFallback: true,
})

// Cairo font for Arabic text - reduced weights for better build performance
export const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  preload: true,
  fallback: ['Tahoma', 'Arial', 'sans-serif'],
  adjustFontFallback: true,
})

// Tajawal as alternative for headers - reduced weights
export const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  display: 'swap',
  preload: false,
  fallback: ['Cairo', 'Tahoma', 'Arial', 'sans-serif'],
})