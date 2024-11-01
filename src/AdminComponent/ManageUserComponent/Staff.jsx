import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { message, Popconfirm, Table, Tag } from "antd";
import {
  LoadingOutlined,
} from "@ant-design/icons";
import api from "../api/axios";
import { Link } from "react-router-dom";

const Staff = () => {
  const [staffData, setStaffData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [editedStaff, setEditedStaff] = useState(null);

  const formatNumber = (number) => {
    return new Intl.NumberFormat("vi-VN").format(number);
  };

  const fetchStaffData = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkYW5nbmdvY2hhaXRyaWV1QGdtYWlsLmNvbSIsImp0aSI6ImE5MmUwOTBkLTQ2NmEtNDE2My1hMDQ3LWUyOWNjYjExOGE2OCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiOSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzMzMDc1ODUxLCJpc3MiOiJQb2RCb29raW5nIiwiYXVkIjoiUG9kV2ViIn0.SljDy518ZlaoY5hp6kKZvBp3-j5vXItyHQ0H7Y0ik3o"; // Thay thế bằng token thực tế của bạn
      const response = await api.get("User", {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      setStaffData(response.data.filter((user) => user.role === "Staff"));
    } catch (error) {
      console.error("Failed to fetch staff data:", error);
      // message.error("Không thể tải dữ liệu nhân viên");
    }
  };

  useEffect(() => {
    fetchStaffData();
  }, []);

  const handleEdit = (staff) => {
    setSelectedStaff(staff);
    setEditedStaff({ ...staff });
    setShowModal(true);
  };

  if (staffData.length === 0) {
    return (
      <p style={{ marginLeft: "1%" }}>
        Loading... <LoadingOutlined />
      </p>
    );
  }

  const handleDelete = async (staffId) => {
    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      await api.delete(`User/${staffId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      message.success("Xoá thành công");
      fetchStaffData();
    } catch (error) {
      console.error("Error deleting staff:", error);
      message.error("Xoá không thành công");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStaff(null);
    setEditedStaff(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStaff((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      const response = await api.put(`User/${editedStaff.id}`, editedStaff, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      if (response.status === 200) {
        setStaffData((prevData) =>
          prevData.map((staff) =>
            staff.id === editedStaff.id ? editedStaff : staff
          )
        );
      }
      handleCloseModal();
      message.success("Thay đổi thành công");
      fetchStaffData();
    } catch (error) {
      console.error("Failed to update staff:", error);
      message.error("Cập nhật không thành công");
    }
  };

  const handleAdd = () => {
    setEditedStaff({
      name: "",
      email: "",
      phoneNumber: "",
      type: "",
      point: 0,
      role: "Staff",
    });
    setShowModal(true);
  };

  const columns = [
    {
      title: "Avatar",
      key: "avatar",
      render: (record) => (
        <img
          src={record.image}
          alt="Avatar"
          style={{ width: 100, borderRadius: "50%" }}
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
      dataIndex: "role",
      key: "role",
      align: "center",
      render: (role) => <Tag color="geekblue-inverse">{role}</Tag>,
    },
    {
      title: "Điểm thưởng",
      dataIndex: "point",
      key: "point",
      render: (point) => formatNumber(point),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <>
          <button className="one-button" onClick={() => handleEdit(record)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>{" "}
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa nhân viên này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <button className="one-button">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div className="user-manage">
      <div className="title-store">
        <h1>Tài khoản nhân viên</h1>
        <Button onClick={handleAdd}>
          <FontAwesomeIcon icon={faUserPlus} />
        </Button>
      </div>
      <Table
        dataSource={staffData}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        bordered
        style={{ backgroundColor: "#FAFBFB" }}
      />
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedStaff
              ? "Chỉnh sửa thông tin nhân viên"
              : "Thêm nhân viên mới"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editedStaff && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Tên</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={editedStaff.name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={editedStaff.email}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="tel"
                  name="phoneNumber"
                  value={editedStaff.phoneNumber}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Loại tài khoản</Form.Label>
                <Form.Control
                  type="text"
                  name="type"
                  value={editedStaff.type}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Điểm thưởng</Form.Label>
                <Form.Control
                  type="number"
                  name="point"
                  value={editedStaff.point}
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

export default Staff;
