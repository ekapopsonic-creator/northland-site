'use client'

import React, { useState } from 'react'

type Status = { type: 'idle' | 'success' | 'error'; message: string }

export function LeadForm({ projectOptions }: { projectOptions: { id: number; title: string }[] }) {
  const [status, setStatus] = useState<Status>({ type: 'idle', message: '' })
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)

    const name = String(fd.get('name') || '').trim()
    const phone = String(fd.get('phone') || '').trim()
    if (!name || !phone) {
      setStatus({ type: 'error', message: '⚠ กรุณากรอกชื่อและเบอร์โทรศัพท์' })
      return
    }

    const projectId = String(fd.get('interest') || '')
    const selected = projectOptions.find((p) => String(p.id) === projectId)

    setSubmitting(true)
    setStatus({ type: 'idle', message: '' })
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email: String(fd.get('email') || '') || undefined,
          interestProject: selected ? selected.id : undefined,
          interestText: selected ? selected.title : 'ทุกโครงการ / ยังไม่ระบุ',
          budget: String(fd.get('budget') || '') || undefined,
          message: String(fd.get('message') || '') || undefined,
          consentPDPA: true,
          source: 'website',
        }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus({ type: 'success', message: '✓ ขอบคุณครับ ทีมงาน Northland จะติดต่อกลับภายใน 24 ชั่วโมง' })
      form.reset()
    } catch {
      setStatus({ type: 'error', message: '⚠ ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่ หรือโทร 088-888-8888' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-grid two-col">
        <div className="field">
          <label htmlFor="name">ชื่อ – นามสกุล <span style={{ color: '#c33' }}>*</span></label>
          <input id="name" name="name" required placeholder="เช่น สมชาย ใจดี" />
        </div>
        <div className="field">
          <label htmlFor="phone">เบอร์โทรศัพท์ <span style={{ color: '#c33' }}>*</span></label>
          <input id="phone" name="phone" type="tel" required placeholder="08X-XXX-XXXX" />
        </div>
      </div>
      <div className="form-grid two-col" style={{ marginTop: '1.25rem' }}>
        <div className="field">
          <label htmlFor="email">อีเมล</label>
          <input id="email" name="email" type="email" placeholder="you@example.com" />
        </div>
        <div className="field">
          <label htmlFor="interest">โครงการที่สนใจ</label>
          <select id="interest" name="interest" defaultValue="">
            <option value="">ทุกโครงการ / ยังไม่ระบุ</option>
            {projectOptions.map((p) => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-grid" style={{ marginTop: '1.25rem' }}>
        <div className="field">
          <label htmlFor="budget">งบประมาณ</label>
          <select id="budget" name="budget" defaultValue="">
            <option value="">เลือกงบประมาณ</option>
            <option value="under-3m">ต่ำกว่า 3 ล้านบาท</option>
            <option value="3-7m">3 – 7 ล้านบาท</option>
            <option value="7-20m">7 – 20 ล้านบาท</option>
            <option value="20m-up">20 ล้านบาทขึ้นไป</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="message">ข้อความเพิ่มเติม</label>
          <textarea id="message" name="message" placeholder="เช่น สนใจเข้าชมโครงการวันเสาร์-อาทิตย์, ต้องการข้อมูลสินเชื่อ, ฯลฯ" />
        </div>
      </div>
      <label className="field-checkbox" style={{ marginTop: '1.25rem' }}>
        <input type="checkbox" required />
        <span>
          ฉันยินยอมให้ Northland จัดเก็บและใช้ข้อมูลส่วนบุคคลของฉัน เพื่อการติดต่อกลับและให้ข้อมูลโครงการ ตาม{' '}
          <a href="#" style={{ color: 'var(--north-sea)' }}>นโยบายความเป็นส่วนตัว</a>
        </span>
      </label>
      <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: '1.5rem' }} disabled={submitting}>
        {submitting ? 'กำลังส่ง...' : 'ส่งข้อมูล'}
      </button>
      {status.type !== 'idle' ? (
        <div className={`form-status ${status.type}`}>{status.message}</div>
      ) : (
        <div className="form-status" />
      )}
    </form>
  )
}
