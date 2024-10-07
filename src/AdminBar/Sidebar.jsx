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
    <CDBSidebar style={{ height: '100vh' }} textColor="#333" backgroundColor="#f4f4f4">
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
          <CDBSidebarMenuItem icon="credit-card" iconType="solid" textFontSize="14px">
            Care Products
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="gamepad" iconType="solid" textFontSize="14px">
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
