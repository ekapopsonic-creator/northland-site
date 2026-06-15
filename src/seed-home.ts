/**
 * Seed หน้าแรก (slug=home) เป็นบล็อก — ทีมแก้ layout ต่อในหลังบ้านได้
 * รัน: node --env-file=.env node_modules/tsx/dist/cli.mjs src/seed-home.ts
 */
import { getPayload } from 'payload'
import config from '@payload-config'

const run = async () => {
  const payload = await getPayload({ config })

  const existing = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1 })
  if (existing.totalDocs > 0) {
    payload.logger.info('[seed-home] มีหน้า home อยู่แล้ว — ข้าม')
    process.exit(0)
  }

  await payload.create({
    collection: 'pages',
    data: {
      title: 'หน้าแรก',
      slug: 'home',
      _status: 'published',
      layout: [
        {
          blockType: 'hero',
          eyebrow: '30 Years Anniversary · 1996–2026',
          title: 'ที่เราใส่ใจ',
          tagline: 'บ้าน คอนโด ทาวน์โฮม — ที่ไม่ใช่แค่ที่อยู่อาศัย',
          lead: 'Northland Development กว่า 30 ปีของการสร้างชุมชนที่มีคุณภาพ ในสระบุรีและกรุงเทพมหานคร ด้วยมาตรฐานที่ตั้งใจ และความใส่ใจในรายละเอียด',
          showSearch: true,
          buttons: [
            { label: 'ดูโครงการทั้งหมด', url: '/projects', style: 'light' },
            { label: 'เรื่องราว 30 ปี', url: '/about', style: 'outline-white' },
          ],
          background: 'none',
          paddingY: 'md',
        },
        {
          blockType: 'stats',
          background: 'none',
          paddingY: 'md',
          items: [
            { number: '30+', label: 'ปีแห่งความใส่ใจ' },
            { number: '23', label: 'โครงการ' },
            { number: '3,209', label: 'ยูนิตที่ส่งมอบ' },
            { number: '8,110', label: 'มูลค่ารวม (ลบ.)' },
          ],
        },
        {
          blockType: 'featuredProjects',
          eyebrow: 'Featured Projects',
          heading: 'โครงการเด่น',
          subtitle: 'ผลงานล่าสุดของเรา ทั้งในสระบุรีและกรุงเทพมหานคร ที่สะท้อนความใส่ใจในทุกรายละเอียด',
          source: 'featured',
          count: 6,
          ctaLabel: 'ดูโครงการทั้งหมด →',
          ctaUrl: '/projects',
          background: 'soft',
          paddingY: 'md',
        },
        {
          blockType: 'features',
          eyebrow: 'Why Northland',
          heading: 'ทำไมต้อง Northland',
          subtitle: 'เพราะเราเชื่อว่าบ้านคือสิ่งสำคัญที่สุดในชีวิต เราจึงสร้างทุกหลังด้วยมาตรฐานเดียวกับที่เราอยากให้ครอบครัวของเราอยู่',
          columns: '3',
          background: 'none',
          paddingY: 'md',
          items: [
            { icon: '🏆', title: '30 ปีของความใส่ใจ', text: 'ตั้งแต่ปี 2539 เราคัดสรรทำเล วัสดุ และทีมงานอย่างพิถีพิถัน ส่งมอบให้กว่า 3,200 ครอบครัว' },
            { icon: '🏗️', title: 'ก่อสร้างได้คุณภาพ', text: 'ทุกโครงการผ่านการตรวจสอบ 5 ขั้นตอน ก่อนส่งมอบ พร้อมรับประกันโครงสร้าง 15 ปี' },
            { icon: '📍', title: 'ทำเลที่คัดสรร', text: 'ทุกโครงการอยู่ในทำเลที่เชื่อมต่อสะดวก ใกล้สิ่งอำนวยความสะดวก เพื่อชีวิตที่ง่ายขึ้น' },
            { icon: '💎', title: 'ดีไซน์ที่ไม่ซ้ำใคร', text: 'ออกแบบโดยสถาปนิกผู้เชี่ยวชาญ ให้ตอบโจทย์ทั้งฟังก์ชั่นการใช้งานและความสวยงาม' },
            { icon: '🤝', title: 'บริการหลังการขาย', text: 'ทีมงานพร้อมดูแลตลอดการอยู่อาศัย ตั้งแต่วันส่งมอบจนถึงการซ่อมบำรุงในระยะยาว' },
            { icon: '🌱', title: 'ใส่ใจสังคมผู้สูงอายุ', text: 'ออกแบบให้ครอบคลุมทุกช่วงวัย รองรับ Aging Society ด้วยมาตรฐาน Universal Design' },
          ],
        },
        {
          blockType: 'cta',
          title: 'พร้อมหาบ้านที่ใช่แล้วหรือยัง?',
          text: 'ปรึกษาที่ปรึกษาการขาย เพื่อรับโปรโมชั่นพิเศษและคำแนะนำที่ตรงกับคุณ',
          buttons: [{ label: 'นัดเยี่ยมชมโครงการ', url: '/contact', style: 'light' }],
        },
      ],
    },
  })

  payload.logger.info('[seed-home] สร้างหน้าแรก (home) เป็นบล็อกแล้ว ✓')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
