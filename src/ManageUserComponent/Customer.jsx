import React, { useState, useEffect } from "react";
import "./UserManage.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { message, Popconfirm, Table, Tag } from "antd";
import { ReloadOutlined, LoadingOutlined } from "@ant-design/icons";
import api from "../api/axios";
import avatar from "../Admin_image/avt.jpg";

const Customer = () => {
  const [userData, setUserData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);

  const formatNumber = (number) => {
    return new Intl.NumberFormat("vi-VN").format(number);
  };

  const fetchUserData = async () => {
    try {
      const response = await api.get("User");
      setUserData(response.data.filter((user) => user.role === "User"));
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  if (userData.length === 0) {
    return (
      <p style={{ marginLeft: "1%" }}>
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
      await api.delete(`User/${userId}`);
      message.success("Xoá thành công");
      fetchUserData();
    } catch (error) {
      console.error("Error deleting user:", error);
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
      const response = await api.put(`User/${editedUser.id}`, editedUser);
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

  const columns = [
    {
      title: "Avatar",
      key: "avatar",
      render: () => (
        <img
          src={avatar}
          alt="Avatar"
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
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
      title: "Loại tài khoản",
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
        <Tag color={type === "VIP" ? "#FAC140" : "#64A587"}>{type}</Tag>
      ),
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
      render: (_, record) => (
        <>
          <Button variant="primary" onClick={() => handleEdit(record)}>
            <FontAwesomeIcon icon={faEdit} /> Sửa
          </Button>{" "}
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa người dùng này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button variant="danger">
              <FontAwesomeIcon icon={faTrash} /> Xóa
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#F5F5F5",
        borderRadius: "10px",
        border: "1px solid #9da5ac",
      }}
      className="user-manage"
    >
      <h1 style={{ fontFamily: "Arial", fontSize: 30 }}>
        Tài khoản khách hàng
      </h1>
      <Button style={{ marginBottom: "10px" }} onClick={fetchUserData}>
        <ReloadOutlined />
      </Button>
      <Table
        dataSource={userData}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        bordered
        style={{ backgroundColor: "#FAFBFB" }}
      />

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa thông tin người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            okText="Có"
            cancelText="Không"
          >
            <Button variant="primary">Lưu thay đổi</Button>
          </Popconfirm>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Customer;
