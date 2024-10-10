import React, { useState } from 'react';
import './Sidebar.css'; 
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faUser, faChartBar, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // const openNav = () => {
  //   setIsOpen(true);
  // };

  // const closeNav = () => {
  //   setIsOpen(false);
  // };

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='nav'>
      <div id="mySidenav" className={`sidenav ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>InnoSPace</h2>
        </div>
        <Link to="/pod">
          <FontAwesomeIcon icon={faSquare} /> Quản lí POD
        </Link>
        <Link to="/user">
          <FontAwesomeIcon icon={faUser} /> Quản lí người dùng
        </Link>
        <Link to="/report">
          <FontAwesomeIcon icon={faChartBar} /> Báo cáo doanh thu
        </Link>
        <Link to="/">
          <FontAwesomeIcon icon={faSignOutAlt} /> Đăng xuất
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
