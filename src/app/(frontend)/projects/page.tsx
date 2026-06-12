import React from 'react'
import type { Metadata } from 'next'
import { getPublishedProjects } from '@/lib/queries'
import { categoryLabels, statusLabels, zoneLabels, mediaUrl } from '@/lib/labels'
import { ProjectsFilter, type ProjectCardData } from '@/components/ProjectsFilter'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'โครงการทั้งหมด — Northland Development',
  description: 'โครงการบ้าน คอนโด ทาวน์โฮม ทั้งหมดของ Northland ในสระบุรีและกรุงเทพมหานคร',
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const projects = await getPublishedProjects()

  const cards: ProjectCardData[] = projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    categoryLabel: categoryLabels[p.category] || p.category,
    zone: p.zone,
    status: p.status,
    statusLabel: statusLabels[p.status] || p.status,
    priceTier: p.priceTier || null,
    address: p.address || zoneLabels[p.zone] || '',
    startingPrice: p.startingPrice || '',
    coverUrl: mediaUrl(p.coverImage),
  }))

  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <p className="page-hero-tag">All Projects</p>
          <h1 className="page-hero-title">โครงการของเรา</h1>
          <p className="page-hero-sub">
            รวมโครงการที่ Northland ภูมิใจนำเสนอ ทั้งในสระบุรีและกรุงเทพมหานคร
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ProjectsFilter
            projects={cards}
            initial={{
              type: typeof params.type === 'string' ? params.type : '',
              location: typeof params.location === 'string' ? params.location : '',
              status: typeof params.status === 'string' ? params.status : '',
              price: typeof params.price === 'string' ? params.price : '',
            }}
          />
        </div>
      </section>
    </main>
  )
}
