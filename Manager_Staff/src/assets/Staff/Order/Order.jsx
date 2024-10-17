import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Order.css";
import { Table, Card, Button, Space, Tag, Typography, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Order = () => {
  const [userData, setUserData] = useState([]);
  const [bookingData, setBookingData] = useState([]);

  const apiUser = "https://localhost:7166/api/User";
  const apiBooking = "https://localhost:7166/api/Booking";

  const fetchUserData = async () => {
    try {
      const response = await axios.get(apiUser);
      setUserData(response.data);
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
  const handleEditBooking = async () => {};
  useEffect(() => {
    fetchUserData();
    fetchBookingData();
  }, []);

  if (userData.length === 0 || bookingData.length === 0) {
    return <p>Loading...</p>;
  }

  // Lọc ra những user có booking
  const usersWithBookings = userData.filter((user) =>
    bookingData.some((booking) => booking.userId === user.id)
  );

  // Hàm định dạng tiền tệ
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Hàm định dạng số
  const formatNumber = (number) => {
    return new Intl.NumberFormat("vi-VN").format(number);
  };

  // Hàm định dạng ngày tháng
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const userColumns = [
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Số điện thoại", dataIndex: "phoneNumber", key: "phoneNumber" },
    {
      title: "Nhóm tài khoản",
      dataIndex: "type",
      key: "type",
      align: "center",
      render: (type) => (
        <Tag
          color={type === "VIP" ? "#F28705" : ""}
          style={{ fontSize: "14px" }}
        >
          {type}
        </Tag>
      ),
    },
    { title: "Mô tả", dataIndex: "description", key: "description" },
    {
      title: "Điểm",
      dataIndex: "point",
      key: "point",
      render: (point) => formatNumber(point),
    },
  ];

  const bookingColumns = [
    {
      title: "Ngày đặt",
      dataIndex: "date",
      key: "date",
      render: (date) => formatDate(date),
    },
    { title: "Pod ID", dataIndex: "podId", key: "podId" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Xác nhận" ? "green" : "blue"}>{status}</Tag>
      ),
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
      render: (feedback) => feedback || "Chưa có feedback",
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => handleEditBooking(record)}
            style={{ marginRight: 8 }}
          >
            Duyệt
          </Button>

          <Popconfirm
            title="Are you sure to delete this company?"
            onConfirm={() => handleDeleteBooking(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Từ chối
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const orderColumns = [
    {
      title: "OrderId",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "BookingId",
      dataIndex: "bookingId",
      key: "bookingId",
    },
    {
      title: "Ngày đặt",
      dataIndex: "date",
      key: "date",
      render: (date) => formatDate(date),
    },
    {
      title: "ProductId",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity) => formatNumber(quantity),
    },
    {
      title: "Tổng tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => formatCurrency(amount),
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Đã thanh toán" ? "seagreen" : "blue"}>
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <div className="user-manage">
      <Title level={2}>Thông tin khách hàng và đặt chỗ</Title>
      {usersWithBookings.map((user) => {
        const userBookings = bookingData.filter(
          (booking) => booking.userId === user.id
        );
        return (
          <Card
            key={user.id}
            title={`Khách hàng: ${user.name}`}
            style={{ marginBottom: 20 }}
          >
            <Table
              dataSource={[user]}
              columns={userColumns}
              pagination={false}
              rowKey="id"
            />
            <Title level={4} style={{ marginTop: 20 }}>
              Thông tin đặt chỗ
            </Title>

            {userBookings.map((booking) => (
              <Card key={booking.id} style={{ marginBottom: 10 }}>
                <Table
                  dataSource={[booking]}
                  columns={bookingColumns}
                  pagination={false}
                  rowKey="id"
                />
                <Title level={5} style={{ marginTop: 10 }}>
                  Chi tiết đơn hàng
                </Title>
                <Table
                  dataSource={booking.bookingOrders}
                  columns={orderColumns}
                  pagination={false}
                  rowKey="id"
                />
              </Card>
            ))}
          </Card>
        );
      })}
    </div>
  );
};

export default Order;
