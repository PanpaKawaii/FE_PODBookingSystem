import { Routes } from 'react-router-dom'
import Contact from './Orchids/Contact'
import About from './Orchids/About'
import { Route } from 'react-router-dom'
import HeaderOrchids from './Orchids/HeaderOrchids'
import FooterOrchids from './Orchids/FooterOrchids'
import Home from './Orchids/MainComponentOrchids'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Orchid.css'
import { ThemeProvider } from './Orchids/ThemeContext'
import './App.css'
import OrchidDetail from './Orchids/OrchidDetail'
import Natural from './Orchids/Natural'

function App() {
  return (
    <>
      <ThemeProvider>
        <HeaderOrchids></HeaderOrchids>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/natural" element={<Natural/>} />
          <Route path="/orchid/:id" element={<OrchidDetail/>} />
        </Routes>
        <FooterOrchids></FooterOrchids>
      </ThemeProvider>



    </>
  )
}
export default App
