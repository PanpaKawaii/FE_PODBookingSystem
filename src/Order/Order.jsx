import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Order.css";
import {
  Table,
  Card,
  Button,
  Space,
  Tag,
  Typography,
  Popconfirm,
  message,
  Modal,
  Input,
  Empty,
} from "antd";
import {
  EyeOutlined,
  SearchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const { Title } = Typography;

const Order = () => {
  const [userData, setUserData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [podData, setPodData] = useState([]);
  const [slotData, setSlotData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const apiUser = "https://localhost:7166/api/User";
  const apiBooking = "https://localhost:7166/api/Booking";
  const apiPayment = "https://localhost:7166/api/Payment";
  const apiPod = "https://localhost:7166/api/Pod";
  const apiSlot = "https://localhost:7166/api/Slot";

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

  const fetchPaymentData = async () => {
    try {
      const response = await axios.get(apiPayment);
      setPaymentData(response.data);
    } catch (error) {
      console.error("Failed to fetch payment data:", error);
    }
  };

  const fetchPodData = async () => {
    try {
      const response = await axios.get(apiPod);
      setPodData(response.data);
    } catch (error) {
      console.error("Failed to fetch pod data:", error);
    }
  };

  const fetchSlotData = async () => {
    try {
      const response = await axios.get(apiSlot);
      setSlotData(response.data);
    } catch (error) {
      console.error("Failed to fetch slot data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchBookingData();
    fetchPaymentData();
    fetchPodData();
    fetchSlotData();
  }, []);

  if (
    userData.length === 0 ||
    bookingData.length === 0 ||
    paymentData.length === 0 ||
    podData.length === 0 ||
    slotData.length === 0
  ) {
    return (
      <p>
        Loading... <LoadingOutlined />
      </p>
    );
  }

  const handleAcceptBooking = async (booking) => {
    try {
      const updatedBooking = {
        ...booking,
        status: "Xác nhận",
        feedback: booking.feedback || "",
      };

      await axios.put(`${apiBooking}/${booking.id}`, updatedBooking);

      const user = userData.find((user) => user.id === booking.userId);
      if (!user) {
        console.error("User not found");
        return;
      }

      const updatedUser = {
        ...user,
        point: user.point + 100,
      };

      await axios.put(`${apiUser}/${updatedUser.id}`, updatedUser);

      fetchUserData();
      fetchBookingData();
      message.success("Duyệt đơn thành công");
      setModalVisible(false);
    } catch (error) {
      console.error("Failed to accept booking:", error);
      message.error("Duyệt đơn thất bại");
    }
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

  const showDetailModal = (booking) => {
    setSelectedBooking(booking);
    setModalVisible(true);
  };

  const pendingBookings = bookingData
    .filter((booking) => booking.status === "Đang chờ")
    .map((booking) => ({
      ...booking,
      user: userData.find((user) => user.id === booking.userId),
      pod: podData.find((pod) => pod.id === booking.podId),
      slot: slotData.find((slot) => slot.id === booking.slotId),
    }));

  const filteredPendingBookings = pendingBookings.filter(
    (booking) =>
      booking.user &&
      (booking.user.phoneNumber.includes(searchTerm) ||
        booking.user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const mainColumns = [
    { title: "Khách hàng", dataIndex: ["user", "name"], key: "name" },
    { title: "Email", dataIndex: ["user", "email"], key: "email" },
    {
      title: "Số điện thoại",
      dataIndex: ["user", "phoneNumber"],
      key: "phoneNumber",
    },
    { title: "Mô tả", dataIndex: ["user", "description"], key: "description" },
    {
      title: "Nhóm tài khoản",
      dataIndex: ["user", "type"],
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
      onFilter: (value, record) => record.user.type === value,
      render: (type) => (
        <Tag
          style={{ fontSize: "14px" }}
          color={type === "VIP" ? "#F28705" : "cornflowerblue"}
        >
          {type}
        </Tag>
      ),
    },
    {
      title: "Ngày đặt",
      dataIndex: "date",
      key: "date",
      render: (date) => formatDate(date),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Xác nhận" ? "green" : "blue"}>{status}</Tag>
      ),
    },
    {
      title: "Đánh giá",
      dataIndex: "feedback",
      key: "feedback",
    },
    {
      title: "Chi tiết",
      key: "detail",
      align: "center",
      render: (_, record) => (
        <Button onClick={() => showDetailModal(record)} icon={<EyeOutlined />}>
          Xem
        </Button>
      ),
    },
  ];

  const userColumns = [
    { title: "Tên", dataIndex: "name", key: "name", align: "center" },
    { title: "Email", dataIndex: "email", key: "email", align: "center" },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
    },
    {
      title: "Nhóm tài khoản",
      dataIndex: "type",
      key: "type",
      align: "center",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
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
    {
      title: "Pod",
      dataIndex: "podId",
      key: "podId",
      render: (podId, record) => `${podId} - ${record.pod?.name || "N/A"}`,
    },
    {
      title: "Slot",
      dataIndex: "slotId",
      key: "slotId",
      render: (slotId, record) => {
        const slot = record.slot;
        return slot
          ? `${slot.name} (${slot.startTime}:00 - ${slot.endTime}:00)`
          : "N/A";
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Xác nhận" ? "green" : "blue"}>{status}</Tag>
      ),
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (_, booking) => {
        const payment = paymentData.find(
          (payment) => payment.bookingId === booking.id
        );
        return payment ? payment.method : "Chưa thanh toán";
      },
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
      render: (feedback) => feedback || "Chưa có feedback",
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
    <div
      style={{
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
        backgroundColor: "#F5F5F5",
      }}
    >
      <Title level={2}>Đơn đang chờ xử lý</Title>
      <Input
        placeholder="Tìm kiếm theo số điện thoại hoặc email"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: 20 }}
        prefix={<SearchOutlined />}
      />
      {pendingBookings.length === 0 ? (
        <Card>
          <Title level={4} style={{ textAlign: "center" }}>
            Hiện tại không có yêu cầu nào
          </Title>
        </Card>
      ) : filteredPendingBookings.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<span>Không tìm thấy kết quả cho "{searchTerm}"</span>}
        />
      ) : (
        <Table
          dataSource={filteredPendingBookings}
          columns={mainColumns}
          rowKey="id"
          pagination={{ pageSize: 7 }}
          bordered
        />
      )}
      <Modal
        title="Chi tiết đơn hàng"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        width={1000}
        footer={null}
      >
        {selectedBooking && (
          <>
            <Card title="Thông tin đặt chỗ" style={{ marginTop: 10 }}>
              <Table
                dataSource={[selectedBooking]}
                columns={bookingColumns}
                pagination={false}
                rowKey="id"
                bordered
              />
            </Card>
            <Card title="Chi tiết đơn hàng" style={{ marginTop: 10 }}>
              <Table
                dataSource={selectedBooking.bookingOrders}
                columns={orderColumns}
                pagination={false}
                rowKey="id"
              />
            </Card>
            <Card title="Thông tin khách hàng" style={{ marginTop: 10 }}>
              <Table
                dataSource={[selectedBooking.user]}
                columns={userColumns}
                pagination={false}
                rowKey="id"
                bordered
              />
            </Card>
            <div style={{ marginTop: 16, textAlign: "right" }}>
              <Popconfirm
                title="Bạn có chắc chắn muốn duyệt booking này?"
                onConfirm={() => handleAcceptBooking(selectedBooking)}
                okText="Đồng ý"
                cancelText="Hủy"
              >
                <Button type="primary">
                  <FontAwesomeIcon icon={faCheck} /> Duyệt
                </Button>
              </Popconfirm>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Order;
