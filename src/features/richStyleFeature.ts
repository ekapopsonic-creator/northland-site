import { createServerFeature } from '@payloadcms/richtext-lexical'

// เชื่อม client feature (custom toolbar) เข้ากับ Payload
// ClientFeature ชี้ไปที่ไฟล์ client ผ่าน importMap (baseDir = src)
export const RichStyleFeature = createServerFeature({
  key: 'richStyle',
  feature: {
    ClientFeature: '/features/richStyle.client#RichStyleFeatureClient',
  },
})
