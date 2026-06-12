/**
 * สร้างผู้ใช้ Admin คนแรก (ข้ามถ้ามี user อยู่แล้ว)
 * รัน: node --env-file=.env node_modules/tsx/dist/cli.mjs src/create-admin.ts
 * กำหนดผ่าน env: ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME
 */
import { getPayload } from 'payload'
import config from '@payload-config'

const run = async () => {
  const payload = await getPayload({ config })
  const existing = await payload.find({ collection: 'users', limit: 1 })
  if (existing.totalDocs > 0) {
    payload.logger.info('[create-admin] มีผู้ใช้อยู่แล้ว — ข้าม')
    process.exit(0)
  }
  const email = process.env.ADMIN_EMAIL || 'admin@northland.co.th'
  const password = process.env.ADMIN_PASSWORD || 'Northland#2026'
  await payload.create({
    collection: 'users',
    data: {
      email,
      password,
      name: process.env.ADMIN_NAME || 'ผู้ดูแลระบบ 99Plus',
      role: 'admin',
    },
  })
  payload.logger.info(`[create-admin] สร้าง admin: ${email} ✓`)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
