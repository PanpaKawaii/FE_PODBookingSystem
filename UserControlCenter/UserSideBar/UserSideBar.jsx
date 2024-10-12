import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './UserSideBar.css'

import avatar from './YellowBanana.jpg'

export default function UserSideBar() {
    return (
        <div className='user-side-bar-container'>
            <div className='user-avatar'>
                <img src={avatar}></img>
            </div>
            <p>ID:SE180392</p>
            <hr />
            <Link to='/user/information'><Button type='submit' className='btn'>User Information</Button></Link>
            <Link to='/user/account'><Button type='submit' className='btn'>Change Password</Button></Link>
            <Link to='/user/bookinghistory'><Button type='submit' className='btn'>Bookings History</Button></Link>
        </div>
    )
}
