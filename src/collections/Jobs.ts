import type { CollectionConfig } from 'payload'
import { anyone, isAdmin, isAdminOrEditor } from '../access'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  labels: {
    singular: { th: 'ตำแหน่งงาน', en: 'Job' },
    plural: { th: 'ตำแหน่งงาน', en: 'Jobs' },
  },
  admin: {
    useAsTitle: 'title',
    group: { th: 'ร่วมงานกับเรา', en: 'Careers' },
    defaultColumns: ['title', 'department', 'location', 'active'],
    description: {
      th: 'ประกาศรับสมัครงาน — ปิดรับแล้วให้เอาเครื่องหมาย "เปิดรับสมัคร" ออก ไม่ต้องลบ',
      en: 'Job postings — untick "active" to close instead of deleting',
    },
  },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: { th: 'ชื่อตำแหน่ง', en: 'Job title' },
    },
    {
      name: 'department',
      type: 'text',
      label: { th: 'ฝ่าย/แผนก', en: 'Department' },
    },
    {
      name: 'location',
      type: 'text',
      label: { th: 'สถานที่ปฏิบัติงาน', en: 'Location' },
      admin: { description: 'เช่น สำนักงานใหญ่ สระบุรี' },
    },
    {
      name: 'employmentType',
      type: 'select',
      defaultValue: 'full-time',
      label: { th: 'ประเภทการจ้าง', en: 'Employment type' },
      options: [
        { label: { th: 'พนักงานประจำ', en: 'Full-time' }, value: 'full-time' },
        { label: { th: 'พาร์ทไทม์', en: 'Part-time' }, value: 'part-time' },
        { label: { th: 'สัญญาจ้าง', en: 'Contract' }, value: 'contract' },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      label: { th: 'รายละเอียดงาน + คุณสมบัติ', en: 'Job description' },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      label: { th: 'เปิดรับสมัคร', en: 'Active' },
      admin: { position: 'sidebar' },
    },
  ],
}
