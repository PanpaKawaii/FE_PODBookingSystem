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
import { Link } from "react-router-dom";

function Product() {
  const apiProduct = "https://localhost:7166/api/Product";
  const apiCategory = "https://localhost:7166/api/Category";
  const apiStore = "https://localhost:7166/api/Store";
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [store, setStore] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formVariable] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [maxProductId, setMaxProductId] = useState(0);

  const fetchStoreData = async () => {
    try {
      const response = await axios.get(apiStore);
      setStore(response.data);
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
  };


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
        categoryStatus:
          product.stock === 0
            ? "Đã hết"
            : categoryResponse.data.find((cat) => cat.id === product.categoryId)
              ?.status || "Không xác định",
      }));

      setProduct(productsWithCategory);
      const maxId = Math.max(...productsWithCategory.map((p) => p.id), 0);
      setMaxProductId(maxId);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      message.error("Không thể tải dữ liệu");
    }
  };

  useEffect(() => {
    fetchProductData();
    fetchStoreData();
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
        price: formatInputPrice(record.price),
      });
    } else {
      formVariable.resetFields();
    }
  };

  // Định dạng giá tiền cho hiển thị trong bảng
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Định dạng giá tiền cho input
  const formatInputPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    formVariable.setFieldsValue({
      price: formatInputPrice(value),
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
      title: "Trạng thái",
      dataIndex: "categoryStatus",
      key: "categoryStatus",
      align: "center",
      render: (status, record) => (
        <span
          style={{
            color: record.stock === 0 ? "red" : "green",
            fontWeight: "bold",
          }}
        >
          {status}
        </span>
      ),
      filters: [
        { text: "Vẫn còn", value: "Vẫn còn" },
        { text: "Đã hết", value: "Đã hết" },
      ],
      onFilter: (value, record) => record.categoryStatus === value,
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
          <button className="one-button"

            onClick={() => handleOpenModal(record)}
            style={{ marginRight: 8 }}
          >
            <EditFilled />
          </button>

          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <button className="one-button" >
              <DeleteFilled />
            </button>
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
      <div className="title-store">
        <h1 >
          Các sản phẩm kèm
        </h1>
        <Link to="/addproduct">
          <Button type="primary" >
            <PlusCircleFilled />
            Thêm sản phẩm mới
          </Button>
        </Link>
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
        width={470}
      >
        <Form
          form={formVariable}
          onFinish={handleSubmitValue}
          style={{ padding: "10px 10px" }}
        >
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
              placeholder="VNĐ"
              onChange={handlePriceChange}
              step={10000}
              min={0}
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
              {store.map((store) => (
                <Select.Option key={store.id} value={store.id}>
                  {store.name}
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