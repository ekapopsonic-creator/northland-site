'use client'

import React from 'react'
import { useField, FieldLabel } from '@payloadcms/ui'
import { ALL_FONTS } from '../../lib/fonts'

const selectStyle: React.CSSProperties = {
  width: '100%',
  height: 38,
  padding: '0 0.6rem',
  border: '1px solid var(--theme-elevation-150)',
  borderRadius: 6,
  background: 'var(--theme-input-bg)',
}

const labelText = (field: any) =>
  field?.label && typeof field.label === 'object' ? field.label.th || field.label.en : field?.label

// ดรอปดาวน์ฟอนต์ — เก็บค่าเป็น text (ไม่สร้าง enum ใน DB)
export const FontSelectField: React.FC<{ path: string; field?: any }> = ({ path, field }) => {
  const { value, setValue } = useField<string>({ path })
  return (
    <div className="field-type" style={{ marginBottom: '1rem' }}>
      <FieldLabel label={labelText(field)} path={path} />
      <select value={value || ''} onChange={(e) => setValue(e.target.value)} style={selectStyle}>
        <option value="">ค่าเริ่มต้น</option>
        {ALL_FONTS.map((f) => (
          <option key={f.value} value={f.value}>
            {f.label}
          </option>
        ))}
      </select>
    </div>
  )
}

const WEIGHTS = ['300', '400', '500', '600', '700', '800']

// ดรอปดาวน์ค่าน้ำหนัก — เก็บค่าเป็น text
export const WeightSelectField: React.FC<{ path: string; field?: any }> = ({ path, field }) => {
  const { value, setValue } = useField<string>({ path })
  return (
    <div className="field-type" style={{ marginBottom: '1rem' }}>
      <FieldLabel label={labelText(field)} path={path} />
      <select value={value || ''} onChange={(e) => setValue(e.target.value)} style={selectStyle}>
        <option value="">ค่าเริ่มต้น</option>
        {WEIGHTS.map((w) => (
          <option key={w} value={w}>
            {w}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FontSelectField
