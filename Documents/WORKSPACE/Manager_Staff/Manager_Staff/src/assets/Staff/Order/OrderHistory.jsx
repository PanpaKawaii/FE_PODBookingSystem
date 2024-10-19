import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Order.css";
import { Table, Card, Button, Tag, Typography, Modal, Input } from "antd";
import { SearchOutlined, EyeOutlined } from "@ant-design/icons";

const { Title } = Typography;

const OrderHistory = () => {
  const [userData, setUserData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [orderData, setOrderData] = useState([]); // Sửa từ setOderData thành setOrderData

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null); // Quản lý modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const apiUser = "https://localhost:7166/api/User";
  const apiBooking = "https://localhost:7166/api/Booking";
  const apiPayment = "https://localhost:7166/api/Payment";
  const apiOrder = "https://localhost:7166/api/BookingOrder"; // API đúng cho order
  const apiProduct = "https://localhost:7166/api/Product"; // API đúng cho sản phẩm

  const fetchUserData = async () => {
    try {
      const response = await axios.get(apiUser);
      setUserData(response.data.filter((user) => user.role === "User"));
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const fetchBookingData = async () => {
    try {
      const response = await axios.get(apiBooking);
      setBookingData(response.data);
    } catch (error) {
      console.error("Failed to fetch booking data:", error);
    }
  };

  const fetchOrderData = async () => {
    try {
      const response = await axios.get(apiOrder);
      setOrderData(response.data); // Lưu dữ liệu Order
    } catch (error) {
      console.error("Failed to fetch order data:", error);
    }
  };

  const fetchProductData = async () => {
    try {
      const response = await axios.get(apiProduct);
      setProductData(response.data); // Lưu dữ liệu Product
    } catch (error) {
      console.error("Failed to fetch product data:", error);
    }
  };

  const fetchPaymentData = async () => {
    try {
      const response = await axios.get(apiPayment);
      setPaymentData(response.data);
    } catch (error) {
      console.error("Failed to fetch payment data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchBookingData();
    fetchPaymentData();
    fetchOrderData(); // Thêm fetchOrderData
    fetchProductData();
  }, []);
  if (
    userData.length === 0 &&
    bookingData.length === 0 &&
    paymentData.length === 0 &&
    productData.length === 0 &&
    orderData.length === 0
  ) {
    return <p>Loading...</p>;
  }

  // Lọc dữ liệu người dùng theo từ khóa tìm kiếm
  const filteredUsers = userData.filter(
    (user) => user.phoneNumber.includes(searchTerm)
    // ||
    //   user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Lọc danh sách bookings cho người dùng
  const filteredBookings = bookingData.filter((booking) =>
    filteredUsers.some((user) => user.id === booking.userId)
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedBooking(null);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat("vi-VN").format(number);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // Hàm để render trạng thái đơn hàng
  const renderOrderStatus = (status) => {
    return <Tag color="seagreen">{status}</Tag>;
  };

  const userColumns = [
    { title: "Booking ID", dataIndex: "id", key: "id", align: "center" },
    {
      title: "Ngày đặt",
      dataIndex: "date",
      key: "date",
      render: (date) => formatDate(date),
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        const user = filteredUsers.find((u) => u.id === record.userId);
        return user ? user.name : "Không xác định";
      },
    },
    {
      title: "Số điện thoại",
      key: "phoneNumber",
      align: "center",
      render: (_, record) => {
        const user = filteredUsers.find((u) => u.id === record.userId);
        return user ? user.phoneNumber : "Không xác định";
      },
    },
    {
      title: "Nhóm tài khoản",
      key: "type",
      align: "center",
      filters: [
        {
          text: "V.I.P",
          value: "VIP",
        },
        {
          text: "Khách hàng thường",
          value: "Regular",
        },
      ],
      onFilter: (value, record) => {
        const user = filteredUsers.find((u) => u.id === record.userId);
        return user ? user.type === value : false;
      },
      render: (_, record) => {
        const user = filteredUsers.find((u) => u.id === record.userId);
        return user ? (
          <Tag color={user.type === "VIP" ? "#FFD700" : "blue"}>
            {user.type}
          </Tag>
        ) : (
          "Không xác định"
        );
      },
    },

    {
      title: "Hành động",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Button
          icon={<EyeOutlined />}
          onClick={() => handleViewDetails(record)}
        >
          Xem
        </Button>
      ),
    },
  ];

  // Modal content hiển thị trạng thái đơn hàng và phương thức thanh toán
  const modalContent = selectedBooking ? (
    <div>
      <p>
        <strong>Booking ID : </strong> {selectedBooking.id}
      </p>
      <p>
        <strong>Ngày đặt : </strong> {formatDate(selectedBooking.date)}
      </p>
      <p>
        <strong>Tên khách hàng : </strong>{" "}
        {userData.find((user) => user.id === selectedBooking.userId)?.name}
      </p>
      <p>
        <strong>Email : </strong>{" "}
        {userData.find((user) => user.id === selectedBooking.userId)?.email}
      </p>
      <p>
        <strong>Số điện thoại : </strong>{" "}
        {
          userData.find((user) => user.id === selectedBooking.userId)
            ?.phoneNumber
        }
      </p>
      <p>
        <strong>Điểm tích lũy : </strong>{" "}
        {formatNumber(
          userData.find((user) => user.id === selectedBooking.userId)?.point
        )}
      </p>
      <p>
        <strong>Pod ID :</strong> {selectedBooking.podId}
      </p>
      <p>
        <strong>Trạng thái :</strong>{" "}
        {renderOrderStatus(selectedBooking.status)}
      </p>
      <p>
        <strong>Phương thức thanh toán:</strong>{" "}
        {paymentData.find((payment) => payment.bookingId === selectedBooking.id)
          ?.method || "Không có thông tin"}
      </p>
      {selectedBooking.bookingOrders?.map((order) => {
        const product = productData.find(
          (product) =>
            product.id === order.productId &&
            selectedBooking.id === order.bookingId
        );

        return (
          <div key={order.id}>
            <p>
              <strong>Đồ thêm:</strong>
            </p>
            <p>- Mã sản phẩm : {order.productId}</p>
            <p>- Sản phẩm : {product ? product.name : "Không có thông tin"}</p>
            <p>- Số lượng : {formatNumber(order.quantity)}</p>
            <p>- Tổng tiền : {formatCurrency(order.amount)}</p>
            <p>
              <strong>Trạng thái đơn hàng:</strong>{" "}
              {renderOrderStatus(order.status)}
            </p>
          </div>
        );
      })}
    </div>
  ) : null;

  return (
    <div className="user-manage">
      <Title style={{ textAlign: "center" }} level={2}>
        Lịch sử đơn hàng
      </Title>
      <Input
        placeholder="Tìm kiếm theo số điện thoại "
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: 20 }}
        prefix={<SearchOutlined />}
      />
      <Table
        dataSource={filteredBookings}
        columns={userColumns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        bordered
      />
      <Modal
        title={
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
              borderBottom: "1px solid black",
              paddingBottom: "4px",
            }}
          >
            Chi tiết đơn hàng
          </div>
        }
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        {modalContent}
      </Modal>
    </div>
  );
};

export default OrderHistory;
