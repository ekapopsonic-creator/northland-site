import React from 'react'
import { getFeaturedProjects, getPageBySlug, resolveBlockProjects } from '@/lib/queries'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'

// ดึง "ส่วนเสริม (Section)" ที่ทีมสร้างไว้ในหลังบ้าน (Page ที่ slug ตรงกับหน้านี้) มาต่อท้าย
// ทำให้ทุกหน้ารองเพิ่ม section เองได้ โดยไม่ต้องแก้โค้ด
export async function PageSections({ slug }: { slug: string }) {
  const page = await getPageBySlug(slug)
  if (!page?.layout?.length) return null
  const [featured, blocks] = await Promise.all([
    getFeaturedProjects(),
    resolveBlockProjects(page.layout as any[]),
  ])
  return <BlockRenderer blocks={blocks} featuredProjects={featured} />
}
