import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { PageSections } from '@/components/blocks/PageSections'
import { getPublishedPosts } from '@/lib/queries'
import { postCategoryLabels, mediaUrl } from '@/lib/labels'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'บทความ & ข่าวสาร — Northland Development',
  description: 'บทความ สาระน่ารู้ และข่าวสารล่าสุดจาก Northland Development',
}

const thaiDate = (iso: string) =>
  new Date(iso).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })

export default async function BlogPage() {
  const posts = await getPublishedPosts()

  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <p className="page-hero-tag">Blog &amp; News</p>
          <h1 className="page-hero-title">บทความ &amp; ข่าวสาร</h1>
          <p className="page-hero-sub">สาระน่ารู้เรื่องบ้าน การเงิน และข่าวสารล่าสุดจาก Northland</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {posts.length > 0 ? (
            <div className="blog-grid">
              {posts.map((post) => {
                const img = mediaUrl(post.coverImage)
                return (
                  <Link href={`/blog/${post.slug}`} className="blog-card" key={post.id}>
                    <div
                      className="blog-card-img"
                      style={
                        img
                          ? { backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                          : undefined
                      }
                    />
                    <div className="blog-card-body">
                      <p className="blog-card-meta">
                        {postCategoryLabels[post.category] || post.category}
                        {post.publishedAt ? ` · ${thaiDate(post.publishedAt)}` : ''}
                      </p>
                      <h3 className="blog-card-title">{post.title}</h3>
                      {post.excerpt ? <p className="blog-card-excerpt">{post.excerpt}</p> : null}
                      <span className="blog-card-read">อ่านต่อ →</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--ink-soft)', padding: '4rem 0' }}>
              บทความแรกกำลังจะมาเร็วๆ นี้
            </p>
          )}
        </div>
      </section>

      <PageSections slug="blog" />
    </main>
  )
}
