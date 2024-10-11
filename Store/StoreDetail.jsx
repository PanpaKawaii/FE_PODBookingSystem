import React from 'react'
import location from './../PODimage/location.jpg'

export default function StoreDetail() {
  return (
    <div>
        <img src={location} alt="Store 1" className="card-img-top" style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
        <h1>Store 1</h1>
        <p>Địa chỉ: 123 Main St, City, Country</p> 
        <p>Số điện thoại: 123-456-7890</p>
        <p>Email: info@store1.com</p>
        <p>Giờ mở cửa: 9:00 AM - 5:00 PM</p>
        <p>Mô tả: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        
    </div>
  )
}
