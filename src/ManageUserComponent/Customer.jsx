import React from 'react';
import './UserManage.css'; // Thêm CSS cho component
import Button from 'react-bootstrap/Button'; // Thêm import cho Button
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Thêm import cho biểu tượng
import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Row } from 'react-bootstrap';
import avatar from '../Admin_image/avt.jpg';
const Customer = () => {
    const [user, setUser] = useState([]);
    const fetchUser = async () => {
        try {
            const response = await api.get("User");
            const filteredUsers = response.data.filter(user => user.role === "User");
            setUser(filteredUsers);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <>
            <Row >
            <div className="user-manage">
                <h1>Tài khoản khách hàng</h1>
                <div className="user-list">
                    {user.map((user, index) => (
                        <div key={index} className="user-card">
                            <img src={avatar} alt={`${user.name}'s avatar`} className="user-avatar" />
                            <div className="user-info">
                                <h3>{user.name} !</h3>
                                <p><strong>ID:</strong> {user.id}</p>
                                <p><strong>Tên:</strong> {user.name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Số điện thoại:</strong> {user.phoneNumber}</p>
                                <p><strong>Loại tài khoản:</strong> {user.type}</p>
                                <p><strong>Điểm thưởng:</strong> {user.point}</p>
                            </div>
                            <div className="user-actions">
                                    <Button variant onClick={() => handleEdit(idx)}>
                                    <FontAwesomeIcon icon={faEdit} /> {/* Biểu tượng sửa */}
                                </Button>
                                <Button variant onClick={() => handleDelete(idx)}>
                                    <FontAwesomeIcon icon={faTrash} /> {/* Biểu tượng xóa */}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Row >
        </>
    );
};

export default Customer;
