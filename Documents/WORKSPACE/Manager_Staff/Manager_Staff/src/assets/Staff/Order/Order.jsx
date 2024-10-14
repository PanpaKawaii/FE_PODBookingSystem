import React from 'react';
import './Order.css'; // Thêm CSS cho component
import avatar from '../ManagerImage/avatar.jpg'
import Button from 'react-bootstrap/Button'; // Thêm import cho Button
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Thêm import cho biểu tượng
const Order = () => {
    const users = [
        { id: '123456', name: 'Sarah', avatar: avatar, POD: 'POD1', status: 'Đang chờ' },
        { id: '123457', name: 'John', avatar: avatar, POD: 'POD2', status: 'Đã thanh toán' },
        { id: '123458', name: 'Alice', avatar: avatar, POD: 'POD3', status: 'Đã thanh toán' },
        { id: '123459', name: 'Bob', avatar: avatar, POD: 'POD4', status: 'Đã hủy' },
    ];

    return (
        <div className="user-manage">
            <h1>Quản lí đơn hàng</h1>
            <div className="user-list">
                {users.map((user, index) => (
                    <div key={index} className="user-card">
                        <img src={user.avatar} alt={`${user.name}'s avatar`} className="user-avatar" />
                        <div className="user-info">
                            <h3>{user.name} !</h3>
                            <p>ID: {user.id}</p>
                            <p>Tên khách hàng: {user.name}</p>
                            <p>Tên POD: {user.POD}</p>
                            <p>Trạng thái: {user.status}</p>
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
    );
};

export default Order;
