import React, { useState, useEffect, useRef } from "react";
import api from "../../AdminComponent/api/axios";
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
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [maxId, setMaxId] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  // Tạo ref cho các input
  const inputRefs = {
    name: useRef(null),
    image: useRef(null),
    description: useRef(null),
    selectedType: useRef(null),
    selectedStore: useRef(null),
    capacity: useRef(null),
    selectedUtility: useRef(null),
  };

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
    setErrorMessage("");


    // Kiểm tra các trường nhập liệu
    const missingFields = [];
    if (!name) {
      missingFields.push("Tên");
      inputRefs.name.current.focus(); // Tập trung vào trường đầu tiên còn trống
    }
    if (!image) {
      missingFields.push("Ảnh");
      if (missingFields.length === 1) inputRefs.image.current.focus(); // Tập trung vào trường đầu tiên còn trống
    }
    if (!description) {
      missingFields.push("Mô tả");
      if (missingFields.length === 1) inputRefs.description.current.focus(); // Tập trung vào trường đầu tiên còn trống
    }
    if (!selectedType) {
      missingFields.push("Loại POD");
      if (missingFields.length === 1) inputRefs.selectedType.current.focus(); // Tập trung vào trường đầu tiên còn trống
    }
    if (!selectedStore) {
      missingFields.push("Cửa hàng");
      if (missingFields.length === 1) inputRefs.selectedStore.current.focus(); // Tập trung vào trường đầu tiên còn trống
    }
    if (!capacity) {
      missingFields.push("Số người");
      if (missingFields.length === 1) inputRefs.capacity.current.focus(); // Tập trung vào trường đầu tiên còn trống
    }
    if (!selectedUtility) {
      missingFields.push("Nội thất");
      if (missingFields.length === 1) inputRefs.selectedUtility.current.focus(); // Tập trung vào trường đầu tiên còn trống
    }

    // Nếu có trường nào bị thiếu, hiển thị thông báo
    if (missingFields.length > 0) {
      message.error(`Vui lòng nhập: ${missingFields.join(", ")}`); // Thông báo lỗi
      return; // Dừng lại nếu có trường thiếu
    }

    const newPod = {
      id: maxId + 1,
      name: name,
      image: image,
      description: description,
      rating: 0,
      status: "Available",
      typeId: selectedType ? parseInt(selectedType) : 0,
      storeId: selectedStore ? parseInt(selectedStore) : 0,
      utilityId: selectedUtility ? [parseInt(selectedUtility)] : [],
    };
    console.log("Dữ liệu POD mới:", newPod);

    try {
      console.log(newPod);
      const response = await api.post("/Pod", newPod);
      console.log("Pod đã được thêm thành công:", response.data);
      message.success("Pod đã được thêm thành công!");
      setName("");
      setImage("");
      setDescription("");
      setSelectedType("");
      setSelectedStore("");
      setSelectedUtility("");
      navigate("/pod");
    } catch (error) {
      console.error("Lỗi khi thêm Pod:", error);
      message.error("Không thể thêm Pod. Vui lòng thử lại.");
      if (error.response) {
        console.error("Dữ liệu phản hồi:", error.response.data);
        message.error("Không thể thêm Pod. Vui lòng thử lại."); // Thông báo lỗi từ server
      } else {
        message.error("Có lỗi xảy ra. Vui lòng thử lại."); // Thông báo lỗi chung
      }
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
          ref={inputRefs.selectedStore} // Gán ref cho trường này
          required
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
          ref={inputRefs.name} // Gán ref cho trường này
          required
        />
      </Form.Group>

      <Form.Group controlId="formImage">
        <Form.Label>Ảnh</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nhập URL hình ảnh"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          ref={inputRefs.image} // Gán ref cho trường này
          required
        />
      </Form.Group>

      <Form.Group controlId="formDescription">
        <Form.Label>Mô tả</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nhập mô tả"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          ref={inputRefs.description} // Gán ref cho trường này
          required
        />
      </Form.Group>

      <Form.Group controlId="formType">
        <Form.Label>Loại POD</Form.Label>
        <Form.Control
          as="select"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          ref={inputRefs.selectedType} // Gán ref cho trường này
          required
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
          ref={inputRefs.capacity} // Gán ref cho trường này
          required
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
          ref={inputRefs.selectedUtility} // Gán ref cho trường này
          required
        >
          <option value="">Chọn nội thất</option>
          {utility.map((utility) => (
            <option key={utility.id} value={utility.id}>
              {utility.name}
            </option>
          ))}
        </Form.Control>
        {errorMessage && (
          <div style={{ color: "red", marginTop: "10px" }}>
            {errorMessage}
          </div>
        )}
      </Form.Group>

      <Button  variant="primary" type="submit">
        Thêm POD
      </Button>
    </Form>
  );
}
