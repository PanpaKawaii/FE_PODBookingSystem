import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from 'react-router-dom'

import Header from './HeaderFooter/Header'
import Footer from './HeaderFooter/Footer'
import SignInSignUp from './SignInSignUp/SignInSignUp'
import UserInformation from './UserControlCenter/UserControlContent/UserInformation'
import UserAccount from './UserControlCenter/UserControlContent/UserAccount'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/user/information' element={<UserInformation />} />
        <Route path='/user/account' element={<UserAccount />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
