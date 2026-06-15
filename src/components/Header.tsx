'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BrandMark } from './BrandMark'

const menu = [
  { href: '/', label: 'หน้าแรก' },
  { href: '/projects', label: 'โครงการ' },
  { href: '/promotions', label: 'โปรโมชั่น' },
  { href: '/about', label: 'เกี่ยวกับเรา' },
  { href: '/progress', label: 'ความคืบหน้า' },
  { href: '/after-sales', label: 'บริการหลังการขาย' },
  { href: '/blog', label: 'บทความ' },
  { href: '/career', label: 'ร่วมงานกับเรา' },
]

export function Header({ logoUrl }: { logoUrl?: string | null }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header
      className="site-header"
      style={{ boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.06)' : 'none' }}
    >
      <div className="container nav">
        <Link href="/" className="brand">
          {logoUrl ? (
            <img src={logoUrl} alt="NORTHLAND" style={{ height: 40, width: 'auto' }} />
          ) : (
            <>
              <BrandMark />
              <span className="brand-name">NORTHLAND</span>
            </>
          )}
        </Link>
        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
        <ul className={`nav-menu${open ? ' open' : ''}`}>
          {menu.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={isActive(item.href) ? 'active' : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="nav-cta">
          <Link href="/contact" className="btn btn-primary">
            ติดต่อเรา
          </Link>
        </div>
      </div>
    </header>
  )
}
