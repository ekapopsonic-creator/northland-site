# Northland App — คู่มือติดตั้งและเปิดใช้งาน (Sprint 1)

ระบบหลังบ้าน + เว็บไซต์ Northland Development (Phase 2)
Stack: **Next.js 15 + Payload CMS 3 + Supabase (PostgreSQL) + Cloudflare R2 + Resend**

---

## 1. สิ่งที่ต้องสมัครก่อน (ครั้งเดียว)

| บริการ | ใช้ทำอะไร | แพ็กเกจ | ค่าใช้จ่าย |
|---|---|---|---|
| [Supabase](https://supabase.com) | ฐานข้อมูล PostgreSQL | Pro ($25/เดือน) หรือ Free เริ่มก่อน | ~900 บ./เดือน (Pro) |
| [Cloudflare R2](https://dash.cloudflare.com) | เก็บรูปโครงการ + ไฟล์ CV | Pay-as-you-go | ~0–100 บ./เดือน |
| [Resend](https://resend.com) | ส่งอีเมลแจ้งเตือน lead + auto-reply | Free (3,000 ฉบับ/เดือน) | 0 บ. |
| [Vercel](https://vercel.com) | Hosting เว็บ + หลังบ้าน | Hobby (ฟรี) หรือ Pro | 0–700 บ./เดือน |

## 2. ตั้งค่า Supabase

1. สร้าง Project ใหม่ → เลือก region **Southeast Asia (Singapore)**
2. ไปที่ **Project Settings → Database → Connection string**
3. เลือกแบบ **Transaction pooler** (port 6543) — สำคัญสำหรับ Vercel
4. คัดลอกมาใส่ `.env` ที่ตัวแปร `DATABASE_URI` (แทน `[YOUR-PASSWORD]` ด้วยรหัสจริง)

> ตารางทั้งหมดจะถูกสร้างอัตโนมัติตอนรัน dev ครั้งแรก (Payload จัดการ schema เอง)

## 3. ตั้งค่า Cloudflare R2

1. Cloudflare Dashboard → **R2 Object Storage** → Create bucket ชื่อ `northland-media`
2. สร้าง **API Token** (Object Read & Write) → ได้ Access Key ID + Secret
3. เปิด **Public access** (R2.dev subdomain) หรือผูก custom domain เช่น `cdn.northland.co.th`
4. ใส่ค่าใน `.env`: `S3_BUCKET`, `S3_ENDPOINT`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_PUBLIC_URL`

> ปล่อยว่างได้ตอน dev — ไฟล์จะเก็บลงโฟลเดอร์ในเครื่องแทน

## 4. ตั้งค่า Resend (อีเมล)

1. สมัคร Resend → **Domains** → Add `northland.co.th` → ใส่ DNS records ตามที่ระบบบอก (ขอจากคนถือโดเมน)
2. สร้าง **API Key** → ใส่ `.env` ที่ `RESEND_API_KEY`
3. ใส่อีเมลผู้รับ:
   - `SALES_NOTIFY_EMAIL` = อีเมลทีมขาย (หลายคนคั่นด้วย `,`)
   - `HR_NOTIFY_EMAIL` = อีเมล HR

> ยังไม่ใส่ API key ก็รันได้ — แค่จะไม่มีการส่งอีเมล (lead ยังเก็บลงฐานข้อมูลปกติ)

## 5. รันบนเครื่อง

```bash
npm install
npm run dev
# → http://localhost:3000        (หน้าเว็บ)
# → http://localhost:3000/admin  (หลังบ้าน)
```

เข้า `/admin` ครั้งแรก ระบบจะให้**สร้างบัญชี Admin คนแรก** — ตั้ง role เป็น `ผู้ดูแลระบบ`

## 6. ระดับสิทธิ์ผู้ใช้ (3 ระดับ)

| Role | เห็น/ทำอะไรได้ |
|---|---|
| **ผู้ดูแลระบบ (Admin)** | ทุกอย่าง + เพิ่ม/ลบผู้ใช้ + ลบข้อมูล |
| **ทีมคอนเทนต์ (Editor)** | โครงการ, โปรโมชั่น, บทความ, ความคืบหน้า, ตำแหน่งงาน, รูปภาพ — *ไม่เห็น lead* |
| **ทีมขาย (Sales)** | Lead + ใบสมัครงาน + ไฟล์ CV — *แก้คอนเทนต์ไม่ได้* |

## 7. Deploy ขึ้น Vercel

1. Push โค้ดขึ้น GitHub (repo ใหม่ หรือ branch `phase-2` ของ northland-site)
2. Vercel → **Import Project** → เลือก repo
3. ใส่ Environment Variables ทั้งหมดจาก `.env.example` (ใช้ค่า production จริง)
4. Deploy → ได้ URL `xxx.vercel.app` → ทดสอบ → ค่อยชี้โดเมน `northland.co.th`

## 8. API สำหรับฟอร์มหน้าเว็บ (ใช้ใน Sprint 2–3)

ฟอร์มติดต่อส่ง POST ไปที่ Payload REST API ได้เลย:

```
POST /api/leads
Content-Type: application/json

{
  "name": "สมชาย ใจดี",
  "phone": "0812345678",
  "email": "somchai@example.com",
  "interestText": "Attaluck สุขุมวิท",
  "budget": "20m-up",
  "message": "สนใจเข้าชมวันเสาร์",
  "consentPDPA": true
}
```

ระบบจะเก็บลงฐานข้อมูล → ส่งอีเมลแจ้งทีมขาย → ส่ง auto-reply ให้ลูกค้าอัตโนมัติ

ใบสมัครงาน: `POST /api/job-applications` (อัปโหลด CV ผ่าน `POST /api/cv-files` ก่อน แล้วส่ง id มาในฟิลด์ `cv`)

---

## โครงสร้างระบบ (10 collections)

- `leads` — ผู้สนใจจากฟอร์ม (การขาย)
- `projects` — 23 โครงการ (มี draft mode)
- `promotions` — โปรโมชั่น หมดเขตซ่อนอัตโนมัติ
- `posts` — บทความ/ข่าวสาร + SEO
- `progress-updates` — ความคืบหน้ารายงวด
- `jobs` / `job-applications` / `cv-files` — ระบบสมัครงาน
- `media` — คลังรูป (ย่อ 3 ขนาดอัตโนมัติ)
- `users` — ทีมงาน 3 ระดับสิทธิ์
