// ชุดฟอนต์ทั้งหมดที่ใช้ได้ — รองรับไทย + เลือกใน rich text ได้
// google = พารามิเตอร์ Google Fonts (ทุกค่าน้ำหนักที่มีจริง)

export type FontDef = { value: string; label: string; family: string; google: string }

// ฟอนต์ทั้งหมด (ใช้ทั้ง body/display picker และ rich text)
export const ALL_FONTS: FontDef[] = [
  { value: 'prompt', label: 'Prompt', family: '"Prompt", sans-serif', google: 'Prompt:wght@300;400;500;600;700' },
  { value: 'sarabun', label: 'Sarabun', family: '"Sarabun", sans-serif', google: 'Sarabun:wght@300;400;500;600;700' },
  { value: 'kanit', label: 'Kanit', family: '"Kanit", sans-serif', google: 'Kanit:wght@100;200;300;400;500;600;700;800;900' },
  { value: 'athiti', label: 'Athiti', family: '"Athiti", sans-serif', google: 'Athiti:wght@200;300;400;500;600;700' },
  { value: 'anuphan', label: 'Anuphan', family: '"Anuphan", sans-serif', google: 'Anuphan:wght@100;200;300;400;500;600;700' },
  { value: 'ibm-thai', label: 'IBM Plex Sans Thai', family: '"IBM Plex Sans Thai", sans-serif', google: 'IBM+Plex+Sans+Thai:wght@100;200;300;400;500;600;700' },
  { value: 'montserrat', label: 'Montserrat', family: '"Montserrat", sans-serif', google: 'Montserrat:wght@100;200;300;400;500;600;700;800;900' },
  { value: 'barlow', label: 'Barlow', family: '"Barlow", sans-serif', google: 'Barlow:wght@100;200;300;400;500;600;700;800;900' },
  { value: 'zalando', label: 'Zalando Sans', family: '"Zalando Sans", sans-serif', google: 'Zalando+Sans:wght@400;500;600;700;800;900' },
  { value: 'noto-thai', label: 'Noto Sans Thai', family: '"Noto Sans Thai", sans-serif', google: 'Noto+Sans+Thai:wght@300;400;500;600;700' },
  { value: 'cormorant', label: 'Cormorant Garamond (Serif)', family: '"Cormorant Garamond", serif', google: 'Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400' },
  { value: 'playfair', label: 'Playfair Display (Serif)', family: '"Playfair Display", serif', google: 'Playfair+Display:wght@400;500;600;700;800;900' },
  { value: 'noto-serif-thai', label: 'Noto Serif Thai (Serif)', family: '"Noto Serif Thai", serif', google: 'Noto+Serif+Thai:wght@400;500;600;700' },
]

const byValue = (v?: string | null) => ALL_FONTS.find((f) => f.value === v)

// ตัวเลือกฟอนต์เนื้อหา / หัวข้อ (ทั้งหมดเลือกได้)
export const bodyFontOptions = ALL_FONTS.filter((f) => !f.value.includes('cormorant') && !f.value.includes('playfair')).map((f) => ({ label: f.label, value: f.value }))
export const displayFontOptions = ALL_FONTS.map((f) => ({ label: f.label, value: f.value }))

// โหลด Google Fonts ทุกตัว (เพื่อให้ rich text ใช้ฟอนต์ไหนก็ได้) + ตั้ง CSS var ตามที่เลือก
export function buildFontConfig(bodyValue?: string | null, displayValue?: string | null) {
  const body = byValue(bodyValue) || ALL_FONTS[0]
  const display = byValue(displayValue) || byValue('cormorant')!
  const href = `https://fonts.googleapis.com/css2?${ALL_FONTS.map((f) => `family=${f.google}`).join('&')}&display=swap`
  return {
    href,
    cssVars: `:root{--font-sans:${body.family};--font-display:${display.family};}`,
  }
}

// ===== ตัวเลือกสำหรับ rich text (TextStateFeature) =====
// ฟอนต์
export const richTextFonts = Object.fromEntries(
  ALL_FONTS.map((f) => [f.value, { label: f.label, css: { 'font-family': f.family } }]),
)

// ค่าน้ำหนัก
export const richTextWeights = {
  '300': { label: 'บาง (300)', css: { 'font-weight': '300' } },
  '400': { label: 'ปกติ (400)', css: { 'font-weight': '400' } },
  '500': { label: 'กลาง (500)', css: { 'font-weight': '500' } },
  '600': { label: 'กึ่งหนา (600)', css: { 'font-weight': '600' } },
  '700': { label: 'หนา (700)', css: { 'font-weight': '700' } },
  '800': { label: 'หนามาก (800)', css: { 'font-weight': '800' } },
}

// สีข้อความ (ใช้ตัวแปรแบรนด์ + สีพื้นฐาน)
export const richTextColors = {
  brand: { label: 'สีแบรนด์', css: { color: 'var(--north-sea)' } },
  brandDark: { label: 'สีแบรนด์เข้ม', css: { color: 'var(--deep-blue)' } },
  secondary1: { label: 'Secondary 1', css: { color: 'var(--secondary-1)' } },
  secondary2: { label: 'Secondary 2', css: { color: 'var(--secondary-2)' } },
  secondary3: { label: 'Secondary 3', css: { color: 'var(--secondary-3)' } },
  ink: { label: 'เทาเข้ม', css: { color: '#58595B' } },
  black: { label: 'ดำ', css: { color: '#111111' } },
  white: { label: 'ขาว', css: { color: '#ffffff' } },
  gold: { label: 'ทอง', css: { color: '#C9A24B' } },
  red: { label: 'แดง', css: { color: '#D23B3B' } },
  green: { label: 'เขียว', css: { color: '#2E9E5B' } },
}
