import React, { useState } from 'react'
import './style.css'

export default function AddStore() {
  const [storeName, setStoreName] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Store added:', { storeName, location, phone });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="storeName">Tên cửa hàng:</label>
        <input
          type="text"
          id="storeName"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="location">Địa chỉ:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="phone">Số điện thoại:</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <button className='add' type="submit">Thêm</button>
    </form>
  );
}
