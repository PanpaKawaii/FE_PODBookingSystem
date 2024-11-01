import React, { useEffect, useState } from "react";
import "./UserManage.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { message, Popconfirm, Table, Tag, Input } from "antd";
import {
  ReloadOutlined,
  SearchOutlined,
  LoadingOutlined,
  UserOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

const { Search } = Input;

const Customer = () => {
  const [userData, setUserData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [bookingData, setBookingData] = useState([]);
  const [editedUser, setEditedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedUserBookings, setSelectedUserBookings] = useState([]);
  const [podData, setPodData] = useState([]);
  const apiPod = "https://localhost:7166/api/Pod";
  const apiUser = "https://localhost:7166/api/User";
  const apiBooking = "https://localhost:7166/api/Booking";
  const formatNumber = (number) => {
    return new Intl.NumberFormat("vi-VN").format(number);
  };
  const fetchPodData = async () => {
    try {
      const response = await axios.get(apiPod);
      setPodData(response.data);
    } catch (error) {
      console.error("Failed to fetch pod data:", error);
    }
  };
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
  useEffect(() => {
    fetchUserData();
    fetchBookingData();
    fetchPodData();
    const userCount = userData.filter((u) => u.role === "User").length;
    setTotalUsers(userCount);
  }, [userData]);

  if (userData.length === 0) {
    return (
      <p>
        Loading... <LoadingOutlined />
      </p>
    );
  }

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditedUser({ ...user });
    setShowModal(true);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`${apiUser}/${userId}`);
      message.success("Xoá thành công");
      fetchUserData();
    } catch (error) {
      console.error("Error deleting company:", error);
      message.error("Xoá không thành công");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setEditedUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        `${apiUser}/${editedUser.id}`,
        editedUser
      );
      if (response.status === 200) {
        setUserData((prevData) =>
          prevData.map((user) =>
            user.id === editedUser.id ? editedUser : user
          )
        );
      }
      handleCloseModal();
      message.success("Thay đổi thành công");
      fetchUserData();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };
  // hàm sử lý data để lưu vào tương ứng với từng User
  const handleViewBookings = (userId) => {
    const userBookings = bookingData.filter(
      (booking) => booking.userId === userId
    );
    setSelectedUserBookings(userBookings);
    setShowBookingModal(true);
  };
  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredUserData = userData.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phoneNumber.includes(searchTerm)
  );
  const calculateTotalBookings = (userId) => {
    return bookingData.filter((booking) => booking.userId === userId).length;
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
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      hidden: true,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="User" style={{ width: 100, height: 100 }} />
      ),
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Tài khoản",
      dataIndex: "type",
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
      onFilter: (value, record) => record.type === value,
      render: (type) => (
        <span
          style={{
            color: type === "VIP" ? "#FAC140" : "#64A587",
            fontSize: "15px",
            fontWeight: "500",
            // Thêm text-shadow để làm nổi bật chữ VIP
            textShadow:
              type === "VIP" ? "0.5px 0.5px 1px rgba(0,0,0,0.2)" : "none",
          }}
        >
          {type}
        </span>
      ),
    },
    {
      title: "Khách hàng",
      dataIndex: "description",
      key: "description",
      render: (description) => {
        let color;

        switch (description) {
          case "Khách hàng ưu tiên":
            color = "#FAC140";
            break;
          case "Khách hàng mới":
            color = "#17C3B2";
            break;
          case "Khách hàng cũ":
            color = "#227C9D";
            break;
          case "Khách hàng tiềm năng":
            color = "#FE6D73";
            break;
          default:
            color = "black";
        }

        return (
          <span style={{ color, fontFamily: "Arial", fontWeight: "bold" }}>
            {description}
          </span>
        );
      },
    },
    {
      title: "Tổng đơn hàng",
      key: "totalBookings",
      width: 150,
      render: (_, record) => (
        <span>
          {calculateTotalBookings(record.id)}{" "}
          <Button
            variant="info"
            size="sm"
            type="primary"
            onClick={() => handleViewBookings(record.id)}
            style={{
              marginLeft: 5,
              backgroundColor: "#FAFBFB",
              border: "1px solid gray",
              borderRadius: 5,
              marginBottom: 1,
            }}
          >
            <EyeTwoTone /> Chi tiết
          </Button>
        </span>
      ),
      sorter: (a, b) =>
        calculateTotalBookings(a.id) - calculateTotalBookings(b.id),
    },
    {
      title: "Điểm",
      dataIndex: "point",
      key: "point",
      render: (point) => formatNumber(point),
      sorter: (a, b) => a.point - b.point,
    },
    {
      title: "Chỉnh sửa",
      key: "action",
      align: "center",
      render: (_, record) => (
        <>
          <Button
            variant="primary"
            onClick={() => handleEdit(record)}
            style={{
              marginTop: 5,
              backgroundColor: "transparent",
              border: "none",
              color: "black",
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>{" "}
          <Popconfirm
            title="Are you sure to delete this company?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              variant="danger"
              style={{
                marginTop: 5,
                backgroundColor: "transparent",
                border: "none",
                color: "black",
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Popconfirm>
        </>
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
      <h1>Tài khoản khách hàng</h1>
      <Modal
        show={showBookingModal}
        onHide={() => setShowBookingModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết đơn đặt hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table
            dataSource={selectedUserBookings}
            columns={[
              {
                title: "ID",
                dataIndex: "id",
                key: "id",
              },
              {
                title: "Ngày đặt",
                dataIndex: "date",
                key: "date",
                render: (date) => new Date(date).toLocaleDateString(),
              },
              {
                title: "Trạng thái",
                dataIndex: "status",
                key: "status",
                render: (status) => renderOrderStatus(status),
              },
              {
                title: "Phản hồi",
                dataIndex: "feedback",
                key: "feedback",
              },
              {
                title: "ID POD",
                dataIndex: "podId",
                key: "podId",
              },
              {
                title: "Hình ảnh POD",
                dataIndex: "podId",
                key: "podImage",
                width: 120,
                render: (podId) => {
                  const pod = podData.find((pod) => pod.id === podId);
                  return (
                    <img
                      src={pod?.image || "https://placehold.co/100x100"}
                      alt="POD"
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/100x100";
                      }}
                    />
                  );
                },
              },
              {
                title: "Tên POD",
                dataIndex: "podId",
                key: "podName",
                render: (podId) => {
                  const pod = podData.find((pod) => pod.id === podId);
                  return pod ? pod.name : "Không có dữ liệu";
                },
              },
            ]}
            pagination={false}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowBookingModal(false)}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
      <Search
        placeholder="Tìm kiếm theo email hoặc số điện thoại"
        allowClear
        enterButton="Tìm kiếm"
        size="large"
        onSearch={handleSearch}
        style={{ marginBottom: 16 }}
        prefix={<SearchOutlined />}
      />
      <p>
        <strong>
          <UserOutlined /> Tổng số người dùng:
        </strong>{" "}
        {totalUsers}
      </p>
      <Table
        dataSource={filteredUserData}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 4 }}
        bordered
      />
      <button className="add-button" onClick={fetchUserData}>
        <ReloadOutlined />
      </button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa thông tin người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body className="customer-modal-body">
          {editedUser && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Tên</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={editedUser.name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={editedUser.password}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="tel"
                  name="phoneNumber"
                  value={editedUser.phoneNumber}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Loại tài khoản</Form.Label>
                <Form.Control
                  type="text"
                  name="type"
                  value={editedUser.type}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Điểm</Form.Label>
                <Form.Control
                  type="number"
                  name="point"
                  value={editedUser.point}
                  onChange={handleInputChange}
                  step={100}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={editedUser.description}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn lưu thay đổi không?"
            onConfirm={handleSaveChanges}
            okText="Yes"
            cancelText="No"
          >
            <Button variant="primary">Lưu thay đổi</Button>
          </Popconfirm>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Customer;
