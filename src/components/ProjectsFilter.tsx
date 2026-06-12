'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'

export type ProjectCardData = {
  slug: string
  title: string
  category: string
  categoryLabel: string
  zone: string
  status: string
  statusLabel: string
  priceTier: string | null
  address: string
  startingPrice: string
  coverUrl: string | null
}

type Filters = {
  type: string
  location: string
  status: string
  price: string
}

export function ProjectsFilter({
  projects,
  initial,
}: {
  projects: ProjectCardData[]
  initial: Partial<Filters>
}) {
  const [filters, setFilters] = useState<Filters>({
    type: initial.type || '',
    location: initial.location || '',
    status: initial.status || '',
    price: initial.price || '',
  })

  const shown = useMemo(
    () =>
      projects.filter(
        (p) =>
          (!filters.type || p.category === filters.type) &&
          (!filters.location || p.zone === filters.location) &&
          (!filters.status || p.status === filters.status) &&
          (!filters.price || p.priceTier === filters.price),
      ),
    [projects, filters],
  )

  const set = (key: keyof Filters) => (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFilters((f) => ({ ...f, [key]: e.target.value }))

  return (
    <>
      <form className="filter-bar">
        <div className="filter-field">
          <label>ประเภท</label>
          <select value={filters.type} onChange={set('type')}>
            <option value="">ทุกประเภท</option>
            <option value="single-house">บ้านเดี่ยว</option>
            <option value="pool-villa">พูลวิลล่า</option>
            <option value="townhome">ทาวน์โฮม</option>
            <option value="condo">คอนโดมิเนียม</option>
            <option value="commercial">อาคารพาณิชย์</option>
          </select>
        </div>
        <div className="filter-field">
          <label>ทำเล</label>
          <select value={filters.location} onChange={set('location')}>
            <option value="">ทุกทำเล</option>
            <option value="saraburi">สระบุรี</option>
            <option value="bangkok">กรุงเทพฯ</option>
          </select>
        </div>
        <div className="filter-field">
          <label>สถานะ</label>
          <select value={filters.status} onChange={set('status')}>
            <option value="">ทุกสถานะ</option>
            <option value="coming-soon">เร็วๆ นี้</option>
            <option value="under-construction">กำลังก่อสร้าง</option>
            <option value="ready">พร้อมเข้าอยู่</option>
            <option value="sold-out">ปิดการขาย</option>
          </select>
        </div>
        <div className="filter-field">
          <label>งบประมาณ</label>
          <select value={filters.price} onChange={set('price')}>
            <option value="">ทุกระดับ</option>
            <option value="low">ต่ำกว่า 3 ล้าน</option>
            <option value="mid">3 – 7 ล้าน</option>
            <option value="high">7 – 20 ล้าน</option>
            <option value="luxury">20 ล้านขึ้นไป</option>
          </select>
        </div>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => setFilters({ type: '', location: '', status: '', price: '' })}
        >
          รีเซ็ต
        </button>
      </form>

      <p className="filter-results">
        พบ <strong>{shown.length}</strong> โครงการที่ตรงกับเงื่อนไข
      </p>

      <div className="project-grid">
        {shown.map((p) => (
          <Link key={p.slug} href={`/projects/${p.slug}`} className="project-card">
            <div
              className="project-card-img"
              style={
                p.coverUrl
                  ? {
                      backgroundImage: `url(${p.coverUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }
                  : undefined
              }
            >
              <span className="project-card-badge">{p.statusLabel}</span>
            </div>
            <div className="project-card-body">
              <div className="project-card-type">{p.categoryLabel}</div>
              <h3 className="project-card-name">{p.title}</h3>
              <p className="project-card-location">📍 {p.address}</p>
              <div className="project-card-meta">
                <div className="project-card-price">
                  {p.startingPrice || 'สอบถามราคา'}
                  {p.startingPrice ? <small> เริ่มต้น</small> : null}
                </div>
                <span className="project-card-link">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
