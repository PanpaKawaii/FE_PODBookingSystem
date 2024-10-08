import { Routes, Route } from 'react-router-dom'
import Home from './AdminComponent/Home'
import POD from './ManagePODComponent/PODManage'
import User from './ManageUserComponent/UserManage'
import Sidebar from './AdminBar/Sidebar'
import './App.css'
import Header from './HeadFootComponent/Header'


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
          <Route path="/user" element={<User />}></Route>
        </Routes>
        </div>
      </div>
    </div>
  );
}

export default App
