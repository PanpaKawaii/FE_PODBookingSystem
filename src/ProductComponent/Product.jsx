import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Table,
  Modal,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  DeleteFilled,
  EditFilled,
  PlusCircleFilled,
  ReloadOutlined,
  StarFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import axios from "axios";
import "./Product.css";

function Product() {
  const apiProduct = "https://localhost:7166/api/Product";
  const apiCategory = "https://localhost:7166/api/Category";
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formVariable] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [maxProductId, setMaxProductId] = useState(0);

  const storeOptions = [
    { value: 1, label: "Cơ sở 1" },
    { value: 2, label: "Cơ sở 2" },
  ];

  const fetchProductData = async () => {
    try {
      const productResponse = await axios.get(apiProduct);
      const categoryResponse = await axios.get(apiCategory);

      setCategory(categoryResponse.data);

      const productsWithCategory = productResponse.data.map((product) => ({
        ...product,
        categoryName:
          categoryResponse.data.find((cat) => cat.id === product.categoryId)
            ?.name || "Không xác định",
      }));

      setProduct(productsWithCategory);
      // Tìm ID lớn nhất
      const maxId = Math.max(...productsWithCategory.map((p) => p.id), 0);
      setMaxProductId(maxId);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      message.error("Không thể tải dữ liệu");
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);
  if (category.length === 0 && product.length === 0) {
    return (
      <p>
        Loading... <LoadingOutlined />
      </p>
    );
  }
  const handleOpenModal = (record) => {
    setShowModal(true);
    setEditingProduct(record);
    if (record) {
      formVariable.setFieldsValue({
        ...record,
        price: formatCurrency(record.price),
      });
    } else {
      formVariable.resetFields();
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    formVariable.setFieldsValue({
      price: formatCurrency(value),
    });
  };

  const handleHideModal = () => {
    setShowModal(false);
    formVariable.resetFields();
    setEditingProduct(null);
  };

  const handleSubmitValue = async (values) => {
    try {
      setSubmitting(true);
      let productData = { ...values };

      if (!editingProduct) {
        // Nếu đang thêm mới, tạo ID mới
        productData.id = maxProductId + 1;
        setMaxProductId(productData.id);
      }

      productData.price = parseFloat(productData.price.replace(/[^\d]/g, ""));

      ["stock", "rating", "storeId", "categoryId"].forEach((field) => {
        if (productData[field]) {
          productData[field] = Number(productData[field]);
        }
      });

      console.log("Dữ liệu gửi đi:", productData);

      if (editingProduct) {
        await axios.put(`${apiProduct}/${editingProduct.id}`, productData);
        message.success("Sản phẩm được cập nhật thành công");
      } else {
        const response = await axios.post(apiProduct, productData);
        message.success(
          `Sản phẩm được thêm thành công với id: ${response.data.id}`
        );
      }
      fetchProductData();
      handleHideModal();
    } catch (error) {
      console.error("Chi tiết lỗi:", error.response?.data);
      message.error(`Lỗi: ${error.response?.data?.message || error.message}`);
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
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (price) => formatCurrency(price),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Danh mục",
      dataIndex: "categoryName",
      key: "categoryName",
      align: "center",
      filters: category.map((cat) => ({ text: cat.name, value: cat.name })),
      onFilter: (value, record) => record.categoryName.includes(value),
    },
    {
      title: "Kho",
      dataIndex: "stock",
      key: "stock",
      align: "center",
      sorter: (a, b) => a.stock - b.stock,
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
      sorter: (a, b) => a.rating - b.rating,
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
            <EditFilled />
            Điều chỉnh
          </Button>

          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              <DeleteFilled />
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
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
        backgroundColor: "#F5F5F5",
      }}
    >
      <div>
        <h1 style={{ textAlign: "center", fontFamily: "Arial", fontSize: 30 }}>
          Các sản phẩm kèm
        </h1>
        <Button
          type="primary"
          onClick={() => handleOpenModal(null)}
          style={{ marginBottom: 10 }}
        >
          <PlusCircleFilled />
          Thêm sản phẩm mới
        </Button>
      </div>
      <br />
      <Table
        dataSource={product}
        columns={columns}
        bordered
        rowKey="id"
        pagination={{ pageSize: 5 }}
        style={{
          border: "1px solid grey",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      />

      <Modal
        title={editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
        open={showModal}
        onCancel={handleHideModal}
        onOk={() => formVariable.submit()}
        confirmLoading={submitting}
      >
        <Form form={formVariable} onFinish={handleSubmitValue}>
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
            <Input
              placeholder="vnđ"
              onChange={handlePriceChange}
              step={10000}
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả sản phẩm" },
            ]}
          >
            <Input.TextArea />
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
            <InputNumber min={0} max={5} step={1} />
          </Form.Item>

          <Form.Item
            name="storeId"
            label="Cơ sở"
            rules={[{ required: true, message: "Vui lòng chọn cơ sở" }]}
          >
            <Select>
              {storeOptions.map((store) => (
                <Select.Option key={store.value} value={store.value}>
                  {store.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="Loại sản phẩm"
            rules={[{ required: true, message: "Vui lòng chọn loại sản phẩm" }]}
          >
            <Select>
              {category.map((cat) => (
                <Select.Option key={cat.id} value={cat.id}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Product;
