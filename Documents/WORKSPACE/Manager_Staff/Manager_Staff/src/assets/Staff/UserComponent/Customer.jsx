import React, { useEffect, useState } from "react";
import "./UserManage.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { message, Popconfirm, Table, Tag } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

const Customer = () => {
  const [userData, setUserData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const apiUser = "https://localhost:7166/api/User";

  const formatNumber = (number) => {
    return new Intl.NumberFormat("vi-VN").format(number);
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(apiUser);
      setUserData(response.data.filter((user) => user.role === "User"));
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  if (userData.length === 0) {
    return <p>Loading...</p>;
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

  const columns = [
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
        <Tag color={type === "VIP" ? "gold" : "blue"}>{type}</Tag>
      ),
    },

    {
      title: "Chú ý",
      dataIndex: "description",
      key: "description",
      render: (description) => {
        let color;

        switch (description) {
          case "Khách hàng ưu tiên":
            color = "seagreen";
            break;
          case "Khách hàng mới":
            color = "blue"; // or any other shade of blue
            break;
          case "Khách hàng cũ":
            color = "grey"; // or any other shade of purple
            break;
          case "Khách hàng tiềm năng":
            color = "purple"; // or any other shade of purple
            break;
          default:
            color = "black"; // fallback color
        }

        return <span style={{ color, fontWeight: "bold" }}>{description}</span>;
      },
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
            title="Are you sure to delete this company?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
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
    <div className="user-manage">
      <h1>Tài khoản khách hàng</h1>
      <Table
        dataSource={userData}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        bordered
      />
      <button className="add-button" onClick={fetchUserData}>
        <ReloadOutlined />
      </button>
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
