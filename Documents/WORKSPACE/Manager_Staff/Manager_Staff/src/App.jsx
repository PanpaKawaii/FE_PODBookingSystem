import "./App.css";
import { Routes, Route } from "react-router-dom";
// import Sidebar from './assets/Manager/Sidebar/Sidebar';
// import Header from './assets/Manager/HeadFootComponent/Header';
/*import manager */
// import Home from './assets/Manager/HomeComponent/Home';
// import POD from './assets/Manager/PODComponent/PODManage';
// import Customer from './assets/Manager/UserComponent/Customer';
// import Order from './assets/Staff/OrderComponent/OrderManage';
// import Report from './assets/Manager/ReportComponent/ReportManage';
// import Store from './assets/Manager/StoreComponent/Store';
// import Staff from './assets/Manager/UserComponent/Staff';
/*import staff */
import Sidebar from "./assets/Staff/Sidebar/Sidebar";
import Header from "./assets/Staff/HeadFootComponent/Header";
import Home from "./assets/Staff/HomeComponent/Home";
import POD from "./assets/Staff/PODComponent/PODManage";
import Order from "./assets/Staff/Order/Order";
import Report from "./assets/Staff/ReportComponent/ReportManage";
import Staff from "./assets/Staff/UserComponent/Staff";
import Customer from "./assets/Staff/UserComponent/Customer";
import OrderHistory from "./assets/Staff/Order/OrderHistory";
import Product from "./assets/Staff/ProductComponent/Product";
import OrderProduct from "./assets/Staff/ProductComponent/OrderProduct";

function App() {
  return (
    <>
      <div className="main-container">
        <Sidebar className="sidebar" />
        <div className="main-content">
          <Header />
          <div className="main-content-body">
            <Routes>
              {/* <Route path="/" element={<Home />}></Route>
              <Route path="/pod" element={<POD />}></Route>
              <Route path='/order' element={<Order />}></Route>
              <Route path="/report" element={<Report />}></Route>
              <Route path='/store' element={<Store />}></Route>
              <Route path='/staff' element={<Staff />}></Route> */}
              {/*import staff */}
              <Route path="/" element={<Home />}></Route>
              <Route path="/pod" element={<POD />}></Route>
              <Route path="/order" element={<Order />}></Route>
              <Route path="/history" element={<OrderHistory />}></Route>
              <Route path="/report" element={<Report />}></Route>
              <Route path="/staff" element={<Staff />}></Route>
              <Route path="/customer" element={<Customer />}></Route>
              <Route path="/product" element={<Product />}></Route>
              <Route path="/booking-order" element={<OrderProduct />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
