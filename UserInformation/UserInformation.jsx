import React, { Component } from 'react'
import './UserInformation.css';

export default class UserInformation extends Component {
    render() {
        return (
            <div className='user-information'>
                <div className="user-information-container">
                    <div className="user-information-left-container">
                        <div className="user-image">.</div>
                        <p>ID:SE180392</p>
                        <hr/>
                        <button type='submit' className='btn'>User Information</button>
                        <button type='submit' className='btn'>Change Password</button>
                        <button type='submit' className='btn'>Bookings History</button>
                        <button type='submit' className='btn'>Transactions History</button>
                    </div>
                    <div className="user-information-right-container">
                        <h1>Xin chào, [name]</h1>
                        <h2>Bạn là thành viên [VIP] của InnoSpace!</h2>
                        <p>ID:</p>
                        <p>Name:</p>
                        <p>Email:</p>
                        <p>Phone:</p>
                        <p>Point:</p>
                    </div>
                </div>
            </div>
        );
    }
}
