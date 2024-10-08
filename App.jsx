import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from 'react-router-dom'

import Header from './HeaderFooter/Header'
import Footer from './HeaderFooter/Footer'

import HomeContent from './Home/HomeContent'
import ContactContent from './Contact/ContactContent'
import SolutionContent from './Solution/SolutionContent'
import AboutContent from './About/AboutContent'

import SolutionDetailContent from './Solution/SolutionDetailContent'

import SignInSignUp from './SignInSignUp/SignInSignUp'
import UserInformation from './UserControlCenter/UserControlContent/UserInformation'
import UserAccount from './UserControlCenter/UserControlContent/UserAccount'



function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomeContent />} />
        <Route path='/about' element={<AboutContent />} />
        <Route path='/solution' element={<SolutionContent />} />
        <Route path='/contact' element={<ContactContent />} />
        
        <Route path='/solution/:id' element={<SolutionDetailContent />} />


        <Route path='/user/information' element={<UserInformation />} />
        <Route path='/user/account' element={<UserAccount />} />

        <Route path='/signinsignup' element={<SignInSignUp />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
