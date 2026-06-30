import type { GlobalConfig } from 'payload'
import { anyone, isAdminOrEditor } from '../access'
import { bodyFontOptions, displayFontOptions } from '../lib/fonts'
import { colorField, textField } from '../blocks/shared'

const SIZE_FIELD = '/components/admin/StyleSelects#SizeSelectField'
const SPACING_FIELD = '/components/admin/StyleSelects#SpacingSelectField'

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
              label: { th: 'โลโก้ (แสดงบนหัวเว็บ พื้นสว่าง)', en: 'Logo' },
              admin: { description: 'เว้นว่าง = ใช้โลโก้ NORTHLAND ตัวอักษรเริ่มต้น' },
            },
            {
              name: 'logoDark',
              type: 'upload',
              relationTo: 'media',
              label: { th: 'โลโก้สำหรับพื้นเข้ม (เช่น footer)', en: 'Logo (for dark background)' },
              admin: { description: 'โลโก้สีขาว/สว่าง สำหรับวางบนพื้นหลังสีเข้ม — เว้นว่าง = ใช้โลโก้ตัวอักษรขาว' },
            },
            colorField('brandColorDark', 'สีหลัก-กรมท่า (ปุ่ม / โลโก้ / หัวข้อ)', '#1E3644'),
            colorField('brandColor', 'สี accent-ฟ้า (ราคา / ลิงก์)', '#00ADEF'),
            {
              type: 'row',
              fields: [
                colorField('secondaryColor1', 'Secondary 1', '#00ADEF'),
                colorField('secondaryColor2', 'Secondary 2', '#FB6A19'),
                colorField('secondaryColor3', 'Secondary 3', '#02A7E5'),
              ],
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
                textField('baseFontSize', 'ขนาดตัวอักษรพื้นฐาน', SIZE_FIELD),
              ],
            },
          ],
        },
        {
          label: { th: 'ระยะห่าง (Layout)', en: 'Spacing' },
          fields: [
            {
              type: 'row',
              fields: [
                textField('headerPaddingY', 'ระยะ Header (บน-ล่าง)', SPACING_FIELD),
                textField('footerPaddingY', 'ระยะ Footer (บน-ล่าง)', SPACING_FIELD),
              ],
            },
            {
              type: 'row',
              fields: [
                textField('bodyGap', 'ระยะห่างระหว่าง Section (Body)', SPACING_FIELD),
                {
                  name: 'containerWidth',
                  type: 'text',
                  label: { th: 'ความกว้างเนื้อหาหลัก', en: 'Container width' },
                  admin: { description: 'พิมพ์: normal (1200px) / wide (1400px) / full (เต็มจอ)' },
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
