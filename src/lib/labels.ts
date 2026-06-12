export const categoryLabels: Record<string, string> = {
  'single-house': 'บ้านเดี่ยว',
  'pool-villa': 'Pool Villa',
  townhome: 'ทาวน์โฮม',
  condo: 'Condominium',
  commercial: 'อาคารพาณิชย์',
}

export const statusLabels: Record<string, string> = {
  'coming-soon': 'เร็วๆ นี้',
  'under-construction': 'กำลังก่อสร้าง',
  ready: 'พร้อมเข้าอยู่',
  'sold-out': 'ปิดการขาย',
}

export const zoneLabels: Record<string, string> = {
  bangkok: 'กรุงเทพฯ',
  saraburi: 'สระบุรี',
}

export const postCategoryLabels: Record<string, string> = {
  news: 'ข่าว Northland',
  knowledge: 'สาระน่ารู้',
  lifestyle: 'ไลฟ์สไตล์',
}

export const mediaUrl = (media: unknown): string | null => {
  if (media && typeof media === 'object' && 'url' in media && typeof media.url === 'string') {
    return media.url
  }
  return null
}
