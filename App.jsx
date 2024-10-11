import Header from './HeadFootComponent/Header'
import Footer from './HeadFootComponent/Footer'
import Contact from './ContactComponent/ContactContent'
import Store from './Store/Store'
import About from './AboutUsComponent/AboutUsContent'
import Home from './BookHome/BookHome'
import StoreDetail from './Store/StoreDetail'
import PODDetail from './POD/PODdetail'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
// import { useEffect } from 'react'

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
        <Route path='/store' element={<Store />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/storedetail' element={<StoreDetail />} />
        <Route path='/PODdetail' element={<PODDetail />} />
      </Routes>
      <Footer></Footer>
    </>
  )
}

export default App
