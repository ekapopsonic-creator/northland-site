import React from 'react'

export const metadata = {
  title: 'Northland Development — ที่เราใส่ใจ',
  description: '30 ปีแห่งความใส่ใจ — โครงการอสังหาริมทรัพย์คุณภาพในสระบุรีและกรุงเทพมหานคร',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body style={{ fontFamily: 'Prompt, sans-serif', margin: 0 }}>{children}</body>
    </html>
  )
}
