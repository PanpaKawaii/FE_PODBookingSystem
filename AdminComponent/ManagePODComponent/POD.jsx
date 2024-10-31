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
import api from "../../AdminComponent/api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ReloadOutlined, LoadingOutlined } from "@ant-design/icons";
import "./PODManage.css";
import { Link } from "react-router-dom";

export default function POD() {
  const [podData, setPodData] = useState([]);
  const [storeData, setStoreData] = useState([]);
  const [utilityData, setUtilityData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [types, setTypes] = useState([]);

  const fetchPODData = async () => {
    try {
      const response = await api.get("Pod");
      setPodData(response.data);
    } catch (error) {
      console.error("Failed to fetch POD data:", error);
      message.error("Không thể tải dữ liệu POD");
    }
  };
  const fetchStoreData = async () => {
    try {
      const response = await api.get("Store");
      setStoreData(response.data);
    } catch (error) {
      console.error("Failed to fetch Store data:", error);
      message.error("Không thể tải dữ liệu Store");
    }
  };
  const fetchUtilityData = async () => {
    try {
      const response = await api.get("Utility");
      setUtilityData(response.data);
    } catch (error) {
      console.error("Failed to fetch Utility data:", error);
      message.error("Không thể tải dữ liệu Utility");
    }
  };
  const handleDelete = async (podId) => {
    try {
      await api.delete(`${apiPod}/${podId}`);
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
        image: values.image || "string",
        description: values.description,
        rating: values.rating,
        status: values.status,
        typeId: values.typeId,
        storeId: values.storeId,
        utilityId: values.utilityId ? [values.utilityId] : [0],
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const typeResponse = await api.get("Type");
        setTypes(typeResponse.data);
      } catch (err) {
        console.log(err);
        message.error("Có lỗi xảy ra khi lấy dữ liệu");
      }
    };
    fetchData();
  }, []);

  const getPodTypeName = (typeId) => {
    const type = types.find((t) => t.id === typeId);
    return type ? type.name : "Không có dữ liệu";
  };

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
      key: "image",
      render: (text, record) => (
        <img
          src={record.image}
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
      render: (typeId) => getPodTypeName(typeId),
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (text) => <span style={{ fontSize: "16px" }}>{text}</span>,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      align: "center",
      render: (text) => <span style={{ fontSize: "14px" }}>{text}</span>,
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
      title: "Cửa hàng",
      dataIndex: "storeId",
      key: "storeName",
      align: "center",
      render: (storeId) => {
        const store = storeData.find((store) => store.id === storeId);
        return (
          <span style={{ fontSize: "16px" }}>
            {store ? store.name : "Không có dữ liệu"}
          </span>
        );
      },
    },
    {
      title: "Tiện ích",
      dataIndex: "utilityId",
      key: "utilityId",
      align: "center",
      hidden: true,
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
        <Tag
          color={status === "Còn trống" ? "#17C3B2" : "#FE6D73"}
          style={{ fontSize: "15px" }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Điều chỉnh",
      key: "id",
      dataIndex: "id",
      align: "center",
      width: 200,
      render: (id, record) => (
        <div>
          <button className="one-button"
            onClick={() => {
              setIsModalVisible(true);
              form.setFieldsValue(record);
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div>
        <div className="title-store">
        <h1
        
        >
          Quản lí POD
          </h1>
          <Button
          type="primary"
        style={{
          marginRight: "10px",
        }}
        >
          <Link to="/addpod">Thêm POD</Link>
        </Button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <Table
            columns={columns}
            dataSource={podData}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            size="small"
            bordered
          />
        </div>

        <Modal
          title="Chỉnh sửa POD"
          visible={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            form.resetFields();
          }}
          footer={null}
          confirmLoading={loading}
          style={{ width: "1000px" }}
        >
          <Form
            form={form}
            style={{ margin: "20px 20px", width: "100%", padding: "20px 20px" }}
            onFinish={handleEdit}
            layout="vertical"
          >
            <Form.Item name="id" hidden>
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
              <button type="primary" htmlType="submit" loading={loading}>
                Lưu thay đổi
              </button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}
