import type { Metadata } from 'next'
import { inter, cairo } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'مُجيب - مساعدك الذكي للمطاعم والكافيهات',
  description: 'مُجيب هو المساعد الذكي اللي هيخلي مطعمك أو كافيهك يشتغل أوتوماتيك. يرد على العملاء، ياخد الأوردرات، ويديك تقارير عن شغلك. بيفهم اللهجة المصرية ويشتغل 24/7 من غير أخطاء.',
  keywords: 'مطاعم، كافيهات، أوردرات، مساعد ذكي، بوت، واتساب، تليجرام، ذكي اصطناعي، مصر',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes',
  themeColor: '#fa7412',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#fa7412" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="مُجيب" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="apple-touch-icon" href="/logo.svg" />
      </head>
      <body className={`${cairo.className} ${inter.className} antialiased`}>
        <div className="min-h-screen bg-white">
          {children}
        </div>
      </body>
    </html>
  )
}