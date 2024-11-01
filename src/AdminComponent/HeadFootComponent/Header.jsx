import React, { useEffect, useState } from "react";
import "./Header.css"; // Nhập file CSS
import api from "../api/axios";

export default function Header() {
  const [adminName, setAdminName] = useState("");
  const [adminRole, setAdminRole] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkYW5nbmdvY2hhaXRyaWV1QGdtYWlsLmNvbSIsImp0aSI6ImE5MmUwOTBkLTQ2NmEtNDE2My1hMDQ3LWUyOWNjYjExOGE2OCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiOSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzMzMDc1ODUxLCJpc3MiOiJQb2RCb29raW5nIiwiYXVkIjoiUG9kV2ViIn0.SljDy518ZlaoY5hp6kKZvBp3-j5vXItyHQ0H7Y0ik3o"; // Thay thế bằng token thực tế của bạn

        const response = await api.get("/User", {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        });

        // Giả sử response.data là một mảng người dùng
        const user = response.data.find((user) => user.role === "Admin");
        if (user) {
          setAdminName(user.name);
          setAdminRole(user.role);
          setImage(user.image);
        } else {
          console.error("No admin user found");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUser(); // Gọi hàm để lấy thông tin người dùng
  }, []);

  return (
    <div className="header-container">
      <div className="search-bar">
        {/* Div cho thanh tìm kiếm */}
        {/* <CDBInput
          type="text"
          placeholder="Tìm kiếm..."
          style={{ width: '100%', maxWidth: '300px' }} // Đặt chiều rộng tối đa cho thanh tìm kiếm
        /> */}
        {/* <FontAwesomeIcon icon={faSearch} className="search-icon" /> */}
      </div>
      <div className="d-flex align-items-center">
        <div className="inno">INNO SPACE</div> {/* Sử dụng lớp CSS */}
        <div className="admin-avatar">
          <img src={image} alt="Admin Avatar" /> {/* Hình đại diện */}
        </div>
        <div className="user-info">
          <div className="username">{adminName}</div> {/* Tên người dùng */}
          <div className="role">{adminRole}</div> {/* Chức vụ */}
        </div>
      </div>
    </div>
  );
}
