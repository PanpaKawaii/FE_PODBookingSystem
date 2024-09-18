import React, { Component } from 'react'
import img from 'C:/Users/admin/Documents/WORKSPACE/POD/POD/src/POD/aboutus.jpg'
import location from 'C:/Users/admin/Documents/WORKSPACE/POD/POD/src/POD/location.jpg'
export default class AboutUsContent extends Component {
    render() {
        return (
            <>
                <div className='container'>
                    <div className='about-us-text'>
                        <p>POD là một nền tảng đặt chỗ không gian làm việc cho các doanh nghiệp và cá nhân. Chúng tôi cung cấp các không gian làm việc đa dạng và tiện nghi, đảm bảo cho khách hàng một trải nghiệm tốt nhất.</p>
                    </div>
                    <div className='about-us-img'>
                        <img src={img} alt='about-us' />
                    </div>
                    <div className='inform'>
                        <h1>Location</h1>
                        <div className='location-container'>  {/* Added container for location */}
                            <div className='location-img'>  {/* Added class here */}
                                <img src={location} alt='location' />
                            </div>
                            <div className='location'>  {/* Added class here */}
                                <p>Địa chỉ: 1234 Nguyễn Văn Cừ, Quận 5, TP.HCM</p>
                                <p>Email: info@webname.com</p>
                                <p>Số điện thoại: 0123456789</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
