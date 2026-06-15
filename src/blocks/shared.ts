import type { Field } from 'payload'

// ฟิลด์ตั้งค่า layout ที่ทุก section block ใช้ร่วมกัน — ทีมปรับ "พื้นหลัง / ระยะห่าง / จัดกึ่งกลาง" ได้เอง
export const appearanceFields: Field = {
  type: 'collapsible',
  label: { th: '⚙ ตั้งค่า Layout ของ section นี้', en: 'Section layout' },
  admin: { initCollapsed: true },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'background',
          type: 'select',
          defaultValue: 'none',
          label: { th: 'พื้นหลัง', en: 'Background' },
          options: [
            { label: { th: 'ขาว (ปกติ)', en: 'White' }, value: 'none' },
            { label: { th: 'ฟ้าอ่อน', en: 'Soft blue' }, value: 'soft' },
            { label: { th: 'สีแบรนด์ (ตัวอักษรขาว)', en: 'Brand' }, value: 'brand' },
            { label: { th: 'เทาเข้ม (ตัวอักษรขาว)', en: 'Dark' }, value: 'dark' },
          ],
        },
        {
          name: 'paddingY',
          type: 'select',
          defaultValue: 'md',
          label: { th: 'ระยะห่างบน-ล่าง', en: 'Vertical spacing' },
          options: [
            { label: { th: 'แน่น', en: 'Small' }, value: 'sm' },
            { label: { th: 'ปกติ', en: 'Medium' }, value: 'md' },
            { label: { th: 'โปร่ง', en: 'Large' }, value: 'lg' },
          ],
        },
      ],
    },
  ],
}

export type Appearance = {
  background?: 'none' | 'soft' | 'brand' | 'dark'
  paddingY?: 'sm' | 'md' | 'lg'
}

// แปลงค่า appearance → style ของ <section>
export function sectionStyle(a?: Appearance): React.CSSProperties {
  const pad = { sm: '2.5rem', md: '4.5rem', lg: '7rem' }[a?.paddingY || 'md']
  const style: React.CSSProperties = { paddingTop: pad, paddingBottom: pad }
  if (a?.background === 'soft') style.background = 'var(--paper-soft)'
  else if (a?.background === 'brand') {
    style.background = 'var(--north-sea)'
    style.color = '#fff'
  } else if (a?.background === 'dark') {
    style.background = 'var(--north-gray)'
    style.color = '#fff'
  }
  return style
}
