import React, { useState } from 'react'
import './style.css'

export default function AddStore() {
  const [storeName, setStoreName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Store added:', { storeName, address, contact });
    try {
      const response = await api.post("Store", { storeName, address, contact });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
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
        <label htmlFor="address">Địa chỉ:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="contact">Số điện thoại:</label>
        <input
          type="text"
          id="contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
      </div>
      <button className='add' type="submit">Thêm</button>
    </form>
  );
}
