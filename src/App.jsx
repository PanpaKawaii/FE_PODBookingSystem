import { Routes, Route } from 'react-router-dom'
import Home from './AdminComponent/Home'
import POD from './ManagePODComponent/PODManage'
// import User from './ManageUserComponent/UserManage'
import Sidebar from './AdminBar/Sidebar'
import './App.css'
import Header from './HeadFootComponent/Header'
import Report from './ManageReportComponent/ReportManage.jsx'
import Store from './StoreManage/index'
import AddStore from './StoreManage/AddStore'
function App() {
  return (
    <div className='admin-container' > 
      <Sidebar className='sidebar' /> {/* Giữ nguyên Sidebar */}
      <div className='admin-content' > 
        <Header/>
        <div className='admin-content-body'>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/pod" element={<POD />}></Route>
          {/* <Route path="/user" element={<User />}></Route> */}
          <Route path="/report" element={<Report />}></Route>
          <Route path='/store' element={<Store />}></Route>
          <Route path='/addstore' element={<AddStore />}></Route>
        </Routes>
        </div>
      </div>
    </div>
  );
}

export default App
