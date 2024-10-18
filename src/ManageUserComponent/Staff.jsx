import React from 'react';
import './UserManage.css'; // Thêm CSS cho component
import Button from 'react-bootstrap/Button'; // Thêm import cho Button
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Thêm import cho biểu tượng
import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Row } from 'react-bootstrap';
import avatar from '../Admin_image/avt.jpg';
import { Link } from 'react-router-dom';
const Staff = () => {
    const [staff, setStaff] = useState([]);
    const fetchStaff = async () => {
        try {
            const response = await api.get("User");
            const filteredUsers = response.data.filter(user => user.role === "Staff");
            setStaff(filteredUsers);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchStaff();
    }, []);

    return (
        <>
            <Row >
            <div className="user-manage">
                <h1>Tài khoản nhân viên</h1>
                <div className="user-list">
                    {staff.map((staff, index) => (
                        <div key={index} className="user-card">
                            <img src={avatar} alt={`${staff.name}'s avatar`} className="user-avatar" />
                            <div className="user-info">
                                <h3>{staff.name} !</h3>
                                <p><strong>ID:</strong> {staff.id}</p>
                                <p><strong>Tên:</strong> {staff.name}</p>
                                <p><strong>Email:</strong> {staff.email}</p>
                                <p><strong>Số điện thoại:</strong> {staff.phoneNumber}</p>
                                <p><strong>Loại tài khoản:</strong> {staff.type}</p>
                                <p><strong>Điểm thưởng:</strong> {staff.point}</p>
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
                <button className="add-button"><Link to="/addStaff">+</Link></button>
            </div>
        </Row >
        </>
    );
};

export default Staff;
