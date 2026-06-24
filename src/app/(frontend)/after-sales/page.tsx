import React from 'react'
import type { Metadata } from 'next'
import { PageSections } from '@/components/blocks/PageSections'
import { getPublishedProjects } from '@/lib/queries'
import { RepairForm } from '@/components/RepairForm'
import { LoanCalculator } from '@/components/LoanCalculator'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'บริการหลังการขาย — Northland Development',
  description: 'แจ้งซ่อมออนไลน์ การรับประกัน คำนวณสินเชื่อ และบริการหลังการขายทั้งหมดของ Northland',
}

export default async function AfterSalesPage() {
  const projects = await getPublishedProjects()
  const projectOptions = projects.map((p) => ({ id: p.id, title: p.title }))

  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <p className="page-hero-tag">After-Sales Service</p>
          <h1 className="page-hero-title">บริการหลังการขาย</h1>
          <p className="page-hero-sub">เพราะการดูแลของเรา ไม่จบแค่วันส่งมอบ — ที่เราใส่ใจ ตลอดการอยู่อาศัย</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="section-tag">Our Services</p>
          <h2 className="section-title">เรามีบริการอะไรบ้าง</h2>

          <div className="features">
            <div className="feature">
              <div className="feature-icon">🔧</div>
              <h3>แจ้งซ่อม Online</h3>
              <p>แจ้งซ่อมผ่านเว็บไซต์หรือ LINE OA ทีมงานตอบกลับภายใน 24 ชม. และเข้าซ่อมภายใน 48 ชม.</p>
              <a href="#repair-form" className="btn btn-ghost" style={{ marginTop: '1rem' }}>แจ้งซ่อม →</a>
            </div>
            <div className="feature">
              <div className="feature-icon">🛡️</div>
              <h3>การรับประกัน</h3>
              <p>โครงสร้างหลัก 15 ปี · ระบบไฟฟ้า/ประปา 5 ปี · ผิวพื้น/สี 2 ปี · ตามมาตรฐานวิศวกรรมแห่งประเทศไทย</p>
            </div>
            <div className="feature">
              <div className="feature-icon">💰</div>
              <h3>คำนวณสินเชื่อ</h3>
              <p>คำนวณค่าผ่อนรายเดือนเบื้องต้น พร้อมประสาน Bank Partners 10+ ธนาคารชั้นนำ</p>
              <a href="#repair-form" className="btn btn-ghost" style={{ marginTop: '1rem' }}>ลองคำนวณ →</a>
            </div>
            <div className="feature">
              <div className="feature-icon">📋</div>
              <h3>โอนกรรมสิทธิ์</h3>
              <p>บริการช่วยโอนกรรมสิทธิ์ ค่าธรรมเนียมส่วนใหญ่ Northland รับผิดชอบให้ครบทุกขั้นตอน</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🏠</div>
              <h3>นิติบุคคล</h3>
              <p>บริหารส่วนกลางโครงการ จัดเก็บค่าส่วนกลาง บำรุงรักษาสาธารณูปโภค</p>
            </div>
            <div className="feature">
              <div className="feature-icon">📞</div>
              <h3>Customer Care 24/7</h3>
              <p>Call Center 088-888-8888 พร้อมให้บริการทุกวัน · LINE Official 24 ชั่วโมง</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="repair-form" style={{ background: 'var(--paper-soft)' }}>
        <div className="container">
          <div className="detail-grid">
            <div>
              <p className="section-tag">Online Form</p>
              <h2 className="section-title">แจ้งซ่อม Online</h2>
              <p style={{ color: 'var(--ink-soft)', marginBottom: '2rem' }}>
                กรอกรายละเอียดด้านล่าง ทีมช่างจะติดต่อกลับและนัดเวลาเข้าซ่อม
              </p>
              <RepairForm projectOptions={projectOptions} />
            </div>

            <aside id="calc">
              <LoanCalculator />
            </aside>
          </div>
        </div>
      </section>

      <PageSections slug="after-sales" />
    </main>
  )
}
