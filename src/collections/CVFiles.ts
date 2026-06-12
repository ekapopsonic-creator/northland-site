import type { CollectionConfig } from 'payload'
import { anyone, isAdmin, isAdminOrSales } from '../access'

export const CVFiles: CollectionConfig = {
  slug: 'cv-files',
  labels: {
    singular: { th: 'ไฟล์ CV', en: 'CV file' },
    plural: { th: 'ไฟล์ CV', en: 'CV files' },
  },
  admin: {
    group: { th: 'ร่วมงานกับเรา', en: 'Careers' },
    description: {
      th: 'ไฟล์ CV ของผู้สมัครงาน — เห็นเฉพาะ Admin และทีมขาย/HR',
      en: 'Applicant CVs — visible to Admin and Sales/HR only',
    },
  },
  access: {
    read: isAdminOrSales,
    create: anyone,
    update: isAdmin,
    delete: isAdmin,
  },
  upload: {
    mimeTypes: ['application/pdf'],
  },
  fields: [],
}
