import React from 'react'
import Link from 'next/link'
import { getFeaturedProjects, getPageBySlug } from '@/lib/queries'
import { ProjectCard } from '@/components/ProjectCard'
import { HeroSearch } from '@/components/HeroSearch'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'

export const revalidate = 60

export default async function HomePage() {
  const [page, featured] = await Promise.all([getPageBySlug('home'), getFeaturedProjects()])

  // ถ้าทีมจัด layout หน้าแรกในหลังบ้านแล้ว → ใช้บล็อก
  if (page?.layout?.length) {
    return (
      <main>
        <BlockRenderer blocks={page.layout as any[]} featuredProjects={featured} />
      </main>
    )
  }

  // fallback — หน้าแรกมาตรฐาน (ถ้ายังไม่ได้ตั้งค่าในหลังบ้าน)
  return (
    <main>
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <p className="hero-eyebrow">30 Years Anniversary · 1996–2026</p>
            <h1 className="hero-title">ที่เราใส่ใจ</h1>
            <p className="hero-tagline">บ้าน คอนโด ทาวน์โฮม — ที่ไม่ใช่แค่ที่อยู่อาศัย</p>
            <p className="hero-lead">
              Northland Development กว่า 30 ปีของการสร้างชุมชนที่มีคุณภาพ ในสระบุรีและกรุงเทพมหานคร
              ด้วยมาตรฐานที่ตั้งใจ และความใส่ใจในรายละเอียด
            </p>
            <div className="hero-cta">
              <Link href="/projects" className="btn btn-light btn-lg">ดูโครงการทั้งหมด</Link>
              <Link href="/about" className="btn btn-outline-white btn-lg">เรื่องราว 30 ปี</Link>
            </div>
          </div>
          <HeroSearch />
        </div>
      </section>

      <section className="section" style={{ background: 'var(--paper-soft)' }}>
        <div className="container">
          <p className="section-tag">Featured Projects</p>
          <h2 className="section-title">โครงการเด่น</h2>
          <p className="section-subtitle">ผลงานล่าสุดของเรา ทั้งในสระบุรีและกรุงเทพมหานคร</p>
          <div className="project-grid">
            {featured.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
          <div className="text-center mt-4">
            <Link href="/projects" className="btn btn-ghost btn-lg">ดูโครงการทั้งหมด →</Link>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <h2>พร้อมหาบ้านที่ใช่แล้วหรือยัง?</h2>
          <p>ปรึกษาที่ปรึกษาการขาย เพื่อรับโปรโมชั่นพิเศษและคำแนะนำที่ตรงกับคุณ</p>
          <Link href="/contact" className="btn btn-light btn-lg">นัดเยี่ยมชมโครงการ</Link>
        </div>
      </section>
    </main>
  )
}
