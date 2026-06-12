/**
 * Seed ข้อมูลตั้งต้นจากเว็บ HTML เดิม (Phase 1)
 * รัน: npm run seed
 * ปลอดภัย: ข้ามรายการที่มี slug/ชื่อซ้ำอยู่แล้ว ไม่เขียนทับข้อมูลที่ทีมแก้ไว้
 */
import { getPayload } from 'payload'
import config from '@payload-config'

const rt = (...paras: string[]) =>
  ({
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: paras.map((text) => ({
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        textFormat: 0,
        children: [{ type: 'text', text, format: 0, detail: 0, mode: 'normal', style: '', version: 1 }],
      })),
    },
  }) as any

type ProjectSeed = {
  slug: string
  title: string
  category: 'single-house' | 'pool-villa' | 'townhome' | 'condo' | 'commercial'
  zone: 'bangkok' | 'saraburi'
  status: 'coming-soon' | 'under-construction' | 'ready' | 'sold-out'
  priceTier: 'low' | 'mid' | 'high' | 'luxury'
  startingPrice: string
  address: string
  featured?: boolean
  order: number
}

const projects: ProjectSeed[] = [
  { slug: 'attaluck-sukhumvit', title: 'Attaluck สุขุมวิท', category: 'pool-villa', zone: 'bangkok', status: 'ready', priceTier: 'luxury', startingPrice: '68 ล้านบาท', address: 'ซอยสุขุมวิท 50, แขวงพระโขนง, กรุงเทพฯ', featured: true, order: 1 },
  { slug: 'beat-sukhumvit', title: 'Beat สุขุมวิท', category: 'condo', zone: 'bangkok', status: 'under-construction', priceTier: 'mid', startingPrice: '3.5 ล้านบาท', address: 'สุขุมวิท 50, กรุงเทพฯ', featured: true, order: 2 },
  { slug: 'beat-bangwa', title: 'Beat บางหว้า', category: 'condo', zone: 'bangkok', status: 'under-construction', priceTier: 'low', startingPrice: '2.8 ล้านบาท', address: 'บางหว้า, กรุงเทพฯ', featured: true, order: 3 },
  { slug: 'taravana', title: 'Taravana', category: 'single-house', zone: 'saraburi', status: 'under-construction', priceTier: 'mid', startingPrice: '4.2 ล้านบาท', address: 'เมืองสระบุรี, สระบุรี', featured: true, order: 4 },
  { slug: 'pundara', title: 'Pundara', category: 'single-house', zone: 'saraburi', status: 'ready', priceTier: 'mid', startingPrice: '3.9 ล้านบาท', address: 'เมืองสระบุรี, สระบุรี', featured: true, order: 5 },
  { slug: 'tarafhasai', title: 'Tarafhasai', category: 'single-house', zone: 'saraburi', status: 'ready', priceTier: 'low', startingPrice: '2.9 ล้านบาท', address: 'แก่งคอย, สระบุรี', order: 6 },
  { slug: 'detara', title: "De'Tara", category: 'single-house', zone: 'saraburi', status: 'under-construction', priceTier: 'mid', startingPrice: '3.5 ล้านบาท', address: 'เมืองสระบุรี, สระบุรี', order: 7 },
  { slug: 'banfahsai', title: 'Banfahsai', category: 'single-house', zone: 'saraburi', status: 'under-construction', priceTier: 'low', startingPrice: '2.7 ล้านบาท', address: 'แก่งคอย, สระบุรี', order: 8 },
  { slug: 'arna', title: 'Arna', category: 'single-house', zone: 'saraburi', status: 'ready', priceTier: 'mid', startingPrice: '3.2 ล้านบาท', address: 'เมืองสระบุรี, สระบุรี', order: 9 },
  { slug: 'the-pine', title: 'The Pine', category: 'townhome', zone: 'saraburi', status: 'ready', priceTier: 'low', startingPrice: '2.4 ล้านบาท', address: 'แก่งคอย, สระบุรี', featured: true, order: 10 },
  { slug: 'the-green', title: 'The Green', category: 'townhome', zone: 'saraburi', status: 'under-construction', priceTier: 'low', startingPrice: '1.9 ล้านบาท', address: 'เมืองสระบุรี, สระบุรี', order: 11 },
  { slug: 'the-village', title: 'The Village', category: 'townhome', zone: 'saraburi', status: 'ready', priceTier: 'low', startingPrice: '2.1 ล้านบาท', address: 'เมืองสระบุรี, สระบุรี', order: 12 },
  { slug: 'the-harmony', title: 'The Harmony', category: 'townhome', zone: 'saraburi', status: 'under-construction', priceTier: 'low', startingPrice: '2.3 ล้านบาท', address: 'สระบุรี-บายพาส, สระบุรี', order: 13 },
  { slug: 'kk-complex', title: 'KK Complex', category: 'commercial', zone: 'saraburi', status: 'ready', priceTier: 'mid', startingPrice: '5.5 ล้านบาท', address: 'เมืองสระบุรี, สระบุรี', order: 14 },
  { slug: 'the-biz', title: 'The BiZ', category: 'commercial', zone: 'saraburi', status: 'ready', priceTier: 'mid', startingPrice: '4.8 ล้านบาท', address: 'เมืองสระบุรี, สระบุรี', order: 15 },
]

const run = async () => {
  const payload = await getPayload({ config })
  const log = (msg: string) => payload.logger.info(`[seed] ${msg}`)

  // ---------- โครงการ ----------
  const projectIds: Record<string, number> = {}
  for (const p of projects) {
    const existing = await payload.find({
      collection: 'projects',
      where: { slug: { equals: p.slug } },
      limit: 1,
      draft: true,
    })
    if (existing.docs[0]) {
      projectIds[p.slug] = existing.docs[0].id
      log(`ข้าม (มีแล้ว): ${p.title}`)
      continue
    }
    const isAttaluck = p.slug === 'attaluck-sukhumvit'
    const created = await payload.create({
      collection: 'projects',
      data: {
        ...p,
        displayOrder: p.order,
        featured: p.featured || false,
        _status: 'published',
        tagline: isAttaluck ? 'Private Sanctuary in the Heart of Sukhumvit' : undefined,
        description: isAttaluck
          ? rt(
              'Attaluck คือนิยามใหม่ของการอยู่อาศัยระดับ Luxury ใจกลางสุขุมวิท — เพียง 4 ยูนิตเท่านั้น ที่ออกแบบให้ทุกหลังเป็น Pool Villa ส่วนตัว พร้อมพื้นที่ใช้สอยกว่า 600 ตร.ม. ในทำเลที่ติดรถไฟฟ้า BTS',
              'ทุกรายละเอียดถูกออกแบบโดยสถาปนิกระดับนานาชาติ ผสานความเป็นไทยกับความ Modern Luxury — ตั้งแต่วัสดุที่นำเข้า ไปจนถึงเทคโนโลยี Smart Home ที่ครบครัน',
            )
          : rt(
              `${p.title} โครงการคุณภาพจาก Northland Development ในทำเล${p.address} ที่ออกแบบด้วยความใส่ใจในทุกรายละเอียด ตามมาตรฐานที่เราส่งมอบมากว่า 30 ปี`,
            ),
        highlights: isAttaluck
          ? [
              { text: '🏊 Private Pool ทุกยูนิต ขนาด 4×8 ม.' },
              { text: '🚗 Private Garage 3 คัน + EV Charger' },
              { text: '🌳 Garden Terrace 2 ชั้น พื้นที่สีเขียวกว่า 30%' },
              { text: '🛡️ ระบบรักษาความปลอดภัย 24 ชม. + Face Recognition' },
              { text: '🏠 Smart Home System (Crestron / KNX)' },
              { text: '🚇 ห่างจาก BTS สุขุมวิท เพียง 350 ม.' },
            ]
          : undefined,
        specs: isAttaluck
          ? {
              units: '4 ยูนิต',
              usableArea: '600 – 720 ตร.ม.',
              landSize: '156 – 198 ตร.วา',
              bedrooms: '4 – 5 ห้อง',
              bathrooms: '5 – 6 ห้อง',
              projectValue: '272 ล้านบาท',
            }
          : undefined,
        promoNote: isAttaluck ? 'ผ่อนดาวน์ 0% สูงสุด 24 เดือน · รับสิทธิ์โอนฟรี' : undefined,
        locationFeatures: isAttaluck
          ? [
              { title: '🚇 การเดินทาง', detail: 'BTS สุขุมวิท 350 ม. · ทางด่วนเฉลิมมหานคร 2 กม. · สนามบินสุวรรณภูมิ 25 นาที' },
              { title: '🛍️ ไลฟ์สไตล์', detail: 'Emporium 800 ม. · EmQuartier 1 กม. · The Mall บางกะปิ 5 กม. · Terminal 21' },
              { title: '🏥 โรงพยาบาล', detail: 'รพ.สมิติเวช สุขุมวิท 1.2 กม. · รพ.บำรุงราษฎร์ 3 กม. · รพ.กรุงเทพ 4 กม.' },
              { title: '🎓 โรงเรียน', detail: 'NIST International School · Bangkok Prep · International School Bangkok' },
            ]
          : undefined,
      },
    })
    projectIds[p.slug] = created.id
    log(`สร้างโครงการ: ${p.title}`)
  }

  // ---------- โปรโมชั่น ----------
  const promotions = [
    { title: 'ฉลอง 30 ปี รับ 30 สิทธิ์พิเศษ', desc: 'ลดสูงสุด 30% · ฟรีค่าโอน · ฟรีค่าจดจำนอง · ของแถมมูลค่ารวมกว่า 300,000 บาท', end: '2026-12-31', project: null },
    { title: 'ผ่อนดาวน์ 0% สูงสุด 24 เดือน', desc: 'สำหรับ Pool Villa ระดับ Luxury · พิเศษเฉพาะ 4 ยูนิต · เลือกห้องก่อนใคร', end: null, project: 'attaluck-sukhumvit' },
    { title: 'บ้านหลังแรก ฟรีค่าโอน', desc: 'สำหรับลูกค้าที่ซื้อบ้านหลังแรก ฟรีค่าโอน + ค่าจดจำนอง รวมมูลค่ากว่า 60,000 บาท — ทุกโครงการในสระบุรี', end: null, project: null },
    { title: 'แนะนำเพื่อนรับ 50,000 บาท', desc: 'แนะนำเพื่อนที่จองและโอนกรรมสิทธิ์ รับเงินสด 50,000 บาท / ราย ไม่จำกัดจำนวน — ทุกโครงการ', end: null, project: null },
    { title: 'บ้านพร้อมอยู่ ลด 5%', desc: 'เลือกบ้านพร้อมเข้าอยู่ในสระบุรี รับส่วนลดทันที 5% + แอร์ทั้งหลัง — เฉพาะบ้านพร้อมอยู่', end: null, project: null },
    { title: 'สิทธิพิเศษผู้สูงวัย 55+', desc: 'รับการออกแบบ Universal Design ฟรี · ลิฟต์บ้าน · ราวจับ · พื้นกันลื่น — บ้านเดี่ยวทุกโครงการ', end: null, project: null },
  ]
  for (const promo of promotions) {
    const existing = await payload.find({
      collection: 'promotions',
      where: { title: { equals: promo.title } },
      limit: 1,
      draft: true,
    })
    if (existing.docs[0]) {
      log(`ข้าม (มีแล้ว): โปร ${promo.title}`)
      continue
    }
    await payload.create({
      collection: 'promotions',
      data: {
        title: promo.title,
        description: rt(promo.desc),
        startDate: '2026-01-01T00:00:00.000Z',
        endDate: promo.end ? `${promo.end}T23:59:59.000Z` : undefined,
        project: promo.project ? projectIds[promo.project] : undefined,
        _status: 'published',
      },
    })
    log(`สร้างโปรโมชั่น: ${promo.title}`)
  }

  // ---------- บทความ ----------
  const posts = [
    {
      slug: 'condo-bts-investment-2026',
      title: '5 เหตุผลที่คอนโดติด BTS ยังเป็นการลงทุนที่คุ้มในปี 2569',
      category: 'knowledge' as const,
      excerpt: 'วิเคราะห์ภาพรวมตลาดคอนโดในกรุงเทพฯ ปี 2569 ทำเลไหนน่าลงทุน อัปเดตเทรนด์ ROI และสิ่งที่ต้องดูก่อนตัดสินใจ',
      publishedAt: '2026-05-25T09:00:00.000Z',
      body: [
        'ตลาดคอนโดมิเนียมในกรุงเทพฯ ปี 2569 ยังคงมีความเคลื่อนไหวที่น่าสนใจ โดยเฉพาะโครงการที่อยู่ใกล้สถานีรถไฟฟ้า BTS ซึ่งยังคงเป็นทำเลที่มีความต้องการเช่าและซื้อสูงต่อเนื่อง',
        'เหตุผลสำคัญ 5 ข้อ ได้แก่ 1) ค่าเช่าที่ปรับตัวสูงขึ้นตามต้นทุนการเดินทาง 2) ซัพพลายใหม่ในทำเลติดรถไฟฟ้ามีจำกัด 3) พฤติกรรมคนรุ่นใหม่ที่เลือกอยู่ใกล้ระบบขนส่งมวลชน 4) แนวโน้มดอกเบี้ยที่เริ่มทรงตัว และ 5) มาตรการสนับสนุนจากภาครัฐสำหรับที่อยู่อาศัยหลังแรก',
        'สำหรับผู้ที่กำลังมองหาโอกาส โครงการ Beat สุขุมวิท และ Beat บางหว้า ของ Northland เป็นตัวเลือกที่เข้าถึงได้ในงบ 2.8 – 3.5 ล้านบาท พร้อมศักยภาพการเติบโตของทำเล',
      ],
    },
    {
      slug: 'home-near-motorway',
      title: 'บ้านใกล้มอเตอร์เวย์ ดีอย่างไร? เทียบสระบุรี vs. กรุงเทพฯ',
      category: 'knowledge' as const,
      excerpt: 'เปรียบเทียบการเดินทาง คุณภาพชีวิต ราคาบ้าน และโอกาสเติบโตของทำเลใกล้มอเตอร์เวย์',
      publishedAt: '2026-05-18T09:00:00.000Z',
      body: [
        'มอเตอร์เวย์สายบางปะอิน-โคราช เปลี่ยนภาพการเดินทางระหว่างกรุงเทพฯ กับสระบุรีไปอย่างสิ้นเชิง การมีบ้านในสระบุรีวันนี้ ไม่ได้แปลว่าไกลจากเมืองอีกต่อไป',
        'เมื่อเทียบราคาต่อตารางเมตร บ้านเดี่ยวในสระบุรีเริ่มต้นเพียง 2.7 – 4.2 ล้านบาท ได้พื้นที่ใช้สอยมากกว่าบ้านในกรุงเทพฯ ราคาเดียวกันถึงเท่าตัว พร้อมคุณภาพชีวิตและอากาศที่ดีกว่า',
        'โครงการของ Northland ทั้ง Taravana, Pundara และ The Pine ล้วนอยู่ในทำเลที่เข้าถึงมอเตอร์เวย์ได้สะดวก เดินทางเข้ากรุงเทพฯ ได้ภายในชั่วโมงเศษ',
      ],
    },
    {
      slug: 'home-loan-approval-tips',
      title: 'วิธีกู้ซื้อบ้านให้ผ่าน 100% — เคล็ดลับจากผู้เชี่ยวชาญ',
      category: 'knowledge' as const,
      excerpt: 'เตรียมเอกสารยังไง? เครดิตบูโรสำคัญแค่ไหน? และทำไมบางคนกู้ไม่ผ่าน',
      publishedAt: '2026-05-12T09:00:00.000Z',
      body: [
        'การกู้ซื้อบ้านให้ผ่านไม่ใช่เรื่องของดวง แต่เป็นเรื่องของการเตรียมตัว สิ่งแรกที่ธนาคารดูคือความสามารถในการผ่อนชำระ ซึ่งคำนวณจากรายได้สุทธิหลังหักภาระหนี้เดิม',
        'เคล็ดลับสำคัญ: เคลียร์หนี้บัตรเครดิตให้เหลือน้อยที่สุดก่อนยื่นกู้ 6 เดือน, เดินบัญชีให้สม่ำเสมอ, อย่าค้ำประกันใครในช่วงนี้ และเตรียมเงินดาวน์อย่างน้อย 10% เพื่อเพิ่มโอกาสอนุมัติ',
        'ทีมงาน Northland มี Bank Partners กว่า 10 ธนาคาร พร้อมช่วยประเมินวงเงินเบื้องต้นและจัดเตรียมเอกสารให้ฟรี ติดต่อที่ปรึกษาการขายได้ทุกโครงการ',
      ],
    },
    {
      slug: 'universal-design-home',
      title: 'Universal Design — บ้านที่ออกแบบเพื่อทุกช่วงวัย',
      category: 'lifestyle' as const,
      excerpt: 'เมื่อสังคมไทยก้าวสู่ Aging Society ทำไมการเลือกบ้านที่ออกแบบให้ผู้สูงวัยใช้ได้สะดวก คือการลงทุนระยะยาว',
      publishedAt: '2026-05-05T09:00:00.000Z',
      body: [
        'ประเทศไทยเข้าสู่สังคมผู้สูงอายุโดยสมบูรณ์แล้ว บ้านที่ดีจึงไม่ใช่แค่สวยวันนี้ แต่ต้องรองรับชีวิตอีก 20-30 ปีข้างหน้าของทุกคนในครอบครัว',
        'หลัก Universal Design ที่ Northland ใช้ในทุกโครงการ ได้แก่ ทางลาดและประตูกว้างพิเศษ พื้นกันลื่นในห้องน้ำ ราวจับในจุดเสี่ยง สวิตช์ไฟระดับเอื้อมถึง และห้องนอนชั้นล่างสำหรับผู้สูงวัย',
        'เพราะ "ที่เราใส่ใจ" หมายถึงใส่ใจทุกช่วงวัยของชีวิต',
      ],
    },
    {
      slug: 'northland-30th-anniversary',
      title: 'Northland ฉลอง 30 ปี เปิดตัวโปรพิเศษ "30 สิทธิ์ดีๆ"',
      category: 'news' as const,
      excerpt: 'ฉลองครบรอบ 30 ปีของการสร้างบ้าน — Northland ขอบคุณลูกค้าทุกท่านด้วยโปรโมชั่นพิเศษตลอดปี 2569',
      publishedAt: '2026-05-01T09:00:00.000Z',
      body: [
        'ปี 2569 ถือเป็นปีสำคัญของ Northland Development — ครบรอบ 30 ปีของการก่อตั้ง จากโครงการบ้านเดี่ยวแรกในสระบุรีเมื่อปี 2539 สู่ 23 โครงการ 3,209 ยูนิต มูลค่ารวมกว่า 8,110 ล้านบาท',
        'เพื่อขอบคุณลูกค้าทุกท่าน เราจัดแคมเปญ "30 ปี 30 สิทธิ์พิเศษ" ลดสูงสุด 30% ฟรีค่าโอน ฟรีค่าจดจำนอง และของแถมรวมมูลค่ากว่า 300,000 บาท ตลอดปีนี้',
        'ติดตามรายละเอียดได้ที่หน้าโปรโมชั่น หรือลงทะเบียนรับข้อมูลกับที่ปรึกษาการขายทุกโครงการ',
      ],
    },
  ]
  for (const post of posts) {
    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: post.slug } },
      limit: 1,
      draft: true,
    })
    if (existing.docs[0]) {
      log(`ข้าม (มีแล้ว): บทความ ${post.title}`)
      continue
    }
    await payload.create({
      collection: 'posts',
      data: {
        slug: post.slug,
        title: post.title,
        category: post.category,
        excerpt: post.excerpt,
        publishedAt: post.publishedAt,
        content: rt(...post.body),
        _status: 'published',
      },
    })
    log(`สร้างบทความ: ${post.title}`)
  }

  // ---------- ความคืบหน้าการก่อสร้าง ----------
  const progress = [
    { project: 'taravana', percent: 75, desc: 'งานโครงสร้างแล้วเสร็จ อยู่ระหว่างงานสถาปัตยกรรมและงานระบบ · เริ่ม Q1/2025 · คาดส่งมอบ Q4/2026' },
    { project: 'beat-sukhumvit', percent: 45, desc: 'งานโครงสร้างอาคารถึงชั้น 18 จาก 32 ชั้น · เริ่ม Q3/2025 · คาดส่งมอบ Q2/2027' },
    { project: 'the-harmony', percent: 90, desc: 'งานเก็บรายละเอียดและตรวจ QC ก่อนส่งมอบ · เริ่ม Q2/2024 · คาดส่งมอบ Q3/2026' },
    { project: 'detara', percent: 30, desc: 'งานฐานรากและโครงสร้างชั้น 1 · เริ่ม Q4/2025 · คาดส่งมอบ Q3/2027' },
    { project: 'beat-bangwa', percent: 60, desc: 'งานโครงสร้างแล้วเสร็จ เริ่มงานผนังและงานระบบ · เริ่ม Q1/2025 · คาดส่งมอบ Q1/2027' },
    { project: 'arna', percent: 15, desc: 'Arna Phase 2 — งานปรับพื้นที่และฐานราก · เริ่ม Q1/2026 · คาดส่งมอบ Q2/2028' },
  ]
  for (const pr of progress) {
    const projectId = projectIds[pr.project]
    if (!projectId) continue
    const existing = await payload.find({
      collection: 'progress-updates',
      where: { and: [{ project: { equals: projectId } }, { title: { equals: 'งวดล่าสุด — พฤษภาคม 2569' } }] },
      limit: 1,
    })
    if (existing.docs[0]) {
      log(`ข้าม (มีแล้ว): ความคืบหน้า ${pr.project}`)
      continue
    }
    await payload.create({
      collection: 'progress-updates',
      data: {
        project: projectId,
        title: 'งวดล่าสุด — พฤษภาคม 2569',
        updateDate: '2026-05-28T09:00:00.000Z',
        percent: pr.percent,
        description: pr.desc,
      },
    })
    log(`สร้างความคืบหน้า: ${pr.project} ${pr.percent}%`)
  }

  // ---------- ตำแหน่งงาน ----------
  const jobs = [
    { title: 'Senior Architect', department: 'Design', location: 'สำนักงานใหญ่ (Saraburi)', detail: 'ประสบการณ์ 5+ ปี ออกแบบโครงการที่อยู่อาศัย' },
    { title: 'Civil / Structural Engineer', department: 'Engineering', location: 'สำนักงานใหญ่ + Site (Saraburi)', detail: 'ประสบการณ์ 3+ ปี ควบคุมงานก่อสร้างโครงการแนวราบ' },
    { title: 'Sales Consultant (Premium)', department: 'Sales', location: 'Sales Gallery (Bangkok / Sukhumvit)', detail: 'ภาษาอังกฤษดี ดูแลลูกค้าโครงการระดับ Luxury' },
    { title: 'Digital Marketing Manager', department: 'Marketing', location: 'สำนักงานใหญ่ / Hybrid', detail: 'ประสบการณ์ 4+ ปี Performance Marketing' },
    { title: 'Project Manager', department: 'Construction', location: 'Project Site (Saraburi / Bangkok)', detail: 'ประสบการณ์ 5+ ปี บริหารโครงการก่อสร้าง' },
    { title: 'After-Sales Coordinator', department: 'Customer Care', location: 'สำนักงานใหญ่ (Saraburi)', detail: 'จบใหม่หรือมีประสบการณ์ ดูแลงานบริการหลังการขาย' },
  ]
  for (const job of jobs) {
    const existing = await payload.find({
      collection: 'jobs',
      where: { title: { equals: job.title } },
      limit: 1,
    })
    if (existing.docs[0]) {
      log(`ข้าม (มีแล้ว): งาน ${job.title}`)
      continue
    }
    await payload.create({
      collection: 'jobs',
      data: {
        title: job.title,
        department: job.department,
        location: job.location,
        employmentType: 'full-time',
        description: rt(job.detail),
        active: true,
      },
    })
    log(`สร้างตำแหน่งงาน: ${job.title}`)
  }

  log('เสร็จสมบูรณ์ ✓')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
