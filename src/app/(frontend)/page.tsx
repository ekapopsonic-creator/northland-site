import React from 'react'
import Link from 'next/link'
import { getFeaturedProjects } from '@/lib/queries'
import { ProjectCard } from '@/components/ProjectCard'

export const revalidate = 60

export default async function HomePage() {
  const featured = await getFeaturedProjects()

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

          <form className="search-card" action="/projects">
            <div className="search-field">
              <label htmlFor="s-type">ประเภท</label>
              <select id="s-type" name="type" defaultValue="">
                <option value="">ทุกประเภท</option>
                <option value="single-house">บ้านเดี่ยว</option>
                <option value="pool-villa">พูลวิลล่า</option>
                <option value="townhome">ทาวน์โฮม</option>
                <option value="condo">คอนโดมิเนียม</option>
                <option value="commercial">อาคารพาณิชย์</option>
              </select>
            </div>
            <div className="search-field">
              <label htmlFor="s-loc">ทำเล</label>
              <select id="s-loc" name="location" defaultValue="">
                <option value="">ทุกทำเล</option>
                <option value="saraburi">สระบุรี</option>
                <option value="bangkok">กรุงเทพฯ</option>
              </select>
            </div>
            <div className="search-field">
              <label htmlFor="s-price">งบประมาณ</label>
              <select id="s-price" name="price" defaultValue="">
                <option value="">ทุกระดับ</option>
                <option value="low">ต่ำกว่า 3 ล้าน</option>
                <option value="mid">3 – 7 ล้าน</option>
                <option value="high">7 – 20 ล้าน</option>
                <option value="luxury">20 ล้านขึ้นไป</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary btn-lg">ค้นหา</button>
          </form>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '4rem' }}>
        <div className="container">
          <div className="stats">
            <div className="stat"><div className="stat-num">30+</div><div className="stat-label">ปีแห่งความใส่ใจ</div></div>
            <div className="stat"><div className="stat-num">23</div><div className="stat-label">โครงการ</div></div>
            <div className="stat"><div className="stat-num">3,209</div><div className="stat-label">ยูนิตที่ส่งมอบ</div></div>
            <div className="stat">
              <div className="stat-num">8,110<small style={{ fontSize: '0.4em' }}>MB</small></div>
              <div className="stat-label">มูลค่ารวม</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--paper-soft)' }}>
        <div className="container">
          <p className="section-tag">Featured Projects</p>
          <h2 className="section-title">โครงการเด่น</h2>
          <p className="section-subtitle">
            ผลงานล่าสุดของเรา ทั้งในสระบุรีและกรุงเทพมหานคร ที่สะท้อนความใส่ใจในทุกรายละเอียด
          </p>

          {featured.length > 0 ? (
            <div className="project-grid">
              {featured.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--ink-soft)', padding: '3rem 0' }}>
              ข้อมูลโครงการกำลังจะมาเร็วๆ นี้
            </p>
          )}

          <div className="text-center mt-4">
            <Link href="/projects" className="btn btn-ghost btn-lg">ดูโครงการทั้งหมด →</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="section-tag">Why Northland</p>
          <h2 className="section-title">ทำไมต้อง Northland</h2>
          <p className="section-subtitle">
            เพราะเราเชื่อว่าบ้านคือสิ่งสำคัญที่สุดในชีวิต เราจึงสร้างทุกหลังด้วยมาตรฐานเดียวกับที่เราอยากให้ครอบครัวของเราอยู่
          </p>

          <div className="features">
            <div className="feature">
              <div className="feature-icon">🏆</div>
              <h3>30 ปีของความใส่ใจ</h3>
              <p>ตั้งแต่ปี 2539 เราคัดสรรทำเล วัสดุ และทีมงานอย่างพิถีพิถัน ส่งมอบให้กว่า 3,200 ครอบครัว</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🏗️</div>
              <h3>ก่อสร้างได้คุณภาพ</h3>
              <p>ทุกโครงการผ่านการตรวจสอบ 5 ขั้นตอน ก่อนส่งมอบ พร้อมรับประกันโครงสร้าง 15 ปี</p>
            </div>
            <div className="feature">
              <div className="feature-icon">📍</div>
              <h3>ทำเลที่คัดสรร</h3>
              <p>ทุกโครงการอยู่ในทำเลที่เชื่อมต่อสะดวก ใกล้สิ่งอำนวยความสะดวก เพื่อชีวิตที่ง่ายขึ้น</p>
            </div>
            <div className="feature">
              <div className="feature-icon">💎</div>
              <h3>ดีไซน์ที่ไม่ซ้ำใคร</h3>
              <p>ออกแบบโดยสถาปนิกผู้เชี่ยวชาญ ให้ตอบโจทย์ทั้งฟังก์ชั่นการใช้งานและความสวยงาม</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🤝</div>
              <h3>บริการหลังการขาย</h3>
              <p>ทีมงานพร้อมดูแลตลอดการอยู่อาศัย ตั้งแต่วันส่งมอบจนถึงการซ่อมบำรุงในระยะยาว</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🌱</div>
              <h3>ใส่ใจสังคมผู้สูงอายุ</h3>
              <p>ออกแบบให้ครอบคลุมทุกช่วงวัย รองรับ Aging Society ด้วยมาตรฐาน Universal Design</p>
            </div>
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
