import React, { useEffect, useState } from "react";
import axios from "axios";
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
  message,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  EyeTwoTone,
  EyeInvisibleTwoTone,
  ReloadOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFloppyDisk,
  faMoneyBill,
  faMoneyBillWheat,
} from "@fortawesome/free-solid-svg-icons";

const { Title } = Typography;
const { RangePicker } = DatePicker;
dayjs.extend(isBetween);

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

  // API calls
  const fetchUserData = async () => {
    try {
      const response = await axios.get(apiUser);
      const users = response.data.filter((user) => user.role === "User");
      console.log("Fetched users:", users);
      setUserData(users);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const fetchBookingData = async () => {
    try {
      const response = await axios.get(apiBooking);
      console.log("Fetched bookings:", response.data);
      setBookingData(response.data);
    } catch (error) {
      console.error("Failed to fetch booking data:", error);
    }
  };

  const fetchOrderData = async () => {
    try {
      const response = await axios.get(apiOrder);
      console.log("Fetched orders:", response.data);
      setOrderData(response.data);
    } catch (error) {
      console.error("Failed to fetch order data:", error);
    }
  };

  const fetchProductData = async () => {
    try {
      const response = await axios.get(apiProduct);
      console.log("Fetched products:", response.data);
      setProductData(response.data);
    } catch (error) {
      console.error("Failed to fetch product data:", error);
    }
  };

  const fetchPaymentData = async () => {
    try {
      const response = await axios.get(apiPayment);
      console.log("Fetched payments:", response.data);
      setPaymentData(response.data);
    } catch (error) {
      console.error("Failed to fetch payment data:", error);
    }
  };

  const fetchPodData = async () => {
    try {
      const response = await axios.get(apiPod);
      console.log("Fetched pods:", response.data);
      setPodData(response.data);
    } catch (error) {
      console.error("Failed to fetch pod data:", error);
    }
  };

  const fetchSlotData = async () => {
    try {
      const response = await axios.get(apiSlot);
      console.log("Fetched slots:", response.data);
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
  // Hàm xử lý khi người dùng chọn khoảng thời gian
  const handleDateChange = (dates) => {
    if (dates) {
      // Nếu có chọn dates thì set startDate và endDate
      setStartDate(dates[0]); // dates[0] là ngày bắt đầu
      setEndDate(dates[1]); // dates[1] là ngày kết thúc

      // Log để debug
      console.log("Selected date range:", {
        start: dates[0]?.format("YYYY-MM-DD"),
        end: dates[1]?.format("YYYY-MM-DD"),
      });
    } else {
      // Nếu không chọn dates (người dùng clear date picker) thì reset về null
      setStartDate(null);
      setEndDate(null);
      setShowRevenue(false); // Ẩn bảng doanh thu
      setRevenueData([]); // Reset dữ liệu doanh thu
    }
  };

  // Hàm làm mới dữ liệu
  const handleRefresh = async () => {
    try {
      // Hiển thị loading message
      message.loading("Đang làm mới dữ liệu...", 0);

      // Fetch lại tất cả dữ liệu cần thiết
      await Promise.all([
        fetchBookingData(),
        fetchPaymentData(),
        fetchOrderData(),
        fetchProductData(),
        fetchUserData(),
        fetchSlotData(),
        fetchPodData(),
      ]);

      // Nếu đang có khoảng thời gian được chọn thì tính toán lại doanh thu
      if (startDate && endDate) {
        calculateRevenue();
      }

      // Hiển thị thông báo thành công
      message.success("Làm mới dữ liệu thành công");
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error refreshing data:", error);
      message.error("Làm mới dữ liệu thất bại");
    } finally {
      // Đóng loading message
      message.destroy();
    }
  };
  // Helper functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return dayjs(dateString).format("DD/MM/YYYY");
  };

  const renderOrderStatus = (status) => {
    let color;
    switch (status) {
      case "Đã xác nhận":
        color = "seagreen";
        break;
      case "Chờ xác nhận":
        color = "cornflowerblue";
        break;
      case "Đã thanh toán":
        color = "seagreen";
        break;
      case "Chưa thanh toán":
        color = "orange";
        break;
      default:
        color = "cornflowerblue";
    }
    return (
      <span
        style={{
          color: color,
          fontSize: "15px",
          fontStyle: "italic",
          fontWeight: "500",
        }}
      >
        {status}
      </span>
    );
  };

  // Filtering and handlers
  const filteredUsers = userData.filter((user) =>
    user.phoneNumber.includes(searchTerm)
  );

  const filteredBookings = bookingData.filter(
    (booking) =>
      filteredUsers.some((user) => user.id === booking.userId) &&
      booking.status === "Đã xác nhận"
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewDetails = (booking) => {
    console.log("Selected booking:", booking);
    setSelectedBooking(booking);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedBooking(null);
  };

  const handleUpdatePayment = async () => {
    if (!selectedBooking) return;

    const payment = paymentData.find(
      (payment) => payment.bookingId === selectedBooking.id
    );
    if (!payment) {
      message.error("Không tìm thấy thông tin thanh toán");
      return;
    }

    const totalAmount =
      payment.amount +
      (selectedBooking.bookingOrders?.reduce(
        (total, order) => total + order.amount,
        0
      ) || 0);

    try {
      await axios.put(`${apiPayment}/${payment.id}`, {
        ...payment,
        status: "Đã thanh toán",
        amount: totalAmount,
        date: dayjs().format(),
      });

      message.success("Cập nhật thanh toán thành công");
      fetchPaymentData();
      handleCloseModal();
    } catch (error) {
      console.error("Lỗi khi cập nhật thanh toán:", error);
      message.error("Cập nhật thanh toán thất bại");
    }
  };

  // Table Columns
  const userColumns = [
    {
      title: "Booking ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Ngày đặt",
      dataIndex: "date",
      key: "date",
      render: (date) => formatDate(date),
    },
    {
      title: "Tên",
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
      hidden: true,
      render: (_, record) => {
        const slot = slotData.find((slot) =>
          slot.bookings.some((booking) => booking.id === record.id)
        );
        return slot
          ? `${slot.name} (${slot.startTime}:00 - ${slot.endTime}:00)`
          : "Không có thông tin";
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => renderOrderStatus(status),
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
          <span
            style={{
              color: user.type === "VIP" ? "#FFD700" : "cornflowerblue",
              fontSize: "17px",
              fontWeight: "bold",
              // Thêm text-shadow cho VIP để làm nổi bật
              textShadow:
                user.type === "VIP"
                  ? "0.5px 0.5px 1px rgba(0,0,0,0.2)"
                  : "none",
            }}
          >
            {user.type}
          </span>
        ) : (
          "Không xác định"
        );
      },
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

  const orderColumns = [
    { title: "OrderId", dataIndex: "id", key: "id" },
    { title: "BookingId", dataIndex: "bookingId", key: "bookingId" },
    {
      title: "Ngày đặt",
      dataIndex: "date",
      key: "date",
      render: (date) => formatDate(date),
    },
    {
      title: "Tên sản phẩm",
      key: "productName",
      render: (_, record) => {
        const product = productData.find((p) => p.id === record.productId);
        return product ? product.name : "Không xác định";
      },
    },
    { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
    {
      title: "Tổng tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => formatCurrency(amount),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => renderOrderStatus(status),
    },
  ];

  // Modal Content
  const modalContent = selectedBooking ? (
    <div>
      <Card title="Thông tin đặt chỗ" style={{ marginBottom: 10 }}>
        <Table
          dataSource={[selectedBooking]}
          columns={[
            {
              title: "Ngày đặt",
              dataIndex: "date",
              key: "date",
              render: (date) => formatDate(date),
            },
            {
              title: "Pod",
              key: "pod",
              render: (_, record) => {
                const pod = podData.find((p) => p.id === record.podId);
                return pod ? `Pod ${pod.id}` : "Không xác định";
              },
            },
            {
              title: "Slot",
              key: "slot",
              render: (_, record) => {
                const slot = slotData.find((slot) =>
                  slot.bookings.some((booking) => booking.id === record.id)
                );
                return slot
                  ? `${slot.name} (${slot.startTime}:00 - ${slot.endTime}:00)`
                  : "Không có thông tin";
              },
            },
            {
              title: "Trạng thái",
              dataIndex: "status",
              key: "status",
              render: (status) => renderOrderStatus(status),
            },
          ]}
          pagination={false}
          bordered
        />
      </Card>

      <Card title="Order thêm" style={{ marginBottom: 10 }}>
        <Table
          dataSource={orderData.filter(
            (order) => order.bookingId === selectedBooking.id
          )}
          columns={orderColumns}
          pagination={false}
          bordered
        />
      </Card>

      <Card title="Thông tin thanh toán">
        {(() => {
          const payment = paymentData.find(
            (p) => p.bookingId === selectedBooking.id
          );
          const orderTotal =
            orderData
              .filter((order) => order.bookingId === selectedBooking.id)
              .reduce((sum, order) => sum + order.amount, 0) || 0;
          const podAmount = payment ? payment.amount : 0;
          const totalAmount = orderTotal + podAmount;

          return (
            <>
              <p>
                <strong>Tổng tiền sản phẩm:</strong>{" "}
                {formatCurrency(orderTotal)}
              </p>
              <p>
                <strong>Tiền Pod:</strong> {formatCurrency(podAmount)}
              </p>
              <p>
                <strong>Tổng cộng:</strong> {formatCurrency(totalAmount)}
              </p>
              <p>
                <strong>Trạng thái thanh toán:</strong>{" "}
                {payment ? (
                  <span
                    style={{
                      color:
                        payment.status === "Đã thanh toán"
                          ? "seagreen"
                          : "orange",
                      fontSize: "15px",
                      fontStyle: "italic",
                      fontWeight: "500",
                    }}
                  >
                    {payment.status}
                  </span>
                ) : (
                  "Không có thông tin"
                )}
              </p>

              <Button type="primary" style={{}} onClick={handleUpdatePayment}>
                <FontAwesomeIcon icon={faMoneyBillWheat} />
                Cập nhật lại số tiền
              </Button>
            </>
          );
        })()}
      </Card>
    </div>
  ) : null;
  // Hàm tính toán doanh thu
  const calculateRevenue = () => {
    // Kiểm tra đã chọn khoảng thời gian chưa
    if (!startDate || !endDate) {
      message.warning("Vui lòng chọn khoảng thời gian");
      return;
    }

    // Lọc các booking đã xác nhận
    const confirmedBookings = bookingData.filter(
      (booking) => booking.status === "Đã xác nhận"
    );

    const dailyRevenue = {};

    // Tính doanh thu từ payments
    paymentData.forEach((payment) => {
      const paymentDate = dayjs(payment.date);
      if (paymentDate.isBetween(startDate, endDate, null, "[]")) {
        const relatedBooking = confirmedBookings.find(
          (booking) => booking.id === payment.bookingId
        );
        if (relatedBooking) {
          const date = paymentDate.format("YYYY-MM-DD");
          dailyRevenue[date] = (dailyRevenue[date] || 0) + payment.amount;
        }
      }
    });

    // Tính doanh thu từ orders
    confirmedBookings.forEach((booking) => {
      const bookingDate = dayjs(booking.date);
      if (bookingDate.isBetween(startDate, endDate, null, "[]")) {
        booking.bookingOrders
          .filter((order) => order.status === "Đã thanh toán")
          .forEach((order) => {
            const orderDate = bookingDate.format("YYYY-MM-DD");
            dailyRevenue[orderDate] =
              (dailyRevenue[orderDate] || 0) + order.amount;
          });
      }
    });

    // Chuyển đổi dữ liệu để hiển thị
    setRevenueData(
      Object.entries(dailyRevenue).map(([date, amount]) => ({ date, amount }))
    );
    setShowRevenue(true);
  };
  // Hàm render bảng doanh thu
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
      <Title level={2} style={{ textAlign: "center", marginBottom: 20 }}>
        Lịch sử đơn hàng
      </Title>

      <Space direction="vertical" style={{ width: "100%", marginBottom: 20 }}>
        <Input
          placeholder="Tìm kiếm theo số điện thoại"
          value={searchTerm}
          onChange={handleSearch}
          prefix={<SearchOutlined />}
        />
      </Space>

      <Table
        dataSource={filteredBookings}
        columns={userColumns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        bordered
      />
      <Card title="Thống kê doanh thu" style={{ marginBottom: 20 }}>
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <RangePicker onChange={handleDateChange} />
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
            <Button onClick={handleRefresh} icon={<ReloadOutlined />}>
              Làm mới dữ liệu
            </Button>
          </Space>
          {showRevenue && revenueData.length > 0 && renderRevenueTable()}
        </Space>
      </Card>
      <Modal
        title="Chi tiết đơn hàng"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            Đóng
          </Button>,
        ]}
        width={1000}
      >
        {modalContent}
      </Modal>
    </div>
  );
};

export default OrderHistory;
