import React, { Component } from 'react'

export default class UserContent extends Component {
  render() {
    return (
      <>
      <div>Liên hệ chúng tôi</div>
      <div>WEBNAME luôn sẵn sàng lắng nghe câu hỏi và ý kiến đóng góp từ bạn. Chúng tôi sẽ phản hồi ngay trong 24h tiếp theo!</div>
       <label>Họ và tên</label><br/>
       <input type="text" placeholder="Nhập họ và tên của bạn"/><br/>
       <label>Email</label><br/>
       <input type="text" placeholder="Nhập email của bạn"/><br/>
       <label>Số điện thoại</label><br/>
       <input type="text"  placeholder="Nhập số điện thoại của bạn"/><br/>
       <label>Nội dung</label><br/>
       <input type="text" placeholder="Mô tả vấn đề của bạn"/><br/>
       <input type="submit" value="Gửi"/>
      </>
    )
  }
}
