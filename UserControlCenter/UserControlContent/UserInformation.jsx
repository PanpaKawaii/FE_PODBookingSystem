import React from 'react'
import { useState, useEffect } from 'react';
import './UserControlContent.css'

import UserSideBar from '../UserSideBar/UserSideBar';

export default function UserInformation() {

    const [id, setId] = useState(null);
    const UserId = localStorage.getItem('UserId');
    useEffect(() => {
        const UserIdInt = parseInt(UserId, 10);
        setId(UserIdInt);
    }, [UserId]);

    const [USER, setUSER] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const userResponse = await fetch(`https://localhost:7166/api/User/${id}`);
                    if (!userResponse.ok) throw new Error('Network response was not ok');
                    const userData = await userResponse.json();
                    setUSER(userData);
                    setLoading(false);
                } catch (error) {
                    setError(error);
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, [id]);

    return (
        <div className='user-control-center'>
            <div className='user-control-center-container'>

                <UserSideBar className='user-side-bar-container' />

                <div className='user-information'>
                    <h1><b>Xin chào, {USER ? USER.name : '...'}</b></h1>
                    <h3>Bạn là thành viên {USER ? (USER.type == 'VIP' ? USER.type : '') : '...'} của InnoSpace!</h3>
                    <p>ID: {USER ? USER.id : '...'}</p>
                    <p>Email: {USER ? USER.email : '...'}</p>
                    <p>Name: {USER ? USER.name : '...'}</p>
                    <p>Phone: {USER ? USER.phoneNumber : '...'}</p>
                    <p>Point: {USER ? USER.point : '...'}</p>
                </div>
            </div>
        </div>
    )
}
