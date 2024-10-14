import React from 'react';
import './UserManage.css'; // Thêm CSS cho component
import avatar from '../ManagerImage/avatar.jpg'
import Button from 'react-bootstrap/Button'; // Thêm import cho Button
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Thêm import cho biểu tượng
const Staff = () => {
    const users = [
        { id: '123456', class: 'SWR-9', position: 'Event Manager', name: 'Sarah', avatar: avatar },
        { id: '123457', class: 'SWR-9', position: 'Event Manager', name: 'John', avatar: avatar },
        { id: '123458', class: 'SWR-9', position: 'Event Manager', name: 'Alice', avatar: avatar },
        { id: '123459', class: 'SWR-9', position: 'Event Manager', name: 'Bob', avatar: avatar },
    ];

    return (
        <div className="user-manage">
            <h1>Tài khoản nhân viên</h1>
            <div className="user-list">
                {users.map((user, index) => (
                    <div key={index} className="user-card">
                        <img src={user.avatar} alt={`${user.name}'s avatar`} className="user-avatar" />
                        <div className="user-info">
                            <h3>{user.name} !</h3>
                            <p>ID: {user.id}</p>
                            <p>CLASS: {user.class}</p>
                            <p>POSITION: {user.position}</p>
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

export default Staff;
