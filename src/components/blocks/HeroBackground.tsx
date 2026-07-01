'use client'

import React, { useEffect, useState } from 'react'

// พื้นหลัง Hero แบบสไลด์หลายรูป — ข้อความอยู่ด้านบน (ไม่เลื่อนตาม)
export function HeroBackground({
  images,
  autoplay,
  interval,
  transition,
}: {
  images: string[]
  autoplay: boolean
  interval: number
  transition: 'fade' | 'slide'
}) {
  const [i, setI] = useState(0)
  const n = images.length

  useEffect(() => {
    if (!autoplay || n <= 1) return
    const t = setInterval(() => setI((p) => (p + 1) % n), Math.max(1, interval) * 1000)
    return () => clearInterval(t)
  }, [autoplay, interval, n])

  if (!n) return null

  // ภาพเดียว = นิ่ง ไม่มี transition
  if (n === 1) {
    return (
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          backgroundImage: `url(${images[0]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    )
  }

  if (transition === 'slide') {
    return (
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <div style={{ display: 'flex', height: '100%', width: `${n * 100}%`, transform: `translateX(-${i * (100 / n)}%)`, transition: 'transform 0.8s ease' }}>
          {images.map((src, idx) => (
            <div key={idx} style={{ width: `${100 / n}%`, height: '100%', backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          ))}
        </div>
      </div>
    )
  }

  // fade (ค่าเริ่มต้น)
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      {images.map((src, idx) => (
        <div
          key={idx}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: idx === i ? 1 : 0,
            transition: 'opacity 1s ease',
          }}
        />
      ))}
    </div>
  )
}
