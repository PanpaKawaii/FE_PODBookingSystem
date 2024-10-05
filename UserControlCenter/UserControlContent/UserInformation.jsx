import React from 'react'
import UserSideBar from '../UserSideBar/UserSideBar'
import './UserControlContent.css'

export default function UserInformation() {
    return (
        <div className='user-information'>
            <div className='user-information-container'>

                <UserSideBar className='user-information-left-container' />

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
