import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Order.css";
import {
  Table,
  Card,
  Button,
  Tag,
  Typography,
  Modal,
  Input,
  Space,
  DatePicker,
} from "antd";
import { SearchOutlined, EyeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import {
  LoadingOutlined,
  EyeTwoTone,
  EyeInvisibleTwoTone,
} from "@ant-design/icons";
dayjs.extend(isBetween);

const { Title } = Typography;
const { RangePicker } = DatePicker;

const OrderHistory = () => {
  const [userData, setUserData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [slotData, setSlotData] = useState([]);
  const [podData, setPodData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [showRevenue, setShowRevenue] = useState(false);

  const apiUser = "https://localhost:7166/api/User";
  const apiBooking = "https://localhost:7166/api/Booking";
  const apiPayment = "https://localhost:7166/api/Payment";
  const apiOrder = "https://localhost:7166/api/BookingOrder";
  const apiProduct = "https://localhost:7166/api/Product";
  const apiSlot = "https://localhost:7166/api/Slot";
  const apiPod = "https://localhost:7166/api/Pod";
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
      setOrderData(response.data);
    } catch (error) {
      console.error("Failed to fetch order data:", error);
    }
  };

  const fetchProductData = async () => {
    try {
      const response = await axios.get(apiProduct);
      setProductData(response.data);
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
    fetchOrderData();
    fetchProductData();
    fetchSlotData();
    fetchPodData();
  }, []);

  if (
    userData.length === 0 &&
    bookingData.length === 0 &&
    paymentData.length === 0 &&
    productData.length === 0 &&
    orderData.length === 0
  ) {
    return (
      <p>
        Loading... <LoadingOutlined />
      </p>
    );
  }
  const getSlotInfo = (bookingId) => {
    const slot = slotData.find((slot) =>
      slot.bookings.some((booking) => booking.id === bookingId)
    );
    if (slot) {
      return {
        name: slot.name,
        startTime: slot.startTime,
        endTime: slot.endTime,
      };
    }
    return null;
  };
  const filteredUsers = userData.filter((user) =>
    user.phoneNumber.includes(searchTerm)
  );

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
    return dayjs(dateString).format("DD/MM/YYYY");
  };

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
      title: "Slot",
      key: "slot",
      render: (_, record) => {
        const slotInfo = getSlotInfo(record.id);
        return slotInfo
          ? `${slotInfo.name} (${slotInfo.startTime}:00 - ${slotInfo.endTime}:00)`
          : "Không có thông tin";
      },
    },
    {
      title: "Nhóm tài khoản",
      key: "type",
      align: "center",
      filters: [
        { text: "V.I.P", value: "VIP" },
        { text: "Khách hàng thường", value: "Regular" },
      ],
      onFilter: (value, record) => {
        const user = filteredUsers.find((u) => u.id === record.userId);
        return user ? user.type === value : false;
      },
      render: (_, record) => {
        const user = filteredUsers.find((u) => u.id === record.userId);
        return user ? (
          <Tag color={user.type === "VIP" ? "#FFD700" : "cornflowerblue"}>
            {user.type}
          </Tag>
        ) : (
          "Không xác định"
        );
      },
    },
    {
      title: "Đánh giá",
      dataIndex: "feedback",
      key: "feedback",
    },
    {
      title: "Chi tiết",
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
        <strong>Pod ID :</strong> {selectedBooking.podId} -{" "}
        {podData.find((pod) => pod.id === selectedBooking.podId)?.name}
      </p>
      {(() => {
        const slotInfo = getSlotInfo(selectedBooking.id);
        return slotInfo ? (
          <div>
            <p>
              <strong>Slot:</strong> {slotInfo.name} ( {slotInfo.startTime}:00 -{" "}
              {slotInfo.endTime}:00 )
            </p>
          </div>
        ) : (
          <p>Không có thông tin slot</p>
        );
      })()}
      <p>
        <strong>Trạng thái :</strong>{" "}
        {renderOrderStatus(selectedBooking.status)}
      </p>
      <p>
        <strong>Phương thức thanh toán:</strong>{" "}
        {paymentData.find((payment) => payment.bookingId === selectedBooking.id)
          ?.method || "Không có thông tin"}
      </p>
      <p>
        <strong>Số tiền thanh toán:</strong>{" "}
        {formatCurrency(
          paymentData.find(
            (payment) => payment.bookingId === selectedBooking.id
          )?.amount || 0
        )}
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
              <strong>Trạng thái đơn hàng : </strong>{" "}
              {renderOrderStatus(order.status)}
            </p>
          </div>
        );
      })}
      <p>
        <strong>Tổng số tiền thanh toán : </strong>{" "}
        {formatCurrency(
          (paymentData.find(
            (payment) => payment.bookingId === selectedBooking.id
          )?.amount || 0) +
            (selectedBooking.bookingOrders?.reduce(
              (total, order) => total + order.amount,
              0
            ) || 0)
        )}
      </p>
    </div>
  ) : null;

  const calculateRevenue = () => {
    if (!startDate || !endDate) {
      alert("Vui lòng chọn khoảng thời gian");
      return;
    }

    const filteredPayments = paymentData.filter((payment) => {
      const paymentDate = dayjs(payment.date);
      return paymentDate.isBetween(startDate, endDate, null, "[]");
    });

    console.log("Filtered Payments:", filteredPayments);

    const dailyRevenue = {};
    filteredPayments.forEach((payment) => {
      const date = dayjs(payment.date).format("YYYY-MM-DD");
      dailyRevenue[date] = (dailyRevenue[date] || 0) + payment.amount;
    });
    setRevenueData(
      Object.entries(dailyRevenue).map(([date, amount]) => ({ date, amount }))
    );

    console.log("Revenue Data:", revenueData);
    setShowRevenue(true);
  };

  const renderRevenueTable = () => {
    const columns = [
      {
        title: "Ngày",
        dataIndex: "date",
        key: "date",
        render: (date) => formatDate(date),
      },
      {
        title: "Doanh thu",
        dataIndex: "amount",
        key: "amount",
        render: (amount) => formatCurrency(amount),
      },
    ];

    return (
      <Table
        dataSource={revenueData}
        columns={columns}
        pagination={false}
        bordered
        summary={(pageData) => {
          const total = pageData.reduce((sum, { amount }) => sum + amount, 0);
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell>
                <strong>Tổng cộng</strong>
              </Table.Summary.Cell>
              <Table.Summary.Cell>
                <strong>{formatCurrency(total)}</strong>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />
    );
  };

  return (
    <div className="user-manage">
      <Title
        style={{
          textAlign: "center",
          fontFamily: "Arial",
          fontSize: 30,
        }}
        level={2}
      >
        Lịch sử đơn hàng
      </Title>

      <Input
        placeholder="Tìm kiếm theo số điện thoại "
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: 20, height: "36px" }}
        prefix={<SearchOutlined />}
      />
      <Table
        dataSource={filteredBookings}
        columns={userColumns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        bordered
      />
      <Card title="Thống kê doanh thu" style={{ marginBottom: 20 }}>
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <RangePicker
            onChange={(dates) => {
              setStartDate(dates ? dates[0] : null);
              setEndDate(dates ? dates[1] : null);
            }}
          />
          <Space>
            <Button onClick={calculateRevenue}>
              <EyeTwoTone />
              Xem
            </Button>
            {showRevenue && (
              <Button onClick={() => setShowRevenue(false)}>
                <EyeInvisibleTwoTone />
                Ẩn
              </Button>
            )}
          </Space>
          {showRevenue && revenueData.length > 0 && renderRevenueTable()}
        </Space>
      </Card>
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
