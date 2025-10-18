import type { Metadata } from 'next'
import { inter, cairo } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'مُجيب - مساعدك الذكي للمطاعم والكافيهات',
  description: 'مُجيب هو المساعد الذكي اللي هيخلي مطعمك أو كافيهك يشتغل أوتوماتيك. يرد على العملاء، ياخد الأوردرات، ويديك تقارير عن شغلك. بيفهم اللهجة المصرية ويشتغل 24/7 من غير أخطاء.',
  keywords: 'مطاعم، كافيهات، أوردرات، مساعد ذكي، بوت، واتساب، تليجرام، ذكي اصطناعي، مصر',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${cairo.className} ${inter.className}`}>{children}</body>
    </html>
  )
}