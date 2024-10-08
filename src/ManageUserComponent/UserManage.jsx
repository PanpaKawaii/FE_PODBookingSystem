import React from 'react';
import './UserManage.css'; // Thêm CSS cho component

const UserManage = () => {
    const users = [
        { id: '123456', class: 'SWR-9', position: 'Event Manager', name: 'Sarah', avatar: 'https://via.placeholder.com/50' },
        { id: '123457', class: 'SWR-9', position: 'Event Manager', name: 'John', avatar: 'https://via.placeholder.com/50' },
        { id: '123458', class: 'SWR-9', position: 'Event Manager', name: 'Alice', avatar: 'https://via.placeholder.com/50' },
        { id: '123459', class: 'SWR-9', position: 'Event Manager', name: 'Bob', avatar: 'https://via.placeholder.com/50' },
    ];

    return (
        <div className="user-manage">
            <h1>User Management</h1>
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
                            <button className="edit-button">✎</button> {/* Thay đổi icon */}
                            <button className="delete-button">🗑️</button>
                        </div>
                    </div>
                ))}
            </div>
            <button className="add-button">+</button>
        </div>
    );
};

export default UserManage;
