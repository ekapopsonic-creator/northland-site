'use client'

import React, { useState } from 'react'

type Status = { type: 'idle' | 'success' | 'error'; message: string }

const issueTypes = [
  'โครงสร้าง / รอยร้าว',
  'ระบบไฟฟ้า',
  'ระบบประปา / สุขภัณฑ์',
  'หลังคา / กันซึม',
  'ประตู / หน้าต่าง / พื้น',
  'แอร์ / เครื่องใช้ไฟฟ้า',
  'อื่นๆ',
]

export function RepairForm({ projectOptions }: { projectOptions: { id: number; title: string }[] }) {
  const [status, setStatus] = useState<Status>({ type: 'idle', message: '' })
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)

    const name = String(fd.get('name') || '').trim()
    const phone = String(fd.get('phone') || '').trim()
    const desc = String(fd.get('message') || '').trim()
    if (!name || !phone || !desc) {
      setStatus({ type: 'error', message: '⚠ กรุณากรอกชื่อ เบอร์โทร และรายละเอียดปัญหา' })
      return
    }

    const projectId = String(fd.get('project') || '')
    const selected = projectOptions.find((p) => String(p.id) === projectId)
    const unit = String(fd.get('unit') || '').trim()
    const issue = String(fd.get('issue') || '')

    setSubmitting(true)
    setStatus({ type: 'idle', message: '' })
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          interestProject: selected ? selected.id : undefined,
          interestText: selected ? selected.title : undefined,
          message: `[แจ้งซ่อม] ${issue ? `ประเภท: ${issue} · ` : ''}${unit ? `ยูนิต: ${unit} · ` : ''}${desc}`,
          consentPDPA: true,
          source: 'repair-request',
        }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus({ type: 'success', message: '✓ รับเรื่องแล้ว ทีมช่างจะติดต่อกลับภายใน 24 ชั่วโมง' })
      form.reset()
    } catch {
      setStatus({ type: 'error', message: '⚠ ส่งคำขอไม่สำเร็จ กรุณาลองใหม่ หรือโทร 088-888-8888' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-grid two-col">
        <div className="field">
          <label htmlFor="r-name">ชื่อ – นามสกุล <span style={{ color: '#c33' }}>*</span></label>
          <input id="r-name" name="name" required />
        </div>
        <div className="field">
          <label htmlFor="r-phone">เบอร์โทร <span style={{ color: '#c33' }}>*</span></label>
          <input id="r-phone" name="phone" type="tel" required />
        </div>
      </div>
      <div className="form-grid two-col" style={{ marginTop: '1.25rem' }}>
        <div className="field">
          <label htmlFor="r-project">โครงการ</label>
          <select id="r-project" name="project" defaultValue="">
            <option value="">เลือกโครงการ</option>
            {projectOptions.map((p) => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="r-unit">เลขที่บ้าน / ยูนิต</label>
          <input id="r-unit" name="unit" placeholder="เช่น 123/45" />
        </div>
      </div>
      <div className="form-grid" style={{ marginTop: '1.25rem' }}>
        <div className="field">
          <label htmlFor="r-issue">ประเภทปัญหา</label>
          <select id="r-issue" name="issue" defaultValue="">
            <option value="">เลือกประเภท</option>
            {issueTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="r-desc">รายละเอียดปัญหา <span style={{ color: '#c33' }}>*</span></label>
          <textarea id="r-desc" name="message" required placeholder="เช่น แอร์ห้องนอนใหญ่ไม่เย็น เปิดมา 1 สัปดาห์แล้ว" />
        </div>
      </div>
      <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: '1.5rem' }} disabled={submitting}>
        {submitting ? 'กำลังส่ง...' : 'ส่งคำขอ'}
      </button>
      {status.type !== 'idle' ? (
        <div className={`form-status ${status.type}`}>{status.message}</div>
      ) : (
        <div className="form-status" />
      )}
    </form>
  )
}
