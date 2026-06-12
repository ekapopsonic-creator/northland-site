import React from 'react'

export function BrandMark({ white = false }: { white?: boolean }) {
  return (
    <svg
      className="brand-mark"
      viewBox="0 0 100 80"
      fill="currentColor"
      style={white ? { color: 'white' } : undefined}
    >
      <path d="M50 10 L20 70 L35 70 L50 35 L65 70 L80 70 Z" opacity="0.95" />
      <path d="M50 10 L42 28 L58 28 Z" opacity="0.7" />
    </svg>
  )
}
