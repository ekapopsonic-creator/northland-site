/**
 * จัด layout หน้าแรกใหม่ให้ตรงกับเว็บ WordPress เดิม (northlandd.com)
 * รัน: node --env-file=.env node_modules/tsx/dist/cli.mjs src/rebuild-home.ts
 */
import { getPayload } from 'payload'
import config from '@payload-config'

const lex = (text: string) => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [
      { type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', textFormat: 0, children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }] },
    ],
  },
})

const run = async () => {
  const payload = await getPayload({ config })
  const found = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1 })
  if (!found.docs[0]) {
    console.log('ไม่พบหน้า home')
    process.exit(1)
  }

  const layout = [
    {
      blockType: 'hero',
      imageUrl: '/wp/BG.jpg',
      eyebrow: 'NORTHLAND DEVELOPMENT',
      title: 'BEYOND EXPERIENCE',
      tagline: 'ประสบการณ์ที่เหนือกว่า',
      lead: '',
      showSearch: false,
      buttons: [{ label: 'ดูโครงการทั้งหมด', url: '/projects', style: 'light' }],
      background: 'none',
      paddingY: 'lg',
    },
    {
      blockType: 'richText',
      heading: 'มุ่งพัฒนาอสังหาริมทรัพย์',
      content: lex('เพื่อสร้างความสุขและประสบการณ์ที่ดีให้ลูกค้า ด้วยมาตรฐานที่ใส่ใจในทุกรายละเอียด'),
      align: 'center',
      width: 'narrow',
      background: 'none',
      paddingY: 'md',
    },
    {
      blockType: 'imageText',
      imageUrl: '/wp/Attaluck-2572.jpg',
      imageSide: 'right',
      eyebrow: 'LUXURY PROJECT',
      heading: 'Attaluck สุขุมวิท',
      content: lex('เอกสิทธิ์พิเศษเพียง 4 ครอบครัว — Luxury Pool Villa ใจกลางสุขุมวิท พื้นที่ใช้สอยกว่า 600 ตร.ม.'),
      buttons: [{ label: 'ข้อมูลเพิ่มเติม', url: '/projects/attaluck-sukhumvit', style: 'primary' }],
      background: 'soft',
      paddingY: 'lg',
    },
    {
      blockType: 'imageText',
      imageUrl: '/wp/ARNA.jpg',
      imageSide: 'left',
      eyebrow: 'NEW PROJECT',
      heading: 'บ้านหรูใจกลางเมืองสระบุรี',
      content: lex('บ้านเดี่ยวดีไซน์โมเดิร์น ในทำเลศักยภาพใจกลางเมืองสระบุรี ตอบโจทย์ทุกไลฟ์สไตล์ของครอบครัว'),
      buttons: [{ label: 'ข้อมูลเพิ่มเติม', url: '/projects?location=saraburi', style: 'primary' }],
      background: 'none',
      paddingY: 'lg',
    },
    {
      blockType: 'imageText',
      imageUrl: '/wp/3.jpg',
      imageSide: 'right',
      eyebrow: 'BANGKOK PROJECT',
      heading: 'คอนโดมิเนียม',
      content: lex('โครงการคอนโดมิเนียมติดรถไฟฟ้า ในทำเลใจกลางกรุงเทพฯ พร้อมสิ่งอำนวยความสะดวกครบครัน'),
      buttons: [{ label: 'ข้อมูลเพิ่มเติม', url: '/projects?type=condo', style: 'primary' }],
      background: 'soft',
      paddingY: 'lg',
    },
    {
      blockType: 'featuredProjects',
      eyebrow: "TODAY'S PROMOTION",
      heading: 'โปรโมชั่นล่าสุด',
      subtitle: 'ข้อเสนอพิเศษจากทุกโครงการของ Northland',
      source: 'featured',
      count: 3,
      columns: '3',
      ctaLabel: 'ดูโครงการทั้งหมด →',
      ctaUrl: '/projects',
      background: 'none',
      paddingY: 'lg',
    },
    {
      blockType: 'cta',
      title: 'พร้อมเริ่มต้นกับ Northland แล้วหรือยัง?',
      text: 'ปรึกษาที่ปรึกษาการขายของเรา เพื่อรับข้อมูลและโปรโมชั่นพิเศษ',
      buttons: [{ label: 'ติดต่อเรา', url: '/contact', style: 'light' }],
    },
  ]

  await payload.update({ collection: 'pages', id: found.docs[0].id, data: { layout: layout as any } })
  console.log('[home] จัด layout หน้าแรกใหม่ตาม WP แล้ว ✓')
  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
