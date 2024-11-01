import React, { useState, useEffect, useRef } from "react";
import "./UserManage.css";
import Button from "react-bootstrap/Button";
import api from "../api/axios";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
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

  // Tạo ref cho các input
  const inputRefs = {
    name: useRef(null),
    email: useRef(null),
    phoneNumber: useRef(null),
    type: useRef(null),
    password: useRef(null),
    image: useRef(null), // Thêm ref cho trường hình ảnh
    description: useRef(null),
  };

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

    // Kiểm tra các trường input
    const missingFields = [];
    if (!name) {
      missingFields.push("Tên");
      inputRefs.name.current.focus();
    }
    if (!email) {
      missingFields.push("Email");
      if (missingFields.length === 1) inputRefs.email.current.focus();
    }
    if (!phoneNumber) {
      missingFields.push("Số điện thoại");
      if (missingFields.length === 1) inputRefs.phoneNumber.current.focus();
    }
    if (!type) {
      missingFields.push("Loại tài khoản");
      if (missingFields.length === 1) inputRefs.type.current.focus();
    }
    if (!password) {
      missingFields.push("Mật khẩu");
      if (missingFields.length === 1) inputRefs.password.current.focus();
    }
    if (!image) {
      missingFields.push("Hình ảnh");
      if (missingFields.length === 1) inputRefs.image.current.focus(); // Tập trung vào trường hình ảnh
    }
    if (!description) {
      missingFields.push("Mô tả");
      if (missingFields.length === 1) inputRefs.description.current.focus();
    }

    if (missingFields.length > 0) {
      message.error(`Vui lòng nhập: ${missingFields.join(", ")}`);
      return;
    }

    const newStaff = {
      id: maxId + 1, // Tự động tăng ID
      email: email,
      password: password,
      name: name,
      image: image, // Bao gồm hình ảnh
      role: "Staff", // Đặt vai trò là "Staff"
      type: type,
      phoneNumber: phoneNumber,
      point: Number(point), // Chuyển đổi thành số
      description: description,
    };

    try {
      const response = await api.post("/User", newStaff); // Gửi yêu cầu POST đến API
      console.log("Nhân viên mới đã được thêm:", response.data);
      message.success("Thêm nhân viên thành công!");
      navigate("/staff"); // Chuyển hướng đến trang danh sách nhân viên
    } catch (err) {
      console.error("Lỗi khi thêm nhân viên:", err);
      if (err.response) {
        console.error("Phản hồi từ server:", err.response.data);
        message.error(`Có lỗi xảy ra: ${err.response.data.message || "Vui lòng kiểm tra lại thông tin."}`);
      } else {
        message.error("Có lỗi xảy ra khi thêm nhân viên.");
      }
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
            ref={inputRefs.name}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ref={inputRefs.email}
          />
        </Form.Group>
        <Form.Group controlId="formPhoneNumber">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập số điện thoại"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            ref={inputRefs.phoneNumber}
          />
        </Form.Group>
        <Form.Group controlId="formType">
          <Form.Label>Loại tài khoản</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập loại tài khoản"
            value={type}
            onChange={(e) => setType(e.target.value)}
            ref={inputRefs.type}
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
            ref={inputRefs.password}
          />
        </Form.Group>
        <Form.Group controlId="formImage">
          <Form.Label>Hình ảnh</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập đường dẫn hình ảnh"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            ref={inputRefs.image}
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Mô tả</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập mô tả"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            ref={inputRefs.description}
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
