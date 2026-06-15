import React from 'react'

// โลโก้บนหน้า login ของระบบหลังบ้าน
export const Logo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
    <svg viewBox="0 0 100 80" width="52" height="42" fill="#00AEEF" aria-hidden="true">
      <path d="M50 10 L20 70 L35 70 L50 35 L65 70 L80 70 Z" opacity="0.95" />
      <path d="M50 10 L42 28 L58 28 Z" opacity="0.7" />
    </svg>
    <span
      style={{
        fontFamily: 'var(--font-serif, Georgia, serif)',
        fontSize: '1.9rem',
        letterSpacing: '0.18em',
        fontWeight: 500,
        color: 'var(--theme-elevation-900)',
      }}
    >
      NORTHLAND
    </span>
  </div>
)

export default Logo
