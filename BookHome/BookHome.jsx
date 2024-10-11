import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file
import location from '../PODimage/location.jpg';
// import Card from 'bootstrap/dist/css/bootstrap.min.css';
export default function BookHome() {
  return (
    <div className="book-home-container">
      {/* Section 1: Slot and POD Selection */}
      <div className="selection-section">
        <h2>Chọn Slot và POD</h2>
        <div className="selection-inputs">
          <select className="slot-select">
            <option value="">Chọn slot*</option>
            {/* Add options for cities here */}
          </select>
          <select className="pod-select">
            <option value="">Chọn POD*</option>
            {/* Add options for PODs here */}
          </select>
          <button className="book-button">Đặt Ngay</button>
        </div>
      </div>

      {/* Section 2: Available POD Types */}
      <div className="pod-types-section">
        <h2 className="pod-title">
          Các Loại POD Có Sẵn
          <Link to="/solution" className="view-all">Xem tất cả</Link>
        </h2>
       
        <ul className="pod-list">
          <li className="pod-item">
            <img src={location} alt="Loại POD 1" className="pod-image" />
            <div className="pod-info">
              <p>POD đơn</p>
              <p>Số người: 1</p>
            </div>
            <button className="detail-button"><Link to="/PODdetail">Chi tiết</Link></button>
          </li>
          <li className="pod-item">
            <img src={location} alt="Loại POD 2" className="pod-image" />
            <div className="pod-info">
              <p>POD đôi</p>
              <p>Số người: 2</p>
            </div>
            <button className="detail-button"><Link to="/PODdetail">Chi tiết</Link></button>
          </li>
          <li className="pod-item">
            <img src={location} alt="Loại POD 3" className="pod-image" />
            <div className="pod-info">
              <p>POD nhóm</p>
              <p>Số người: 4-6</p>
            </div>
            <button className="detail-button"><Link to="/PODdetail">Chi tiết</Link></button>
          </li>
          {/* Add more POD types as needed */}
        </ul>
      </div>

      {/* Section 3: Contact Information */}
      <div className="contact-section">
        <h2>Thông Tin Liên Hệ</h2>
        <p>Email: example@example.com</p>
        <p>Điện thoại: (123) 456-7890</p>
        {/* Add more contact details as needed */}
      </div>
    </div>
  );
}
