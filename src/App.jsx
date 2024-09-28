import Header from './HeadFootComponent/Header'
import Footer from './HeadFootComponent/Footer'
import Contact from './ContactComponent/ContactContent'
import About from './AboutUsCOmponent/AboutUsContent'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'

function App() {
  

  return (
    <>
      <Header></Header>
      <Routes>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
      <Footer></Footer>
    </>
  )
}

export default App
