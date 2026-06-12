import type { CollectionConfig } from 'payload'
import { anyone, isAdmin, isAdminOrEditor } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: { th: 'รูปภาพ', en: 'Media' },
    plural: { th: 'รูปภาพ', en: 'Media' },
  },
  admin: {
    group: { th: 'ตั้งค่าระบบ', en: 'System' },
    description: {
      th: 'คลังรูปภาพทั้งหมด — ระบบย่อขนาดรูปให้อัตโนมัติ 3 ขนาด',
      en: 'Image library — 3 sizes generated automatically',
    },
  },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  upload: {
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'thumbnail', width: 480 },
      { name: 'card', width: 1024 },
      { name: 'hero', width: 1920 },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: { th: 'คำอธิบายรูป (สำหรับ SEO)', en: 'Alt text' },
    },
  ],
}
