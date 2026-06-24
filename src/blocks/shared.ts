import type { Field } from 'payload'
import { displayFontOptions } from '../lib/fonts'

// ฟิลด์ตั้งค่า layout ที่ทุก section block ใช้ร่วมกัน — ทีมปรับ "พื้นหลัง / ระยะห่าง / สีพื้นเฉพาะส่วน" ได้เอง
export const appearanceFields: Field = {
  type: 'collapsible',
  label: { th: '⚙ ตั้งค่า Layout & พื้นหลังของ section นี้', en: 'Section layout & background' },
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
            { label: { th: 'กำหนดสีเอง ↓', en: 'Custom color' }, value: 'custom' },
            { label: { th: 'รูปพื้นหลัง ↓', en: 'Image' }, value: 'image' },
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
    {
      name: 'bgColor',
      type: 'text',
      label: { th: 'สีพื้นหลัง (กำหนดเอง)', en: 'Custom background color' },
      admin: {
        description: 'รหัสสี HEX เช่น #f0f8ff',
        condition: (_, sib) => sib?.background === 'custom',
      },
    },
    {
      name: 'textOnDark',
      type: 'checkbox',
      defaultValue: false,
      label: { th: 'ใช้ตัวอักษรสีขาว (พื้นเข้ม)', en: 'White text' },
      admin: { condition: (_, sib) => sib?.background === 'custom' || sib?.background === 'image' },
    },
    {
      name: 'bgImage',
      type: 'upload',
      relationTo: 'media',
      label: { th: 'รูปพื้นหลัง', en: 'Background image' },
      admin: { condition: (_, sib) => sib?.background === 'image' },
    },
  ],
}

// ตัวเลือกจัดสไตล์หัวข้อ (ฟอนต์ / น้ำหนัก / สี)
export const headingStyleFields: Field = {
  type: 'collapsible',
  label: { th: '🎨 สไตล์หัวข้อ (ฟอนต์ / น้ำหนัก / สี)', en: 'Heading style' },
  admin: { initCollapsed: true },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'headingFont',
          type: 'select',
          label: { th: 'ฟอนต์หัวข้อ', en: 'Heading font' },
          options: [{ label: { th: 'ค่าเริ่มต้น', en: 'Default' }, value: '' }, ...displayFontOptions],
        },
        {
          name: 'headingWeight',
          type: 'select',
          label: { th: 'น้ำหนัก', en: 'Weight' },
          options: [
            { label: { th: 'ค่าเริ่มต้น', en: 'Default' }, value: '' },
            { label: '400', value: '400' },
            { label: '500', value: '500' },
            { label: '600', value: '600' },
            { label: '700', value: '700' },
            { label: '800', value: '800' },
          ],
        },
        {
          name: 'headingColor',
          type: 'text',
          label: { th: 'สีหัวข้อ (HEX)', en: 'Heading color' },
          admin: { description: 'เช่น #00AEEF' },
        },
      ],
    },
  ],
}

import { ALL_FONTS } from '../lib/fonts'

export type Appearance = {
  background?: 'none' | 'soft' | 'brand' | 'dark' | 'custom' | 'image'
  paddingY?: 'sm' | 'md' | 'lg'
  bgColor?: string
  bgImage?: unknown
  textOnDark?: boolean
}

export type HeadingStyle = {
  headingFont?: string
  headingWeight?: string
  headingColor?: string
}

import { mediaUrl } from '../lib/labels'

// แปลงค่า appearance → style ของ <section>
export function sectionStyle(a?: Appearance): React.CSSProperties {
  const pad = { sm: '2.5rem', md: '4.5rem', lg: '7rem' }[a?.paddingY || 'md']
  const style: React.CSSProperties = { paddingTop: pad, paddingBottom: pad }
  switch (a?.background) {
    case 'soft':
      style.background = 'var(--paper-soft)'
      break
    case 'brand':
      style.background = 'var(--north-sea)'
      style.color = '#fff'
      break
    case 'dark':
      style.background = 'var(--north-gray)'
      style.color = '#fff'
      break
    case 'custom':
      if (a.bgColor) style.background = a.bgColor
      if (a.textOnDark) style.color = '#fff'
      break
    case 'image': {
      const img = mediaUrl(a.bgImage)
      if (img) {
        style.backgroundImage = a.textOnDark
          ? `linear-gradient(rgba(0,0,0,0.45),rgba(0,0,0,0.45)), url(${img})`
          : `url(${img})`
        style.backgroundSize = 'cover'
        style.backgroundPosition = 'center'
      }
      if (a.textOnDark) style.color = '#fff'
      break
    }
  }
  return style
}

// แปลงค่าสไตล์หัวข้อ → style
export function headingStyle(h?: HeadingStyle): React.CSSProperties {
  const style: React.CSSProperties = {}
  if (h?.headingFont) {
    const f = ALL_FONTS.find((x) => x.value === h.headingFont)
    if (f) style.fontFamily = f.family
  }
  if (h?.headingWeight) style.fontWeight = Number(h.headingWeight)
  if (h?.headingColor) style.color = h.headingColor
  return style
}
