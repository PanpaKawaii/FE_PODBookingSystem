import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Table,
  Modal,
} from "antd";
import React, { useEffect, useState } from "react";
import { ReloadOutlined, StarFilled } from "@ant-design/icons";
import axios from "axios";

function Product() {
  const apiProduct = "https://localhost:7166/api/Product";

  const [product, setProduct] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formVariable] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const fetchProductData = async () => {
    try {
      const response = await axios.get(apiProduct);
      setProduct(response.data); // Lưu toàn bộ dữ liệu từ API vào state
    } catch (error) {
      console.error("Failed to fetch Product data:", error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);
  if (product.length === 0) {
    return <p>Loading...</p>;
  }

  const handleOpenModal = (record) => {
    setShowModal(true);
    if (record) {
      formVariable.setFieldsValue(record); // Gán dữ liệu sản phẩm vào form
    } else {
      formVariable.resetFields(); // Xóa form khi thêm sản phẩm mới
    }
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Chỉ giữ lại chữ số
    formVariable.setFieldsValue({
      price: formatCurrency(value),
    });
  };
  const handleHideModal = () => {
    setShowModal(false);
    formVariable.resetFields();
  };

  const handleSubmitValue = async (product) => {
    try {
      setSubmitting(true);
      if (product.id) {
        await axios.put(`${apiProduct}/${product.id}`, product); // Cập nhật sản phẩm
        message.success("Sản phẩm được cập nhật thành công");
      } else {
        await axios.post(apiProduct, product); // Thêm sản phẩm mới
        message.success("Sản phẩm được thêm thành công");
      }
      fetchProductData();
      handleHideModal();
    } catch (error) {
      console.error(error);
      message.error("Đã có lỗi xảy ra khi thêm/cập nhật sản phẩm");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${apiProduct}/${productId}`);
      message.success("Sản phẩm đã được xóa thành công");
      fetchProductData();
    } catch (error) {
      console.error("Error deleting product:", error);
      message.error("Xóa sản phẩm thất bại");
    }
  };

  const columns = [
    {
      title: "Mã Sản phẩm",
      dataIndex: "id",
      key: "id",
      hidden: "true",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (price) => formatCurrency(price),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      title: "Kho",
      dataIndex: "stock",
      key: "stock",
      align: "center",
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      key: "rating",
      align: "center",
      render: (rating) => (
        <span>
          {rating} <StarFilled style={{ color: "gold" }} />
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => handleOpenModal(record)}
            style={{ marginRight: 8 }}
          >
            Điều chỉnh
          </Button>

          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Xoá
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: "20px",
        background:
          "rgba(255, 255, 255, 0.8)" /* Nền trắng với độ trong suốt */,
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        border: "1px solid grey",
      }}
    >
      <div>
        <h1 style={{ textAlign: "center" }}>Các sản phẩm của cửa hàng</h1>
        <Button
          type="primary"
          onClick={() => handleOpenModal(null)}
          style={{ marginBottom: 16 }}
        >
          Thêm sản phẩm mới
        </Button>
      </div>
      <br />
      <Table dataSource={product} columns={columns} bordered rowKey="id" />

      <Modal
        title="Quản lý sản phẩm"
        open={showModal}
        onCancel={handleHideModal}
        onOk={() => formVariable.submit()}
        confirmLoading={submitting}
      >
        <Form form={formVariable} onFinish={handleSubmitValue}>
          <Form.Item
            name="id"
            label="Mã sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập mã sản phẩm" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm" }]}
          >
            <Input placeholder="vnđ" onChange={handlePriceChange} />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả sản phẩm" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="stock"
            label="Kho"
            rules={[
              { required: true, message: "Vui lòng nhập số lượng trong kho" },
            ]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="rating"
            label="Đánh giá"
            rules={[
              { required: true, message: "Vui lòng nhập đánh giá sản phẩm" },
            ]}
          >
            <InputNumber min={0} max={5} />
          </Form.Item>
          <Form.Item
            name="storeId"
            label="Mã cửa hàng"
            rules={[{ required: true, message: "Vui lòng nhập mã cửa hàng" }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="Mã loại sản phẩm"
            rules={[
              { required: true, message: "Vui lòng nhập mã loại sản phẩm" },
            ]}
          >
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
      <Button className="add-button" onClick={fetchProductData}>
        <ReloadOutlined />
      </Button>
    </div>
  );
}

export default Product;
