import type { CollectionConfig } from 'payload'
import { anyone, isAdmin, isAdminOrEditor } from '../access'

export const ProgressUpdates: CollectionConfig = {
  slug: 'progress-updates',
  labels: {
    singular: { th: 'ความคืบหน้าการก่อสร้าง', en: 'Progress update' },
    plural: { th: 'ความคืบหน้าการก่อสร้าง', en: 'Progress updates' },
  },
  admin: {
    useAsTitle: 'title',
    group: { th: 'โครงการและคอนเทนต์', en: 'Content' },
    defaultColumns: ['title', 'project', 'percent', 'updateDate'],
    description: {
      th: 'อัปเดตความคืบหน้ารายงวดของแต่ละโครงการ — % งานรวม + รูปหน้างาน',
      en: 'Per-project construction progress: % complete + site photos',
    },
  },
  defaultSort: '-updateDate',
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'project',
      type: 'relationship',
      relationTo: 'projects',
      required: true,
      label: { th: 'โครงการ', en: 'Project' },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: { th: 'ชื่องวด', en: 'Period title' },
      admin: { description: 'เช่น งวดที่ 5 — พฤษภาคม 2569' },
    },
    {
      name: 'updateDate',
      type: 'date',
      required: true,
      label: { th: 'วันที่อัปเดต', en: 'Update date' },
      admin: { position: 'sidebar', date: { displayFormat: 'd MMM yyyy' } },
      defaultValue: () => new Date().toISOString(),
    },
    {
      name: 'percent',
      type: 'number',
      required: true,
      min: 0,
      max: 100,
      label: { th: 'ความคืบหน้างานรวม (%)', en: 'Overall progress (%)' },
    },
    {
      name: 'description',
      type: 'textarea',
      label: { th: 'รายละเอียดงานในงวดนี้', en: 'Work description' },
      admin: { description: 'เช่น งานโครงสร้างแล้วเสร็จ เริ่มงานสถาปัตยกรรมภายใน' },
    },
    {
      name: 'photos',
      type: 'array',
      label: { th: 'อัลบั้มรูปหน้างาน', en: 'Site photos' },
      labels: {
        singular: { th: 'รูป', en: 'Photo' },
        plural: { th: 'รูป', en: 'Photos' },
      },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true, label: { th: 'รูป', en: 'Photo' } },
        { name: 'caption', type: 'text', label: { th: 'คำบรรยาย', en: 'Caption' } },
      ],
    },
  ],
}
