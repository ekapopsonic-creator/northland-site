import type { Access, FieldAccess } from 'payload'

export type Role = 'admin' | 'editor' | 'sales'

// Admin เท่านั้น
export const isAdmin: Access = ({ req }) => req.user?.role === 'admin'

export const isAdminField: FieldAccess = ({ req }) => req.user?.role === 'admin'

// Admin หรือ Editor — ใช้กับงานคอนเทนต์ทั้งหมด
export const isAdminOrEditor: Access = ({ req }) =>
  req.user?.role === 'admin' || req.user?.role === 'editor'

// Admin หรือ Sales — ใช้กับ lead และใบสมัครงาน
export const isAdminOrSales: Access = ({ req }) =>
  req.user?.role === 'admin' || req.user?.role === 'sales'

// ทุกคนที่ login แล้ว
export const isLoggedIn: Access = ({ req }) => Boolean(req.user)

// เปิด public (เช่น ส่งฟอร์มจากหน้าเว็บ / อ่านข้อมูลโครงการ)
export const anyone: Access = () => true

// Public อ่านได้เฉพาะที่เผยแพร่แล้ว — ทีมงานเห็น draft ด้วย
export const publishedOrLoggedIn: Access = ({ req }) => {
  if (req.user) return true
  return { _status: { equals: 'published' } }
}
