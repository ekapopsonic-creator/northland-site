import type { GlobalConfig } from 'payload'
import { anyone, isAdminOrEditor } from '../access'
import { bodyFontOptions, displayFontOptions } from '../lib/fonts'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: { th: 'ตั้งค่าเว็บไซต์', en: 'Site Settings' },
  admin: {
    group: { th: 'ตั้งค่าระบบ', en: 'System' },
    description: {
      th: 'เปลี่ยนโลโก้ สีหลักของเว็บ และข้อมูลติดต่อ — มีผลกับหน้าเว็บทันทีหลังบันทึก',
      en: 'Logo, brand color, and contact info — applies to the website on save',
    },
  },
  access: {
    read: anyone,
    update: isAdminOrEditor,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: { th: 'แบรนด์ & ธีม', en: 'Brand & Theme' },
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: { th: 'โลโก้ (แสดงบนหัวเว็บ)', en: 'Logo' },
              admin: { description: 'เว้นว่าง = ใช้โลโก้ NORTHLAND ตัวอักษรเริ่มต้น' },
            },
            {
              name: 'brandColor',
              type: 'text',
              defaultValue: '#00AEEF',
              label: { th: 'สีหลักของเว็บ (Brand Color)', en: 'Brand color' },
              admin: { description: 'รหัสสี HEX เช่น #00AEEF (สีฟ้า North Sea ของ Northland)' },
            },
            {
              name: 'brandColorDark',
              type: 'text',
              defaultValue: '#03A1D1',
              label: { th: 'สีหลักเข้ม (ปุ่ม hover / accent)', en: 'Brand color (dark)' },
              admin: { description: 'รหัสสี HEX เช่น #03A1D1' },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'bodyFont',
                  type: 'select',
                  defaultValue: 'prompt',
                  label: { th: 'ฟอนต์เนื้อหา (Body)', en: 'Body font' },
                  options: bodyFontOptions,
                },
                {
                  name: 'displayFont',
                  type: 'select',
                  defaultValue: 'cormorant',
                  label: { th: 'ฟอนต์หัวข้อ (Display)', en: 'Display font' },
                  options: displayFontOptions,
                },
              ],
            },
          ],
        },
        {
          label: { th: 'ข้อมูลติดต่อ', en: 'Contact' },
          fields: [
            {
              name: 'phone',
              type: 'text',
              defaultValue: '088-888-8888',
              label: { th: 'เบอร์โทรศัพท์', en: 'Phone' },
            },
            {
              name: 'email',
              type: 'text',
              defaultValue: 'info@northland.co.th',
              label: { th: 'อีเมล', en: 'Email' },
            },
            {
              name: 'lineId',
              type: 'text',
              defaultValue: '@northland',
              label: { th: 'LINE ID', en: 'LINE ID' },
            },
            {
              name: 'lineUrl',
              type: 'text',
              label: { th: 'ลิงก์ LINE OA (เพิ่มเพื่อน)', en: 'LINE OA URL' },
              admin: { description: 'เช่น https://lin.ee/xxxx — เว้นว่างได้' },
            },
            {
              name: 'address',
              type: 'textarea',
              defaultValue: '110 ม.8 ถนนแก่งคอย-บ้านนา ต.ตาลเดี่ยว อ.แก่งคอย สระบุรี 18110',
              label: { th: 'ที่อยู่สำนักงาน', en: 'Office address' },
            },
            {
              name: 'footerTagline',
              type: 'textarea',
              defaultValue:
                '30 ปีแห่งการสร้างที่อยู่อาศัยคุณภาพ ในสระบุรีและกรุงเทพมหานคร ที่เราใส่ใจในทุกรายละเอียด',
              label: { th: 'ข้อความใต้โลโก้ (Footer)', en: 'Footer tagline' },
            },
          ],
        },
      ],
    },
  ],
}
