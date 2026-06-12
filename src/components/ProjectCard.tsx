import React from 'react'
import Link from 'next/link'
import { categoryLabels, statusLabels, zoneLabels, mediaUrl } from '@/lib/labels'
import type { Project } from '@/payload-types'

export function ProjectCard({ project }: { project: Project }) {
  const img = mediaUrl(project.coverImage)
  return (
    <Link href={`/projects/${project.slug}`} className="project-card">
      <div
        className="project-card-img"
        style={
          img
            ? { backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : undefined
        }
      >
        <span className="project-card-badge">{statusLabels[project.status] || project.status}</span>
      </div>
      <div className="project-card-body">
        <div className="project-card-type">{categoryLabels[project.category] || project.category}</div>
        <h3 className="project-card-name">{project.title}</h3>
        <p className="project-card-location">📍 {project.address || zoneLabels[project.zone] || ''}</p>
        <div className="project-card-meta">
          <div className="project-card-price">
            {project.startingPrice || 'สอบถามราคา'}
            {project.startingPrice ? <small> เริ่มต้น</small> : null}
          </div>
          <span className="project-card-link">ดูรายละเอียด →</span>
        </div>
      </div>
    </Link>
  )
}
