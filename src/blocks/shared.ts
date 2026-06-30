import type { Field } from 'payload'
import { ALL_FONTS } from '../lib/fonts'
import { mediaUrl } from '../lib/labels'

const COLOR_FIELD = '/components/admin/ColorField#ColorField'

// ช่องสีที่มีแผงสี (color chart) + ใส่รหัส HEX
export function colorField(name: string, th: string, defaultValue?: string): Field {
  return {
    name,
    type: 'text',
    defaultValue,
    label: { th, en: th },
    admin: { components: { Field: COLOR_FIELD } },
  } as Field
}

const FONT_FIELD = '/components/admin/StyleSelects#FontSelectField'
const WEIGHT_FIELD = '/components/admin/StyleSelects#WeightSelectField'
const SIZE_FIELD = '/components/admin/StyleSelects#SizeSelectField'
const SPACING_FIELD = '/components/admin/StyleSelects#SpacingSelectField'

export function textField(name: string, label: string, component: string): Field {
  return { name, type: 'text', label: { th: label, en: label }, admin: { components: { Field: component } } } as Field
}

// ฟอนต์/น้ำหนัก/ขนาด เก็บเป็น text (ไม่สร้าง enum) แต่ใช้ dropdown component — เลี่ยง drizzle push interactive
// กลุ่มตั้งค่าสไตล์ตัวอักษร (ฟอนต์/น้ำหนัก/ขนาด/สี) ของแต่ละชิ้นข้อความในบล็อก
export function textStyleFields(elements: { key: string; label: string }[]): Field {
  return {
    type: 'collapsible',
    label: { th: '🎨 สไตล์ตัวอักษร (ฟอนต์ / น้ำหนัก / ขนาด / สี)', en: 'Text styles' },
    admin: { initCollapsed: true },
    fields: elements.map((el) => ({
      type: 'row',
      fields: [
        textField(`${el.key}Font`, `${el.label} — ฟอนต์`, FONT_FIELD),
        textField(`${el.key}Weight`, 'น้ำหนัก', WEIGHT_FIELD),
        textField(`${el.key}Size`, 'ขนาด', SIZE_FIELD),
        colorField(`${el.key}Color`, 'สี'),
      ],
    })) as Field[],
  } as Field
}

// ฟิลด์ตั้งค่าพื้นหลัง/ระยะห่างของ section
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
      ...(colorField('bgColor', 'สีพื้นหลัง (กำหนดเอง)') as any),
      admin: {
        components: { Field: COLOR_FIELD },
        condition: (_: any, sib: any) => sib?.background === 'custom',
      },
    },
    {
      name: 'textOnDark',
      type: 'checkbox',
      defaultValue: false,
      label: { th: 'ใช้ตัวอักษรสีขาว (พื้นเข้ม)', en: 'White text' },
      admin: { condition: (_: any, sib: any) => sib?.background === 'custom' || sib?.background === 'image' },
    },
    {
      name: 'bgImage',
      type: 'upload',
      relationTo: 'media',
      label: { th: 'รูปพื้นหลัง', en: 'Background image' },
      admin: { condition: (_: any, sib: any) => sib?.background === 'image' },
    },
    {
      type: 'row',
      fields: [
        textField('marginTop', 'ระยะห่างด้านบน (Margin top)', SPACING_FIELD),
        textField('marginBottom', 'ระยะห่างด้านล่าง (Margin bottom)', SPACING_FIELD),
      ],
    },
    {
      type: 'row',
      fields: [
        textField('paddingX', 'ระยะขอบซ้าย-ขวา (Padding X)', SPACING_FIELD),
        textField('gap', 'ระยะห่างระหว่างชิ้น (Gap)', SPACING_FIELD),
      ],
    },
  ],
}

export type Appearance = {
  background?: 'none' | 'soft' | 'brand' | 'dark' | 'custom' | 'image'
  paddingY?: 'sm' | 'md' | 'lg'
  bgColor?: string
  bgImage?: unknown
  textOnDark?: boolean
  marginTop?: string
  marginBottom?: string
  paddingX?: string
  gap?: string
}

export function sectionStyle(a?: Appearance): React.CSSProperties {
  const pad = { sm: '2.5rem', md: '4.5rem', lg: '7rem' }[a?.paddingY || 'md']
  const style: React.CSSProperties = { paddingTop: pad, paddingBottom: pad }
  if (a?.marginTop) style.marginTop = a.marginTop
  if (a?.marginBottom) style.marginBottom = a.marginBottom
  if (a?.paddingX) {
    style.paddingLeft = a.paddingX
    style.paddingRight = a.paddingX
  }
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

// คืน CSS style ของชิ้นข้อความตาม prefix (eyebrow/title/heading/tagline/lead/subtitle/text)
export function styleFor(block: any, key: string): React.CSSProperties {
  const s: React.CSSProperties = {}
  const f = ALL_FONTS.find((x) => x.value === block?.[`${key}Font`])
  if (f) s.fontFamily = f.family
  const w = block?.[`${key}Weight`]
  if (w) s.fontWeight = Number(w)
  const sz = block?.[`${key}Size`]
  if (sz) s.fontSize = `${sz}px`
  const c = block?.[`${key}Color`]
  if (c) s.color = c
  return s
}

// ระยะ gap ของ grid ภายใน section (ถ้าตั้งค่า)
export const gapStyle = (a?: Appearance): React.CSSProperties => (a?.gap ? { gap: a.gap } : {})

// alias เดิม (ใช้กับ heading)
export const headingStyle = (block: any): React.CSSProperties => styleFor(block, 'heading')
