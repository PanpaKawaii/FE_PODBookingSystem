import React from 'react'
import './Footer.css';

export default function Footer() {
    return (
        <div className='footer'>
            <div className='footer-container'>
                <div className='footer-brand'>
                    <h3>InnoSpace</h3>
                    <p>InnoSpace là hệ thống quản lý và đặt chỗ làm việc cá nhân, giúp người dùng dễ dàng tìm kiếm và đặt chỗ theo nhu cầu.</p>
                </div>
                <div className='footer-location'>
                    <h3>Location</h3>
                    <p>+84 333 680 099</p>
                    <p>info@innospace.com.vn</p>
                    <p>39 Nguyen Duy Hieu, Thao Dien Ward, Thu Duc, HCMC</p>
                </div>
                <div className='footer-solution'>
                    <h3>Solution</h3>
                    <p>Cabin</p>
                    <p>Phòng 1 người</p>
                    <p>Phòng 2 người</p>
                    <p>Phòng nhóm</p>
                    <p>Văn phòng</p>
                </div>
            </div>
            <div className='footer-end'>
                <p>Copyright © 2024 Tactic</p>
            </div>
        </div>
    )
}
