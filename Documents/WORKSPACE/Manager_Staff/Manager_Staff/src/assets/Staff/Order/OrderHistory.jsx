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
  Select,
  Popconfirm,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  EyeTwoTone,
  EyeInvisibleTwoTone,
  ReloadOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons"; // Nhập biểu tượng ngôi sao

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
    let backgroundColor;

    switch (status) {
      case "Chưa diễn ra":
        color = "white";
        backgroundColor = "#ffc107"; // Màu nền vàng
        break;
      case "Đang diễn ra":
        color = "white";
        backgroundColor = "#28a745"; // Màu nền xanh lá
        break;
      case "Đã kết thúc":
        color = "white";
        backgroundColor = "#0dcaf0"; // Màu nền xanh dương
        break;
      case "Đã huỷ":
        color = "white";
        backgroundColor = "#dc3545"; // Màu nền đỏ
        break;
      case "Đã hoàn tiền":
        color = "white";
        backgroundColor = "#fb8b24"; // Màu nền cam
        break;
      default:
        color = "black"; // Màu chữ mặc định
        backgroundColor = "transparent"; // Màu nền mặc định
    }

    return (
      <h4
        style={{
          backgroundColor: backgroundColor,
          color: color,
          textAlign: "center",
          borderRadius: "10px",
          fontSize: "17px",
          padding: "5px 10px",
        }}
      >
        <b>{status}</b>
      </h4>
    );
  };
  // Filtering and handlers
  const filteredUsers = userData.filter((user) =>
    user.phoneNumber.includes(searchTerm)
  );

  const filteredBookings = bookingData.filter((booking) =>
    filteredUsers.some((user) => user.id === booking.userId)
  );
  const handleUpdateBookingStatus = async (bookingId, newStatus) => {
    try {
      const booking = bookingData.find((b) => b.id === bookingId);
      if (!booking) {
        message.error("Không tìm thấy thông tin đặt chỗ");
        return;
      }

      await axios.put(`${apiBooking}/${bookingId}`, {
        ...booking,
        status: newStatus,
      });

      message.success("Cập nhật trạng thái thành công");
      await fetchBookingData();

      // Nếu đang xem chi tiết booking thì cập nhật lại selected booking
      if (selectedBooking?.id === bookingId) {
        setSelectedBooking((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      message.error("Cập nhật trạng thái thất bại");
    }
  };
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
  // Khởi tạo state cho totalAmount
  const [totalAmount, setTotalAmount] = useState(0);

  // Sử dụng useEffect để theo dõi sự thay đổi trong orderData và paymentData
  useEffect(() => {
    if (selectedBooking) {
      const payment = paymentData.find(
        (p) => p.bookingId === selectedBooking.id
      );
      const orderTotal =
        orderData
          .filter((order) => order.bookingId === selectedBooking.id)
          .reduce((sum, order) => sum + order.amount, 0) || 0;
      const podAmount = payment ? payment.amount : 0;
      const newTotalAmount = orderTotal + podAmount;

      // Cập nhật lại giá tiền trong modal
      setTotalAmount(newTotalAmount);
    }
  }, [orderData, paymentData, selectedBooking]);

  // Cập nhật lại hàm handleUpdatePaymentAmount
  const handleUpdatePaymentAmount = async (amount) => {
    if (!selectedBooking) return;

    const payment = paymentData.find(
      (payment) => payment.bookingId === selectedBooking.id
    );
    if (!payment) {
      message.error("Không tìm thấy thông tin thanh toán");
      return;
    }

    try {
      await axios.put(`${apiPayment}/${payment.id}`, {
        ...payment,
        status: "Đã thanh toán",
        amount: amount, // Sử dụng giá trị amount được truyền vào
        date: dayjs().format(),
      });

      message.success("Cập nhật thanh toán thành công");
      fetchPaymentData(); // Fetch lại dữ liệu thanh toán
      handleCloseModal();
    } catch (error) {
      console.error("Lỗi khi cập nhật thanh toán:", error);
      message.error("Cập nhật thanh toán thất bại");
    }
  };
  // điều chỉnh trạng thái thanh toán
  const handleUpdatePaymentStatus = async (paymentId, newStatus) => {
    try {
      const payment = paymentData.find((p) => p.id === paymentId);
      if (!payment) {
        message.error("Không tìm thấy thông tin thanh toán");
        return;
      }

      await axios.put(`${apiPayment}/${paymentId}`, {
        ...payment,
        status: newStatus,
      });

      fetchPaymentData(); // Fetch lại dữ liệu thanh toán
      message.success("Cập nhật trạng thái thanh toán thành công");
      handleCloseModal();
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái thanh toán:", error);
      message.error("Cập nhật trạng thái thanh toán thất bại");
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
      title: "Đánh giá", // Cột mới cho rating
      key: "rating",
      align: "center",
      render: (_, record) => {
        return record.rating > 0 ? (
          <span>
            {record.rating}

            <FontAwesomeIcon
              icon={solidStar}
              style={{ color: "gold", marginLeft: 5 }}
            />
          </span>
        ) : (
          "Chưa có đánh giá"
        );
      },
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => renderOrderStatus(status), // Sử dụng hàm renderOrderStatus để hiển thị trạng thái
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
      render: (status) => (
        <span
          style={{
            color: status === "Đã thanh toán" ? "seagreen" : "red",
            fontSize: "15px",
            fontStyle: "italic",
            fontWeight: "500",
          }}
        >
          {status}
        </span>
      ),
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
              title: "Hình ảnh Pod", // Cột mới cho hình ảnh
              key: "podImage",
              render: (_, record) => {
                const pod = podData.find((p) => p.id === record.podId);
                return pod ? (
                  <img
                    src={pod.image} // Giả sử thuộc tính hình ảnh là 'image'
                    alt={`Pod ${pod.id}`}
                    style={{ width: "100px", height: "auto" }} // Điều chỉnh kích thước hình ảnh
                  />
                ) : (
                  "Không có hình ảnh"
                );
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
              key: "status",
              align: "center",
              render: (_, record) => (
                <Space>
                  {renderOrderStatus(record.status)}{" "}
                  {/* Gọi hàm renderOrderStatus */}
                  <Select
                    defaultValue={record.status}
                    style={{ width: 150, padding: "5px 5px" }}
                    onChange={(value) =>
                      handleUpdateBookingStatus(record.id, value)
                    }
                  >
                    <Select.Option value="Chưa diễn ra">
                      Chưa diễn ra
                    </Select.Option>
                    <Select.Option value="Đang diễn ra">
                      Đang diễn ra
                    </Select.Option>
                    <Select.Option value="Đã kết thúc">
                      Đã kết thúc
                    </Select.Option>
                    <Select.Option value="Đã huỷ">Đã huỷ</Select.Option>
                    <Select.Option value="Đã hoàn tiền">
                      Đã hoàn tiền
                    </Select.Option>
                  </Select>
                </Space>
              ),
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

          const handleConvertToNegative = () => {
            const negativeAmount = -totalAmount; // Chuyển đổi thành số âm
            // Cập nhật thông tin thanh toán với số âm
            handleUpdatePaymentAmount(negativeAmount);
          };

          return (
            <>
              <p>
                <strong>Tổng tiền Order thêm:</strong>{" "}
                {formatCurrency(orderTotal)}
              </p>
              <p>
                <strong>Tiền Pod:</strong> {formatCurrency(podAmount)}
              </p>
              <strong>Tổng cộng:</strong>{" "}
              <span
                style={{
                  color: totalAmount < 0 ? "red" : "black",
                  fontWeight: "bold",
                }}
              >
                {formatCurrency(totalAmount)}
              </span>
              <Popconfirm
                title="Bạn có chắc chắn muốn hoàn tiền không?"
                onConfirm={handleConvertToNegative}
                okText="Có"
                cancelText="Không"
              >
                <Button
                  type="danger"
                  style={{
                    marginLeft: "5px",
                    backgroundColor: "transparent",
                    color: "black",
                  }}
                >
                  <MinusCircleOutlined /> Hoàn tiền
                </Button>
              </Popconfirm>
              <p style={{ margin: "10px 0" }}>
                <strong>Phương thức thanh toán:</strong>{" "}
                {payment ? (
                  <span>{payment.method || "Không xác định"}</span>
                ) : (
                  "Không có thông tin"
                )}
              </p>
              <p>
                <strong>Trạng thái thanh toán:</strong>{" "}
                {payment ? (
                  <Space>
                    <span
                      style={{
                        color:
                          payment.status === "Đã thanh toán"
                            ? "seagreen"
                            : "red",
                        fontSize: "15px",
                        fontStyle: "italic",
                        fontWeight: "500",
                      }}
                    >
                      {payment.status}
                    </span>
                    <Select
                      defaultValue={payment.status}
                      style={{ width: 150 }}
                      onChange={(value) =>
                        handleUpdatePaymentStatus(payment.id, value)
                      }
                    >
                      <Select.Option value="Đã thanh toán">
                        Đã thanh toán
                      </Select.Option>
                      <Select.Option value="Chưa thanh toán">
                        Chưa thanh toán
                      </Select.Option>
                    </Select>
                  </Space>
                ) : (
                  "Không có thông tin"
                )}
              </p>
              <Button
                type="primary"
                style={{ marginRight: 10 }}
                onClick={() => handleUpdatePaymentAmount(totalAmount)} // Cập nhật lại số tiền
              >
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
      (booking) => booking.status === "Đã kết thúc"
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
    <div
      style={{
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
        backgroundColor: "#F5F5F5",
      }}
    >
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
