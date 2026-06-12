import type { CollectionConfig } from 'payload'
import { anyone, isAdmin, isAdminOrSales } from '../access'

export const JobApplications: CollectionConfig = {
  slug: 'job-applications',
  labels: {
    singular: { th: 'ใบสมัครงาน', en: 'Job application' },
    plural: { th: 'ใบสมัครงาน', en: 'Job applications' },
  },
  admin: {
    useAsTitle: 'name',
    group: { th: 'ร่วมงานกับเรา', en: 'Careers' },
    defaultColumns: ['name', 'phone', 'job', 'createdAt'],
    description: {
      th: 'ใบสมัครจากหน้าเว็บ — รายการใหม่สุดอยู่บนสุด',
      en: 'Applications from the website — newest first',
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
      name: 'job',
      type: 'relationship',
      relationTo: 'jobs',
      label: { th: 'ตำแหน่งที่สมัคร', en: 'Position' },
    },
    {
      name: 'coverNote',
      type: 'textarea',
      label: { th: 'แนะนำตัวสั้นๆ', en: 'Cover note' },
    },
    {
      name: 'cv',
      type: 'upload',
      relationTo: 'cv-files',
      label: { th: 'ไฟล์ CV (PDF)', en: 'CV file' },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create') return
        const { payload } = req
        const hrEmail = process.env.HR_NOTIFY_EMAIL
        if (!hrEmail) return
        try {
          await payload.sendEmail({
            to: hrEmail.split(',').map((e: string) => e.trim()),
            subject: `📄 ใบสมัครงานใหม่: ${doc.name}`,
            html: `
              <div style="font-family: sans-serif; line-height: 1.8;">
                <h2 style="color: #00AEEF;">มีผู้สมัครงานใหม่จากเว็บไซต์ Northland</h2>
                <table cellpadding="6" style="border-collapse: collapse;">
                  <tr><td><strong>ชื่อ</strong></td><td>${doc.name}</td></tr>
                  <tr><td><strong>เบอร์โทร</strong></td><td><a href="tel:${doc.phone}">${doc.phone}</a></td></tr>
                  <tr><td><strong>อีเมล</strong></td><td>${doc.email || '-'}</td></tr>
                  <tr><td><strong>แนะนำตัว</strong></td><td>${doc.coverNote || '-'}</td></tr>
                </table>
                <p style="margin-top: 16px;">
                  <a href="${process.env.NEXT_PUBLIC_SERVER_URL || ''}/admin/collections/job-applications/${doc.id}"
                     style="background: #00AEEF; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 6px;">
                    เปิดดูใบสมัคร + ดาวน์โหลด CV
                  </a>
                </p>
              </div>
            `,
          })
        } catch (err) {
          payload.logger.error(`ส่งอีเมลแจ้งเตือนใบสมัครงานไม่สำเร็จ: ${String(err)}`)
        }
      },
    ],
  },
}
