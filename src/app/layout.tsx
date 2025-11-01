import type { Metadata, Viewport } from 'next'
import { inter, cairo } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'مُجيب - مساعدك الذكي للمطاعم والكافيهات',
  description: 'مُجيب هو المساعد الذكي اللي هيخلي مطعمك أو كافيهك يشتغل أوتوماتيك. يرد على العملاء، ياخد الأوردرات، ويديك تقارير عن شغلك. بيفهم اللهجة المصرية ويشتغل 24/7 من غير أخطاء.',
  keywords: 'مطاعم، كافيهات، أوردرات، مساعد ذكي، بوت، واتساب، تليجرام، ذكي اصطناعي، مصر',
  manifest: '/manifest.json',
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
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="مُجيب" />
        <link rel="icon" href="/مجيب.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/مجيب.ico" />
        <link rel="manifest" href="/manifest.json" />
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
      </body>
    </html>
  )
}