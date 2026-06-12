import React from 'react'
import type { Metadata } from 'next'
import { getActiveJobs } from '@/lib/queries'
import { JobApplyForm } from '@/components/JobApplyForm'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'ร่วมงานกับเรา — Northland Development',
  description: 'ตำแหน่งงานที่เปิดรับของ Northland Development — มาร่วมสร้างบ้านคุณภาพไปด้วยกัน',
}

const typeLabels: Record<string, string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  contract: 'Contract',
}

export default async function CareerPage() {
  const jobs = await getActiveJobs()

  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <p className="page-hero-tag">Careers</p>
          <h1 className="page-hero-title">ร่วมงานกับเรา</h1>
          <p className="page-hero-sub">มาร่วมสร้าง "ที่เราใส่ใจ" ไปด้วยกัน — เติบโตไปพร้อมกับ Northland</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="section-tag">Our Culture</p>
          <h2 className="section-title">วัฒนธรรมของเรา</h2>
          <p className="section-subtitle">
            ที่ Northland เราเชื่อว่าคนคือสิ่งที่สำคัญที่สุด — เพราะคนของเรา คือคนที่สร้างบ้านของคุณ
          </p>

          <div className="features">
            <div className="feature">
              <div className="feature-icon">🚀</div>
              <h3>เติบโตไปด้วยกัน</h3>
              <p>มีเส้นทางอาชีพชัดเจน · งบอบรมและเรียนรู้เพิ่มเติม 30,000 บาท/ปี · โอกาสเรียนต่อในและต่างประเทศ</p>
            </div>
            <div className="feature">
              <div className="feature-icon">⚖️</div>
              <h3>Work-Life Balance</h3>
              <p>วันลา 14 วัน/ปี · WFH 2 วัน/สัปดาห์ · ประกันสุขภาพครอบครัว · โบนัส 2-4 เดือน</p>
            </div>
            <div className="feature">
              <div className="feature-icon">💡</div>
              <h3>นวัตกรรมไม่หยุดนิ่ง</h3>
              <p>เปิดรับไอเดียใหม่ · ทดลองเทคโนโลยีใหม่ๆ ในการก่อสร้างและการออกแบบ</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--paper-soft)' }}>
        <div className="container">
          <p className="section-tag">Open Positions</p>
          <h2 className="section-title">ตำแหน่งที่เปิดรับ</h2>

          {jobs.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="progress-card"
                  style={{ padding: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <div>
                    {job.department ? (
                      <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--north-sea)', fontWeight: 500 }}>
                        {job.department}
                      </p>
                    ) : null}
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--ink)', margin: '0.2rem 0' }}>
                      {job.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)' }}>
                      📍 {job.location || 'สำนักงานใหญ่ (Saraburi)'} · {typeLabels[job.employmentType || 'full-time']}
                    </p>
                  </div>
                  <a href="#apply" className="btn btn-primary">สมัครงาน</a>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--ink-soft)', padding: '3rem 0' }}>
              ขณะนี้ยังไม่มีตำแหน่งเปิดรับ — ส่ง resume เก็บไว้ได้ที่ฟอร์มด้านล่าง
            </p>
          )}

          <p style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--ink-soft)' }}>
            ไม่เห็นตำแหน่งที่คุณสนใจ? ส่งใบสมัครพร้อม resume ผ่านฟอร์มด้านล่าง หรืออีเมล{' '}
            <a href="mailto:career@northland.co.th" style={{ color: 'var(--north-sea)' }}>career@northland.co.th</a>
          </p>
        </div>
      </section>

      <section className="section" id="apply">
        <div className="container" style={{ maxWidth: 820 }}>
          <p className="section-tag">Apply Online</p>
          <h2 className="section-title">สมัครงานออนไลน์</h2>
          <p style={{ color: 'var(--ink-soft)', marginBottom: '2rem' }}>
            กรอกข้อมูลพร้อมแนบ CV (PDF) ทีม HR จะติดต่อกลับโดยเร็วที่สุด
          </p>
          <JobApplyForm jobs={jobs.map((j) => ({ id: j.id, title: j.title }))} />
        </div>
      </section>
    </main>
  )
}
