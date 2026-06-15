import React from 'react'
import Link from 'next/link'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { sectionStyle, type Appearance } from '@/blocks/shared'
import { mediaUrl } from '@/lib/labels'
import { ProjectCard } from '@/components/ProjectCard'
import { HeroSearch } from '@/components/HeroSearch'
import type { Project } from '@/payload-types'

const btnClass = (style?: string) =>
  `btn btn-lg ${
    style === 'light'
      ? 'btn-light'
      : style === 'ghost'
        ? 'btn-ghost'
        : style === 'outline-white'
          ? 'btn-outline-white'
          : 'btn-primary'
  }`

function Buttons({ buttons }: { buttons?: { id?: string; label: string; url: string; style?: string }[] }) {
  if (!buttons?.length) return null
  return (
    <div className="hero-cta" style={{ marginTop: '1.5rem' }}>
      {buttons.map((b, i) => (
        <Link key={b.id || i} href={b.url} className={btnClass(b.style)}>
          {b.label}
        </Link>
      ))}
    </div>
  )
}

type Block = Record<string, any>

export function BlockRenderer({
  blocks,
  featuredProjects,
}: {
  blocks: Block[]
  featuredProjects: Project[]
}) {
  return (
    <>
      {blocks?.map((block, i) => {
        const key = block.id || i
        const a = block as Appearance

        switch (block.blockType) {
          case 'hero': {
            const img = mediaUrl(block.image)
            return (
              <section
                key={key}
                className="hero"
                style={{
                  ...sectionStyle(a),
                  ...(img
                    ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.25)), url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                    : {}),
                }}
              >
                <div className="container">
                  <div className="hero-inner">
                    {block.eyebrow ? <p className="hero-eyebrow">{block.eyebrow}</p> : null}
                    <h1 className="hero-title">{block.title}</h1>
                    {block.tagline ? <p className="hero-tagline">{block.tagline}</p> : null}
                    {block.lead ? <p className="hero-lead">{block.lead}</p> : null}
                    <Buttons buttons={block.buttons} />
                  </div>
                  {block.showSearch ? <HeroSearch /> : null}
                </div>
              </section>
            )
          }

          case 'stats':
            return (
              <section key={key} className="section" style={sectionStyle(a)}>
                <div className="container">
                  <div className="stats">
                    {(block.items || []).map((s: any, j: number) => (
                      <div className="stat" key={s.id || j}>
                        <div className="stat-num">{s.number}</div>
                        <div className="stat-label">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )

          case 'featuredProjects':
            return (
              <section key={key} className="section" style={sectionStyle(a)}>
                <div className="container">
                  {block.eyebrow ? <p className="section-tag">{block.eyebrow}</p> : null}
                  {block.heading ? <h2 className="section-title">{block.heading}</h2> : null}
                  {block.subtitle ? <p className="section-subtitle">{block.subtitle}</p> : null}
                  <div className="project-grid">
                    {featuredProjects.slice(0, block.count || 6).map((p) => (
                      <ProjectCard key={p.id} project={p} />
                    ))}
                  </div>
                  {block.ctaLabel ? (
                    <div className="text-center mt-4">
                      <Link href={block.ctaUrl || '/projects'} className="btn btn-ghost btn-lg">
                        {block.ctaLabel}
                      </Link>
                    </div>
                  ) : null}
                </div>
              </section>
            )

          case 'features': {
            const cols = Number(block.columns || 3)
            return (
              <section key={key} className="section" style={sectionStyle(a)}>
                <div className="container">
                  {block.eyebrow ? <p className="section-tag">{block.eyebrow}</p> : null}
                  {block.heading ? <h2 className="section-title">{block.heading}</h2> : null}
                  {block.subtitle ? <p className="section-subtitle">{block.subtitle}</p> : null}
                  <div className="features" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                    {(block.items || []).map((f: any, j: number) => (
                      <div className="feature" key={f.id || j}>
                        {f.icon ? <div className="feature-icon">{f.icon}</div> : null}
                        <h3>{f.title}</h3>
                        {f.text ? <p>{f.text}</p> : null}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )
          }

          case 'richText':
            return (
              <section key={key} className="section" style={sectionStyle(a)}>
                <div
                  className="container"
                  style={{
                    maxWidth: block.width === 'narrow' ? 760 : undefined,
                    textAlign: block.align === 'center' ? 'center' : undefined,
                  }}
                >
                  {block.eyebrow ? <p className="section-tag">{block.eyebrow}</p> : null}
                  {block.heading ? <h2 className="section-title">{block.heading}</h2> : null}
                  {block.content ? (
                    <div style={{ lineHeight: 1.9 }}>
                      <RichText data={block.content} />
                    </div>
                  ) : null}
                </div>
              </section>
            )

          case 'imageText': {
            const img = mediaUrl(block.image)
            const imgRight = block.imageSide === 'right'
            return (
              <section key={key} className="section" style={sectionStyle(a)}>
                <div className="container">
                  <div className="detail-grid" style={{ direction: imgRight ? 'rtl' : 'ltr' }}>
                    <div style={{ direction: 'ltr' }}>
                      {img ? (
                        <img src={img} alt={block.heading || ''} style={{ width: '100%', borderRadius: 16 }} />
                      ) : null}
                    </div>
                    <div style={{ direction: 'ltr' }}>
                      {block.eyebrow ? <p className="section-tag">{block.eyebrow}</p> : null}
                      {block.heading ? <h2 className="section-title">{block.heading}</h2> : null}
                      {block.content ? <RichText data={block.content} /> : null}
                      <Buttons buttons={block.buttons} />
                    </div>
                  </div>
                </div>
              </section>
            )
          }

          case 'gallery': {
            const cols = Number(block.columns || 3)
            return (
              <section key={key} className="section" style={sectionStyle(a)}>
                <div className="container">
                  {block.heading ? <h2 className="section-title">{block.heading}</h2> : null}
                  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '1rem', marginTop: '1.5rem' }}>
                    {(block.images || []).map((g: any, j: number) => {
                      const gi = mediaUrl(g.image)
                      return gi ? (
                        <figure key={g.id || j} style={{ margin: 0 }}>
                          <img src={gi} alt={g.caption || ''} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: 12 }} />
                          {g.caption ? <figcaption style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', marginTop: '0.4rem' }}>{g.caption}</figcaption> : null}
                        </figure>
                      ) : null
                    })}
                  </div>
                </div>
              </section>
            )
          }

          case 'timeline':
            return (
              <section key={key} className="section" style={sectionStyle(a)}>
                <div className="container">
                  {block.eyebrow ? <p className="section-tag">{block.eyebrow}</p> : null}
                  {block.heading ? <h2 className="section-title">{block.heading}</h2> : null}
                  {block.subtitle ? <p className="section-subtitle">{block.subtitle}</p> : null}
                  <div className="timeline">
                    {(block.items || []).map((t: any, j: number) => (
                      <div className="timeline-item" key={t.id || j}>
                        <div className="timeline-year">{t.year}</div>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', margin: '0.5rem 0' }}>{t.title}</h3>
                        {t.text ? <p className="timeline-text">{t.text}</p> : null}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )

          case 'cta':
            return (
              <section key={key} className="cta-band" style={a.paddingY ? sectionStyle(a) : undefined}>
                <div className="container">
                  <h2>{block.title}</h2>
                  {block.text ? <p>{block.text}</p> : null}
                  {(block.buttons || []).length > 0 ? (
                    <div style={{ marginTop: '1.5rem' }}>
                      {block.buttons.map((b: any, j: number) => (
                        <Link key={b.id || j} href={b.url} className={btnClass(b.style || 'light')}>
                          {b.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              </section>
            )

          case 'spacer':
            return <div key={key} style={{ height: { sm: '2rem', md: '4rem', lg: '7rem' }[block.size as 'sm' | 'md' | 'lg'] || '4rem' }} />

          default:
            return null
        }
      })}
    </>
  )
}
