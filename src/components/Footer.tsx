import React from 'react'
import Link from 'next/link'
import { BrandMark } from './BrandMark'

export function Footer({
  logoUrl,
  tagline,
  phone,
  email,
  address,
}: {
  logoUrl?: string | null
  tagline?: string
  phone?: string
  email?: string
  address?: string
}) {
  const addressLines = (address || '110 ม.8 ถนนแก่งคอย-บ้านนา\nต.ตาลเดี่ยว อ.แก่งคอย\nสระบุรี 18110').split('\n')
  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link href="/" className="brand">
                {logoUrl ? (
                  <img src={logoUrl} alt="NORTHLAND" style={{ height: 40, width: 'auto' }} />
                ) : (
                  <>
                    <BrandMark white />
                    <span className="brand-name">NORTHLAND</span>
                  </>
                )}
              </Link>
              <p>{tagline || '30 ปีแห่งการสร้างที่อยู่อาศัยคุณภาพ ในสระบุรีและกรุงเทพมหานคร ที่เราใส่ใจในทุกรายละเอียด'}</p>
            </div>
            <div className="footer-col">
              <h4>โครงการ</h4>
              <ul>
                <li><Link href="/projects?location=saraburi">สระบุรี</Link></li>
                <li><Link href="/projects?location=bangkok">กรุงเทพฯ</Link></li>
                <li><Link href="/projects?type=single-house">บ้านเดี่ยว</Link></li>
                <li><Link href="/projects?type=condo">คอนโดมิเนียม</Link></li>
                <li><Link href="/projects?type=townhome">ทาวน์โฮม</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>เกี่ยวกับเรา</h4>
              <ul>
                <li><Link href="/about">เรื่องราว Northland</Link></li>
                <li><Link href="/progress">ความคืบหน้า</Link></li>
                <li><Link href="/after-sales">บริการหลังการขาย</Link></li>
                <li><Link href="/career">ร่วมงานกับเรา</Link></li>
                <li><Link href="/blog">บทความ</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>ติดต่อ</h4>
              <ul>
                {addressLines.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
                <li>📞 {phone || '088-888-8888'}</li>
                <li>✉ {email || 'info@northland.co.th'}</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Northland Development Co., Ltd. All rights reserved.</span>
            <span>30 Years Anniversary · 1996–2026</span>
          </div>
        </div>
      </footer>

      <a href="#" className="float-line" aria-label="Chat on LINE">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 5.84 2 10.56c0 4.23 3.55 7.78 8.35 8.46.32.07.76.21.87.48.1.25.07.63.03.88l-.14.85c-.04.25-.19.99.87.54s5.71-3.36 7.78-5.75c1.43-1.57 2.12-3.17 2.12-4.95C20.91 5.84 17.36 2 12 2z" />
        </svg>
      </a>
    </>
  )
}
