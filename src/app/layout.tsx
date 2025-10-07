import type { Metadata } from 'next'
import { inter } from './fonts'
import './globals.css'

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