'use client'

import React, { useState } from 'react'

type Status = { type: 'idle' | 'success' | 'error'; message: string }

export function JobApplyForm({ jobs }: { jobs: { id: number; title: string }[] }) {
  const [status, setStatus] = useState<Status>({ type: 'idle', message: '' })
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)

    const name = String(fd.get('name') || '').trim()
    const phone = String(fd.get('phone') || '').trim()
    const cvFile = fd.get('cv') as File | null
    if (!name || !phone) {
      setStatus({ type: 'error', message: '⚠ กรุณากรอกชื่อและเบอร์โทรศัพท์' })
      return
    }

    setSubmitting(true)
    setStatus({ type: 'idle', message: '' })
    try {
      let cvId: number | undefined
      if (cvFile && cvFile.size > 0) {
        if (cvFile.type !== 'application/pdf') {
          setStatus({ type: 'error', message: '⚠ ไฟล์ CV ต้องเป็น PDF เท่านั้น' })
          setSubmitting(false)
          return
        }
        const uploadFd = new FormData()
        uploadFd.append('file', cvFile)
        const uploadRes = await fetch('/api/cv-files', { method: 'POST', body: uploadFd })
        if (!uploadRes.ok) throw new Error('CV upload failed')
        const uploaded = await uploadRes.json()
        cvId = uploaded.doc?.id
      }

      const jobId = String(fd.get('job') || '')
      const res = await fetch('/api/job-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email: String(fd.get('email') || '') || undefined,
          job: jobId ? Number(jobId) : undefined,
          coverNote: String(fd.get('coverNote') || '') || undefined,
          cv: cvId,
        }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus({ type: 'success', message: '✓ ส่งใบสมัครเรียบร้อย ทีม HR จะติดต่อกลับโดยเร็วที่สุด' })
      form.reset()
    } catch {
      setStatus({ type: 'error', message: '⚠ ส่งใบสมัครไม่สำเร็จ กรุณาลองใหม่ หรือส่งอีเมลมาที่ career@northland.co.th' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-grid two-col">
        <div className="field">
          <label htmlFor="a-name">ชื่อ – นามสกุล <span style={{ color: '#c33' }}>*</span></label>
          <input id="a-name" name="name" required />
        </div>
        <div className="field">
          <label htmlFor="a-phone">เบอร์โทรศัพท์ <span style={{ color: '#c33' }}>*</span></label>
          <input id="a-phone" name="phone" type="tel" required />
        </div>
      </div>
      <div className="form-grid two-col" style={{ marginTop: '1.25rem' }}>
        <div className="field">
          <label htmlFor="a-email">อีเมล</label>
          <input id="a-email" name="email" type="email" />
        </div>
        <div className="field">
          <label htmlFor="a-job">ตำแหน่งที่สมัคร</label>
          <select id="a-job" name="job" defaultValue="">
            <option value="">เลือกตำแหน่ง</option>
            {jobs.map((j) => (
              <option key={j.id} value={j.id}>{j.title}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-grid" style={{ marginTop: '1.25rem' }}>
        <div className="field">
          <label htmlFor="a-cv">ไฟล์ CV / Resume (PDF)</label>
          <input id="a-cv" name="cv" type="file" accept="application/pdf" />
        </div>
        <div className="field">
          <label htmlFor="a-note">แนะนำตัวสั้นๆ</label>
          <textarea id="a-note" name="coverNote" placeholder="เล่าประสบการณ์และเหตุผลที่อยากร่วมงานกับเรา" />
        </div>
      </div>
      <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: '1.5rem' }} disabled={submitting}>
        {submitting ? 'กำลังส่ง...' : 'ส่งใบสมัคร'}
      </button>
      {status.type !== 'idle' ? (
        <div className={`form-status ${status.type}`}>{status.message}</div>
      ) : (
        <div className="form-status" />
      )}
    </form>
  )
}
