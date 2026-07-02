import * as React from 'react'
import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'

// bitmask รูปแบบข้อความของ Lexical
const IS_BOLD = 1
const IS_ITALIC = 2
const IS_STRIKETHROUGH = 4
const IS_UNDERLINE = 8
const IS_CODE = 16
const IS_SUBSCRIPT = 32
const IS_SUPERSCRIPT = 64

// แปลง "color: red; font-size: 24px" → { color:'red', fontSize:'24px' }
function styleToObject(style?: string): React.CSSProperties {
  const out: Record<string, string> = {}
  if (!style) return out
  for (const part of style.split(';')) {
    const i = part.indexOf(':')
    if (i < 0) continue
    const key = part.slice(0, i).trim()
    const val = part.slice(i + 1).trim()
    if (!key || !val) continue
    const camel = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
    out[camel] = val
  }
  return out as React.CSSProperties
}

// text converter ที่ทั้ง render format (B/I/U/S) และ inline style (สี/ฟอนต์/ขนาด/ไฮไลต์)
// ค่าเริ่มต้นของ Payload ไม่ render node.style — อันนี้เติมให้
export const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  text: ({ node }: { node: { text: string; format?: number; style?: string } }) => {
    let el: React.ReactNode = node.text
    const f = node.format || 0
    if (f & IS_BOLD) el = <strong>{el}</strong>
    if (f & IS_ITALIC) el = <em>{el}</em>
    if (f & IS_STRIKETHROUGH) el = <span style={{ textDecoration: 'line-through' }}>{el}</span>
    if (f & IS_UNDERLINE) el = <span style={{ textDecoration: 'underline' }}>{el}</span>
    if (f & IS_CODE) el = <code>{el}</code>
    if (f & IS_SUBSCRIPT) el = <sub>{el}</sub>
    if (f & IS_SUPERSCRIPT) el = <sup>{el}</sup>
    const style = styleToObject(node.style)
    if (Object.keys(style).length) el = <span style={style}>{el}</span>
    return <React.Fragment>{el}</React.Fragment>
  },
})
