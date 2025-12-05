import type { Metadata, Viewport } from 'next'
import { inter, cairo } from './fonts'
import './globals.css'
import FloatingChatbot from '@/components/FloatingChatbot'

export const metadata: Metadata = {
  title: 'مُجيب - مساعدك الذكي للمطاعم والكافيهات',
  description: 'مُجيب هو المساعد الذكي اللي هيخلي مطعمك أو كافيهك يشتغل أوتوماتيك. يرد على العملاء، ياخد الأوردرات، ويديك تقارير عن شغلك. بيفهم اللهجة المصرية ويشتغل 24/7 من غير أخطاء.',
  keywords: 'مطاعم، كافيهات، أوردرات، مساعد ذكي، بوت، واتساب، تليجرام، ذكي اصطناعي، مصر',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'مُجيب',
  },
  icons: {
    icon: '/مجيب.ico',
    apple: '/مجيب.ico',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#fa7412',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${cairo.className} ${inter.className} antialiased`}>
        <div className="min-h-screen bg-white">
          {children}
        </div>
        <FloatingChatbot />
      </body>
    </html>
  )
}