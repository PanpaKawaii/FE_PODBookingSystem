import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquare,
  faUser,
  faChartBar,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="nav">
      <div id="mySidenav" className={`sidenav ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <Link to="/">
            {" "}
            <h2>InnoSPace</h2>
          </Link>
        </div>
        <Link to="/pod">
          <FontAwesomeIcon className="icon" icon={faSquare} /> Quản lí POD
        </Link>
        <Link to="/order">
          <FontAwesomeIcon className="icon" icon={faUser} /> Quản lí đơn hàng
        </Link>
        <Link to="/customer">
          <FontAwesomeIcon className="icon" icon={faUser} /> Quản lí khách hàng
        </Link>
        <Link to="/">
          <FontAwesomeIcon className="icon" icon={faSignOutAlt} /> Đăng xuất
        </Link>
      </div>

      <div id="main" className={isOpen ? "shifted" : ""}>
        <span
          style={{ fontSize: "30px", cursor: "pointer" }}
          onClick={toggleNav}
        >
          &#9776;
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
