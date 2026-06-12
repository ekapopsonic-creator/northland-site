import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminField } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: { th: 'ผู้ใช้งาน', en: 'User' },
    plural: { th: 'ผู้ใช้งาน', en: 'Users' },
  },
  admin: {
    useAsTitle: 'name',
    group: { th: 'ตั้งค่าระบบ', en: 'System' },
    defaultColumns: ['name', 'email', 'role'],
    description: {
      th: 'จัดการบัญชีทีมงาน — เฉพาะ Admin เท่านั้นที่เพิ่ม/ลบผู้ใช้ได้',
      en: 'Team accounts — only Admin can add/remove users',
    },
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: isAdmin,
    update: ({ req, id }) => req.user?.role === 'admin' || req.user?.id === id,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: { th: 'ชื่อ', en: 'Name' },
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      label: { th: 'ระดับสิทธิ์', en: 'Role' },
      access: {
        create: isAdminField,
        update: isAdminField,
      },
      options: [
        { label: { th: 'ผู้ดูแลระบบ — จัดการได้ทุกอย่าง', en: 'Admin' }, value: 'admin' },
        { label: { th: 'ทีมคอนเทนต์ — แก้ไขเนื้อหาเว็บ', en: 'Editor' }, value: 'editor' },
        { label: { th: 'ทีมขาย — ดู Lead และใบสมัครงาน', en: 'Sales' }, value: 'sales' },
      ],
    },
  ],
}
