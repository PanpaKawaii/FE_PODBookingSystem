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
          <CDBSidebarMenuItem icon="user" textFontSize="14px">
            <Link to='/user'>Manage Account</Link>

          </CDBSidebarMenuItem>

          <CDBSidebarMenuItem icon="sign-out-alt" textFontSize="14px">
            <Link to='/'>Log out</Link>
          </CDBSidebarMenuItem>
        </CDBSidebarMenu>

      </CDBSidebarContent>

      {/* Thay thế CDBSidebarCTA bằng nội dung tùy chỉnh */}
      <CDBSidebarFooter style={{ textAlign: 'center', padding: '20px' }}>

      </CDBSidebarFooter>
    </CDBSidebar>
  );
};

export default Sidebar;
