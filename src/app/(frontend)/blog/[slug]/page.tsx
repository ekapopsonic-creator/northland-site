import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getPostBySlug } from '@/lib/queries'
import { postCategoryLabels, mediaUrl } from '@/lib/labels'

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'ไม่พบบทความ — Northland Development' }
  return {
    title: post.seo?.metaTitle || `${post.title} — Northland Development`,
    description: post.seo?.metaDescription || post.excerpt || undefined,
  }
}

const thaiDate = (iso: string) =>
  new Date(iso).toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' })

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const img = mediaUrl(post.coverImage)

  return (
    <main>
      <section className="section" style={{ paddingTop: '8rem' }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <p className="section-tag">
            {postCategoryLabels[post.category] || post.category}
            {post.publishedAt ? ` · ${thaiDate(post.publishedAt)}` : ''}
          </p>
          <h1 className="section-title" style={{ marginBottom: '1.5rem' }}>{post.title}</h1>

          {img ? (
            <img
              src={img}
              alt={post.title}
              style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: '16px', marginBottom: '2rem' }}
            />
          ) : null}

          {post.content ? (
            <div style={{ lineHeight: 1.9, fontSize: '1.05rem' }}>
              <RichText data={post.content} />
            </div>
          ) : null}

          <hr className="divider" style={{ margin: '3rem 0' }} />
          <Link href="/blog" className="btn btn-ghost">← กลับไปหน้าบทความ</Link>
        </div>
      </section>
    </main>
  )
}
