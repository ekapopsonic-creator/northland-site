import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getActivePromotions } from '@/lib/queries'
import { mediaUrl } from '@/lib/labels'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'โปรโมชั่น — Northland Development',
  description: 'โปรโมชั่นล่าสุดจากทุกโครงการของ Northland Development',
}

const thaiDate = (iso: string) =>
  new Date(iso).toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' })

export default async function PromotionsPage() {
  const promotions = await getActivePromotions()

  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <p className="page-hero-tag">Promotions</p>
          <h1 className="page-hero-title">โปรโมชั่นพิเศษ</h1>
          <p className="page-hero-sub">ข้อเสนอที่ดีที่สุดจากทุกโครงการของ Northland — อัปเดตล่าสุด</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {promotions.length > 0 ? (
            <div className="project-grid">
              {promotions.map((promo) => {
                const img = mediaUrl(promo.image)
                const projectTitle =
                  promo.project && typeof promo.project === 'object' ? promo.project.title : 'ทุกโครงการ'
                return (
                  <div className="project-card" key={promo.id}>
                    <div
                      className={`project-card-img${img ? ' has-image' : ''}`}
                      style={
                        img
                          ? { backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                          : { background: 'linear-gradient(135deg, #00AEEF, #03A1D1)' }
                      }
                    >
                      <span className="project-card-badge">โปรโมชั่น</span>
                    </div>
                    <div className="project-card-body">
                      <div className="project-card-type">{projectTitle}</div>
                      <h3 className="project-card-name">{promo.title}</h3>
                      {promo.description ? (
                        <div style={{ color: 'var(--ink-soft)', fontSize: '0.95rem', marginBottom: '1rem' }}>
                          <RichText data={promo.description} />
                        </div>
                      ) : null}
                      <div className="project-card-meta">
                        <span style={{ fontSize: '0.85rem', color: promo.endDate ? '#c33' : 'var(--ink-soft)' }}>
                          {promo.endDate ? `หมดเขต ${thaiDate(promo.endDate)}` : 'ไม่มีกำหนดหมดเขต'}
                        </span>
                        <Link href="/contact" className="project-card-link" style={{ color: 'var(--north-sea)' }}>
                          รับโปร →
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--ink-soft)', padding: '4rem 0' }}>
              ขณะนี้ยังไม่มีโปรโมชั่น — ติดตามข้อเสนอใหม่เร็วๆ นี้
            </p>
          )}
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <h2>สนใจโปรโมชั่นไหนอยู่?</h2>
          <p>ลงทะเบียนรับสิทธิ์ก่อนใคร ที่ปรึกษาการขายจะติดต่อกลับภายใน 24 ชั่วโมง</p>
          <Link href="/contact" className="btn btn-light btn-lg">ลงทะเบียนรับโปร</Link>
        </div>
      </section>
    </main>
  )
}
