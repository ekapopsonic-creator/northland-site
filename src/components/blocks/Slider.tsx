'use client'

import React, { useEffect, useState, useCallback } from 'react'

export function Slider({
  images,
  height,
  autoplay,
}: {
  images: { url: string; alt?: string }[]
  height: string
  autoplay: boolean
}) {
  const [i, setI] = useState(0)
  const n = images.length
  const go = useCallback((d: number) => setI((p) => (p + d + n) % n), [n])

  useEffect(() => {
    if (!autoplay || n <= 1) return
    const t = setInterval(() => setI((p) => (p + 1) % n), 4500)
    return () => clearInterval(t)
  }, [autoplay, n])

  if (!n) return null

  return (
    <div
      style={{
        position: 'relative',
        height,
        borderRadius: 16,
        overflow: 'hidden',
        marginTop: '1.5rem',
        background: '#000',
      }}
    >
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img.url}
          alt={img.alt || ''}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: idx === i ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        />
      ))}

      {n > 1 ? (
        <>
          <button
            type="button"
            aria-label="ก่อนหน้า"
            onClick={() => go(-1)}
            style={arrowStyle('left')}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="ถัดไป"
            onClick={() => go(1)}
            style={arrowStyle('right')}
          >
            ›
          </button>
          <div
            style={{
              position: 'absolute',
              bottom: 14,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`สไลด์ ${idx + 1}`}
                onClick={() => setI(idx)}
                style={{
                  width: idx === i ? 22 : 9,
                  height: 9,
                  borderRadius: 9,
                  border: 'none',
                  background: idx === i ? '#fff' : 'rgba(255,255,255,0.55)',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}

const arrowStyle = (side: 'left' | 'right'): React.CSSProperties => ({
  position: 'absolute',
  top: '50%',
  [side]: 14,
  transform: 'translateY(-50%)',
  width: 44,
  height: 44,
  borderRadius: '50%',
  border: 'none',
  background: 'rgba(255,255,255,0.85)',
  color: 'var(--north-gray)',
  fontSize: '1.5rem',
  lineHeight: 1,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})
