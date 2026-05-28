# Northland Development — Website

> 30 ปีแห่งความใส่ใจ — เว็บไซต์โครงการอสังหาริมทรัพย์ของ Northland Development

[![Deploy Status](https://api.netlify.com/api/v1/badges/placeholder/deploy-status)](https://app.netlify.com)

## 🌐 Live

- **Preview:** [beamish-buttercream-1fae29.netlify.app](https://beamish-buttercream-1fae29.netlify.app)
- **Production:** _TBD_

## 🎯 Overview

Corporate hub สำหรับ Northland Development รวบรวม 23 โครงการในสระบุรีและกรุงเทพมหานคร — บ้านเดี่ยว ทาวน์โฮม คอนโดมิเนียม และอาคารพาณิชย์

**Built by:** 99Plus Marketing Consulting
**Client:** Northland Development Co., Ltd.
**Phase:** 1 (HTML prototype) → Phase 2 (Next.js + Cloudflare Pages)

## 📂 Structure

```
northland-site/
├── index.html              หน้าแรก
├── projects.html           โครงการทั้งหมด + filter
├── project-detail.html     รายละเอียดโครงการ (template)
├── promotions.html         โปรโมชั่น
├── about.html              เกี่ยวกับเรา + timeline
├── progress.html           ความคืบหน้าการก่อสร้าง
├── after-sales.html        บริการหลังการขาย + คำนวณสินเชื่อ
├── blog.html               บทความ
├── career.html             ร่วมงานกับเรา
├── contact.html            ติดต่อเรา + Lead form
├── css/
│   └── style.css           Design system + Brand tokens
└── js/
    └── main.js             Nav, filter, form validation
```

## 🎨 Brand

อ้างอิงจาก **NORTHLAND Brand Guidelines**

| Token | Value | Use |
|---|---|---|
| North Sea | `#00AEEF` | Primary |
| Sky Blue | `#55C9F0` | Accent light |
| Deep Blue | `#03A1D1` | Accent dark |
| North Gray | `#58595B` | Text |
| Font (Body) | Prompt | TH + Latin |
| Font (Display) | Cormorant Garamond | EN headings |

## 🚀 Run Locally

```bash
# Option 1: Open directly (forms work, filter works)
start index.html

# Option 2: Local HTTP server (recommended)
npx http-server -p 8080
# → http://localhost:8080
```

## 📤 Deploy

Auto-deploy via Netlify when pushed to `main`. See [netlify.toml](./netlify.toml) (TBD).

Manual deploy:
```bash
# Use Node.js + adm-zip to create zip with proper forward slashes
node ../zip-it.js
# Then drag to https://app.netlify.com/drop
```

## 📋 Roadmap

- [x] Phase 1 — 10 HTML pages with shared design system
- [x] Deploy to Netlify Drop
- [ ] Replace placeholder images with real project photos
- [ ] TH/EN i18n
- [ ] Phase 2 — Migrate to Next.js 16 + Cloudflare Pages
- [ ] Lead form → Email + LINE OA Notify integration
- [ ] Custom domain `northland.co.th`

## 🤝 Contact

99Plus Marketing Consulting — info@99plusagency.com
