import React from 'react'
import UserSideBar from '../UserSideBar/UserSideBar'
import './UserControlContent.css'

export default function UserAccount() {
    return (
        <div className='user-information'>
            <div className='user-information-container'>

                <UserSideBar className='user-information-left-container' />

                <div className='user-information-right-container'>
                    <input placeholder='Old Password'></input>
                    <input placeholder='New Password'></input>
                    <input placeholder='Confirm'></input>
                </div>
            </div>
        </div>
    )
}
