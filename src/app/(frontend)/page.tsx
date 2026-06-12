import React from 'react'

export default function HomePage() {
  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '4rem 1.5rem', lineHeight: 1.8 }}>
      <h1 style={{ color: '#00AEEF' }}>Northland Development</h1>
      <p>
        เว็บไซต์ Phase 2 อยู่ระหว่างการพัฒนา — หน้าบ้าน (10 หน้า) จะย้ายจาก HTML เดิมมาใน Sprint 3
      </p>
      <p>
        <a href="/admin" style={{ color: '#03A1D1' }}>
          → เข้าสู่ระบบหลังบ้าน (Admin)
        </a>
      </p>
    </main>
  )
}
