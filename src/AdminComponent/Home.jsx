import React from 'react'
import './HomeStyle.css'
import { Button } from 'react-bootstrap'
import welcomeImage from '../Admin_image/avt.jpg'; // Thay thế bằng đường dẫn đến hình ảnh chào mừng
import './HomeStyle.css'

export default function Home() {
  return (
    <>

      <div className="welcome-container">
        <img src={welcomeImage} alt="Welcome" className="welcome-image" />
        <h1>Chào mừng, [Admin Name]!</h1>
        <p>Chúng tôi rất vui được có bạn ở đây. Hãy khám phá các chức năng bên cạnh!</p>
       
      </div>

    </>
  )
}
