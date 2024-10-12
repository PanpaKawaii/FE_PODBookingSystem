import React, { useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faUser, faChartBar, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Thêm trạng thái cho dropdown

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => { // Hàm để chuyển đổi trạng thái dropdown
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='nav'>
      <div id="mySidenav" className={`sidenav ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>InnoSPace</h2>
        </div>
        <Link to="/store">
          <FontAwesomeIcon className='icon' icon={faSquare} /> Quản lí cửa hàng
        </Link>
        <Link to="/pod">
          <FontAwesomeIcon className='icon' icon={faSquare} /> Quản lí POD
        </Link>
        {/* <Link to="/user">
          <FontAwesomeIcon className='icon' icon={faUser} /> Quản lí người dùng
        </Link> */}
        <button className={`dropdown-btn ${isDropdownOpen ? 'open' : ''}`} onClick={toggleDropdown}> {/* Thêm sự kiện click */}
          <FontAwesomeIcon className='icon' icon={faUser} />Quản lí tài khoản
          <i className={`fa fa-caret-down ${isDropdownOpen ? 'active' : ''}`}></i>
        </button>
        <div className={`dropdown-container ${isDropdownOpen ? 'open' : ''}`}> {/* Thêm class để điều khiển hiển thị */}
          <Link to="/customers">Khách hàng</Link>
          <Link to="/manager">Quản lý</Link>
          <Link to="/staff">Nhân viên</Link>
        </div>
        <Link to="/report">
          <FontAwesomeIcon className='icon' icon={faChartBar} /> Báo cáo doanh thu
        </Link>
        <Link to="/">
          <FontAwesomeIcon className='icon' icon={faSignOutAlt} /> Đăng xuất
        </Link>
      </div>

      <div id="main" className={isOpen ? 'shifted' : ''}>
        <span style={{ fontSize: '30px', cursor: 'pointer' }} onClick={toggleNav}>
          &#9776;
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
