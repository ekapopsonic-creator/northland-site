import React from 'react'
import type { Metadata } from 'next'
import { PageSections } from '@/components/blocks/PageSections'
import { getPublishedProjects } from '@/lib/queries'
import { LeadForm } from '@/components/LeadForm'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'ติดต่อเรา — Northland Development',
  description: 'ลงทะเบียนรับข้อมูลโครงการ นัดเยี่ยมชม หรือสอบถามข้อมูลกับทีมงาน Northland',
}

export default async function ContactPage() {
  const projects = await getPublishedProjects()
  const projectOptions = projects
    .filter((p) => p.status !== 'sold-out')
    .map((p) => ({ id: p.id, title: p.title }))

  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <p className="page-hero-tag">Contact Us</p>
          <h1 className="page-hero-title">ติดต่อเรา</h1>
          <p className="page-hero-sub">ลงทะเบียนรับข้อมูล นัดเยี่ยมชมโครงการ หรือสอบถามทุกเรื่องกับทีมงานของเรา</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="detail-grid">
            <div>
              <p className="section-tag">Lead Form</p>
              <h2 className="section-title">ลงทะเบียนรับข้อมูล</h2>
              <p style={{ color: 'var(--ink-soft)', marginBottom: '2rem' }}>
                กรอกข้อมูลด้านล่าง ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง
              </p>
              <LeadForm projectOptions={projectOptions} />
            </div>

            <aside>
              <div className="sticky-cta">
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                  ช่องทางอื่นๆ
                </h3>

                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--ink-soft)', marginBottom: '0.5rem' }}>
                    โทรศัพท์
                  </p>
                  <a href="tel:0888888888" style={{ fontSize: '1.25rem', fontWeight: 500, color: 'var(--north-sea)' }}>
                    088-888-8888
                  </a>
                  <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', marginTop: '0.25rem' }}>
                    จันทร์ – อาทิตย์ 9.00 – 18.00 น.
                  </p>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--ink-soft)', marginBottom: '0.5rem' }}>
                    LINE Official
                  </p>
                  <a href="#" className="btn" style={{ background: '#06C755', color: 'white', width: '100%' }}>
                    💬 เพิ่มเพื่อน @northland
                  </a>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--ink-soft)', marginBottom: '0.5rem' }}>
                    อีเมล
                  </p>
                  <a href="mailto:info@northland.co.th" style={{ color: 'var(--ink)' }}>info@northland.co.th</a>
                </div>

                <hr className="divider" style={{ margin: '1.5rem 0' }} />

                <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--ink-soft)', marginBottom: '0.5rem' }}>
                  สำนักงานใหญ่
                </p>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.8 }}>
                  110 ม.8 ถนนแก่งคอย-บ้านนา<br />
                  ต.ตาลเดี่ยว อ.แก่งคอย<br />
                  สระบุรี 18110
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <PageSections slug="contact" />
    </main>
  )
}
