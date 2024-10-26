import { Routes, Route } from "react-router-dom";
import Home from "./AdminComponent/Home";
import POD from "./ManagePODComponent/POD";
import Sidebar from "./AdminBar/Sidebar";
import "./App.css";
import Header from "./HeadFootComponent/Header";
import Report from "./ManageReportComponent/ReportManage.jsx";
import Store from "./StoreManage/Store";
import AddStore from "./StoreManage/AddStore";
import Staff from "./ManageUserComponent/Staff";
import Manager from "./ManageUserComponent/Manager";
import Customer from "./ManageUserComponent/Customer";
import AddPOD from "./ManagePODComponent/AddPOD";
import AddStaff from "./ManageUserComponent/AddStaff";
import Product from "./ProductComponent/Product.jsx";
import Order from "./Order/Order.jsx";
import OrderHistory from "./Order/OrderHistory.jsx";

import OrderProduct from "./ProductComponent/OrderProduct.jsx";
function App() {
  return (
    <div className="admin-container">
      <Sidebar className="sidebar" /> {/* Giữ nguyên Sidebar */}
      <div className="admin-content">
        <Header />
        <div className="admin-content-body">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/pod" element={<POD />}></Route>
            {/* <Route path="/user" element={<User />}></Route> */}
            <Route path="/report" element={<Report />}></Route>
            <Route path="/store" element={<Store />}></Route>
            <Route path="/addstore" element={<AddStore />}></Route>
            <Route path="/staff" element={<Staff />}></Route>
            <Route path="/manager" element={<Manager />}></Route>
            <Route path="/customer" element={<Customer />}></Route>
            <Route path="/addpod" element={<AddPOD />}></Route>
            <Route path="/addstaff" element={<AddStaff />}></Route>
            <Route path="/product" element={<Product />}></Route>
            <Route path="/history" element={<OrderHistory />}></Route>
            <Route path="/order" element={<Order />}></Route>
            <Route path="/booking-order" element={<OrderProduct />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
