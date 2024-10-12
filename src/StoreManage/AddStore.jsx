import React, { useState } from 'react'
import './StyleAddStore.css'

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
        <label htmlFor="storeName">Store Name:</label>
        <input
          type="text"
          id="storeName"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Store</button>
    </form>
  );
}
