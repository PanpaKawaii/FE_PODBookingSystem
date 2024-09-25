import React, { Component } from 'react'
import building from 'C:/Users/admin/Documents/WORKSPACE/POD/POD/src/PODimage/building.jpg'
export default class AboutUsContent extends Component {
    render() {
        return (
            <>
                <div className='about-us-container'>
                    <div className='slogan-container'>
                        <p className='slogan'>Nơi làm việc lý tưởng cho sự sáng tạo và hiệu quả (logo)</p>
                        <p className='sub-slogan'>Tự hào mang đến cho bạn giải pháp tối ưu để làm việc tại bất kỳ đâu, với không gian linh hoạt và dịch vụ chất lượng cao.</p>
                    </div>
                    <p className='title'>Vì sao chọn InnoSpace</p>
                    <div className='reason-container'>
                        <div className='reason-item'>
                            <p>Không gian làm việc đa dạng: Đáp ứng nhu cầu đa dạng từ các sinh viên, freelancer đến doanh nghiệp nhỏ, với lựa chọn đa dạng từ phòng làm việc cá nhân đến không gian làm việc nhóm.</p>
                        </div>
                        <div className='reason-item'>
                            <p>Quản lý đặt chỗ thông minh: Giao diện thân thiện, cho phép bạn dễ dàng tìm kiếm và đặt chỗ theo nhu cầu, thời gian và ngân sách.</p>
                        </div>
                        <div className='reason-item'>
                            <p>Dịch vụ toàn diện: Hỗ trợ quản lý lịch làm việc, thanh toán trực tuyến và cung cấp các gói dịch vụ linh hoạt kèm các tiện ích.</p>
                        </div>
                    </div>

                    <div className='community-container'>
                        <div className='item-1'>
                            <p className='second-title'>Cộng đồng và kết nối</p>
                            <p className='community-text'>InnoSpace không chỉ là một nền tảng đặt chỗ làm việc, mà còn là một cộng đồng năng động và kết nối. Chúng tôi tạo ra một môi trường nơi những cá nhân sáng tạo, các startup và doanh nghiệp nhỏ có thể gặp gỡ, chia sẻ ý tưởng và hợp tác xây dựng một cộng đồng hỗ trợ, hợp tác và thành công.</p>
                        </div>
                        <div >
                            <img className='building-img' src={building} alt='location' />
                            
                        </div>
                    </div>
                </div>

            </>
        )
    }
}
