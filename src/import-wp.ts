/**
 * ย้ายบทความจาก WordPress เดิม (northlandd.com) เข้าเป็น Post ใน Payload
 * รัน: node --env-file=.env node_modules/tsx/dist/cli.mjs src/import-wp.ts
 * idempotent — ข้ามบทความที่ slug มีอยู่แล้ว
 */
import { getPayload } from 'payload'
import config from '@payload-config'

const WP = 'https://www.northlandd.com'

// บทความจริงที่จะย้าย (ข้ามหน้าฟอร์ม/โปรโมชั่น/ลงทะเบียน)
const ARTICLES = [
  { id: 22193, slug: 'investment-property-start', category: 'knowledge' },
  { id: 21912, slug: 'korean-banyan-benefits', category: 'lifestyle' },
  { id: 5404, slug: 'home-extension-rules', category: 'knowledge' },
  { id: 5427, slug: 'home-extension-permit', category: 'knowledge' },
  { id: 5428, slug: 'building-extension-law', category: 'knowledge' },
]

const decode = (s: string) =>
  s
    .replace(/&#8211;/g, '–')
    .replace(/&#8217;/g, '’')
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()

// สร้าง Lexical richText จากบล็อก {tag,text}
const textNode = (text: string) => ({ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 })
function lexical(blocks: { tag: string; text: string }[]) {
  const children = blocks.map((b) => {
    if (b.tag === 'h2' || b.tag === 'h3') {
      return { type: 'heading', tag: b.tag, format: '', indent: 0, version: 1, direction: 'ltr', children: [textNode(b.text)] }
    }
    return { type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', textFormat: 0, children: [textNode(b.text)] }
  })
  return { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children } }
}

async function extract(link: string) {
  const html = await fetch(link, { headers: { 'User-Agent': 'Mozilla/5.0' } }).then((r) => r.text())
  const og = (html.match(/<meta property=["']og:image["'] content=["']([^"']+)/i) || [])[1] || null
  let h = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '')
  const m = h.match(/<(?:div|article)[^>]*class=["'][^"']*(entry-content|blog-single|single-content)[^"']*["'][\s\S]*?(<\/article>|<\/main>)/i)
  const region = m ? m[0] : h
  const raw = region.match(/<(p|h2|h3|li)[^>]*>[\s\S]*?<\/\1>/gi) || []
  const blocks = raw
    .map((x) => {
      const tag = (x.match(/^<(\w+)/) || [])[1]?.toLowerCase() || 'p'
      const text = decode(x.replace(/<[^>]+>/g, ''))
      return { tag: tag === 'li' ? 'p' : tag, text: tag === 'li' ? '• ' + text : text }
    })
    .filter((b) => b.text.replace('• ', '').length > 12)
  // กันหัวข้อซ้ำกับ title (ตัวแรกมักเป็นชื่อเรื่อง)
  return { blocks, og, firstImg: (region.match(/<img[^>]+src=["']([^"']+)/i) || [])[1] || null }
}

async function uploadImage(payload: any, url: string, alt: string): Promise<number | null> {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
    if (!res.ok) return null
    const buf = Buffer.from(await res.arrayBuffer())
    const name = (url.split('/').pop() || 'wp-image.jpg').split('?')[0]
    const mimetype = name.endsWith('.png') ? 'image/png' : name.endsWith('.webp') ? 'image/webp' : 'image/jpeg'
    const doc = await payload.create({
      collection: 'media',
      data: { alt },
      file: { data: buf, mimetype, name, size: buf.length },
    })
    return doc.id
  } catch {
    return null
  }
}

const run = async () => {
  const payload = await getPayload({ config })
  for (const a of ARTICLES) {
    const exists = await payload.find({ collection: 'posts', where: { slug: { equals: a.slug } }, limit: 1 })
    if (exists.totalDocs > 0) {
      payload.logger.info(`[wp] ข้าม (มีแล้ว): ${a.slug}`)
      continue
    }
    const meta = await fetch(`${WP}/wp-json/wp/v2/pages/${a.id}?_fields=title,link,date`).then((r) => r.json())
    const title = decode(meta.title.rendered)
    const { blocks, og, firstImg } = await extract(meta.link)
    // ตัดบล็อกแรกถ้าซ้ำกับ title
    const body = blocks.filter((b, i) => !(i === 0 && b.text.replace('• ', '') === title))
    const excerpt = body.find((b) => b.tag === 'p')?.text.slice(0, 160) || ''

    let coverId: number | null = null
    const imgUrl = og || firstImg
    if (imgUrl && process.env.WP_IMAGES === 'true') coverId = await uploadImage(payload, imgUrl, title)

    await payload.create({
      collection: 'posts',
      data: {
        title,
        slug: a.slug,
        category: a.category as any,
        excerpt,
        content: lexical(body) as any,
        coverImage: coverId || undefined,
        publishedAt: meta.date || new Date().toISOString(),
        _status: 'published',
      },
    })
    payload.logger.info(`[wp] ย้ายแล้ว: ${title} (${body.length} ย่อหน้า, รูป: ${coverId ? 'มี' : 'ไม่มี'})`)
  }
  payload.logger.info('[wp] เสร็จสมบูรณ์ ✓')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
