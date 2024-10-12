import React from 'react'
import './AboutContent.css'

import building from '../BackgroundImage/building.jpg'
import location from '../BackgroundImage/location.jpg'
import videoSrc from '../BackgroundImage/VIDEO.mp4';

export default function AboutContent() {
    return (
        <div className='POD-about'>

            <div className='video-container'>
                <video className='fit' autoPlay muted loop>
                    <source src={videoSrc} type='video/mp4' />
                    Your browser does not support the video tag.
                </video>
            </div>

            <div className='slogan-container'>
                <h3><b>Nơi làm việc lý tưởng cho sự sáng tạo và hiệu quả</b></h3>
                <h6><i>Tự hào mang đến cho bạn giải pháp tối ưu để làm việc tại bất kỳ đâu, với không gian linh hoạt và dịch vụ chất lượng cao.</i></h6>
            </div>

            <div className='about-container'>

                <div>
                    <h4>Vì sao chọn InnoSpace</h4>

                    <div className='reason-container'>
                        <img src={location} alt='location' />
                        <div>
                            <div className='reason-item'>
                                <h3>Không gian làm việc đa dạng: </h3>
                                <p>Đáp ứng nhu cầu đa dạng từ các sinh viên, freelancer đến doanh nghiệp nhỏ, với lựa chọn đa dạng từ phòng làm việc cá nhân đến không gian làm việc nhóm.</p>
                            </div>
                            <div className='reason-item'>
                                <h3>Quản lý đặt chỗ thông minh: </h3>
                                <p>Giao diện thân thiện, cho phép bạn dễ dàng tìm kiếm và đặt chỗ theo nhu cầu, thời gian và ngân sách.</p>
                            </div>
                            <div className='reason-item'>
                                <h3>Dịch vụ toàn diện: </h3>
                                <p>Hỗ trợ quản lý lịch làm việc, thanh toán trực tuyến và cung cấp các gói dịch vụ linh hoạt kèm các tiện ích.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='community-container'>
                    <div className='text'>
                        <h3>Cộng đồng và kết nối</h3>
                        <p>InnoSpace không chỉ là một nền tảng đặt chỗ làm việc, mà còn là một cộng đồng năng động và kết nối. Chúng tôi tạo ra một môi trường nơi những cá nhân sáng tạo, các startup và doanh nghiệp nhỏ có thể gặp gỡ, chia sẻ ý tưởng và hợp tác xây dựng một cộng đồng hỗ trợ, hợp tác và thành công.</p>
                    </div>
                    <img className='building-img' src={building} alt='location' />
                </div>
            </div>

        </div>
    )
}
