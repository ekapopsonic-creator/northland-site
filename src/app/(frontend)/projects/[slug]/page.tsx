import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getProjectBySlug } from '@/lib/queries'
import { categoryLabels, statusLabels, mediaUrl } from '@/lib/labels'

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return { title: 'ไม่พบโครงการ — Northland Development' }
  return {
    title: `${project.title} — Northland Development`,
    description: project.tagline || undefined,
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  const cover = mediaUrl(project.coverImage)
  const gallery = (project.gallery || []).filter((g) => mediaUrl(g.image))
  const floorPlans = (project.floorPlans || []).filter((f) => mediaUrl(f.image))
  const specs = project.specs
  const mapUrl =
    project.map?.googleMapsUrl ||
    (project.map?.lat && project.map?.lng
      ? `https://www.google.com/maps?q=${project.map.lat},${project.map.lng}`
      : null)
  const youtubeId = project.videoUrl?.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/,
  )?.[1]

  return (
    <main>
      <section className="section" style={{ paddingTop: '7rem' }}>
        <div className="container">
          <div
            className={`detail-gallery${cover ? ' has-image' : ''}`}
            style={
              cover
                ? {
                    backgroundImage: `url(${cover})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                  }
                : { position: 'relative' }
            }
          >
            <span className="project-card-badge" style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>
              {categoryLabels[project.category] || project.category}
            </span>
          </div>

          <div className="detail-grid" style={{ marginTop: '3rem' }}>
            <div>
              <p className="section-tag">
                {project.zone === 'bangkok' ? 'Bangkok' : 'Saraburi'} · {statusLabels[project.status]}
              </p>
              <h1 className="section-title" style={{ marginBottom: '0.5rem' }}>{project.title}</h1>
              {project.address ? (
                <p style={{ fontSize: '1.05rem', color: 'var(--ink-soft)', marginBottom: '2rem' }}>
                  📍 {project.address}
                </p>
              ) : null}

              {project.tagline ? (
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', marginBottom: '1rem' }}>
                  {project.tagline}
                </h2>
              ) : null}

              {project.description ? (
                <div style={{ marginBottom: '2rem', lineHeight: 1.8 }}>
                  <RichText data={project.description} />
                </div>
              ) : null}

              {project.highlights && project.highlights.length > 0 ? (
                <>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>
                    จุดเด่นของโครงการ
                  </h3>
                  <ul style={{ paddingLeft: '1.5rem', lineHeight: 2 }}>
                    {project.highlights.map((h) => (
                      <li key={h.id}>{h.text}</li>
                    ))}
                  </ul>
                </>
              ) : null}

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', margin: '2.5rem 0 1rem' }}>
                รายละเอียดโครงการ
              </h3>
              <ul className="spec-list">
                <li><span>ประเภทโครงการ</span><span>{categoryLabels[project.category] || project.category}</span></li>
                {specs?.units ? <li><span>จำนวนยูนิต</span><span>{specs.units}</span></li> : null}
                {specs?.usableArea ? <li><span>พื้นที่ใช้สอย</span><span>{specs.usableArea}</span></li> : null}
                {specs?.landSize ? <li><span>ขนาดที่ดิน</span><span>{specs.landSize}</span></li> : null}
                {specs?.bedrooms ? <li><span>จำนวนห้องนอน</span><span>{specs.bedrooms}</span></li> : null}
                {specs?.bathrooms ? <li><span>จำนวนห้องน้ำ</span><span>{specs.bathrooms}</span></li> : null}
                {specs?.projectValue ? <li><span>มูลค่าโครงการ</span><span>{specs.projectValue}</span></li> : null}
                <li>
                  <span>สถานะ</span>
                  <span style={{ color: 'var(--north-sea)' }}>{statusLabels[project.status]}</span>
                </li>
              </ul>

              {floorPlans.length > 0 ? (
                <>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', margin: '2.5rem 0 1rem' }}>
                    แผนผังโครงการ / Floor Plan
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
                    {floorPlans.map((f) => (
                      <figure key={f.id} style={{ margin: 0 }}>
                        <img
                          src={mediaUrl(f.image) || ''}
                          alt={f.name}
                          style={{ width: '100%', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.08)' }}
                        />
                        <figcaption style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', marginTop: '0.5rem' }}>
                          {f.name}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </>
              ) : null}

              {youtubeId ? (
                <>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', margin: '2.5rem 0 1rem' }}>
                    วิดีโอโครงการ
                  </h3>
                  <div style={{ aspectRatio: '16/9' }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${youtubeId}`}
                      title={`วิดีโอ ${project.title}`}
                      style={{ width: '100%', height: '100%', border: 0, borderRadius: '12px' }}
                      allowFullScreen
                    />
                  </div>
                </>
              ) : null}

              {project.virtualTourUrl ? (
                <p style={{ marginTop: '1.5rem' }}>
                  <a href={project.virtualTourUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    🏠 ชม Virtual Tour 360° →
                  </a>
                </p>
              ) : null}
            </div>

            <aside>
              <div className="sticky-cta">
                <div className="sticky-cta-price-label">ราคาเริ่มต้น</div>
                <div className="sticky-cta-price">{project.startingPrice || 'สอบถามราคา'}</div>
                {project.promoNote ? (
                  <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', margin: '1rem 0' }}>
                    {project.promoNote}
                  </p>
                ) : null}
                <Link href="/contact" className="btn btn-primary btn-block btn-lg" style={{ marginBottom: '0.5rem' }}>
                  ลงทะเบียนรับข้อมูล
                </Link>
                <Link href="/contact" className="btn btn-ghost btn-block">นัดเยี่ยมชม</Link>

                <hr className="divider" style={{ margin: '1.5rem 0' }} />

                <div style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', lineHeight: 1.8 }}>
                  <p>📞 088-888-8888</p>
                  <p>💬 LINE: @northland</p>
                  <p>✉ sales@northland.co.th</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {gallery.length > 0 ? (
        <section className="section" style={{ background: 'var(--paper-soft)' }}>
          <div className="container">
            <p className="section-tag">Gallery</p>
            <h2 className="section-title">ภาพโครงการ</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
              {gallery.map((g) => (
                <img
                  key={g.id}
                  src={mediaUrl(g.image) || ''}
                  alt={g.caption || project.title}
                  style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: '12px' }}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {(project.locationFeatures && project.locationFeatures.length > 0) || mapUrl ? (
        <section className="section">
          <div className="container">
            <p className="section-tag">Location</p>
            <h2 className="section-title">ทำเลและสภาพแวดล้อม</h2>

            {project.map?.lat && project.map?.lng ? (
              <div style={{ aspectRatio: '21/9', marginTop: '2rem' }}>
                <iframe
                  src={`https://maps.google.com/maps?q=${project.map.lat},${project.map.lng}&z=15&output=embed`}
                  title={`แผนที่ ${project.title}`}
                  style={{ width: '100%', height: '100%', border: 0, borderRadius: '16px' }}
                  loading="lazy"
                />
              </div>
            ) : null}

            {mapUrl ? (
              <p style={{ marginTop: '1rem' }}>
                <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  📍 เปิดใน Google Maps →
                </a>
              </p>
            ) : null}

            {project.locationFeatures && project.locationFeatures.length > 0 ? (
              <div className="features" style={{ marginTop: '3rem' }}>
                {project.locationFeatures.map((f) => (
                  <div className="feature" key={f.id}>
                    <h3>{f.title}</h3>
                    <p>{f.detail}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="cta-band">
        <div className="container">
          <h2>สนใจโครงการ {project.title}?</h2>
          <p>สอบถามข้อมูลกับที่ปรึกษาการขายของเรา</p>
          <Link href="/contact" className="btn btn-light btn-lg">ลงทะเบียนรับข้อมูล</Link>
        </div>
      </section>
    </main>
  )
}
