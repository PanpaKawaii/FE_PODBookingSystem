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
import BookingStoreContent from './Booking/BookingStoreContent'
import AboutContent from './About/AboutContent'

import BookingPodContent from './Booking/BookingPodContent'
import BookingDetailContent from './Booking/BookingDetailContent'
import PaymentContent from './Payment/PaymentContent'

import UserInformation from './UserControlCenter/UserControlContent/UserInformation'
import UserAccount from './UserControlCenter/UserControlContent/UserAccount'

import SignInSignUp from './SignInSignUp/SignInSignUp'
import GetDataAPI from './DataAPI/GetDataAPI'



function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomeContent />} />
        <Route path='/about' element={<AboutContent />} />
        <Route path='/booking' element={<BookingStoreContent />} />
        <Route path='/contact' element={<ContactContent />} />
        
        <Route path='/booking/:Id' element={<BookingPodContent />} />
        <Route path='/booking/:Id/:Id' element={<BookingDetailContent />} />
        <Route path='/booking/:Id/:Id/payment' element={<PaymentContent />} />


        <Route path='/user/information' element={<UserInformation />} />
        <Route path='/user/account' element={<UserAccount />} />

        <Route path='/signinsignup' element={<SignInSignUp />} />
        <Route path='/GetDataAPI' element={<GetDataAPI />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
