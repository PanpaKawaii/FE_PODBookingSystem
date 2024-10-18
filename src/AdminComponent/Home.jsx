import React from 'react'
import './HomeStyle.css'
import welcomeImage from '../Admin_image/avt.jpg'; // Thay thế bằng đường dẫn đến hình ảnh chào mừng
import './HomeStyle.css'
import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function Home() {
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    // Fetch users from API
    api.get('/User')
      .then(response => {
        // Assuming response.data is an array of users
        const adminUser = response.data.find(user => user.role === 'Admin');
        if (adminUser) {
          setAdminName(adminUser.name);
        } else {
          console.error('No admin user found');
        }
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <>

      <div className="welcome-container">
        <img src={welcomeImage} alt="Welcome" className="welcome-image" />
        <h1>Chào mừng, {adminName}!</h1>
        <p>Chúng tôi rất vui được có bạn ở đây. Hãy khám phá các chức năng bên cạnh!</p>
       
      </div>

    </>
  )
}
