import { getPayload } from 'payload'
import config from '@payload-config'

export const getPayloadClient = () => getPayload({ config })

export async function getPublishedProjects() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'projects',
    where: { _status: { equals: 'published' } },
    sort: 'displayOrder',
    limit: 100,
    depth: 1,
  })
  return docs
}

export async function getFeaturedProjects() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'projects',
    where: {
      and: [{ _status: { equals: 'published' } }, { featured: { equals: true } }],
    },
    sort: 'displayOrder',
    limit: 6,
    depth: 1,
  })
  if (docs.length > 0) return docs
  // ยังไม่มีโครงการที่ติ๊ก "แนะนำ" — แสดงโครงการล่าสุดแทน
  const fallback = await payload.find({
    collection: 'projects',
    where: { _status: { equals: 'published' } },
    sort: 'displayOrder',
    limit: 6,
    depth: 1,
  })
  return fallback.docs
}

export async function getProjectBySlug(slug: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'projects',
    where: {
      and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
    },
    limit: 1,
    depth: 1,
  })
  return docs[0] || null
}

export async function getActivePromotions() {
  const payload = await getPayloadClient()
  const now = new Date().toISOString()
  const { docs } = await payload.find({
    collection: 'promotions',
    where: {
      and: [
        { _status: { equals: 'published' } },
        { startDate: { less_than_equal: now } },
        {
          or: [{ endDate: { exists: false } }, { endDate: { greater_than_equal: now } }],
        },
      ],
    },
    sort: '-startDate',
    limit: 50,
    depth: 1,
  })
  return docs
}

export async function getPublishedPosts() {
  const payload = await getPayloadClient()
  const now = new Date().toISOString()
  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      and: [{ _status: { equals: 'published' } }, { publishedAt: { less_than_equal: now } }],
    },
    sort: '-publishedAt',
    limit: 50,
    depth: 1,
  })
  return docs
}

export async function getPostBySlug(slug: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
    },
    limit: 1,
    depth: 1,
  })
  return docs[0] || null
}

export async function getProgressUpdates() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'progress-updates',
    sort: '-updateDate',
    limit: 100,
    depth: 1,
  })
  return docs
}

export async function getPageBySlug(slug: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
    },
    limit: 1,
    depth: 2,
  })
  return docs[0] || null
}

export async function getSiteSettings() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-settings', depth: 1 })
}

export async function getActiveJobs() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'jobs',
    where: { active: { equals: true } },
    sort: '-createdAt',
    limit: 50,
  })
  return docs
}
