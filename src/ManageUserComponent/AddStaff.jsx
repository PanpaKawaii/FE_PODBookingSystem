import React, { useState, useEffect } from "react";
import "./UserManage.css";
import Button from "react-bootstrap/Button";
import api from "../api/axios";
import { Form } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { message } from "antd";

const AddStaff = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [type, setType] = useState("VIP"); // Đặt giá trị mặc định là "VIP"
  const [point, setPoint] = useState(10000); // Đặt giá trị mặc định là 10000
  const [maxId, setMaxId] = useState(0);
  const [password, setPassword] = useState(""); // New state for password
  const [image, setImage] = useState(""); // New state for image
  const [description, setDescription] = useState(""); // New state for description
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMaxStaffId = async () => {
      try {
        const staffResponse = await api.get("User");
        const maxId = Math.max(
          ...staffResponse.data.map((staff) => staff.id),
          0
        );
        console.log(`Max Staff ID: ${maxId}`);
        setMaxId(maxId);
      } catch (err) {
        console.error("Error fetching Staff list:", err);
      }
    };
    fetchMaxStaffId();
  }, []);

  const handleAddStaff = async (e) => {
    e.preventDefault();
    const newStaff = {
      id: maxId + 1,
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      type: type,
      point: point,
      role: "Staff",
      password: password, // Include password
      image: image, // Include image
      description: description, // Include description
    };
    try {
      const response = await api.post("/User", newStaff);
      console.log("Nhân viên mới đã được thêm:", response.data);
      message.success("Thêm nhân viên thành công!");
      navigate("/staff");
    } catch (err) {
      console.error("Lỗi khi thêm nhân viên:", err);
    }
  };

  return (
    <>
      <Form onSubmit={handleAddStaff}>
        <Form.Group controlId="formName">
          <Form.Label>Tên</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPhoneNumber">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập số điện thoại"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formType">
          <Form.Label>Loại tài khoản</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập loại tài khoản"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPoint">
          <Form.Label>Điểm thưởng</Form.Label>
          <Form.Control
            type="number"
            placeholder="Nhập điểm thưởng"
            value={point}
            onChange={(e) => setPoint(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formImage">
          <Form.Label>Hình ảnh</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập URL hình ảnh"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Mô tả</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập mô tả"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ marginTop: "20px" }}>
          Thêm Nhân Viên
        </Button>
      </Form>
    </>
  );
};

export default AddStaff;
