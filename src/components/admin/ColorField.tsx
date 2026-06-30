'use client'

import React from 'react'
import { useField, FieldLabel } from '@payloadcms/ui'

// ช่องเลือกสี — มีทั้งแผงสี (color chart) และช่องใส่รหัส HEX
export const ColorField: React.FC<{ path: string; field?: any }> = ({ path, field }) => {
  const { value, setValue } = useField<string>({ path })
  const label =
    field?.label && typeof field.label === 'object' ? field.label.th || field.label.en : field?.label
  const hex = typeof value === 'string' ? value : ''
  const valid = /^#[0-9a-fA-F]{6}$/.test(hex)

  return (
    <div className="field-type" style={{ marginBottom: '1.25rem' }}>
      {label ? <FieldLabel label={label} path={path} /> : null}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <input
          type="color"
          value={valid ? hex : '#00aeef'}
          onChange={(e) => setValue(e.target.value.toUpperCase())}
          style={{
            width: 46,
            height: 38,
            padding: 0,
            border: '1px solid var(--theme-elevation-150)',
            borderRadius: 6,
            background: 'none',
            cursor: 'pointer',
            flexShrink: 0,
          }}
          aria-label="เลือกสีจากแผงสี"
        />
        <input
          type="text"
          value={hex}
          placeholder="#00AEEF"
          onChange={(e) => setValue(e.target.value)}
          style={{
            flex: 1,
            height: 38,
            padding: '0 0.75rem',
            border: '1px solid var(--theme-elevation-150)',
            borderRadius: 6,
            fontFamily: 'monospace',
            textTransform: 'uppercase',
          }}
        />
        <span
          style={{
            width: 24,
            height: 24,
            borderRadius: 4,
            background: valid ? hex : 'transparent',
            border: '1px solid var(--theme-elevation-150)',
            flexShrink: 0,
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

export default ColorField
