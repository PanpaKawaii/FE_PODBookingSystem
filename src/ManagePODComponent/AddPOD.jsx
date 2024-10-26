import React, { useState, useEffect } from "react";
import api from "../api/axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

export default function AddPod() {
  const [stores, setStores] = useState([]);
  const [types, setTypes] = useState([]);
  const [utility, setUtility] = useState([]);
  const [selectedUtility, setSelectedUtility] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [capacity, setCapacity] = useState("");
  const [name, setName] = useState(""); // Thêm state cho name
  const navigate = useNavigate();
  const [maxId, setMaxId] = useState(0); // Thêm state cho maxId

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storeResponse = await api.get("Store");
        setStores(storeResponse.data);

        const typeResponse = await api.get("Type");
        setTypes(typeResponse.data);

        const utilityResponse = await api.get("Utility");
        setUtility(utilityResponse.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();

    const fetchMaxPodId = async () => {
      try {
        const podResponse = await api.get("Pod");
        const maxId = Math.max(...podResponse.data.map((pod) => pod.id), 0);
        console.log(`Max Pod ID: ${maxId}`);
        setMaxId(maxId);
      } catch (err) {
        console.error("Error fetching Pod list:", err);
      }
    };
    fetchMaxPodId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPod = {
      id: maxId + 1,
      name: name,
      image: image,
      description: description,
      rating: 0, // Thêm trường rating
      status: "Available", // Thêm trường status với giá trị mặc định
      typeId: selectedType ? parseInt(selectedType) : 0,
      storeId: selectedStore ? parseInt(selectedStore) : 0,
      utilityId: selectedUtility ? [parseInt(selectedUtility)] : [],
    };
    console.log("Dữ liệu POD mới:", newPod);

    try {
      const response = await api.post("/Pod", newPod);
      console.log("Pod đã được thêm thành công:", response.data);
      message.success("Pod đã được thêm thành công!");
      navigate("/pod");
    } catch (error) {
      console.error("Lỗi khi thêm Pod:", error);
      if (error.response) {
        console.error("Dữ liệu phản hồi:", error.response.data);
        console.error("Mã trạng thái:", error.response.status);
        console.error("Headers:", error.response.headers);
      }
      message.error("Không thể thêm Pod. Vui lòng thử lại.");
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formStore">
        <Form.Label>Cửa hàng</Form.Label>
        <Form.Control
          as="select"
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
        >
          <option value="">Chọn cửa hàng</option>
          {stores.map((store) => (
            <option key={store.id} value={store.id}>
              {store.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formName">
        <Form.Label>Tên</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nhập tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formImage">
        <Form.Label>Ảnh</Form.Label>
        <Form.Control
          type="text"
          placeholder="Tải hình ảnh"
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

      <Form.Group controlId="formType">
        <Form.Label>Loại POD</Form.Label>
        <Form.Control
          as="select"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">Chọn loại</option>
          {types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formCapacity">
        <Form.Label>Số người</Form.Label>
        <Form.Control
          as="select"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        >
          <option value="">Chọn số người</option>
          {types.map((type) => (
            <option key={type.id} value={type.capacity}>
              {type.capacity}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formUtility">
        <Form.Label>Nội thất</Form.Label>
        <Form.Control
          as="select"
          value={selectedUtility}
          onChange={(e) => setSelectedUtility(e.target.value)}
        >
          <option value="">Chọn nội thất</option>
          {utility.map((utility) => (
            <option key={utility.id} value={utility.id}>
              {utility.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit">
        Thêm POD
      </Button>
    </Form>
  );
}
