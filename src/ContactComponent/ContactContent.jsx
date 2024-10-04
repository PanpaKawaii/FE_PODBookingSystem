import React, { Component } from 'react'
// import './Contact.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import service from './../PODimage/service.jpg'
export default class ContactContent extends Component {
  render() {
    return (
      <>
        <div className='contact'>
          <div className='row'>
            <div className='col-md-6'>
              <p className='title-service'>Chúng tôi sẵn sàng lắng nghe bạn!</p>
              <div>
                <img className='service-img' src={service} alt='service' />
              </div>
            </div>
            <div className='col-md-6'>
              <div className='form-item'>
                <h1>Liên hệ với chúng tôi</h1>
                <p className='text-contact'>Hãy điền vào biểu mẫu bên dưới và chúng tôi sẽ liên hệ để tìm hiểu thêm về sản phẩm và dịch vụ của chúng tôi!</p>
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
            </div>
          </div>
        </div>
      </>
    )
  }
}

