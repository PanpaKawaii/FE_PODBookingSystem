import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import api from "../api/axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
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
      name: "Test Store",
      address: "123 Test St",
      contact: "123456789",
      image: "https://i.pinimg.com/564x/34/32/07/343207752d6e8ab0ef1a7baec5aef621.jpg",
      status: "Đang hoạt động",
    };
    try {
      console.log(newStore);
      console.log("Giá trị của image:", image);
      const response = await api.post("/Store", newStore);
      console.log("Store added successfully:", response.data);
      message.success("Store added successfully!");
      setName("");
      setAddress("");
      setContact("");
      setImage("");
      setStatus(false);
      navigate("/store");
    } catch (error) {
      console.error("Error adding Store:", error);
      if (error.response) {
        console.error("Dữ liệu phản hồi:", error.response.data);
      }
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Tên</Form.Label>
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

        <Button
          style={{ marginTop: "10px", marginLeft: "5px" }}
          variant="primary"
          type="submit"
        >
          <Link style={{ color: "#FAFBFB" }} to="/store">
            <FontAwesomeIcon className="icon" icon={faArrowAltCircleLeft} /> Trở
            về
          </Link>
        </Button>
        <Button
          style={{ marginTop: "10px", marginLeft: "20px" }}
          variant="primary"
          type="submit"
        >
          Thêm
        </Button>
      </Form>
    </>
  );
}
