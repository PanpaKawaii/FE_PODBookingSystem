import React, { Component } from 'react'

export default class ContactContent extends Component {
  render() {
    return (
      <>
        <div className='container'>
          <div className='contact-us'>
            <h1>Liên hệ chúng tôi</h1>
            <div className='text-contact'>WEBNAME luôn sẵn sàng lắng nghe câu hỏi và ý kiến đóng góp từ bạn. Chúng tôi sẽ phản hồi ngay trong 24h tiếp theo!</div>
            <label>Họ và tên</label><br />
            <input className="text" type="text" placeholder="Nhập họ và tên của bạn" /><br />
            <label>Email</label><br />
            <input className="text" type="text" placeholder="Nhập email của bạn" /><br />
            <label>Số điện thoại</label><br />
            <input className="text" type="text" placeholder="Nhập số điện thoại của bạn" /><br />
            <label>Nội dung</label><br />
            <input className="text" type="text" placeholder="Mô tả vấn đề của bạn" /><br />
            <button className='submit'>Gửi</button>
          </div>
          <div className='inform'>
            <p>Thông tin công ty</p>
            <div>
              <p>Địa chỉ: 1234 Nguyễn Văn Cừ, Quận 5, TP.HCM</p>
              <p>Email: info@webname.com</p>
              <p>Số điện thoại: 0123456789</p>
            </div>

          </div>
        </div>
      </>
    )
  }
}
