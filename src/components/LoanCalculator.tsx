'use client'

import React, { useState } from 'react'

export function LoanCalculator() {
  const [price, setPrice] = useState('')
  const [downPct, setDownPct] = useState('10')
  const [years, setYears] = useState('30')
  const [rate, setRate] = useState('3.5')
  const [result, setResult] = useState<string | null>(null)

  const calculate = () => {
    const p = parseFloat(price.replace(/,/g, ''))
    const d = parseFloat(downPct) || 0
    const y = parseInt(years) || 30
    const r = parseFloat(rate) || 3.5
    if (!p || p <= 0) {
      setResult(null)
      return
    }
    const principal = p * (1 - d / 100)
    const monthlyRate = r / 100 / 12
    const n = y * 12
    const monthly =
      monthlyRate > 0
        ? (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
        : principal / n
    setResult(monthly.toLocaleString('th-TH', { maximumFractionDigits: 0 }))
  }

  return (
    <div className="sticky-cta">
      <p className="section-tag" style={{ marginBottom: '0.5rem' }}>Loan Calculator</p>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1.25rem' }}>
        คำนวณค่าผ่อนเบื้องต้น
      </h3>

      <div className="field" style={{ marginBottom: '1rem' }}>
        <label>ราคาบ้าน (บาท)</label>
        <input type="number" placeholder="3,500,000" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div className="field" style={{ marginBottom: '1rem' }}>
        <label>เงินดาวน์ (%)</label>
        <input type="number" placeholder="10" value={downPct} onChange={(e) => setDownPct(e.target.value)} />
      </div>
      <div className="field" style={{ marginBottom: '1rem' }}>
        <label>ระยะเวลาผ่อน (ปี)</label>
        <select value={years} onChange={(e) => setYears(e.target.value)}>
          <option value="30">30 ปี</option>
          <option value="25">25 ปี</option>
          <option value="20">20 ปี</option>
          <option value="15">15 ปี</option>
        </select>
      </div>
      <div className="field" style={{ marginBottom: '1.5rem' }}>
        <label>ดอกเบี้ย (% ต่อปี)</label>
        <input type="number" step="0.1" placeholder="3.5" value={rate} onChange={(e) => setRate(e.target.value)} />
      </div>

      <button type="button" className="btn btn-primary btn-block" onClick={calculate}>
        คำนวณ
      </button>

      {result ? (
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)' }}>ค่าผ่อนโดยประมาณ</p>
          <p style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--north-sea)' }}>
            {result} <span style={{ fontSize: '0.9rem' }}>บาท/เดือน</span>
          </p>
        </div>
      ) : null}

      <hr className="divider" style={{ margin: '1.5rem 0' }} />
      <p style={{ fontSize: '0.8rem', color: 'var(--ink-soft)', textAlign: 'center' }}>
        * ตัวเลขเบื้องต้น โปรดติดต่อธนาคารเพื่อข้อมูลที่แน่นอน
      </p>
    </div>
  )
}
