import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { PageSections } from '@/components/blocks/PageSections'
import { getProgressUpdates } from '@/lib/queries'
import { categoryLabels, zoneLabels, mediaUrl } from '@/lib/labels'
import type { Project } from '@/payload-types'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'ความคืบหน้าโครงการ — Northland Development',
  description: 'อัปเดตความคืบหน้าการก่อสร้างทุกโครงการของ Northland Development',
}

const thaiDate = (iso: string) =>
  new Date(iso).toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' })

export default async function ProgressPage() {
  const updates = await getProgressUpdates()

  // เอาเฉพาะอัปเดตล่าสุดของแต่ละโครงการ (เรียงใหม่สุดมาก่อนแล้ว)
  const latestByProject = new Map<number | string, (typeof updates)[number]>()
  for (const u of updates) {
    const project = u.project as Project | number
    const key = typeof project === 'object' ? project.id : project
    if (!latestByProject.has(key)) latestByProject.set(key, u)
  }
  const latest = [...latestByProject.values()]
  const lastUpdated = updates[0]?.updateDate

  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <p className="page-hero-tag">Construction Progress</p>
          <h1 className="page-hero-title">ความคืบหน้าโครงการ</h1>
          <p className="page-hero-sub">ติดตามการก่อสร้างของทุกโครงการ อัปเดตเป็นรายงวดพร้อมภาพหน้างานจริง</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {lastUpdated ? <p className="section-tag">Updated: {thaiDate(lastUpdated)}</p> : null}
          <h2 className="section-title">โครงการที่อยู่ระหว่างก่อสร้าง</h2>

          {latest.length > 0 ? (
            <div className="project-grid">
              {latest.map((u) => {
                const project = typeof u.project === 'object' ? u.project : null
                const photos = (u.photos || []).filter((p) => mediaUrl(p.image))
                const firstPhoto = photos[0] ? mediaUrl(photos[0].image) : null
                return (
                  <div className="progress-card" key={u.id}>
                    <div
                      className={`project-card-img${firstPhoto ? ' has-image' : ''}`}
                      style={
                        firstPhoto
                          ? { backgroundImage: `url(${firstPhoto})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                          : undefined
                      }
                    >
                      <span className="project-card-badge">{u.percent}% Complete</span>
                    </div>
                    <div className="project-card-body">
                      {project ? (
                        <div className="project-card-type">
                          {categoryLabels[project.category] || ''} · {zoneLabels[project.zone] || ''}
                        </div>
                      ) : null}
                      <h3 className="project-card-name">{project?.title || 'โครงการ'}</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)' }}>
                        {u.title} · {thaiDate(u.updateDate)}
                      </p>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${u.percent}%` }} />
                      </div>
                      {u.description ? (
                        <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)' }}>{u.description}</p>
                      ) : null}
                      {photos.length > 1 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem', marginTop: '0.75rem' }}>
                          {photos.slice(1, 4).map((p) => (
                            <img
                              key={p.id}
                              src={mediaUrl(p.image) || ''}
                              alt={p.caption || ''}
                              style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: '8px' }}
                            />
                          ))}
                        </div>
                      ) : null}
                      {project?.slug ? (
                        <Link href={`/projects/${project.slug}`} className="btn btn-ghost" style={{ marginTop: '1rem', width: '100%' }}>
                          ดูข้อมูลโครงการ
                        </Link>
                      ) : null}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--ink-soft)', padding: '4rem 0' }}>
              ยังไม่มีรายงานความคืบหน้า — ทีมงานจะอัปเดตเร็วๆ นี้
            </p>
          )}
        </div>
      </section>

      <section className="section" style={{ background: 'var(--paper-soft)' }}>
        <div className="container">
          <p className="section-tag">Quality Assurance</p>
          <h2 className="section-title">มาตรฐานการก่อสร้าง</h2>
          <p className="section-subtitle">
            ทุกขั้นตอนของการสร้างบ้าน Northland ผ่านการตรวจสอบและรับรองคุณภาพ 5 ขั้น ก่อนส่งมอบให้ลูกค้า
          </p>
          <div className="features">
            <div className="feature"><div className="feature-icon">1</div><h3>การวางแผน &amp; ออกแบบ</h3><p>ออกแบบโดยสถาปนิกผู้เชี่ยวชาญ ผ่านการตรวจสอบโครงสร้างวิศวกรรม</p></div>
            <div className="feature"><div className="feature-icon">2</div><h3>คัดเลือกวัสดุ</h3><p>ใช้วัสดุคุณภาพระดับ Premium ผ่านการทดสอบมาตรฐาน TIS &amp; ISO</p></div>
            <div className="feature"><div className="feature-icon">3</div><h3>ควบคุมงานก่อสร้าง</h3><p>วิศวกรประจำโครงการตรวจสอบทุกขั้นตอน พร้อมรายงานความคืบหน้า</p></div>
            <div className="feature"><div className="feature-icon">4</div><h3>ตรวจสอบคุณภาพ</h3><p>QC ตรวจละเอียดทุกจุดก่อนส่งมอบ พร้อมแก้ไขจนสมบูรณ์</p></div>
            <div className="feature"><div className="feature-icon">5</div><h3>ส่งมอบ &amp; รับประกัน</h3><p>ส่งมอบพร้อมเอกสารครบถ้วน และการรับประกันโครงสร้าง 15 ปี</p></div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <h2>อยากเห็นความคืบหน้าโครงการที่คุณจอง?</h2>
          <p>ติดต่อที่ปรึกษาการขาย เพื่อรับรายงานและภาพหน้างานล่าสุด</p>
          <Link href="/contact" className="btn btn-light btn-lg">ติดต่อเรา</Link>
        </div>
      </section>

      <PageSections slug="progress" />
    </main>
  )
}
