import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor, publishedOrLoggedIn } from '../access'

export const Promotions: CollectionConfig = {
  slug: 'promotions',
  labels: {
    singular: { th: 'โปรโมชั่น', en: 'Promotion' },
    plural: { th: 'โปรโมชั่น', en: 'Promotions' },
  },
  admin: {
    useAsTitle: 'title',
    group: { th: 'โครงการและคอนเทนต์', en: 'Content' },
    defaultColumns: ['title', 'project', 'startDate', 'endDate', '_status'],
    description: {
      th: 'โปรโมชั่นที่เลย "วันสิ้นสุด" แล้วจะถูกซ่อนจากหน้าเว็บอัตโนมัติ ไม่ต้องเข้ามาลบ',
      en: 'Promotions auto-hide from the website after the end date',
    },
  },
  versions: {
    drafts: true,
  },
  access: {
    read: publishedOrLoggedIn,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: { th: 'ชื่อโปรโมชั่น', en: 'Title' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: { th: 'รูปโปรโมชั่น', en: 'Image' },
    },
    {
      name: 'project',
      type: 'relationship',
      relationTo: 'projects',
      label: { th: 'โครงการที่เกี่ยวข้อง', en: 'Related project' },
      admin: { description: 'เว้นว่างได้ถ้าเป็นโปรรวมทุกโครงการ' },
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
      label: { th: 'รายละเอียดโปรโมชั่น', en: 'Description' },
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      label: { th: 'วันเริ่มโปรโมชั่น', en: 'Start date' },
      admin: { position: 'sidebar', date: { displayFormat: 'd MMM yyyy' } },
    },
    {
      name: 'endDate',
      type: 'date',
      label: { th: 'วันสิ้นสุดโปรโมชั่น', en: 'End date' },
      admin: {
        position: 'sidebar',
        date: { displayFormat: 'd MMM yyyy' },
        description: 'เว้นว่าง = ไม่มีวันหมดเขต',
      },
    },
  ],
}
