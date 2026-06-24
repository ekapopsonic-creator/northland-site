import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { PageSections } from '@/components/blocks/PageSections'

export const metadata: Metadata = {
  title: 'เกี่ยวกับเรา — Northland Development',
  description: 'เรื่องราว 30 ปีของ Northland Development — จากสระบุรีสู่กรุงเทพมหานคร',
}

export default function AboutPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <p className="page-hero-tag">About Us</p>
          <h1 className="page-hero-title">เรื่องราวของเรา</h1>
          <p className="page-hero-sub">30 ปีแห่งการสร้างที่อยู่อาศัยคุณภาพ — ที่เราใส่ใจ</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="detail-grid">
            <div>
              <p className="section-tag">CEO Message</p>
              <h2 className="section-title">สาส์นจากประธานเจ้าหน้าที่บริหาร</h2>
              <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: 1.8 }}>
                &ldquo;กว่า 30 ปีที่ผ่านมา Northland Development มุ่งมั่นในการสร้างที่อยู่อาศัยคุณภาพ
                ที่ไม่ใช่แค่บ้าน — แต่เป็นพื้นที่แห่งความสุข ที่ครอบครัวจะเติบโตไปด้วยกัน&rdquo;
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                เราเริ่มต้นในจังหวัดสระบุรี ด้วยความตั้งใจที่จะยกระดับมาตรฐานบ้านในต่างจังหวัด
                ให้เทียบเท่ากับโครงการในกรุงเทพมหานคร และวันนี้เราภูมิใจที่ได้ขยายมาสู่หัวใจของเมืองหลวง
                พร้อมโครงการระดับ Luxury อย่าง Attaluck
              </p>
              <p style={{ marginBottom: '2rem' }}>
                ในทศวรรษหน้า เราจะยังคงยึดมั่นในหลักการเดียวกัน — &ldquo;ที่เราใส่ใจ&rdquo; ทั้งในวัสดุ
                การก่อสร้าง ดีไซน์ และการบริการหลังการขาย เพื่อให้ทุกบ้านที่เราสร้าง
                เป็นบ้านที่คุณภูมิใจที่จะอาศัยอยู่
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--ink)' }}>
                — นพดล ธรรมวิวัฒน์
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--ink-soft)' }}>
                ประธานเจ้าหน้าที่บริหาร · Northland Development
              </p>
            </div>

            <aside>
              <div className="sticky-cta">
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1.25rem' }}>
                  วิสัยทัศน์ &amp; พันธกิจ
                </h3>
                <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--north-sea)', marginBottom: '0.5rem', fontWeight: 500 }}>
                  Vision
                </p>
                <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                  เป็นบริษัทพัฒนาอสังหาริมทรัพย์อันดับ 1 ในใจคนไทย ด้วยมาตรฐานที่ใส่ใจในทุกรายละเอียด
                </p>
                <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--north-sea)', marginBottom: '0.5rem', fontWeight: 500 }}>
                  Mission
                </p>
                <ul style={{ fontSize: '0.9rem', paddingLeft: '1.25rem', lineHeight: 1.8 }}>
                  <li>ตอบโจทย์ไลฟ์สไตล์คนสังคมเมือง</li>
                  <li>นำนวัตกรรมมาสู่การอยู่อาศัย</li>
                  <li>รองรับสังคมผู้สูงอายุ (Aging Society)</li>
                  <li>ออกแบบที่ไม่ซ้ำใคร และตอบโจทย์การใช้งานจริง</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--paper-soft)' }}>
        <div className="container">
          <p className="section-tag">Our Journey</p>
          <h2 className="section-title">เส้นทาง 30 ปี</h2>
          <p className="section-subtitle">จากโครงการแรกในสระบุรี สู่ Luxury Pool Villa ใจกลางกรุงเทพฯ</p>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-year">1996</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', margin: '0.5rem 0' }}>ก่อตั้ง Northland</h3>
              <p className="timeline-text">เริ่มต้นด้วยโครงการบ้านเดี่ยวแรกในจังหวัดสระบุรี ภายใต้วิสัยทัศน์ &ldquo;ที่เราใส่ใจ&rdquo;</p>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2005</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', margin: '0.5rem 0' }}>ขยายโครงการในสระบุรี</h3>
              <p className="timeline-text">เปิดโครงการ Pundara และ Tarafhasai — สร้างมาตรฐานใหม่ของบ้านในต่างจังหวัด</p>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2012</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', margin: '0.5rem 0' }}>บุกตลาดทาวน์โฮม</h3>
              <p className="timeline-text">เปิดโครงการ The Pine และ The Green — ตอบโจทย์ครอบครัวรุ่นใหม่ในงบประมาณที่เข้าถึงได้</p>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2018</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', margin: '0.5rem 0' }}>ก้าวสู่กรุงเทพมหานคร</h3>
              <p className="timeline-text">เปิดโครงการคอนโด Beat บางหว้า และ Beat สุขุมวิท — รุกตลาดผู้ซื้อใน CBD</p>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2023</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', margin: '0.5rem 0' }}>เปิดตัว Attaluck</h3>
              <p className="timeline-text">Luxury Pool Villa ใจกลางสุขุมวิท — ก้าวสู่ตลาด Premium มูลค่า 272 ล้านบาท</p>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2026</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', margin: '0.5rem 0' }}>30 ปี Northland</h3>
              <p className="timeline-text">23 โครงการ · 3,209 ยูนิต · 8,110 ล้านบาท — และยังคงเดินต่อด้วยความใส่ใจเดิม</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="section-tag">By the Numbers</p>
          <h2 className="section-title">Northland ในตัวเลข</h2>
          <div className="stats" style={{ marginTop: '2rem' }}>
            <div className="stat"><div className="stat-num">30+</div><div className="stat-label">ปีของประสบการณ์</div></div>
            <div className="stat"><div className="stat-num">23</div><div className="stat-label">โครงการที่พัฒนา</div></div>
            <div className="stat"><div className="stat-num">3,209</div><div className="stat-label">ยูนิตที่ส่งมอบ</div></div>
            <div className="stat">
              <div className="stat-num">8,110<small style={{ fontSize: '0.4em' }}>MB</small></div>
              <div className="stat-label">มูลค่าโครงการรวม</div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <h2>มาเป็นส่วนหนึ่งของครอบครัว Northland</h2>
          <p>ชมโครงการที่ใช่สำหรับคุณ หรือร่วมเป็นทีมงานที่สร้างบ้านด้วยความใส่ใจ</p>
          <Link href="/projects" className="btn btn-light btn-lg">ดูโครงการทั้งหมด</Link>
        </div>
      </section>

      <PageSections slug="about" />
    </main>
  )
}
