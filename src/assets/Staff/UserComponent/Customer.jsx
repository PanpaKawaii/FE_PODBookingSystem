import React, { useEffect, useState } from "react";
import "./UserManage.css";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Customer = () => {
  const [userData, setUserData] = useState([]);
  const apiUser = "https://localhost:7166/api/User";

  const fetchUserData = async () => {
    try {
      const response = await axios.get(apiUser);
      setUserData(response.data.filter((user) => user.role === "User"));
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleEdit = (id) => {
    console.log("Edit user with id:", id);
    // Implement edit functionality
  };

  const handleDelete = (id) => {
    console.log("Delete user with id:", id);
    // Implement delete functionality
  };

  if (userData.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="user-manage">
      <h1>Tài khoản khách hàng</h1>
      <div className="user-list">
        {userData.map((user) => (
          <div key={user.id} className="user-card">
            <img
              src={user.image || "default-avatar.jpg"}
              alt={`${user.name}'s avatar`}
              className="user-avatar"
            />
            <div className="user-info">
              <h3>{user.name}</h3>
              <p>ID: {user.id}</p>
              <p>Email: {user.email}</p>
              <p>Số điện thoại: {user.phoneNumber}</p>
              <p>Loại tài khoản: {user.type}</p>
              <p>Điểm: {user.point}</p>
              <p>Mô tả: {user.description}</p>
            </div>
            <div className="user-actions">
              <Button variant="primary" onClick={() => handleEdit(user.id)}>
                <FontAwesomeIcon icon={faEdit} /> Sửa
              </Button>
              <Button variant="danger" onClick={() => handleDelete(user.id)}>
                <FontAwesomeIcon icon={faTrash} /> Xóa
              </Button>
            </div>
          </div>
        ))}
      </div>
      <button className="add-button">+</button>
    </div>
  );
};

export default Customer;
