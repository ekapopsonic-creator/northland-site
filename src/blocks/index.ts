import type { Block } from 'payload'
import { appearanceFields, textStyleFields, textField } from './shared'

const COLOR_FIELD_PATH = '/components/admin/ColorField#ColorField'

// ชุดสไตล์ข้อความที่ใช้บ่อย
const styleEyebrowHeadingSub = textStyleFields([
  { key: 'eyebrow', label: 'Eyebrow' },
  { key: 'heading', label: 'หัวข้อ' },
  { key: 'subtitle', label: 'คำอธิบาย' },
])
const styleEyebrowHeading = textStyleFields([
  { key: 'eyebrow', label: 'Eyebrow' },
  { key: 'heading', label: 'หัวข้อ' },
])
const styleHeadingOnly = textStyleFields([{ key: 'heading', label: 'หัวข้อ' }])

const columnOptions = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
]

// อัปโหลดหลายรูปพร้อมกัน (เลือกหลายไฟล์ทีเดียว)
const bulkImagesField: any = {
  name: 'imageList',
  type: 'upload',
  relationTo: 'media',
  hasMany: true,
  label: { th: 'รูปภาพ (เลือกหลายรูปพร้อมกันได้)', en: 'Images (bulk)' },
  admin: { description: 'กดเลือกได้หลายรูปในครั้งเดียว' },
}

const heading = (thLabel: string): any => ({
  name: 'heading',
  type: 'text',
  localized: true,
  label: { th: thLabel, en: 'Heading' },
})

const eyebrow: any = {
  name: 'eyebrow',
  type: 'text',
  localized: true,
  label: { th: 'ป้ายเล็กด้านบน (eyebrow)', en: 'Eyebrow' },
}

const subtitle: any = {
  name: 'subtitle',
  type: 'textarea',
  localized: true,
  label: { th: 'คำอธิบายใต้หัวข้อ', en: 'Subtitle' },
}

const buttonsField: any = {
  name: 'buttons',
  type: 'array',
  maxRows: 2,
  label: { th: 'ปุ่ม', en: 'Buttons' },
  labels: { singular: { th: 'ปุ่ม', en: 'Button' }, plural: { th: 'ปุ่ม', en: 'Buttons' } },
  fields: [
    { name: 'label', type: 'text', required: true, localized: true, label: { th: 'ข้อความปุ่ม', en: 'Label' } },
    { name: 'url', type: 'text', required: true, label: { th: 'ลิงก์', en: 'URL' }, admin: { description: 'เช่น /projects หรือ /contact' } },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'primary',
      label: { th: 'สไตล์ปุ่ม', en: 'Style' },
      options: [
        { label: { th: 'ทึบ (หลัก)', en: 'Primary' }, value: 'primary' },
        { label: { th: 'ขาว', en: 'Light' }, value: 'light' },
        { label: { th: 'โปร่ง', en: 'Ghost' }, value: 'ghost' },
        { label: { th: 'ขอบขาว', en: 'Outline white' }, value: 'outline-white' },
      ],
    },
  ],
}

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: { th: 'Hero (แบนเนอร์ใหญ่)', en: 'Hero' }, plural: { th: 'Hero', en: 'Heroes' } },
  fields: [
    eyebrow,
    { name: 'title', type: 'text', required: true, localized: true, label: { th: 'หัวข้อใหญ่', en: 'Title' } },
    { name: 'tagline', type: 'text', localized: true, label: { th: 'ข้อความรอง', en: 'Tagline' } },
    { name: 'lead', type: 'textarea', localized: true, label: { th: 'ย่อหน้าแนะนำ', en: 'Lead text' } },
    { name: 'image', type: 'upload', relationTo: 'media', label: { th: 'รูปพื้นหลัง', en: 'Background image' } },
    { name: 'imageUrl', type: 'text', label: { th: 'หรือใส่ลิงก์รูป (URL)', en: 'Or image URL' }, admin: { description: 'ใช้แทนการอัปโหลด เช่น /wp/BG.jpg' } },
    buttonsField,
    { name: 'showSearch', type: 'checkbox', defaultValue: false, label: { th: 'แสดงกล่องค้นหาโครงการ', en: 'Show project search' } },
    textStyleFields([
      { key: 'eyebrow', label: 'Eyebrow' },
      { key: 'title', label: 'หัวข้อใหญ่ (Title)' },
      { key: 'tagline', label: 'ข้อความรอง (Tagline)' },
      { key: 'lead', label: 'ย่อหน้า (Lead)' },
    ]),
    appearanceFields,
  ],
}

export const StatsBlock: Block = {
  slug: 'stats',
  labels: { singular: { th: 'สถิติ (ตัวเลข)', en: 'Stats' }, plural: { th: 'สถิติ', en: 'Stats' } },
  fields: [
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      label: { th: 'รายการตัวเลข', en: 'Stat items' },
      labels: { singular: { th: 'ตัวเลข', en: 'Stat' }, plural: { th: 'ตัวเลข', en: 'Stats' } },
      fields: [
        { name: 'number', type: 'text', required: true, label: { th: 'ตัวเลข', en: 'Number' }, admin: { description: 'เช่น 30+, 3,209, 8,110' } },
        { name: 'label', type: 'text', required: true, localized: true, label: { th: 'คำอธิบาย', en: 'Label' } },
      ],
    },
    appearanceFields,
  ],
}

export const FeaturedProjectsBlock: Block = {
  slug: 'featuredProjects',
  labels: { singular: { th: 'โครงการเด่น', en: 'Featured projects' }, plural: { th: 'โครงการเด่น', en: 'Featured projects' } },
  fields: [
    eyebrow,
    heading('หัวข้อ'),
    subtitle,
    {
      name: 'source',
      type: 'select',
      defaultValue: 'featured',
      label: { th: 'เลือกโครงการจาก', en: 'Source' },
      options: [
        { label: { th: 'เลือกเอง (ระบุโครงการ)', en: 'Manual select' }, value: 'manual' },
        { label: { th: 'โครงการที่ติ๊ก "แนะนำ"', en: 'Featured' }, value: 'featured' },
        { label: { th: 'โครงการล่าสุด', en: 'Latest' }, value: 'latest' },
      ],
    },
    {
      name: 'projects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      label: { th: 'เลือกโครงการที่จะโชว์ (ลากจัดลำดับได้)', en: 'Select projects' },
      admin: {
        description: 'ค้นหาแล้วเลือกโครงการที่ต้องการ — เรียงลำดับตามที่เลือก',
        condition: (_, sib) => sib?.source === 'manual',
      },
    },
    {
      name: 'count',
      type: 'number',
      defaultValue: 6,
      label: { th: 'จำนวนที่แสดง (โหมดล่าสุด/แนะนำ)', en: 'Count' },
      admin: { condition: (_, sib) => sib?.source !== 'manual' },
    },
    {
      name: 'ctaLabel',
      type: 'text',
      localized: true,
      label: { th: 'ข้อความปุ่มท้าย section', en: 'CTA label' },
      admin: { description: 'เช่น ดูโครงการทั้งหมด →' },
    },
    { name: 'ctaUrl', type: 'text', defaultValue: '/projects', label: { th: 'ลิงก์ปุ่มท้าย', en: 'CTA URL' } },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      label: { th: 'จำนวนคอลัมน์', en: 'Columns' },
      options: columnOptions,
    },
    styleEyebrowHeadingSub,
    appearanceFields,
  ],
}

export const FeaturesBlock: Block = {
  slug: 'features',
  labels: { singular: { th: 'จุดเด่น (ไอคอน+ข้อความ)', en: 'Features' }, plural: { th: 'จุดเด่น', en: 'Features' } },
  fields: [
    eyebrow,
    heading('หัวข้อ'),
    subtitle,
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      label: { th: 'จำนวนคอลัมน์', en: 'Columns' },
      options: columnOptions,
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      label: { th: 'รายการจุดเด่น', en: 'Items' },
      labels: { singular: { th: 'จุดเด่น', en: 'Item' }, plural: { th: 'จุดเด่น', en: 'Items' } },
      fields: [
        { name: 'icon', type: 'text', label: { th: 'ไอคอน (อีโมจิ)', en: 'Icon' }, admin: { description: 'เช่น 🏆 🏗️ 📍 💎' } },
        { name: 'title', type: 'text', required: true, localized: true, label: { th: 'หัวข้อ', en: 'Title' } },
        { name: 'text', type: 'textarea', localized: true, label: { th: 'รายละเอียด', en: 'Text' } },
      ],
    },
    styleEyebrowHeadingSub,
    appearanceFields,
  ],
}

export const RichTextBlock: Block = {
  slug: 'richText',
  labels: { singular: { th: 'ข้อความ (Rich Text)', en: 'Rich text' }, plural: { th: 'ข้อความ', en: 'Rich text' } },
  fields: [
    eyebrow,
    heading('หัวข้อ (เว้นว่างได้)'),
    { name: 'content', type: 'richText', localized: true, label: { th: 'เนื้อหา', en: 'Content' } },
    {
      name: 'align',
      type: 'select',
      defaultValue: 'left',
      label: { th: 'จัดข้อความ', en: 'Align' },
      options: [
        { label: { th: 'ชิดซ้าย', en: 'Left' }, value: 'left' },
        { label: { th: 'กึ่งกลาง', en: 'Center' }, value: 'center' },
      ],
    },
    {
      name: 'width',
      type: 'select',
      defaultValue: 'normal',
      label: { th: 'ความกว้างเนื้อหา', en: 'Width' },
      options: [
        { label: { th: 'แคบ (อ่านง่าย)', en: 'Narrow' }, value: 'narrow' },
        { label: { th: 'ปกติ', en: 'Normal' }, value: 'normal' },
      ],
    },
    styleEyebrowHeading,
    appearanceFields,
  ],
}

export const ImageTextBlock: Block = {
  slug: 'imageText',
  labels: { singular: { th: 'รูป + ข้อความ', en: 'Image + Text' }, plural: { th: 'รูป + ข้อความ', en: 'Image + Text' } },
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media', label: { th: 'รูป', en: 'Image' } },
    { name: 'imageUrl', type: 'text', label: { th: 'หรือใส่ลิงก์รูป (URL)', en: 'Or image URL' }, admin: { description: 'ใช้แทนการอัปโหลด เช่น /wp/ARNA.jpg' } },
    {
      name: 'imageSide',
      type: 'select',
      defaultValue: 'left',
      label: { th: 'วางรูปฝั่ง', en: 'Image side' },
      options: [
        { label: { th: 'ซ้าย', en: 'Left' }, value: 'left' },
        { label: { th: 'ขวา', en: 'Right' }, value: 'right' },
      ],
    },
    eyebrow,
    heading('หัวข้อ'),
    { name: 'content', type: 'richText', localized: true, label: { th: 'เนื้อหา', en: 'Content' } },
    buttonsField,
    styleEyebrowHeading,
    appearanceFields,
  ],
}

export const GalleryBlock: Block = {
  slug: 'gallery',
  labels: { singular: { th: 'แกลเลอรีรูป', en: 'Gallery' }, plural: { th: 'แกลเลอรี', en: 'Galleries' } },
  fields: [
    heading('หัวข้อ (เว้นว่างได้)'),
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      label: { th: 'จำนวนคอลัมน์', en: 'Columns' },
      options: columnOptions,
    },
    bulkImagesField,
    styleHeadingOnly,
    appearanceFields,
  ],
}

export const SliderBlock: Block = {
  slug: 'slider',
  labels: { singular: { th: 'สไลด์รูป (Carousel)', en: 'Slider' }, plural: { th: 'สไลด์', en: 'Sliders' } },
  fields: [
    eyebrow,
    heading('หัวข้อ (เว้นว่างได้)'),
    bulkImagesField,
    {
      name: 'autoplay',
      type: 'checkbox',
      defaultValue: true,
      label: { th: 'เลื่อนอัตโนมัติ', en: 'Autoplay' },
    },
    {
      name: 'height',
      type: 'select',
      defaultValue: 'md',
      label: { th: 'ความสูงสไลด์', en: 'Height' },
      options: [
        { label: { th: 'เตี้ย', en: 'Short' }, value: 'sm' },
        { label: { th: 'กลาง', en: 'Medium' }, value: 'md' },
        { label: { th: 'สูง (เต็มจอ)', en: 'Tall' }, value: 'lg' },
      ],
    },
    styleHeadingOnly,
    appearanceFields,
  ],
}

export const TimelineBlock: Block = {
  slug: 'timeline',
  labels: { singular: { th: 'ไทม์ไลน์', en: 'Timeline' }, plural: { th: 'ไทม์ไลน์', en: 'Timelines' } },
  fields: [
    eyebrow,
    heading('หัวข้อ'),
    subtitle,
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      label: { th: 'รายการ', en: 'Items' },
      labels: { singular: { th: 'ช่วงเวลา', en: 'Milestone' }, plural: { th: 'ช่วงเวลา', en: 'Milestones' } },
      fields: [
        { name: 'year', type: 'text', required: true, label: { th: 'ปี', en: 'Year' } },
        { name: 'title', type: 'text', required: true, localized: true, label: { th: 'หัวข้อ', en: 'Title' } },
        { name: 'text', type: 'textarea', localized: true, label: { th: 'รายละเอียด', en: 'Text' } },
      ],
    },
    styleEyebrowHeadingSub,
    appearanceFields,
  ],
}

export const CTABlock: Block = {
  slug: 'cta',
  labels: { singular: { th: 'แถบเชิญชวน (CTA)', en: 'CTA band' }, plural: { th: 'CTA', en: 'CTAs' } },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true, label: { th: 'หัวข้อ', en: 'Title' } },
    { name: 'text', type: 'textarea', localized: true, label: { th: 'ข้อความ', en: 'Text' } },
    buttonsField,
    textStyleFields([
      { key: 'title', label: 'หัวข้อ (Title)' },
      { key: 'text', label: 'ข้อความ (Text)' },
    ]),
    appearanceFields,
  ],
}

export const ColumnsBlock: Block = {
  slug: 'columns',
  labels: { singular: { th: 'คอลัมน์ (จัด Layout)', en: 'Columns' }, plural: { th: 'คอลัมน์', en: 'Columns' } },
  fields: [
    heading('หัวข้อ (เว้นว่างได้)'),
    {
      name: 'cols',
      type: 'array',
      minRows: 1,
      maxRows: 5,
      label: { th: 'คอลัมน์ (เพิ่มได้ถึง 5)', en: 'Columns' },
      labels: { singular: { th: 'คอลัมน์', en: 'Column' }, plural: { th: 'คอลัมน์', en: 'Columns' } },
      fields: [
        {
          name: 'span',
          type: 'number',
          defaultValue: 1,
          min: 1,
          max: 5,
          label: { th: 'สัดส่วนความกว้าง (1-5)', en: 'Width ratio' },
          admin: { description: 'เลขมาก = กว้างกว่า (เช่น 2 กับ 1 = 2 ส่วนต่อ 1 ส่วน)' },
        },
        { name: 'image', type: 'upload', relationTo: 'media', label: { th: 'รูป (เว้นว่างได้)', en: 'Image' } },
        { name: 'imageUrl', type: 'text', label: { th: 'หรือลิงก์รูป (URL)', en: 'Or image URL' } },
        { name: 'colHeading', type: 'text', localized: true, label: { th: 'หัวข้อในคอลัมน์', en: 'Heading' } },
        { name: 'content', type: 'richText', localized: true, label: { th: 'เนื้อหา', en: 'Content' } },
        textField('headingFont', 'หัวข้อ — ฟอนต์', '/components/admin/StyleSelects#FontSelectField'),
        textField('headingColor', 'หัวข้อ — สี', COLOR_FIELD_PATH),
        {
          name: 'align',
          type: 'select',
          defaultValue: 'left',
          label: { th: 'จัดข้อความ', en: 'Align' },
          options: [
            { label: { th: 'ซ้าย', en: 'Left' }, value: 'left' },
            { label: { th: 'กึ่งกลาง', en: 'Center' }, value: 'center' },
          ],
        },
      ],
    },
    {
      name: 'valign',
      type: 'select',
      defaultValue: 'top',
      label: { th: 'จัดแนวตั้ง', en: 'Vertical align' },
      options: [
        { label: { th: 'บน', en: 'Top' }, value: 'top' },
        { label: { th: 'กึ่งกลาง', en: 'Center' }, value: 'center' },
      ],
    },
    styleHeadingOnly,
    appearanceFields,
  ],
}

export const SpacerBlock: Block = {
  slug: 'spacer',
  labels: { singular: { th: 'เว้นระยะ', en: 'Spacer' }, plural: { th: 'เว้นระยะ', en: 'Spacers' } },
  fields: [
    {
      name: 'size',
      type: 'select',
      defaultValue: 'md',
      label: { th: 'ขนาดช่องว่าง', en: 'Size' },
      options: [
        { label: { th: 'เล็ก', en: 'Small' }, value: 'sm' },
        { label: { th: 'กลาง', en: 'Medium' }, value: 'md' },
        { label: { th: 'ใหญ่', en: 'Large' }, value: 'lg' },
      ],
    },
  ],
}

export const allBlocks: Block[] = [
  HeroBlock,
  StatsBlock,
  FeaturedProjectsBlock,
  FeaturesBlock,
  RichTextBlock,
  ImageTextBlock,
  GalleryBlock,
  SliderBlock,
  TimelineBlock,
  CTABlock,
  SpacerBlock,
]
