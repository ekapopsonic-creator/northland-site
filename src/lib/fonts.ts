// ชุดฟอนต์ที่คัดมาให้ทีมเลือก — รองรับภาษาไทยทุกตัว (body) + ฟอนต์หัวข้อ (display)
// value = ค่าใน select, family = ชื่อ CSS, google = พารามิเตอร์ของ Google Fonts (ใส่ weight แล้ว)

export type FontDef = { value: string; label: string; family: string; google: string }

export const bodyFonts: FontDef[] = [
  { value: 'prompt', label: 'Prompt (ค่าเริ่มต้น)', family: '"Prompt", sans-serif', google: 'Prompt:wght@300;400;500;600;700' },
  { value: 'sarabun', label: 'Sarabun (อ่านสบาย)', family: '"Sarabun", sans-serif', google: 'Sarabun:wght@300;400;500;600;700' },
  { value: 'kanit', label: 'Kanit (โมเดิร์น)', family: '"Kanit", sans-serif', google: 'Kanit:wght@300;400;500;600;700' },
  { value: 'noto-thai', label: 'Noto Sans Thai (ทางการ)', family: '"Noto Sans Thai", sans-serif', google: 'Noto+Sans+Thai:wght@300;400;500;600;700' },
  { value: 'ibm-thai', label: 'IBM Plex Sans Thai', family: '"IBM Plex Sans Thai", sans-serif', google: 'IBM+Plex+Sans+Thai:wght@300;400;500;600;700' },
  { value: 'bai-jamjuree', label: 'Bai Jamjuree', family: '"Bai Jamjuree", sans-serif', google: 'Bai+Jamjuree:wght@300;400;500;600;700' },
]

export const displayFonts: FontDef[] = [
  { value: 'cormorant', label: 'Cormorant Garamond (ค่าเริ่มต้น · หรูหรา)', family: '"Cormorant Garamond", serif', google: 'Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400' },
  { value: 'playfair', label: 'Playfair Display (คลาสสิก)', family: '"Playfair Display", serif', google: 'Playfair+Display:wght@400;500;600;700' },
  { value: 'prompt-display', label: 'Prompt (โมเดิร์น Sans)', family: '"Prompt", sans-serif', google: 'Prompt:wght@400;500;600;700' },
  { value: 'kanit-display', label: 'Kanit (Sans หนา)', family: '"Kanit", sans-serif', google: 'Kanit:wght@400;500;600;700' },
  { value: 'noto-serif-thai', label: 'Noto Serif Thai', family: '"Noto Serif Thai", serif', google: 'Noto+Serif+Thai:wght@400;500;600;700' },
]

export const bodyFontOptions = bodyFonts.map((f) => ({ label: f.label, value: f.value }))
export const displayFontOptions = displayFonts.map((f) => ({ label: f.label, value: f.value }))

// สร้าง <link> Google Fonts + CSS vars จากค่าที่เลือก
export function buildFontConfig(bodyValue?: string | null, displayValue?: string | null) {
  const body = bodyFonts.find((f) => f.value === bodyValue) || bodyFonts[0]
  const display = displayFonts.find((f) => f.value === displayValue) || displayFonts[0]
  const families = [body.google]
  if (display.google !== body.google) families.push(display.google)
  const href = `https://fonts.googleapis.com/css2?${families.map((g) => `family=${g}`).join('&')}&display=swap`
  return {
    href,
    cssVars: `:root{--font-sans:${body.family};--font-display:${display.family};}`,
  }
}
