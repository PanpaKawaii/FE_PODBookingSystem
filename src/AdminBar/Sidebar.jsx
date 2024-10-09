import React from 'react';
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
  CDBSidebarFooter,
} from 'cdbreact'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Thêm import cho FontAwesomeIcon
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'; // Thêm import cho icon Log out


const Sidebar = () => {
  return (
    <CDBSidebar style={{
      height: '100vh', // Sử dụng dấu phẩy thay vì dấu chấm phẩy
    }} textColor="#333" backgroundColor="#f4f4f4">
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
        <Link to='/' className="sidebar-link">INNOSPACE ™</Link>
      </CDBSidebarHeader>

      <CDBSidebarContent>
        <CDBSidebarMenu>
          <CDBSidebarMenuItem icon="th-large" textFontSize="14px">
            <Link to='/pod'>Manage POD</Link>
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="sticky-note" textFontSize="14px">
            <Link to='/user'>Manage User</Link>
          </CDBSidebarMenuItem>
          {/* <CDBSidebarMenuItem >
            Care Products
          </CDBSidebarMenuItem> */}
          <CDBSidebarMenuItem textFontSize="14px">
            <FontAwesomeIcon icon={faRightFromBracket} />
            <Link to='/'>Log out</Link>
          </CDBSidebarMenuItem>
        </CDBSidebarMenu>

      </CDBSidebarContent>

      {/* Thay thế CDBSidebarCTA bằng nội dung tùy chỉnh */}
      <CDBSidebarFooter style={{ textAlign: 'center', padding: '20px' }}>
        {/* <div className="sidebar-btn-wrapper">
          <button style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px' }}>
           Log out
          </button>
        </div> */}
      </CDBSidebarFooter>
    </CDBSidebar>
  );
};

export default Sidebar;
