import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import api from "../api/axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

export default function AddStore() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState(false);
  const [maxId, setmaxId] = useState(0);

  const [errorMessage, setErrorMessage] = useState("");

  const nameRef = useRef(null);
  const addressRef = useRef(null);
  const contactRef = useRef(null);
  const imageRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaxStoreId = async () => {
      try {
        const storeResponse = await api.get("Store");
        const maxId = Math.max(
          ...storeResponse.data.map((store) => store.id),
          0
        );
        console.log(`Max Store ID: ${maxId}`);
        setmaxId(maxId);
      } catch (err) {
        console.error("Error fetching Store list:", err);
      }
    };
    fetchMaxStoreId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const missingFields = [];
    let firstMissingFieldRef = null;

    if (!name) {
      missingFields.push("Tên");
      firstMissingFieldRef = nameRef;
    }
    if (!address) {
      missingFields.push("Địa chỉ");
      if (!firstMissingFieldRef) firstMissingFieldRef = addressRef;
    }
    if (!contact) {
      missingFields.push("Số điện thoại");
      if (!firstMissingFieldRef) firstMissingFieldRef = contactRef;
    }
    if (!image) {
      missingFields.push("URL hình ảnh");
      if (!firstMissingFieldRef) firstMissingFieldRef = imageRef;
    }

    if (missingFields.length > 0) {
      message.error(`Vui lòng nhập: ${missingFields.join(", ")}`); // Thông báo lỗi
      return; // Dừng lại nếu có trường chưa được nhập
    }
    const newStore = {
      id: maxId + 1,
      name: name,
      address: address,
      contact: contact,
      image: image,
      status: status ? "Đang hoạt động" : "Dừng hoạt động",
    };
    try {
      console.log(newStore);
      console.log("Giá trị của image:", image);
      const response = await api.post("/Store", newStore);
      console.log("Chi nhánh đã được thêm thành công:", response.data);
      message.success("Chi nhánh đã được thêm thành công!");
      setName("");
      setAddress("");
      setContact("");
      setImage("");
      setStatus(false);
      navigate("/store");
    } catch (error) {
        console.error("Lỗi khi thêm chi nhánh:", error);
        message.error("Không thể thêm chi nhánh. Vui lòng thử lại.");
      if (error.response) {
        console.error("Dữ liệu phản hồi:", error.response.data);
        message.error("Không thể thêm chi nhánh. Vui lòng thử lại.");
      } else {
        message.error("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div className="admin-store-container">
      {/* <h1>Thêm cửa hàng</h1> */}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Tên chi nhánh</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            ref={nameRef}
          />
        </Form.Group>
        <Form.Group controlId="formAddress">
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập địa chỉ"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            ref={addressRef}
          />
        </Form.Group>
        <Form.Group controlId="formPhone">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập số điện thoại"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            ref={contactRef}
          />
        </Form.Group>
        <Form.Group controlId="formImage">
          <Form.Label>URL hình ảnh</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập URL hình ảnh"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            ref={imageRef}
          />
        </Form.Group>

        <Form.Group controlId="formStatus">
          <Form.Label>Trạng thái</Form.Label>
          <Form.Check
            type="checkbox"
            label="Đang hoạt động"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
        </Form.Group>

        {errorMessage && (
          <div style={{ color: "red", marginTop: "10px" }}>
            {errorMessage}
          </div>
        )}
        <div className="back-button">
        <Button 
          
          variant="primary"
          type="submit"
        >
          <Link style={{ color: "#FAFBFB", textDecoration: "none" }} to="/store">
            Trở về
          </Link>
        </Button>
        <Button
          
          variant="primary"
          type="submit"
        >
          Thêm
        </Button>
        </div>
      </Form>
    </div>
  );
}
