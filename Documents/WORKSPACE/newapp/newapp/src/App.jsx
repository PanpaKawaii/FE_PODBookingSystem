import { Routes } from 'react-router-dom'
import Contact from './Orchids/Contact'
import About from './Orchids/About'
import { Route } from 'react-router-dom'
import HeaderOrchids from './Orchids/HeaderOrchids'
import Home from './Orchids/MainComponentOrchids'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Orchid.css'
function App() {
  return (
    <>
      <HeaderOrchids></HeaderOrchids>
      <Routes>
      <Route path="/" element={<Home/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
      
      
    </>
  )
}
export default App
