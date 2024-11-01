import React, { useState, useEffect } from 'react';
import './HomeStyle.css';
import api from '../api/axios';

export default function Home() {
  const [adminName, setAdminName] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkYW5nbmdvY2hhaXRyaWV1QGdtYWlsLmNvbSIsImp0aSI6ImE5MmUwOTBkLTQ2NmEtNDE2My1hMDQ3LWUyOWNjYjExOGE2OCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiOSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzMzMDc1ODUxLCJpc3MiOiJQb2RCb29raW5nIiwiYXVkIjoiUG9kV2ViIn0.SljDy518ZlaoY5hp6kKZvBp3-j5vXItyHQ0H7Y0ik3o"; // Thay thế bằng token thực tế của bạn

      const response = await api.get("User", {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      return response.data; // Trả về dữ liệu người dùng
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      throw error; // Ném lỗi để xử lý ở nơi khác
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await fetchUser(); // Gọi hàm để lấy thông tin người dùng
        console.log("Dữ liệu người dùng:", userData); // Kiểm tra dữ liệu trả về
        const adminUser = userData.find(user => user.role === 'Admin');
        if (adminUser) {
          setAdminName(adminUser.name);
          setImage(adminUser.image);
        } else {
          console.error('No admin user found');
        }
      } catch (error) {
        setError('Error fetching users: ' + error.message);
        console.error('Error fetching users:', error);
      }
    };

    getUserData();
  }, []);

  return (
    <div className="welcome-container">
      {error && <p className="error-message">{error}</p>}
      <img src={image} alt="Welcome" className="welcome-image" />
      <h1>Chào mừng, {adminName}!</h1>
      <p>Chúng tôi rất vui được có bạn ở đây. Hãy khám phá các chức năng bên cạnh!</p>
    </div>
  );
}
