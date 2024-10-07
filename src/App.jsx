// src/App.jsx
import { Route, Routes } from "react-router-dom";
import Home from './AdminComponent/Home'
import Sidebar from '../src/AdminBar/Sidebar';
function App() {
  return (

    <Routes>
      <Route path="/" element={<Home />}></Route>

    </Routes>
  );
}

export default App
