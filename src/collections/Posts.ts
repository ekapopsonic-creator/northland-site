import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor, publishedOrLoggedIn } from '../access'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: { th: 'บทความ', en: 'Post' },
    plural: { th: 'บทความ / ข่าวสาร', en: 'Posts' },
  },
  admin: {
    useAsTitle: 'title',
    group: { th: 'โครงการและคอนเทนต์', en: 'Content' },
    defaultColumns: ['title', 'category', 'publishedAt', '_status'],
    description: {
      th: 'บทความและข่าวสาร — บันทึกฉบับร่างไว้ก่อนได้ กดเผยแพร่เมื่อพร้อม',
      en: 'Articles and news — draft until ready to publish',
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
      label: { th: 'หัวข้อบทความ', en: 'Title' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: { th: 'Slug (ใช้ใน URL)', en: 'Slug' },
      admin: {
        position: 'sidebar',
        description: 'ภาษาอังกฤษตัวเล็ก คั่นด้วยขีด เช่น how-to-choose-home-loan',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: { th: 'รูปปกบทความ', en: 'Cover image' },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'news',
      label: { th: 'หมวดหมู่', en: 'Category' },
      options: [
        { label: { th: 'ข่าวสารบริษัท', en: 'News' }, value: 'news' },
        { label: { th: 'สาระน่ารู้', en: 'Knowledge' }, value: 'knowledge' },
        { label: { th: 'ไลฟ์สไตล์', en: 'Lifestyle' }, value: 'lifestyle' },
      ],
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      label: { th: 'คำโปรย (แสดงในหน้ารวมบทความ)', en: 'Excerpt' },
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
      label: { th: 'เนื้อหาบทความ', en: 'Content' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: { th: 'วันที่เผยแพร่', en: 'Published date' },
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime', displayFormat: 'd MMM yyyy HH:mm' },
        description: 'ตั้งวันที่ในอนาคตได้ — บทความจะขึ้นเว็บเมื่อถึงเวลานั้น',
      },
      defaultValue: () => new Date().toISOString(),
    },
    {
      name: 'seo',
      type: 'group',
      label: { th: 'SEO', en: 'SEO' },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          localized: true,
          label: { th: 'Meta title (เว้นว่าง = ใช้หัวข้อบทความ)', en: 'Meta title' },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          localized: true,
          label: { th: 'Meta description', en: 'Meta description' },
        },
      ],
    },
  ],
}
