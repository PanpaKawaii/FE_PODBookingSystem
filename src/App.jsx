import { Routes, Route } from "react-router-dom";
import Home from "./AdminComponent/AdminHome/Home.jsx";
import POD from "./AdminComponent/ManagePODComponent/POD.jsx";
import Sidebar from "./AdminComponent/AdminBar/Sidebar.jsx";
import "./App.css";
import Header from "./AdminComponent/HeadFootComponent/Header.jsx";
import Report from "./AdminComponent/ManageReportComponent/ReportManage.jsx";
import Store from "./AdminComponent/StoreManage/Store.jsx";
import AddStore from "./AdminComponent/StoreManage/AddStore.jsx";
import Staff from "./AdminComponent/ManageUserComponent/Staff.jsx";
// import Manager from "../AdminComponent/ManageUserComponent/Manager.jsx";
import Customer from "./AdminComponent/ManageUserComponent/Customer.jsx";
import AddPOD from "./AdminComponent/ManagePODComponent/AddPOD.jsx";
import AddStaff from "./AdminComponent/ManageUserComponent/AddStaff.jsx";
import Product from "./AdminComponent/ProductComponent/Product.jsx";
// import Order from "../AdminComponent/Order/Order.jsx";
import OrderHistory from "./AdminComponent/Order/OrderHistory.jsx";
import AddProduct from "./AdminComponent/ProductComponent/AddProduct.jsx";

// import OrderProduct from "./ProductComponent/OrderProduct.jsx";
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
            {/* <Route path="/manager" element={<Manager />}></Route> */}
            <Route path="/customer" element={<Customer />}></Route>
            <Route path="/addpod" element={<AddPOD />}></Route>
            <Route path="/addstaff" element={<AddStaff />}></Route>
            <Route path="/product" element={<Product />}></Route>
            <Route path="/history" element={<OrderHistory />}></Route>
            {/* <Route path="/order" element={<Order />}></Route> */}
            <Route path="/addproduct" element={<AddProduct />}></Route>
            {/* <Route path="/booking-order" element={<OrderProduct />}></Route> */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
