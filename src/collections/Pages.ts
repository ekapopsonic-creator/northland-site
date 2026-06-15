import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor, publishedOrLoggedIn } from '../access'
import { allBlocks } from '../blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: { th: 'หน้าเว็บ', en: 'Page' },
    plural: { th: 'หน้าเว็บ (จัด Layout เอง)', en: 'Pages' },
  },
  admin: {
    useAsTitle: 'title',
    group: { th: 'โครงการและคอนเทนต์', en: 'Content' },
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    description: {
      th: 'สร้าง/จัด layout หน้าเว็บด้วยบล็อก — ลาก-วาง เพิ่ม-ลบ section เองได้ · หน้าแรกใช้ slug = home',
      en: 'Build pages with blocks. Homepage uses slug = home',
    },
  },
  versions: { drafts: true },
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
      label: { th: 'ชื่อหน้า (ภายใน)', en: 'Page title' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: { th: 'Slug (URL)', en: 'Slug' },
      admin: {
        position: 'sidebar',
        description: 'home = หน้าแรก · อื่นๆ เช่น about → northland.co.th/about',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      label: { th: 'เนื้อหาหน้า (Section)', en: 'Page sections' },
      labels: { singular: { th: 'Section', en: 'Section' }, plural: { th: 'Section', en: 'Sections' } },
      blocks: allBlocks,
    },
    {
      name: 'seo',
      type: 'group',
      label: { th: 'SEO', en: 'SEO' },
      admin: { position: 'sidebar' },
      fields: [
        { name: 'metaTitle', type: 'text', localized: true, label: { th: 'Meta title', en: 'Meta title' } },
        { name: 'metaDescription', type: 'textarea', localized: true, label: { th: 'Meta description', en: 'Meta description' } },
      ],
    },
  ],
}
