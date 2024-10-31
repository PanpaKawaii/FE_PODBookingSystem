import React from "react";
import { CDBInput } from "cdbreact"; // Nhập CDBInput từ cdbreact
import "./Header.css"; // Nhập file CSS
import Avatar from "../Admin_image/avt.jpg"; // Nhập file CSS
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Header() {
  const [adminName, setAdminName] = useState("");
  const [adminRole, setAdminRole] = useState("");
  useEffect(() => {
    // Fetch users from API
    api
      .get("/User")
      .then((response) => {
        // Assuming response.data is an array of users
        const adminUser = response.data.find((user) => user.role === "Admin");
        if (adminUser) {
          setAdminName(adminUser.name);
          setAdminRole(adminUser.role);
        } else {
          console.error("No admin user found");
        }
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);
  return (
    <div className="header-container">
      <div className="search-bar">
        {" "}
        {/* Div cho thanh tìm kiếm */}
        {/* <CDBInput
          type="text"
          placeholder="Tìm kiếm..."
          style={{ width: '100%', maxWidth: '300px' }} // Đặt chiều rộng tối đa cho thanh tìm kiếm
        /> */}
        {/* <FontAwesomeIcon icon={faSearch} className="search-icon" />  */}
      </div>
      <div className="d-flex align-items-center">
        <div className="inno">INNO SPACE</div> {/* Sử dụng lớp CSS */}{" "}
        {/* Div cho hình đại diện và thông tin người dùng */}
        <div className="admin-avatar">
          {" "}
          {/* Thêm khoảng cách bên phải */}
          <img src={Avatar} alt="Admin Avatar" /> {/* Hình đại diện */}
        </div>
        <div className="user-info">
          {" "}
          {/* Căn chỉnh văn bản bên phải */}
          <div className="username">{adminName}</div> {/* Tên người dùng */}
          <div className="role">{adminRole}</div> {/* Chức vụ */}
        </div>
      </div>
    </div>
  );
}
