# Northland Development — Website + Back-office (Phase 2)

> 30 ปีแห่งความใส่ใจ — เว็บไซต์ + ระบบหลังบ้านของ Northland Development

**Built by:** 99Plus Marketing Consulting
**Stack:** Next.js 15 · Payload CMS 3 · Supabase (PostgreSQL) · Cloudflare R2 · Resend

## เริ่มต้น

ดูคู่มือติดตั้งฉบับเต็มที่ [SETUP.md](./SETUP.md)

```bash
npm install
npm run dev
# http://localhost:3000        — หน้าเว็บ
# http://localhost:3000/admin  — ระบบหลังบ้าน
```

## ระบบหลังบ้าน (5 โมดูล)

| โมดูล | Collections | ใครใช้ |
|---|---|---|
| Lead Management | `leads` | ทีมขาย |
| โครงการ (23 โครงการ) | `projects` | ทีมคอนเทนต์ |
| คอนเทนต์ | `promotions` `posts` `progress-updates` | ทีมคอนเทนต์ |
| ร่วมงานกับเรา | `jobs` `job-applications` `cv-files` | HR / ทีมขาย |
| ระบบ | `users` (3 roles) `media` | Admin |

## Roadmap

- [x] Sprint 1 — Foundation: Payload + collections + roles + Thai admin
- [ ] Sprint 2 — Lead form API + email flow (เปิดใช้จริง)
- [ ] Sprint 3 — ย้ายหน้าเว็บ 10 หน้าจาก HTML → Next.js ดึงข้อมูลจริง
- [ ] Sprint 4 — โปรโมชั่น + บทความ + ความคืบหน้า (frontend)
- [ ] Sprint 5 — Career + คู่มือทีม Northland + ชี้โดเมน northland.co.th

## Phase 1 (เดิม)

เว็บ static HTML 10 หน้า อยู่ที่ repo [northland-site](https://github.com/ekapopsonic-creator/northland-site) — deploy บน Netlify
