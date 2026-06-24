import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor, publishedOrLoggedIn } from '../access'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: { th: 'โครงการ', en: 'Project' },
    plural: { th: 'โครงการ', en: 'Projects' },
  },
  admin: {
    useAsTitle: 'title',
    group: { th: 'โครงการและคอนเทนต์', en: 'Content' },
    defaultColumns: ['title', 'category', 'status', 'zone', 'updatedAt'],
    description: {
      th: 'ข้อมูลโครงการทั้งหมด — กด "บันทึกฉบับร่าง" ได้ถ้ายังกรอกไม่ครบ แล้วค่อยกดเผยแพร่ทีหลัง',
      en: 'All projects — save as draft until ready to publish',
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
      label: { th: 'ชื่อโครงการ', en: 'Project name' },
      admin: { description: 'เช่น Attaluck สุขุมวิท' },
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
        description: 'ภาษาอังกฤษตัวเล็ก คั่นด้วยขีด เช่น attaluck-sukhumvit',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: { th: 'ประเภทโครงการ', en: 'Category' },
      options: [
        { label: { th: 'บ้านเดี่ยว', en: 'Single house' }, value: 'single-house' },
        { label: { th: 'พูลวิลล่า', en: 'Pool villa' }, value: 'pool-villa' },
        { label: { th: 'ทาวน์โฮม', en: 'Townhome' }, value: 'townhome' },
        { label: { th: 'คอนโดมิเนียม', en: 'Condominium' }, value: 'condo' },
        { label: { th: 'อาคารพาณิชย์', en: 'Commercial' }, value: 'commercial' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'under-construction',
      // ตั้งชื่อ enum เองเพื่อไม่ให้ชนกับ enum ของระบบ draft (_status) บน Postgres
      enumName: 'enum_projects_sale_status',
      label: { th: 'สถานะโครงการ', en: 'Status' },
      admin: { position: 'sidebar' },
      options: [
        { label: { th: 'เร็วๆ นี้', en: 'Coming soon' }, value: 'coming-soon' },
        { label: { th: 'กำลังก่อสร้าง', en: 'Under construction' }, value: 'under-construction' },
        { label: { th: 'พร้อมเข้าอยู่', en: 'Ready to move in' }, value: 'ready' },
        { label: { th: 'ปิดการขาย (Sold out)', en: 'Sold out' }, value: 'sold-out' },
      ],
    },
    {
      name: 'zone',
      type: 'select',
      required: true,
      label: { th: 'พื้นที่', en: 'Zone' },
      options: [
        { label: { th: 'กรุงเทพมหานคร', en: 'Bangkok' }, value: 'bangkok' },
        { label: { th: 'สระบุรี', en: 'Saraburi' }, value: 'saraburi' },
      ],
    },
    {
      name: 'address',
      type: 'text',
      label: { th: 'ที่ตั้งโครงการ', en: 'Address' },
      admin: { description: 'เช่น ซอยสุขุมวิท 50, แขวงพระโขนง, กรุงเทพฯ' },
    },
    {
      name: 'tagline',
      type: 'text',
      localized: true,
      label: { th: 'สโลแกนโครงการ', en: 'Tagline' },
      admin: { description: 'เช่น Private Sanctuary in the Heart of Sukhumvit' },
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
      label: { th: 'รายละเอียดโครงการ', en: 'Description' },
    },
    {
      name: 'highlights',
      type: 'array',
      localized: true,
      label: { th: 'จุดเด่นของโครงการ', en: 'Highlights' },
      labels: {
        singular: { th: 'จุดเด่น', en: 'Highlight' },
        plural: { th: 'จุดเด่น', en: 'Highlights' },
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: { th: 'ข้อความ', en: 'Text' },
        },
      ],
    },
    {
      name: 'specs',
      type: 'group',
      label: { th: 'ข้อมูลจำเพาะ', en: 'Specifications' },
      fields: [
        { name: 'units', type: 'text', label: { th: 'จำนวนยูนิต', en: 'Units' } },
        { name: 'usableArea', type: 'text', label: { th: 'พื้นที่ใช้สอย', en: 'Usable area' } },
        { name: 'landSize', type: 'text', label: { th: 'ขนาดที่ดิน', en: 'Land size' } },
        { name: 'bedrooms', type: 'text', label: { th: 'จำนวนห้องนอน', en: 'Bedrooms' } },
        { name: 'bathrooms', type: 'text', label: { th: 'จำนวนห้องน้ำ', en: 'Bathrooms' } },
        { name: 'projectValue', type: 'text', label: { th: 'มูลค่าโครงการ', en: 'Project value' } },
      ],
    },
    {
      name: 'startingPrice',
      type: 'text',
      label: { th: 'ราคาเริ่มต้น', en: 'Starting price' },
      admin: { description: 'เช่น 68 ล้านบาท' },
    },
    {
      name: 'priceTier',
      type: 'select',
      label: { th: 'ช่วงราคา (ใช้กับตัวกรองหน้าเว็บ)', en: 'Price tier' },
      options: [
        { label: { th: 'ต่ำกว่า 3 ล้าน', en: 'Under 3M' }, value: 'low' },
        { label: { th: '3 – 7 ล้าน', en: '3–7M' }, value: 'mid' },
        { label: { th: '7 – 20 ล้าน', en: '7–20M' }, value: 'high' },
        { label: { th: '20 ล้านขึ้นไป', en: '20M+' }, value: 'luxury' },
      ],
    },
    {
      name: 'promoNote',
      type: 'text',
      label: { th: 'ข้อความโปรโมชั่นสั้น', en: 'Promo note' },
      admin: { description: 'เช่น ผ่อนดาวน์ 0% สูงสุด 24 เดือน · รับสิทธิ์โอนฟรี' },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: { th: 'รูปหน้าปกโครงการ', en: 'Cover image' },
    },
    {
      name: 'gallery',
      type: 'array',
      label: { th: 'แกลเลอรีรูปภาพ', en: 'Gallery' },
      labels: {
        singular: { th: 'รูป', en: 'Image' },
        plural: { th: 'รูป', en: 'Images' },
      },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true, label: { th: 'รูป', en: 'Image' } },
        { name: 'caption', type: 'text', label: { th: 'คำบรรยายรูป', en: 'Caption' } },
      ],
    },
    {
      name: 'floorPlans',
      type: 'array',
      label: { th: 'แผนผัง / Floor Plan', en: 'Floor plans' },
      labels: {
        singular: { th: 'แผนผัง', en: 'Floor plan' },
        plural: { th: 'แผนผัง', en: 'Floor plans' },
      },
      fields: [
        { name: 'name', type: 'text', required: true, label: { th: 'ชื่อแบบ', en: 'Plan name' }, admin: { description: 'เช่น แบบบ้าน Type A / ผังโครงการ' } },
        { name: 'image', type: 'upload', relationTo: 'media', required: true, label: { th: 'รูปแผนผัง', en: 'Plan image' } },
      ],
    },
    {
      name: 'map',
      type: 'group',
      label: { th: 'แผนที่', en: 'Map' },
      fields: [
        { name: 'googleMapsUrl', type: 'text', label: { th: 'ลิงก์ Google Maps', en: 'Google Maps URL' }, admin: { description: 'กดปุ่ม Share ใน Google Maps แล้วคัดลอกลิงก์มาวาง' } },
        { name: 'lat', type: 'number', label: { th: 'ละติจูด', en: 'Latitude' } },
        { name: 'lng', type: 'number', label: { th: 'ลองจิจูด', en: 'Longitude' } },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      label: { th: 'ติดต่อเฉพาะโครงการนี้', en: 'Project contact' },
      admin: { description: 'เว้นว่าง = ใช้เบอร์/LINE กลางของบริษัท' },
      fields: [
        { name: 'phone', type: 'text', label: { th: 'เบอร์โทร (เฉพาะโครงการนี้)', en: 'Phone' } },
        { name: 'lineId', type: 'text', label: { th: 'LINE ID (เฉพาะโครงการนี้)', en: 'LINE ID' } },
        { name: 'salesEmail', type: 'text', label: { th: 'อีเมลขาย (เฉพาะโครงการนี้)', en: 'Sales email' } },
      ],
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: { th: 'ลิงก์วิดีโอ (YouTube)', en: 'Video URL' },
    },
    {
      name: 'virtualTourUrl',
      type: 'text',
      label: { th: 'ลิงก์ Virtual Tour (Matterport ฯลฯ)', en: 'Virtual tour URL' },
    },
    {
      name: 'locationFeatures',
      type: 'array',
      localized: true,
      label: { th: 'จุดเด่นทำเล', en: 'Location features' },
      labels: {
        singular: { th: 'จุดเด่นทำเล', en: 'Feature' },
        plural: { th: 'จุดเด่นทำเล', en: 'Features' },
      },
      fields: [
        { name: 'title', type: 'text', required: true, label: { th: 'หัวข้อ', en: 'Title' }, admin: { description: 'เช่น การเดินทาง / ไลฟ์สไตล์ / โรงพยาบาล / โรงเรียน' } },
        { name: 'detail', type: 'textarea', label: { th: 'รายละเอียด', en: 'Detail' } },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: { th: 'แสดงเป็นโครงการแนะนำหน้าแรก', en: 'Featured on homepage' },
      admin: { position: 'sidebar' },
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 0,
      label: { th: 'ลำดับการแสดงผล', en: 'Display order' },
      admin: { position: 'sidebar', description: 'เลขน้อยแสดงก่อน' },
    },
  ],
}
