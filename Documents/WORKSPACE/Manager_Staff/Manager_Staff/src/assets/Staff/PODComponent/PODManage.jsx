import React, { useEffect, useState } from "react";
import {
  Table,
  message,
  Popconfirm,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Tag,
  InputNumber,
} from "antd";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faStar } from "@fortawesome/free-solid-svg-icons";
import { ReloadOutlined, LoadingOutlined } from "@ant-design/icons";
import "./PODManage.css";
import des from "../ManagerImage/POD.jpg";

export default function PODManage() {
  const [podData, setPodData] = useState([]);
  const [storeData, setStoreData] = useState([]);
  const [utilityData, setUtilityData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const apiPod = "https://localhost:7166/api/Pod";
  const apiStore = "https://localhost:7166/api/Store";
  const apiUtility = "https://localhost:7166/api/Utility";
  const fetchPODData = async () => {
    try {
      const response = await axios.get(apiPod);
      setPodData(response.data);
    } catch (error) {
      console.error("Failed to fetch POD data:", error);
      message.error("Không thể tải dữ liệu POD");
    }
  };
  const fetchStoreData = async () => {
    try {
      const response = await axios.get(apiStore);
      setStoreData(response.data);
    } catch (error) {
      console.error("Failed to fetch Store data:", error);
      message.error("Không thể tải dữ liệu Store");
    }
  };
  const fetchUtilityData = async () => {
    try {
      const response = await axios.get(apiUtility);
      setUtilityData(response.data);
    } catch (error) {
      console.error("Failed to fetch Utility data:", error);
      message.error("Không thể tải dữ liệu Utility");
    }
  };
  const handleDelete = async (podId) => {
    try {
      await axios.delete(`${apiPod}/${podId}`);
      message.success("Xoá thành công");
      fetchPODData();
    } catch (error) {
      console.error("Error deleting POD:", error);
      message.error("Xoá không thành công");
    }
  };

  const handleEdit = async (values) => {
    try {
      setLoading(true);
      const podId = form.getFieldValue("id");
      const podData = {
        id: podId,
        name: values.name,
        image: values.image,
        description: values.description,
        rating: values.rating,
        status: values.status,
        typeId: values.typeId,
        storeId: values.storeId,
        utilityId: values.utilityId ? [values.utilityId] : [0], // Chuyển đổi thành mảng với giá trị mặc định là [0]
      };
      const response = await axios.put(`${apiPod}/${podId}`, podData);
      message.success("Thông tin POD được cập nhật thành công");
      fetchPODData();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Chi tiết lỗi:", error.response?.data);
      message.error(`Lỗi: ${error.response?.data?.title || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPODData();
    fetchStoreData();
    fetchUtilityData();
  }, []);

  if (
    podData.length === 0 &&
    storeData.length === 0 &&
    utilityData.length === 0
  ) {
    return (
      <p>
        Loading... <LoadingOutlined />
      </p>
    );
  }
  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "image", // Thêm dataIndex
      key: "image",
      render: (
        image // Thay đổi render để nhận image từ data
      ) => (
        <img
          src={image || "https://placehold.co/100x100"} // Thêm ảnh placeholder nếu không có image
          alt="POD"
          style={{
            width: 100,
            height: 100,
            objectFit: "cover",
            borderRadius: "8px", // Thêm bo góc cho đẹp
          }}
          onError={(e) => {
            // Xử lý khi ảnh lỗi
            e.target.onerror = null;
            e.target.src = "https://placehold.co/100x100";
          }}
        />
      ),
      width: 100,
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      hidden: true,
    },

    {
      title: "Loại POD",
      dataIndex: "typeId",
      key: "typeId",
      align: "center",
      hidden: true,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Mã cơ sở",
      dataIndex: "storeId",
      key: "storeId",
      align: "center",
      hidden: true,
    },
    {
      title: "Tiện ích",
      dataIndex: "utilityId",
      key: "utilityId",
      align: "center",
      hidden: true,
    },
    {
      title: "Cửa hàng",
      dataIndex: "storeId",
      key: "storeName",
      align: "center",
      filters: storeData.map((store) => ({
        // Tạo filters động từ storeData
        text: store.name,
        value: store.id, // Sử dụng store.id làm value
      })),
      onFilter: (value, record) => {
        // So sánh storeId của record với value (store.id) từ filter
        return record.storeId === value;
      },
      render: (storeId) => {
        const store = storeData.find((store) => store.id === storeId);
        return store ? store.name : "Không có dữ liệu";
      },
    },
    {
      title: "Hình ảnh cửa hàng",
      dataIndex: "storeId",
      key: "storeImage",
      render: (storeId) => {
        const store = storeData.find((store) => store.id === storeId);
        return (
          <img
            src={store?.image || "https://placehold.co/100x100"}
            alt="Store"
            style={{
              width: 100,
              height: 100,
              objectFit: "cover",
              borderRadius: "8px",
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/100x100";
            }}
          />
        );
      },
      width: 100,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      filters: [
        { text: "Còn trống", value: "Còn trống" },
        { text: "Đang sử dụng", value: "Đang sử dụng" },
      ],
      onFilter: (value, record) => record.status.includes(value),
      render: (status) => (
        <span
          style={{
            color: status === "Đang hoạt động" ? "#64A587" : "#fb8b24 ",
            fontSize: "15px",
            fontStyle: "italic",
            fontWeight: "500",
          }}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      key: "rating",
      align: "center",
      render: (rating) => (
        <>
          {rating}{" "}
          <FontAwesomeIcon icon={faStar} style={{ color: "#F2D338" }} />
        </>
      ),
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: "Điều chỉnh",
      key: "id",
      dataIndex: "id",
      align: "center",
      render: (id, record) => (
        <div className="action-buttons">
          <Button
            onClick={() => {
              setIsModalVisible(true);
              form.setFieldsValue(record);
            }}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "black",
            }}
          >
            <FontAwesomeIcon style={{ color: "black" }} icon={faEdit} />
          </Button>
        </div>
      ),
      width: 100,
    },
  ];

  return (
    <>
      <h1 style={{ textAlign: "center", fontFamily: "Arial", fontSize: 30 }}>
        Quản lí POD
      </h1>
      <Table
        columns={columns}
        dataSource={podData}
        rowKey="id"
        pagination={{ pageSize: 4 }}
        bordered
        scroll={{ x: 1000 }}
        style={{
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          padding: "20px 20px 0px 20px",
          borderRadius: "10px",
          backgroundColor: "#F5F5F5",
          border: "1px solid #E0E0E0",
        }}
      />

      <Modal
        title="Chỉnh sửa POD"
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        confirmLoading={loading}
      >
        <Form form={form} onFinish={handleEdit} layout="vertical">
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Hình ảnh">
            <Input readOnly /> {/* Thêm readOnly để không cho chỉnh sửa */}
          </Form.Item>
          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true, message: "Vui lòng nhập tên POD" }]}
          >
            <Input readOnly />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả POD" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="rating"
            label="Đánh giá"
            rules={[{ required: true, message: "Vui lòng nhập đánh giá" }]}
          >
            <InputNumber min={1} max={5} step={1} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
          >
            <Select>
              <Select.Option value="Còn trống">Còn trống</Select.Option>
              <Select.Option value="Đang sử dụng">Đang sử dụng</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="typeId"
            label="Loại POD"
            rules={[{ required: true, message: "Vui lòng chọn loại POD" }]}
          >
            <Select>
              <Select.Option value={1}>Loại 1</Select.Option>
              <Select.Option value={2}>Loại 2</Select.Option>
              <Select.Option value={3}>Loại 3</Select.Option>
              <Select.Option value={4}>Loại 4</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="storeId"
            label="Cơ sở"
            rules={[{ required: true, message: "Vui lòng chọn cơ sở" }]}
          >
            <Select>
              {storeData.map((store) => (
                <Select.Option key={store.id} value={store.id}>
                  {store.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="utilityId"
            label="Tiện ích"
            rules={[{ required: true, message: "Vui lòng chọn tiện ích" }]}
          >
            <Select>
              {utilityData.map((utility) => (
                <Select.Option key={utility.id} value={utility.id}>
                  {utility.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Lưu thay đổi
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
