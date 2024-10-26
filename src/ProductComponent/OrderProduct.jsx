import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Button,
  message,
  Popconfirm,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faMoneyBillWave,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const { Option } = Select;

const OrderProduct = () => {
  const apiOrderProduct = "https://localhost:7166/api/BookingOrder";
  const apiProduct = "https://localhost:7166/api/Product";

  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);
  const [nextBookingOrderId, setNextBookingOrderId] = useState(null);
  useEffect(() => {
    fetchProducts();
    fetchNextBookingOrderId();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(apiProduct);
      setProducts(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      message.error("Không thể lấy danh sách sản phẩm");
    }
  };

  const fetchNextBookingOrderId = async () => {
    try {
      const response = await axios.get(apiOrderProduct);
      const bookingOrders = response.data;
      const maxId = Math.max(...bookingOrders.map((order) => order.id), 0);
      setNextBookingOrderId(maxId + 1);
    } catch (error) {
      console.error("Lỗi khi lấy ID BookingOrder tiếp theo:", error);
      message.error("Không thể lấy ID BookingOrder tiếp theo");
    }
  };

  const onFinish = async (values) => {
    try {
      const bookingOrder = {
        ...values,
        id: nextBookingOrderId,
        date: values.date.format("YYYY-MM-DD"),
      };
      await axios.post(apiOrderProduct, bookingOrder);
      message.success("Đã thêm BookingOrder thành công!");

      form.resetFields();
      fetchNextBookingOrderId(); // Cập nhật ID cho lần thêm tiếp theo
    } catch (error) {
      console.error("Lỗi khi thêm BookingOrder:", error);
      message.error("Có lỗi xảy ra khi thêm BookingOrder");
    }
  };

  const handleProductChange = (value) => {
    const selectedProduct = products.find((p) => p.id === value);
    if (selectedProduct) {
      const quantity = form.getFieldValue("quantity") || 1;
      form.setFieldsValue({ amount: selectedProduct.price * quantity });
    }
  };

  const handleQuantityChange = (value) => {
    const productId = form.getFieldValue("productId");
    const selectedProduct = products.find((p) => p.id === productId);
    if (selectedProduct) {
      form.setFieldsValue({ amount: selectedProduct.price * value });
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "0 auto",
        padding: 24,
        backgroundColor: "#FAFBFB",
        borderRadius: 10,
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
        border: "1px solid #e0e0e0",
      }}
    >
      <h2
        style={{ textAlign: "center", marginBottom: 24, fontFamily: "Arial" }}
      >
        <ShoppingCartOutlined /> Order thêm đồ ăn, thức uống
      </h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ id: nextBookingOrderId }}
        style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}
      >
        <Form.Item name="id" label="ID BookingOrder" hidden>
          <InputNumber style={{ width: "100%" }} disabled />
        </Form.Item>
        <Form.Item
          name="productId"
          label="Sản phẩm"
          rules={[{ required: true }]}
        >
          <Select onChange={handleProductChange}>
            {products.map((product) => (
              <Option key={product.id} value={product.id}>
                {product.name} - {formatCurrency(product.price)}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Số lượng"
          rules={[{ required: true }]}
        >
          <InputNumber
            min={1}
            onChange={handleQuantityChange}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          name="bookingId"
          label="Booking ID"
          rules={[{ required: true }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="date" label="Ngày" rules={[{ required: true }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true }]}
        >
          <Select>
            {/* <Option value="Chưa thanh toán">Chưa thanh toán</Option> */}
            <Option value="Đã thanh toán">Đã thanh toán</Option>
          </Select>
        </Form.Item>
        <Form.Item name="amount" label="Tổng tiền">
          <InputNumber
            style={{ width: "100%" }}
            formatter={(value) => formatCurrency(value)}
            parser={(value) => value.replace(/[^\d]/g, "")}
            readOnly
          />
        </Form.Item>
        <Form.Item>
          <Popconfirm
            title="Bạn có chắc chắn muốn thêm BookingOrder này không?"
            onConfirm={() => form.submit()}
            okText="Có"
            cancelText="Không"
          >
            <Button
              type="primary"
              icon={<FontAwesomeIcon icon={faBoxOpen} />}
              block
            >
              Thêm BookingOrder
            </Button>
          </Popconfirm>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OrderProduct;
