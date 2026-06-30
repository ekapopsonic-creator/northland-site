import React from 'react'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { getSiteSettings } from '@/lib/queries'
import { mediaUrl } from '@/lib/labels'
import { buildFontConfig } from '@/lib/fonts'
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
  const s1 = settings?.secondaryColor1 || '#58595B'
  const s2 = settings?.secondaryColor2 || '#C9A24B'
  const s3 = settings?.secondaryColor3 || '#2E9E5B'
  const logoUrl = mediaUrl(settings?.logo)
  const logoDarkUrl = mediaUrl(settings?.logoDark)
  const fonts = buildFontConfig(settings?.bodyFont, settings?.displayFont)

  // ระยะห่าง / ขนาด จากตั้งค่าเว็บไซต์
  const baseSize = settings?.baseFontSize ? `body{font-size:${settings.baseFontSize}px;}` : ''
  const headerPad = settings?.headerPaddingY
    ? `.site-header .nav{padding-top:${settings.headerPaddingY};padding-bottom:${settings.headerPaddingY};}`
    : ''
  const footerPad = settings?.footerPaddingY
    ? `.site-footer{padding-top:${settings.footerPaddingY};padding-bottom:${settings.footerPaddingY};}`
    : ''
  const bodyGap = settings?.bodyGap ? `main > section{margin-top:${settings.bodyGap};margin-bottom:${settings.bodyGap};}` : ''
  const containerW =
    settings?.containerWidth === 'wide'
      ? '.container{max-width:1400px;}'
      : settings?.containerWidth === 'full'
        ? '.container{max-width:100%;}'
        : ''

  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* ฟอนต์จากตั้งค่าเว็บไซต์ — ทีมเลือกได้เอง */}
        <link href={fonts.href} rel="stylesheet" />
        {/* สี + ฟอนต์ + ระยะห่างจากตั้งค่าเว็บไซต์ในหลังบ้าน */}
        <style>{`:root{--north-sea:${brand};--deep-blue:${brandDark};--secondary-1:${s1};--secondary-2:${s2};--secondary-3:${s3};}${fonts.cssVars}${baseSize}${headerPad}${footerPad}${bodyGap}${containerW}`}</style>
      </head>
      <body>
        <Header logoUrl={logoUrl} />
        {children}
        <Footer
          logoUrl={logoDarkUrl || logoUrl}
          tagline={settings?.footerTagline || undefined}
          phone={settings?.phone || undefined}
          email={settings?.email || undefined}
          address={settings?.address || undefined}
        />
      </body>
    </html>
  )
}
