import React from 'react'
import UserSideBar from '../UserSideBar/UserSideBar';
import './UserControlContent.css'

export default function UserInformation() {
    return (
        <div className='user-control-center'>
            <div className='user-control-center-container'>

                <UserSideBar className='user-side-bar-container' />

                <div className='user-information-right-container'>
                    <h1>Xin chào, [name]</h1>
                    <h3>Bạn là thành viên [VIP] của InnoSpace!</h3>
                    <p>ID:</p>
                    <p>Name:</p>
                    <p>Email:</p>
                    <p>Phone:</p>
                    <p>Point:</p>
                </div>
            </div>
        </div>
    )
}
