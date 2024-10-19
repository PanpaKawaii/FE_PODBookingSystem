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
} from "antd";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ReloadOutlined } from "@ant-design/icons";
import "./PODManage.css";

export default function PODManage() {
  const [podData, setPodData] = useState([]);
  const [editingPod, setEditingPod] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const apiPod = "https://localhost:7166/api/Pod";

  const fetchPODData = async () => {
    try {
      const response = await axios.get(apiPod);
      setPodData(response.data);
    } catch (error) {
      console.error("Failed to fetch POD data:", error);
      message.error("Không thể tải dữ liệu POD");
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

  const handleEditPod = (pod) => {
    setEditingPod(pod);
    form.setFieldsValue(pod);
    setIsModalVisible(true);
  };

  const handleSaveEdit = async (values) => {
    try {
      await axios.put(`${apiPod}/${editingPod.id}`, values);
      message.success("Cập nhật POD thành công");
      setIsModalVisible(false);
      fetchPODData();
    } catch (error) {
      console.error("Lỗi khi cập nhật POD:", error);
      message.error("Cập nhật POD không thành công");
    }
  };

  useEffect(() => {
    fetchPODData();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Loại POD",
      dataIndex: "typeId",
      key: "typeId",
      align: "center",
    },
    {
      title: "Mã cơ sở",
      dataIndex: "storeId",
      key: "storeId",
      align: "center",
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
      title: "Chỉnh sửa",
      key: "action",
      render: (_, record) => (
        <div className="action-buttons">
          <Button onClick={() => handleEditPod(record)}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </div>
      ),
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
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSaveEdit} layout="vertical">
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
