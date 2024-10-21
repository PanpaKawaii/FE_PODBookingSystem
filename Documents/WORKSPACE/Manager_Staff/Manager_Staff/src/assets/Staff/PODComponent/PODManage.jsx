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
} from "antd";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ReloadOutlined } from "@ant-design/icons";
import "./PODManage.css";
import des from "../ManagerImage/POD.jpg";

export default function PODManage() {
  const [podData, setPodData] = useState([]);
  const [storeData, setStoreData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const apiPod = "https://localhost:7166/api/Pod";
  const apiStore = "https://localhost:7166/api/Store";

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
      console.log("Dữ liệu gửi đi:", values);

      await axios.put(`${apiPod}/${values.id}`, values);
      message.success("Cập nhật POD thành công");
      fetchPODData();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật POD:", error);
      message.error("Cập nhật POD không thành công");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPODData();
    fetchStoreData();
  }, []);

  const columns = [
    {
      title: "Hình ảnh",
      key: "image",
      render: () => (
        <img
          src={des}
          alt="POD"
          style={{ width: 100, height: 100, objectFit: "cover" }}
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
      title: "Cơ sở",
      dataIndex: "storeId", // Dùng storeId để tra cứu
      key: "storeName",
      align: "center",
      render: (storeId) => {
        const store = storeData.find((store) => store.id === storeId);
        return store ? store.name : "Không có dữ liệu";
      },
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
        <Tag color={status === "Hoạt động" ? "blue" : "green"}>{status}</Tag>
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
            style={{ backgroundColor: "cornflowerblue" }}
            onClick={() => {
              setIsModalVisible(true);
              form.setFieldsValue(record);
            }}
          >
            <FontAwesomeIcon style={{ color: "#FAFBFB" }} icon={faEdit} />
          </Button>
        </div>
      ),
      width: 100,
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={podData}
        rowKey="id"
        pagination={{ pageSize: 7 }}
        bordered
      />
      <Button className="add-button" onClick={fetchPODData}>
        <ReloadOutlined />
      </Button>

      <Modal
        title="Chỉnh sửa POD"
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        confirmLoading={loading}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleEdit} layout="vertical">
          <Form.Item name="id" label="Tên" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true, message: "Vui lòng nhập tên POD" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="typeId"
            label="Loại POD"
            rules={[{ required: true, message: "Vui lòng chọn loại POD" }]}
          >
            <Select>
              <Select.Option value={1}>Loại 1</Select.Option>
              <Select.Option value={2}>Loại 2</Select.Option>
              {/* Thêm các loại POD khác nếu cần */}
            </Select>
          </Form.Item>
          <Form.Item
            name="storeId"
            label="Mã cơ sở"
            rules={[{ required: true, message: "Vui lòng nhập mã cơ sở" }]}
          >
            <Input />
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
            name="rating"
            label="Đánh giá"
            rules={[{ required: true, message: "Vui lòng nhập đánh giá" }]}
          >
            <Input type="number" min={1} max={5} step={1} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu thay đổi
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
