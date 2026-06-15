import React from 'react'

// กล่องค้นหาโครงการบน hero — ส่ง GET ไป /projects (ตัวกรองทำงานฝั่งหน้า projects)
export function HeroSearch() {
  return (
    <form className="search-card" action="/projects">
      <div className="search-field">
        <label htmlFor="s-type">ประเภท</label>
        <select id="s-type" name="type" defaultValue="">
          <option value="">ทุกประเภท</option>
          <option value="single-house">บ้านเดี่ยว</option>
          <option value="pool-villa">พูลวิลล่า</option>
          <option value="townhome">ทาวน์โฮม</option>
          <option value="condo">คอนโดมิเนียม</option>
          <option value="commercial">อาคารพาณิชย์</option>
        </select>
      </div>
      <div className="search-field">
        <label htmlFor="s-loc">ทำเล</label>
        <select id="s-loc" name="location" defaultValue="">
          <option value="">ทุกทำเล</option>
          <option value="saraburi">สระบุรี</option>
          <option value="bangkok">กรุงเทพฯ</option>
        </select>
      </div>
      <div className="search-field">
        <label htmlFor="s-price">งบประมาณ</label>
        <select id="s-price" name="price" defaultValue="">
          <option value="">ทุกระดับ</option>
          <option value="low">ต่ำกว่า 3 ล้าน</option>
          <option value="mid">3 – 7 ล้าน</option>
          <option value="high">7 – 20 ล้าน</option>
          <option value="luxury">20 ล้านขึ้นไป</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary btn-lg">ค้นหา</button>
    </form>
  )
}
