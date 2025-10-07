import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mogeeb.ai - Leading AI Solutions for MENA SMEs',
  description: 'Mogeeb.ai provides cutting-edge Arabic NLP and AI solutions, serving hundreds of thousands of users across the MENA region. Experience our AI Arabic chatbot and discover the future of AI for businesses.',
  keywords: 'AI, Arabic NLP, chatbot, MENA, SME, artificial intelligence, Arabic language processing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}