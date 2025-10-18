import { Inter, Cairo, Tajawal } from 'next/font/google'

// Inter for English text
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'Arial', 'sans-serif'],
  adjustFontFallback: true,
})

// Cairo font for Arabic text - Modern and clean
export const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  preload: true,
  fallback: ['Tahoma', 'Arial', 'sans-serif'],
  adjustFontFallback: true,
})

// Tajawal as alternative for headers - Elegant and modern
export const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '700', '800', '900'],
  display: 'swap',
  preload: false,
  fallback: ['Cairo', 'Tahoma', 'Arial', 'sans-serif'],
})