import React from 'react'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { getSiteSettings } from '@/lib/queries'
import { mediaUrl } from '@/lib/labels'
import './styles.css'

export const metadata: Metadata = {
  title: 'Northland Development — ที่เราใส่ใจ',
  description:
    '30 ปีแห่งการสร้างที่อยู่อาศัยคุณภาพ ในสระบุรีและกรุงเทพมหานคร — โครงการบ้าน คอนโด ทาวน์โฮม จาก Northland Development',
}

export const revalidate = 60

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings().catch(() => null)
  const brand = settings?.brandColor || '#00AEEF'
  const brandDark = settings?.brandColorDark || '#03A1D1'
  const logoUrl = mediaUrl(settings?.logo)

  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        {/* สีจากตั้งค่าเว็บไซต์ในหลังบ้าน — ทีมเปลี่ยนได้เอง */}
        <style>{`:root{--north-sea:${brand};--deep-blue:${brandDark};}`}</style>
      </head>
      <body>
        <Header logoUrl={logoUrl} />
        {children}
        <Footer
          logoUrl={logoUrl}
          tagline={settings?.footerTagline || undefined}
          phone={settings?.phone || undefined}
          email={settings?.email || undefined}
          address={settings?.address || undefined}
        />
      </body>
    </html>
  )
}
