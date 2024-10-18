import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './UserSideBar.css'

import avatar from './YellowBanana.jpg'

export default function UserSideBar() {

    const [id, setId] = useState(null);
    const UserId = localStorage.getItem('UserId');
    useEffect(() => {
        const UserIdInt = parseInt(UserId, 10);
        setId(UserIdInt);
    }, [UserId]);
    
    

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('UserId')
        console.log('Loged out')
        window.location.href = 'http://localhost:5173/signinsignup';
    }
    if (isNaN(id)) {
        window.location.href = 'http://localhost:5173/signinsignup';
    } else return (
        <div className='user-side-bar-container'>
            <div className='user-avatar'>
                <img src={avatar} alt={avatar}></img>
            </div>
            <hr />
            <Link to='/user/information'><Button type='submit' className='btn'>Information</Button></Link>
            <Link to='/user/account'><Button type='submit' className='btn'>Change Password</Button></Link>
            <Link to='/user/bookinghistory'><Button type='submit' className='btn'>History Bookings</Button></Link>
            <Button type='submit' className='btn' onClick={handleLogout}>Log Out</Button>
        </div>
    )
}
