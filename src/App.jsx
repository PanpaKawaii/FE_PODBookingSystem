import Header from './HeadFootComponent/Header'
import Footer from './HeadFootComponent/Footer'
import Contact from './ContactComponent/ContactContent'
import Home from './AdminComponent/Home'
import About from './AboutUsCOmponent/AboutUsContent'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { useEffect } from 'react'

function App() {
  //   useEffect(() => {
  // const fetchCategories = async () => {
  //   const categoriesList = await categoriesApi.getAll();

  // }
  //   })

  return (
    <>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
      </Routes>
      {/* <Footer></Footer> */}
    </>
  )
}

export default App
