import type { CollectionConfig } from 'payload'
import { anyone, isAdmin, isAdminOrSales } from '../access'

const budgetLabels: Record<string, string> = {
  'under-3m': 'ต่ำกว่า 3 ล้านบาท',
  '3-7m': '3 – 7 ล้านบาท',
  '7-20m': '7 – 20 ล้านบาท',
  '20m-up': '20 ล้านบาทขึ้นไป',
}

export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: {
    singular: { th: 'ผู้สนใจ (Lead)', en: 'Lead' },
    plural: { th: 'ผู้สนใจ (Leads)', en: 'Leads' },
  },
  admin: {
    useAsTitle: 'name',
    group: { th: 'การขาย', en: 'Sales' },
    defaultColumns: ['name', 'phone', 'interestText', 'budget', 'createdAt'],
    description: {
      th: 'รายชื่อผู้สนใจจากฟอร์มติดต่อบนเว็บไซต์ — รายการใหม่สุดอยู่บนสุด',
      en: 'Leads from the website contact form — newest first',
    },
  },
  defaultSort: '-createdAt',
  access: {
    create: anyone,
    read: isAdminOrSales,
    update: isAdminOrSales,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: { th: 'ชื่อ-นามสกุล', en: 'Name' },
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: { th: 'เบอร์โทรศัพท์', en: 'Phone' },
    },
    {
      name: 'email',
      type: 'email',
      label: { th: 'อีเมล', en: 'Email' },
    },
    {
      name: 'interestProject',
      type: 'relationship',
      relationTo: 'projects',
      label: { th: 'โครงการที่สนใจ', en: 'Interested project' },
    },
    {
      name: 'interestText',
      type: 'text',
      label: { th: 'โครงการที่สนใจ (ข้อความจากฟอร์ม)', en: 'Interested project (text)' },
    },
    {
      name: 'budget',
      type: 'select',
      label: { th: 'งบประมาณ', en: 'Budget' },
      options: [
        { label: { th: 'ต่ำกว่า 3 ล้านบาท', en: 'Under 3M THB' }, value: 'under-3m' },
        { label: { th: '3 – 7 ล้านบาท', en: '3–7M THB' }, value: '3-7m' },
        { label: { th: '7 – 20 ล้านบาท', en: '7–20M THB' }, value: '7-20m' },
        { label: { th: '20 ล้านบาทขึ้นไป', en: '20M+ THB' }, value: '20m-up' },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      label: { th: 'ข้อความเพิ่มเติม', en: 'Message' },
    },
    {
      name: 'consentPDPA',
      type: 'checkbox',
      required: true,
      defaultValue: false,
      label: { th: 'ยินยอมให้ติดต่อกลับ (PDPA)', en: 'PDPA consent' },
    },
    {
      name: 'source',
      type: 'text',
      defaultValue: 'website',
      label: { th: 'ที่มา', en: 'Source' },
      admin: { position: 'sidebar', readOnly: true },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create') return
        const { payload } = req
        const budgetText = doc.budget ? budgetLabels[doc.budget] || doc.budget : 'ไม่ระบุ'
        const interest = doc.interestText || 'ทุกโครงการ / ยังไม่ระบุ'

        try {
          const salesEmail = process.env.SALES_NOTIFY_EMAIL
          if (salesEmail) {
            await payload.sendEmail({
              to: salesEmail.split(',').map((e: string) => e.trim()),
              subject: `🔔 Lead ใหม่จากเว็บไซต์: ${doc.name} (${interest})`,
              html: `
                <div style="font-family: sans-serif; line-height: 1.8;">
                  <h2 style="color: #00AEEF;">มีผู้สนใจใหม่จากเว็บไซต์ Northland</h2>
                  <table cellpadding="6" style="border-collapse: collapse;">
                    <tr><td><strong>ชื่อ</strong></td><td>${doc.name}</td></tr>
                    <tr><td><strong>เบอร์โทร</strong></td><td><a href="tel:${doc.phone}">${doc.phone}</a></td></tr>
                    <tr><td><strong>อีเมล</strong></td><td>${doc.email || '-'}</td></tr>
                    <tr><td><strong>โครงการที่สนใจ</strong></td><td>${interest}</td></tr>
                    <tr><td><strong>งบประมาณ</strong></td><td>${budgetText}</td></tr>
                    <tr><td><strong>ข้อความ</strong></td><td>${doc.message || '-'}</td></tr>
                  </table>
                  <p style="margin-top: 16px;">
                    <a href="${process.env.NEXT_PUBLIC_SERVER_URL || ''}/admin/collections/leads/${doc.id}"
                       style="background: #00AEEF; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 6px;">
                      เปิดดูในระบบหลังบ้าน
                    </a>
                  </p>
                </div>
              `,
            })
          }

          if (doc.email) {
            await payload.sendEmail({
              to: doc.email,
              subject: 'Northland Development — เราได้รับข้อมูลของคุณแล้ว',
              html: `
                <div style="font-family: sans-serif; line-height: 1.8;">
                  <h2 style="color: #00AEEF;">ขอบคุณที่สนใจโครงการของ Northland Development</h2>
                  <p>เรียนคุณ${doc.name}</p>
                  <p>เราได้รับข้อมูลของคุณเรียบร้อยแล้ว ที่ปรึกษาการขายของเราจะติดต่อกลับโดยเร็วที่สุด
                  ภายในวันทำการถัดไป</p>
                  <p><strong>ข้อมูลที่คุณแจ้งไว้</strong><br/>
                  โครงการที่สนใจ: ${interest}<br/>
                  งบประมาณ: ${budgetText}</p>
                  <p>หากต้องการติดต่อด่วน โทร 088-888-8888 หรือ LINE: @northland</p>
                  <p style="color: #58595B;">— Northland Development · 30 ปีแห่งความใส่ใจ</p>
                </div>
              `,
            })
          }
        } catch (err) {
          payload.logger.error(`ส่งอีเมลแจ้งเตือน lead ไม่สำเร็จ: ${String(err)}`)
        }
      },
    ],
  },
}
