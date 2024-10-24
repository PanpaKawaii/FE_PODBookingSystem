import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquare,
  faUser,
  faSignOutAlt,
  faFileClipboard,
  faFileInvoiceDollar,
  faMugHot,
  faCommentDollar,
  faList,
  faBurger,
} from "@fortawesome/free-solid-svg-icons";
import { Badge } from "antd";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="nav" style={{ borderRight: "1px solid black" }}>
      <div id="mySidenav" className={`sidenav ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <Link to="/">
            {" "}
            <h2 style={{ borderBottom: "1px solid black" }}>Staff Panel</h2>
          </Link>
        </div>

        <Link
          to="/order"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <span>
            <FontAwesomeIcon className="icon" icon={faFileClipboard} /> Đơn đang
            chờ
          </span>
          <Badge
            count={
              <FontAwesomeIcon
                icon={faCommentDollar}
                style={{
                  color: "#fff",
                  fontSize: "10px",
                }}
              />
            }
            style={{
              backgroundColor: "#52c41a",
              fontSize: "10px",
              height: "18px",
              minWidth: "18px",
              lineHeight: "18px",
              padding: "0 4px",
              marginBottom: "1.2rem",
              borderRadius: "56%",
            }}
          />
        </Link>
        <Link
          to="/booking-order"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <span>
            <FontAwesomeIcon className="icon" icon={faBurger} /> Order thêm
          </span>
          <Badge
            count={
              <FontAwesomeIcon
                icon={faCommentDollar}
                style={{
                  color: "#fff",
                  fontSize: "10px",
                }}
              />
            }
            style={{
              backgroundColor: "#52c41a",
              fontSize: "10px",
              height: "18px",
              minWidth: "18px",
              lineHeight: "18px",
              padding: "0 4px",
              marginBottom: "1.2rem",
              borderRadius: "56%",
            }}
          />
        </Link>

        <Link to="/pod">
          <FontAwesomeIcon className="icon" icon={faSquare} /> Quản lí POD
        </Link>
        <Link to="/product">
          <FontAwesomeIcon className="icon" icon={faMugHot} /> Quản lí sản phẩm
          kèm
        </Link>
        <Link to="/history">
          <FontAwesomeIcon className="icon" icon={faFileInvoiceDollar} /> Quán
          lý đơn hàng
        </Link>

        <Link to="/customer">
          <FontAwesomeIcon className="icon" icon={faUser} /> Quản lí khách hàng
        </Link>
        <Link to="/" style={{ color: "firebrick" }}>
          <FontAwesomeIcon className="icon" icon={faSignOutAlt} /> Đăng xuất
        </Link>
      </div>

      <div id="main" className={isOpen ? "shifted" : ""}>
        <span
          style={{ fontSize: "30px", cursor: "pointer" }}
          onClick={toggleNav}
        >
          {/* &#9776; */}
          <FontAwesomeIcon icon={faList} />
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
