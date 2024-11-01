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
  Popconfirm,
  Form,
  message,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  DeleteFilled,
  EditFilled,
  LoadingOutlined,
  EyeTwoTone,
  EyeInvisibleTwoTone,
  ReloadOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
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
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

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
      console.log("User Data:", response.data);
      setUserData(response.data.filter((user) => user.role === "User"));
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const fetchBookingData = async () => {
    try {
      const response = await axios.get(apiBooking);
      console.log("Booking Data:", response.data);
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

  useEffect(() => {
    if (startDate && endDate) {
      calculateRevenue();
    }
  }, [startDate, endDate, paymentData, bookingData]);

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

  const handleOpenEditOrderProductModal = (record) => {
    setEditingOrder(record);
    setIsEditModalVisible(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
    setEditingOrder(null);
  };

  const handleEditOrderProduct = async (values) => {
    try {
      const response = await axios.put(`${apiOrder}/${editingOrder.id}`, {
        ...editingOrder,
        ...values,
        date: dayjs(values.date).format(),
      });
      if (response.status === 200) {
        message.success("Cập nhật đơn hàng thành công");
        fetchOrderData();
        handleCloseEditModal();
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật đơn hàng:", error);
      message.error("Cập nhật đơn hàng thất bại");
    }
  };

  const handleDeleteOrderProduct = async (id) => {
    try {
      const response = await axios.delete(`${apiOrder}/${id}`);
      message.success("Xóa đơn hàng thành công");
      setIsModalVisible(false);
      fetchOrderData();
    } catch (error) {
      console.error("Lỗi khi xóa đơn hàng:", error);
      message.error("Xóa đơn hàng thất bại");
    }
  };

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

  const handleUpdatePayment = async () => {
    const totalAmount =
      (paymentData.find((payment) => payment.bookingId === selectedBooking.id)
        ?.amount || 0) +
      (selectedBooking.bookingOrders?.reduce(
        (total, order) => total + order.amount,
        0
      ) || 0);

    const paymentToUpdate = paymentData.find(
      (payment) => payment.bookingId === selectedBooking.id
    );

    if (!paymentToUpdate) {
      message.error("Không tìm thấy thông tin thanh toán");
      return;
    }

    try {
      const response = await axios.put(`${apiPayment}/${paymentToUpdate.id}`, {
        ...paymentToUpdate,
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
    let color;
    switch (status) {
      
      case "Chưa diễn ra":
        color = "gold";
        break;
      case "Đang diễn ra":
        color = "lime";
        break;
      case "Đã kết thúc":
        color = "red";
        break;
      case "Đã hủy":
        color = "orange";
        break;
      case "Đã hoàn tiền":
        color = "gray";
        break;
      default:
        color = "cornflowerblue";
    }
    return <Tag color={color}>{status}</Tag>;
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

  const orderColumns = [
    { title: "OrderId", dataIndex: "id", key: "id" },
    { title: "BookingId", dataIndex: "bookingId", key: "bookingId" },
    {
      title: "Ngày đặt",
      dataIndex: "date",
      key: "date",
      render: (date) => formatDate(date),
    },
    { title: "ProductId", dataIndex: "productId", key: "productId" },
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
    // {
    //   title: "Trạng thái đơn hàng",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (status) => renderOrderStatus(status),
    // },
    // {
    //   title: "Chỉnh sửa",
    //   key: "actions",
    //   render: (_, record) => (
    //     <Space>
    //       <Popconfirm
    //         title="Bạn có chắc chắn muốn xóa sản phẩm này?"
    //         onConfirm={() => handleDeleteOrderProduct(record.id)}
    //         okText="Có"
    //         cancelText="Không"
    //       >
    //         <Button type="primary" danger>
    //           <DeleteFilled />
    //         </Button>
    //       </Popconfirm>
    //     </Space>
    //   ),
    // },
  ];

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
                return pod ? `${record.podId} - ${pod.name}` : "Không xác định";
              },
            },
            {
              title: "Slot",
              key: "slot",
              render: (_, record) => {
                const slotInfo = getSlotInfo(record.id);
                return slotInfo ? slotInfo.name : "N/A";
              },
            },
            {
              title: "Trạng thái",
              dataIndex: "status",
              key: "status",
              render: (status) => renderOrderStatus(status),
            },
            {
              title: "Phương thức thanh toán",
              key: "paymentMethod",
              render: (_, record) => {
                const payment = paymentData.find(
                  (p) => p.bookingId === record.id
                );
                return payment ? payment.method : "Không có thông tin";
              },
            },
            {
              title: "Feedback",
              dataIndex: "feedback",
              key: "feedback",
              render: (feedback) => feedback || "Chưa có feedback",
            },
          ]}
          pagination={false}
          bordered
        />
      </Card>
      <Card title="Order thêm">
        <Table
          dataSource={selectedBooking.bookingOrders}
          columns={orderColumns}
          pagination={false}
          bordered
        />
      </Card>
      <Card
        title="Thông tin khách hàng"
        style={{ marginBottom: 10, marginTop: 10 }}
      >
        <p>
          <strong>Tên khách hàng:</strong>{" "}
          {userData.find((user) => user.id === selectedBooking.userId)?.name}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {userData.find((user) => user.id === selectedBooking.userId)?.email}
        </p>
        <p>
          <strong>Số điện thoại:</strong>{" "}
          {
            userData.find((user) => user.id === selectedBooking.userId)
              ?.phoneNumber
          }
        </p>
        <p>
          <strong>Điểm tích lũy:</strong>{" "}
          {formatNumber(
            userData.find((user) => user.id === selectedBooking.userId)?.point
          )}
        </p>
      </Card>
      <Card>
        <p>
          <strong>Tổng số tiền sản phẩm:</strong>{" "}
          {formatCurrency(
            selectedBooking.bookingOrders?.reduce(
              (total, order) => total + order.amount,
              0
            ) || 0
          )}
        </p>
        <p>
          <strong>Số tiền thanh toán cho POD: </strong>{" "}
          {formatCurrency(
            paymentData.find(
              (payment) => payment.bookingId === selectedBooking.id
            )?.amount || 0
          )}
        </p>
        <p>
          <strong>Tổng số tiền phải thanh toán:</strong>{" "}
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
        <p>
          <strong>Trạng thái đơn hàng:</strong>{" "}
          {renderOrderStatus(selectedBooking.bookingOrders[0]?.status)}
        </p>
        {/* <Button type="primary" onClick={handleUpdatePayment}>
          Cập nhật thanh toán
        </Button> */}
      </Card>
    </div>
  ) : null;

  const calculateRevenue = () => {
    console.log("Calculating revenue...");
    console.log("Start date:", startDate);
    console.log("End date:", endDate);
    console.log("Payment data:", paymentData);
    console.log("Booking data:", bookingData);

    if (!startDate || !endDate) {
      message.warning("Vui lòng chọn khoảng thời gian");
      return;
    }



    const dailyRevenue = {};

    paymentData.forEach((payment) => {
      const paymentDate = dayjs(payment.date);
      if (paymentDate.isBetween(startDate, endDate, null, "[]")) {
        // Chỉ tính doanh thu cho các payment liên quan đến booking đã xác nhận
        const relatedBooking = confirmedBookings.find(
          (booking) => booking.id === payment.bookingId
        );
        if (relatedBooking) {
          const date = paymentDate.format("YYYY-MM-DD");
          dailyRevenue[date] = (dailyRevenue[date] || 0) + payment.amount;
        }
      }
    });

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

    setRevenueData(
      Object.entries(dailyRevenue).map(([date, amount]) => ({ date, amount }))
    );

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
        title: "Doanh thu ",
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
  const editModalContent = (
    <Modal
      title="Chỉnh sửa đơn hàng"
      visible={isEditModalVisible}
      onCancel={handleCloseEditModal}
      footer={null}
    >
      {editingOrder && (
        <Form
          initialValues={{
            ...editingOrder,
            date: dayjs(editingOrder.date),
          }}
          onFinish={handleEditOrderProduct}
        >
          <Form.Item name="amount" label="Số tiền">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="quantity" label="Số lượng">
            <Input type="number" min={1} />
          </Form.Item>
          <Form.Item name="status" label="Trạng thái">
            <Input />
          </Form.Item>
          <Form.Item name="date" label="Ngày">
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );

  // const handleDateChange = (dates) => {
  //   setStartDate(dates ? dates[0] : null);
  //   setEndDate(dates ? dates[1] : null);
  // };

  // const handleRefresh = () => {
  //   fetchPaymentData();
  //   fetchBookingData();
  //   if (startDate && endDate) {
  //     calculateRevenue();
  //   }
  // };

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
        dataSource={bookingData}
        columns={userColumns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        bordered
      />
      {/* <Card title="Thống kê doanh thu" style={{ marginBottom: 20 }}>
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
      </Card> */}
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
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            Đóng
          </Button>,
        ]}
        width={1000}
      >
        {modalContent}
      </Modal>
      {editModalContent}
    </div>
  );
};

export default OrderHistory;
