import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getFeaturedProjects, getPageBySlug } from '@/lib/queries'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'

export const revalidate = 60

// หน้า custom ที่ทีมสร้างเองในหลังบ้าน (slug อื่นที่ไม่ชนกับ route ที่มีอยู่)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug(slug)
  if (!page) return {}
  return {
    title: page.seo?.metaTitle || `${page.title} — Northland Development`,
    description: page.seo?.metaDescription || undefined,
  }
}

export default async function CustomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (slug === 'home') notFound() // หน้าแรกอยู่ที่ /
  const [page, featured] = await Promise.all([getPageBySlug(slug), getFeaturedProjects()])
  if (!page) notFound()

  return (
    <main>
      <BlockRenderer blocks={(page.layout as any[]) || []} featuredProjects={featured} />
    </main>
  )
}
